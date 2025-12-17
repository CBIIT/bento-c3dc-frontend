import React, { memo, useRef, useState } from 'react';
import { withStyles } from '@material-ui/core';
import ToolTip from '@bento-core/tool-tip';
import TrashCanIconWhite from '../../../../../assets/icons/Trash_Can_Icon_White.svg';
import DuplicateIcon from '../../../../../assets/icons/Duplicate.svg';
import { TOOLTIP_MESSAGES } from '../../../../../bento/cohortModalData.js';
import { MiddleEllipsisText } from '../../../../EllipsisText';

/**
 * Individual cohort list item component
 */
const CohortListItem = ({
    classes,
    cohortData,
    isSelected,
    onCohortSelect,
    onCohortDelete,
    onCohortDuplicate,
    cohortLimitReached
}) => {
    const nameRef = useRef(null);
    const [isNameOverflowing, setIsNameOverflowing] = useState(false);

    // Additional safety check in case invalid data gets through
    if (!cohortData || !cohortData.cohortId) {
        return null;
    }

    const cohortName = cohortData.cohortName || 'Unnamed Cohort';

    const nameElement = (
        <span ref={nameRef} className={classes.cohortListItemText}>
            <MiddleEllipsisText
                text={cohortName}
                onTruncate={setIsNameOverflowing}
            />
        </span>
    );

    return (
        <div
            id={`cohort-item-${cohortData.cohortId}`}
            className={`${classes.cohortListItem} ${isSelected ? classes.selectedCohort : ''}`}
            onClick={() => onCohortSelect && onCohortSelect(cohortData.cohortId)}
            role="option"
            aria-selected={isSelected}
            aria-label={`Cohort: ${cohortData.cohortName || 'Unnamed Cohort'}`}
        >
            {isNameOverflowing ? (
                <ToolTip title={cohortData.cohortName || 'Unnamed Cohort'} placement="top" arrow>
                    {nameElement}
                </ToolTip>
            ) : (
                nameElement
            )}
            <span className={classes.actionButtons}>
                <ToolTip title={cohortLimitReached ? TOOLTIP_MESSAGES.cohortLimit : TOOLTIP_MESSAGES.duplicateCohort} placement="top" arrow>
                    <button
                        type="button"
                        className={`${classes.duplicateButton} ${cohortLimitReached ? classes.duplicateButtonDisabled : ''}`}
                        onClick={(e) => !cohortLimitReached && onCohortDuplicate && onCohortDuplicate(e, cohortData.cohortId)}
                        aria-label={cohortLimitReached ? TOOLTIP_MESSAGES.cohortLimit : `Duplicate cohort ${cohortData.cohortName || 'Unnamed Cohort'}`}
                        title={cohortLimitReached ? TOOLTIP_MESSAGES.cohortLimit : TOOLTIP_MESSAGES.duplicateCohort}
                        disabled={cohortLimitReached}
                    >
                        <img
                            src={DuplicateIcon}
                            alt=""
                            className={classes.duplicateIcon}
                            aria-hidden="true"
                        />
                    </button>
                </ToolTip>
                <ToolTip title={TOOLTIP_MESSAGES.removeCohort} placement="top-end" arrow>
                    <button
                        type="button"
                        className={classes.deleteButton}
                        onClick={(e) => onCohortDelete && onCohortDelete(e, cohortData.cohortId)}
                        aria-label={`Delete cohort ${cohortData.cohortName || 'Unnamed Cohort'}`}
                        title={TOOLTIP_MESSAGES.removeCohort}
                    >
                        <img
                            src={TrashCanIconWhite}
                            alt=""
                            className={classes.whiteTrashCan}
                            aria-hidden="true"
                        />
                    </button>
                </ToolTip>
            </span>
        </div>
    );
};

const styles = () => ({
    cohortListItem: {
        width: '100%',
        height: '55px',
        display: 'flex',
        padding: '19px 22px 21px 26px',
        justifyContent: 'space-between',
        alignItems: 'center',
        color: '#FFFFFF',
        fontFamily: 'Poppins',
        fontSize: 14,
        fontWeight: '300',
        lineHeight: '15px',
        backgroundColor: '#4B7B8B',
        borderBottom: '1px solid #FFF',
        '&:last-child': {
            borderBottom: 'none',
        },
        cursor: 'pointer',
    },
    cohortListItemText: {
        color: 'white',
        width: '85%',
        paddingRight: '10px',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
    },
    selectedCohort: {
        backgroundColor: '#3A555E',
    },
    actionButtons: {
        display: 'flex',
        alignItems: 'center',
        gap: '16px',
    },
    duplicateButton: {
        background: 'transparent',
        border: 'none',
        padding: 0,
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        '&:focus': {
            outline: '2px solid #598AC5',
            outlineOffset: '2px',
        },
    },
    duplicateButtonDisabled: {
        opacity: 0.3,
        cursor: 'not-allowed',
        '&:focus': {
            outline: 'none',
        },
    },
    duplicateIcon: {
        width: 14,
        height: 14,
        pointerEvents: 'none', // Prevent img from intercepting clicks
        filter: 'brightness(0) invert(1)', // Makes the icon white
    },
    deleteButton: {
        background: 'transparent',
        border: 'none',
        padding: 0,
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        '&:focus': {
            outline: '2px solid #598AC5',
            outlineOffset: '2px',
        },
    },
    whiteTrashCan: {
        width: 14,
        pointerEvents: 'none', // Prevent img from intercepting clicks
    },
});

export default memo(withStyles(styles, { withTheme: true })(CohortListItem));