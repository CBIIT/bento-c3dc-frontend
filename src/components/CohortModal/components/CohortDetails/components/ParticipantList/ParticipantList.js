import React, { useState, useContext, useCallback, useEffect, useMemo, memo } from 'react';
import { withStyles, Button } from '@material-ui/core';
import { CohortStateContext } from '../../../../../../components/CohortSelectorState/CohortStateContext';
import { onDeleteSingleCohort } from '../../../../../../components/CohortSelectorState/store/action';
import { CohortModalContext } from '../../../../CohortModalContext';
import SearchBar from './components/SearchBar';
import ParticipantTable from './components/ParticipantTable';
import DEFAULT_CONFIG from '../../../../config';

const ParticipantList = (props) => {
    const { classes, localCohort, setLocalCohort, handleSave, closeModal, config } = props;

    const { state, dispatch } = useContext(CohortStateContext);
    const {
        selectedCohort,
        currentCohortChanges,
        setCurrentCohortChanges,
        clearCurrentCohortChanges
    } = useContext(CohortModalContext);
    
    const activeCohort = state[selectedCohort];
    const matchingCohortID = currentCohortChanges && currentCohortChanges.cohortId === activeCohort.cohortId;

    const [searchText, setSearchText] = useState(matchingCohortID && currentCohortChanges['searchText'] ? currentCohortChanges['searchText'] : '');

    // Update searchText when currentCohortChanges changes (including when cleared)
    useEffect(() => {
        setSearchText(matchingCohortID && currentCohortChanges['searchText'] ? currentCohortChanges['searchText'] : '');
    }, [currentCohortChanges, matchingCohortID]);

    // Helper function to update both local and context state
    const updateCohortState = useCallback((updates) => {
        const newLocalCohort = { 
            ...(localCohort || {}), 
            ...(updates || {}) 
        };
        const newCohortChanges = {
            ...currentCohortChanges,
            ...(localCohort || {}),
            ...(updates || {})
        };
        
        setLocalCohort(newLocalCohort);
        setCurrentCohortChanges(newCohortChanges);
    }, [localCohort, currentCohortChanges, setLocalCohort, setCurrentCohortChanges]);

    const handleSearchChange = useCallback((searchValue) => {
        setSearchText(searchValue);
    }, []);

    const handleSetSearch = useCallback((searchValue) => {
        updateCohortState({ searchText: searchValue });
    }, [updateCohortState]);

    const handleDeleteParticipant = useCallback((participant_pk) => {
        const updatedParticipants = localCohort.participants.filter(participant => participant.participant_pk !== participant_pk);
        updateCohortState({ participants: updatedParticipants });
    }, [localCohort.participants, updateCohortState]);

    const handleDeleteCohort = useCallback(() => {
        dispatch(onDeleteSingleCohort(selectedCohort));
        clearCurrentCohortChanges();
    }, [dispatch, selectedCohort, clearCurrentCohortChanges]);

    const datePrefix = useMemo(() => {
        return (config && config.datePrefix) || DEFAULT_CONFIG.config.cohortDetails.datePrefix;
    }, [config]);

    return (
        <div className={classes.participantViewer}>
            <SearchBar
                initialSearchText={searchText}
                onSearchChange={handleSearchChange}
                onSearchBlur={handleSetSearch}
            />
            <ParticipantTable
                participants={localCohort.participants}
                onDeleteParticipant={handleDeleteParticipant}
                onDeleteCohort={handleDeleteCohort}
                searchText={searchText}
            />
            <div className={classes.cohortButtonSection}>
                <Button variant="contained" className={classes.cancelButton} onClick={closeModal}>
                    Cancel
                </Button>
                <Button variant="contained" className={classes.saveButton} onClick={() => handleSave()}>
                    Save Changes
                </Button>
            </div>
            <div className={classes.cohortLastUpdated}>
                {datePrefix} {(new Date(activeCohort.lastUpdated)).toLocaleDateString('en-US')}
            </div>
        </div>
    );
};

const styles = () => ({
    participantViewer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: '#F1F3F4',
        width: '100%',
        height: '100%',
        borderTopLeftRadius: '0px',
        borderTopRightRadius: '0px',
        borderBottomLeftRadius: '10px',
        borderBottomRightRadius: '10px',
        marginTop: '19px',
    },
    cohortButtonSection: {
        display: 'flex',
        justifyContent: 'center',
        padding: '22px 20px 10px 20px',
        width: '100%',
        gap: '8px',

        '& button': {
            height: '41px',
            fontFamily: 'Poppins',
            fontSize: '12px',
            fontWeight: '600',
            lineHeight: '16px',
            color: '#FFFFFF',
        },
    },
    cancelButton: {
        backgroundColor: '#4F5D69',
        border: '1.25px solid #CACACA',
        width: '137px',
        borderRadius: '5px',
        boxShadow: 'none',

        '&:hover': {
            backgroundColor: '#374149',
            boxShadow: 'none',
        },
    },
    saveButton: {
        backgroundColor: '#2A6E93',
        border: '1.25px solid #73A9C7',
        width: '137px',
        borderRadius: '5px',
        boxShadow: 'none',

        '&:hover': {
            backgroundColor: '#1d4d67',
            boxShadow: 'none',
        },
    },
    cohortLastUpdated: {
        width: '100%',
        textAlign: 'left',
        paddingLeft: '20px',
        paddingBottom: '10px',
        color: '#3A7A81',
        fontFamily: 'Lato',
        fontSize: 10,
        fontStyle: 'normal',
        fontWeight: 500,
        lineHeight: '22px',
        letterSpacing: '0.1px',
    },
});

export default memo(withStyles(styles, { withTheme: true })(ParticipantList));