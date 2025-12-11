import React, { useState, useEffect } from 'react';
import { Modal, withStyles } from '@material-ui/core';

const NavigateAwayModal = (props) => {
    const { classes, open, setOpen, onConfirm } = props;
    const [doNotShowAgain, setDoNotShowAgain] = useState(false);

    useEffect(() => {
        if (open) {
            setDoNotShowAgain(false); // reset checkbox each time modal opens
        }
    }, [open]);

    const handleConfirm = () => {
        if (doNotShowAgain) {
            localStorage.setItem('hideNavigateModal', 'true');
        }
        onConfirm();
        setOpen(false);
    };

    return (
        <Modal open={open} onClose={() => setOpen(false)}>
            <div className={classes.modal}>
                <div className={classes.modalContent}>
                    <div className={classes.modalHeading}>
                        You are about to leave this page and continue your analysis of selections
                        in a pre-filtered Explore Dashboard. Press cancel or confirm.
                    </div>

                    <div className={classes.checkboxRow}>
                        <input
                            type="checkbox"
                            id="doNotShow"
                            checked={doNotShowAgain}
                            onChange={(e) => setDoNotShowAgain(e.target.checked)}
                        />
                        <label htmlFor="doNotShow">Do not show this notice in future</label>
                    </div>

                    <div className={classes.modalButtons}>
                        <button className={classes.cancelButton} onClick={() => setOpen(false)}>
                            Cancel
                        </button>
                        <button className={classes.confirmButton} onClick={handleConfirm}>
                            Confirm
                        </button>
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
        height: 'auto',
        width: '573px',
        backgroundColor: '#FFFFFF',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0px 4px 20px rgba(0,0,0,0.1)',
    },
    modalHeading: {
        color: '#333333',
        fontFamily: 'Open Sans',
        fontSize: '14px',
        fontWeight: '400',
        lineHeight: '20px',
        textAlign: 'center',
        paddingBottom: '20px',
    },
    checkboxRow: {
        display: 'flex',
        alignItems: 'center',
        fontSize: '13px',
        color: '#333333',
        gap: '10px',
        paddingBottom: '20px',
    },
    modalButtons: {
        display: 'flex',
        flexDirection: 'row',
        gap: '14px',

        '& button': {
            fontFamily: 'Poppins',
            fontSize: '12px',
            fontWeight: '600',
            lineHeight: '16px',
            width: '97px',
            height: '41px',
            borderRadius: '5px',
            border: '1.5px solid #4F5D69',
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

export default withStyles(styles, { withTheme: true })(NavigateAwayModal);
