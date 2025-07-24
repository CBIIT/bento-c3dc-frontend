import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import DEFAULT_CONFIG from '../config';

const CohortMetadata = (props) => {
    const {
        classes,
        config,
        activeCohort,
        temporaryCohort,
        handleSetCurrentCohortChanges
    } = props;

    // Get current cohort data (either from changes or original)
    const currentCohort = useMemo(() => {
        return temporaryCohort && temporaryCohort.cohortId === activeCohort.cohortId 
            ? temporaryCohort 
            : activeCohort;
    }, [temporaryCohort, activeCohort]);

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
        handleSetCurrentCohortChanges({
            ...temporaryCohort,
            ...currentCohort,
            [name]: value,
        });
    }, [temporaryCohort, currentCohort, handleSetCurrentCohortChanges]);

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

export default CohortMetadata;