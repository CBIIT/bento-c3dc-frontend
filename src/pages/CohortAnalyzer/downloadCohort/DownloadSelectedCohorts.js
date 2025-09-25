import { Button, makeStyles } from '@material-ui/core';
import React, { useEffect, useRef, useState } from 'react';
import ExpandMoreIcon from '../../../assets/icons/Expand_More_Icon.svg'
import { downloadCohortManifest, downloadCohortMetadata } from '../../../components/CohortModal/utils';

export default function DownloadSelectedCohort({ queryVariable, isSelected }) {

    const [showDownloadDropdown, setShowDownloadDropdown] = useState(false);

    const handleDownloadFile = (download) => {
        download();
        setShowDownloadDropdown(false);
    };

    const handleDownloadDropdown = () => {
        if (isSelected) {
            setShowDownloadDropdown(!showDownloadDropdown);
        }
    }

    const handleDownloadManifest = async () => {
        // Extract participant PKs from queryVariable for centralized function
        const participants = queryVariable.participant_pk ?
            queryVariable.participant_pk.map(pk => ({ participant_pk: pk })) : [];

        await downloadCohortManifest(participants, "analyzed");
    };

    const handleDownloadMetadata = async () => {
        // Extract participant PKs from queryVariable for centralized function
        const participants = queryVariable.participant_pk ?
            queryVariable.participant_pk.map(pk => ({ participant_pk: pk })) : [];

        await downloadCohortMetadata(participants, "Analyzed");
    };
    
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

    const classes = useStyles({ isSelected });
    const dropdownRef = useRef(null);

    return (
        <div className={classes.dropdownSection} ref={dropdownRef}>
            <Button
                variant="contained"
                className={showDownloadDropdown ? classes.downloadButtonOpened : classes.downloadButton}
                onClick={handleDownloadDropdown}
            >
                <div className={classes.downloadButtonText}>
                    Download Results
                </div>
                <img
                    src={ExpandMoreIcon}
                    alt="expand download icon"
                    className={`${showDownloadDropdown ? classes.rotatedIcon : ''}`}
                />
            </Button>
            {showDownloadDropdown && (
                <div className={classes.dropdownMenu}>
                    <div
                        className={classes.dropdownItem + ' ' + classes.firstDropdownItem}
                        onClick={() => { handleDownloadFile(handleDownloadManifest) }}
                    >
                        Manifest CSV
                    </div>
                    <div
                        className={classes.dropdownItem}
                        onClick={() => { handleDownloadFile(handleDownloadMetadata) }}
                    >
                        Metadata JSON
                    </div>
                </div>
            )}
        </div>
    )
}

const useStyles = makeStyles((theme) => ({
    downloadButton: (props) => ({
        backgroundColor: props.isSelected ? '#556469' : '#556469',
        border: '1.25px solid #73A9C7',
        height: '41px',
        width: '199px',
        color: 'white',
        borderTopLeftRadius: '5px',
        borderTopRightRadius: '5px',
        borderBottomLeftRadius: '5px',
        borderBottomRightRadius: '5px',
        display: 'flex',
        justifyContent: 'space-between',
        lineHeight: '13px !important',
        zIndex: '1',
        boxShadow: 'none',
        opacity: props.isSelected ? 1 : 0.4,
        cursor: props.isSelected ? 'pointer' : 'default',
        '&:hover': {
            backgroundColor: props.isSelected ? '#003B35' : '#556469',
            boxShadow: 'none',
        },
    }),
    rotatedIcon: {
        transform: 'rotate(180deg)'
    },
    downloadButtonOpened: {
        backgroundColor: '#0C534C',
        border: '1.25px solid #73A9C7',
        width: '189px',
        height: '41px',
        color: 'white',
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
        fontFamily: 'Poppins',
        fontSize: '12px',
        fontWeight: 600,


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
        zIndex: 1,
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
    }
}));