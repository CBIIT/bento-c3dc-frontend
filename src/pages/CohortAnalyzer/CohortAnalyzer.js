import React, { useContext, useEffect, useRef, useState } from "react";
import { CohortStateContext } from "../../components/CohortSelectorState/CohortStateContext";
import { configColumn } from "../inventory/tabs/tableConfig/Column";
import { TableView } from "@bento-core/paginated-table";
import { themeConfig } from "../studies/tableConfig/Theme";
import trashCan from "../../assets/icons/trash_can.svg";
import trashCanBlack from "../../assets/icons/trash_can_black.svg";
import { onCreateNewCohort, onDeleteAllCohort, onDeleteSingleCohort } from "../../components/CohortSelectorState/store/action";
import { tableConfig, analyzer_query, analyzer_tables, responseKeys } from "../../bento/cohortAnalayzerPageData";
import DownloadSelectedCohort from "./downloadCohort/DownloadSelectedCohorts";
import client from "../../utils/graphqlClient";
import ToolTip from "@bento-core/tool-tip/dist/ToolTip";
import Stats from '../../components/Stats/GlobalStatsController';
import DeleteConfirmationModal from "../inventory/cohortModal/components/deleteConfirmationModal";
import sortIcon from "../../assets/icons/sort_icon.svg";
import placeHolder from "../../assets/vennDigram/placeHolder.png";
import ChartVenn from "./vennDiagram/ChartVenn";
import CheckBoxCustom from "./customCheckbox/CustomCheckbox";
import { CohortModalContext } from "../inventory/cohortModal/CohortModalContext";
import CohortModalGenerator from "../inventory/cohortModal/cohortModalGenerator";
import { useGlobal } from "../../components/Global/GlobalProvider";
import questionIcon from "../../assets/icons/Question_icon_2.svg";
import linkoutIcon from "../../assets/about/Export_Icon_White.svg";
import LinkoutBlue from "../../assets/about/Export_Icon.svg";

import { useStyle } from "./cohortAnalyzerStyling";
import {
    addCohortColumn,
    generateQueryVariable,
    handlePopup,
    handleDelete,
    resetSelection,
    SearchBox,
    sortBy,
    triggerNotification,
    sortByReturn,
    getAllIds,
    getIdsFromCohort,
    filterAllParticipantWithDiagnosisName,
    filterAllParticipantWithTreatmentType
} from "./CohortAnalyzerUtil";
import styled from "styled-components";
import { CreateNewCOhortButton } from "./CreateNewCohortButton/CreateNewCohortButton";

export const CohortAnalyzer = () => {
    const classes = useStyle();
    const { state, dispatch } = useContext(CohortStateContext);
    const [selectedCohorts, setSelectedCohorts] = useState([]);
    const [queryVariable, setQueryVariable] = useState({});
    const [rowData, setRowData] = useState([]);
    const [refershInit] = useState(false);
    const [searchValue, setSearchValue] = useState("");
    const [cohortList, setCohortList] = useState(Object.keys(state) || {});
    const [selectedChart, setSelectedChart] = useState([]);
    const [refershSelectedChart, setRefershSelectedChart] = useState(false);
    const [refershTableContent, setRefershTableContent] = useState(false);
    const [selectedCohortSection, setSelectedCohortSections] = useState([]);
    const [sortType, setSortType] = useState("alphabet");
    const [deleteInfo, setDeleteInfo] = useState({ showDeleteConfirmation: false, deleteType: '', cohortId: '' });
    const [generalInfo, setGeneralInfo] = useState({});
    const [nodeIndex, setNodeIndex] = useState(0);
    const [cohortData, setCohortData] = useState();

    const { setShowCohortModal, showCohortModal, setCurrentCohortChanges, setWarningMessage, warningMessage } = useContext(CohortModalContext);
    const { CohortModal } = CohortModalGenerator();
    const { Notification } = useGlobal();
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [HoveredCohort, setHoveredCohort] = useState(true);
    const [tooltipOpen, setTooltipOpen] = useState(false);
    
    let movedToToolTipText = false;

    const handleExportToCCDIHub = () => {
        const participantIds = rowData.map(p => p.participant_id).join("|");
        const dbgapAccessions = [...new Set(rowData.map(p => p.dbgap_accession))].join("|");
            
        const baseUrl = "https://ccdi.cancer.gov/explore?p_id=";
        const dbgapBase = "&dbgap_accession=";

        const finalUrl = `${baseUrl}${participantIds}${dbgapBase}${dbgapAccessions}`;
        window.open(finalUrl, '_blank');

        return finalUrl;
    }
    
    const handleHideTooltip = (eventSource) => {
        if (eventSource === "tooltipText") {            
            setTooltipOpen(false);
        } else if (eventSource === "questionIcon") {
            setTimeout(() => {
                if (!movedToToolTipText) {
                    setTooltipOpen(false);
                }
            }, 1000);
        }

    }

    const handleMouseMove = (event, cohortName) => {

        if (cohortName.length > 17) {
            setHoveredCohort(cohortName)
        }
        setMousePosition({ x: event.clientX, y: event.clientY });
    };
    const handleMouseLeave = () => {
        setHoveredCohort("");
    }
    const searchRef = useRef();


    const handleSearchValue = (e) => {
        setSearchValue(e.target.value)


        if (searchRef.current) {
            searchRef.current.value = e.target.value;
            if (searchRef.current.value == "") {

                setTimeout(() => {
                    searchRef.current.focus();
                }, 200);

            }
        }

    }

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
            setRowData([]);
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
            setRowData([]);
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
            setRowData([]);
        }
    }

    function shortenText(text, maxSize = 17) {
        return text.length > maxSize ? text.slice(0, maxSize) + "..." : text;
    }

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
            setRowData([]);
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


    const Wrapper = styled.div`
  display: flex;
  position: relative;
  width: 100%;
  padding: 5px;
  margin-bottom: 0;
  justify-content: space-between;
`;

    const CohortSelectionChild = styled.div`
  display: flex;
  align-items: center;
  font-size: 18px;

  & > span:first-child {
    font-size: 18px;
    font-family: Poppins;
    font-size: 18.5px;
    font-weight: 500;
  }

  & > span:last-child {
    font-size: 16px;
    font-weight: 400;
    padding-left: 4px;
    font-family: Poppins;

  }
`;

    const TrashCanIcon = styled.img`
  opacity: ${(props) => (Object.keys(props.state).length === 0 ? 0.6 : 1)};
  cursor: ${(props) => (Object.keys(props.state).length === 0 ? 'not-allowed' : 'pointer')};
    position: relative;
    bottom: -2px;
`;

    const Instructions = styled.p`
  font-size: 15px;
  padding: 0;
  margin: 0;
  margin-top: 7px;
  font-weight: 400;
  font-family: 'Open Sans';
  
`;

    const InstructionsWrapper = styled.div`
padding-left: 5px;
`;


    const handleCheckbox = (cohort, self) => {
        if (selectedCohorts.includes(cohort)) {
            let finalCohortList = [];
            selectedCohorts.forEach((cohortItem) => {
                if (cohort !== cohortItem) {
                    finalCohortList.push(cohortItem);
                }
            })
            setSelectedCohorts(finalCohortList)
        } else {
            if (selectedCohorts.length === 3) {
                self.preventDefault();
            } else {
                setSelectedCohorts([...selectedCohorts, cohort])
            }
        }

    }

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

    const exploreCCDIHubTooltip = <p style={{ fontFamily: "Poppins", zIndex: 10000, fontWeight:400, fontSize:13,margin: 0}}>
        Clicking this button will create a url and open a new tab showing the  CCDI Hub  Explore page with filtered facets based on the user&apos;s selected  cohort.
        <br />
        <Gap />
        <b>If cohort size &le; 600:</b><br />
        Proceed with direct export within C3DC.
        <br />
        <Gap />
        <b>If cohort size &gt; 600:</b><br />
        Download the manifest and upload it manually to the <a style={{ zIndex: 10000, color:"#598AC5", fontWeight:"bolder" }} target='_blank' href="https://ccdi.cancer.gov/explore"> CCDI Hub
            <img src={LinkoutBlue} width={14} height={14} style={{ padding: "4px 0px 0px 2px", bottom: 0, position: 'relative' }} alt="Linkout Icon" />
        </a> by following these steps:
        <ol style={{ paddingLeft: "1rem" }}>
            <li> Choose the Explore page from the menu.</li>
            <li> In the Facets side panel, open the Demographic facet.</li>
            <li> Click on “Upload Participants Set.”</li>
        </ol>
    </p>;

    return (
        <>
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
                <div className={classes.leftSideAnalyzer}>
                    <div className={classes.sideHeader}>
                        <>
                            <Wrapper>
                                <CohortSelectionChild>
                                    <span>{"Cohort Selector "}</span>
                                    <span>{" (" + selectedCohorts.length + "/3)"}</span>
                                </CohortSelectionChild>
                                <TrashCanIcon
                                    alt="Trashcan"
                                    state={state}
                                    onClick={() => handlePopup("", state, setDeleteInfo, deleteInfo)}
                                    src={trashCanBlack}
                                    width={18}
                                    height={20}
                                />
                            </Wrapper>
                            <InstructionsWrapper>
                                <Instructions>
                                    {"Select up to three cohorts "}
                                    <br />
                                    {"to view in the Cohort Analyzer"}
                                </Instructions>
                            </InstructionsWrapper>
                        </>
                    </div>
                    <div className={classes.sortSection}>
                        <div style={{ display: 'flex', margin: 0, alignItems: 'center', cursor: 'pointer' }}>
                            <img onClick={() => {
                                resetSelection(setSelectedCohorts, setNodeIndex);
                            }} alt={"sortIcon"} src={sortIcon} width={14} height={14} style={{ margin: 5 }} />
                            <p style={{ fontFamily: 'Nunito', fontSize: '11px', color: sortType === 'alphabet' ? '#646464' : '#646464' }} onClick={() => {
                                sortBy("alphabet", cohortList, setCohortList, state);
                                setSortType("alphabet");
                            }}> Sort Alphabetically </p>
                        </div>
                        <div onClick={() => {
                            sortBy("", cohortList, setCohortList, state);
                            setSortType("count");
                        }} className={classes.sortCount} style={{ fontFamily: 'Nunito', color: sortType === '#646464' ? 'lightgray' : '#646464' }}>
                            <p style={{ fontSize: 11 }}>Sort by Count</p>
                        </div>
                    </div>
                    <div className={classes.leftSideAnalyzerChild}>
                        {state && (sortType !== "" ? sortByReturn(sortType, Object.keys(state), state, selectedCohorts) : Object.keys(state)).map((cohort) => {
                            let cohortName = state[cohort].cohortName + " (" + state[cohort].participants.length + ")";
                            return (
                                <div onMouseMove={(e) => { handleMouseMove(e, cohortName) }} onMouseLeave={handleMouseLeave}
                                    style={{
                                        cursor: 'pointer',
                                        background: selectedCohorts.includes(cohort)
                                            ? ['#FAE69C', '#A4E9CB', '#A3CCE8'][selectedCohorts.indexOf(cohort) % 3] : 'transparent'
                                    }}
                                >

                                    <div backgroundColor={'white'} zIndex={3000} arrow placement="top">
                                        <div
                                            className={
                                                selectedCohorts.includes(cohort)
                                                    ? classes.cohortChildSelected
                                                    : selectedCohorts.length === 3 && !selectedCohorts.includes(cohort)
                                                        ? classes.CohortChildOpacity
                                                        : classes.CohortChild
                                            }
                                        >
                                            <div className={classes.cohortChildContent} >
                                                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', marginLeft: 20 }}>
                                                    <CheckBoxCustom
                                                        selectedCohorts={selectedCohorts}
                                                        cohort={cohort}
                                                        handleCheckbox={handleCheckbox} />
                                                    <span className={classes.cardContent}
                                                        style={{
                                                            color: '#000'
                                                        }} > {cohortName} </span>
                                                </div>
                                                <img alt={"Trashcan"} style={{ cursor: 'pointer', zIndex: 3 }} onClick={() => { handlePopup(cohort, state, setDeleteInfo, deleteInfo) }} src={trashCan} width={11} height={12} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
                <div className={classes.rightSideAnalyzer}>
                    <div className={classes.rightSideAnalyzerHeader}>
                        <h1> Cohort Analyzer</h1>
                    </div>
                    <div className={classes.rightSideAnalyzerHeader2}>
                        <p>After selecting cohorts using the Cohort Selector panel (on the left), the Cohort Analyzer Venn diagram will be updated. Click on a Venn diagram segment to view the relevant results. By default, the Venn diagram will use <b>Participant ID</b> to match across cohorts, but other data categories can be selected.

                            <ToolTip backgroundColor={'white'} zIndex={3000} title={"The Venn diagram is a stylized representation of selected cohorts. Numbers in parentheses show unique records for the radio button selection, while numbers inside the diagram indicate unique values. The count next to your cohort in the sidebar reflects total participants."} arrow placement="top">
                                <img alt={"question mark icon"} src={questionIcon} width={10} style={{ fontSize: 10, position: 'relative', top: -5, left: -3 }} />
                            </ToolTip>
                        </p>
                    </div>

                    <div style={{ display: 'flex', marginBottom: 40, justifyContent: 'space-between', width: '90%' }}>
                        <div className={classes.catagoryCard} >
                            <h2>Select a data category   <ToolTip backgroundColor={'white'} zIndex={3000} title={"Cohorts are compared using the data category selected below. Participant ID is the default"} arrow placement="top">


                                <img alt={"question mark icon"} src={questionIcon} width={10} style={{ fontSize: 10, position: 'relative', top: -5, left: -3 }} />

                            </ToolTip>  <br></br>for cohort matching</h2>

                            <fieldset className={classes.fieldsetReset}>
                                <legend style={{ position: 'absolute', width: '1px', height: '1px', padding: 0, margin: '-1px', overflow: 'hidden', clip: 'rect(0, 0, 0, 0)', whiteSpace: 'nowrap', border: 0 }}>
                                    Select Node Type
                                </legend>

                                <div className={classes.catagoryCardChildren}>

                                    <ToolTip backgroundColor={'white'} zIndex={3000} title={"All Venn diagram selected areas will be cleared when changing buttons"} arrow placement="top">
                                        <p>
                                            <input disabled={selectedCohorts.length === 0} type="radio" value={"1"} checked={nodeIndex === 0} onClick={() => {
                                                setNodeIndex(0);
                                            }} radioGroup="node_type" name="node_type" aria-label="Participant radio button" />
                                            Participant ID
                                        </p>
                                    </ToolTip>
                                    <ToolTip backgroundColor={'white'} zIndex={3000} title={"All Venn diagram selected areas will be cleared when changing buttons"} arrow placement="top">

                                        <p>
                                            <input disabled={selectedCohorts.length === 0} type="radio" value={"2"} onClick={() => {
                                                setNodeIndex(1);
                                            }} radioGroup="node_type" name="node_type" aria-label="Daignosis Radio button" />
                                            Diagnosis
                                        </p>
                                    </ToolTip>
                                    <ToolTip backgroundColor={'white'} zIndex={3000} title={"All Venn diagram selected areas will be cleared when changing buttons"} arrow placement="top">

                                        <p>
                                            <input disabled={selectedCohorts.length === 0} value={"3"} onClick={() => {
                                                setNodeIndex(2);
                                            }} type="radio" radioGroup="node_type" name="node_type" aria-label="Treatment Radio button" />
                                            Treatment
                                        </p>
                                    </ToolTip>

                                </div>
                            </fieldset>
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
                            />}

                        {selectedCohorts.length === 0 &&
                            <img src={placeHolder} alt='placeholder' width={725} style={{ marginTop: -30 }} />
                        }

                    </div>
                    <div className={classes.cohortCountSection}>

                        <div style={{ display: 'flex', justifyContent: 'space-evenly', width: '65%',marginTop: 10 }}>
                            <CreateNewCOhortButton
                                selectedCohortSection={selectedCohortSection}
                                classes={classes}
                                questionIcon={questionIcon}
                                handleClick={handleClick}
                                ToolTip={ToolTip}
                            />
                            <DownloadSelectedCohort queryVariable={queryVariable} isSelected={selectedCohorts.length > 0 && rowData.length > 0} />
                            <div style={{height: 45, display: 'flex' ,flexDirection: 'row', gap: 1, marginLeft: 10}}>
                                <button
                                    onClick={() => {
                                        if (selectedCohorts.length > 0) {
                                            handleExportToCCDIHub();
                                        }

                                    }}
                                    className={selectedCohorts.length > 0 ? classes.exploreButton : classes.exploreButtonFaded}>
                                    EXPLORE IN CCDI HUB
                                    <img alt="link out icon" src={linkoutIcon} height={13} width={13} />
                                </button>
                                <ToolTip
                                    open={tooltipOpen}
                                    disableHoverListener 
                                    maxWidth="335px"
                                    border={'1px solid #598ac5'}
                                    arrowBorder={'1px solid #598AC5'}
                                    title={<div onMouseEnter={() => { movedToToolTipText =true; setTooltipOpen(true); }} onMouseLeave={()=>handleHideTooltip("tooltipText")}>

                                        {exploreCCDIHubTooltip}

                                    </div>} 
                                    placement="top-end" 
                                    arrow 
                                    arrowSize="30px">
                                    <div
                                        style={{ textAlign: 'right', marginLeft: 5, marginRight: 10 }} 
                                    >
                                        <img alt={"Question Icon"} src={questionIcon} width={10} style={{ fontSize: 10, position: 'relative', top: -5, left: -3 }} onMouseEnter={() => { movedToToolTipText = false; setTooltipOpen(true); }} onMouseLeave={() => handleHideTooltip("questionIcon")} />
                                    </div>
                                </ToolTip>
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

