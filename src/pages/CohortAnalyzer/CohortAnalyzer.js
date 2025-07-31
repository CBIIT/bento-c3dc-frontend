import React, { useContext, useEffect, useRef, useState } from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import { CohortStateContext } from "../../components/CohortSelectorState/CohortStateContext";
import { configColumn } from "../inventory/tabs/tableConfig/Column";
import { TableView } from "@bento-core/paginated-table";
import { themeConfig } from "../studies/tableConfig/Theme";
import { onCreateNewCohort, onDeleteAllCohort, onDeleteSingleCohort } from "../../components/CohortSelectorState/store/action";
import { tableConfig, analyzer_query, analyzer_tables, responseKeys } from "../../bento/cohortAnalayzerPageData";
import DownloadSelectedCohort from "./downloadCohort/DownloadSelectedCohorts";
import client from "../../utils/graphqlClient";
import ToolTip from "@bento-core/tool-tip/dist/ToolTip";
import Stats from '../../components/Stats/GlobalStatsController';
import DeleteConfirmationModal from "../inventory/cohortModal/components/deleteConfirmationModal";
import NavigateAwayModal from './navigateAwayModal';
import placeHolder from "../../assets/vennDigram/placeHolder.png";
import ChartVenn from "./vennDiagram/ChartVenn";
import { CohortModalContext } from "../inventory/cohortModal/CohortModalContext";
import CohortModalGenerator from "../inventory/cohortModal/cohortModalGenerator";
import Alert from '@material-ui/lab/Alert';
import { useGlobal } from "../../components/Global/GlobalProvider";
import questionIcon from "../../assets/icons/Question_icon_2.svg";
import questionIcon3 from "../../assets/icons/Question_Icon_3.svg";
import linkoutIcon from "../../assets/about/Export_Icon_White.svg";
import LinkoutBlue from "../../assets/about/Export_Icon.svg";
import DownloadIcon from "../../assets/icons/DownloadIcon.svg";

import { useStyle } from "./cohortAnalyzerStyling";
import {
    addCohortColumn,
    generateQueryVariable,
    handlePopup,
    handleDelete,
    SearchBox,
    triggerNotification,
    getAllIds,
    getIdsFromCohort,
    filterAllParticipantWithDiagnosisName,
    filterAllParticipantWithTreatmentType
} from "./CohortAnalyzerUtil";
import { CreateNewCOhortButton } from "./CreateNewCohortButton/CreateNewCohortButton";
import store from "../../store";
import { updateUploadData, updateUploadMetadata } from "@bento-core/local-find";
import { CohortSelector } from "./CohortSelector/CohortSelector";
import { useCohortAnalyzer } from "./CohortAnalyzerContext";

export const CohortAnalyzer = () => {
    //context
    const { deleteInfo, setDeleteInfo, nodeIndex, setNodeIndex, cohortList, setCohortList, handleCheckbox, } = useCohortAnalyzer();
    const containerRef = useRef(null);
    const canvasRef = useRef(null);
    const classes = useStyle();
    const { state, dispatch } = useContext(CohortStateContext);
    const [selectedCohorts, setSelectedCohorts] = useState([]);
    const [queryVariable, setQueryVariable] = useState({});
    const [rowData, setRowData] = useState([]);
    const [refershInit] = useState(false);
    const [searchValue, setSearchValue] = useState("");
    const [selectedChart, setSelectedChart] = useState([]);
    const [refershSelectedChart, setRefershSelectedChart] = useState(false);
    const [refershTableContent, setRefershTableContent] = useState(false);
    const [selectedCohortSection, setSelectedCohortSections] = useState([]);
    const [alert, setAlert] = useState({ type: '', message: '' });
    const [generalInfo, setGeneralInfo] = useState({});
    const [cohortData, setCohortData] = useState();
    const [showNavigateAwayModal, setShowNavigateAwayModal] = useState(false);

    const { setShowCohortModal, showCohortModal, setCurrentCohortChanges, setWarningMessage, warningMessage } = useContext(CohortModalContext);
    const { CohortModal } = CohortModalGenerator();
    const { Notification } = useGlobal();
    const navigate = useNavigate();

    const handleUserRedirect = () => {
        // NOTE: If needed to show in only Autocomplete of Localfind.
        // const data = rowData.map(r=>({type: 'participantIds', title: r.participant_id}))
        // store.dispatch(updateAutocompleteData(data));
        // navigate('/explore');

        const upload = rowData.map(r => ({ participant_id: r.participant_id, study_id: r.dbgap_accession }));
        const uploadMetadata = {
            filename: "",
            fileContent: upload.map(p => p.participant_id).join(","),
            matched: upload,
            unmatched: [],
        };

        store.dispatch(updateUploadData(upload));
        store.dispatch(updateUploadMetadata(uploadMetadata));
        navigate('/explore');
    }

    const handleBuildInExplore = () => {
        const hideModal = localStorage.getItem('hideNavigateModal') === 'true';
        if (hideModal) {
            handleUserRedirect(); // skip modal
        } else {
            setShowNavigateAwayModal(true); // show modal
        }
    }

    const handleExportToCCDIHub = () => {
        const participantIds = rowData.map(p => p.participant_id).join("|");
        const dbgapAccessions = [...new Set(rowData.map(p => p.dbgap_accession))].join("|");

        const baseUrl = "https://ccdi.cancer.gov/explore?p_id=";
        const dbgapBase = "&dbgap_accession=";

        const finalUrl = `${baseUrl}${participantIds}${dbgapBase}${dbgapAccessions}`;
        window.open(finalUrl, '_blank');

        return finalUrl;
    }


    const searchRef = useRef();


    const handleSearchValue = (e) => {
        setSearchValue(e.target.value)


        if (searchRef.current) {
            searchRef.current.value = e.target.value;
            if (searchRef.current.value === "") {

                setTimeout(() => {
                    searchRef.current.focus();
                }, 200);

            }
        }

    }

      const handleDownload = () => {
    if (containerRef.current && canvasRef.current) {
      const canvas = canvasRef.current;
      
      // Create download link
      const link = document.createElement('a');
      link.download = 'venn-diagram.png';
      link.href = canvas.toDataURL('image/png');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setAlert({ type: 'success', message: 'Confirmed download of Venn Diagram from the Cohort Analyzer by Participant ID' });
    }
  };

    function updatedCohortContent(newParticipantsData) {
        const newState = { ...state };
        selectedCohorts.forEach(cohortId => {
            const existingParticipants = newState[cohortId].participants || [];

            const updatedParticipants = existingParticipants.map(participant => {
                const matchingNewParticipant = newParticipantsData.find(
                    newParticipant => newParticipant.participant_pk === participant.participant_pk
                );

                if (matchingNewParticipant) {
                    return {
                        ...participant, ...matchingNewParticipant

                    };
                }

                return participant;
            })
            newState[cohortId] = {
                ...newState[cohortId],
                participants: updatedParticipants,
            };

        });
        setCohortData(newState);
    }

    function updatedCohortContentAllowDuplication(newParticipantsData) {
        const newState = { ...state };
        selectedCohorts.forEach(cohortId => {
            const existingParticipants = newState[cohortId].participants || [];


            let finalResponse = [];
            newParticipantsData.forEach((participant) => {
                const matchingExistingParticipants = existingParticipants.find(
                    existingParticipant => existingParticipant.participant_pk === participant.participant_pk
                );

                if (matchingExistingParticipants) {
                    finalResponse.push({
                        ...matchingExistingParticipants, ...participant
                    })
                }

            })

            newState[cohortId] = {
                ...newState[cohortId],
                participants: finalResponse,
            };

        });
        setCohortData(newState);
    }

    function transformData(data, type) {
        if (type === "treatment") {
            return data.map(({ participant, id, ...rest }) => ({
                participant_pk: participant.id,
                participant_id: participant.participant_id,
                treatment_pk: id,
                ...rest,
            }));
        } else if (type === "diagnosis") {
            return data.map(({ participant, id, ...rest }) => ({
                participant_pk: participant.id,
                participant_id: participant.participant_id,
                diagnosis_pk: id,
                ...rest,
            }));
        } else {
            return data.map(({ id, participant_id, ...rest }) => ({
                participant_pk: id,
                participant_id: participant_id,
                id: id,
                ...rest,
            }));
        }

    }

    async function getJoinedCohort(isReset = false) {
        let queryVariables = generateQueryVariable(selectedCohorts, state);
        if (Object.keys(generalInfo).length > 0) {
            queryVariables = { "participant_pk": isReset ? getIdsFromCohort(state, selectedCohorts) : getAllIds(generalInfo), first: 10000 };
        }
        setQueryVariable(queryVariables);
        let { data } = await client.query({
            query: analyzer_query[nodeIndex],
            variables: queryVariables,
        });
        data = { [responseKeys[nodeIndex]]: transformData(data[responseKeys[nodeIndex]], "participants") }
        if (queryVariables.participant_pk.length > 0) {
            if (searchValue !== "") {
                let filteredRowData = data[responseKeys[nodeIndex]].filter((a, b) => a.participant_id.includes(searchValue))
                setRowData(addCohortColumn(filteredRowData, state, selectedCohorts));
            } else {
                setRowData(addCohortColumn(data[responseKeys[nodeIndex]], state, selectedCohorts, "participant"));
                updatedCohortContent(data[responseKeys[nodeIndex]])

            }
        } else {
            if (location && location.state && location.state.cohort && location.state.cohort.cohortId) {

            } else {
                setRowData([]);
            }

        }
    }

    async function getJoinedCohortByD(selectedCohortSection = null) {
        let queryVariables = generateQueryVariable(selectedCohorts, state);
        if (Object.keys(generalInfo).length > 0) {
            queryVariables = { "participant_pk": getIdsFromCohort(state, selectedCohorts), first: 10000 };
        }
        setQueryVariable(queryVariables);
        let { data } = await client.query({
            query: analyzer_query[nodeIndex],
            variables: queryVariables,
        });
        data = { [responseKeys[nodeIndex]]: transformData(data[responseKeys[nodeIndex]], "diagnosis") }
        if (queryVariables.participant_pk.length > 0) {
            if (searchValue !== "") {

                let filteredRowData = data[responseKeys[nodeIndex]].filter((a, b) => a.participant_id.includes(searchValue))

                if (JSON.stringify(selectedCohortSection) !== "{}") {
                    filteredRowData = filterAllParticipantWithDiagnosisName(generalInfo, filteredRowData)
                }
                setRowData(addCohortColumn(filteredRowData, state, selectedCohorts));

            } else {


                if (JSON.stringify(selectedCohortSection) !== "{}") {

                    let filterRowData = filterAllParticipantWithDiagnosisName(generalInfo, data[responseKeys[nodeIndex]])
                    setRowData(addCohortColumn(filterRowData, state, selectedCohorts));
                } else {
                    setRowData(addCohortColumn(data[responseKeys[nodeIndex]], state, selectedCohorts));
                    updatedCohortContent(data[responseKeys[nodeIndex]])
                }

            }
        } else {
            if (location && location.state && location.state.cohort && location.state.cohort.cohortId) {

            } else {
                setRowData([]);
            }

        }
    }

    async function getJoinedCohortByT(selectedCohortSection = null) {
        let queryVariables = generateQueryVariable(selectedCohorts, state);
        if (Object.keys(generalInfo).length > 0) {
            queryVariables = { "participant_pk": getIdsFromCohort(state, selectedCohorts), first: 10000 };
        }
        setQueryVariable(queryVariables);
        let { data } = await client.query({
            query: analyzer_query[nodeIndex],
            variables: queryVariables,
        });
        data = { [responseKeys[nodeIndex]]: transformData(data[responseKeys[nodeIndex]], "treatment") }

        if (queryVariables.participant_pk.length > 0) {
            if (searchValue !== "") {
                let filteredRowData = data[responseKeys[nodeIndex]].filter((a, b) => a.participant_id.includes(searchValue))
                if (JSON.stringify(selectedCohortSection) !== "{}") {
                    filteredRowData = filterAllParticipantWithTreatmentType(generalInfo, filteredRowData)
                }
                setRowData(addCohortColumn(filteredRowData, state, selectedCohorts));
            } else {


                if (JSON.stringify(selectedCohortSection) !== "{}") {

                    let filterRowData = filterAllParticipantWithTreatmentType(generalInfo, data[responseKeys[nodeIndex]])
                    setRowData(addCohortColumn(filterRowData, state, selectedCohorts));
                    //updatedCohortContent(filterRowData)

                } else {
                    setRowData(addCohortColumn(data[responseKeys[nodeIndex]], state, selectedCohorts));
                    updatedCohortContentAllowDuplication(data[responseKeys[nodeIndex]])
                }

            }
        } else {
            if (location && location.state && location.state.cohort && location.state.cohort.cohortId) {

            } else {
                setRowData([]);
            }

        }
    }

    const location = useLocation();


    useEffect(() => {
        if (location) {
            const viewCohort = location && location.state ? location.state.cohort : null;
            if (viewCohort) {
                handleCheckbox(viewCohort.cohortId, null);
            }
        }

    }, [location]);


      useEffect(() => {
            if (alert.message) {
                const timer = setTimeout(() => {
                    setAlert({ type: '', message: '' }); 
                }, 2500);
    
              
                return () => clearTimeout(timer);
            }
        }, [alert]);

    useEffect(() => {
        setSearchValue("");
        if (searchRef.current) {
            searchRef.current.value = "";
        }

    }, [selectedChart])

    useEffect(() => {


        if (selectedChart.length >= 0) {

            if (nodeIndex === 0) {
                getJoinedCohort();
            } else if (nodeIndex === 1) {
                getJoinedCohortByD(generalInfo);
            } else if (nodeIndex === 2) {
                getJoinedCohortByT(generalInfo)
            }
        }


        if (nodeIndex === 0 || nodeIndex === 1 || nodeIndex === 2) {
            let finalVennSelection = [];
            selectedCohortSection.forEach((section) => {
                if (section.split(" ∩ ").length > 1) {
                    let validCohorts = [];
                    section.split(" ∩ ").forEach((sec, index) => {
                        const regex = /(.*?)(?= \(\d+\))/;
                        const match = sec.match(regex);
                        if (selectedCohorts.includes(match[1])) {
                            validCohorts.push(sec);
                        }
                    })

                    if (validCohorts.length > 0) {
                        finalVennSelection.push(validCohorts.join(" ∩ "))
                    }
                } else {
                    const regex = /(.*?)(?= \(\d+\))/;
                    const match = section.match(regex);
                    if (match) {
                        if (selectedCohorts.includes(match[1])) {
                            finalVennSelection.push(section)
                        }
                    }

                }

            })
            setSelectedCohortSections(finalVennSelection);

        }


        if (selectedCohorts.length === 0) {
            setGeneralInfo({});
            if (location && location.state && location.state.cohort && location.state.cohort.cohortId) {

            } else {
                setRowData([]);
            }

        }
    }, [selectedCohorts, selectedChart]);



    useEffect(() => {

        if (nodeIndex === 0) {
            getJoinedCohort();
        } else if (nodeIndex === 1) {
            getJoinedCohortByD(generalInfo);
        } else if (nodeIndex === 2) {
            getJoinedCohortByT(generalInfo)
        }
    }, [searchValue])

    useEffect(() => {
        if (nodeIndex === 0) {
            getJoinedCohort();
        } else if (nodeIndex === 1) {

            getJoinedCohortByD(generalInfo);
        } else if (nodeIndex === 2) {
            getJoinedCohortByT(generalInfo)
        }

    }, [generalInfo])

    useEffect(() => {

        setSelectedCohortSections([]);
        setGeneralInfo({})
        setSearchValue("");
        if (searchRef.current) {
            searchRef.current.value = "";
        }
        if (nodeIndex === 0) {
            getJoinedCohort(true);
        } else if (nodeIndex === 1) {

            getJoinedCohortByD({});
        } else if (nodeIndex === 2) {
            getJoinedCohortByT({})
        }

    }, [nodeIndex])

    useEffect(() => {
        setRefershTableContent(false)
        setTimeout(() => setRefershTableContent(true), 0)
    }, [cohortList, nodeIndex, cohortData])

    const handleClick = () => {
        if (selectedCohortSection.length > 0 && rowData.length > 0) {

            setCurrentCohortChanges(null);
            dispatch(onCreateNewCohort(
                "",
                "",
                rowData,
                (count) => {
                    triggerNotification(count, Notification);
                    setShowCohortModal(true);
                },
                (error) => {
                    setWarningMessage(error.toString().replace("Error:", ""));
                }
            ));
        }
    };

    const getTableMessage = (cohortList, selectedCohortSection, tableConfig) => {
        if (cohortList.length === 0) {
            return { noMatch: 'To proceed, please create your cohort by visiting the Explore Page.' };
        }
        if (selectedCohortSection.length === 0) {
            return tableConfig.tableMsg;
        }
        return { noMatch: "No data available for the selected segment/segments. Please try a different segment/segments." };
    };


    const initTblState = (initailState) => ({
        ...initailState,
        title: analyzer_tables[nodeIndex].name,
        query: analyzer_tables[nodeIndex].api,
        downloadButtonTooltipText: "Download data in CSV or JSON format",
        paginationAPIField: analyzer_tables[nodeIndex].paginationAPIField,
        dataKey: analyzer_tables[nodeIndex].dataKey,
        hiddenDataKeys: analyzer_tables[nodeIndex].hiddenDataKeys,
        columns: configColumn(analyzer_tables[nodeIndex].columns),
        count: 3,
        selectedRows: [],
        hiddenSelectedRows: [],
        enableRowSelection: analyzer_tables[nodeIndex].enableRowSelection,
        sortBy: tableConfig.defaultSortField,
        sortOrder: tableConfig.defaultSortDirection,
        extendedViewConfig: tableConfig.extendedViewConfig,
        rowsPerPage: 10,
        page: 0,
        onPageChange: (somevalue) => alert("ok ok"),
        downloadFileName: "download",
        showDownloadIcon: false,
        SearchBox: () => SearchBox(classes, handleSearchValue, searchValue, searchRef),
        showSearchBox: true,
        tableMsg: getTableMessage(cohortList, selectedCohortSection, tableConfig)
    });

    const Gap = () => (
        <div style={{ height: '10px' }} />
    );

    const exploreCCDIHubTooltip = <p style={{ fontFamily: "Poppins", zIndex: 10000, fontWeight: 400, fontSize: 13, margin: 0 }}>
        Clicking this button will create a url and open a new tab showing the  CCDI Hub  Explore page with filtered facets based on the user&apos;s selected  cohort.
        <br />
        <Gap />
        <b>If cohort size &le; 600:</b><br />
        Proceed with direct export within C3DC.
        <br />
        <Gap />
        <b>If cohort size &gt; 600:</b><br />
        Download the manifest and upload it manually to the <a style={{ zIndex: 10000, color: "#598AC5", fontWeight: "bolder" }} rel="noreferrer" target='_blank' href="https://ccdi.cancer.gov/explore"> CCDI Hub
            <img src={LinkoutBlue} width={14} height={14} style={{ padding: "4px 0px 0px 2px", bottom: 0, position: 'relative' }} alt="Linkout Icon" />
        </a> by following these steps:
        <ol style={{ paddingLeft: "1rem" }}>
            <li> Choose the Explore page from the menu.</li>
            <li> In the Facets side panel, open the Demographic facet.</li>
            <li> Click on “Upload Participants Set.”</li>
        </ol>
    </p>;

    const exploreDashboardTooltip = <p style={{ fontFamily: "Poppins", zIndex: 10000, fontWeight: 400, fontSize: 13, margin: 0 }}>
        Clicking this button will create a pre-filtered facet for further analysis on the Explore Dashboard

    </p>;

    return (
        <>
            <NavigateAwayModal
                open={showNavigateAwayModal}
                setOpen={setShowNavigateAwayModal}
                onConfirm={handleUserRedirect}
            />
            <DeleteConfirmationModal
                classes={""}
                open={deleteInfo.showDeleteConfirmation}
                setOpen={() => { handlePopup("", state, setDeleteInfo, deleteInfo) }}
                handleDelete={() => {
                    handleDelete(deleteInfo.cohortId,
                        setCohortList,
                        setSelectedCohorts,
                        dispatch,
                        onDeleteSingleCohort,
                        onDeleteAllCohort,
                        setGeneralInfo,
                        setRowData)
                }}
                deletionType={deleteInfo.deleteType}
            />

            <DeleteConfirmationModal
                classes={""}
                open={warningMessage}
                setOpen={() => { setWarningMessage("") }}
                handleDelete={() => { setWarningMessage("") }}
                deletionType={false}
                message={warningMessage}
            />

            <CohortModal
                open={showCohortModal}
                onCloseModal={() => setShowCohortModal(false)}
            />
            <Stats />
            <div className={classes.container}>
               
                <CohortSelector/>
                <div className={classes.rightSideAnalyzer}>
                           {alert.message && (
                    <Alert severity={alert.type}  className={classes.alert} onClose={() => setAlert({ type: '', message: '' })}>
                        {alert.message}
                    </Alert>
                )}
                    <div className={classes.rightSideAnalyzerHeader}>
                        <h1> Cohort Analyzer</h1>
                    </div>
                   

                    <div className={classes.rightSideAnalyzerOuterContainer}>
                    <div className={classes.rightSideAnalyzerInnerContainer}>
                         <div className={classes.rightSideAnalyzerHeader2}>
                        <p>After selecting cohorts using the Cohort Selector panel (on the left), the Cohort Analyzer Venn diagram will be updated. Click on a Venn diagram segment to view the relevant results. By default, the Venn diagram will use <b>Participant ID</b> to match across cohorts, but other data categories can be selected.

                            <ToolTip backgroundColor={'white'} zIndex={3000} title={"The Venn diagram is a stylized representation of selected cohorts. Numbers in parentheses show unique records for the radio button selection, while numbers inside the diagram indicate unique values. The count next to your cohort in the sidebar reflects total participants."} arrow placement="top">
                                <img alt={"question mark icon"} src={questionIcon} width={10} style={{ fontSize: 10, position: 'relative', top: -5, left: -3 }} />
                            </ToolTip>
                        </p>
                    </div>
                        <div className={classes.chartContainer}>
                            <div className={classes.chartContainerHeader}>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
                                    <div style={{display: 'flex',flexDirection: 'row', gap:0,alignItems:'center'}}>
                                        <p style={{ margin: 15, marginTop: 5,marginRight: 0, marginBottom: 0, fontSize: 17, fontFamily: 'Poppins', color: 'white' }}>Select a data category for cohort matching:</p>
                                        <ToolTip maxWidth="380px"  backgroundColor={'white'} zIndex={3000}  title={"The venn diagram is a stylized representation of the selected cohorts and their shared Participant IDs, and are not proportionally accurate,"} arrow placement="top">
                                           <img alt={"Question mark"} src={questionIcon3} style={{marginTop: -4}} height={10} />
                                        </ToolTip>
                                    </div>
                                    <div className={classes.chartRadioContainer}>
                                        <ToolTip backgroundColor={'white'} zIndex={3000} title={"All Venn diagram selected areas will be cleared when changing buttons"} arrow placement="top">
                                             <p style={{ fontSize: 15, fontFamily: 'Poppins', margin: 0, gap: 3, display: 'flex',alignItems: 'center', justifyContent: 'center',opacity: selectedCohorts.length === 0 ? 0.6 : 1 }}>
                                                <input 
                                                 style={{
                                                   appearance: 'none',
                                                   width: '10px',
                                                   height: '10px',
                                                   cursor: 'pointer',
                                                   outline: '2px solid white',
                                                   backgroundColor: nodeIndex === 0 ? '#00E1E1' : 'transparent',
                                                   borderRadius: '50%',                                   
                                                    marginTop: -3,
                                                    border: '1px solid black'
                                                }}
                                                disabled={selectedCohorts.length === 0} type="radio" value={"1"} checked={nodeIndex === 0} onClick={() => {
                                                    setNodeIndex(0);
                                                }} radioGroup="node_type" name="node_type" aria-label="Participant radio button" />
                                                Participant ID
                                            </p>
                                        </ToolTip>
                                        <ToolTip backgroundColor={'white'} zIndex={3000} title={"All Venn diagram selected areas will be cleared when changing buttons"} arrow placement="top">

                                            <p style={{ fontSize: 15, fontFamily: 'Poppins', margin: 0, gap: 3, display: 'flex',alignItems: 'center', justifyContent: 'center',opacity: selectedCohorts.length === 0 ? 0.6 : 1 }}>
                                                <input 
                                                 style={{
                                                   appearance: 'none',
                                                   width: '10px',
                                                   height: '10px',
                                                   cursor: 'pointer',
                                                   outline: '2px solid white',
                                                   backgroundColor: nodeIndex === 1 ? '#00E1E1' : 'transparent',
                                                   borderRadius: '50%',
                                                    marginTop: -3 ,
                                                    border: '1px solid black'
                                                }}
                                                disabled={selectedCohorts.length === 0} type="radio" value={"2"} onClick={() => {
                                                    setNodeIndex(1);
                                                }} radioGroup="node_type" name="node_type" aria-label="Diagnosis Radio button" />
                                                Diagnosis
                                            </p>
                                        </ToolTip>
                                        <ToolTip backgroundColor={'white'} zIndex={3000} title={"All Venn diagram selected areas will be cleared when changing buttons"} arrow placement="top">

                                              <p style={{ fontSize: 15, fontFamily: 'Poppins', margin: 0, gap: 3, display: 'flex',alignItems: 'center', justifyContent: 'center', opacity: selectedCohorts.length === 0 ? 0.6 : 1 }}>
                                                <input 
                                                 style={{
                                                   appearance: 'none',
                                                   width: '10px',
                                                   height: '10px',
                                                   cursor: 'pointer',
                                                   outline: '2px solid white',
                                                   backgroundColor: nodeIndex === 2 ? '#00E1E1' : 'transparent',
                                                   borderRadius: '50%',
                                                    marginTop: -3,
                                                    border: '1px solid black'
                                                }}
                                                disabled={selectedCohorts.length === 0} value={"3"} onClick={() => {
                                                    setNodeIndex(2);
                                                }} type="radio" radioGroup="node_type" name="node_type" aria-label="Treatment Radio button" />
                                                Treatment
                                            </p>
                                        </ToolTip>
                                    </div>
                                </div>

                                <span onClick={()=>{
                                    handleDownload();
                                }} style={{ margin: 15, cursor: selectedCohorts.length > 0 ? 'pointer' : 'not-allowed' }}>
                                    <img alt={"download icon"} src={DownloadIcon} width={60} />
                                </span>
                            </div>
                          
                            {refershTableContent && selectedCohorts.length > 0 &&
                                <ChartVenn
                                    intersection={nodeIndex}
                                    cohortData={cohortData ? (selectedCohorts.map(cohortId => cohortData[cohortId])) : (selectedCohorts.map(cohortId => state[cohortId]))}
                                    setSelectedChart={(data) => { setSelectedChart(data); setRefershSelectedChart(!refershSelectedChart) }}
                                    setSelectedCohortSections={(data) => {
                                        setSelectedCohortSections(data);
                                    }}
                                    selectedCohortSection={selectedCohortSection}
                                    selectedCohort={selectedCohorts}
                                    setGeneralInfo={setGeneralInfo}
                                    containerRef={containerRef}
                                    canvasRef={canvasRef}
                                />}

                                {selectedCohorts.length === 0 &&
                            <img src={placeHolder} alt='placeholder' width={725} style={{ marginTop: 10,alignSelf:'center' }} />
                        }
                                </div>
                        </div>

                        

                    </div>
                    <div className={classes.cohortCountSection}>
                        <div style={{
                            display: 'flex',
                            justifyContent: 'flex-end',
                            alignItems: 'center',
                            gap: '12px', // Adjust gap as needed
                            marginTop: 10,
                            flexWrap: 'wrap' // in case of small screens
                        }}>
                            {/* Create New Cohort */}
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <CreateNewCOhortButton
                                    selectedCohortSection={selectedCohortSection}
                                    classes={classes}
                                    questionIcon={questionIcon}
                                    handleClick={handleClick}
                                    ToolTip={ToolTip}
                                />
                            </div>

                            {/* Download Button */}
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <DownloadSelectedCohort
                                    queryVariable={queryVariable}
                                    isSelected={selectedCohorts.length > 0 && rowData.length > 0}
                                />
                            </div>

                            {/* BUILD IN EXPLORE DASHBOARD */}
                            <div style={{ position: "relative", marginRight: '6px' }}>
                                <button
                                    onClick={() => selectedCohorts.length > 0 && handleBuildInExplore()}
                                    className={selectedCohorts.length > 0 ? classes.exploreButton : classes.exploreButtonFaded}
                                >
                                    BUILD IN EXPLORE DASHBOARD
                                </button>
                                <div style={{ position: "absolute", top: -5, right: -13, }}>
                                    <ToolTip
                                        maxWidth="335px"
                                        border={'1px solid #598ac5'}
                                        arrowBorder={'1px solid #598AC5'}
                                        title={<div>
                                            {exploreDashboardTooltip}
                                        </div>}
                                        placement="top-end"
                                        arrow
                                        interactive
                                        arrowSize="30px"
                                    >

                                        <img alt="Question Icon" src={questionIcon} width={10} style={{ border: "0px" }} />

                                    </ToolTip>
                                </div>
                            </div>

                            {/* EXPLORE IN CCDI HUB */}
                            <div style={{ position: "relative", marginRight: '10px' }}>
                                <button
                                    onClick={() => (selectedCohorts.length > 0 && rowData.length <= 600) ? handleExportToCCDIHub() : {}}
                                    className={(selectedCohorts.length > 0 && rowData.length <= 600) ? classes.exploreButton : classes.exploreButtonFaded}
                                >
                                    EXPLORE IN CCDI HUB
                                    <img alt="link out icon" src={linkoutIcon} height={13} width={13} />
                                </button>
                                <div style={{ position: "absolute", top: -5, right: -13, }}>
                                    <ToolTip
                                        maxWidth="335px"
                                        border={'1px solid #598ac5'}
                                        arrowBorder={'1px solid #598AC5'}
                                        title={<div >
                                            {exploreCCDIHubTooltip}
                                        </div>}
                                        placement="top-end"
                                        arrow
                                        interactive
                                        arrowSize="30px"
                                    >
                                        <img alt="Question Icon" src={questionIcon} width={10} style={{ border: "0px" }} />

                                    </ToolTip>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={classes.rightSideTableContainer}>

                        {refershTableContent &&

                            <TableView
                                initState={refershInit ? initTblState : initTblState}
                                themeConfig={themeConfig}
                                tblRows={rowData}
                                queryVariables={queryVariable}
                                server={false}
                                totalRowCount={rowData.length}
                                activeTab={"Participant"}
                            />
                        }


                    </div>
                </div>
            </div>
        </>
    )
}

