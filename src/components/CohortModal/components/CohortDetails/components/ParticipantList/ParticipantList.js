import React, { useState, useContext, useCallback, useEffect, useMemo, memo } from 'react';
import { withStyles, Button } from '@material-ui/core';
import { CohortStateContext } from '../../../../../../components/CohortSelectorState/CohortStateContext';
import { CohortModalContext } from '../../../../CohortModalContext';
import SearchBar from './components/SearchBar';
import ParticipantTable from './components/ParticipantTable';
import DEFAULT_CONFIG from '../../../../config';

const ParticipantList = (props) => {
    const { classes, localCohort, setLocalCohort, handleSave, closeModal, config } = props;

    const { state } = useContext(CohortStateContext);
    const { 
        selectedCohort, 
        currentCohortChanges,
        setCurrentCohortChanges
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

    const handleDeleteAllParticipants = useCallback(() => {
        updateCohortState({ participants: [] });
    }, [updateCohortState]);

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
                onDeleteAllParticipants={handleDeleteAllParticipants}
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
        marginTop: '16px',
    },
    cohortButtonSection: {
        display: 'flex',
        justifyContent: 'center',
        padding: '10px 20px 10px 20px',
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
        fontSize: 10,
        color: '#2D5D63',
        fontFamily: 'Lato',
        textAlign: 'left',
        lineHeight: '22px',
        paddingLeft: '20px',
        paddingBottom: '10px',
    },
});

export default memo(withStyles(styles, { withTheme: true })(ParticipantList));