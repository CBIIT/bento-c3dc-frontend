import React, { useState, useContext } from 'react';
import { CohortContext } from '../../../components/CohortSelector/CohortContext.js';
import {
    Modal, Button, Typography,
    TextareaAutosize, IconButton, withStyles,
  } from '@material-ui/core';
import DEFAULT_STYLES from './styles';
import DEFAULT_CONFIG from './config';
import CohortList from './components/cohortList';
import CohortDetails from './components/cohortDetails';

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

    const { state, dispatch } = useContext(CohortContext);
    const [selectedCohort, setSelectedCohort] = useState(Object.keys(state)[0]); // Default to the first entry
    
    const modalClosed = functions && typeof functions.modalClosed === 'function'
        ? functions.modalClosed
        : DEFAULT_CONFIG.functions.modalClosed;

    const modalTitle = config && config.title && typeof config.title === 'string'
        ? config.title
        : DEFAULT_CONFIG.config.title;

    /**
     * Boilerplate for state management
     * 

    const stateProps = (state) => ({
        metadata: state.localFind.uploadMetadata,
    });
        
    const dispatchProps = (dispatch) => ({
        onApplySearch: (data) => dispatch(updateUploadData(data)),
        updateMetadata: (data) => dispatch(updateUploadMetadata(data)),
    });
    CohortModal: withStyles(DEFAULT_STYLES, { withTheme: true })(connect(stateProps, dispatchProps)((props) => {
        }))
    */

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
                        </h1>
                        <div className={classes.modalContainer}>
                            <CohortList 
                                classes={cohortListClasses}
                                config={config.cohortList}
                                selectedCohort={selectedCohort}
                                setSelectedCohort={setSelectedCohort}
                                closeParentModal={closeModalWrapper}
                            />
                            <CohortDetails 
                                classes={cohortDetailsClasses}
                                config={config.cohortDetails}
                            />
                        </div>
                    </div>
                </Modal>
            )
        }),
    };
};

export default CohortModalGenerator;