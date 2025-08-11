import React from 'react';

import DownloadSelectedCohort from "../downloadCohort/DownloadSelectedCohorts";

import { exploreCCDIHubTooltip, exploreDashboardTooltip } from "../CohortAnalyzerConfig";

import linkoutIcon from "../../../assets/about/Export_Icon_White.svg";

import { CreateNewCOhortButton } from "../CreateNewCohortButton/CreateNewCohortButton";

const CohortAnalyzerTableSection = ({ classes, selectedCohortSection, questionIcon, handleClick, ToolTip }) => {

    return (
        <div className={classes.tableSectionOuterContainer}>
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

                            {refreshTableContent &&

                                <TableView
                                    initState={refreshInit ? initTblState : initTblState}
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
    )
}

export { CohortAnalyzerTableSection };