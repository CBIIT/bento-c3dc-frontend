import React, {useState, useContext, useRef} from "react";
import { useStyle, Wrapper, CohortSelectionChild, TrashCanIcon, InstructionsWrapper, Instructions } from "./cohortSelectorStyling";
import { useStyle as useMainStyle } from "../cohortAnalyzerStyling";
import trashCan from "../../../assets/icons/trash_can.svg";
import trashCanBlack from "../../../assets/icons/trash_can_black.svg";
import sortIcon from "../../../assets/icons/sort_icon.svg";
import CheckBoxCustom from "../customCheckbox/CustomCheckbox";
import {
    handlePopup,
    resetSelection,
    sortBy,
    sortByReturn,
} from "../CohortAnalyzerUtil/CohortAnalyzerUtil";
import { useCohortAnalyzer } from "../CohortAnalyzerContext";
import { CohortStateContext } from "../../../components/CohortSelectorState/CohortStateContext";
import ToolTip from "@bento-core/tool-tip/dist/ToolTip";
import { exampleButtonConfig, getExampleCohortKeys } from "../../../bento/exampleCohortData";
import { MiddleEllipsisText } from "../../../components/EllipsisText";

// Component to handle individual cohort item with overflow detection
const CohortItem = ({ cohort, cohortData, selectedCohorts, handleCheckbox, setDeleteInfo, deleteInfo, state, classes }) => {
    const nameRef = useRef(null);
    const [isNameOverflowing, setIsNameOverflowing] = useState(false);

    const cohortName = cohortData.cohortName + " (" + cohortData.participants.length + ")";

    const nameElement = (
        <span
            ref={nameRef}
            className={classes.cardContent}
            style={{ color: '#000' }}
        >
            <MiddleEllipsisText
                text={cohortName}
                onTruncate={setIsNameOverflowing}
            />
        </span>
    );

    return (
        <div
            style={{
                cursor: 'pointer',
                background: selectedCohorts.includes(cohort)
                    ? ['#FAE69C', '#A4E9CB', '#A3CCE8'][selectedCohorts.indexOf(cohort) % 3] : 'transparent'
            }}
        >
            <div
                className={
                    selectedCohorts.includes(cohort)
                        ? classes.cohortChildSelected
                        : selectedCohorts.length === 3 && !selectedCohorts.includes(cohort)
                            ? classes.CohortChildOpacity
                            : classes.CohortChild
                }
            >
                <div className={classes.cohortChildContent}>
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', marginLeft: 20 }}>
                        <CheckBoxCustom
                            selectedCohorts={selectedCohorts}
                            cohort={cohort}
                            handleCheckbox={handleCheckbox}
                        />
                        {isNameOverflowing ? (
                            <ToolTip title={cohortName} placement="top" arrow>
                                {nameElement}
                            </ToolTip>
                        ) : (
                            nameElement
                        )}
                    </div>
                    <img
                        alt={"Trashcan"}
                        role="button"
                        style={{ cursor: 'pointer', zIndex: 3 }}
                        onClick={() => { handlePopup(cohort, state, setDeleteInfo, deleteInfo) }}
                        src={trashCan}
                        width={11}
                        height={12}
                    />
                </div>
            </div>
        </div>
    );
};

export const CohortSelector = ({ handleDemoClick }) => {
    //context
    const { state } = useContext(CohortStateContext);
    const {
      selectedCohorts,
      setSelectedCohorts,
      setDeleteInfo,
      deleteInfo,
      setNodeIndex,
      setRowData,
      cohortList,
      setCohortList,
      handleCheckbox,
    } = useCohortAnalyzer();
    
    //state
    const [sortType, setSortType] = useState("alphabet");

    const classes = useStyle();
    const mainClasses = useMainStyle();
     
    return (
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

                    {handleDemoClick && (() => {
                        const exampleCohortKeys = getExampleCohortKeys();
                        const nonExampleCohorts = Object.keys(state).filter(key => !exampleCohortKeys.includes(key));
                        const isDisabled = nonExampleCohorts.length > 17;
                        const hasExistingExampleCohorts = exampleCohortKeys.some(key => state[key]);

                        const tooltipText = isDisabled
                            ? exampleButtonConfig.tooltip.disabled
                            : hasExistingExampleCohorts
                                ? exampleButtonConfig.tooltip.replacement
                                : exampleButtonConfig.tooltip.enabled;

                        return (
                            <div style={{ marginTop: '16px', display: 'flex', justifyContent: 'flex-start', paddingLeft: '0px' }}>
                                <ToolTip
                                    maxWidth="335px"
                                    border={'1px solid #598ac5'}
                                    arrowBorder={'1px solid #598AC5'}
                                    title={
                                        <div className={mainClasses.demoTooltipContent}>
                                            <p>{tooltipText}</p>
                                        </div>
                                    }
                                    placement="top"
                                    arrow
                                    interactive
                                    arrowSize="30px"
                                >
                                    <button
                                        onClick={handleDemoClick}
                                        disabled={isDisabled}
                                        className={isDisabled ? mainClasses.demoButtonFaded : mainClasses.demoButton}
                                    >
                                        {exampleButtonConfig.buttonText}
                                    </button>
                                </ToolTip>
                            </div>
                        );
                    })()}
                </>
            </div>
            <div className={classes.sortSection}>
                <div style={{ display: 'flex', margin: 0, alignItems: 'center', cursor: 'pointer' }}>
                    <img onClick={() => {
                        resetSelection(setSelectedCohorts, setNodeIndex, setRowData);
                    }} alt={"sortIcon"} src={sortIcon} width={14} height={14} style={{ margin: 5 }} role="button" />
                    <p 
                        style={{ fontFamily: 'Nunito', fontSize: '11px', color: sortType === 'alphabet' ? '#646464' : '#646464' }} 
                        onClick={() => {
                            sortBy("alphabet", cohortList, setCohortList, state);
                            setSortType("alphabet");
                        }}> Sort Alphabetically 
                    </p>
                </div>
                <div onClick={() => {
                    sortBy("count", cohortList, setCohortList, state);
                    setSortType("count");
                }} className={classes.sortCount} style={{ fontFamily: 'Nunito', color: sortType === 'count' ? 'lightgray' : '#646464' }}>
                    <p style={{ fontSize: 11 }}>Sort by Count</p>
                </div>
            </div>
            <div className={classes.leftSideAnalyzerChild}>
                {state && (sortType !== "" ? sortByReturn(sortType, Object.keys(state), state, selectedCohorts) : Object.keys(state)).map((cohort) => (
                    <CohortItem
                        key={state[cohort].cohortName}
                        cohort={cohort}
                        cohortData={state[cohort]}
                        selectedCohorts={selectedCohorts}
                        handleCheckbox={handleCheckbox}
                        setDeleteInfo={setDeleteInfo}
                        deleteInfo={deleteInfo}
                        state={state}
                        classes={classes}
                    />
                ))}
            </div>
        </div>)
}