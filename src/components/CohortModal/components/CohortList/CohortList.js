import React, { useEffect, useRef, useState, useContext, useCallback, useMemo, memo } from 'react';
import { withStyles } from '@material-ui/core';
import ToolTip from '@bento-core/tool-tip';
import { CohortStateContext } from '../../../../components/CohortSelectorState/CohortStateContext';
import {
    onDeleteSingleCohort,
    onDeleteAllCohort,
    onCreateNewCohort,
} from '../../../../components/CohortSelectorState/store/action';
import { CohortModalContext } from '../../CohortModalContext';
import TrashCanIconGray from '../../../../assets/icons/Trash_Can_Icon_Gray.svg';
import DEFAULT_CONFIG from '../../config';
import { deletionTypes } from '../shared/DeleteConfirmationModal';
import CohortListItem from './components/CohortListItem';
import { TOOLTIP_MESSAGES } from '../../../../bento/cohortModalData';

/**
 * Helper function to escape special regex characters in a string
 */
const escapeRegExp = (string) => {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
};

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
        clearAlert,
        showAlert
    } = useContext(CohortModalContext);

    const handleDeleteCohort = useCallback((cohortId) => {
        dispatch(onDeleteSingleCohort(cohortId));
        // Only clear unsaved changes if we're deleting the currently selected cohort
        if (cohortId === selectedCohort) {
            clearCurrentCohortChanges();
        }
    }, [dispatch, selectedCohort, clearCurrentCohortChanges]);

    const handleDeleteAllCohorts = useCallback(() => {
        dispatch(onDeleteAllCohort());
        clearCurrentCohortChanges();
    }, [dispatch, clearCurrentCohortChanges]);

    const handleDuplicateCohort = useCallback((cohortId) => {
        const cohortToDuplicate = state[cohortId];
        if (!cohortToDuplicate) return;

        // Extract the base name by removing existing copy suffixes
        let baseName = cohortToDuplicate.cohortName;

        // Remove existing " (Copy)" or " (Copy N)" patterns
        baseName = baseName.replace(/\s*\(Copy(?:\s+\d+)?\)$/, '');

        // Find the highest copy number for this base name
        let highestCopyNumber = 0;
        const existingCohortNames = Object.values(state).map(cohort => cohort.cohortName);

        existingCohortNames.forEach(name => {
            if (name === baseName) {
                // Original exists, so we need at least Copy
                highestCopyNumber = Math.max(highestCopyNumber, 0);
            } else if (name === `${baseName} (Copy)`) {
                // First copy exists
                highestCopyNumber = Math.max(highestCopyNumber, 1);
            } else {
                // Check for numbered copies
                const match = name.match(new RegExp(`^${escapeRegExp(baseName)}\\s*\\(Copy\\s+(\\d+)\\)$`));
                if (match) {
                    const copyNumber = parseInt(match[1], 10);
                    highestCopyNumber = Math.max(highestCopyNumber, copyNumber);
                }
            }
        });

        // Generate the new name
        let newCohortName;
        if (highestCopyNumber === 0) {
            newCohortName = `${baseName} (Copy)`;
        } else {
            newCohortName = `${baseName} (Copy ${highestCopyNumber + 1})`;
        }

        dispatch(onCreateNewCohort(
            newCohortName, // Use the new cohort name as the ID (createNewCohort will normalize it)
            cohortToDuplicate.cohortDescription,
            cohortToDuplicate.participants,
            () => {
                showAlert('success', 'Cohort duplicated successfully!');
                // The new cohort ID will be the normalized version of newCohortName
                const normalizedCohortId = newCohortName.trim().toLowerCase();
                setSelectedCohort(normalizedCohortId);
            },
            (error) => {
                showAlert('error', `Failed to duplicate cohort: ${error.message}`);
            }
        ));
    }, [state, dispatch, showAlert, setSelectedCohort]);

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

    const handleSingleCohortDuplicate = useCallback((e, cohortId) => {
        e.stopPropagation();
        if (unSavedChanges) {
            setDeleteModalProps({
                handleDelete: () => handleDuplicateCohort(cohortId),
                deletionType: deletionTypes.CLEAR_UNSAVED_CHANGES,
            });
            setShowDeleteConfirmation(true);
        } else {
            handleDuplicateCohort(cohortId);
        }
    }, [handleDuplicateCohort, unSavedChanges, setDeleteModalProps, setShowDeleteConfirmation]);

    const listHeading = (config && config.listHeading) || DEFAULT_CONFIG.config.cohortList.listHeading;

    const scrollContainerRef = useRef(null);

    const cohortOrderedList = useMemo(() => {
        return Object.keys(state).sort((a, b) => {
            return new Date(state[b].lastUpdated) - new Date(state[a].lastUpdated);
        });
    }, [state]);

    const isAtCohortLimit = useMemo(() => {
        return Object.keys(state).length >= 20;
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
                        {listHeading} ({cohortOrderedList.length}/20)
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
                                onCohortDuplicate={handleSingleCohortDuplicate}
                                cohortLimitReached={isAtCohortLimit}
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
        overflow: 'hidden auto',
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