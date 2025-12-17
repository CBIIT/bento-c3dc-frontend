import React, { useState, useRef, useEffect, useCallback, useContext, useMemo, memo } from 'react';
import { withStyles, Button } from '@material-ui/core';
import { useNavigate } from 'react-router-dom';
import ExpandMoreIcon from '../../../../../assets/icons/Expand_More_Icon.svg';
import Linkout from "../../../../../assets/about/Export_Icon_White.svg";
import ToolTip from '@bento-core/tool-tip';
import { downloadCohortManifest, downloadCohortMetadata, exportToCCDIHub } from '../../../utils';
import { CohortModalContext } from '../../../CohortModalContext';
import { TOOLTIP_MESSAGES } from '../../../../../bento/cohortModalData';

const ActionButtons = (props) => {
    const {
        classes,
        localCohort
    } = props;
    
    const navigate = useNavigate();
    const { showAlert } = useContext(CohortModalContext);
    
    // Loading states
    const [isDownloading, setIsDownloading] = useState(false);
    const [isExportingToCCDI, setIsExportingToCCDI] = useState(false);
    
    // Download functions (memoized for performance with error handling)
    const handleDownloadManifest = useCallback(async () => {
        if (isDownloading) return; // Prevent multiple simultaneous downloads

        await downloadCohortManifest(localCohort.participants, localCohort.cohortId, {
            showAlert,
            onLoadingStateChange: setIsDownloading
        });
    }, [localCohort.participants, localCohort.cohortId, isDownloading, showAlert]);

    const handleDownloadMetadata = useCallback(async () => {
        if (isDownloading) return; // Prevent multiple simultaneous downloads

        await downloadCohortMetadata(localCohort.participants, localCohort.cohortId, {
            showAlert,
            onLoadingStateChange: setIsDownloading
        });
    }, [localCohort.participants, localCohort.cohortId, isDownloading, showAlert]);
    
    // CCDI Hub export function using centralized utility
    const handleExportToCCDIHub = useCallback(async () => {
        if (isExportingToCCDI) return; // Prevent multiple simultaneous exports

        await exportToCCDIHub(localCohort.participants, {
            showAlert,
            useInteropService: true,
            onLoadingStateChange: setIsExportingToCCDI
        });
    }, [localCohort.participants, isExportingToCCDI, showAlert]);
    
    const handleViewAnalysisClick = useCallback(() => {
        try {
            navigate(`/cohortAnalyzer`, {state: {cohort: localCohort}});
        } catch (error) {
            console.error('Error navigating to cohort analyzer:', error);
            showAlert('error', 'Failed to navigate to Cohort Analyzer. Please try again.');
        }
    }, [navigate, localCohort, showAlert]);
    
    
    const viewCohortAnalyzerTooltip = TOOLTIP_MESSAGES.viewCohortAnalyzer;

    // Memoized complex tooltip to prevent unnecessary re-creation
    const exploreCCDIHubTooltip = useMemo(() => (
        <p className={classes.exploreTooltipText}>
            {TOOLTIP_MESSAGES.exploreCCDIHub.mainText}
        </p>
    ), [classes.exploreTooltipText]);

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
        if (isExportingToCCDI) {
            showAlert('info', 'Please wait while we prepare the CCDI Hub link...');
            return;
        }
        handleExportToCCDIHub();
    }, [isExportingToCCDI, handleExportToCCDIHub, showAlert]);

    return (
        <div className={classes.actionButtonsContainer}>
            <div className={classes.dropdownSection} ref={dropdownRef}>
                <Button
                    variant="contained"
                    className={showDownloadDropdown ? classes.downloadButtonOpened : classes.downloadButton}
                    onClick={handleDownloadDropdown}
                    disabled={isDownloading}
                    aria-label="Download cohort data - select format"
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
                    aria-label="Navigate to Cohort Analyzer page"
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
                    className={isExportingToCCDI ? classes.exploreButtonFaded : classes.exploreButton}
                    onClick={handleCCDIHubClick}
                    disabled={isExportingToCCDI}
                    aria-label={isExportingToCCDI ? 'Preparing CCDI Hub link...' : 'Open cohort in CCDI Hub in new tab'}
                >
                    <span className={classes.exploreButtonText}>
                        EXPLORE <br /> IN CCDI Hub
                    </span>
                    <img src={Linkout} width={14} height={14} alt="External link icon" />
                </Button>
            </ToolTip>
        </div>
    );
};

const styles = () => {
    // Base button style for common properties
    const baseButtonStyle = {
        height: '41px',
        borderRadius: '5px',
        boxShadow: 'none',
        fontFamily: 'Poppins',
        fontWeight: '600',
        fontSize: '12px',
        color: '#FFFFFF',
        display: 'flex',
        '&:hover': {
            boxShadow: 'none',
        },
    };

    // Standard action button style (137px width)
    const standardActionButtonStyle = {
        ...baseButtonStyle,
        width: '137px',
        lineHeight: '13px',
        letterSpacing: '2%',
        verticalAlign: 'middle',
        textTransform: 'uppercase',
        flexDirection: 'column',
        justifyContent: 'space-between',
    };

    return {
        actionButtonsContainer: {
            display: 'flex',
            flexDirection: 'row',
            gap: 10,
            justifyContent: 'flex-end'
        },
        exploreTooltipText: {
            fontFamily: 'Poppins',
            zIndex: 10000,
            fontWeight: 400,
            fontSize: 13,
            margin: 0,
        },
        exploreButtonText: {
            textAlign: 'left',
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
        ...baseButtonStyle,
        backgroundColor: '#4F5D69',
        border: '1.25px solid #4F5D69',
        width: '200px',
        justifyContent: 'space-between',
        lineHeight: '13px !important',

        '&:hover': {
            backgroundColor: '#374149',
            boxShadow: 'none',
        },
    },
    downloadButtonOpened: {
        ...baseButtonStyle,
        backgroundColor: '#4F5D69',
        border: '1.25px solid #73A9C7',
        width: '200px',
        borderTopLeftRadius: '5px',
        borderTopRightRadius: '5px',
        borderBottomLeftRadius: '0px',
        borderBottomRightRadius: '0px',
        justifyContent: 'space-between',
        lineHeight: '13px !important',
        zIndex: '1',
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
        ...standardActionButtonStyle,
        backgroundColor: '#003F74',
        border: '1.25px solid #73A9C7',
        textAlign: 'left',
        '&:hover': {
            backgroundColor: '#073F60',
            boxShadow: 'none',
        },
    },
    exploreButton: {
        ...standardActionButtonStyle,
        backgroundColor: '#044249',
        border: '1.25px solid #4EA1A1',
        '&:hover': {
            backgroundColor: '#1d4d67',
            boxShadow: 'none',
        },
    },
    exploreButtonFaded: {
        ...standardActionButtonStyle,
        backgroundColor: '#BBC1C3',
        border: '1.25px solid #4EA1A1',
        cursor: 'not-allowed',
        '&:hover': {
            backgroundColor: '#BBC1C3',
            boxShadow: 'none',
        },
    },
    };
};

export default memo(withStyles(styles, { withTheme: true })(ActionButtons));