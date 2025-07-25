import React, { useState, useEffect, useRef, useCallback, useMemo, useContext, memo } from 'react';
import { withStyles } from '@material-ui/core';
import DEFAULT_CONFIG from '../../../config';
import { CohortModalContext } from '../../../CohortModalContext';
import { CohortStateContext } from '../../../../../../components/CohortSelectorState/CohortStateContext';

const CohortMetadata = (props) => {
    const { config, classes } = props;

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
        </>
    );
};

const styles = () => ({
    cohortHeading: {
        display: 'flex',
        justifyContent: 'space-between',
        padding: '17px 23px 0px 23px',
    },
    cohortTitle: {
        fontFamily: 'Poppins',
        fontSize: '18px',
        fontWeight: '500',
        lineHeight: '20px',
        letterSpacing: '-0.5%',
        color: '#3A555E',
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        height: '29px',
        paddingLeft: '10px',
        border: '.5px solid #8B98AF',
        borderRadius: '5px',
        width: '250px',
    },
    cohortName: {
        width: '250px',
    },
    editingCohortTitle: {
        fontFamily: 'Poppins',
        fontSize: '18px',
        fontWeight: '500',
        lineHeight: '20px',
        letterSpacing: '-0.5%',
        color: '#3A555E',
        height: '29px',
        margin: '0px',
        outline: 'none',
        padding: '0px 10px 0px 10px',
        boxSize: 'border-box',
        border: '2px solid #00CBD2',
        borderRadius: '5px',
        display: 'flex',
        alignItems: 'center',
        width: '250px',
    },
    editingCohortName: {
        fontSize: 'inherit',
        fontWeight: 'inherit',
        fontFamily: 'inherit',
        lineHeight: 'inherit',
        letterSpacing: 'inherit',
        color: '#3A555E',
        width: '100%',
        margin: '0px',
        outline: 'none',
        '&:focus-within': {
            padding: '0px',
            margin: '0px',
        },
        boxSizing: 'border-box',
        border: 'none',
    },
    editIcon: {
        height: '13px',
        '&:hover': {
            cursor: 'pointer',
        },
        border: '1px solid #D0D0D0',
        borderRadius: '2px',
    },
    cohortItemCounts: {
        fontFamily: 'Poppins',
        fontSize: '11px',
        fontWeight: '600',
        lineHeight: '26px',
        color: '#385C66',
        flex: '0 0 130px',
        whiteSpace: 'nowrap'
    },
    cohortDescription: {
        fontFamily: 'Open Sans',
        fontSize: '13px',
        fontWeight: '400',
        lineHeight: '18px',
        maxHeight: '100px',
        color: '#343434',
        padding: '10px 25px 0px 23px',
        overflowWrap: 'break-word',
        whiteSpace: 'normal',
        display: 'flex',
        alignItems: 'flex-end',
        gap: '10px',
    },
    cohortDescriptionBox: {
        fontFamily: 'Open Sans',
        fontSize: '13px',
        fontWeight: '400',
        lineHeight: '20px',
        height: '88px',
        color: '#343434',
        padding: '4.5px 10px',
        margin: '0px',
        border: '.5px solid #8B98AF',
        borderRadius: '5px',
        outline: 'none',
        width: '100%',
        resize: 'none',
        boxSizing: 'border-box',
        caretColor: 'transparent',
    },
    editingCohortDescription: {
        fontFamily: 'Open Sans',
        fontSize: '13px',
        fontWeight: '400',
        lineHeight: '20px',
        height: '88px',
        color: '#343434',
        padding: '3px 8.5px',
        margin: '0px',
        border: '2px solid #00CBD2',
        borderRadius: '3px',
        outline: 'none',
        width: '100%',
        resize: 'none',
        boxSizing: 'border-box',
    },
});

export default memo(withStyles(styles, { withTheme: true })(CohortMetadata));