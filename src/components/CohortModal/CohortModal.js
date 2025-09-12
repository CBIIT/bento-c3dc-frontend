import React, { useContext, useEffect, useCallback } from 'react';
import {
    Modal, withStyles,
} from '@material-ui/core';
import DEFAULT_STYLES from './styles';
import DEFAULT_CONFIG from './config';
import CohortList from './components/CohortList/CohortList';
import CohortDetails from './components/CohortDetails/CohortDetails';
import { DeleteConfirmationModal, AlertManager } from './components/shared';
import { CohortModalContext } from './CohortModalContext';
import { useModalState } from './hooks/useModalState';
import { useUnsavedChanges } from './hooks/useUnsavedChanges';

// Constant to avoid recreating empty function on every render
const EMPTY_FUNCTION = () => {};

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
        clearCurrentCohortChanges,
        showDeleteConfirmation,
        setShowDeleteConfirmation,
        deleteModalProps
    } = useContext(CohortModalContext) || {};

    // Use custom hooks for complex logic
    const { unSavedChanges } = useUnsavedChanges();
    const { unSavedChangesCheck } = useModalState(
        modalProps.onCloseModal,
        functions.modalClosed || DEFAULT_CONFIG.functions.modalClosed
    );

    const modalTitle = config.title || DEFAULT_CONFIG.config.title;
    const { open } = modalProps;

    const {
        CohortList: cohortListClasses,
        CohortDetails: cohortDetailsClasses,
        DeleteConfirmation: deleteConfirmationClasses,
    } = classes;

    const handleModalClose = useCallback(() => {
        unSavedChangesCheck(unSavedChanges);
    }, [unSavedChangesCheck, unSavedChanges]);

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
                onClose={handleModalClose}
            >
                        <div className={classes.paper}>
                            <h1 className={classes.modalTitle}>
                                <span>{modalTitle}</span>
                                <span className={classes.closeIcon} onClick={handleModalClose}>
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
                                    closeModal={handleModalClose}
                                />
                                <CohortDetails
                                    classes={cohortDetailsClasses}
                                    config={config.cohortDetails}
                                    closeModal={handleModalClose}
                                />
                            </div>
                        </div>
                    </Modal>
                    <DeleteConfirmationModal
                        classes={deleteConfirmationClasses}
                        open={showDeleteConfirmation}
                        setOpen={setShowDeleteConfirmation}
                        handleDelete={deleteModalProps && deleteModalProps.handleDelete ? deleteModalProps.handleDelete : EMPTY_FUNCTION}
                        deletionType={deleteModalProps && deleteModalProps.deletionType ? deleteModalProps.deletionType : ""}
                />
        </>
    );
};

export default withStyles(DEFAULT_STYLES, { withTheme: true })(CohortModal);