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
      dataField: "study_id",
      header: "Study Id",
      display: false,
      tooltipText: "sort",
      role: cellTypes.DISPLAY
    },
    {
      dataField: "cohort",
      header: "Cohort",
      display: true,
      tooltipText: "This entry is found in the following cohorts",
      role: cellTypes.DISPLAY
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


export const diagnosesTableConfig = {
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
      dataField: 'age_at_diagnosis',
      header: 'Age At Diagnosis',
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
      dataField: "cohort",
      header: "Cohort",
      display: true,
      tooltipText: "This entry is found in the following cohorts",
      role: cellTypes.DISPLAY
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
    $participant_pks: [String],

    # Table config
    $first: Int,
    $offset: Int,
    $order_by: String,
    $sort_direction: String
) {
participantOverview(
    # Demographics
    participant_pks: $participant_pks,

    # Table config
    first: $first,
    offset: $offset,
    order_by: $order_by,
    sort_direction: $sort_direction
) { 
    # Participants
    participant_pk
    race
    sex_at_birth

    # Studies
    dbgap_accession

    __typename
}}`;
const diagnosis_query = gql`query diagnosisOverview(
    # Demographics
    $participant_pks: [String]

    # Table config
    $first: Int,
    $offset: Int,
    $order_by: String,
    $sort_direction: String
) {
diagnosisOverview(
    # Demographics
    participant_pks: $participant_pks,

    # Table config
    first: $first,
    offset: $offset,
    order_by: $order_by,
    sort_direction: $sort_direction
) {
    # Demographics
    participant_id

    # Diagnosis
    diagnosis_pk
    age_at_diagnosis
    anatomic_site

    __typename
}}`;
const treatment_query = gql`query treatmentOverview(
    # Demographics
    $participant_pks: [String],

    # Table config
    $first: Int,
    $offset: Int,
    $order_by: String,
    $sort_direction: String
) {
treatmentOverview(
    # Demographics
    participant_pks: $participant_pks,

    # Table config
    first: $first,
    offset: $offset,
    order_by: $order_by,
    sort_direction: $sort_direction
) {
    # Participant
    participant_id

    # Treatment
    treatment_pk
    treatment_type
    treatment_agent
    treatment_agent_str

    __typename
}}
`;

export const analyzer_query = [GET_COHORT_MANIFEST_QUERY,diagnosis_query,treatment_query];
export const analyzer_tables = [tableConfig,diagnosesTableConfig];