const downloadManifestKeys = {
    'Participant Id': 'participant_id',
    'dbGaP Accession': 'dbgap_accession',
    'Sex at Birth': 'sex_at_birth',
    'Race': 'race',
    'Diagnosis': 'diagnosis',
}

function createFileName(isManifest, cohortID) {
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

function removeTypename(obj) {
    if (Array.isArray(obj)) {
      return obj.map(item => removeTypename(item));
    } else if (typeof obj === 'object' && obj !== null) {
      const newObj = {};
      Object.keys(obj).forEach(key => {
        if (key !== '__typename') {
          newObj[key] = removeTypename(obj[key]);
        }
      });
      return newObj;
    }
    return obj; 
  };

export const arrayToCSVDownload = (arr, cohortID) => {
    const keys = Object.keys(downloadManifestKeys);
    const header = keys.join(',');
    const rows = arr.map((row) => {
        return keys.map((k) => {
            let value = row[downloadManifestKeys[k]] !== undefined ? row[downloadManifestKeys[k]] : '';
            if (typeof value === 'string' && (value.includes(',') || value.includes('"'))) {
                value = `"${value.replace(/"/g, '""')}"`; 
            }
            return value;
        }).join(',');
    });

    const csvData = [header, ...rows].join('\n')

    const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8' });
    const JsonURL = window.URL.createObjectURL(blob);
    let tempLink = '';
    tempLink = document.createElement('a');
    tempLink.setAttribute('href', JsonURL);
    tempLink.setAttribute('download', createFileName(true, cohortID));
    document.body.appendChild(tempLink);
    tempLink.click();
    document.body.removeChild(tempLink);
};

export const objectToJsonDownload = (obj, cohortID) => {
    const cleanedObj = removeTypename(obj);
  
    const json = JSON.stringify({ [cohortID]: cleanedObj }, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const JsonURL = window.URL.createObjectURL(blob);
    
    let tempLink = document.createElement('a');
    tempLink.setAttribute('href', JsonURL);
    tempLink.setAttribute('download', createFileName(false, cohortID));
    document.body.appendChild(tempLink);
    tempLink.click();
    document.body.removeChild(tempLink);
  };