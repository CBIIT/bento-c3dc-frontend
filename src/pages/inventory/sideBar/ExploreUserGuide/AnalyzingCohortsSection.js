import React from "react";
import figure8 from "./images/figure8.png";
import figure9 from "./images/figure9.png";

const AnalyzingCohortsSection = ({ classes }) => (
  <div>
    <div id="Analyzing Cohorts" className={classes.sectionTitle}>
      <p>Analyzing Cohorts</p>
    </div>
    <div className={classes.contentContainer}>
      <p>
        The{" "}
        <a
          href="/cohortAnalyzer"
          target="_blank"
          rel="noopener noreferrer"
          className={classes.link}
        >
          C3DC Cohort Analyzer
        </a>{" "}
        is an interactive tool that enables users to compare up to three cohorts
        based on clinical attributes like participant ID, diagnosis, and
        treatment. It uses a dynamic Venn diagram and a corresponding data table
        to visualize shared and distinct characteristics across selected
        cohorts. This allows researchers to uncover important patterns, such as
        common treatment protocols or overlapping diagnoses.
      </p>
      <p>
        Users can toggle comparisons using radio buttons to explore comparisons
        between participant IDs, diagnoses, and treatments. Export options
        include <code>CSV</code> and <code>JSON</code> formats, or users may
        export cohort selections back to the{" "}
        <a href="/explore">
          C3DC Explore Dashboard
        </a>{" "}
        or the{" "}
        <a
          href="https://ccdi.cancer.gov/explore"
          target="_blank"
          rel="noopener noreferrer"
          className={classes.link}
        >
          CCDI Hub Explore Dashboard
        </a>
        .
      </p>
      <p>
        To begin analysis, navigate to the Cohort Analyzer either via the “View
        All Cohorts” button (Figure 6F) or from the link at the top of the
        Explore Dashboard page (Figure 8).
      </p>
      <div className={classes.figureContainer}>
        <img src={figure8} style={{ width: "75%" }} alt="Figure 8" />
      </div>
      <div className={classes.figureText}>
        Figure 8: Link to Cohort Analyzer
      </div>

      <p>
        Users select cohorts via the Cohort Selector on the left (Figure 9A),
        which dynamically updates the Venn diagram (Figure 9B) and the data
        table (Figure 9C).
      </p>
      <div className={classes.figureContainer}>
        <img src={figure9} style={{ width: "85%" }} alt="Figure 9" />
      </div>
      <div className={classes.figureText}>Figure 9: C3DC Cohort Analyzer</div>

      <p>
        As cohorts are added, intersections and unique data points appear in the
        Venn diagram, and the table reflects participant-level details. Clicking
        specific Venn sections isolates participant subsets. You can also create
        new cohorts from these selections (Figure 9D).
      </p>
      <p>
        Use radio buttons (Figure 9E) to toggle between comparisons of
        Participant IDs, Diagnoses, and Treatment types. Table results can be
        downloaded, and selections exported back to C3DC or CCDI Explore
        Dashboards.
      </p>
      <p>
        <strong>Note:</strong> Numbers in parentheses next to cohort names in
        the Venn diagram indicate the count of unique records for the selected
        comparison type. Counts within the Venn sections represent the number of
        overlapping or unique values. The number beside each cohort in the
        sidebar reflects total participants (Figures 9A & 9B).
      </p>
    </div>
  </div>
);

export default AnalyzingCohortsSection;
