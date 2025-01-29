import React, { useContext, useEffect, useRef, useState } from "react";
import { CohortStateContext } from "../../components/CohortSelectorState/CohortStateContext";
import { DISPLAY_COHORT_QUERY } from "../../bento/dashboardTabData";
import { configColumn } from "../inventory/tabs/tableConfig/Column";
import { TableView } from "@bento-core/paginated-table";
import { themeConfig } from "../studies/tableConfig/Theme";
import trashCan from "../../assets/icons/trash_can.svg";
import { onCreateNewCohort, onDeleteAllCohort, onDeleteSingleCohort } from "../../components/CohortSelectorState/store/action";
import { tableConfig, analyzer_query, analyzer_tables, responseKeys } from "../../bento/cohortAnalayzerPageData";
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
    const [nodeIndex, setNodeIndex] = useState(0);
    const [cohortData, setCohortData] = useState();

    const { setShowCohortModal, showCohortModal, setCurrentCohortChanges, setWarningMessage, warningMessage } = useContext(CohortModalContext);
    const { CohortModal } = CohortModalGenerator();
    const { Notification } = useGlobal();

    const searchRef = useRef();


    const handleSearchValue = (e) => {
        setSearchValue(e.target.value)
        if (searchRef.current) {
            searchRef.current.value = e.target.value;
        }

    }

    function updatedCohortContent(newParticipantsData) {

        selectedCohorts.forEach(cohortId => {
            const existingParticipants = state[cohortId].participants || [];
            const existingParticipantPks = existingParticipants.map(p => p.participant_pk);

            const newParticipants = newParticipantsData.filter(newParticipant =>
                !existingParticipantPks.includes(newParticipant.participant_pk)
            );

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
            state[cohortId] = {
                ...state[cohortId],
                participants: updatedParticipants,
            };
            setCohortData(state);
        });

    }

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
                let filteredRowData = data[responseKeys[nodeIndex]].filter((a, b) => a.participant_id.includes(searchValue))
                setRowData(addCohortColumn(filteredRowData, state, selectedCohorts));
            } else {
                setRowData(addCohortColumn(data[responseKeys[nodeIndex]], state, selectedCohorts));
                updatedCohortContent(data[responseKeys[nodeIndex]])

            }
        } else {
            setRowData([]);
        }
    }

    async function getJoinedCohortByD(selectedCohortSection = null) {
        let queryVariables = generateQueryVariable(selectedCohorts, state);
        if (Object.keys(generalInfo).length > 0) {
            queryVariables = { "participant_pks": getIdsFromCohort(state, selectedCohorts), first: 10000 };
        }
        setQueryVariable(queryVariables);
        const { data } = await client.query({
            query: analyzer_query[nodeIndex],
            variables: queryVariables,
        });
        if (queryVariables.participant_pks.length > 0) {
            if (searchValue !== "") {
                let filteredRowData = data[responseKeys[nodeIndex]].filter((a, b) => a.participant_id.includes(searchValue))
                setRowData(addCohortColumn(filteredRowData, state, selectedCohorts));
            } else {


                if (JSON.stringify(selectedCohortSection) !== "{}") {

                    let filterRowData = filterAllParticipantWithDiagnosisName(generalInfo, data[responseKeys[nodeIndex]])
                    setRowData(addCohortColumn(filterRowData, state, selectedCohorts));
                    updatedCohortContent(filterRowData)
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
            queryVariables = { "participant_pks": getIdsFromCohort(state, selectedCohorts), first: 10000 };
        }
        setQueryVariable(queryVariables);
        const { data } = await client.query({
            query: analyzer_query[nodeIndex],
            variables: queryVariables,
        });
        if (queryVariables.participant_pks.length > 0) {
            if (searchValue !== "") {
                let filteredRowData = data[responseKeys[nodeIndex]].filter((a, b) => a.participant_id.includes(searchValue))
                setRowData(addCohortColumn(filteredRowData, state, selectedCohorts));
            } else {


                if (JSON.stringify(selectedCohortSection) !== "{}") {

                    let filterRowData = filterAllParticipantWithTreatmentType(generalInfo, data[responseKeys[nodeIndex]])
                    setRowData(addCohortColumn(filterRowData, state, selectedCohorts));
                    updatedCohortContent(filterRowData)
                } else {
                    setRowData(addCohortColumn(data[responseKeys[nodeIndex]], state, selectedCohorts));
                    updatedCohortContent(data[responseKeys[nodeIndex]])
                }

            }
        } else {
            setRowData([]);
        }
    }


    useEffect(() => {
        setSearchValue("");
        if (searchRef.current) {
            searchRef.current.value = "";
        }

    }, [selectedChart])

    useEffect(() => {


        if (selectedChart.length === 0) {
            if (nodeIndex === 0) {
                getJoinedCohort();
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
        getJoinedCohort()
    }, [searchValue])

    useEffect(() => {
        if (nodeIndex === 0) {
            getJoinedCohort();
        } else if (nodeIndex === 1) {

            getJoinedCohortByD(generalInfo);
        } else if (nodeIndex === 2) {
            getJoinedCohortByT(generalInfo)
        }

    }, [generalInfo, nodeIndex])

    useEffect(() => {
        
        setSelectedCohortSections([]);
        setGeneralInfo({})
        if (nodeIndex === 0) {
            getJoinedCohort();
        } else if (nodeIndex === 1) {

            getJoinedCohortByD(generalInfo);
        } else if (nodeIndex === 2) {
            getJoinedCohortByT(generalInfo)
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
        downloadFileName: "download",
        showDownloadIcon: false,
        SearchBox: () => SearchBox(classes, handleSearchValue, searchValue, searchRef),
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
                                        <img alt={"Trashcan"} style={{ cursor: 'pointer' }} onClick={() => { handlePopup(cohort, state, setDeleteInfo, deleteInfo) }} src={trashCan} width={15} height={16} />
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

                    <div style={{ display: 'flex', marginBottom: 40, justifyContent: 'space-between',width: '90%' }}>
                        <div className={classes.catagoryCard} >
                            <h3>Select a data category   <ToolTip backgroundColor={'white'} zIndex={3000} title={"Cohorts are compared using the data category selected below. Participant ID is the default"} arrow placement="top">

                                <Help size={5} style={{ fontSize: 12 }} />

                            </ToolTip>  <br></br>for cohort matching</h3>
                            <div className={classes.catagoryCardChildren}>
                                <ToolTip backgroundColor={'white'} zIndex={3000} title={"All Venn diagram selected areas will be cleared when changing buttons"} arrow placement="top">
                                    <p>
                                        <input disabled={selectedCohorts.length === 0} type="radio" onClick={() => {
                                            setNodeIndex(0);
                                        }} radioGroup="node_type" name="node_type" />
                                        Participant ID
                                    </p>
                                </ToolTip>
                                <ToolTip backgroundColor={'white'} zIndex={3000} title={"All Venn diagram selected areas will be cleared when changing buttons"} arrow placement="top">

                                    <p>
                                        <input disabled={selectedCohorts.length === 0} type="radio" onClick={() => {
                                            setNodeIndex(1);
                                        }} radioGroup="node_type" name="node_type" />
                                        Diagnosis
                                    </p>
                                </ToolTip>
                                <ToolTip backgroundColor={'white'} zIndex={3000} title={"All Venn diagram selected areas will be cleared when changing buttons"} arrow placement="top">

                                    <p>
                                        <input disabled={selectedCohorts.length === 0} onClick={() => {
                                            setNodeIndex(2);
                                        }} type="radio" radioGroup="node_type" name="node_type" />
                                        Treatment
                                    </p>
                                </ToolTip>
                            </div>

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
                            <DownloadSelectedCohort queryVariable={queryVariable} isSelected={selectedCohorts.length > 0 && rowData.length > 0} />

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