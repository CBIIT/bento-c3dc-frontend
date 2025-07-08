// components/ExploreUserGuide/CohortSection.js
import React from 'react';
import figure7 from '../../../../assets/explore/C3DCFacetLocalFindSearchIcon.svg';
import figure8 from '../../../../assets/explore/C3DCFacetLocalFindSearchIcon.svg';
import figure9 from '../../../../assets/explore/C3DCFacetLocalFindSearchIcon.svg';

const CohortSection = ({ classes }) => (
  <div>
    <div id='Creating and managing cohorts' className={classes.sectionTitle}>
      <p>Creating and managing cohorts</p>
    </div>
    <div className={classes.contentContainer}>
      <p>
        From the CCDI Hub Explore Dashboard Participant table, you can group participants into cohorts to find files of interest or add files directly to the cart. To create a cohort:
      </p>
      <ol>
        <li>Apply any filters of interest from the lefthand facet menu.</li>
        <li>Select rows using checkboxes on the Participants table. You can select multiple rows or all rows.</li>
        <li>
          Click “CREATE COHORT” (Figure 7).
          <div className={classes.figureContainer}><img src={figure7} style={{ width: '70%' }} alt='Figure7' /></div>
          <div className={classes.figureText}>Figure 7: Cohort creation and management</div>
        </li>
        <li>In “View of All Cohorts”, view and manage all cohorts (Figure 8).</li>
        <li>In the selected cohort view, edit name/description, search participants, and delete them (Figure 8).</li>
        <li>
          Click “DOWNLOAD SELECTED COHORT” to export cohort metadata (Figure 8).
          <div className={classes.figureContainer}><img src={figure8} style={{ width: '40%' }} alt='Figure8' /></div>
          <div className={classes.figureText}>Figure 8: View of All Cohorts</div>
        </li>
        <li>Close the modal to return to the Participant table.</li>
      </ol>
      <p>
        Add participants to existing cohorts using “ADD PARTICIPANTS TO EXISTING COHORT” and selecting the desired cohort (Figure 9).
      </p>
      <div className={classes.figureContainer}><img src={figure9} style={{ width: '80%' }} alt='Figure9' /></div>
      <div className={classes.figureText}>Figure 9: Add Participants to Existing Cohort button</div>
      <p>
        A user can create up to 20 cohorts with a maximum of 5,000 participants each. Cohorts persist until browser history is cleared.
      </p>
    </div>
  </div>
);

export default CohortSection;
