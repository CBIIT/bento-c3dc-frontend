import { useContext, useCallback } from 'react';
import { CohortModalContext } from '../CohortModalContext';
import { confirmationTypes } from '../components/shared/ConfirmationModal';

/**
 * Custom hook for managing modal state and close operations
 * @param {Function} onModalClose - Callback function when modal closes
 * @param {Function} modalClosed - Additional cleanup function
 * @returns {Object} Modal state management functions
 */
export const useModalState = (onModalClose, modalClosed) => {
  const {
    setSelectedCohort,
    setConfirmModalProps,
    setShowConfirmation
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
      if (setConfirmModalProps && setShowConfirmation) {
        setConfirmModalProps({
          handleConfirm: () => closeModalWrapper(),
          deletionType: confirmationTypes.CLEAR_UNSAVED_CHANGES,
        });
        setShowConfirmation(true);
      }
    } else {
      closeModalWrapper();
    }
  }, [closeModalWrapper, setConfirmModalProps, setShowConfirmation]);

  return {
    closeModalWrapper,
    unSavedChangesCheck
  };
};