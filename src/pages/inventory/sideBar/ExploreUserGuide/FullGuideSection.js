// components/ExploreUserGuide/FullGuideSection.js
import React from 'react';

const FullGuideSection = ({ classes }) => (
  <div>
    <div id='Full User Guide' className={classes.sectionTitle}>
      <p>Full User Guide</p>
    </div>
    <div className={classes.contentContainer}>
      <p>
        To learn more about CCDI Hub, Explore Dashboard, and accessing data, see the complete{' '}
        <a href="/user-guide.pdf" className={classes.link} target="_blank" rel="noopener noreferrer">
          User Guide
        </a>.
      </p>
    </div>
  </div>
);

export default FullGuideSection;
