import { DOWNLOAD_MANIFEST_KEYS } from '../../bento/cohortModalData';

function generateDownloadFileName(isManifest, cohortID) {
    const date = new Date();
    const yyyy = date.getFullYear();
    let dd = date.getDate();
    let mm = (date.getMonth() + 1);
  
    if (dd < 10) { dd = `0${dd}`; }
  
    if (mm < 10) { mm = `0${mm}`; }
  
    const todaysDate = `${yyyy}-${mm}-${dd}`;
  
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();
  
    if (hours < 10) { hours = `0${hours}`; }
  
    if (minutes < 10) { minutes = `0${minutes}`; }
  
    if (seconds < 10) { seconds = `0${seconds}`; }

    if (isManifest) {
        const fileName = 'Manifest';
        return `${fileName}_${cohortID}_${todaysDate} ${hours}-${minutes}-${seconds}${'.csv'}`;
    }
    else {
        const fileName = 'Metadata';
        return `${fileName}_${cohortID}_${todaysDate} ${hours}-${minutes}-${seconds}${'.json'}`;
    }
}

function cleanGraphQLTypenames(obj) {
    if (Array.isArray(obj)) {
      return obj.map(item => cleanGraphQLTypenames(item));
    } else if (typeof obj === 'object' && obj !== null) {
      const newObj = {};
      Object.keys(obj).forEach(key => {
        if (key !== '__typename') {
          newObj[key] = cleanGraphQLTypenames(obj[key]);
        }
      });
      return newObj;
    }
    return obj; 
  };

  export const arrayToCSVDownload = (arr, cohortID) => {
    const keys = Object.keys(DOWNLOAD_MANIFEST_KEYS);
    const header = keys.join(',');
    const rows = arr.map((row) => {
        return keys.map((k) => {
            let value = row[DOWNLOAD_MANIFEST_KEYS[k]];

            if (row.participant) {
                if (k === 'Participant ID') {
                    value = row.participant.participant_id || '';
                } else if (k === 'Sex at Birth') {
                    value = row.participant.sex_at_birth || '';
                } else if (k === 'Race') {
                    value = row.participant.race || '';
                }
            }

            if (typeof value === 'string' && (value.includes(',') || value.includes('"'))) {
                value = `"${value.replace(/"/g, '""')}"`; 
            }

            return value;
        }).join(',');
    });

    const csvData = [header, ...rows].join('\n');

    const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8' });
    const JsonURL = window.URL.createObjectURL(blob);
    
    let tempLink = document.createElement('a');
    tempLink.setAttribute('href', JsonURL);
    tempLink.setAttribute('download', generateDownloadFileName(true, cohortID));
    document.body.appendChild(tempLink);
    tempLink.click();
    document.body.removeChild(tempLink);
};



export const objectToJsonDownload = (obj, cohortID) => {
    const cleanedObj = cleanGraphQLTypenames(obj);
  
    const json = JSON.stringify({ [cohortID]: cleanedObj }, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const JsonURL = window.URL.createObjectURL(blob);
    
    let tempLink = document.createElement('a');
    tempLink.setAttribute('href', JsonURL);
    tempLink.setAttribute('download', generateDownloadFileName(false, cohortID));
    document.body.appendChild(tempLink);
    tempLink.click();
    document.body.removeChild(tempLink);
  };

  export const hasUnsavedChanges = (obj1, obj2, ignoredFields) => {
    if (!obj1 || !obj2) return false; // If either object is undefined, consider no changes
  
    const sharedKeys = Object.keys(obj1).filter(key => key in obj2 && !ignoredFields.includes(key) );
    const filteredObj1 = sharedKeys.reduce((acc, key) => {
        acc[key] = obj1[key];
        return acc;
    }, {});
    const filteredObj2 = sharedKeys.reduce((acc, key) => {
        acc[key] = obj2[key];
        return acc;
    }, {});
    return JSON.stringify(filteredObj1) !== JSON.stringify(filteredObj2);
  };

// Helper function to create manifest payload for interop service
export const getManifestPayload = (participants) => {
  if (!participants || !Array.isArray(participants)) {
    return [];
  }
  
  // Group participants by study_id (dbgap_accession)
  const studyGroups = participants.reduce((acc, participant) => {
    const studyId = participant.dbgap_accession;
    
    // Skip participants with missing or invalid dbgap_accession
    if (studyId === undefined || studyId === null || studyId === '') {
      console.warn('Participant missing dbgap_accession:', participant.participant_id || 'Unknown participant');
      return acc;
    }
    
    if (!acc[studyId]) {
      acc[studyId] = {
        study_id: studyId,
        participant_id: []
      };
    }
    acc[studyId].participant_id.push(participant.participant_id);
    return acc;
  }, {});
  
  // Convert to array format
  return Object.values(studyGroups);
};

// Helper function to truncate signed CloudFront URLs at .json
export const truncateSignedUrl = (url) => {
  if (!url || typeof url !== 'string') return url;

  const jsonIndex = url.indexOf('.json');
  if (jsonIndex !== -1) {
    return url.substring(0, jsonIndex + 5); // +5 to include ".json"
  }

  return url; // Return original if no .json found
};

// Centralized CCDI Hub export utility
export const exportToCCDIHub = async (participants, options = {}) => {
  const {
    showAlert,
    useInteropService = true,
    onLoadingStateChange
  } = options;

  // Validate input
  if (!participants || !Array.isArray(participants) || participants.length === 0) {
    if (showAlert) showAlert('error', 'No participants available for export.');
    return null;
  }

  // Extract configuration constants
  const { CCDI_HUB_BASE_URL, CCDI_INTEROP_SERVICE_URL } = await import('../../bento/cohortModalData');

  try {
    if (useInteropService) {
      // Use the robust interop service approach (recommended)
      if (onLoadingStateChange) onLoadingStateChange(true);

      const manifestPayload = getManifestPayload(participants);
      if (!manifestPayload || manifestPayload.length === 0) {
        throw new Error('Unable to generate manifest payload from participants');
      }

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
            manifestString: JSON.stringify(manifestPayload),
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
        const participantCount = manifestPayload ? manifestPayload.length : 0;
        throw new Error(`CCDI Interop Service Error: ${errorMessage} (Processing ${participantCount} study groups)`);
      }

      // Process and open the URL
      const processedUrl = result.data.storeManifest ? truncateSignedUrl(result.data.storeManifest) : null;
      if (!processedUrl) {
        throw new Error('No valid URL returned from interop service');
      }

      const finalUrl = `${CCDI_HUB_BASE_URL}${processedUrl}`;
      window.open(finalUrl, '_blank');

      if (showAlert) showAlert('success', 'CCDI Hub opened in new tab!');
      return finalUrl;

    } else {
      // Fallback to direct URL construction (legacy approach)
      console.warn('Using legacy direct URL construction. Consider updating to interop service approach.');

      const participantIds = participants.map(p => p.participant_id).join("|");
      const dbgapAccessions = [...new Set(participants.map(p => p.dbgap_accession))].join("|");

      const baseUrl = "https://ccdi.cancer.gov/explore?p_id=";
      const dbgapBase = "&dbgap_accession=";

      const finalUrl = `${baseUrl}${participantIds}${dbgapBase}${dbgapAccessions}`;

      // Check for potential URL length issues
      if (finalUrl.length > 2000) {
        console.warn('Generated URL may be too long for some browsers. Consider using interop service approach.');
      }

      window.open(finalUrl, '_blank');
      if (showAlert) showAlert('success', 'CCDI Hub opened in new tab!');
      return finalUrl;
    }

  } catch (error) {
    console.error('Error exporting to CCDI Hub:', error);
    if (showAlert) {
      showAlert('error', `Failed to export to CCDI Hub: ${error.message}`);
    }
    return null;
  } finally {
    if (onLoadingStateChange) onLoadingStateChange(false);
  }
};

