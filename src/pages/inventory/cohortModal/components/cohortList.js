import React, { useEffect, useRef, useState } from 'react';
import { withStyles } from '@material-ui/core';
import TrashCanIconGray from '../../../../assets/icons/Trash_Can_Icon_Gray.svg';
import TrashCanIconWhite from '../../../../assets/icons/Trash_Can_Icon_White.svg';
import DEFAULT_CONFIG from '../config';
import DeleteConfirmationModal from './deleteConfirmationModal';

/**
 * A list of cohorts to select from and manage.
 */

const CohortList = (props) => {
    const {
        classes,
        config,
        selectedIndex,
        setSelectedIndex,
    } = props;

    const listHeading = config && config.listHeading && typeof config.listHeading === 'string'
        ? config.listHeading
        : DEFAULT_CONFIG.config.cohortList.listHeading;

    const listItemPrefix = config && config.listItemPrefix && typeof config.listItemPrefix === 'string'
        ? config.listItemPrefix
        : DEFAULT_CONFIG.config.cohortList.listItemPrefix;

    const scrollContainerRef = useRef(null);

    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

    const {
        DeleteConfirmation: deleteConfirmationClasses
    } = classes;

    let tempList = [
        {
            cohortId: 1,
        },
        {
            cohortId: 2,
        },
        {
            cohortId: 321231231231,
        },
        {
            cohortId: 4,
        },
        {
            cohortId: 5,
        },
        {
            cohortId: 321231231231,
        },
        {
            cohortId: 4,
        },
        {
            cohortId: 5,
        },
        {
            cohortId: 321231231231,
        },
        {
            cohortId: 4,
        },
        {
            cohortId: 5,
        },
    ];

    useEffect(() => {
        if (scrollContainerRef.current) {
            const selectedItem = scrollContainerRef.current.children[selectedIndex];
            if (selectedItem) {
                selectedItem.scrollIntoView({
                    behavior: 'instant',
                    block: 'center',
                });
            }
        }
    }, [selectedIndex]);

    return (
        <>
            <DeleteConfirmationModal
                classes={deleteConfirmationClasses}
                open={showDeleteConfirmation}
                setOpen={setShowDeleteConfirmation}
                handleDelete={() => console.log('Delete cohort')}
            />
            <div className={classes.cohortListSection}>
                <div className={classes.cohortListHeading}>
                    <span>
                        {listHeading} ({tempList.length})
                    </span>
                    <span>
                        <img
                            src={TrashCanIconGray}
                            alt="delete all cohorts icon"
                            className={classes.grayTrashCan}
                            onClick={() => setShowDeleteConfirmation(true)}
                        />
                    </span>

                </div>
                <div
                    className={classes.cohortListing}
                    ref={scrollContainerRef}
                >
                    {tempList.map((cohort, index) => {
                        const isSelected = selectedIndex === index;
                        return (
                            <div
                                key={cohort.cohortId}
                                className={`${classes.cohortListItem} ${isSelected ? classes.selectedCohort : ''}`}
                                onClick={() => setSelectedIndex(index)}
                            >
                                <span>
                                    {listItemPrefix} {cohort.cohortId}
                                </span>
                                <span>
                                    <img
                                        src={TrashCanIconWhite}
                                        alt="delete cohort icon"
                                        className={classes.whiteTrashCan}
                                    />
                                </span>
                            </div>
                        );
                    })}

                </div>
            </div>
        </>
    );
};

/**
 * Default styles for the component.
 */

const styles = () => ({
    cohortListSection: {
        //width: '303px',
        maxHeight: '456px',
        //width: '35%',
        //height: '55.272%',
        minWidth: '200px',
        minHeight: '228px',
        flexGrow: 33,
        flexBasis: '0%',
        alignItems: 'normal',
        border: '2px solid #4D7874',
        borderRadius: '10px',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
    },
    cohortListHeading: {
        fontSize: 15,
        fontWeight: '600',
        fontFamily: 'Poppins',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        color: '#000000',
        lineHeight: '26px',
        padding: '13px 20px 8px 12px',
        borderBottom: '1px solid #5C5C5C',

    },
    grayTrashCan: {
        height: 20,
        paddingTop: 2,
        '&:hover': {
            cursor: 'pointer',
        },
    },
    cohortListing: {
        height: '100%',
        overflowY: 'auto',
        backgroundColor: '#CAD1D3',
        // Custom scrollbar styles
        '&::-webkit-scrollbar': {
            width: '6px', // Width of the scrollbar
        },
        '&::-webkit-scrollbar-track': {
            background: '#CECECE', // Track color
        },
        '&::-webkit-scrollbar-thumb': {
            backgroundColor: '#8B98AF', // Thumb color
        },
        /*
        '&::-webkit-scrollbar-thumb:hover': {
            backgroundColor: '', // Thumb color on hover
        },*/
    },
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
        backgroundColor: '#4E8191',
        borderBottom: '1px solid #73C7BE',
        '&:first-child': {
            borderTop: '1px solid #73C7BE',
        },
    },
    selectedCohort: {
        backgroundColor: '#3A555E',
    },
    whiteTrashCan: {
        width: 14,
        '&:hover': {
            cursor: 'pointer',
        },
    },
});

export default withStyles(styles, { withTheme: true })(CohortList);