import React, { useContext, useEffect } from 'react';
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
 * CohortModal component for managing cohorts with custom configuration support.
 *
 * @param {object} [config] component configuration object
 * @param {object} [functions] callback functions object
 * @param {...object} props other props passed to the modal
 */
const CohortModal = (props) => {
    const { 
        config = DEFAULT_CONFIG.config, 
        functions = DEFAULT_CONFIG.functions,
        classes,
        ...modalProps
    } = props;

    const { 
        currentCohortChanges, 
        clearCurrentCohortChanges, 
        selectedCohort, 
        setSelectedCohort,
        showDeleteConfirmation,
        setShowDeleteConfirmation,
        deleteModalProps,
        setDeleteModalProps
    } = useContext(CohortModalContext) || {};
    const { state } = useContext(CohortStateContext) || {};
    const ignoredFields = ["cohortId"]
    const unSavedChanges = currentCohortChanges ? hasUnsavedChanges(currentCohortChanges, state[selectedCohort], ignoredFields) : false;

    const modalClosed = functions && typeof functions.modalClosed === 'function'
        ? functions.modalClosed
        : DEFAULT_CONFIG.functions.modalClosed;

    const modalTitle = config && config.title && typeof config.title === 'string'
        ? config.title
        : DEFAULT_CONFIG.config.title;
    const { open } = modalProps;

    const {
        CohortList: cohortListClasses,
        CohortDetails: cohortDetailsClasses,
        DeleteConfirmation: deleteConfirmationClasses,
    } = classes;

    const closeModalWrapper = () => {
        modalClosed();
        if (modalProps.onCloseModal) {
            modalProps.onCloseModal();
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
            clearCurrentCohortChanges();
        }
    }, [open, clearCurrentCohortChanges]);

    return (
        <>
            <Modal
                {...modalProps}
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
                                    closeModal={unSavedChangesCheck}
                                />
                                <CohortDetails
                                    classes={cohortDetailsClasses}
                                    config={config.cohortDetails}
                                    closeModal={unSavedChangesCheck}
                                />
                            </div>
                        </div>
                    </Modal>
                    <DeleteConfirmationModal
                        classes={deleteConfirmationClasses}
                        open={showDeleteConfirmation}
                        setOpen={setShowDeleteConfirmation}
                        handleDelete={deleteModalProps && deleteModalProps.handleDelete ? deleteModalProps.handleDelete : (() => {})}
                        deletionType={deleteModalProps && deleteModalProps.deletionType ? deleteModalProps.deletionType : ""}
                />
        </>
    );
};

export default withStyles(DEFAULT_STYLES, { withTheme: true })(CohortModal);