import { useContext, useCallback } from 'react';
import { CohortModalContext } from '../CohortModalContext';
import { deletionTypes } from '../components/deleteConfirmationModal';

/**
 * Custom hook for managing modal state and close operations
 * @param {Function} onModalClose - Callback function when modal closes
 * @param {Function} modalClosed - Additional cleanup function
 * @returns {Object} Modal state management functions
 */
export const useModalState = (onModalClose, modalClosed) => {
  const {
    setSelectedCohort,
    setDeleteModalProps,
    setShowDeleteConfirmation
  } = useContext(CohortModalContext) || {};

  // Close modal wrapper, handles cleanup and state reset
  const closeModalWrapper = useCallback(() => {
    if (typeof modalClosed === 'function') {
      modalClosed();
    }
    if (typeof onModalClose === 'function') {
      onModalClose();
    }
    if (setSelectedCohort) {
      setSelectedCohort(null);
    }
  }, [modalClosed, onModalClose, setSelectedCohort]);

  const unSavedChangesCheck = useCallback((hasUnsavedChanges) => {
    if (hasUnsavedChanges) {
      if (setDeleteModalProps && setShowDeleteConfirmation) {
        setDeleteModalProps({
          handleDelete: () => closeModalWrapper(),
          deletionType: deletionTypes.CLEAR_UNSAVED_CHANGES,
        });
        setShowDeleteConfirmation(true);
      }
    } else {
      closeModalWrapper();
    }
  }, [closeModalWrapper, setDeleteModalProps, setShowDeleteConfirmation]);

  return {
    closeModalWrapper,
    unSavedChangesCheck
  };
};