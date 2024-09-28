import React, { useState, useContext, useEffect } from 'react';
import { CohortStateContext } from '../../../components/CohortSelectorState/CohortStateContext.js';
import {
    onDeleteSingleCohort,
    onDeleteAllCohort,
    onMutateSingleCohort,
} from '../../../components/CohortSelectorState/store/action.js';
import {
    Modal, withStyles,
} from '@material-ui/core';
import DEFAULT_STYLES from './styles';
import DEFAULT_CONFIG from './config';
import CohortList from './components/cohortList';
import CohortDetails from './components/cohortDetails';
import Alert from '@material-ui/lab/Alert';
import { GET_COHORT_MANIFEST_QUERY, GET_COHORT_METADATA_QUERY } from '../../../bento/dashboardTabData.js';
import client from '../../../utils/graphqlClient.js'
import { arrayToCSVDownload, objectToJsonDownload } from './utils.js';

/**
 * Generator function to create cohortModal component with custom configuration
 * applied.
 *
 * @param {object} [uiConfig] component configuration object
 * @returns {object} { cohortModal }
 */
export const CohortModalGenerator = (uiConfig = DEFAULT_CONFIG) => {
    const {
        config, functions,
    } = uiConfig;

    const { state, dispatch } = useContext(CohortStateContext);
    const [selectedCohort, setSelectedCohort] = useState(null); // Default to the first entry
    const [alert, setAlert] = useState({ type: '', message: '' });
    useEffect(() => {
        if (alert.message) {
            const timer = setTimeout(() => {
                setAlert({ type: '', message: '' }); // Clear the alert after 3 seconds
            }, 2500);

            // Cleanup timer on component unmount
            return () => clearTimeout(timer);
        }
    }, [alert]);

    const modalClosed = functions && typeof functions.modalClosed === 'function'
        ? functions.modalClosed
        : DEFAULT_CONFIG.functions.modalClosed;

    const modalTitle = config && config.title && typeof config.title === 'string'
        ? config.title
        : DEFAULT_CONFIG.config.title;

    const downloadCohortManifest = async () => {
        const participantPKs = state[selectedCohort].participants.map(item => item.participant_pk);
        const { data } = await client.query({
            query: GET_COHORT_MANIFEST_QUERY,
            variables: { "participant_pks": participantPKs },
        });
        arrayToCSVDownload(data['diagnosisOverview'], selectedCohort);
    };

    const downloadCohortMetadata = async () => {
        const participantPKs = state[selectedCohort].participants.map(item => item.participant_pk);
        const { data } = await client.query({
            query: GET_COHORT_METADATA_QUERY,
            variables: { "participant_pks": participantPKs },
        });
        objectToJsonDownload(data['cohortMetadata'], selectedCohort);
    };

    const handleDeleteCohort = (cohortId) => {
        dispatch(onDeleteSingleCohort(
            cohortId
        ));
    };

    const handleDeleteAllCohorts = () => {
        dispatch(onDeleteAllCohort());
    };
    // Handle saving updates to cohort
    const handleSaveCohort = (localCohort) => {
        if (!localCohort.cohortId) return;
        dispatch(onMutateSingleCohort(
            localCohort.cohortId,
            {
                cohortName: localCohort.cohortName,
                cohortDescription: localCohort.cohortDescription,
                participants: localCohort.participants
            },
            () => setAlert({ type: 'success', message: 'Cohort updated successfully!' }),
            (error) => setAlert({ type: 'error', message: `Failed to update cohort: ${error.message}` })
        ));
    };

    return {
        CohortModal: withStyles(DEFAULT_STYLES, { withTheme: true })((props) => {
            const {
                classes, open,
            } = props;

            const {
                CohortList: cohortListClasses,
                CohortDetails: cohortDetailsClasses,
            } = classes;

            const closeModalWrapper = () => {
                modalClosed();
                if (props.onCloseModal) {
                    props.onCloseModal();
                }
                setSelectedCohort(null);
            };

            return (
                <Modal
                    {...props}
                    open={open}
                    className={classes.modal}
                    onClose={closeModalWrapper}
                >
                    <div className={classes.paper}>
                        <h1 className={classes.modalTitle}>
                            <span>{modalTitle}</span>
                            <span className={classes.closeIcon} onClick={closeModalWrapper}>
                                <img
                                    src="https://raw.githubusercontent.com/CBIIT/datacommons-assets/main/bento/images/icons/svgs/LocalFindCaseDeleteIcon.svg"
                                    alt="close icon"
                                    className={classes.closeRoot}
                                />
                            </span>
                            {alert.message && (
                                <Alert severity={alert.type} className={classes.alert} onClose={() => setAlert({ type: '', message: '' })}>
                                    {alert.message}
                                </Alert>
                            )}
                        </h1>
                        <div className={classes.modalContainer}>
                            <CohortList
                                classes={cohortListClasses}
                                config={config.cohortList}
                                selectedCohort={selectedCohort}
                                setSelectedCohort={setSelectedCohort}
                                closeParentModal={closeModalWrapper}
                                handleDeleteCohort={handleDeleteCohort}
                                handleDeleteAllCohorts={handleDeleteAllCohorts}
                                state={state}
                            />
                            <CohortDetails
                                classes={cohortDetailsClasses}
                                config={config.cohortDetails}
                                activeCohort={state[selectedCohort]}
                                closeModal={closeModalWrapper}
                                handleSaveCohort={handleSaveCohort}
                                downloadCohortManifest={downloadCohortManifest}
                                downloadCohortMetadata={downloadCohortMetadata}
                            />
                        </div>
                    </div>
                </Modal>
            )
        }),
    };
};

export default CohortModalGenerator;