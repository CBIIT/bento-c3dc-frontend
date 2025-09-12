import React from "react";
import figure5 from "./images/figure5.png";
import figure6 from "./images/figure6.png";

const CohortSection = ({ classes }) => (
  <div>
    <div id="Creating and managing cohorts" className={classes.sectionTitle}>
      <p>Creating and Managing Cohorts</p>
    </div>
    <div className={classes.contentContainer}>
      <p>
        The Cohort Selector enables users to create and manage up to{" "}
        <strong>20 cohorts</strong>. This feature offers flexibility to
        researchers by allowing them to create and update cohort groups
        according to their specific requirements.
      </p>

      <h4>
        <strong>Creating a New Cohort</strong>
      </h4>
      <ul>
        <li>
          Using the process described in Finding Participants and Studies, apply
          any filters of interest from the lefthand facet menu.
        </li>
        <li>
          Users can then select rows from the results table using the checkmark
          boxes in the leftmost column. Alternatively, select{" "}
          <strong>“All Participants”</strong> from the “Create New Cohort”
          button to include all participants matching the filters (Figure 5). A
          "View of All Cohorts" pop-up window will open when at least one
          participant row is selected. A cohort can include up to{" "}
          <strong>4,000 participants</strong>.
        </li>
      </ul>
      <div className={classes.figureContainer}>
        <img src={figure5} style={{ width: "80%" }} alt="Figure 5" />
      </div>
      <div className={classes.figureText}>
        Figure 5: Cohort creation with either Selected Participants or All
        Participants from faceted filters
      </div>

      <p>From the "View of All Cohorts" window, users can:</p>
      <ul>
        <li>
          Update the <strong>Cohort ID</strong> and <strong>Description</strong>{" "}
          (Figure 6A)
        </li>
        <li>
          View and delete <strong>Participants</strong> (Figure 6B)
        </li>
        <li>
          Delete entire <strong>Cohorts</strong> (Figure 6C)
        </li>
        <li>
          Click <strong>“Save Changes”</strong> to save all modifications
          (Figure 6D)
        </li>
      </ul>

      <div className={classes.figureContainer}>
        <img src={figure6} style={{ width: "80%" }} alt="Figure 6" />
      </div>
      <div className={classes.figureText}>
        Figure 6: Cohort management in View of All Cohorts
      </div>

      <h4>
        <strong>View All and Update Cohorts</strong>
      </h4>
      <p>
        Selecting the <strong>“View All Cohorts”</strong> button in the{" "}
        <a href="/explore">C3DC Explore Dashboard</a> opens a management window
        for all saved cohorts. Features include:
      </p>
      <ul>
        <li>
          <strong>Cohort ID</strong>: Create a unique ID to identify your cohort
          (Figure 6A)
        </li>
        <li>
          <strong>Cohort Description</strong>: Add descriptive context (Figure
          6A)
        </li>
        <li>
          <strong>Save Changes</strong>: Apply updates (Figure 6D)
        </li>
        <li>
          <strong>Participant ID Search</strong>: Look up participant presence
          in cohort (Figure 6E)
        </li>
        <li>
          <strong>Download Selected Cohort</strong>:
          <ul>
            <li>
              <strong>Manifest CSV</strong>: Contains participant IDs and
              high-level data
            </li>
            <li>
              <strong>Metadata JSON</strong>: Full metadata for the cohort
            </li>
          </ul>
        </li>
        <li>
          <strong>View Cohort Analyzer</strong>: Launches the{" "}
          <a
            href="/cohortAnalyzer"
            target="_blank"
            rel="noopener noreferrer"
            className={classes.link}
          >
            C3DC Cohort Analyzer
          </a>
        </li>
        <li>
          <strong>Explore in CCDI Hub</strong>: Exports cohorts to the{" "}
          <a
            href="https://ccdi.cancer.gov/explore"
            target="_blank"
            rel="noopener noreferrer"
            className={classes.link}
          >
            CCDI Hub Explore Dashboard
          </a>{" "}
          with pre-filtered data (Figure 6F)
        </li>
      </ul>
    </div>
  </div>
);

export default CohortSection;
