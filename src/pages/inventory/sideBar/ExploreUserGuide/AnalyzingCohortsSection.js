import React from "react";
import figure9 from "./images/figure9.png";
import figure10 from "./images/figure10.png";

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
        between participant IDs, diagnoses and treatments. Users may export results in CSV or JSON formats or export cohort selections into the{" "}
        <a href="/explore">
          C3DC Explore Dashboard
        </a>{" "}
        or{" "}
        <a
          href="https://ccdi.cancer.gov/explore"
          target="_blank"
          rel="noopener noreferrer"
          className={classes.link}
        >
          CCDI Hub Explore Dashboard
        </a>{" "}
        for additional analysis or to find files associated with cohort.
      </p>
      <p>
        To begin analysis, navigate to the Cohort Analyzer either via the button in the View All Cohort view in C3DC Explore Dashboard (Figure 8F) or from the link at top of C3DC Explore Dashboard page (Figure 9).
      </p>
      <div className={classes.figureContainer}>
        <img src={figure9} style={{ width: "75%" }} alt="Figure 9" />
      </div>
      <div className={classes.figureText}>
        Figure 9: Link to Cohort Analyzer
      </div>

      <div className={classes.figureContainer}>
        <img src={figure10} style={{ width: "85%" }} alt="Figure 10" />
      </div>
      <div className={classes.figureText}>Figure 10: C3DC Cohort Analyzer landing page</div>

      <p>
        Users then select cohorts via the Cohort Selector on left hand side (Figure 10A), which dynamically updates the Venn diagram (Figure 10B) and data table (Figure 10C)
      </p>

      <p>
        As cohorts are selected, intersections and unique data points are visually represented in the Venn Diagram, and the table reflects participant-level details. Users can click on specific Venn diagram sections (Figure 10B) to isolate and examine overlapping or unique participant data, with options to create new cohorts from selected groups (Figure 10D, 'Create New Cohort'). Users can toggle between comparisons of Participant IDs, Diagnoses and Treatment types in the Venn diagram by selecting data category radio buttons (Figure 10E).
      </p>

      <p>
        Users can also explore the Cohort Analyzer functionality with example cohorts that are automatically loaded to user's cohort list by selecting the 'Add Example Cohorts' button (Figure 10F). Clinical Summary bar charts (Figure 10G) provide visual comparisons of demographic and clinical properties between cohorts. These can be expanded to show categorical values beyond the six most frequent values by toggling the expand button (Figure 10H). Which clinical summary bar charts are displayed can be toggled with the check boxes above the clinical summary bar chart display (Figure 10I).
      </p>

      <p>
        Users can download table results, export Venn diagram cohort selections back to the C3DC Explore Dashboard or export Venn diagram cohort selections to the CCDI Hub Explore Dashboard using buttons listed above the data table (Figure 10D). PNG images of Venn diagram (Figure 10J) and clinical summary bar charts (Figure 10H) can also be downloaded by selecting the associated download buttons.
      </p>

      <p>
        Please note that the number in parentheses by the cohort's name in the Venn diagram represents the count of unique records for that radio button selection (Figure 10B). The number inside the Venn diagram sections are the count of unique values for that radio button selection (Figure 10B). Finally, the count next to your cohort in the Cohort Selection side bar indicates the total participants in your cohort (Figure 10A).
      </p>
    </div>
  </div>
);

export default AnalyzingCohortsSection;
