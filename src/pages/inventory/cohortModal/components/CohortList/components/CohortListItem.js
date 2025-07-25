import React, { memo } from 'react';
import { withStyles } from '@material-ui/core';
import TrashCanIconWhite from '../../../../../../assets/icons/Trash_Can_Icon_White.svg';

/**
 * Individual cohort list item component
 */
const CohortListItem = ({
    classes,
    cohort,
    cohortData,
    isSelected,
    onCohortSelect,
    onCohortDelete
}) => {
    // Additional safety check in case invalid data gets through
    if (!cohortData || !cohortData.cohortId) {
        return null;
    }

    return (
        <div
            id={`cohort-item-${cohortData.cohortId}`}
            className={`${classes.cohortListItem} ${isSelected ? classes.selectedCohort : ''}`}
            onClick={() => onCohortSelect && onCohortSelect(cohortData.cohortId)}
            role="option"
            aria-selected={isSelected}
            aria-label={`Cohort: ${cohortData.cohortName || 'Unnamed Cohort'}`}
        >
            <span className={classes.cohortListItemText}>
                {cohortData.cohortName || 'Unnamed Cohort'}
            </span>
            <span>
                <button
                    type="button"
                    className={classes.deleteButton}
                    onClick={(e) => onCohortDelete && onCohortDelete(e, cohortData.cohortId)}
                    aria-label={`Delete cohort ${cohortData.cohortName || 'Unnamed Cohort'}`}
                    title={`Delete cohort ${cohortData.cohortName || 'Unnamed Cohort'}`}
                >
                    <img
                        src={TrashCanIconWhite}
                        alt=""
                        className={classes.whiteTrashCan}
                        aria-hidden="true"
                    />
                </button>
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
        '&:first-child': {
            borderTop: '1px solid #FFF',
        },
        cursor: 'pointer',
    },
    cohortListItemText: {
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        color: 'white',
        width: '85%',
    },
    selectedCohort: {
        backgroundColor: '#3A555E',
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