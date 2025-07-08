import React from "react";
import figure1 from "../../../../assets/explore/C3DCFacetLocalFindSearchIcon.svg";

const OverviewSection = ({ classes }) => (
  <>
    <div id="Overview" className={classes.sectionTitle}>
      <p>Overview</p>
    </div>
    <div className={classes.contentContainer}>
      <p>
        The <a href="/explore">CCDI Hub Explore Dashboard</a> is a tool that
        allows for the exploration of participant-level, diagnoses, studies,
        samples, and files information for CCDI-managed data sets...
      </p>
      <div className={classes.figureContainer}>
        <img src={figure1} style={{ width: "40%" }} alt="Figure1" />
      </div>
      <div className={classes.figureText}>
        Figure 1: CCDI Hub Explore Dashboard and Cart features
      </div>
      <p>
        Step-by-step instructions for finding and exporting data are included
        below.
      </p>
    </div>
  </>
);

export default OverviewSection;
