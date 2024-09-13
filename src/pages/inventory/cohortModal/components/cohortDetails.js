import React from 'react';
import { withStyles } from '@material-ui/core';

/**
 * A list of cohorts to select from and manage.
 */

const CohortDetails = (props) => {
    const {
        classes,
    } = props;

    return (
        <div className={classes.cohortDetailsSection}>
            <div className={classes.cohortDetails}>
            </div>
            <span className={classes.cohortLastUpdated}>
                LAST UPDATED: 6/4/2024
            </span>
        </div>
    );
};

/**
 * Default styles for the component.
 */

const styles = () => ({
    cohortDetailsSection: {
        display: 'flex',
        flexDirection: 'column',
        width: '55.191%',
        height: '87.030%',
        //minWidth: '275px',
        //minHeight: '435px',
      },
      cohortDetails:{
        //width: '521px',
        //height: '718px',
        border: '1px solid #3388A6',
        borderRadius: '10px',
        width: '100%',
        height: '100%',
      },
      cohortLastUpdated: {
        width: '100%',
        fontSize: 10,
        color: '#3A7A81',
        fontFamily: 'Lato',
        textAlign: 'left',
        lineHeight: '22px',
        paddingLeft: '10px',
      },
});

export default withStyles(styles, { withTheme: true })(CohortDetails);