import { Button, makeStyles } from '@material-ui/core';
import React, { useRef, useState } from 'react';
import ExpandMoreIcon from '../../../assets/icons/Expand_More_Icon.svg'
import { arrayToCSVDownload, objectToJsonDownload } from '../../inventory/cohortModal/utils';
import client from '../../../utils/graphqlClient';
import { GET_COHORT_MANIFEST_QUERY, GET_COHORT_METADATA_QUERY } from '../../../bento/dashboardTabData';

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

    const downloadCohortManifest = async () => {
        const { data } = await client.query({
            query: GET_COHORT_MANIFEST_QUERY,
            variables: queryVariable,
        });
        arrayToCSVDownload(data['diagnosisOverview'], "analyzed");
    };

    const downloadCohortMetadata = async () => {
        const { data } = await client.query({
            query: GET_COHORT_METADATA_QUERY,
            variables: queryVariable,
        });
        objectToJsonDownload(data['cohortMetadata'], "Analyzed");
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
                    <span>Download Results</span>
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
                        onClick={() => { handleDownloadFile(downloadCohortManifest) }}
                    >
                        Manifest CSV
                    </div>
                    <div
                        className={classes.dropdownItem}
                        onClick={() => { handleDownloadFile(downloadCohortMetadata) }}
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