import React from 'react';
import { Modal, withStyles } from '@material-ui/core';

export const deletionTypes = {
    DELETE_ALL_COHORTS: 'ALL cohorts?',
    DELETE_SINGLE_COHORT: 'this cohort?',
    DELETE_ALL_PARTICIPANTS: 'ALL participants?',
    CLEAR_UNSAVED_CHANGES: 'leave? You will lose all unsaved changes.'
};

const DeleteConfirmationModal = (props) => {
    const {
        classes,
        open,
        setOpen,
        handleDelete,
        deletionType,
        message
    } = props;
    return (
        <Modal
            open={open}
            onClose={() => setOpen(false)}
        >
            <div className={classes.modal}>
                <div className={classes.modalContent}>
                    <div className={classes.modalHeading}>
                        {message ?
                            <span>{message}</span>
                            :
                            <>
                                <span> Are you sure you want to {deletionType} </span>
                                {deletionType !== deletionTypes.DELETE_ALL_PARTICIPANTS && <span>This action cannot be undone. Press Confirm or Cancel </span>}
                            </>
                        }

                    </div>
                    <div className={classes.modalButtons}>
                        {message ?
                            <button className={classes.confirmButton}
                                onClick={() => {
                                    setOpen(false);

                                }}
                            >Ok</button>
                            :
                            <>
                                <button
                                    className={classes.cancelButton}
                                    onClick={() => setOpen(false)}
                                >
                                    Cancel
                                </button>
                                <button
                                    className={classes.confirmButton}
                                    onClick={() => {
                                        handleDelete();
                                        setOpen(false);
                                    }}
                                >
                                    Confirm
                                </button>
                            </>
                        }

                    </div>
                </div>
            </div>
        </Modal>
    );
};


const styles = () => ({
    modal: {
        position: 'absolute',
        left: '50%',
        top: '50%',
        transform: 'translate(-50%, -50%)',
    },
    modalContent: {
        height: '213px',
        width: '573px',
        backgroundColor: '#782424',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
    },
    modalHeading: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        textAlign: 'center',
        color: '#FFFFFF',
        fontFamily: "Open Sans",
        fontSize: '14px',
        fontWeight: '400',
        lineHeight: '16.8px',
    },
    modalButtons: {
        display: 'flex',
        flexDirection: 'row',
        gap: '14px',
        flex: '0 0 auto',
        paddingTop: '30px',

        '& button': {
            fontFamily: 'Poppins',
            fontSize: '12px',
            fontWeight: '600',
            lineHeight: '16px',
            textAlign: 'center',
            width: '97px',
            height: '41px',
            borderRadius: '5px',
            border: '1.5px solid #FFFFFF',
            color: '#FFFFFF',
            '&:hover': {
                cursor: 'pointer',
            },
        },
    },
    cancelButton: {
        backgroundColor: '#4F5D69',
        '&:hover': {
            backgroundColor: '#374149',
        },
    },
    confirmButton: {
        backgroundColor: '#0C534C',
        '&:hover': {
            backgroundColor: '#003B35',
        },
    },

});

export default withStyles(styles, { withTheme: true })(DeleteConfirmationModal);