import { Checkbox, makeStyles } from "@material-ui/core";
import React, { useContext, useEffect, useState } from "react";
import { CohortStateContext } from "../../components/CohortSelectorState/CohortStateContext";
import { GET_COHORT_MANIFEST_QUERY } from "../../bento/dashboardTabData";
import { configColumn } from "../inventory/tabs/tableConfig/Column";
import { TableView } from "@bento-core/paginated-table";
import { themeConfig } from "../studies/tableConfig/Theme";
import trashCan from "../../assets/icons/trash_can.svg";
import { onDeleteAllCohort, onDeleteSingleCohort } from "../../components/CohortSelectorState/store/action";
import { tableConfig } from "../../bento/cohortAnalayzerPageData";
import DownloadSelectedCohort from "./downloadCohort/DownloadSelectedCohorts";
import client from "../../utils/graphqlClient";
import ToolTip from "@bento-core/tool-tip/dist/ToolTip";
import Question_Icon from '../../assets/icons/Question_Icon.svg';
import search_icon from '../../assets/icons/Search_Icon.svg';
import Stats from '../../components/Stats/GlobalStatsController';

export const CohortAnalyzer = () => {
    const classes = useStyle();
    const { state, dispatch } = useContext(CohortStateContext);
    const [selectedCohorts, setSelectedCohorts] = useState([]);
    const [queryVariable, setQueryVariable] = useState({});
    const [rowData, setRowData] = useState([]);
    const [searchValue, setSearchValue] = useState("");

    function generateQueryVariable(cohortNames) {
        let query = {};
        query['participant_pks'] = [];
        query["first"] = 10000;
        cohortNames.forEach((cName) => {
            state[cName].participants.forEach((participant) => {
                query["participant_pks"].push(participant.participant_pk);
            });
        });
        return query;
    }

    useEffect(() => {
        let rowDataFinal = [];
        selectedCohorts.forEach((cohortId) => {
            rowDataFinal = [...rowDataFinal, ...state[cohortId].participants];
        });
        async function getJoinedCohort() {
            let queryVariables = generateQueryVariable(selectedCohorts);
            setQueryVariable(queryVariables)
            const { data } = await client.query({
                query: GET_COHORT_MANIFEST_QUERY,
                variables: queryVariables,
            });
            if (queryVariables.participant_pks.length > 0) {
                if (searchValue !== "") {
                    let filteredRowData = rowData.filter((a, b) => a.participant_id.includes(searchValue))
                    setRowData(filteredRowData);
                } else {
                    
                    setRowData(data['diagnosisOverview']);
                }

            } else {
                setRowData([]);
            }
        }
        getJoinedCohort();
    }, [selectedCohorts, searchValue]);

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

    const deleteCohort = (cohortId) => {
        dispatch(onDeleteSingleCohort(cohortId, () => { }, () => { }));
    }

    const deleteAllCohort = () => {
        dispatch(onDeleteAllCohort(() => { }, () => { }));
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
        SearchBox: SearchBox,
        showSearchBox: true,
        tableMsg: (state && Object.keys(state).length === 0) ? {
            noMatch: 'To proceed, please create your cohort by visiting the Explore Page.'
        } : tableConfig.tableMsg
    });

    const SearchBox = () => {
        return (
            <div className={classes.inputStyleContainer}>
                <input
                    onChange={(e) => {
                        setSearchValue(e.target.value);
                    }}
                    type="text"
                    placeholder={"Search Participant ID"}
                    className={classes.inputStyle}
                />
                <img alt={"Search Icon"} src={search_icon} />
            </div>
        )
    }

    return (
        <>
            <Stats />
            <div className={classes.container}>
                <div className={classes.leftSideAnalyzer}>
                    <div className={classes.sideHeader}>
                        <div className={classes.cohortSelectionChild}>
                            <span> {"COHORTS (" + Object.keys(state).length + ")"} </span>
                            <ToolTip title={"A maximum of 3 cohorts can be selected at this time."} arrow placement="bottom">

                                <img alt={"QuestionMark"} src={Question_Icon} width={"10px"} height={"10px"} />
                            </ToolTip>
                        </div>

                        <img alt={"Trashcan"} onClick={() => deleteAllCohort()} src={trashCan} width={15} height={16} />
                    </div>
                    <div className={classes.leftSideAnalyzerChild}>
                        {state && Object.keys(state).map((cohort) => {
                            return (
                                <div className={classes.CohortChild}>
                                    <div className={classes.cohortChildContent} >
                                        <div>
                                            <Checkbox checked={selectedCohorts.includes(cohort)} onChange={(e) => { handleCheckbox(cohort, e); }} />
                                            <span> {cohort} </span>
                                        </div>
                                        <img alt={"Trashcan"} onClick={() => { deleteCohort(cohort) }} src={trashCan} width={15} height={16} />
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
                    <div className={classes.cohortCountSection}>
                        <div className={classes.cohortSelectionChild}>
                            <span>{"SELECTED COHORTS (" + selectedCohorts.length + "/3)"}</span>
                            <ToolTip title={"A maximum of 3 cohorts can be selected at this time."} arrow placement="bottom">

                                <img alt={"QuestionMark"} src={Question_Icon} width={"10px"} height={"10px"} />
                            </ToolTip>
                        </div>
                        <DownloadSelectedCohort queryVariable={queryVariable} isSelected={selectedCohorts.length > 0} />
                    </div>
                    <div className={classes.rightSideTableContainer}>
                        <TableView
                            initState={initTblState}
                            themeConfig={themeConfig}
                            tblRows={rowData}
                            queryVariables={queryVariable}
                            server={false}
                            totalRowCount={rowData.length}
                            activeTab={"Participant"}
                        />
                    </div>
                </div>
            </div>
        </>
    )
}
const useStyle = makeStyles((theme) => ({
    container: {
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'row'
    },
    inputStyleContainer: {
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        '& img': {
            position: 'relative',
            right: 26,
            width: 12,
            height: 13
        }
    },
    inputStyle: {
        width: '349px',
        height: '29px',
        gap: '0px',
        borderRadius: '8px',
        margin: 'auto',
        marginLeft: '0px',
        paddingLeft: 13,
        border: '1px solid #8B98AF',
        textDecoration: 'none'
    },
    leftSideAnalyzer: {
        width: 268,
        height: 588,
        marginTop: 70,
        overflowY: 'hidden',
        borderRadius: ' 0px 35px 35px 0px',
        border: '1px solid #B0B0B0',

    },
    leftSideAnalyzerChild: {
        height: '90%',
        overflowY: 'scroll',
        '&::-webkit-scrollbar': {
            width: "6px"
        },
        '&::-webkit-scrollbar-thumb': {
            width: "6px",
            backgroundColor: '#003F74'
        },
    },
    cohortSelectionChild: {
        display: 'flex',
        alignItems: 'start'
    },
    CohortChild: {
        background: '#A5C2C8',
        width: '100%',
        height: 28,
        display: 'flex',
        opacity: 0.6,
        marginBottom: 2,
        alignItems: 'center',
        justifyContent: 'space-between',
        '&:nth-child(even)': {
            backgroundColor: '#B5DDE5'
        },
        '& span': {
            color: 'black'
        }
    },
    sideHeader: {
        height: 62,
        fontFamily: 'Poppins',
        fontSize: 18.5,
        fontWeight: 500,
        letterSpacing: '-0.02em',
        textAlign: 'left',
        width: '90%',
        verticalAlign: 'center',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        alignSelf: 'center',
        margin: 'auto'
    },
    cohortCountSection: {
        fontFamily: 'Poppins',
        fontSize: 15,
        fontWeight: 500,
        letterSpacing: -0.02,
        textAlign: 'left',
        minHeight: 58,
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'space-between',
        width: '90%',
        paddingBottom: 10
    },
    rightSideAnalyzer: {
        width: 1081,
        height: 588,
        borderRadius: '35px',
        border: '4px solid #4E8191',
        margin: 100,
        marginLeft: 50,
        marginTop: 70,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        overflowY: 'scroll'
    },
    rightSideAnalyzerHeader: {
        display: 'flex',
        justifyContent: 'space-between',
        position: 'relative',
        width: '90%',
        alignSelf: 'center',
        alignItems: 'center',
        borderBottom: '1px solid gray'
    },
    cohortChildContent: {
        width: '95%',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        opacity: '1 !important',
        color: 'black',
        '& div span': {
            color: 'black',
            opacity: 1
        },
        '& img': {
            opacity: 1
        }
    },
    rightSideTableContainer: {

        width: '90%',
    }
}))


