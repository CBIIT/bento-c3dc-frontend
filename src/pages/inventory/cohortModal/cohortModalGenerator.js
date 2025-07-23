import React, { useState, useContext, useEffect } from 'react';
import { CohortStateContext } from '../../../components/CohortSelectorState/CohortStateContext.js';
import {
    Modal, withStyles,
} from '@material-ui/core';
import DEFAULT_STYLES from './styles';
import DEFAULT_CONFIG from './config';
import CohortList from './components/cohortList';
import CohortDetails from './components/cohortDetails';
import DeleteConfirmationModal from './components/deleteConfirmationModal';
import { deletionTypes } from './components/deleteConfirmationModal';
import AlertManager from './components/AlertManager';
import { hasUnsavedChanges } from './utils.js';
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

    const { currentCohortChanges, setCurrentCohortChanges, selectedCohort, setSelectedCohort } = useContext(CohortModalContext);
    const { state } = useContext(CohortStateContext);
    const ignoredFields = ["cohortId"]
    const unSavedChanges = currentCohortChanges ? hasUnsavedChanges(currentCohortChanges, state[selectedCohort], ignoredFields) : false;
    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
    const [deleteModalProps, setDeleteModalProps] = useState({
        handleDelete: () => { },
        deletionType: "",
    });

    const modalClosed = functions && typeof functions.modalClosed === 'function'
        ? functions.modalClosed
        : DEFAULT_CONFIG.functions.modalClosed;

    const modalTitle = config && config.title && typeof config.title === 'string'
        ? config.title
        : DEFAULT_CONFIG.config.title;

    const handleClearCurrentCohortChanges = () => {
        setCurrentCohortChanges(null);
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
                                <AlertManager classes={classes} />
                            </h1>
                            <div className={classes.modalContainer}>
                                <CohortList
                                    classes={cohortListClasses}
                                    config={config.cohortList}
                                    unSavedChanges={unSavedChanges}
                                    setChangingConfirmation={setDeleteModalProps}
                                    setShowChangingConfirmation={setShowDeleteConfirmation}
                                    closeParentModal={unSavedChangesCheck}
                                    handleClearCurrentCohortChanges={handleClearCurrentCohortChanges}
                                    deleteConfirmationClasses={deleteConfirmationClasses}
                                />
                                <CohortDetails
                                    classes={cohortDetailsClasses}
                                    config={config.cohortDetails}
                                    closeModal={unSavedChangesCheck}
                                    deleteConfirmationClasses={deleteConfirmationClasses}
                                    handleClearCurrentCohortChanges={handleClearCurrentCohortChanges}
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