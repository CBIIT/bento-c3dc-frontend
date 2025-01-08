import React, { useState, useContext } from 'react';
import { CohortStateContext } from '../../components/CohortSelectorState/CohortStateContext.js';
import { 
  onCreateNewCohort, 
  onMutateSingleCohort, 
  onDeleteSingleCohort, 
  onDeleteAllCohort, 
  onAddParticipantsToCohort,  
} from '../../components/CohortSelectorState/store/action.js'; 
import { makeStyles } from '@material-ui/core/styles';
import { TextField, Button, Select, MenuItem, InputLabel, FormControl, Typography, Grid } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';

const useStyles = makeStyles((theme) => ({
  container: {
    width: '100%',
    maxWidth: '800px',
    margin: '0 auto',
    padding: theme.spacing(2),
    backgroundColor: '#f9f9f9',
    borderRadius: theme.shape.borderRadius,
    boxShadow: theme.shadows[2],
  },
  formControl: {
    marginBottom: theme.spacing(2),
    width: '100%',
  },
  button: {
    marginTop: '-16px',
  },
  participantList: {
    listStyleType: 'none',
    padding: 0,
  },
  participantItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing(1),
  },
  createButton: {
    height: '56px', // Match the height of the TextField
  },
  alert: {
    marginBottom: theme.spacing(2),
  },
}));

const CohortManager = (props) => {
  const classes = useStyles();
  const { state, dispatch } = useContext(CohortStateContext);

  // Local state for inputs
  const [cohortId, setCohortId] = useState('');
  const [cohortName, setCohortName] = useState('');
  const [cohortDescription, setCohortDescription] = useState('');
  const [participant_id, setParticipantId] = useState('');
  const [dbgap_accession, setDbgapAccession] = useState('');
  const [participant_pk, setParticipantPk] = useState('');
  const [selectedCohort, setSelectedCohort] = useState('');
  const [participants, setParticipants] = useState([]);
  const [alert, setAlert] = useState({ type: '', message: '' });

  // Handle cohort creation
  const handleCreateCohort = () => {
    const newCohortId = cohortName || cohortId; // Allow reducer to handle default naming
    dispatch(onCreateNewCohort(
      newCohortId, // Optional
      cohortDescription, // Optional
      [], 
      () => setAlert({ type: 'success', message: 'Cohort created successfully!' }),
      (error) => setAlert({ type: 'error', message: `Failed to create cohort: ${error.message}` })
    ));
    setCohortId('');
    setCohortName('');
    setCohortDescription('');
  };

  // Handle adding participant
  const handleAddParticipant = () => {
    if (!participant_id || !selectedCohort) return;
    const newParticipant = {
      participant_id,
      dbgap_accession,
      participant_pk,
    };
    dispatch(onAddParticipantsToCohort(
      selectedCohort, 
      [newParticipant],
      () => {
        setAlert({ type: 'success', message: 'Participant added successfully!' });
        setParticipants([...participants, newParticipant]);
      },
      (error) => setAlert({ type: 'error', message: `Failed to add participant: ${error.message}` })
    ));
    setParticipantId('');
    setDbgapAccession('');
    setParticipantPk('');
  };

  // Handle removing participant
  const handleRemoveParticipant = (participant_pk) => {
    setParticipants(participants.filter(p => p.participant_pk !== participant_pk));
  };

  // Handle deleting a cohort
  const handleDeleteCohort = (cohortId) => {
    dispatch(onDeleteSingleCohort(
      cohortId,
      () => setAlert({ type: 'success', message: 'Cohort deleted successfully!' }),
      (error) => setAlert({ type: 'error', message: `Failed to delete cohort: ${error.message}` })
    ));
    setSelectedCohort('');
  };

  // Handle deleting all cohorts
  const handleDeleteAllCohorts = () => {
    dispatch(onDeleteAllCohort(
      () => setAlert({ type: 'success', message: 'All cohorts deleted successfully!' }),
      (error) => setAlert({ type: 'error', message: `Failed to delete all cohorts: ${error.message}` })
    ));
    setSelectedCohort('');
  };

  // Handle saving updates to cohort
  const handleSaveCohort = () => {
    if (!selectedCohort) return;
    dispatch(onMutateSingleCohort(
      selectedCohort, 
      { cohortName, cohortDescription, participants },
      () => setAlert({ type: 'success', message: 'Cohort updated successfully!' }),
      (error) => setAlert({ type: 'error', message: `Failed to update cohort: ${error.message}` })
    ));
    setCohortName('');
    setCohortDescription('');
  };

  // Handle selecting a cohort
  const handleSelectCohort = (cohortId) => {
    setSelectedCohort(cohortId);
    const cohort = state[cohortId];
    setCohortName(cohort.cohortName);
    setCohortDescription(cohort.cohortDescription);
    setParticipants(cohort.participants);
  };

  return (
    <div className={classes.container}>
      <Typography variant="h5" gutterBottom>Cohort Management</Typography>

      {alert.message && (
        <Alert severity={alert.type} className={classes.alert} onClose={() => setAlert({ type: '', message: '' })}>
          {alert.message}
        </Alert>
      )}

      <div>
        <Typography variant="h6">Create New Cohort</Typography>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={5}>
            <TextField
              className={classes.formControl}
              label="Cohort Name"
              value={cohortName}
              onChange={(e) => setCohortName(e.target.value)}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={5}>
            <TextField
              className={classes.formControl}
              label="Cohort Description"
              value={cohortDescription}
              onChange={(e) => setCohortDescription(e.target.value)}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={2}>
            <Button
              className={`${classes.button} ${classes.createButton}`}
              variant="contained"
              color="primary"
              onClick={handleCreateCohort}
            >
              Create
            </Button>
          </Grid>
        </Grid>
      </div>

      <div>
        <Typography variant="h6">Manage Existing Cohorts</Typography>
        <FormControl variant="outlined" className={classes.formControl}>
          <InputLabel>Select Cohort</InputLabel>
          <Select
            value={selectedCohort}
            onChange={(e) => handleSelectCohort(e.target.value)}
            label="Select Cohort"
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {Object.keys(state).map((id) => (
              <MenuItem key={id} value={id}>
                {id}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {selectedCohort && (
          <>
            <Typography variant="h6">Rename Cohort</Typography>
            <TextField
              className={classes.formControl}
              label="New Cohort Name"
              value={cohortName}
              onChange={(e) => setCohortName(e.target.value)}
              variant="outlined"
            />

            <Typography variant="h6">Update Cohort Description</Typography>
            <TextField
              className={classes.formControl}
              label="New Cohort Description"
              value={cohortDescription}
              onChange={(e) => setCohortDescription(e.target.value)}
              variant="outlined"
            />

            <Typography variant="h6">Add Participant</Typography>
            <TextField
              className={classes.formControl}
              label="Participant ID"
              value={participant_id}
              onChange={(e) => setParticipantId(e.target.value)}
              variant="outlined"
            />
            <TextField
              className={classes.formControl}
              label="dbGaP Accession"
              value={dbgap_accession}
              onChange={(e) => setDbgapAccession(e.target.value)}
              variant="outlined"
            />
            <TextField
              className={classes.formControl}
              label="Participant PK"
              value={participant_pk}
              onChange={(e) => setParticipantPk(e.target.value)}
              variant="outlined"
            />
            <Button
              className={classes.button}
              variant="contained"
              color="primary"
              onClick={handleAddParticipant}
            >
              Add Participant
            </Button>

            <Typography variant="h6">Participants</Typography>
            <ul className={classes.participantList}>
              {participants.map((participant) => (
                <li key={participant.participant_id} className={classes.participantItem}>
                  {participant.participant_id} ({participant.dbgap_accession}, {participant.participant_pk})
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => handleRemoveParticipant(participant.participant_pk)}
                  >
                    Remove
                  </Button>
                </li>
              ))}
            </ul>
            <Grid container justifyContent="center">
              <Button
                className={classes.button}
                variant="contained"
                color="primary"
                onClick={handleSaveCohort}
              >
                Save Changes
              </Button>
              <Button
                className={classes.button}
                variant="contained"
                color="secondary"
                onClick={() => handleDeleteCohort(selectedCohort)}
              >
                Delete Cohort
              </Button>
            </Grid>
          </>
        )}
        <Grid container justifyContent="center">
          <Button
            className={classes.button}
            variant="contained"
            color="secondary"
            onClick={handleDeleteAllCohorts}
            style={{ marginTop: '50px' }}
          >
            Delete All Cohorts
          </Button>
        </Grid>
      </div>
    </div>
  );
};

export default CohortManager;