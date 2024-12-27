import React, { useContext, useEffect, useState } from "react";
import { CohortStateContext } from "../../components/CohortSelectorState/CohortStateContext";
import { GET_COHORT_MANIFEST_QUERY } from "../../bento/dashboardTabData";
import { configColumn } from "../inventory/tabs/tableConfig/Column";
import { TableView } from "@bento-core/paginated-table";
import { themeConfig } from "../studies/tableConfig/Theme";
import trashCan from "../../assets/icons/trash_can.svg";
import { onCreateNewCohort, onDeleteAllCohort, onDeleteSingleCohort } from "../../components/CohortSelectorState/store/action";
import { analyzer_query, analyzer_tables, tableConfig } from "../../bento/cohortAnalayzerPageData";
import DownloadSelectedCohort from "./downloadCohort/DownloadSelectedCohorts";
import client from "../../utils/graphqlClient";
import ToolTip from "@bento-core/tool-tip/dist/ToolTip";
import Question_Icon from '../../assets/icons/Question_Icon.svg';
import Stats from '../../components/Stats/GlobalStatsController';
import DeleteConfirmationModal from "../inventory/cohortModal/components/deleteConfirmationModal";
import sortIcon from "../../assets/icons/sort_icon.svg";
import placeHolder from "../../assets/vennDigram/placeHolder.png";
import ChartVenn from "./vennDiagram/ChartVenn";
import CheckBoxCustom from "./customCheckbox/CustomCheckbox";
import { CohortModalContext } from "../inventory/cohortModal/CohortModalContext";
import CohortModalGenerator from "../inventory/cohortModal/cohortModalGenerator";
import { useGlobal } from "../../components/Global/GlobalProvider";
import { Help } from "@material-ui/icons";
import { useStyle } from "./cohortAnalyzerStyling";
import {
    addCohortColumn,
    generateQueryVariable,
    getAllIds,
    handlePopup,
    handleDelete,
    resetSelection,
    SearchBox,
    sortBy,
    triggerNotification,
    sortByReturn
} from "./CohortAnalyzerUtil";

export const CohortAnalyzer = () => {
    const classes = useStyle();
    const { state, dispatch } = useContext(CohortStateContext);
    const [selectedCohorts, setSelectedCohorts] = useState([]);
    const [queryVariable, setQueryVariable] = useState({});
    const [rowData, setRowData] = useState([]);
    const [searchValue, setSearchValue] = useState("");
    const [cohortList, setCohortList] = useState(Object.keys(state) || {});
    const [selectedChart, setSelectedChart] = useState([]);
    const [refershSelectedChart, setRefershSelectedChart] = useState(false);
    const [refershTableContent, setRefershTableContent] = useState(false);
    const [selectedCohortSection, setSelectedCohortSections] = useState([]);
    const [sortType, setSortType] = useState("alphabet");
    const [deleteInfo, setDeleteInfo] = useState({ showDeleteConfirmation: false, deleteType: '', cohortId: '' });
    const [generalInfo, setGeneralInfo] = useState({});
    const [nodeIndex,setNodeIndex] = useState(0);

    const { setShowCohortModal, showCohortModal, setCurrentCohortChanges, setWarningMessage, warningMessage } = useContext(CohortModalContext);
    const { CohortModal } = CohortModalGenerator();
    const { Notification } = useGlobal();

    async function getJoinedCohort() {
        let queryVariables = generateQueryVariable(selectedCohorts, state);
        if (Object.keys(generalInfo).length > 0) {
            queryVariables = { "participant_pks": getAllIds(generalInfo), first: 10000 };
        }
        setQueryVariable(queryVariables);
        const { data } = await client.query({
            query: analyzer_query[nodeIndex],
            variables: queryVariables,
        });
        if (queryVariables.participant_pks.length > 0) {
            if (searchValue !== "") {
                let filteredRowData = rowData.filter((a, b) => a.participant_id.includes(searchValue))
                setRowData(addCohortColumn(filteredRowData, state));
            } else {
                setRowData(addCohortColumn(data['diagnosisOverview'], state));
            }
        } else {
            setRowData([]);
        }
    }

    useEffect(() => {
        setSearchValue("");
    }, [selectedChart])

    useEffect(() => {
        if (selectedChart.length === 0) {
            getJoinedCohort();
        }
        if (selectedCohorts.length === 0) {
            setGeneralInfo({});
            setRowData([]);
        }
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
    }, [selectedCohorts, selectedChart]);

    useEffect(() => {
        getJoinedCohort()
    }, [searchValue])

    useEffect(() => {
        getJoinedCohort();
    }, [generalInfo,nodeIndex])

    useEffect(() => {
        setRefershTableContent(false)
        setTimeout(() => setRefershTableContent(true), 0)
    }, [cohortList,nodeIndex])

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

    const getTitle = () => {
        if(Object.keys(state).length === 0){
            return "To proceed, please create your cohort by visiting the Explore Page.";
        }else if(selectedCohorts.length === 0){
            return "Please select up to 3 cohorts from the Cohort List to view the interactive Venn diagram and corresponding table row information.";
        }else{
            return "Click on a circle(s) and/or overlapping section(s) in the venn diagram to view the corresponding data within the table below.";
        }
    }

    const initTblState = (initailState) => ({
        ...initailState,
        title: analyzer_tables[nodeIndex].name,
        query: analyzer_tables[nodeIndex].api,
        downloadButtonTooltipText: "Download data in CSV or JSON format",
        paginationAPIField: analyzer_tables[nodeIndex].paginationAPIField,
        dataKey:analyzer_tables[nodeIndex].dataKey,
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
        downloadFileName: "download",
        showDownloadIcon: false,
        SearchBox: () => SearchBox(classes, setSearchValue, searchValue),
        showSearchBox: true,
        tableMsg: (cohortList.length === 0) ? {
            noMatch: 'To proceed, please create your cohort by visiting the Explore Page.'
        } : tableConfig.tableMsg
    });

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
                        <div className={classes.cohortSelectionChild}>
                            <span> {"COHORTS (" + Object.keys(state).length + ")"} </span>
                            <ToolTip title={"A maximum of 3 cohorts can be selected at this time."} arrow placement="top">
                                <img alt={"QuestionMark"} src={Question_Icon} width={"10px"} height={"10px"} />
                            </ToolTip>
                        </div>
                        <img alt={"Trashcan"} style={{ opacity: Object.keys(state).length === 0 ? 0.6 : 1 }} onClick={() => handlePopup("", state, setDeleteInfo, deleteInfo)} src={trashCan} width={15} height={16} />
                    </div>
                    <div className={classes.sortSection}>
                        <div style={{ display: 'flex', margin: 0, alignItems: 'center', cursor: 'pointer' }}>
                            <img onClick={() => {
                                resetSelection(setSelectedCohorts);
                            }} alt={"sortIcon"} src={sortIcon} width={14} height={14} style={{ margin: 5 }} />
                            <p style={{ fontFamily: 'Nunito', fontSize: '9px', color: sortType === 'alphabet' ? 'lightgray' : '#646464' }} onClick={() => {
                                sortBy("alphabet", cohortList, setCohortList, state);
                                setSortType("alphabet");
                            }}> Sort Alphabetically </p>
                        </div>
                        <div onClick={() => {
                            sortBy("", cohortList, setCohortList, state);
                            setSortType("count");
                        }} className={classes.sortCount} style={{ fontFamily: 'Nunito', fontSize: '9px', color: sortType === 'count' ? 'lightgray' : '#646464' }}>
                            <p>Sort by Count</p>
                        </div>
                    </div>
                    <div className={classes.leftSideAnalyzerChild}>
                        {state && (sortType !== "" ? sortByReturn(sortType, Object.keys(state), state, selectedCohorts) : Object.keys(state)).map((cohort) => {
                            return (
                                <div className={selectedCohorts.length === 3 && !selectedCohorts.includes(cohort) ? classes.CohortChild : classes.CohortChild}  >
                                    <div className={classes.cohortChildContent} >
                                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', marginLeft: 6 }}>
                                            <CheckBoxCustom
                                                selectedCohorts={selectedCohorts}
                                                cohort={cohort}
                                                handleCheckbox={handleCheckbox} />
                                            <span className={classes.cardContent} style={{ opacity: selectedCohorts.length === 3 && !selectedCohorts.includes(cohort) ? 0.3 : 1 }} > {state[cohort].cohortName + " (" + state[cohort].participants.length + ")"} </span>
                                        </div>
                                        <img alt={"Trashcan"} onClick={() => { handlePopup(cohort, state, setDeleteInfo, deleteInfo) }} src={trashCan} width={15} height={16} />
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
                        <p>{getTitle()}</p>
                    </div>
                   

                    <div style={{ display: 'flex', marginBottom: 40 }}>
                    <div className={classes.catagoryCard}>
                            <h3>Select a data category for cohort matching</h3>
                            <div className={classes.catagoryCardChildren}>
                                <p>
                                    <input type="radio" onClick={() => {
                                        setNodeIndex(0);
                                    }}  radioGroup="node_type" name="node_type" />
                                    Participant Pk
                                </p>
                                <p>
                                    <input type="radio" onClick={() => {
                                        setNodeIndex(1);
                                    }} radioGroup="node_type" name="node_type"  />
                                    Diagnosis Pk
                                </p>
                                <p>
                                    <input onClick={() => {
                                        setNodeIndex(2);
                                    }}  type="radio" radioGroup="node_type" name="node_type" />
                                    Treatment Pk
                                </p>
                            </div>
                        </div>
                        {refershTableContent && selectedCohorts.length > 0 && <ChartVenn cohortData={selectedCohorts.map(cohortId => state[cohortId])}
                            setSelectedChart={(data) => { setSelectedChart(data); setRefershSelectedChart(!refershSelectedChart) }}
                            setSelectedCohortSections={(data) => {
                                setSelectedCohortSections(data);
                            }}
                            selectedCohortSection={selectedCohortSection}
                            selectedCohort={selectedCohorts}
                            setGeneralInfo={setGeneralInfo}
                        />}

                        {selectedCohorts.length === 0 &&
                            <img src={placeHolder} width={725} style={{marginTop:-30}} />
                        }

                    </div>
                    <div className={classes.cohortCountSection}>
                        <div className={classes.cohortSelectionChild}>
                            <span>{"SELECTED COHORTS (" + selectedCohorts.length + "/3)"}</span>
                            <ToolTip title={"A maximum of 3 cohorts can be selected at this time."} arrow placement="top">

                                <img alt={"QuestionMark"} src={Question_Icon} width={"10px"} height={"10px"} />
                            </ToolTip>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-evenly', width: '45%' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <button onClick={() => handleClick()} className={(selectedCohortSection.length === 0 || rowData.length === 0) ? classes.createCohortOpacity : classes.createCohort} >CREATE NEW COHORT</button>
                                <ToolTip title={"Click to create a new cohort based on these analysis results."} arrow placement="top">
                                    <div
                                        style={{ textAlign: 'right', marginLeft: 5, marginRight: 10 }}
                                    >
                                        <Help size={5} style={{ fontSize: 12 }} />
                                    </div>
                                </ToolTip>
                            </div>
                            <DownloadSelectedCohort queryVariable={queryVariable} isSelected={selectedCohorts.length > 0} />

                        </div>
                    </div>
                    <div className={classes.rightSideTableContainer}>
                        {refershTableContent && !searchValue &&

                            <TableView
                                initState={!searchValue ? initTblState : initTblState}
                                themeConfig={themeConfig}
                                tblRows={rowData}
                                queryVariables={queryVariable}
                                server={false}
                                totalRowCount={rowData.length}
                                activeTab={"Participant"}
                            />
                        }

                        {refershTableContent && searchValue &&
                            <TableView
                                initState={initTblState}
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