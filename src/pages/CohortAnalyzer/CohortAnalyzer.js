import React, { useContext, useEffect, useRef } from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import { CohortStateContext } from "../../components/CohortSelectorState/CohortStateContext";
import { configColumn } from "../inventory/tabs/tableConfig/Column";
import { themeConfig } from "../studies/tableConfig/Theme";
import { onCreateNewCohort, onDeleteAllCohort, onDeleteSingleCohort } from "../../components/CohortSelectorState/store/action";
import { tableConfig, analyzer_tables } from "../../bento/cohortAnalayzerPageData";
import ToolTip from "@bento-core/tool-tip/dist/ToolTip";
import Stats from '../../components/Stats/GlobalStatsController';
import DeleteConfirmationModal from "../../components/CohortModal/components/shared/DeleteConfirmationModal";
import NavigateAwayModal from './navigateAwayModal';
import { CohortModalContext } from "../../components/CohortModal/CohortModalContext";
import CohortModal from "../../components/CohortModal/CohortModal";
import Alert from '@material-ui/lab/Alert';
import { useGlobal } from "../../components/Global/GlobalProvider";
import questionIcon from "../../assets/icons/Question_icon_2.svg";
import { useStyle } from "./cohortAnalyzerStyling";
import { CohortAnalyzerTableSection } from "./CohortAnalyzerTableSection/CohortAnalyzerTableSection"
import {
    handlePopup,
    handleDelete,
    SearchBox,
    triggerNotification,
} from "./CohortAnalyzerUtil/CohortAnalyzerUtil";
import store from "../../store";
import { updateUploadData, updateUploadMetadata } from "@bento-core/local-find";
import { CohortSelector } from "./CohortSelector/CohortSelector";
import { useCohortAnalyzer } from "./CohortAnalyzerContext";
import VennDiagramContainer from "./vennDiagram/VennDiagramContainer";
import Histogram from "./HistogramPanel/Histogram";
import { getJoinedCohortData } from "./CohortAnalyzerUtil/CohortDataTransform";
import { demoCohorts } from "../../bento/demoCohortData";

export const CohortAnalyzer = () => {
    //context
    const cohortAnalyzerContext = useCohortAnalyzer();
    // Cohort selection and list management
    const {
        selectedCohorts,
        setSelectedCohorts,
        cohortList,
        setCohortList,
        nodeIndex,
    } = cohortAnalyzerContext;
    // Cohort data and general info
    const {
        cohortData,
        setCohortData,
        generalInfo,
        setGeneralInfo,
    } = cohortAnalyzerContext;
    // Row data and table refresh
    const {
        rowData,
        setRowData,
        setRefreshTableContent,
    } = cohortAnalyzerContext;
    // Search and query
    const {
        searchValue,
        setSearchValue,
        setQueryVariable,
    } = cohortAnalyzerContext;
    // Chart and cohort section selection
    const {
        selectedChart,
        selectedCohortSection,
        setSelectedCohortSections,
    } = cohortAnalyzerContext;
    // Modal and alert handling
    const {
        setDeleteInfo,
        deleteInfo,
        handleCheckbox,
        showNavigateAwayModal,
        setShowNavigateAwayModal,
        setAlert,
    } = cohortAnalyzerContext;

    const containerRef = useRef(null);
    const canvasRef = useRef(null);
    const classes = useStyle();
    const { state, dispatch } = useContext(CohortStateContext);
    const { setShowCohortModal, showCohortModal, setCurrentCohortChanges, setWarningMessage, warningMessage } = useContext(CohortModalContext);
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

    async function getJoinedCohort(isReset = false) {
        await getJoinedCohortData({
            nodeIndex,
            selectedCohorts,
            state,
            generalInfo,
            searchValue,
            isReset,
            setQueryVariable,
            setRowData,
            location,
            setCohortData
        });
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
            getJoinedCohort();
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
        getJoinedCohort();
    }, [searchValue])

    useEffect(() => {
        getJoinedCohort();
    }, [generalInfo])

    useEffect(() => {

        setSelectedCohortSections([]);
        setGeneralInfo({})
        setSearchValue("");
        if (searchRef.current) {
            searchRef.current.value = "";
        }
        getJoinedCohort(true);

    }, [nodeIndex])

    useEffect(() => {
        setRefreshTableContent(false)
        setTimeout(() => setRefreshTableContent(true), 0)
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

    const handleDemoClick = () => {
        // Check if adding 3 demo cohorts would exceed the 20-cohort limit
        if (Object.keys(state).length > 17) {
            Notification.show('Cannot add demo cohorts. You have reached the maximum limit of 20 cohorts. Please delete some cohorts first.', 5000);
            return;
        }

        let successCount = 0;
        const totalCohorts = demoCohorts.length;
        

        const handleDemoSuccess = (count) => {
            successCount++;
            if (successCount === totalCohorts) {
                // Hardcode the demo cohort keys for automatic selection
                const demoCohortKeys = [
                    'demo cohort 1',
                    'demo cohort 2', 
                    'demo cohort 3'
                ];
                
                setSelectedCohorts(demoCohortKeys);
                
                Notification.show(`Successfully created and selected ${totalCohorts} demo cohorts! View the results in the Venn diagram and histogram below.`, 7000);
            }
        };

        const handleDemoError = (error) => {
            Notification.show(`Failed to create demo cohorts: ${error.message}`, 5000);
        };

        // Create each demo cohort
        demoCohorts.forEach(cohort => {
            dispatch(onCreateNewCohort(
                cohort.cohortId,
                cohort.cohortDescription,
                cohort.participants,
                handleDemoSuccess,
                handleDemoError
            ));
        });
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

                <CohortSelector />
                <div className={classes.rightSideAnalyzer}>
                    {alert.message && (
                        <Alert severity={alert.type} className={classes.alert} onClose={() => setAlert({ type: '', message: '' })}>
                            {alert.message}
                        </Alert>
                    )}
                    <div className={classes.rightSideAnalyzerHeader} style={{ justifyContent: 'flex-start', alignItems: 'center' }}>
                        <h1> Cohort Analyzer</h1>
                        <div className={classes.demoButtonContainer}>
                            <ToolTip
                                maxWidth="335px"
                                border={'1px solid #598ac5'}
                                arrowBorder={'1px solid #598AC5'}
                                title={
                                    <div className={classes.demoTooltipContent}>
                                        {Object.keys(state).length > 17 ? (
                                            <p>Cannot add demo cohorts. You have reached the maximum limit of 20 cohorts. Please delete some cohorts first.</p>
                                        ) : (
                                            <p>Launch a demonstration of the Cohort Analyzer by clicking this button.</p>
                                        )}
                                    </div>
                                }
                                placement="top"
                                arrow
                                interactive
                                arrowSize="30px"
                            >
                                <button
                                    onClick={handleDemoClick}
                                    disabled={Object.keys(state).length > 17}
                                    className={Object.keys(state).length > 17 ? classes.demoButtonFaded : classes.demoButton}
                                >
                                    Cohort Analyzer Demo
                                </button>
                            </ToolTip>
                        </div>
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
                            <VennDiagramContainer
                                state={state}
                                containerRef={containerRef}
                                canvasRef={canvasRef}
                                classes={classes}
                            />
                        </div>

                        <Histogram
                            c1={selectedCohorts[0] && state && state[selectedCohorts[0]] ? state[selectedCohorts[0]].participants.map((item) => item.id) : []}
                            c2={selectedCohorts[1] && state && state[selectedCohorts[1]] ? state[selectedCohorts[1]].participants.map((item) => item.id) : []}
                            c3={selectedCohorts[2] && state && state[selectedCohorts[2]] ? state[selectedCohorts[2]].participants.map((item) => item.id) : []}
                        />
                    </div>
                     <CohortAnalyzerTableSection
                        classes={classes}
                        selectedCohortSection={selectedCohortSection}
                        questionIcon={questionIcon}
                        handleClick={handleClick} 
                        handleBuildInExplore={handleBuildInExplore}
                        handleExportToCCDIHub={handleExportToCCDIHub}
                        initTblState={initTblState}
                        themeConfig={themeConfig}
                    />
                </div>
            </div>
        </>
    )
}

