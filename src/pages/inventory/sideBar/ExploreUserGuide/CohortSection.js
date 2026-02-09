import React from "react";
import figure7 from "./images/figure7.png";
import figure8 from "./images/figure8.png";
import figure9 from "./images/figure9.png";

const CohortSection = ({ classes }) => (
  <div>
    <div id="Creating and managing cohorts" className={classes.sectionTitle}>
      Creating and Managing Cohorts
    </div>
    <div className={classes.contentContainer}>
      <p>
        The Cohort Selector enables users to create a cohort with a size of up to 4,000 and to manage up to 20 cohorts. This feature offers flexibility in managing groups of filtered results to researchers, allowing them to create and update cohort groups according to their specific requirements.
      </p>

      <h4>
        <strong>Creating a New Cohort</strong>
      </h4>
      <p>
        Using the process described in Finding Participants and Studies, apply any filters of interest from the lefthand facet menu.
      </p>
      <p>
        To add participants to a new cohort, users can either:
      </p>
      <ul>
        <li>
          Select rows from the results table by selecting checkmark boxes in the leftmost column of results table (Figure 7A) and then select 'Selected Participants' from drop down menu (Figure 7C),
        </li>
        <li>
          Toggle the "select all visible rows" checkbox in the upper left-hand corner of the table to select participants or participants from data currently displayed in table (Figure 7B) and then select 'Selected Participants' from drop down menu (Figure 7C),
        </li>
        <li>
          Or choose to add all participants returned based on the faceted results by selecting the "All Participants" option from the "Create New Cohort" button (Figure 7C). Note that a user can add up to 4,000 participants to each cohort.
        </li>
      </ul>
      <div className={classes.figureContainer}>
        <img src={figure7} style={{ width: "80%" }} alt="Figure 7" />
      </div>
      <div className={classes.figureText}>
        Figure 7: Cohort creation with either Selected Participants or All
        Participants from faceted filters
      </div>

      <p>Alternatively, users can add selected participants or all participants in a facet filter to an existing cohort by selecting the "Add Participants to Existing Cohort" drop down menu, then selecting the target cohort and finally selecting from "All Participants" or "Selected Participants" (Figure 8).</p>

      <div className={classes.figureContainer}>
        <img src={figure8} style={{ width: "80%" }} alt="Figure 8" />
      </div>
      <div className={classes.figureText}>
        Figure 8: Add either selected participants or all participants in a filtered query to an existing cohort.
      </div>

      <h4>
        <strong>View All and Update Cohorts</strong>
      </h4>
      <p>
        Selecting the "View All Cohort" Button in the C3DC Explore Dashboard will display a pop-up window to manage saved cohorts (Figure 9):
      </p>
      <ul>
        <li>
          <strong>Cohort ID</strong>: Create your own ID to identify saved cohorts (Figure 9A)
        </li>
        <li>
          <strong>Cohort Description</strong>: Create a description for saved cohorts (Figure 9A)
        </li>
        <li>
          Remove participants from a selected cohort by selecting trash can icon (Figure 9B)
        </li>
        <li>
          Remove all or individual cohorts from created cohorts list by selecting trash can icon (Figure 9C)
        </li>
        <li>
          Copy an existing cohort and add or remove participants from the copy (Figure 9C).
        </li>
        <li>
          <strong>Save Changes</strong>: Save the changes made to the selected cohort. This includes changes to cohort ID, cohort description, and any participants removed (Figure 9D).
        </li>
        <li>
          <strong>Participant ID Search bar</strong>: Check if a participant ID has been added to cohort (Figure 9E)
        </li>
        <li>
          <strong>Download Selected Cohort</strong>: Download the selected cohort in one of two formats (Figure 9F).
          <ul>
            <li>
              <strong>Manifest CSV</strong>: a list of participant IDs and high-level data.
            </li>
            <li>
              <strong>Metadata JSON</strong>: a JSON file containing all metadata information for the participants in the selected cohort.
            </li>
          </ul>
        </li>
        <li>
          <strong>View Cohort Analyzer</strong>: Navigate to the C3DC Cohort Analyzer from the cohort list (Figure 9F).
        </li>
        <li>
          <strong>Explore in CCDI Hub</strong>: Export cohorts (up to 4,000 participants each cohort) that open the CCDI Hub with pre-filtered data based on selected participants (Figure 9F).
        </li>
      </ul>
      <div className={classes.figureContainer}>
        <img src={figure9} style={{ width: "80%" }} alt="Figure 9" />
      </div>
      <div className={classes.figureText}>
        Figure 9: Cohort management in View of All Cohorts
      </div>
    </div>
  </div>
);

export default CohortSection;
