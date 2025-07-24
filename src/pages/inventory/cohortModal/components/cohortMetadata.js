import React, { useState, useEffect, useRef, useCallback, useMemo, useContext, memo } from 'react';
import DEFAULT_CONFIG from '../config';
import { CohortModalContext } from '../CohortModalContext';
import { CohortStateContext } from '../../../../components/CohortSelectorState/CohortStateContext';

const CohortMetadata = (props) => {
    const { classes, config } = props;

    // Get data from context instead of props
    const { selectedCohort, currentCohortChanges, setCurrentCohortChanges } = useContext(CohortModalContext) || {};
    const { state } = useContext(CohortStateContext) || {};
    const activeCohort = state && state[selectedCohort];

    // Early return if required data is not available
    if (!activeCohort) {
        return null;
    }

    // Get current cohort data (either from changes or original)
    const currentCohort = useMemo(() => {
        return currentCohortChanges && currentCohortChanges.cohortId === activeCohort.cohortId 
            ? currentCohortChanges 
            : activeCohort;
    }, [currentCohortChanges, activeCohort]);

    const [isEditingName, setIsEditingName] = useState(false);
    const [isEditingDescription, setIsEditingDescription] = useState(false);
    const descriptionRef = useRef(null);

    // Memoize configuration values
    const cohortCountsLabel = useMemo(() => {
        return (config && config.cohortCountsLabel) || DEFAULT_CONFIG.config.cohortDetails.cohortCountsLabel;
    }, [config]);

    const datePrefix = useMemo(() => {
        return (config && config.datePrefix) || DEFAULT_CONFIG.config.cohortDetails.datePrefix;
    }, [config]);

    useEffect(() => {
        if (isEditingDescription && descriptionRef.current) {
            const textarea = descriptionRef.current;
            descriptionRef.current.focus();
            textarea.selectionStart = textarea.selectionEnd = textarea.value.length;
        }
    }, [isEditingDescription]);

    // Memoized handlers to prevent unnecessary re-renders
    const handleEditName = useCallback(() => {
        setIsEditingName(true);
    }, []);

    const handleEditDescription = useCallback(() => {
        setIsEditingDescription(true);
    }, []);

    const handleFinishEditingName = useCallback(() => {
        setIsEditingName(false);
    }, []);

    const handleFinishEditingDescription = useCallback(() => {
        setIsEditingDescription(false);
    }, []);

    // Update context directly on every keystroke
    const handleTextChange = useCallback((e) => {
        const { name, value } = e.target;
        if (!currentCohort.cohortId) return;
        
        setCurrentCohortChanges({
            cohortId: currentCohort.cohortId,
            cohortName: currentCohort.cohortName,
            cohortDescription: currentCohort.cohortDescription,
            participants: currentCohort.participants,
            [name]: value,
        });
    }, [currentCohort, setCurrentCohortChanges]);

    const handleNameKeyDown = useCallback((e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleFinishEditingName();
        }
    }, [handleFinishEditingName]);

    return (
        <>
            <div className={classes.cohortHeading}>
                <div className={isEditingName ? classes.editingCohortTitle : classes.cohortTitle}>
                    {isEditingName ? (
                        <input
                            className={classes.editingCohortName}
                            type="text"
                            name="cohortName"
                            value={currentCohort.cohortName}
                            onBlur={handleFinishEditingName}
                            onChange={handleTextChange}
                            onKeyDown={handleNameKeyDown}
                            maxLength={20}
                            autoFocus
                        />
                    ) : (
                        <span
                            onClick={handleEditName}
                            className={classes.cohortName}
                        >
                            {currentCohort.cohortName}
                        </span>
                    )}
                </div>
                <span className={classes.cohortItemCounts}>
                    {cohortCountsLabel} ({currentCohort.participants.length})
                </span>
            </div>
            <div className={classes.cohortDescription}>
                {isEditingDescription ? (
                    <textarea
                        ref={descriptionRef}
                        className={classes.editingCohortDescription}
                        value={currentCohort.cohortDescription}
                        onBlur={handleFinishEditingDescription}
                        name="cohortDescription"
                        onChange={handleTextChange}
                        rows={4}
                        maxLength={250}
                        placeholder="Enter cohort description..."
                        autoFocus
                    />
                ) : (
                    <textarea
                        className={classes.cohortDescriptionBox}
                        value={currentCohort.cohortDescription}
                        name="cohortDescription"
                        onFocus={handleEditDescription}
                        rows={4}
                        maxLength={250}
                        placeholder="Enter cohort description..."
                        readOnly={true}
                    />
                )}

            </div>
            <span className={classes.cohortLastUpdated}>
                {datePrefix} {(new Date(activeCohort.lastUpdated)).toLocaleDateString('en-US')}
            </span>
        </>
    );
};

export default memo(CohortMetadata);