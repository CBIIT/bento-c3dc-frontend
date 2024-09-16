import React from 'react';
import { withStyles } from '@material-ui/core';
import DEFAULT_CONFIG from '../config';
import EditIcon from '../../../../assets/icons/Edit_Icon.svg';
import SearchIcon from '../../../../assets/icons/Search_Icon.svg';
import TrashCanIconBlue from '../../../../assets/icons/Trash_Can_Icon_Blue.svg';
import TrashCanIconRed from '../../../../assets/icons/Trash_Can_Icon_Red.svg';

/**
 * A list of cohorts to select from and manage.
 */

const CohortDetails = (props) => {
    const {
        classes,
        config,
    } = props;

    const datePrefix = config && config.datePrefix && typeof config.datePrefix === 'string'
        ? config.datePrefix
        : DEFAULT_CONFIG.config.cohortDetails.datePrefix;

    return (
        <div className={classes.cohortDetailsSection}>
            <div className={classes.cohortDetails}>
                <div className={classes.cohortHeading}>
                    <span className={classes.cohortHeader}>
                        <span className={classes.cohortLabel}>
                            Cohort ID:
                        </span>
                        <span className={classes.cohortTitle}>
                            &nbsp;{'Lorem123124134134'}
                            <img
                                src={EditIcon}
                                alt="edit cohort name icon"
                                className={classes.editIcon}
                            />
                        </span>
                    </span>
                    <span className={classes.cohortItemCounts}>
                        PARTICIPANT IDs (4)
                    </span>
                </div>
                <div className={classes.cohortDescription}>
                    Lorem ipsum odor amet, consectetuer adipiscing elit. Augue viverra elem en tum interdum taciti nam ac integer pellentesque himenaeos. Augue viverra elem en tum interdum taciti nam ac integer pellentesque himenaeos.
                    <img
                        src={EditIcon}
                        alt="edit cohort description icon"
                        className={classes.editIcon}
                    />
                </div>
                <div className={classes.participantViewer}>
                    <div className={classes.participantSearchBarSection}>
                        <input
                            type="text"
                            placeholder="Search Participant ID here"
                            className={classes.participantSearchBar}
                        />
                        <span className={classes.searchIcon}>
                            <img
                                src={SearchIcon}
                                alt="search icon"
                            />
                        </span>
                    </div>
                    <div>

                    </div>
                </div>
            </div>
            <span className={classes.cohortLastUpdated}>
                {datePrefix} 6/4/2024
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
        //width: '55%',
        //width: '55.191%',
        //height: '87.030%',
        //maxWidth: '521px',
        flexGrow: 55,
        flexBasis: '0%',
        minWidth: '275px',
        minHeight: '435px',
        alignItems: 'normal',
    },
    cohortDetails: {
        //width: '521px',
        //height: '718px',
        border: '1px solid #3388A6',
        borderRadius: '10px',
        width: '100%',
        height: '100%',
        overflow: 'hidden',
    },
    cohortHeading: {
        display: 'flex',
        justifyContent: 'space-between',
        padding: '17px 23px 0px 23px',
    },
    cohortLabel: {
        fontFamily: 'Poppins',
        fontSize: '18px',
        fontWeight: '300',
        lineHeight: '20px',
        letterspacing: '-0.5%',
        color: '#3A555E',
    },
    cohortTitle: {
        fontFamily: 'Poppins',
        fontSize: '18px',
        fontWeight: '500',
        lineHeight: '20px',
        letterspacing: '-0.5%',
        color: '#3A555E',
    },
    editIcon: {
        height: '13px',
        paddingLeft: '8px',
        '&:hover': {
            cursor: 'pointer',
        },
    },
    cohortItemCounts: {
        fontFamily: 'Poppins',
        fontSize: '11px',
        fontWeight: '600',
        lineHeight: '26px',
        color: '#385C66',
    },
    cohortDescription: {
        fontFamily: 'Open Sans',
        fontSize: '13px',
        fontWeight: '400',
        lineHeight: '18px',
        color: '#343434',
        padding: '10px 25px 16px 23px',
    },
    participantViewer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: '#F1F3F4',
        height: '100%',
        width: '100%',
        borderRadius: '8px',
    },
    participantSearchBarSection: {
        display: 'flex',
        justifyContent: 'center',
        borderRadius: '8px',
        border: '1px solid #8B98AF',
        width: '82%',
        height: '31px',
        marginTop: '10px',
        marginBottom: '12px',
        backgroundColor: '#FFFFFF',
        '&:focus-within': {
            border: '1px solid #007BFF',
        },
        
    },
    participantSearchBar: {
        width: '100%',
        height: '100%',
        border: 'none',
        borderRadius: '8px',
        margin: '0px',
        padding: '0px',
        position: 'relative',
        outline: 'none',
        paddingLeft: '17px',
        fontFamily: 'Poppins',
        fontSize: '15px',
        fontWeight: '400',
        lineHeight: '26px',
        color: '#5D7B87',

        '&::placeholder': { 
            color: '#5D7B87',
            fontWeight: '300',
        },
    },
    searchIcon: {
        height: '100%',
        width: '14px',
        marginRight: '8px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: '1px',
        '&:hover': {
            cursor: 'pointer',
        },
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