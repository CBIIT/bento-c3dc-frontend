import React from "react";
import LinkoutBlue from "../../assets/about/Export_Icon.svg";

const Gap = () => (
    <div style={{ height: '10px' }} />
);

export const exploreCCDIHubTooltip = <p style={{ fontFamily: "Poppins", zIndex: 10000, fontWeight: 400, fontSize: 13, margin: 0 }}>
    Clicking this button will create a url and open a new tab showing the  CCDI Hub  Explore page with filtered facets based on the user&apos;s selected  cohort.
    <br />
    <Gap />
    <b>If cohort size &le; 600:</b><br />
    Proceed with direct export within C3DC.
    <br />
    <Gap />
    <b>If cohort size &gt; 600:</b><br />
    Download the manifest and upload it manually to the <a style={{ zIndex: 10000, color: "#598AC5", fontWeight: "bolder" }} rel="noreferrer" target='_blank' href="https://ccdi.cancer.gov/explore"> CCDI Hub
        <img src={LinkoutBlue} width={14} height={14} style={{ padding: "4px 0px 0px 2px", bottom: 0, position: 'relative' }} alt="Linkout Icon" />
    </a> by following these steps:
    <ol style={{ paddingLeft: "1rem" }}>
        <li> Choose the Explore page from the menu.</li>
        <li> In the Facets side panel, open the Demographic facet.</li>
        <li> Click on “Upload Participants Set.”</li>
    </ol>
</p>;

export const exploreDashboardTooltip = <p style={{ fontFamily: "Poppins", zIndex: 10000, fontWeight: 400, fontSize: 13, margin: 0 }}>
    Clicking this button will create a pre-filtered facet for further analysis on the Explore Dashboard

</p>;
