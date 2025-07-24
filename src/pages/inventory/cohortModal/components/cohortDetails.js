import React, { useState, useEffect, useRef, useContext } from 'react';
import { withStyles, Button } from '@material-ui/core';
import ToolTip from '@bento-core/tool-tip';
import { CohortStateContext } from '../../../../components/CohortSelectorState/CohortStateContext.js';
import { onMutateSingleCohort } from '../../../../components/CohortSelectorState/store/action.js';
import { CohortModalContext } from '../CohortModalContext.js';
import { GET_COHORT_MANIFEST_QUERY, GET_COHORT_METADATA_QUERY } from '../../../../bento/dashboardTabData.js';
import client from '../../../../utils/graphqlClient.js';
import { arrayToCSVDownload, objectToJsonDownload } from '../utils.js';
import CohortMetadata from './cohortMetadata';
import ParticipantList from './participantList';
import DEFAULT_CONFIG from '../config';
//import EditIcon from '../../../../assets/icons/Edit_Icon.svg';
import ExpandMoreIcon from '../../../../assets/icons/Expand_More_Icon.svg';
import Linkout from "../../../../assets/about/Export_Icon_White.svg";
import LinkoutBlue from "../../../../assets/about/Export_Icon.svg";

import { useNavigate } from 'react-router-dom';

/**
 * A list of cohorts to select from and manage.
 */

const CohortDetails = (props) => {
    const {
        classes,
        config,
        closeModal,
    } = props;

    const { state, dispatch } = useContext(CohortStateContext);
    const { 
        selectedCohort, 
        currentCohortChanges, 
        setCurrentCohortChanges, 
        showAlert, 
        clearCurrentCohortChanges
    } = useContext(CohortModalContext);
    
    const activeCohort = state[selectedCohort];

    const handleSetCurrentCohortChanges = (localCohort) => {
        if (!localCohort.cohortId) return;
        setCurrentCohortChanges({
            cohortId: localCohort.cohortId,
            cohortName: localCohort.cohortName,
            cohortDescription: localCohort.cohortDescription,
            participants: localCohort.participants,
            searchText: localCohort.searchText,
        })
    };
    
    // Find the selected cohort (activeCohort should match one in state)
    const selectedCohortId = activeCohort && activeCohort.cohortId;

    const downloadCohortManifest = async () => {
        const participantPKs = activeCohort.participants.map(item => item.participant_pk);
        const { data } = await client.query({
            query: GET_COHORT_MANIFEST_QUERY,
            variables: { "participant_pk": participantPKs, "first": activeCohort.participants.length },
        });
        arrayToCSVDownload(data['diagnosisOverview'], selectedCohortId);
    };

    const downloadCohortMetadata = async () => {
        const participantPKs = activeCohort.participants.map(item => item.participant_pk);
        const { data } = await client.query({
            query: GET_COHORT_METADATA_QUERY,
            variables: { "participant_pk": participantPKs, "first": activeCohort.participants.length },
        });
        objectToJsonDownload(data['cohortMetadata'], selectedCohortId);
    };

    const handleSaveCohort = (localCohort) => {
        if (!localCohort.cohortId) return;
        dispatch(onMutateSingleCohort(
            localCohort.cohortId,
            {
                cohortName: localCohort.cohortName,
                cohortDescription: localCohort.cohortDescription,
                participants: localCohort.participants
            },
            () => {
                showAlert('success', 'Cohort updated successfully!');
                clearCurrentCohortChanges();        
            },
            (error) => {
                showAlert('error', `Failed to update cohort: ${error.message}`);
            }
        ));
    };

    if (!activeCohort) {
        return null;
    }

    let matchingCohortID = currentCohortChanges && currentCohortChanges.cohortId === activeCohort.cohortId;


    const [localCohort, setLocalCohort] = useState({
        cohortId: matchingCohortID ? currentCohortChanges.cohortId : activeCohort.cohortId,
        cohortName: matchingCohortID ? currentCohortChanges.cohortName : activeCohort.cohortName,
        cohortDescription: matchingCohortID ? currentCohortChanges.cohortDescription : activeCohort.cohortDescription,
        participants: matchingCohortID ? JSON.parse(JSON.stringify(currentCohortChanges.participants)) : JSON.parse(JSON.stringify(activeCohort.participants)),
    });

    // Update localCohort when selectedCohort changes
    useEffect(() => {
        const matchingCohortID = currentCohortChanges && currentCohortChanges.cohortId === activeCohort.cohortId;
        setLocalCohort({
            cohortId: matchingCohortID ? currentCohortChanges.cohortId : activeCohort.cohortId,
            cohortName: matchingCohortID ? currentCohortChanges.cohortName : activeCohort.cohortName,
            cohortDescription: matchingCohortID ? currentCohortChanges.cohortDescription : activeCohort.cohortDescription,
            participants: matchingCohortID ? JSON.parse(JSON.stringify(currentCohortChanges.participants)) : JSON.parse(JSON.stringify(activeCohort.participants)),
        });
    }, [selectedCohort, activeCohort, currentCohortChanges]);
    const [showDownloadDropdown, setShowDownloadDropdown] = useState(false);
    const dropdownRef = useRef(null);

    const navigate = useNavigate();

    const generateCCDIHub_url = (cohortId) => {
        const data = cohortId;
        const participantIds = data.participants.map(p => p.participant_id).join("|");
        const dbgapAccessions = [...new Set(data.participants.map(p => p.dbgap_accession))].join("|");
        const baseUrl = "https://ccdi.cancer.gov/explore?p_id=";
        const dbgapBase = "&dbgap_accession=";
    
        const finalUrl = `${baseUrl}${participantIds}${dbgapBase}${dbgapAccessions}`;
        window.open(finalUrl,'_blank')
            return finalUrl;
    }


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

    
    const handleSave = () => {
        handleSaveCohort(localCohort)
        handleSetCurrentCohortChanges({
            ...currentCohortChanges,
            ...localCohort,
        });
    }

    const handleViewAnalysisClick = (cohort)=>{
        navigate(`/cohortAnalyzer`,{state:{cohort}});
    }


    const Gap = () => (
        <div style={{ height: '10px' }} />
    );


    const handleDownloadDropdown = () => {
        setShowDownloadDropdown(!showDownloadDropdown);
    };




    const handleDownloadFile = (download) => {
        download();
        setShowDownloadDropdown(false);
    };



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
                <li> Click on “Upload Participants Set.”</li>
            </ol>
        </p>;

    const datePrefix = (config && config.datePrefix) || DEFAULT_CONFIG.config.cohortDetails.datePrefix;

    return (
        <div style={{display: 'flex', flexDirection: 'column', gap: 20}}>
            <div className={classes.cohortDetailsSection}>
                <CohortMetadata
                    config={config}
                />
                <ParticipantList
                    localCohort={localCohort}
                    setLocalCohort={setLocalCohort}
                    handleSetCurrentCohortChanges={handleSetCurrentCohortChanges}
                    handleSave={handleSave}
                    closeModal={closeModal}
                />
                <div className={classes.cohortLastUpdated}>
                    {datePrefix} {(new Date(activeCohort.lastUpdated)).toLocaleDateString('en-US')}
                </div>
                
            </div>
            <div style={{display:'flex',flexDirection:'row',gap: 10, justifyContent: 'flex-end'}}>

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
                        <Button variant="contained" className={classes.viewCohortAnalyzerButton} onClick={() => {handleViewAnalysisClick(localCohort)}}>
                        View Cohort <br/> Analyzer
                        </Button> 
                        </ToolTip>
                        <ToolTip
                            maxWidth="335px"
                            title={<div>
                            {exploreCCDIHubTooltip}
                            </div>}
                            placement="top-end"
                            interactive
                            arrow
                            arrowSize="30px"
                        >
                        <Button 
                            variant="contained"
                            className={ localCohort.participants.length > 600? classes.exploreButtonFaded : classes.exploreButton }
                            onClick={() => localCohort.participants.length <= 600 && generateCCDIHub_url(localCohort)}
                        >
                        <span style={{textAlign: 'left'}}>
                        EXPLORE <br /> IN CCDI Hub
                            </span>
                            <img src={Linkout} width={14} height={14}  alt="Linkout Icon" />
                        </Button>
                        </ToolTip>
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
        //maxHeight: '718px',
        border: '1px solid #3388A6',
        borderRadius: '10px',
    },

    exploreButtonFaded: {
        background: '#BBC1C3',
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
    dropdownSection: {
        position: 'relative',
            '& button': {
            height: '41px',
            fontFamily: 'Poppins',
            fontSize: '12px',
            fontWeight: '600',
            lineHeight: '16px',
            color: '#FFFFFF',
        },},
    dropdownMenu: {
        position: 'absolute',
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
        color: '#2D5D63',
        fontFamily: 'Lato',
        textAlign: 'left',
        lineHeight: '22px',
        paddingLeft: '20px',
        paddingBottom: '10px',
    },
});

export default withStyles(styles, { withTheme: true })(CohortDetails);