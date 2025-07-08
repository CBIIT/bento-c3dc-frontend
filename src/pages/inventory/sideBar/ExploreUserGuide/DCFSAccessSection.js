// components/ExploreUserGuide/DCFSAccessSection.js
import React from 'react';
import figureB1 from '../../../../assets/explore/C3DCFacetLocalFindSearchIcon.svg';
import figureB2 from '../../../../assets/explore/C3DCFacetLocalFindSearchIcon.svg';
import figureB3 from '../../../../assets/explore/C3DCFacetLocalFindSearchIcon.svg';

const DCFSAccessSection = ({ classes, handleOnClickManifest }) => (
  <div>
    <div id='NCI Data Commons Framework Services (DCFS): Controlled Data Access Instructions' className={classes.sectionTitle}>
      <p>NCI Data Commons Framework Services (DCFS): Controlled Data Access Instructions</p>
    </div>
    <div className={classes.contentContainer}>
      <p>
        NCI DCFS, powered by <a className={classes.link} href="https://gen3.org" target="_blank" rel="noopener noreferrer">Gen3</a>, enables secure and scalable access to controlled data via digital object identifiers (DOIs) from Indexd service.
      </p>
      <p>
        Researchers must authenticate via <a className={classes.link} href="https://public.era.nih.gov/commonsplus/public/login.era" target="_blank" rel="noopener noreferrer">NIH eRA Commons</a> and obtain access via a <a className={classes.link} href="https://nci-crdc.datacommons.io/login" target="_blank" rel="noopener noreferrer">DCFS login account</a>.
      </p>
    </div>

    <div className={classes.sectionSubTitle}>
      <p>File Download Procedure via User Interface</p>
    </div>
    <div className={classes.contentContainer}>
      <ol>
        <li>
          Go to <a className={classes.link} href="https://nci-crdc.datacommons.io" target="_blank" rel="noopener noreferrer">nci-crdc.datacommons.io</a> and click “RAS Login” (Figure B1).
          <div className={classes.figureContainer}><img src={figureB1} style={{ width: '80%' }} alt='FigureB1' /></div>
          <div className={classes.figureText}>Figure B1: RAS Login on NIH DCF homepage</div>
        </li>
        <li>
          Access your project permissions under “Profile” (Figure B2).
          <div className={classes.figureContainer}><img src={figureB2} style={{ width: '80%' }} alt='FigureB2' /></div>
          <div className={classes.figureText}>Figure B2: DCF Profile and accessible projects</div>
        </li>
        <li>Create a direct download URL using file GUID.</li>
        <li>Paste it in a browser to retrieve a signed URL.</li>
        <li>
          Use the signed URL to download the file (Figure B3).
          <div className={classes.figureContainer}><img src={figureB3} style={{ width: '100%' }} alt='FigureB3' /></div>
          <div className={classes.figureText}>Figure B3: File download using signed URL</div>
        </li>
      </ol>
      <p>
        For help, contact <a href="mailto:NCIChildhoodCancerDataInitiative@mail.nih.gov" target="_blank" rel="noopener noreferrer">CCDI mailbox</a>.
      </p>
    </div>

    <div className={classes.sectionSubTitle}>
      <p>File Download Procedure via Command Line Interface (CLI) client</p>
    </div>
    <div className={classes.contentContainer}>
      <ol>
        <li>
          Download the <a className={classes.link} href="https://github.com/uc-cdis/cdis-data-client" target="_blank" rel="noopener noreferrer">Gen3-client</a>.
        </li>
        <li>
          Configure using <a className={classes.link} href="https://gen3.org/resources/user/gen3-client/#1-installation-instructions" target="_blank" rel="noopener noreferrer">Gen3 instructions</a>.
        </li>
        <li>
          Obtain GUIDs or manifest from <a href="/explore">CCDI Explore</a> or 
          <span className={classes.linkButtonStyle} onClick={handleOnClickManifest}>Explore Dashboard manifest</span>.
        </li>
        <li>Create a structured JSON manifest using object_ids.</li>
        <li>
          Download files using single or multi-download mode as shown in
          <a className={classes.link} href="https://gen3.org/resources/user/gen3-client/#4-download-a-single-data-file-using-a-guid" target="_blank" rel="noopener noreferrer">Gen3 documentation</a>.
        </li>
      </ol>
    </div>
  </div>
);

export default DCFSAccessSection;
