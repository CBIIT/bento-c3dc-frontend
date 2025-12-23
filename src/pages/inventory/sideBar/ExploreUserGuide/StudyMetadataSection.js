import React from 'react';
import figure5 from "./images/figure5.png";;

const StudyMetadataSection = ({ classes }) => (
  <div>
    <div id='Downloading Metadata from the Studies tab' className={classes.sectionTitle}>
      Downloading Participant Metadata and Harmonized Clinical Data
    </div>
    <div className={classes.contentContainer}>
      <p>
     Users can download the table contents of the Studies, Participants, Diagnosis, Treatment, Treatment Response, Survival, and Genetic Analysis tabs by selecting the "Download Data" button under the table tab headers (Figure 5). Users can download filtered data in CSV with high-level metadata or JSON format with comprehensive clinical metadata (including CPI synonyms). 
      </p>
      <div className={classes.figureContainer}>
        <img src={figure5} style={{ width: '80%' }} alt='Figure 5' />
      </div>
      <div className={classes.figureText}>
        Figure 5: Download Data buttons feature two different download formats, CSV or JSON
      </div>
    </div>
  </div>
);

export default StudyMetadataSection;
