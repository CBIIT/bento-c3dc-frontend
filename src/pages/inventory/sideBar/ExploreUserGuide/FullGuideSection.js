import React from "react";

const FullGuideSection = ({ classes }) => (
  <div>
    <div id="Full User Guide" className={classes.sectionTitle}>
      <p>Full User Guide</p>
    </div>
    <div className={classes.contentContainer}>
      <p>
        To learn more about the{" "}
        <a href="/explore">
          C3DC Explore Dashboard
        </a>{" "}
        and accessing harmonized clinical data, please see the complete{" "}
        <a
          href="/user_guide"
          className={classes.link}
          target="_blank"
          rel="noopener noreferrer"
        >
          User Guide
        </a>
        .
      </p>
    </div>
  </div>
);

export default FullGuideSection;
