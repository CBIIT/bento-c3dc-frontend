import React, { useEffect, useContext } from 'react';
import Alert from '@material-ui/lab/Alert';
import { CohortModalContext } from '../CohortModalContext.js';

const AlertManager = ({ classes }) => {
    const { alert, clearAlert } = useContext(CohortModalContext);

    useEffect(() => {
        if (alert.message) {
            const timer = setTimeout(() => {
                clearAlert();
            }, 2500);

            return () => clearTimeout(timer);
        }
    }, [alert, clearAlert]);

    if (!alert.message) {
        return null;
    }

    return (
        <Alert 
            severity={alert.type} 
            className={classes.alert} 
            onClose={clearAlert}
        >
            {alert.message}
        </Alert>
    );
};

export default AlertManager;