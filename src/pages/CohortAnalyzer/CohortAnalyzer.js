import React, { useContext, useEffect, useState } from "react";
import { CohortStateContext } from "../../components/CohortSelectorState/CohortStateContext";
import { GET_COHORT_MANIFEST_QUERY } from "../../bento/dashboardTabData";
import { configColumn } from "../inventory/tabs/tableConfig/Column";
import { TableView } from "@bento-core/paginated-table";
import { themeConfig } from "../studies/tableConfig/Theme";
import trashCan from "../../assets/icons/trash_can.svg";
import { onCreateNewCohort, onDeleteAllCohort, onDeleteSingleCohort } from "../../components/CohortSelectorState/store/action";
import { tableConfig } from "../../bento/cohortAnalayzerPageData";
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
import styled from "styled-components";

export const CohortAnalyzer = () => {
    const classes = useStyle();
    const { state, dispatch } = useContext(CohortStateContext);
    const [selectedCohorts, setSelectedCohorts] = useState([]);
    const [queryVariable, setQueryVariable] = useState({});
    const [rowData, setRowData] = useState([]);
    const [refershInit, setRefershInit] = useState(false);
    const [searchValue, setSearchValue] = useState("");
    const [cohortList, setCohortList] = useState(Object.keys(state) || {});
    const [selectedChart, setSelectedChart] = useState([]);
    const [refershSelectedChart, setRefershSelectedChart] = useState(false);
    const [refershTableContent, setRefershTableContent] = useState(false);
    const [selectedCohortSection, setSelectedCohortSections] = useState([]);
    const [sortType, setSortType] = useState("alphabet");
    const [deleteInfo, setDeleteInfo] = useState({ showDeleteConfirmation: false, deleteType: '', cohortId: '' });
    const [generalInfo, setGeneralInfo] = useState({});

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
            query: GET_COHORT_MANIFEST_QUERY,
            variables: queryVariables,
        });
        if (queryVariables.participant_pks.length > 0) {
            if (searchValue !== "") {
                let filteredRowData = rowData.filter((a, b) => a.participant_id.includes(searchValue))
                setRowData(addCohortColumn(filteredRowData, state, selectedCohorts));
            } else {
                setRowData(addCohortColumn(data['diagnosisOverview'], state, selectedCohorts));
                setRefershInit(!refershInit)
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
    }, [generalInfo])

    useEffect(() => {
        setRefershTableContent(false)
        setTimeout(() => setRefershTableContent(true), 0)
    }, [cohortList])


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
  padding: 0;
  padding-left: 10px;
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

    const getTitle = () => {
        if (Object.keys(state).length === 0) {
            return "To proceed, please create your cohort by visiting the Explore Page.";
        } else if (selectedCohorts.length === 0) {
            return "Please select up to 3 cohorts from the Cohort List to view the interactive Venn diagram and corresponding table row information.";
        } else {
            return "Click on a circle(s) and/or overlapping section(s) in the venn diagram to view the corresponding data within the table below.";
        }
    }

    const initTblState = (initailState) => ({
        ...initailState,
        title: tableConfig.name,
        query: tableConfig.api,
        downloadButtonTooltipText: "Download data in CSV or JSON format",
        paginationAPIField: tableConfig.paginationAPIField,
        dataKey: tableConfig.dataKey,
        hiddenDataKeys: tableConfig.hiddenDataKeys,
        columns: configColumn(tableConfig.columns),
        count: 3,
        selectedRows: [],
        hiddenSelectedRows: [],
        enableRowSelection: tableConfig.enableRowSelection,
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
                                    src={trashCan}
                                    width={15}
                                    height={16}
                                />
                            </Wrapper>
                            <InstructionsWrapper>
                                <Instructions>
                                    {"Select up to three cohorts to view in the Cohort Analyzer"}
                                </Instructions>
                            </InstructionsWrapper>
                        </>
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
                                <div className={!selectedCohorts.includes(cohort) ? classes.CohortChild : classes.cohortChildSelected}  >
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
                        <p>After selecting cohorts using the Cohort Selector panel (on the left), the Cohort Analyzer Venn diagram will be updated. Click on a Venn diagram segment to view the relevant results. By default, the Venn diagram will use <b>Participant ID</b> to match across cohorts, but other data categories can be selected.

                            <ToolTip backgroundColor={'white'} zIndex={3000} title={"The Venn diagram is a stylized representation of the selected cohorts and their shared Participant IDs, and are not proportionally accurate."} arrow placement="top">
                                <Help size={5} style={{ fontSize: 14 }} />
                            </ToolTip>
                        </p>
                    </div>

                    <div style={{ display: 'flex', marginBottom: 40, width: '100%', alignItems: 'flex-end', justifyContent: 'center' }}>
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
                            <img src={placeHolder} width={725} style={{ marginTop: -50 }} />
                        }

                    </div>
                    <div className={classes.cohortCountSection}>

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