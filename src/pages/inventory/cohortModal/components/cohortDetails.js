import React from 'react';
import { withStyles, Button } from '@material-ui/core';
import DEFAULT_CONFIG from '../config';
import EditIcon from '../../../../assets/icons/Edit_Icon.svg';
import SearchIcon from '../../../../assets/icons/Search_Icon.svg';
import TrashCanIconBlue from '../../../../assets/icons/Trash_Can_Icon_Blue.svg';
import TrashCanIconRed from '../../../../assets/icons/Trash_Can_Icon_Red.svg';
import ExpandMoreIcon from '../../../../assets/icons/Expand_More_Icon.svg';

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

    const tempList = [
        {
            participantId: '1562165123652165216521',
            dbgap_accession: 'phs0000001',
            pkey: 1,
        },
        {
            participantId: 2,
            dbgap_accession: 'phs0000001',
            pkey: 2,
        },
        {
            participantId: 3,
            dbgap_accession: 'phs0000001',
            pkey: 3,
        },
        {
            participantId: 1,
            dbgap_accession: 'phs0000002',
            pkey: 4,
        },
        {
            participantId: 2,
            dbgap_accession: 'phs0000002',
            pkey: 5,
        },
        {
            participantId: 3,
            dbgap_accession: 'phs0000003',
            pkey: 6,
        },
        {
            participantId: 1,
            dbgap_accession: 'phs0000003',
            pkey: 7,
        },
        {
            participantId: 2,
            dbgap_accession: 'phs0000003',
            pkey: 8,
        },
        {
            participantId: 3,
            dbgap_accession: 'phs0000003',
            pkey: 6,
        },
        {
            participantId: 1,
            dbgap_accession: 'phs0000003',
            pkey: 7,
        },
        {
            participantId: 2,
            dbgap_accession: 'phs0000003',
            pkey: 8,
        },

    ];

    return (
        <div className={classes.cohortDetailsSection}>
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
                <div className={classes.participantTableSection}>
                    <div className={classes.participantTableHeader}>
                        <div>Participant ID</div>
                        <div>dbGaP Accession</div>
                        <div className={classes.removeHeader}>
                            <span className={classes.removeLabel}>Remove</span>
                            <img
                                src={TrashCanIconRed}
                                alt="delete cohort icon"
                                className={classes.redTrashCan}
                            />
                        </div>
                    </div>
                    <div className={classes.tableBody}>
                        {tempList.map((participant) => (
                            <div key={participant.pkey} className={classes.tableRow}>
                                <div>{participant.participantId}</div>
                                <div>{participant.dbgap_accession}</div>
                                <div className={classes.removeParticipant}>
                                    <img
                                        src={TrashCanIconBlue}
                                        alt="delete participant icon"
                                        className={classes.blueTrashCan}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className={classes.cohortButtonSection}>
                    <Button variant="contained" className={classes.cancelButton}>
                        Cancel
                    </Button>
                    <Button variant="contained" className={classes.saveButton}>
                        Save Changes
                    </Button>
                    <Button variant="contained" className={classes.downloadButton} >
                        <div className={classes.downloadButtonText}>
                            <span>
                                Download
                            </span>
                            <span>
                                Selected Cohorts
                            </span>
                        </div>

                        <img
                            src={ExpandMoreIcon}
                            alt="expand download icon"
                            className={classes.expandMoreIcon}
                        />
                    </Button>
                </div>
                <span className={classes.cohortLastUpdated}>
                    {datePrefix} 6/4/2024
                </span>
            </div>
        </div>
    );
};

/**
 * Default styles for the component.
 */

const styles = () => ({
    cohortDetailsSection: {
        flexGrow: 55,
        flexBasis: '0%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'normal',
        //width: '55%',
        //width: '55.191%',
        //height: '87.030%',
        //maxWidth: '521px',
        height: '50%',
        minHeight: '435px',
        width: '100%',
        minWidth: '275px',
        maxHeight: '718px',
        border: '1px solid #3388A6',
        borderRadius: '10px',
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
        maxHeight: '100px',
        color: '#343434',
        padding: '10px 25px 16px 23px',
    },
    participantViewer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: '#F1F3F4',
        width: '100%',
        borderRadius: '8px',
        height: '100%',
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
    participantTableSection: {
        width: '92%',
        height: '75%',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#FFFFFF',
        borderTop: '2px solid #8A7F7C',
        borderBottom: '1px solid #909090',
    },
    redTrashCan: {
        height: '18px',
        paddingTop: '2px',
        '&:hover': {
            cursor: 'pointer',
        },
        paddingRight: '10px',
    },
    blueTrashCan: {
        height: '20px',
        paddingTop: '2px',
        '&:hover': {
            cursor: 'pointer',
        },
    },
    removeParticipant: {
        //right align the trash can icon
        textAlign: 'right',
        justifyContent: 'end !important',
        paddingRight: '8px !important',
        width: '100px',
        flexGrow: '0 !important',
        flexShrink: '0 !important',
        flexBasis: '100px !important',
    },
    participantTableHeader: {
        display: 'flex',
        backgroundColor: '#FFFFFF',
        borderBottom: '1px solid #909090',
        padding: '10px 20px',
        '& div': {
            flexBasis: '0',
            flexGrow: 1,
            fontWeight: 600,
            textAlign: 'left',
        },
    },
    removeLabel: {
        paddingRight: '10px',
    },
    removeHeader: {
        display: 'flex',
        justifyContent: 'end',  // Aligns "Remove" text to the left and icon to the right
        alignItems: 'center',             // Centers both elements vertically
        width: '100px',
        flexGrow: '0 !important',
        color: '#A61401'
    },
    tableBody: {
        overflowY: 'auto',
        //height: '100%',
        flexBasis: '336px',
        flexGrow: '0',
        flexShrink: '1',
        backgroundColor: '#F1F3F4',
        '&::-webkit-scrollbar': {
            width: '6px', // Width of the scrollbar
        },
        '&::-webkit-scrollbar-track': {
            background: '#CECECE', // Track color
        },
        '&::-webkit-scrollbar-thumb': {
            backgroundColor: '#003F74', // Thumb color
        },
    },
    tableRow: {
        display: 'flex',
        flexDirection: 'row',
        backgroundColor: '#F1F3F4',
        padding: '0px 20px',
        width: '100%',
        minHeight: '42px',
        '& div': {
            flexBasis: '0',
            flexGrow: 1,
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',             
            justifyContent: 'start',
            padding: '0px 10px',
            wordWrap: 'break-word',
            wordBreak: 'break-all',
            whiteSpace: 'normal',
        },
        '&:nth-child(odd)': {
            backgroundColor: '#D9DFE6',
        },
        '&:nth-child(even)': {
            backgroundColor: '#F8F8F8',
        },
    },
    cohortButtonSection: {
        display: 'flex',
        justifyContent: 'space-between',
        padding: '40px 20px 10px 20px',
        width: '100%',
        gap: '8px',

        '& button': {
            height: '41px',
            fontFamily: 'Poppins',
            fontSize: '12px',
            fontWeight: '600',
            lineHeight: '16px',
            color: '#FFFFFF',
            borderRadius: '5px',
            

        },
    },
    cancelButton: {
        backgroundColor: '#4F5D69',
        border: '1.25px solid #CACACA',
        width: '137px',
        '&:hover': {
            backgroundColor: '#374149',
        },

    },
    saveButton: {
        backgroundColor: '#2A6E93',
        border: '1.25px solid #73A9C7',
        width: '137px',
        //on hover do an overlay effect
        '&:hover': {
            backgroundColor: '#1d4d67',
        },

    },
    downloadButton: {
        backgroundColor: '#0C534C',
        border: '1.25px solid #73A9C7',
        width: '189px',
        display: 'flex',
        justifyContent: 'space-between',
        lineHeight: '13px !important',
        '&:hover': {
            backgroundColor: '#003B35',
        },
    },
    downloadButtonText: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'start !important',

        
    },
    cohortLastUpdated: {
        width: '100%',
        fontSize: 10,
        color: '#3A7A81',
        fontFamily: 'Lato',
        textAlign: 'left',
        lineHeight: '22px',
        paddingLeft: '20px',
        paddingBottom: '10px',
    },
});

export default withStyles(styles, { withTheme: true })(CohortDetails);