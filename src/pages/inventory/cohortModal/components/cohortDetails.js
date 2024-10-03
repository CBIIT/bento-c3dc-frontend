import React, { useState, useEffect, useRef } from 'react';
import { withStyles, Button } from '@material-ui/core';
import DEFAULT_CONFIG from '../config';
import EditIcon from '../../../../assets/icons/Edit_Icon.svg';
import SearchIcon from '../../../../assets/icons/Search_Icon.svg';
import TrashCanIconBlue from '../../../../assets/icons/Trash_Can_Icon_Blue.svg';
import TrashCanIconRed from '../../../../assets/icons/Trash_Can_Icon_Red.svg';
import ExpandMoreIcon from '../../../../assets/icons/Expand_More_Icon.svg';
import SortingIcon from '../../../../assets/icons/Sorting_Icon.svg';
import DeleteConfirmationModal from './deleteConfirmationModal';
import { deletionTypes } from './deleteConfirmationModal';

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
        downloadCohortManifest,
        downloadCohortMetadata,
        deleteConfirmationClasses,
    } = props;

    if (!activeCohort) {
        return null;
    }

    const [selectedColumn, setSelectedColumn] = useState(['participant_id', 'ascending']);
    const [searchText, setSearchText] = useState('');

    const [localCohort, setLocalCohort] = useState({
        cohortId: activeCohort.cohortId,
        cohortName: activeCohort.cohortName,
        cohortDescription: activeCohort.cohortDescription,
        participants: JSON.parse(JSON.stringify(activeCohort.participants)),
    });
    const [isEditingName, setIsEditingName] = useState(false);
    const [isEditingDescription, setIsEditingDescription] = useState(false);
    const [showDownloadDropdown, setShowDownloadDropdown] = useState(false);
    const [isScrollbarActive, setIsScrollbarActive] = useState(false); // State to check if scrollbar is active

    const scrollContainerRef = useRef(null);
    const dropdownRef = useRef(null);


    useEffect(() => {
        if (scrollContainerRef.current) {
            const { scrollHeight, clientHeight } = scrollContainerRef.current;
            setIsScrollbarActive(scrollHeight > clientHeight); // Check if scrollbar is active
        }
    }, []);

    useEffect(() => {
        if (showDownloadDropdown) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [showDownloadDropdown]);

    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setShowDownloadDropdown(false); // Close the dropdown when clicking outside
        }
    };

    const handleEditName = () => {
        setIsEditingName(true);
    };

    const handleEditDescription = () => {
        setIsEditingDescription(true);
    };

    const handleSaveName = () => {
        setIsEditingName(false);
    };

    const handleSaveDescription = () => {
        setIsEditingDescription(false);
    };

    const handleDownloadDropdown = () => {
        setShowDownloadDropdown(!showDownloadDropdown);
    };

    const handleTextChange = (e) => {
        setLocalCohort({
            ...localCohort,
            [e.target.name]: e.target.value,
        });
    };

    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
    const [deleteModalProps, setDeleteModalProps] = useState({
        handleDelete: () => { },
        deletionType: "",
    });

    const handleSort = (column) => {
        if (selectedColumn[0] === column) {
            setSelectedColumn([column, selectedColumn[1] === 'ascending' ? 'descending' : 'ascending']);
        } else {
            setSelectedColumn([column, 'ascending']);
        }
    };

    const handleDeleteParticipant = (participant_pk) => {
        setLocalCohort({
            ...localCohort,
            participants: localCohort.participants.filter(participant => participant.participant_pk !== participant_pk),
        });
    };

    const handleDeleteAllParticipants = () => {
        setLocalCohort({
            ...localCohort,
            participants: [],
        });
    };

    localCohort.participants.sort((a, b) => {
        const primaryComparison = selectedColumn[1] === 'ascending'
            ? a[selectedColumn[0]].localeCompare(b[selectedColumn[0]])
            : b[selectedColumn[0]].localeCompare(a[selectedColumn[0]]);

        if (primaryComparison !== 0) return primaryComparison;

        const secondaryComparison = a.dbgap_accession.localeCompare(b.dbgap_accession);
        if (secondaryComparison !== 0) return secondaryComparison;

        return a.participant_pk.localeCompare(b.participant_pk);
    });

    const filteredParticipants = searchText !== '' ? localCohort.participants.filter(participant =>
        participant.participant_id.includes(searchText)
    ) : localCohort.participants;

    const datePrefix = config && config.datePrefix && typeof config.datePrefix === 'string'
        ? config.datePrefix
        : DEFAULT_CONFIG.config.cohortDetails.datePrefix;

    const cohortHeaderLabel = config && config.cohortHeaderLabel && typeof config.cohortHeaderLabel === 'string'
        ? config.cohortHeaderLabel
        : DEFAULT_CONFIG.config.cohortDetails.cohortHeaderLabel;

    const cohortCountsLabel = config && config.cohortCountsLabel && typeof config.cohortCountsLabel === 'string'
        ? config.cohortCountsLabel
        : DEFAULT_CONFIG.config.cohortDetails.cohortCountsLabel;

    return (
        <>
            <DeleteConfirmationModal
                classes={deleteConfirmationClasses}
                open={showDeleteConfirmation}
                setOpen={setShowDeleteConfirmation}
                handleDelete={deleteModalProps.handleDelete}
                deletionType={deleteModalProps.deletionType}
            />
            <div className={classes.cohortDetailsSection}>
                <div className={classes.cohortHeading}>
                    <span className={classes.cohortHeader}>
                        <span className={classes.cohortLabel}>
                            {cohortHeaderLabel}
                        </span>
                        <span className={classes.cohortTitle}>
                            &nbsp;
                            {isEditingName ? (
                                <input
                                className={classes.editingCohortName}
                                type="text"
                                name="cohortName"
                                value={localCohort['cohortName']}
                                onBlur={handleSaveName}
                                onChange={(e) => handleTextChange(e)}
                                maxLength={20}
                                autoFocus
                                />
                            ) : (
                                <span>{localCohort['cohortName']}</span>
                            )}
                            <img
                                src={EditIcon}
                                alt="edit cohort name icon"
                                className={classes.editIcon}
                                onClick={handleEditName}
                            />
                        </span>
                    </span>
                    <span className={classes.cohortItemCounts}>
                        {cohortCountsLabel} ({localCohort.participants.length})
                    </span>
                </div>
                <div className={classes.cohortDescription}>
                    {isEditingDescription ? (
                        <textarea
                        className={classes.editingCohortDescription}
                        value={localCohort['cohortDescription']}
                        onBlur={handleSaveDescription}
                        name="cohortDescription"
                        onChange={(e) => handleTextChange(e)}
                        rows={2}
                        maxLength={250}
                        placeholder="Enter cohort description..."
                        autoFocus
                        />
                    ) : (
                        <span>{localCohort['cohortDescription']}</span>
                    )}
                    <img
                        src={EditIcon}
                        alt="edit cohort description icon"
                        className={classes.editIcon}
                        onClick={handleEditDescription}
                    />
                </div>
                <div className={classes.participantViewer}>
                    <div className={classes.participantSearchBarSection}>
                        <input
                            type="text"
                            placeholder="Search Participant ID here"
                            className={classes.participantSearchBar}
                            value={searchText}
                            onChange={(e) => setSearchText(e.target.value)}
                        />
                        <span className={classes.searchIcon}>
                            <img
                                src={SearchIcon}
                                alt="search icon"
                            />
                        </span>
                    </div>
                    <div className={classes.participantTableSection}>
                        <div className={classes.participantTableHeader + (isScrollbarActive ? ' ' + classes.participantTableHeaderScrollPadding : '')}>
                            <div
                                onClick={() => handleSort('participant_id')}
                                className={classes.headerColumn}

                            >
                                <span >Participant Id</span>
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
                            <div className={classes.removeHeader} onClick={() => {
                                        setDeleteModalProps({
                                            handleDelete: () => handleDeleteAllParticipants(),
                                            deletionType: deletionTypes.DELETE_ALL_PARTICIPANTS,
                                        });
                                        setShowDeleteConfirmation(true)
                                    }}>
                                <span className={classes.removeLabel}>Remove</span>
                                <img
                                    src={TrashCanIconRed}
                                    alt="delete cohort icon"
                                    className={classes.redTrashCan}
                                />
                            </div>
                        </div>
                        <div
                            className={classes.tableBody}
                            ref={scrollContainerRef}
                        >
                            {filteredParticipants.length > 0 ? filteredParticipants.map((participant) => (
                                <div key={participant.participant_pk} className={classes.tableRow}>
                                    <div>{participant.participant_id}</div>
                                    <div>{participant.dbgap_accession}</div>
                                    <div className={classes.removeParticipant}>
                                        <img
                                            src={TrashCanIconBlue}
                                            alt="delete participant icon"
                                            className={classes.blueTrashCan}
                                            onClick={() => handleDeleteParticipant(participant.participant_pk)}
                                        />
                                    </div>
                                </div>
                            )) :
                                <div className={classes.emptyTable}>
                                    {localCohort.participants.length === 0 ? 'No Data' : 'No matching Participant Id'}
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
                        <div className={classes.dropdownSection} ref={dropdownRef}>
                            <Button
                                variant="contained"
                                className={showDownloadDropdown ? classes.downloadButtonOpened : classes.downloadButton}
                                onClick={handleDownloadDropdown}
                            >
                                <div className={classes.downloadButtonText}>
                                    <span>Download</span>
                                    <span>Selected Cohorts</span>
                                </div>
                                <img
                                    src={ExpandMoreIcon}
                                    alt="expand download icon"
                                    className={`${classes.expandMoreIcon} ${showDownloadDropdown ? classes.rotatedIcon : ''}`}
                                />
                            </Button>
                            {showDownloadDropdown && (
                                <div className={classes.dropdownMenu}>
                                    <div
                                        className={classes.dropdownItem + ' ' + classes.firstDropdownItem}
                                        onClick={downloadCohortManifest}
                                    >
                                        Manifest CSV
                                    </div>
                                    <div
                                        className={classes.dropdownItem}
                                        onClick={downloadCohortMetadata}
                                    >
                                        Metadata JSON
                                    </div>
                                </div>
                            )}
                        </div>

                    </div>
                    <span className={classes.cohortLastUpdated}>
                        {datePrefix} {(new Date(activeCohort.lastUpdated)).toLocaleDateString('en-US')}
                    </span>
                </div>
            </div>
        </>
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
        //maxHeight: '718px',
        border: '1px solid #3388A6',
        borderRadius: '10px',
    },

    cohortHeading: {
        display: 'flex',
        justifyContent: 'space-between',
        padding: '17px 23px 0px 23px',
    },
    cohortHeader: {
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'normal',
        overflowWrap: 'break-word',
        width: '{100% - 130px}',
    },
    cohortLabel: {
        fontFamily: 'Poppins',
        fontSize: '18px',
        fontWeight: '300',
        lineHeight: '20px',
        letterspacing: '-0.5%',
        color: '#3A555E',
        whiteSpace: 'nowrap',
    },
    cohortTitle: {
        fontFamily: 'Poppins',
        fontSize: '18px',
        fontWeight: '500',
        lineHeight: '20px',
        letterspacing: '-0.5%',
        color: '#3A555E',
    },
    editingCohortName: {
        fontFamily: 'Poppins',
        fontSize: '18px',
        fontWeight: '500',
        lineHeight: '20px',
        letterspacing: '-0.5%',
        color: '#3A555E',
        height: '25px',
        padding: '0px',
        margin: '0px',
        outline: 'none',
        border: '1px solid #8B98AF',
        '&:focus-within': {
            padding: '0px',
            margin: '0px',
        },
        boxSize: 'border-box',
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
        flex: '0 0 130px',
    },
    cohortDescription: {
        fontFamily: 'Open Sans',
        fontSize: '13px',
        fontWeight: '400',
        lineHeight: '18px',
        maxHeight: '100px',
        color: '#343434',
        padding: '10px 25px 0px 23px',
        overflowWrap: 'break-word',
        whiteSpace: 'normal',
    },
    editingCohortDescription: {
        fontFamily: 'Open Sans',
        fontSize: '13px',
        fontWeight: '400',
        lineHeight: '20px',
        maxHeight: '45px',
        color: '#343434',
        padding: '0px',
        margin: '0px',
        border: '1px solid #8B98AF',
        outline: 'none',
        width: '90%',
        resize: 'none',
        '&:focus-within': {
            padding: '0px',
            margin: '0px',
        },
        boxSize: 'border-box !important',
    },
    participantViewer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: '#F1F3F4',
        width: '100%',
        height: '100%',
        borderTopLeftRadius: '8px',
        borderTopRightRadius: '8px',
        borderBottomLeftRadius: '10px',
        borderBottomRightRadius: '10px',
        marginTop: '16px',
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
        paddingLeft: '25px',
        cursor: 'pointer',
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
        paddingRight: '15px',
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
        paddingRight: '15px !important',
        width: '100px',
        flex: '0 0 95px !important',
    },
    participantTableHeader: {
        display: 'flex',
        backgroundColor: '#FFFFFF',
        borderBottom: '1px solid #909090',
        padding: '10px 0px',
        '& div': {
            flexBasis: '0',
            flexGrow: 1,
            fontWeight: 600,
            textAlign: 'left',
        },
    },
    participantTableHeaderScrollPadding: {
        paddingRight: '6px;', //matches scrollbar width
    },
    removeLabel: {
        paddingRight: '10px',
    },
    removeHeader: {
        display: 'flex',
        justifyContent: 'end',
        alignItems: 'center',
        width: '100px',
        color: '#A61401',
        flex: '0 0 95px !important',
        cursor: 'pointer',
    },
    tableBody: {
        overflowY: 'auto',
        flexBasis: '336px',
        display: 'flex',
        flexDirection: 'column',
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
        width: '100%',
        minHeight: '42px',
        '& div': {
            flexBasis: '0',
            flexGrow: 1,
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'start',
            wordWrap: 'break-word',
            wordBreak: 'break-all',
            whiteSpace: 'normal',
            paddingLeft: '25px',
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
        },
    },
    cancelButton: {
        backgroundColor: '#4F5D69',
        border: '1.25px solid #CACACA',
        width: '137px',
        borderRadius: '5px',
        boxShadow: 'none',

        '&:hover': {
            backgroundColor: '#374149',
            boxShadow: 'none',
        },

    },
    saveButton: {
        backgroundColor: '#2A6E93',
        border: '1.25px solid #73A9C7',
        width: '137px',
        borderRadius: '5px',
        boxShadow: 'none',

        '&:hover': {
            backgroundColor: '#1d4d67',
            boxShadow: 'none',
        },

    },
    downloadButton: {
        backgroundColor: '#0C534C',
        border: '1.25px solid #73A9C7',
        width: '189px',
        borderRadius: '5px',
        display: 'flex',
        justifyContent: 'space-between',
        lineHeight: '13px !important',
        boxShadow: 'none',

        '&:hover': {
            backgroundColor: '#003B35',
            boxShadow: 'none',
        },
    },
    downloadButtonOpened: {
        backgroundColor: '#0C534C',
        border: '1.25px solid #73A9C7',
        width: '189px',
        borderTopLeftRadius: '5px',
        borderTopRightRadius: '5px',
        borderBottomLeftRadius: '0px',
        borderBottomRightRadius: '0px',
        display: 'flex',
        justifyContent: 'space-between',
        lineHeight: '13px !important',
        zIndex: '1',
        boxShadow: 'none',
        '&:hover': {
            backgroundColor: '#003B35',
            boxShadow: 'none',
        },
    },
    downloadButtonText: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'start !important',
    },
    dropdownSection: {
        position: 'relative',
    },
    dropdownMenu: {
        position: 'absolute',
        top: '39.5px',
        width: '189px',
        backgroundColor: '#EFF2F6',
        border: '1px solid #0C534C',
        borderBottomLeftRadius: '5px',
        borderBottomRightRadius: '5px',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        fontFamily: 'Poppins',
        fontSize: '12px',
        lineHeight: '16px',
        fontWeight: '500',
        '& div': {
            padding: '13.2px 21px',
            '&:hover': {
                backgroundColor: '#CCD5E1',
                cursor: 'pointer',
            },
        },
    },
    firstDropdownItem: {
        borderBottom: '1px solid #0C534C',
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