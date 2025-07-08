// components/ExploreUserGuide/StudyMetadataSection.js
import React from 'react';
import figure10 from '../../../../assets/explore/C3DCFacetLocalFindSearchIcon.svg';
import figure11 from '../../../../assets/explore/C3DCFacetLocalFindSearchIcon.svg';

const StudyMetadataSection = ({ classes }) => (
  <div>
    <div id='Downloading Metadata from the Studies tab' className={classes.sectionTitle}>
      <p>Downloading Metadata from the Studies tab</p>
    </div>
    <div className={classes.contentContainer}>
      <p>
        From the CCDI Hub Explore Dashboard, you can download all open metadata for each study from the “Studies” tab to further filter data and build cohorts. For example, you can filter by diagnosis to generate a set of participants and upload the manifest into the CGC.
      </p>
      <ol>
        <li>Open the “STUDY” filters from the left menu, expand “STUDY NAME,” and select “Molecular Characterization Initiative.”</li>
        <li>The dashboard will reload, filtered for this study.</li>
        <li>Navigate to the “Studies” tab and locate the “Manifest” column.</li>
        <li>
          Click the “Download study manifest” icon (Figure 10).
          <div className={classes.figureContainer}><img src={figure10} style={{ width: '90%' }} alt='Figure10' /></div>
          <div className={classes.figureText}>Figure 10: Download metadata manifest for a given study</div>
        </li>
        <li>
          Open the downloaded file on your computer to view metadata (Figure 11).
          <div className={classes.figureContainer}><img src={figure11} style={{ width: '80%' }} alt='Figure11' /></div>
          <div className={classes.figureText}>Figure 11: Study metadata export file browsable on local machine</div>
        </li>
      </ol>
      <p>Appendix A details how to generate a DRS manifest from this metadata to use in CGC.</p>
    </div>
  </div>
);

export default StudyMetadataSection;
