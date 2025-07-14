import React, { useState, useEffect, useRef } from 'react';
import DEFAULT_CONFIG from '../config';
import { debounce } from '../utils';

const CohortMetadata = (props) => {
    const {
        classes,
        config,
        activeCohort,
        temporaryCohort,
        localCohort,
        setLocalCohort,
        handleSetCurrentCohortChanges
    } = props;

    const [isEditingName, setIsEditingName] = useState(false);
    const [isEditingDescription, setIsEditingDescription] = useState(false);
    const descriptionRef = useRef(null);

    const cohortCountsLabel = config && config.cohortCountsLabel && typeof config.cohortCountsLabel === 'string'
        ? config.cohortCountsLabel
        : DEFAULT_CONFIG.config.cohortDetails.cohortCountsLabel;

    const datePrefix = config && config.datePrefix && typeof config.datePrefix === 'string'
        ? config.datePrefix
        : DEFAULT_CONFIG.config.cohortDetails.datePrefix;

    useEffect(() => {
        if (isEditingDescription && descriptionRef.current) {
            const textarea = descriptionRef.current;
            descriptionRef.current.focus();
            textarea.selectionStart = textarea.selectionEnd = textarea.value.length;
        }
    }, [isEditingDescription]);

    const handleEditName = () => {
        setIsEditingName(true);
    };

    const handleEditDescription = () => {
        setIsEditingDescription(true);
    };

    const debouncedSave = useRef(
        debounce((e) => {
            setIsEditingName(false);
            handleSetCurrentCohortChanges({
                ...temporaryCohort,
                ...localCohort,
                [e.target.name]: e.target.value,
            });
        }, 100) // Adjust debounce delay
    ).current;

    const handleSaveName = (e) => {
        setIsEditingName(false);
        debouncedSave(e);
    };

    const handleSaveDescription = (e) => {
        setIsEditingDescription(false);
        debouncedSave(e);
    };

    const handleTextChange = (e) => {
        setLocalCohort({
            ...localCohort,
            [e.target.name]: e.target.value,
        });
    };

    return (
        <>
            <div className={classes.cohortHeading}>
                <div className={isEditingName ? classes.editingCohortTitle : classes.cohortTitle}>
                    {isEditingName ? (
                        <input
                            className={classes.editingCohortName}
                            type="text"
                            name="cohortName"
                            value={localCohort['cohortName']}
                            onBlur={(e) => handleSaveName(e)}
                            onChange={(e) => handleTextChange(e)}
                            maxLength={20}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    e.preventDefault();
                                    handleSaveName(e);
                                }
                            }}
                            autoFocus
                        />
                    ) : (
                        <>
                            <span
                                onClick={handleEditName}
                                className={classes.cohortName}
                            >
                                {localCohort['cohortName']}
                            </span>
                        </>
                    )}
                </div>
                <span className={classes.cohortItemCounts}>
                    {cohortCountsLabel} ({localCohort.participants.length})
                </span>
            </div>
            <div className={classes.cohortDescription}>
                {isEditingDescription ? (
                    <textarea
                        ref={descriptionRef}
                        className={classes.editingCohortDescription}
                        value={localCohort['cohortDescription']}
                        onBlur={(e) => handleSaveDescription(e)}
                        name="cohortDescription"
                        onChange={(e) => handleTextChange(e)}
                        rows={4}
                        maxLength={250}
                        placeholder="Enter cohort description..."
                        autoFocus
                    />

                ) : (
                    <>
                        <textarea
                            className={classes.cohortDescriptionBox}
                            value={localCohort['cohortDescription']}
                            name="cohortDescription"
                            onFocus={handleEditDescription}
                            rows={4}
                            maxLength={250}
                            placeholder="Enter cohort description..."
                            readOnly={true}

                        />
                    </>
                )}

            </div>
            <span className={classes.cohortLastUpdated}>
                {datePrefix} {(new Date(activeCohort.lastUpdated)).toLocaleDateString('en-US')}
            </span>
        </>
    );
};

export default CohortMetadata;