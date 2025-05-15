import React from "react";
import { configColumn } from "../inventory/tabs/tableConfig/Column";
import { TableView } from "@bento-core/paginated-table";
import { themeConfig } from "../studies/tableConfig/Theme";
import trashCan from "../../assets/icons/trash_can.svg";
import trashCanBlack from "../../assets/icons/trash_can_black.svg";
import { onDeleteAllCohort, onDeleteSingleCohort } from "../../components/CohortSelectorState/store/action";
import { tableConfig, analyzer_tables, } from "../../bento/cohortAnalayzerPageData";
import DownloadSelectedCohort from "./downloadCohort/DownloadSelectedCohorts";
import ToolTip from "@bento-core/tool-tip/dist/ToolTip";
import Stats from '../../components/Stats/GlobalStatsController';
import DeleteConfirmationModal from "../inventory/cohortModal/components/deleteConfirmationModal";
import NavigateAwayModal from './navigateAwayModal';
import sortIcon from "../../assets/icons/sort_icon.svg";
import placeHolder from "../../assets/vennDigram/placeHolder.png";
import ChartVenn from "./vennDiagram/ChartVenn";
import CheckBoxCustom from "./customCheckbox/CustomCheckbox";
import questionIcon from "../../assets/icons/Question_icon_2.svg";
import linkoutIcon from "../../assets/about/Export_Icon_White.svg";
import LinkoutBlue from "../../assets/about/Export_Icon.svg";
import { useStyle } from "./cohortAnalyzerStyling";
import {
    handlePopup,
    handleDelete,
    resetSelection,
    SearchBox,
    sortBy,
    sortByReturn,
} from "./CohortAnalyzerUtil";
import styled from "styled-components";
import { CreateNewCOhortButton } from "./CreateNewCohortButton/CreateNewCohortButton";
import { useCohortAnalyzer } from "./useCohortAnalyzer";

export const CohortAnalyzer = () => {
    const classes = useStyle();
    const { nodeIndex, setNodeIndex, handleSearchValue,
        searchValue, searchRef, getTableMessage, cohortList,
        selectedCohortSection, showNavigateAwayModal, setShowNavigateAwayModal, handleUserRedirect, state,
        selectedCohorts, deleteInfo, setDeleteInfo, setCohortList, setSelectedCohorts, dispatch,
        setGeneralInfo, setRowData, rowData, warningMessage, setWarningMessage, CohortModal,
        showCohortModal, setShowCohortModal, sortType, setSortType, handleMouseMove, handleCheckbox, handleMouseLeave,
        refershTableContent, cohortData, setSelectedChart, setRefershSelectedChart, refershSelectedChart,
        setSelectedCohortSections, handleClick, queryVariable, handleBuildInExplore, tooltipOpen, movedToToolTipText,
        setTooltipOpen, handleHideTooltip, handleExportToCCDIHub, tooltipOpenExplore, movedToToolTipTextExplore,
        setTooltipOpenExplore, handleHideTooltipExplore, refershInit
    } = useCohortAnalyzer();


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
        Download the manifest and upload it manually to the <a style={{ zIndex: 10000, color: "#598AC5", fontWeight: "bolder" }} target='_blank' href="https://ccdi.cancer.gov/explore"> CCDI Hub
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
                            <div style={{ display: 'flex', alignItems: 'center', marginRight: '-10px' }}>
                                <button
                                    onClick={() => selectedCohorts.length > 0 && handleBuildInExplore()}
                                    className={selectedCohorts.length > 0 ? classes.exploreButton : classes.exploreButtonFaded}
                                >
                                    BUILD IN EXPLORE DASHBOARD
                                </button>
                                <ToolTip
                                    open={tooltipOpen}
                                    disableHoverListener
                                    maxWidth="335px"
                                    border={'1px solid #598ac5'}
                                    arrowBorder={'1px solid #598AC5'}
                                    title={<div onMouseEnter={() => { movedToToolTipText.current = true; setTooltipOpen(true); }} onMouseLeave={() => handleHideTooltip("tooltipText")}>
                                        {exploreDashboardTooltip}
                                    </div>}
                                    placement="top-end"
                                    arrow
                                    interactive
                                    arrowSize="30px"
                                >
                                    <div style={{ marginLeft: 5 }}>
                                        <img alt="Question Icon" src={questionIcon} width={10} style={{ position: 'relative', top: -14, left: -2 }} onMouseEnter={() => { movedToToolTipText.current = false; setTooltipOpen(true); }} onMouseLeave={() => handleHideTooltip("questionIcon")} />
                                    </div>
                                </ToolTip>
                            </div>

                            {/* EXPLORE IN CCDI HUB */}
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <button
                                    onClick={() => (selectedCohorts.length > 0 && rowData.length < 600) ? handleExportToCCDIHub() : {}}
                                    className={(selectedCohorts.length > 0 && rowData.length < 600) ? classes.exploreButton : classes.exploreButtonFaded}
                                >
                                    EXPLORE IN CCDI HUB
                                    <img alt="link out icon" src={linkoutIcon} height={13} width={13} />
                                </button>
                                <ToolTip
                                    open={tooltipOpenExplore}
                                    disableHoverListener
                                    maxWidth="335px"
                                    border={'1px solid #598ac5'}
                                    arrowBorder={'1px solid #598AC5'}
                                    title={<div onMouseEnter={() => { movedToToolTipTextExplore.current = true; setTooltipOpenExplore(true); }} onMouseLeave={() => handleHideTooltipExplore("tooltipText")}>
                                        {exploreCCDIHubTooltip}
                                    </div>}
                                    placement="top-end"
                                    arrow
                                    interactive
                                    arrowSize="30px"
                                >
                                    <div style={{ marginLeft: 5 }}>
                                        <img alt="Question Icon" src={questionIcon} width={10} style={{ position: 'relative', top: -14, left: -2 }} onMouseEnter={() => { movedToToolTipTextExplore.current = false; setTooltipOpenExplore(true); }} onMouseLeave={() => handleHideTooltipExplore("questionIcon")} />
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

