import React, { useState, useContext, useEffect, useRef } from 'react';
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
import DeleteConfirmationModal from './components/deleteConfirmationModal';
import { deletionTypes } from './components/deleteConfirmationModal';
import Alert from '@material-ui/lab/Alert';
import { GET_COHORT_MANIFEST_QUERY, GET_COHORT_METADATA_QUERY } from '../../../bento/dashboardTabData.js';
import client from '../../../utils/graphqlClient.js'
import { arrayToCSVDownload, objectToJsonDownload, hasUnsavedChanges } from './utils.js';
import { CohortModalContext } from './CohortModalContext.js'

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

    const { currentCohortChanges, setCurrentCohortChanges } = useContext(CohortModalContext);
    const { state, dispatch } = useContext(CohortStateContext);
    const [selectedCohort, setSelectedCohort] = useState(null); // Default to the first entry
    const [alert, setAlert] = useState({ type: '', message: '' });
    const ignoredFields = ["cohortId"]
    const unSavedChanges = currentCohortChanges ? hasUnsavedChanges(currentCohortChanges, state[selectedCohort], ignoredFields) : false;
    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
    const [deleteModalProps, setDeleteModalProps] = useState({
        handleDelete: () => { },
        deletionType: "",
    });
    const success = useRef(false);
    const switchedCohort = useRef(false);
    const errMessage = useRef("");

    useEffect(() => {
        if (alert.message) {
            const timer = setTimeout(() => {
                setAlert({ type: '', message: '' });
                success.current = false;
                errMessage.current = "";
            }, 2500);

            return () => clearTimeout(timer);
        }
    }, [alert]);


    useEffect(() => {
        if (switchedCohort.current) {
            success.current = false;
            errMessage.current = "";
            switchedCohort.current = false;
            setAlert({ type: '', message: '' });
        }
    }, [switchedCohort.current])

    useEffect(() => {
        if (success.current) {
            setAlert({ type: 'success', message: 'Cohort updated successfully!' });


        } else if (errMessage.current) {
            setAlert({ type: 'error', message: `Failed to update cohort: ${errMessage.current}` });

        } else {
            setAlert({ type: '', message: '' });
        }
    }, [success.current, errMessage.current, state])

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
            variables: { "participant_pk": participantPKs, "first": state[selectedCohort].participants.length },
        });
        arrayToCSVDownload(data['diagnosisOverview'], selectedCohort);
    };

    const downloadCohortMetadata = async () => {
        const participantPKs = state[selectedCohort].participants.map(item => item.participant_pk);
        const { data } = await client.query({
            query: GET_COHORT_METADATA_QUERY,
            variables: { "participant_pk": participantPKs, "first": state[selectedCohort].participants.length },
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

  

    const handleClearCurrentCohortChanges = () => {
        setCurrentCohortChanges(null);
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
                success.current = true; 
                 handleClearCurrentCohortChanges();        
            },
            (error) =>{
                errMessage.current = error.message;
            } 
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
                DeleteConfirmation: deleteConfirmationClasses,
            } = classes;

            const closeModalWrapper = () => {
                modalClosed();
                if (props.onCloseModal) {
                    props.onCloseModal();
                }
                setSelectedCohort(null);
            };

            const unSavedChangesCheck = () => {
                if (unSavedChanges) {
                    setDeleteModalProps({
                        handleDelete: () => closeModalWrapper(),
                        deletionType: deletionTypes.CLEAR_UNSAVED_CHANGES,
                    });
                    setShowDeleteConfirmation(true)
                }
                else {
                    closeModalWrapper()
                }
            }

            useEffect(() => {
                if (!open) {
                    setCurrentCohortChanges(null);
                }
            }, [open]);

            return (
                <>
                    <Modal
                        {...props}
                        open={open}
                        className={classes.modal}
                        onClose={unSavedChangesCheck}
                    >
                        <div className={classes.paper}>
                            <h1 className={classes.modalTitle}>
                                <span>{modalTitle}</span>
                                <span className={classes.closeIcon} onClick={unSavedChangesCheck}>
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
                                    switchedCohortRef={switchedCohort}
                                    unSavedChanges={unSavedChanges}
                                    setChangingConfirmation={setDeleteModalProps}
                                    setShowChangingConfirmation={setShowDeleteConfirmation}
                                    closeParentModal={unSavedChangesCheck}
                                    handleDeleteCohort={handleDeleteCohort}
                                    handleDeleteAllCohorts={handleDeleteAllCohorts}
                                    handleClearCurrentCohortChanges={handleClearCurrentCohortChanges}
                                    deleteConfirmationClasses={deleteConfirmationClasses}
                                    state={state}
                                />
                                <CohortDetails
                                    classes={cohortDetailsClasses}
                                    config={config.cohortDetails}
                                    activeCohort={state[selectedCohort]}
                                    temporaryCohort={currentCohortChanges}
                                    closeModal={unSavedChangesCheck}
                                    handleSaveCohort={handleSaveCohort}
                                    handleSetCurrentCohortChanges={handleSetCurrentCohortChanges}
                                    downloadCohortManifest={downloadCohortManifest}
                                    downloadCohortMetadata={downloadCohortMetadata}
                                    deleteConfirmationClasses={deleteConfirmationClasses}
                                />
                            </div>
                        </div>
                    </Modal>
                    <DeleteConfirmationModal
                        classes={deleteConfirmationClasses}
                        open={showDeleteConfirmation}
                        setOpen={setShowDeleteConfirmation}
                        handleDelete={deleteModalProps.handleDelete}
                        deletionType={deleteModalProps.deletionType}
                    />
                </>
            )
        }),
    };
};

export default CohortModalGenerator;