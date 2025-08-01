import { DOWNLOAD_MANIFEST_KEYS } from '../../bento/cohortModalData.js';

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

