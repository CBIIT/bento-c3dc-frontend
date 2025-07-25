import React, { useState, useRef, useEffect, useCallback, memo } from 'react';
import { withStyles, Button } from '@material-ui/core';
import { useNavigate } from 'react-router-dom';
import ExpandMoreIcon from '../../../../assets/icons/Expand_More_Icon.svg';
import Linkout from "../../../../assets/about/Export_Icon_White.svg";
import LinkoutBlue from "../../../../assets/about/Export_Icon.svg";
import ToolTip from '@bento-core/tool-tip';
import { GET_COHORT_MANIFEST_QUERY, GET_COHORT_METADATA_QUERY } from '../../../../bento/dashboardTabData.js';
import client from '../../../../utils/graphqlClient.js';
import { arrayToCSVDownload, objectToJsonDownload } from '../utils.js';

const ActionButtons = (props) => {
    const { 
        classes, 
        localCohort
    } = props;
    
    const navigate = useNavigate();
    
    // Download functions (memoized for performance)
    const downloadCohortManifest = useCallback(async () => {
        const participantPKs = localCohort.participants.map(item => item.participant_pk);
        const { data } = await client.query({
            query: GET_COHORT_MANIFEST_QUERY,
            variables: { "participant_pk": participantPKs, "first": localCohort.participants.length },
        });
        arrayToCSVDownload(data['diagnosisOverview'], localCohort.cohortId);
    }, [localCohort.participants, localCohort.cohortId]);

    const downloadCohortMetadata = useCallback(async () => {
        const participantPKs = localCohort.participants.map(item => item.participant_pk);
        const { data } = await client.query({
            query: GET_COHORT_METADATA_QUERY,
            variables: { "participant_pk": participantPKs, "first": localCohort.participants.length },
        });
        objectToJsonDownload(data['cohortMetadata'], localCohort.cohortId);
    }, [localCohort.participants, localCohort.cohortId]);
    
    // Navigation functions (memoized for performance)
    const generateCCDIHub_url = useCallback(() => {
        const participantIds = localCohort.participants.map(p => p.participant_id).join("|");
        const dbgapAccessions = [...new Set(localCohort.participants.map(p => p.dbgap_accession))].join("|");
        const baseUrl = "https://ccdi.cancer.gov/explore?p_id=";
        const dbgapBase = "&dbgap_accession=";
    
        const finalUrl = `${baseUrl}${participantIds}${dbgapBase}${dbgapAccessions}`;
        window.open(finalUrl,'_blank');
        return finalUrl;
    }, [localCohort.participants]);
    
    const handleViewAnalysisClick = useCallback(() => {
        navigate(`/cohortAnalyzer`, {state: {cohort: localCohort}});
    }, [navigate, localCohort]);
    
    // Tooltip content
    const Gap = () => (
        <div style={{ height: '10px' }} />
    );
    
    const viewCohortAnalyzerTooltip = "Clicking on this button will take the user to the Cohort Analyzer page, where the user will see the desired cohort and click to proceed with analysis.";

    const exploreCCDIHubTooltip = 
        <p style={{ fontFamily: "Poppins", zIndex: 10000, fontWeight: 400, fontSize: 13, margin: 0 }}>
            Clicking this button will create a url and open a new tab showing the CCDI Hub Explore page with filtered facets based on the user&apos;s selected cohort.
            <br/>
            <Gap/>
            <b>If cohort size &le; 600:</b>
            <br/> 
            Proceed with direct export within C3DC.
            <br/>
            <Gap/>
            <b>If cohort size &gt; 600:</b><br/> 
            Download the manifest and upload it manually to the&nbsp;
            <a style={{zIndex: 10000}} target='_blank' href="https://ccdi.cancer.gov/explore" rel="noreferrer">
                CCDI Hub 
                <img 
                    src={LinkoutBlue} 
                    width={14} 
                    height={14} 
                    style={{
                        padding: "4px 0px 0px 2px", 
                        bottom: 0, 
                        position: 'relative'
                    }} 
                    alt="Linkout Icon" 
                /> 
            </a>
            &nbsp;by following these steps:
            <ol>
                <li> Choose the Explore page from the menu.</li>
                <li> In the Facets side panel, open the Demographic facet.</li>
                <li> Click on "Upload Participants Set."</li>
            </ol>
        </p>;

    const [showDownloadDropdown, setShowDownloadDropdown] = useState(false);
    const dropdownRef = useRef(null);

    // Click outside handler to close dropdown
    const handleClickOutside = useCallback((event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setShowDownloadDropdown(false);
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
    }, [showDownloadDropdown, handleClickOutside]);

    const handleDownloadDropdown = useCallback(() => {
        setShowDownloadDropdown(!showDownloadDropdown);
    }, [showDownloadDropdown]);

    const handleDownloadFile = useCallback((download) => {
        download();
        setShowDownloadDropdown(false);
    }, []);

    const handleCCDIHubClick = useCallback(() => {
        if (localCohort.participants.length <= 600) {
            generateCCDIHub_url();
        }
    }, [localCohort.participants.length, generateCCDIHub_url]);

    return (
        <div className={classes.actionButtonsContainer}>
            <div className={classes.dropdownSection} ref={dropdownRef}>
                <Button
                    variant="contained"
                    className={showDownloadDropdown ? classes.downloadButtonOpened : classes.downloadButton}
                    onClick={handleDownloadDropdown}
                >
                    <div className={classes.downloadButtonText}>
                        <span>Download Selected</span>
                        <span>Cohorts</span>
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
            
            <ToolTip
                title={viewCohortAnalyzerTooltip}
                placement="top-end"
                arrow
                arrowSize="30px"
            >
                <Button 
                    variant="contained" 
                    className={classes.viewCohortAnalyzerButton} 
                    onClick={handleViewAnalysisClick}
                >
                    View Cohort <br/> Analyzer
                </Button>
            </ToolTip>
            
            <ToolTip
                maxWidth="335px"
                title={<div>{exploreCCDIHubTooltip}</div>}
                placement="top-end"
                interactive
                arrow
                arrowSize="30px"
            >
                <Button 
                    variant="contained"
                    className={localCohort.participants.length > 600 ? classes.exploreButtonFaded : classes.exploreButton}
                    onClick={handleCCDIHubClick}
                >
                    <span style={{textAlign: 'left'}}>
                        EXPLORE <br /> IN CCDI Hub
                    </span>
                    <img src={Linkout} width={14} height={14} alt="Linkout Icon" />
                </Button>
            </ToolTip>
        </div>
    );
};

const styles = () => ({
    actionButtonsContainer: {
        display: 'flex',
        flexDirection: 'row',
        gap: 10,
        justifyContent: 'flex-end'
    },
    dropdownSection: {
        position: 'relative',
        '& button': {
            height: '41px',
            fontFamily: 'Poppins',
            fontSize: '12px',
            fontWeight: '600',
            lineHeight: '16px',
            color: '#FFFFFF',
        },
    },
    downloadButton: {
        backgroundColor: '#4F5D69',
        border: '1.25px solid #4F5D69',
        width: '200px',
        borderRadius: '5px',
        display: 'flex',
        justifyContent: 'space-between',
        lineHeight: '13px !important',
        boxShadow: 'none',

        '&:hover': {
            backgroundColor: '#374149',
            boxShadow: 'none',
        },
    },
    downloadButtonOpened: {
        backgroundColor: '#4F5D69',
        border: '1.25px solid #73A9C7',
        width: '200px',
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
            backgroundColor: '#374149',
            boxShadow: 'none',
        },
    },
    downloadButtonText: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'start !important',
    },
    expandMoreIcon: {
        width: '12px',
        height: '12px',
        transition: 'transform 0.2s ease',
    },
    rotatedIcon: {
        transform: 'rotate(180deg)',
    },
    dropdownMenu: {
        position: 'absolute',
        width: '200px',
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
    viewCohortAnalyzerButton: {
        backgroundColor: '#003F74',
        border: '1.25px solid #73A9C7',
        width: '137px',
        height: '41px',
        borderRadius: '5px',
        boxShadow: 'none',
        fontFamily: 'Poppins',
        fontWeight: '600',
        fontSize: '12px',
        lineHeight: '13px',
        letterSpacing: '2%',
        verticalAlign: 'middle',
        textTransform: 'uppercase',
        textAlign: 'left',
        color: '#FFFFFF',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        '&:hover': {
            backgroundColor: '#073F60',
            boxShadow: 'none',
        },
    },
    exploreButton: {
        backgroundColor: '#044249',
        border: '1.25px solid #4EA1A1',
        width: '137px',
        height: '41px',
        borderRadius: '5px',
        boxShadow: 'none',
        fontFamily: 'Poppins',
        fontWeight: '600',
        fontSize: '12px',
        lineHeight: '13px',
        letterSpacing: '2%',
        verticalAlign: 'middle',
        textTransform: 'uppercase',
        color: '#FFFFFF',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        '&:hover': {
            backgroundColor: '#1d4d67',
            boxShadow: 'none',
        },
    },
    exploreButtonFaded: {
        backgroundColor: '#BBC1C3',
        border: '1.25px solid #4EA1A1',
        width: '137px',
        height: '41px',
        borderRadius: '5px',
        boxShadow: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 12px',
        fontSize: '12px',
        fontWeight: '600',
        lineHeight: '16px',
        color: '#FFFFFF',
        fontFamily: 'Poppins',
        cursor: 'not-allowed',

        '&:hover': {
            backgroundColor: '#BBC1C3',
            boxShadow: 'none',
        },
    },
});

export default memo(withStyles(styles, { withTheme: true })(ActionButtons));