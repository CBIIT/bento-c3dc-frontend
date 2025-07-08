// components/ExploreUserGuide/FindDataSection.js
import React from "react";
import figure2 from "./images/figure2.png";
import figure3 from "./images/figure3.png";
import figure4 from "./images/figure4.png";

const FindDataSection = ({ classes }) => (
  <div>
    <div
      id="Finding Participants, Studies, Samples, and Files"
      className={classes.sectionTitle}
    >
      <p>Finding Participants and Studies</p>
    </div>
    <div className={classes.contentContainer}>
      <p>
        The <a href="/explore">C3DC Explore Dashboard</a> provides row-level
        metadata and harmonized clinical data for participants with features
        including faceted filters, select visualizations, and an exportable
        table of results. The dashboard is participant-centric, meaning that
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
          2A). Filtering options include:
          <ul>
            <li>
              Upload list of participant IDs (in “DEMOGRAPHICS”, Figure 2B)
            </li>
            <li>
              Text searches (e.g., “DIAGNOSIS”, “DIAGNOSIS ANATOMIC SITE”,
              Figure 2C)
            </li>
            <li>Numerical sliders (e.g., “AGE AT DIAGNOSIS”, Figure 2D)</li>
            <li>Checkbox selections for other properties</li>
          </ul>
          Multiple criteria can be applied simultaneously. Selections can be
          viewed or cleared in the query summary above the visual widgets
          (Figure 2E).
          <div className={classes.figureContainer}>
            <img src={figure2} style={{ width: "85%" }} alt="Figure 2" />
          </div>
          <div className={classes.figureText}>
            Figure 2: Full facet list in C3DC Explore Dashboard with highlights
            of various facet types and query display/clear function
          </div>
        </li>

        <li>
          Filtering will update the visualizations and result tables in the
          dashboard (Figure 3). Note: only the top 20 values are shown for
          visualizations like Diagnosis and Anatomic Site when more than 20
          values are returned.
          <br />
          Each results table includes:
          <ul>
            <li>
              <strong>Studies:</strong> Displays links to C3DC studies’ pages on{" "}
              <a
                href="https://dbgap.ncbi.nlm.nih.gov/"
                target="_blank"
                rel="noopener noreferrer"
                className={classes.link}
              >
                dbGaP
              </a>
              .
            </li>
            <li>
              <strong>Participants:</strong> De-identified information with
              mappings via the{" "}
              <a
                href="https://ccdi.cancer.gov/ccdi-participant-index"
                target="_blank"
                rel="noopener noreferrer"
                className={classes.link}
              >
                CCDI Participant Index (CPI)
              </a>
              .
            </li>
            <li>
              <strong>Diagnosis:</strong> Metadata and harmonized
              diagnosis-related data.
            </li>
            <li>
              <strong>Treatment:</strong> Metadata and harmonized
              treatment-related data.
            </li>
            <li>
              <strong>Treatment Outcome:</strong> Data related to treatment
              results.
            </li>
            <li>
              <strong>Survival:</strong> Participant survival information.
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
          You can show, hide, and copy the URL used to construct your filtered
          view using the toggle and copy buttons above the visualization widgets
          (Figure 4).
          <div className={classes.figureContainer}>
            <img src={figure4} style={{ width: "75%" }} alt="Figure 4" />
          </div>
          <div className={classes.figureText}>
            Figure 4: Toggle button, clear and copy query URL features
          </div>
        </li>
      </ol>
    </div>
  </div>
);

export default FindDataSection;
