import React, { useState, useEffect, useContext } from 'react';
import { withStyles } from '@material-ui/core';
import { CohortStateContext } from '../../../../components/CohortSelectorState/CohortStateContext.js';
import { onMutateSingleCohort } from '../../../../components/CohortSelectorState/store/action.js';
import { CohortModalContext } from '../../CohortModalContext.js';
import CohortMetadata from './components/CohortMetadata';
import ParticipantList from './components/ParticipantList';
import ActionButtons from './components/ActionButtons';

/**
 * A list of cohorts to select from and manage.
 */

const CohortDetails = (props) => {
    const {
        classes,
        config,
        closeModal,
    } = props;

    const { state, dispatch } = useContext(CohortStateContext);
    const { 
        selectedCohort, 
        currentCohortChanges, 
        setCurrentCohortChanges, 
        showAlert, 
        clearCurrentCohortChanges
    } = useContext(CohortModalContext);
    
    const activeCohort = state[selectedCohort];

    const handleSetCurrentCohortChanges = (localCohort) => {
        if (!localCohort.cohortId) return;
        setCurrentCohortChanges({
            cohortId: localCohort.cohortId,
            cohortName: localCohort.cohortName,
            cohortDescription: localCohort.cohortDescription,
            participants: localCohort.participants,
            searchText: localCohort.searchText,
        })
    };

    const handleSaveCohort = (localCohort) => {
        if (!localCohort.cohortId) return;
        dispatch(onMutateSingleCohort(
            localCohort.cohortId,
            {
                cohortName: localCohort.cohortName,
                cohortDescription: localCohort.cohortDescription,
                participants: localCohort.participants
            },
            () => {
                showAlert('success', 'Cohort updated successfully!');
                clearCurrentCohortChanges();        
            },
            (error) => {
                showAlert('error', `Failed to update cohort: ${error.message}`);
            }
        ));
    };

    if (!activeCohort) {
        return null;
    }

    let matchingCohortID = currentCohortChanges && currentCohortChanges.cohortId === activeCohort.cohortId;

    const [localCohort, setLocalCohort] = useState({
        cohortId: matchingCohortID ? currentCohortChanges.cohortId : activeCohort.cohortId,
        cohortName: matchingCohortID ? currentCohortChanges.cohortName : activeCohort.cohortName,
        cohortDescription: matchingCohortID ? currentCohortChanges.cohortDescription : activeCohort.cohortDescription,
        participants: matchingCohortID ? JSON.parse(JSON.stringify(currentCohortChanges.participants)) : JSON.parse(JSON.stringify(activeCohort.participants)),
    });

    // Update localCohort when selectedCohort changes
    useEffect(() => {
        const matchingCohortID = currentCohortChanges && currentCohortChanges.cohortId === activeCohort.cohortId;
        setLocalCohort({
            cohortId: matchingCohortID ? currentCohortChanges.cohortId : activeCohort.cohortId,
            cohortName: matchingCohortID ? currentCohortChanges.cohortName : activeCohort.cohortName,
            cohortDescription: matchingCohortID ? currentCohortChanges.cohortDescription : activeCohort.cohortDescription,
            participants: matchingCohortID ? JSON.parse(JSON.stringify(currentCohortChanges.participants)) : JSON.parse(JSON.stringify(activeCohort.participants)),
        });
    }, [selectedCohort, activeCohort, currentCohortChanges]);
    
    const handleSave = () => {
        handleSaveCohort(localCohort)
        handleSetCurrentCohortChanges({
            ...currentCohortChanges,
            ...localCohort,
        });
    }

    return (
        <div style={{display: 'flex', flexDirection: 'column', gap: 20}}>
            <div className={classes.cohortDetailsSection}>
                <CohortMetadata
                    config={config}
                />
                <ParticipantList
                    localCohort={localCohort}
                    setLocalCohort={setLocalCohort}
                    handleSave={handleSave}
                    closeModal={closeModal}
                    config={config}
                />
                
            </div>
            <ActionButtons
                localCohort={localCohort}
            />
        </div>
    );
};

/**
 * Default styles for the component.
 */

const styles = () => ({
    cohortDetailsSection: {
        flexGrow: 55,
        flexBasis: '0%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'normal',
        //width: '55%',
        //width: '55.191%',
        //height: '87.030%',
        maxWidth: '521px',
        height: '50%',
        minHeight: '435px',
        width: '100%',
        minWidth: '275px',
        //maxHeight: '718px',
        border: '1px solid #3388A6',
        borderRadius: '10px',
    },

});

export default withStyles(styles, { withTheme: true })(CohortDetails);