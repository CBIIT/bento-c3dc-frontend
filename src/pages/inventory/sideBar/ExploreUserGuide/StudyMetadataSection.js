import React from 'react';
import figure7 from "./images/figure7.png";;

const StudyMetadataSection = ({ classes }) => (
  <div>
    <div id='Downloading Metadata from the Studies tab' className={classes.sectionTitle}>
      <p>Downloading Participant Metadata and Harmonized Clinical Data</p>
    </div>
    <div className={classes.contentContainer}>
      <p>
        Users can download the table contents of the <strong>Studies, Participants, Diagnosis, Treatment, Treatment Response</strong>, and <strong>Survival</strong> tabs by selecting the <strong>"Download Data"</strong> button under the table tab headers (Figure 5).
        Filtered data can be downloaded in either <code>CSV</code> or <code>JSON</code> format.
      </p>
      <div className={classes.figureContainer}>
        <img src={figure7} style={{ width: '80%' }} alt='Figure 5' />
      </div>
      <div className={classes.figureText}>
        Figure 7: Download Data buttons feature two different download formats, CSV or JSON
      </div>
    </div>
  </div>
);

export default StudyMetadataSection;
