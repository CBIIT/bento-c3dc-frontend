import React, { useEffect, useRef, useState, useContext, useCallback, useMemo, memo } from 'react';
import { withStyles } from '@material-ui/core';
import ToolTip from '@bento-core/tool-tip';
import { CohortStateContext } from '../../../../components/CohortSelectorState/CohortStateContext';
import {
    onDeleteSingleCohort,
    onDeleteAllCohort,
} from '../../../../components/CohortSelectorState/store/action';
import { CohortModalContext } from '../../CohortModalContext';
import TrashCanIconGray from '../../../../assets/icons/Trash_Can_Icon_Gray.svg';
import DEFAULT_CONFIG from '../../config';
import { deletionTypes } from '../shared/DeleteConfirmationModal';
import CohortListItem from './components/CohortListItem';
import { TOOLTIP_MESSAGES } from '../../../../bento/cohortModalData';

/**
 * A list of cohorts to select from and manage.
 */

const CohortList = (props) => {
    const {
        classes,
        config,
        unSavedChanges,
        closeModal,
    } = props;

    const { state, dispatch } = useContext(CohortStateContext);
    const { 
        selectedCohort, 
        setSelectedCohort, 
        clearCurrentCohortChanges,
        setShowDeleteConfirmation,
        setDeleteModalProps,
        clearAlert
    } = useContext(CohortModalContext);

    const handleDeleteCohort = useCallback((cohortId) => {
        dispatch(onDeleteSingleCohort(cohortId));
    }, [dispatch]);

    const handleDeleteAllCohorts = useCallback(() => {
        dispatch(onDeleteAllCohort());
    }, [dispatch]);

    const handleDeleteAllClick = useCallback(() => {
        setDeleteModalProps({
            handleDelete: () => handleDeleteAllCohorts(),
            deletionType: deletionTypes.DELETE_ALL_COHORTS,
        });
        setShowDeleteConfirmation(true);
    }, [setDeleteModalProps, setShowDeleteConfirmation, handleDeleteAllCohorts]);

    const handleCohortSelection = useCallback((cohortId) => {
        if (cohortId === selectedCohort) {
            return;
        }
        
        // Clear any existing alert when switching cohorts
        clearAlert();
        
        if (unSavedChanges) {
            setDeleteModalProps({
                handleDelete: () => {
                    setSelectedCohort(cohortId);
                    clearCurrentCohortChanges();
                },
                deletionType: deletionTypes.CLEAR_UNSAVED_CHANGES,
            });
            setShowDeleteConfirmation(true);
        } else {
            setSelectedCohort(cohortId);
            clearCurrentCohortChanges();
        }
    }, [selectedCohort, unSavedChanges, setDeleteModalProps, setShowDeleteConfirmation, setSelectedCohort, clearCurrentCohortChanges, clearAlert]);

    const handleSingleCohortDelete = useCallback((e, cohortId) => {
        e.stopPropagation();
        setDeleteModalProps({
            handleDelete: () => handleDeleteCohort(cohortId),
            deletionType: deletionTypes.DELETE_SINGLE_COHORT,
        });
        setShowDeleteConfirmation(true);
    }, [setDeleteModalProps, setShowDeleteConfirmation, handleDeleteCohort]);

    const listHeading = (config && config.listHeading) || DEFAULT_CONFIG.config.cohortList.listHeading;

    const scrollContainerRef = useRef(null);

    const cohortOrderedList = useMemo(() => {
        return Object.keys(state).sort((a, b) => {
            return new Date(state[b].lastUpdated) - new Date(state[a].lastUpdated);
        });
    }, [state]);

    // Handle empty state - close modal when no cohorts exist
    useEffect(() => {
        if (Object.keys(state).length === 0) {
            closeModal();
        }
    }, [state, closeModal]);

    // Handle invalid selectedCohort - select first cohort if current selection is invalid
    useEffect(() => {
        if (!state[selectedCohort] && cohortOrderedList.length > 0) {
            setSelectedCohort(cohortOrderedList[0]);
        }
    }, [selectedCohort, state, cohortOrderedList, setSelectedCohort]);


    useEffect(() => {
        if (scrollContainerRef.current) {
            const selectedItem = scrollContainerRef.current.children[cohortOrderedList.indexOf(selectedCohort)];
            if (selectedItem) {
                selectedItem.scrollIntoView({
                    behavior: 'instant',
                    block: 'center',
                });
            }
        }
    }, []);

    const [isScrollbarActive, setIsScrollbarActive] = useState(false); // State to check if scrollbar is active

    useEffect(() => {
        if (scrollContainerRef.current) {
            const { scrollHeight, clientHeight } = scrollContainerRef.current;
            setIsScrollbarActive(scrollHeight > clientHeight); // Check if scrollbar is active
        }
    }, [cohortOrderedList]);

    return (
        <div className={classes.cohortListSection}>
                <div className={classes.cohortListHeading}>
                    <span>
                        {listHeading} ({cohortOrderedList.length})
                    </span>
                    <span>
                        <ToolTip title={TOOLTIP_MESSAGES.removeAllCohorts} placement="top-end" arrow>
                            <button
                                type="button"
                                className={`${classes.deleteAllButton} ${isScrollbarActive ? classes.grayTrashCanScrollPadding : ''}`}
                                onClick={handleDeleteAllClick}
                                aria-label="Delete all cohorts"
                                title={TOOLTIP_MESSAGES.removeAllCohorts}
                            >
                                <img
                                    src={TrashCanIconGray}
                                    alt=""
                                    className={classes.grayTrashCan}
                                    aria-hidden="true"
                                />
                            </button>
                        </ToolTip>
                    </span>

                </div>
                <div
                    className={classes.cohortListing}
                    ref={scrollContainerRef}
                    role="listbox"
                    aria-label="Cohort selection list"
                >
                    {cohortOrderedList.map((cohort) => {
                        const cohortData = state[cohort];
                        
                        // Safety check - skip rendering if cohort data is invalid
                        if (!cohortData || !cohortData.cohortId || !cohortData.cohortName) {
                            console.warn(`Invalid cohort data for cohort key: ${cohort}`, cohortData);
                            return null;
                        }
                        
                        const isSelected = selectedCohort === cohortData.cohortId;
                        
                        return (
                            <CohortListItem
                                key={cohortData.cohortId}
                                classes={classes}
                                cohort={cohort}
                                cohortData={cohortData}
                                isSelected={isSelected}
                                onCohortSelect={handleCohortSelection}
                                onCohortDelete={handleSingleCohortDelete}
                            />
                        );
                    })}
                </div>
            </div>
    );
};

/**
 * Default styles for the component.
 */

const styles = () => ({
    cohortListSection: {
        //width: '303px',
        maxHeight: '466px',
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
        padding: '13px 20px 8px 26px',
        borderBottom: '1px solid #5C5C5C',

    },
    deleteAllButton: {
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
    grayTrashCan: {
        height: 20,
        paddingTop: 2,
        pointerEvents: 'none', // Prevent img from intercepting clicks
    },
    grayTrashCanScrollPadding: {
        marginRight: '6px;', //matches scrollbar width
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
});

export default memo(withStyles(styles, { withTheme: true })(CohortList));