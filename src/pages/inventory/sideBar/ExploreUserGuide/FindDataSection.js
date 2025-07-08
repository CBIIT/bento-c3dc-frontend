// components/ExploreUserGuide/FindDataSection.js
import React from "react";
import figure2 from "../../../../assets/explore/C3DCFacetLocalFindSearchIcon.svg";
import figure3 from "../../../../assets/explore/C3DCFacetLocalFindSearchIcon.svg";
import figure4 from "../../../../assets/explore/C3DCFacetLocalFindSearchIcon.svg";
import figure5 from "../../../../assets/explore/C3DCFacetLocalFindSearchIcon.svg";
import figure6 from "../../../../assets/explore/C3DCFacetLocalFindSearchIcon.svg";

const FindDataSection = ({ classes }) => (
  <div>
    <div
      id="Finding Participants, Studies, Samples, and Files"
      className={classes.sectionTitle}
    >
      <p>Finding Participants, Studies, Samples, and Files</p>
    </div>
    <div className={classes.contentContainer}>
      <p>
        The CCDI Hub Explore Dashboard provides row-level metadata for CCDI
        study participants and their data objects for review
      </p>
      <ol>
        <li>
          navigate to the Explore Dashboard by clicking “Explore” (Figure 2).
          <div className={classes.figureContainer}>
            <img src={figure2} style={{ width: "60%" }} alt="Figure2" />
          </div>
          <div className={classes.figureText}>
            Figure 2: CCDI homepage with red box highlighting the “Explore” menu
            bar link
          </div>
        </li>
        <li>
          filter row-level data and view them as visualizations (Figure 3).
          <div className={classes.figureContainer}>
            <img src={figure3} style={{ width: "40%" }} alt="Figure3" />
          </div>
          <div className={classes.figureText}>
            Figure 3: Explore Dashboard page with red boxes highlighting the
            search filters and results
          </div>
        </li>
        <li>
          faceted filtering (Figure 4).
          <div className={classes.figureContainer}>
            <img src={figure4} style={{ width: "90%" }} alt="Figure4" />
          </div>
          <div className={classes.figureText}>
            Figure 4: Full facet list in Explore Dashboard
          </div>
        </li>
        <li>
          results tables (Figure 5).
          <ol className={classes.alphaList}>
            <li>“Participants”: Characteristics</li>
            <li>“Studies”: Studies</li>
            <li>“Samples”: Samples</li>
            <li>
              “Files”: Files
              <div className={classes.figureContainer}>
                <img src={figure5} style={{ width: "70%" }} alt="Figure5" />
              </div>
              <div className={classes.figureText}>
                Figure 5: Explore Dashboard visualizations and results tables
              </div>
            </li>
          </ol>
        </li>
        <li>
          “View columns” button (Figure 6).
          <div className={classes.figureContainer}>
            <img src={figure6} style={{ width: "70%" }} alt="Figure6" />
          </div>
          <div className={classes.figureText}>
            Figure 6: Interface for selecting and deselecting columns in
            table
          </div>
        </li>
      </ol>
    </div>
  </div>
);

export default FindDataSection;
