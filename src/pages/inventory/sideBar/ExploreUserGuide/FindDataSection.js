// components/ExploreUserGuide/FindDataSection.js
import React from "react";
import figure2 from "./images/figure2.png";
import figure3 from "./images/figure3.png";
import figure4 from "./images/figure4.png";
import figure5 from "./images/figure5.png";

const FindDataSection = ({ classes }) => (
  <div>
    <div
      id="Finding Participants, Studies, Samples, and Files"
      className={classes.sectionTitle}
    >
      Finding Participants and Studies
    </div>
    <div className={classes.contentContainer}>
      <p>
        The <a href="/explore">C3DC Explore Dashboard</a> provides row-level
        metadata and harmonized clinical data for participants with features
        including faceted filters, select visualizations, and an exportable
        table of results. The C3DC Explore Dashboard is participant-centric, meaning that
        filtering criteria and results return de-identified information about a
        participant and their related studies and harmonized clinical data.
      </p>

      <p>
        <strong>
          To find and filter information on the C3DC Explore Dashboard:
        </strong>
      </p>

      <ol>
        <li>
          Available facets to filter are displayed in the left panel (Figure
          2A). Faceted filtering may be done by uploading a list of participant IDs (in "DEMOGRAPHICS" Figure 2B), text searches ("DIAGNOSIS," "DIAGNOSIS ANATOMIC SITE" Figure 2C), numerical sliders for age properties (e.g. "AGE AT DIAGNOSIS", Figure 2D), or checkbox selections for the remaining properties. You can apply multiple filtering criteria at the same time in a search. You can view and clear your current selection(s) in the query summary above the visualization widgets (Figure 2E).
          <div className={classes.figureContainer}>
            <img src={figure2} style={{ width: "85%" }} alt="Figure 2" />
          </div>
          <div className={classes.figureText}>
            Figure 2: Full facet list in C3DC Explore Dashboard with highlights
            of various facet types and query display/clear function
          </div>
        </li>

        <li>
          Filtering your search will update the C3DC Explore Dashboard's visualizations and the results tables (Figure 3). Please note that for the Diagnosis and Anatomic Site visualizations, only the top 20 values will be displayed when there are &gt; 20 values returned from the faceted filer set. Users can easily switch between pie chart and histogram to explore the visual summaries. Each visual summary can be downloaded as PNG file with the download button. Each results table will be updated with information on the studies and participants that meet the filtered criteria. Information displayed in each table is described below:
          <ul>
            <li>
              <strong>"Studies":</strong> The Study tab displays links for C3DC studies to their associated study page in dbGaP. Participants, diagnosis, genetic analysis, treatment, treatment outcome and survival data all belong to a C3DC study.
            </li>
            <li>
              <strong>"Participants":</strong> Characteristics of a participant in the C3DC Explore Dashboard. Participants belong to a study, and they may have one or more diagnoses, treatment, treatment outcome or survival entries associated with them. Participants with mappings through the CCDI Participant Index (CPI) have a summary of these mappings available from this view. To view CPI synonym mappings, users can hover over the participant of interest, and a tooltip would appear for user to click on.
            </li>
            <li>
              <strong>"Diagnosis":</strong> Metadata and harmonized clinical data related to the participant diagnosis entries.
            </li>
            <li>
              <strong>"Treatment":</strong> Metadata and harmonized clinical data related to the participant treatment entries.
            </li>
            <li>
              <strong>"Treatment Outcome":</strong> Metadata and harmonized clinical data related to the participant treatment outcome entries.
            </li>
            <li>
              <strong>"Survival":</strong> Metadata and harmonized clinical data related to the participant survival entries.
            </li>
            <li>
              <strong>"Genetic Analysis":</strong> Metadata and harmonized clinical data related to the participant genetic analysis entries.
            </li>
          </ul>
          <div className={classes.figureContainer}>
            <img src={figure3} style={{ width: "80%" }} alt="Figure 3" />
          </div>
          <div className={classes.figureText}>
            Figure 3: C3DC Explore Dashboard visualizations and results tables
            with arrows pointing to the available informational tables
          </div>
        </li>

        <li>
          Visible columns in each table can be customized by clicking the "View columns" button in the upper righthand corner of the table and selecting or deselecting available columns (Figure 4). Note that some fields cannot be unselected and will always be displayed.
          <div className={classes.figureContainer}>
            <img src={figure4} style={{ width: "75%" }} alt="Figure 4" />
          </div>
          <div className={classes.figureText}>
            Figure 4: View columns customization feature
          </div>
        </li>

        <li>
          You can show, hide, and copy the URL used to construct your filtered
          view using the toggle and copy buttons above the visualization widgets
          (Figure 5).
          <div className={classes.figureContainer}>
            <img src={figure5} style={{ width: "75%" }} alt="Figure 5" />
          </div>
          <div className={classes.figureText}>
            Figure 5: Toggle button, clear and copy query URL features
          </div>
        </li>
      </ol>
    </div>
  </div>
);

export default FindDataSection;
