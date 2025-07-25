/**
 * Cohort Modal Configuration Data
 * 
 * This file contains all global constants and configurations used by the CohortModal component
 */

// Action Button Configuration
export const COHORT_SIZE_LIMIT = 600;
export const CCDI_HUB_BASE_URL = "https://ccdi.cancer.gov/explore?p_id=";
export const DBGAP_PARAM = "&dbgap_accession=";

// Deletion Types Configuration
export const deletionTypes = {
    DELETE_ALL_COHORTS: 'delete all cohorts?',
    DELETE_SINGLE_COHORT: 'delete this cohort?',
    DELETE_ALL_PARTICIPANTS: 'delete all participants?',
    CLEAR_UNSAVED_CHANGES: 'leave?'
};

// UI Configuration
export const SCROLLBAR_WIDTH = '6px';

// Hook Configuration  
export const IGNORED_FIELDS = ["cohortId"];

// Tooltip Messages
export const TOOLTIP_MESSAGES = {
    viewCohortAnalyzer: "Clicking on this button will take the user to the Cohort Analyzer page, where the user will see the desired cohort and click to proceed with analysis.",
    removeAllCohorts: "Remove all Cohorts",
    exploreCCDIHub: {
        mainText: "Clicking this button will create a url and open a new tab showing the CCDI Hub Explore page with filtered facets based on the user's selected cohort.",
        smallCohortText: "Proceed with direct export within C3DC.",
        largeCohortText: "Download the manifest and upload it manually to the",
        ccdiHubUrl: "https://ccdi.cancer.gov/explore",
        ccdiHubText: "CCDI Hub",
        followingStepsText: "by following these steps:",
        steps: [
            "Choose the Explore page from the menu.",
            "In the Facets side panel, open the Demographic facet.",
            'Click on "Upload Participants Set."'
        ]
    }
};