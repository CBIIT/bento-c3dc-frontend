import React, { useState, useEffect, useRef, useContext, useCallback, useMemo, memo } from 'react';
import { withStyles } from '@material-ui/core';
import { CohortModalContext } from '../../../../../CohortModalContext';
import { deletionTypes } from '../../../../shared/DeleteConfirmationModal';
import TrashCanIconBlue from '../../../../../../../assets/icons/Trash_Can_Icon_Blue.svg';
import TrashCanIconRed from '../../../../../../../assets/icons/Trash_Can_Icon_Red.svg';
import SortingIcon from '../../../../../../../assets/icons/Sorting_Icon.svg';
import { SCROLLBAR_WIDTH } from '../../../../../../../bento/cohortModalData';

const ParticipantTable = (props) => {
    const { 
        classes, 
        participants, 
        onDeleteParticipant, 
        onDeleteAllParticipants,
        searchText 
    } = props;

    const { 
        setShowDeleteConfirmation,
        setDeleteModalProps
    } = useContext(CohortModalContext);

    const [selectedColumn, setSelectedColumn] = useState(['participant_id', 'ascending']);
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

    const handleSort = useCallback((column) => {
        if (selectedColumn[0] === column) {
            setSelectedColumn([column, selectedColumn[1] === 'ascending' ? 'descending' : 'ascending']);
        } else {
            setSelectedColumn([column, 'ascending']);
        }
    }, [selectedColumn]);

    const handleDeleteParticipant = useCallback((participant_pk) => {
        if (onDeleteParticipant) {
            onDeleteParticipant(participant_pk);
        }
    }, [onDeleteParticipant]);

    const handleDeleteAllParticipants = useCallback(() => {
        setDeleteModalProps({
            handleDelete: () => onDeleteAllParticipants(),
            deletionType: deletionTypes.DELETE_ALL_PARTICIPANTS,
        });
        setShowDeleteConfirmation(true);
    }, [onDeleteAllParticipants, setDeleteModalProps, setShowDeleteConfirmation]);

    // Sort participants (memoized for performance)
    const sortedParticipants = useMemo(() => {
        return [...participants].sort((a, b) => {
            const primaryComparison = selectedColumn[1] === 'ascending'
                ? a[selectedColumn[0]].localeCompare(b[selectedColumn[0]])
                : b[selectedColumn[0]].localeCompare(a[selectedColumn[0]]);

            if (primaryComparison !== 0) return primaryComparison;

            const secondaryComparison = a.dbgap_accession.localeCompare(b.dbgap_accession);
            if (secondaryComparison !== 0) return secondaryComparison;

            return a.participant_pk.localeCompare(b.participant_pk);
        });
    }, [participants, selectedColumn]);

    // Filter participants (memoized for performance, case-insensitive search)
    const filteredParticipants = useMemo(() => {
        if (searchText === '') return sortedParticipants;
        
        const lowerSearchText = searchText.toLowerCase();
        return sortedParticipants.filter(participant =>
            participant.participant_id.toLowerCase().includes(lowerSearchText)
        );
    }, [sortedParticipants, searchText]);

    // Helper function to generate sorting icon class names
    const getSortingIconClasses = useCallback((columnName) => {
        let classes_str = classes.sortingIcon;
        if (selectedColumn[0] === columnName) {
            classes_str += ' ' + classes.selectedColumn;
        }
        if (selectedColumn[1] === 'descending') {
            classes_str += ' ' + classes.descendingColumn;
        }
        return classes_str;
    }, [classes, selectedColumn]);

    // Helper function to generate table header classes
    const getTableHeaderClasses = useCallback(() => {
        return classes.participantTableHeader + (isScrollbarActive ? ' ' + classes.participantTableHeaderScrollPadding : '');
    }, [classes, isScrollbarActive]);

    // Reusable header column component
    const HeaderColumn = useCallback(({ columnKey, label, altText }) => (
        <div
            onClick={() => handleSort(columnKey)}
            className={classes.headerColumn}
        >
            <span className={classes.headerColumnText}>{label}</span>
            <img
                src={SortingIcon}
                alt={altText}
                className={getSortingIconClasses(columnKey)}
            />
        </div>
    ), [classes.headerColumn, classes.headerColumnText, handleSort, getSortingIconClasses]);

    return (
        <div className={classes.participantTableSection}>
            <div className={getTableHeaderClasses()}>
                <HeaderColumn 
                    columnKey="participant_id" 
                    label="Participant ID" 
                    altText="sort by participant id icon" 
                />
                <HeaderColumn 
                    columnKey="dbgap_accession" 
                    label="dbGaP Accession" 
                    altText="sort by dbGaP accession icon" 
                />
                <div className={classes.removeHeader} onClick={handleDeleteAllParticipants}>
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
                        {participants.length === 0 ? 'No Data' : 'No matching Participant ID'}
                    </div>
                }
            </div>
        </div>
    );
};

const styles = () => ({
    participantTableSection: {
        width: '92%',
        height: '75%',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#FFFFFF',
        borderTop: '2px solid #8A7F7C',
        borderBottom: '1px solid #909090',
    },
    headerColumn: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'start',
        paddingLeft: '19px',
        cursor: 'pointer',
    },
    headerColumnText: {
        color: '#0F253A',
        fontFamily: '"Open Sans"',
        fontSize: '15px',
        fontStyle: 'normal',
        fontWeight: 700,
        lineHeight: 'normal',
        letterSpacing: '-0.3px',
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
        paddingRight: SCROLLBAR_WIDTH, //matches scrollbar width
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
            width: SCROLLBAR_WIDTH, // Width of the scrollbar
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
            paddingLeft: '20px',
            color: '#343434',
            fontFamily: '"Open Sans"',
            fontSize: '16px',
            fontStyle: 'normal',
            fontWeight: 400,
            lineHeight: '150%',
            letterSpacing: '-0.32px',
        },
        '&:nth-child(odd)': {
            backgroundColor: '#D9DFE6',
        },
        '&:nth-child(even)': {
            backgroundColor: '#F8F8F8',
        },
    },
});

export default memo(withStyles(styles, { withTheme: true })(ParticipantTable));