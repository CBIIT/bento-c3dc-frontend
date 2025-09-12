import React, { useState, useEffect, useContext, useMemo, useCallback, memo } from 'react';
import { withStyles } from '@material-ui/core';
import { CohortStateContext } from '../../../../components/CohortSelectorState/CohortStateContext';
import { onMutateSingleCohort } from '../../../../components/CohortSelectorState/store/action';
import { CohortModalContext } from '../../CohortModalContext';
import { getManifestPayload, truncateSignedUrl } from '../../utils';
import { CCDI_INTEROP_SERVICE_URL } from '../../../../bento/cohortModalData';
import CohortMetadata from './components/CohortMetadata';
import ParticipantList from './components/ParticipantList';
import ActionButtons from './components/ActionButtons';

/**
 * CohortDetails component for displaying and editing cohort information
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

    // Memoized matching cohort ID calculation
    const matchingCohortID = useMemo(() => {
        return currentCohortChanges && activeCohort && currentCohortChanges.cohortId === activeCohort.cohortId;
    }, [currentCohortChanges, activeCohort]);

    // Memoized initial cohort state - simple array spread is sufficient for participants
    const initialCohortState = useMemo(() => {
        if (!activeCohort) {
            return {
                cohortId: '',
                cohortName: '',
                cohortDescription: '',
                participants: [],
            };
        }
        return {
            cohortId: matchingCohortID ? currentCohortChanges.cohortId : activeCohort.cohortId,
            cohortName: matchingCohortID ? currentCohortChanges.cohortName : activeCohort.cohortName,
            cohortDescription: matchingCohortID ? currentCohortChanges.cohortDescription : activeCohort.cohortDescription,
            participants: matchingCohortID ? [...currentCohortChanges.participants] : [...activeCohort.participants],
        };
    }, [matchingCohortID, currentCohortChanges, activeCohort]);

    const [localCohort, setLocalCohort] = useState(initialCohortState);

    // Interop service state for CCDI Hub integration
    const [urlData, setUrlData] = useState(null);
    const [isGeneratingUrl, setIsGeneratingUrl] = useState(false);
    const [urlGenerationFailed, setUrlGenerationFailed] = useState(false);

    const manifestPayload = useMemo(() => {
        return getManifestPayload(localCohort.participants);
    }, [localCohort.participants]);

    // Function to call interop service
    const fetchCCDIHubUrl = useCallback(async (payload) => {
        if (!payload || payload.length === 0) return;
        
        setIsGeneratingUrl(true);
        setUrlGenerationFailed(false);
        try {
            const query = `
                query storeManifest($manifestString: String!, $type: String!) {
                    storeManifest(manifest: $manifestString, type: $type)
                }
            `;
            
            const response = await fetch(CCDI_INTEROP_SERVICE_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    query,
                    variables: {
                        manifestString: JSON.stringify(payload),
                        type: "json"
                    }
                })
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const result = await response.json();
            
            if (result.errors) {
                const errorMessage = (result.errors[0] && result.errors[0].message) || 'Unknown GraphQL error';
                const participantCount = payload ? payload.length : 0;
                throw new Error(`CCDI Interop Service Error: ${errorMessage} (Processing ${participantCount} study groups)`);
            }

            // Process the URL data to truncate signed URL parameters
            const processedData = {
                ...result.data,
                storeManifest: result.data.storeManifest ? truncateSignedUrl(result.data.storeManifest) : result.data.storeManifest
            };

            setUrlData(processedData);
            setUrlGenerationFailed(false);
        } catch (error) {
            console.error('Error generating CCDI Hub URL:', error);
            showAlert('error', 'Failed to generate CCDI Hub URL. Some features may not work properly.');
            setUrlData(null);
            setUrlGenerationFailed(true);
        } finally {
            setIsGeneratingUrl(false);
        }
    }, [showAlert]);

    // Trigger URL generation when manifest payload changes
    useEffect(() => {
        if (manifestPayload && manifestPayload.length > 0) {
            fetchCCDIHubUrl(manifestPayload);
        } else {
            setUrlData(null);
            setUrlGenerationFailed(false);
        }
    }, [manifestPayload, fetchCCDIHubUrl]);

    const handleSetCurrentCohortChanges = useCallback((localCohort) => {
        if (!localCohort.cohortId) return;
        setCurrentCohortChanges({
            cohortId: localCohort.cohortId,
            cohortName: localCohort.cohortName,
            cohortDescription: localCohort.cohortDescription,
            participants: localCohort.participants,
            searchText: localCohort.searchText,
        });
    }, [setCurrentCohortChanges]);

    const handleSaveCohort = useCallback((localCohort) => {
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
    }, [dispatch, showAlert, clearCurrentCohortChanges]);

    // Memoized save handler to prevent unnecessary re-renders
    const handleSave = useCallback(() => {
        handleSaveCohort(localCohort);
        handleSetCurrentCohortChanges({
            ...currentCohortChanges,
            ...localCohort,
        });
    }, [localCohort, currentCohortChanges, handleSaveCohort, handleSetCurrentCohortChanges]);

    // Update localCohort when selectedCohort changes (optimized)
    useEffect(() => {
        setLocalCohort(initialCohortState);
    }, [initialCohortState]);

    if (!activeCohort) {
        return null;
    }

    return (
        <div style={{display: 'flex', flexDirection: 'column', gap: 20}}>
            <div className={classes.cohortDetailsSection}>
                <CohortMetadata
                    config={config}
                />
                <ParticipantList
                    localCohort={localCohort}
                    setLocalCohort={setLocalCohort}
                    handleSave={handleSave}
                    closeModal={closeModal}
                    config={config}
                />
                
            </div>
            <ActionButtons
                localCohort={localCohort}
                ccdiHubUrl={urlData && urlData.storeManifest}
                isGeneratingUrl={isGeneratingUrl}
                urlGenerationFailed={urlGenerationFailed}
            />
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

});

export default memo(withStyles(styles, { withTheme: true })(CohortDetails));