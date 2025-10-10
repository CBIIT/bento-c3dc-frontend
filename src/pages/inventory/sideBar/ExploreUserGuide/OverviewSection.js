import React from "react";
import figure1 from "./images/figure1.png";

const OverviewSection = ({ classes }) => (
  <>
    <div id="Overview" className={classes.sectionTitle}>
      <p>Overview</p>
    </div>
    <div className={classes.contentContainer}>
      <p>
        The{" "}
        <a href="/explore">
          C3DC Explore Dashboard
        </a>{" "}
        allows for the exploration of demographic and harmonized clinical data
        of childhood cancers. These data have been harmonized to standard common
        data elements (CDEs) to facilitate efficient and effective data
        integration and analysis of participant data across studies. In the C3DC
        Explore Dashboard, users can filter the harmonized data using facets
        based on properties and values defined in the C3DC Data Model.
      </p>
      <p>
        Upon interaction with these filters (Figure 1A), users can review
        clinical information through visual summaries (Figure 1B) and browse the
        row-level data in tabs organized by studies and participants as well as
        participant-associated diagnosis, treatment, treatment response, survival
        data, and genetic analysis (Figure 1C) to determine which data sets are
        applicable to their research questions. Users can then download tabular
        metadata in the format of CSV or JSON at the currently selected tabs in
        the data table (Figure 1D). A statistics bar at the top reflects current
        numbers of diagnoses, participants, and studies filtered (Figure 1E).
        Users can also build synthetic cohort (up to 4000 participants each
        cohort) and manage up to 20 cohorts. Users can further compare synthetic
        cohorts in the{" "}
        <a href="/cohortAnalyzer" className={classes.link} target="_blank" rel="noopener noreferrer">
          C3DC Cohort Analyzer
        </a>
        , and export synthetic cohorts back to the C3DC Explore Dashboard or to
        the{" "}
        <a href="https://ccdi.cancer.gov/explore" className={classes.link} target="_blank" rel="noopener noreferrer">
          CCDI Hub Explore Dashboard
        </a>
        . For additional help and guidance on the Explore Page features, users
        can click the User Guide button for the quick access (Figure 1F).
      </p>
      <div className={classes.figureContainer}>
        <img src={figure1} style={{ width: "85%" }} alt="Figure1" />
      </div>
      <div className={classes.figureText}>
        Figure 1: C3DC Explore Dashboard Features
      </div>
    </div>
  </>
);

export default OverviewSection;
