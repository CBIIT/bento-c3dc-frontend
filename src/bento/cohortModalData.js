/**
 * Cohort Modal Configuration Data
 * 
 * This file contains all global constants and configurations used by the CohortModal component
 */

// Action Button Configuration
export const CCDI_HUB_BASE_URL = "https://ccdi.cancer.gov/explore?import_from=";
export const CCDI_INTEROP_SERVICE_URL = "https://ccdi.cancer.gov/api/interoperation/graphql";

// Legacy/Fallback URL Configuration (for direct URL construction)
export const CCDI_HUB_LEGACY_BASE_URL = "https://ccdi.cancer.gov/explore?p_id=";
export const CCDI_HUB_DBGAP_PARAM = "&dbgap_accession=";

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

// Download Configuration
export const DEFAULT_QUERY_LIMIT = 60000;

export const DOWNLOAD_MANIFEST_KEYS = {
    'Participant ID': 'participant_id',
    'dbGaP Accession': 'dbgap_accession',
    'Sex at Birth': 'sex_at_birth',
    'Race': 'race',
    'Diagnosis': 'diagnosis',
};

// Tooltip Messages
export const TOOLTIP_MESSAGES = {
    viewCohortAnalyzer: "Clicking on this button will take the user to the Cohort Analyzer page, where the user will see the desired cohort and click to proceed with analysis.",
    removeAllCohorts: "Remove all Cohorts",
    exploreCCDIHub: {
        mainText: "Clicking this button will create a url and open a new tab showing the CCDI Hub Explore page with filtered facets based on the user's selected cohort.",
    }
};