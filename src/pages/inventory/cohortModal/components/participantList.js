import React, { useState, useEffect, useRef, useContext, useCallback } from 'react';
import { withStyles, Button } from '@material-ui/core';
import { CohortStateContext } from '../../../../components/CohortSelectorState/CohortStateContext.js';
import { CohortModalContext } from '../CohortModalContext.js';
import { deletionTypes } from './deleteConfirmationModal';
import SearchIcon from '../../../../assets/icons/Search_Icon.svg';
import TrashCanIconBlue from '../../../../assets/icons/Trash_Can_Icon_Blue.svg';
import TrashCanIconRed from '../../../../assets/icons/Trash_Can_Icon_Red.svg';
import SortingIcon from '../../../../assets/icons/Sorting_Icon.svg';

const ParticipantList = (props) => {
    const { classes, localCohort, setLocalCohort, handleSetCurrentCohortChanges, handleSave, closeModal } = props;

    const { state } = useContext(CohortStateContext);
    const { 
        selectedCohort, 
        currentCohortChanges, 
        setShowDeleteConfirmation,
        setDeleteModalProps
    } = useContext(CohortModalContext);
    
    const activeCohort = state[selectedCohort];
    const matchingCohortID = currentCohortChanges && currentCohortChanges.cohortId === activeCohort.cohortId;

    const [selectedColumn, setSelectedColumn] = useState(['participant_id', 'ascending']);
    const [searchText, setSearchText] = useState(matchingCohortID && currentCohortChanges['searchText'] ? currentCohortChanges['searchText'] : '');
    const [isScrollbarActive, setIsScrollbarActive] = useState(false);

    const scrollContainerRef = useRef(null);

    useEffect(() => {
        const checkForScrollbar = () => {
            if (scrollContainerRef.current) {
                const { scrollHeight, clientHeight } = scrollContainerRef.current;
                setIsScrollbarActive(scrollHeight > clientHeight);
            }
        };
        checkForScrollbar();

        const resizeObserver = new ResizeObserver(() => checkForScrollbar());
        if (scrollContainerRef.current) {
            resizeObserver.observe(scrollContainerRef.current);
        }

        return () => {
            if (scrollContainerRef.current) {
                resizeObserver.disconnect();
            }
        };
    }, []);

    const handleSetSearch = useCallback((e) => {
        handleSetCurrentCohortChanges({
            ...currentCohortChanges,
            ...localCohort,
            searchText: e.target.value,
        });
    }, [currentCohortChanges, localCohort, handleSetCurrentCohortChanges]);

    const handleSort = useCallback((column) => {
        if (selectedColumn[0] === column) {
            setSelectedColumn([column, selectedColumn[1] === 'ascending' ? 'descending' : 'ascending']);
        } else {
            setSelectedColumn([column, 'ascending']);
        }
    }, [selectedColumn]);

    const handleDeleteParticipant = useCallback((participant_pk) => {
        setLocalCohort({
            ...localCohort,
            participants: localCohort.participants.filter(participant => participant.participant_pk !== participant_pk),
        });
        handleSetCurrentCohortChanges({
            ...currentCohortChanges,
            ...localCohort,
            participants: localCohort.participants.filter(participant => participant.participant_pk !== participant_pk),
        });
    }, [localCohort, currentCohortChanges, setLocalCohort, handleSetCurrentCohortChanges]);

    const handleDeleteAllParticipants = useCallback(() => {
        setLocalCohort({
            ...localCohort,
            participants: [],
        });
        handleSetCurrentCohortChanges({
            ...currentCohortChanges,
            ...localCohort,
            participants: [],
        });
    }, [localCohort, currentCohortChanges, setLocalCohort, handleSetCurrentCohortChanges]);

    // Sort participants
    const sortedParticipants = [...localCohort.participants].sort((a, b) => {
        const primaryComparison = selectedColumn[1] === 'ascending'
            ? a[selectedColumn[0]].localeCompare(b[selectedColumn[0]])
            : b[selectedColumn[0]].localeCompare(a[selectedColumn[0]]);

        if (primaryComparison !== 0) return primaryComparison;

        const secondaryComparison = a.dbgap_accession.localeCompare(b.dbgap_accession);
        if (secondaryComparison !== 0) return secondaryComparison;

        return a.participant_pk.localeCompare(b.participant_pk);
    });

    const filteredParticipants = searchText !== '' ? sortedParticipants.filter(participant =>
        participant.participant_id.includes(searchText)
    ) : sortedParticipants;

    return (
        <div className={classes.participantViewer}>
            <div className={classes.participantSearchBarSection}>
                <input
                    type="text"
                    placeholder="Search Participant ID here"
                    className={classes.participantSearchBar}
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                    onBlur={(e) => handleSetSearch(e)}
                    aria-label="Search participants by ID"
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
                        <span>Participant ID</span>
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
                        <span>dbGaP Accession</span>
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
                            {localCohort.participants.length === 0 ? 'No Data' : 'No matching Participant ID'}
                        </div>
                    }
                </div>
            </div>
            <div className={classes.cohortButtonSection}>
                <Button variant="contained" className={classes.cancelButton} onClick={closeModal}>
                    Cancel
                </Button>
                <Button variant="contained" className={classes.saveButton} onClick={() => handleSave()}>
                    Save Changes
                </Button>
            </div>
        </div>
    );
};

const styles = () => ({
    participantViewer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: '#F1F3F4',
        width: '100%',
        height: '100%',
        borderTopLeftRadius: '0px',
        borderTopRightRadius: '0px',
        borderBottomLeftRadius: '10px',
        borderBottomRightRadius: '10px',
        marginTop: '16px',
    },
    participantSearchBarSection: {
        display: 'flex',
        justifyContent: 'center',
        borderRadius: '8px',
        border: '1px solid #8B98AF',
        width: '92%',
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
        flex: '0 0 20px !important',
        paddingLeft: '0px !important',
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
        flex: '0 0 20px !important',
        cursor: 'pointer',
        paddingLeft: '0px !important',
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
        justifyContent: 'center',
        padding: '10px 20px 10px 20px',
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
});

export default withStyles(styles, { withTheme: true })(ParticipantList);