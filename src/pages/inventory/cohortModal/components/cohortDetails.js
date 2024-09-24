import React, { useState } from 'react';
import { withStyles, Button } from '@material-ui/core';
import DEFAULT_CONFIG from '../config';
import EditIcon from '../../../../assets/icons/Edit_Icon.svg';
import SearchIcon from '../../../../assets/icons/Search_Icon.svg';
import TrashCanIconBlue from '../../../../assets/icons/Trash_Can_Icon_Blue.svg';
import TrashCanIconRed from '../../../../assets/icons/Trash_Can_Icon_Red.svg';
import ExpandMoreIcon from '../../../../assets/icons/Expand_More_Icon.svg';
import SortingIcon from '../../../../assets/icons/Sorting_Icon.svg';

/**
 * A list of cohorts to select from and manage.
 */

const CohortDetails = (props) => {
    const {
        classes,
        config,
        activeCohort,
        closeModal,
        handleSaveCohort,
    } = props;

    console.log('find-me active: ', activeCohort);
    if (!activeCohort) {
        return null;
    }

    const [selectedColumn, setSelectedColumn] = useState(['participant_id', 'ascending']);

    const handleSort = (column) => {
        if (selectedColumn[0] === column) {
            setSelectedColumn([column, selectedColumn[1] === 'ascending' ? 'descending' : 'ascending']);
        } else {
            setSelectedColumn([column, 'ascending']);
        }
    };

    let localCohort = {
        cohortName: activeCohort.cohortName,
        cohortId: activeCohort.cohortId,
        cohortDescription: activeCohort.cohortDescription,
        participants: JSON.parse(JSON.stringify(activeCohort.participants)),
    }
    /*
    localCohort.participants.push({
        participant_pk: "1",
        participant_id: '123',
        dbgap_accession: '1234',
    });
*/

    localCohort.participants.sort((a, b) => {
        // Dynamic sorting by selectedColumn
        const primaryComparison = selectedColumn[1] === 'ascending'
            ? a[selectedColumn[0]].localeCompare(b[selectedColumn[0]])
            : b[selectedColumn[0]].localeCompare(a[selectedColumn[0]]);

        if (primaryComparison !== 0) return primaryComparison;

        // Tiebreaker based on another column, assume dbgap_accession for example
        const secondaryComparison = a.dbgap_accession.localeCompare(b.dbgap_accession);
        if (secondaryComparison !== 0) return secondaryComparison;

        // Final tiebreaker based on participant_pk
        return a.participant_pk.localeCompare(b.participant_pk);
    });



    console.log('find-me local: ', localCohort);

    const datePrefix = config && config.datePrefix && typeof config.datePrefix === 'string'
        ? config.datePrefix
        : DEFAULT_CONFIG.config.cohortDetails.datePrefix;

    return (
        <div className={classes.cohortDetailsSection}>
            <div className={classes.cohortHeading}>
                <span className={classes.cohortHeader}>
                    <span className={classes.cohortLabel}>
                        Cohort ID:
                    </span>
                    <span className={classes.cohortTitle}>
                        &nbsp;{activeCohort.cohortName}
                        <img
                            src={EditIcon}
                            alt="edit cohort name icon"
                            className={classes.editIcon}
                        />
                    </span>
                </span>
                <span className={classes.cohortItemCounts}>
                    PARTICIPANT IDs ({activeCohort.participants.length})
                </span>
            </div>
            <div className={classes.cohortDescription}>
                {activeCohort.cohortDescription}
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
                        <div
                            onClick={() => handleSort('participant_id')}
                            className={classes.headerColumn}

                        >
                            <span >Participant ID</span>
                            <img
                                src={SortingIcon}
                                alt="sort by participant id icon"
                                className={classes.sortingIcon + ' ' + (selectedColumn[0] === 'participant_id' ? classes.selectedColumn : '') + ' ' + (selectedColumn[1] === 'descending' ? classes.descendingColumn : '')}
                            />
                        </div>
                        <div
                            onClick={() => handleSort('dbgap_accession')}
                            className={classes.headerColumn}
                        >
                            <span >dbGaP Accession</span>
                            <img
                                src={SortingIcon}
                                alt="sort by participant id icon"
                                className={classes.sortingIcon + ' ' + (selectedColumn[0] === 'dbgap_accession' ? classes.selectedColumn : '') + ' ' + (selectedColumn[1] === 'descending' ? classes.descendingColumn : '')}
                            />
                        </div>
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
                        {localCohort.participants.length > 0 ? localCohort.participants.map((participant) => (
                            <div key={participant.participant_pk} className={classes.tableRow}>
                                <div>{participant.participant_id}</div>
                                <div>{participant.dbgap_accession}</div>
                                <div className={classes.removeParticipant}>
                                    <img
                                        src={TrashCanIconBlue}
                                        alt="delete participant icon"
                                        className={classes.blueTrashCan}
                                    />
                                </div>
                            </div>
                        )):
                        <div className={classes.emptyTable}>
                            No Data
                        </div>
                        }
                    </div>
                </div>
                <div className={classes.cohortButtonSection}>
                    <Button variant="contained" className={classes.cancelButton} onClick={closeModal}>
                        Cancel
                    </Button>
                    <Button variant="contained" className={classes.saveButton} onClick={() => handleSaveCohort(localCohort)}>
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
                    {datePrefix} {(new Date(activeCohort.lastUpdated)).toLocaleDateString('en-US')}
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
        maxWidth: '521px',
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
    headerColumn: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'start',
    },
    sortingIcon: {
        height: '14px',
        paddingLeft: '6px',
        '&:hover': {
            cursor: 'pointer',
        },
        //not visible by default
        visibility: 'hidden',

    },
    selectedColumn: {
        visibility: 'visible',
    },
    descendingColumn: {
        transform: 'rotate(180deg)',
        paddingLeft: '0px',
        paddingRight: '6px',
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
    emptyTable: {
        height: '100%',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
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