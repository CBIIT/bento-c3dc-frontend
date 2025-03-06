import { cellTypes } from "@bento-core/table";
import { GET_COHORT_MANIFEST_QUERY } from "./dashboardTabData";
import gql from "graphql-tag";

export const tableConfig = {
  name: 'Participants',
  dataField: 'dataParticipant',
  api: GET_COHORT_MANIFEST_QUERY,
  paginationAPIField: 'diagnosisOverview',
  count: 'numberOfParticipants',
  fileCount: 'participantsFileCount',
  dataKey: 'participant_id',
  hiddenDataKeys: ['participant_id', 'participant_pk', 'dbgap_accession'],
  defaultSortField: 'participant_id',
  defaultSortDirection: 'asc',
  toolTipText: 'Count of Participant Record',
  buttonText: 'Add Selected Files',
  tableID: 'participant_tab_table',
  hasToolTip: true,
  extendedViewConfig: {
    pagination: true,
    manageViewColumns: false,
    download: true,
    downloadButtonConfig: {
      title: 'DOWNLOAD DATA',
      cloudIcon: true,
    },
  },
  columns: [
  
    {
      dataField: 'participant_id',
      header: 'Participant Id',
      display: true,
      tooltipText: 'sort',
      role: cellTypes.DISPLAY,
    },
    {
      dataField: 'dbgap_accession',
      header: 'dbGaP Accession',
      display: true,
      tooltipText: 'sort',
      role: cellTypes.DISPLAY,
      linkAttr: {
        linkAttr: {
          rootPath: 'https://www.ncbi.nlm.nih.gov/projects/gap/cgi-bin/study.cgi?study_id=',
        },
        cellType: cellTypes.CUSTOM_ELEM,
      },
      doNotDownload: true,
    },
    {
      dataField: 'race',
      header: 'Race',
      display: true,
      tooltipText: 'sort',
      role: cellTypes.DISPLAY,
    },
    {
      dataField: 'sex_at_birth',
      header: 'Sex at Birth',
      display: true,
      tooltipText: 'sort',
      role: cellTypes.DISPLAY,
    },
    {
      dataField: "study_id",
      header: "Study Id",
      display: false,
      tooltipText: "sort",
      role: cellTypes.DISPLAY
    },
    {
      dataField: "cohort",
      header: "Cohorts",
      display: true,
      tooltipText: "This entry is found in the following cohorts",
      role: cellTypes.DISPLAY,
      cellType: cellTypes.CUSTOM_ELEM
    }
  ],
  id: 'participant_tab',
  tableDownloadCSV: {},
  tabIndex: '0',
  downloadFileName: 'C3DC Participants Download',
  tableMsg: {
    noMatch: 'To proceed, please select a cohort from the Cohort List (Left Panel).',
  },
};

export const diagnosesTableConfig =
{
  name: 'Participants',
  dataField: 'dataParticipant',
  api: GET_COHORT_MANIFEST_QUERY,
  paginationAPIField: 'diagnosisOverview',
  count: 'numberOfParticipants',
  fileCount: 'participantsFileCount',
  dataKey: 'participant_id',
  hiddenDataKeys: ['participant_id', 'participant_pk', 'dbgap_accession'],
  defaultSortField: 'participant_id',
  defaultSortDirection: 'asc',
  toolTipText: 'Count of Participant Record',
  buttonText: 'Add Selected Files',
  tableID: 'participant_tab_table',
  hasToolTip: true,
  extendedViewConfig: {
    pagination: true,
    manageViewColumns: false,
    download: true,
    downloadButtonConfig: {
      title: 'DOWNLOAD DATA',
      cloudIcon: true,
    },
  },
  columns: [
    {
      dataField: 'participant_id',
      header: 'Participant Id',
      display: true,
      tooltipText: 'sort',
      role: cellTypes.DISPLAY
    },
    {
      dataField: 'diagnosis',
      header: 'Diagnosis',
      display: true,
      tooltipText: 'sort',
      role: cellTypes.DISPLAY,
    },
    {
      dataField: 'anatomic_site',
      header: 'Anatomic Sites',
      display: true,
      tooltipText: 'sort',
      role: cellTypes.DISPLAY,
    },
    {
      dataField: 'age_at_diagnosis',
      header: 'Age At Diagnosis',
      display: true,
      tooltipText: 'sort',
      role: cellTypes.DISPLAY,
    },
    {
      dataField: "cohort",
      header: "Cohorts",
      display: true,
      tooltipText: "This entry is found in the following cohorts",
      role: cellTypes.DISPLAY,
      cellType: cellTypes.CUSTOM_ELEM
    }
  ],
  id: 'participant_tab',
  tableDownloadCSV: {},
  tabIndex: '0',
  downloadFileName: 'C3DC Participants Download',
  tableMsg: {
    noMatch: 'To proceed, please select a cohort from the Cohort List (Left Panel).',
  },
}
export const treatmentTableConfig = {
  name: 'Participants',
  dataField: 'dataParticipant',
  api: GET_COHORT_MANIFEST_QUERY,
  paginationAPIField: 'diagnosisOverview',
  count: 'numberOfParticipants',
  fileCount: 'participantsFileCount',
  dataKey: 'participant_id',
  hiddenDataKeys: ['participant_id', 'participant_pk', 'dbgap_accession'],
  defaultSortField: 'participant_id',
  defaultSortDirection: 'asc',
  toolTipText: 'Count of Participant Record',
  buttonText: 'Add Selected Files',
  tableID: 'participant_tab_table',
  hasToolTip: true,
  extendedViewConfig: {
    pagination: true,
    manageViewColumns: false,
    download: true,
    downloadButtonConfig: {
      title: 'DOWNLOAD DATA',
      cloudIcon: true,
    },
  },
  columns: [
    {
      dataField: 'participant_id',
      header: 'Participant Id',
      display: true,
      tooltipText: 'sort',
      role: cellTypes.DISPLAY,
    },
    {
      dataField: 'treatment_type',
      header: 'Treatment Type',
      display: true,
      tooltipText: 'sort',
      role: cellTypes.DISPLAY,
    },
    {
      dataField: 'treatment_agent',
      header: 'Treatment Agent',
      display: true,
      tooltipText: 'sort',
      role: cellTypes.DISPLAY,
    }, {
      dataField: 'treatment_pk',
      header: 'Treatment Id',
      display: true,
      tooltipText: 'sort',
      role: cellTypes.DISPLAY,
    },
    {
      dataField: "cohort",
      header: "Cohorts",
      display: true,
      tooltipText: "This entry is found in the following cohorts",
      role: cellTypes.DISPLAY,
      cellType: cellTypes.CUSTOM_ELEM
    }
  ],
  id: 'participant_tab',
  tableDownloadCSV: {},
  tabIndex: '0',
  downloadFileName: 'C3DC Participants Download',
  tableMsg: {
    noMatch: 'To proceed, please select a cohort from the Cohort List (Left Panel).',
  },
};


const participant_query = gql`query participantOverview(
    # Demographics
    $participant_pk: [String],

    # Table config
    $first: Int,
    $offset: Int,
    $order_by: String,
    $sort_direction: String
) {
participantOverview(
    # Demographics
    participant_pk: $participant_pk,

    # Table config
    first: $first,
    offset: $offset,
    order_by: $order_by,
    sort_direction: $sort_direction
) { 
    # Participants
    id 
    participant_id
    race
    sex_at_birth

    # Studies
    dbgap_accession

    __typename
}}`;
const diagnosis_query = gql`query diagnosisOverview(
    # Demographics
    $participant_pk: [String],
    $participant_id: [String],
    $race: [String],
    $sex_at_birth: [String],

    # Diagnoses
    $age_at_diagnosis: [Int],
    $anatomic_site: [String],
    $diagnosis: [String],
    $diagnosis_classification_system: [String],
    $diagnosis_basis: [String],
    $disease_phase: [String],

    # Studies
    $dbgap_accession: [String],
    $study_name: [String],

    # Survivals
    $age_at_last_known_survival_status: [Int],
    $cause_of_death: [String],
    $first_event: [String],
    $last_known_survival_status: [String],

    # Treatments
    $age_at_treatment_start: [Int],
    $age_at_treatment_end: [Int],
    $treatment_type: [String],
    $treatment_agent: [String],

    # Treatment Responses
    $response: [String],
    $age_at_response: [Int],
    $response_category: [String],
    $response_system: [String],

    # Table config
    $first: Int,
    $offset: Int,
    $order_by: String,
    $sort_direction: String
) {
diagnosisOverview(
    # Demographics
    participant_pk: $participant_pk,
    participant_id: $participant_id,
    race: $race,
    sex_at_birth: $sex_at_birth,

    # Diagnoses
    age_at_diagnosis: $age_at_diagnosis,
    anatomic_site: $anatomic_site,
    diagnosis: $diagnosis,
    diagnosis_classification_system: $diagnosis_classification_system,
    diagnosis_basis: $diagnosis_basis,
    disease_phase: $disease_phase,
    
    # Studies
    dbgap_accession: $dbgap_accession,
    study_name: $study_name,

    # Survivals
    age_at_last_known_survival_status: $age_at_last_known_survival_status,
    cause_of_death: $cause_of_death,
    first_event: $first_event,
    last_known_survival_status: $last_known_survival_status,

    # Treatments
    age_at_treatment_start: $age_at_treatment_start,
    age_at_treatment_end: $age_at_treatment_end,
    treatment_type: $treatment_type,
    treatment_agent: $treatment_agent,

    # Treatment Responses
    response: $response,
    age_at_response: $age_at_response,
    response_category: $response_category,
    response_system: $response_system,

    # Table config
    first: $first,
    offset: $offset,
    order_by: $order_by,
    sort_direction: $sort_direction
) {
    # Demographics
    participant {
        id
        participant_id
        race
        sex_at_birth
    }

    # Diagnosis
    id
    age_at_diagnosis
    anatomic_site
    diagnosis_basis
    diagnosis
    diagnosis_classification_system
    diagnosis_comment
    diagnosis_id
    disease_phase
    toronto_childhood_cancer_staging
    tumor_classification
    tumor_grade
    tumor_stage_clinical_m
    tumor_stage_clinical_n
    tumor_stage_clinical_t

    # Study
    dbgap_accession
    study_id

    __typename
}}
`;
const treatment_query = gql`query treatmentOverview(
    # Demographics
    $participant_pk: [String],
    $participant_id: [String],
    $race: [String],
    $sex_at_birth: [String],

    # Diagnoses
    $age_at_diagnosis: [Int],
    $anatomic_site: [String],
    $diagnosis: [String],
    $diagnosis_classification_system: [String],
    $diagnosis_basis: [String],
    $disease_phase: [String],

    # Studies
    $dbgap_accession: [String],
    $study_name: [String],

    # Survivals
    $age_at_last_known_survival_status: [Int],
    $cause_of_death: [String],
    $first_event: [String],
    $last_known_survival_status: [String],

    # Treatments
    $age_at_treatment_start: [Int],
    $age_at_treatment_end: [Int],
    $treatment_type: [String],
    $treatment_agent: [String],

    # Treatment Responses
    $response: [String],
    $age_at_response: [Int],
    $response_category: [String],
    $response_system: [String],

    # Table config
    $first: Int,
    $offset: Int,
    $order_by: String,
    $sort_direction: String
) {
treatmentOverview(
    # Demographics
    participant_pk: $participant_pk,
    participant_id: $participant_id,
    race: $race,
    sex_at_birth: $sex_at_birth,

    # Diagnoses
    age_at_diagnosis: $age_at_diagnosis,
    anatomic_site: $anatomic_site,
    diagnosis: $diagnosis,
    diagnosis_classification_system: $diagnosis_classification_system,
    diagnosis_basis: $diagnosis_basis,
    disease_phase: $disease_phase,
    
    # Studies
    dbgap_accession: $dbgap_accession,
    study_name: $study_name,

    # Survivals
    age_at_last_known_survival_status: $age_at_last_known_survival_status,
    cause_of_death: $cause_of_death,
    first_event: $first_event,
    last_known_survival_status: $last_known_survival_status

    # Treatments
    age_at_treatment_start: $age_at_treatment_start,
    age_at_treatment_end: $age_at_treatment_end,
    treatment_type: $treatment_type,
    treatment_agent: $treatment_agent,

    # Treatment Responses
    response: $response,
    age_at_response: $age_at_response,
    response_category: $response_category,
    response_system: $response_system,

    # Table config
    first: $first,
    offset: $offset,
    order_by: $order_by,
    sort_direction: $sort_direction
) {
    # Participant
    participant {
        id
        participant_id
        race
        sex_at_birth
    }

    # Study
    dbgap_accession
    study_id

    # Treatment
    id
    treatment_id
    age_at_treatment_start
    age_at_treatment_end
    treatment_type
    treatment_agent
    treatment_agent_str

    __typename
}}
`;

export const analyzer_query = [participant_query, diagnosis_query, treatment_query];
export const analyzer_tables = [tableConfig, diagnosesTableConfig, treatmentTableConfig];
export const responseKeys = ["participantOverview", "diagnosisOverview", "treatmentOverview"];