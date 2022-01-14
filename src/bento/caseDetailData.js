import gql from 'graphql-tag';
import { FileOnRowsSelect } from '../utils/fileTable';

// --------------- Tooltip configuration --------------
export const tooltipContent = {
  src: 'https://raw.githubusercontent.com/google/material-design-icons/master/src/action/help/materialicons/24px.svg',
  alt: 'tooltipIcon',
};

// -------------- Case ID area configurations --------------
const caseHeader = {
  label: 'Case ID',
  dataField: 'pcdc_subject_id',
};

// --------------- Data panel configuration --------------
const leftPanel = [
  // Each object here represents a subsection in the panel
  // A maximum of 3 subsections are allowed
  {
    sectionHeader: 'Subject Detail Information',
    // sectionDesc: 'Demographic Related Info',
    properties: [
      // A maximum of 10 properties are allowed
      {
        label: 'Subject ID',
        dataField: 'pcdc_subject_id',
      },
      {
        label: 'Age at Enrollment',
        dataField: 'age_at_enrollment',
      },
      {
        label: 'Treatment Arm',
        dataField: 'treatment_arm',
      },
      {
        label: 'Enrolled Status',
        dataField: 'enrolled_status',
      },
      {
        label: 'Data Contributor ID',
        dataField: 'data_contributor_id',
      },
      {
        label: 'Honest Broker Subject ID',
        dataField: 'honest_broker_subject_id',
      },
      {
        label: 'Data Contributor ID',
        dataField: 'honest_broker_subject_id',
      },
      {
        label: 'Year At Enrollment',
        dataField: 'year_at_enrollment',
      },
    ],
  },
  // {
  //   sectionHeader: 'Diagnosis',
  //   // sectionDesc: 'Diagnosis Related Info',
  //   properties: [
  //     {
  //       label: 'Diagnosis',
  //       dataField: 'disease_type',
  //     },
  //     {
  //       label: 'Diagnosis Subtype',
  //       dataField: 'disease_subtype',
  //     },
  //     {
  //       label: 'Tumor Grade',
  //       dataField: 'tumor_grade',
  //     },
  //     {
  //       label: 'Tumor Grade (mm)',
  //       dataField: 'tumor_largest_dimension_diameter',
  //     },
  //     {
  //       label: 'ER Status',
  //       dataField: 'er_status',
  //     },
  //     {
  //       label: 'PR Status',
  //       dataField: 'pr_status',
  //     },
  //     {
  //       label: 'Nuclear Grade',
  //       dataField: 'nuclear_grade',
  //     },
  //     {
  //       label: 'Recurrence Score',
  //       dataField: 'recurrence_score',
  //     },
  //   ],
  // },
];

const statBarItems = [
  {
    statTitle: 'Cases',
    type: 'field',
    statAPI: 'numberOfSubjects',
  },
  {
    statTitle: 'Files',
    type: 'field',
    statAPI: 'numberOfFiles',
  },
];

const rightPanel = [
  // Each object here represents a subsection in the panel
  // A maximum of 3 subsections are allowed
  // {
  //   sectionHeader: 'Treatment',
  //   // sectionDesc: 'Treatment Related Info',
  //   properties: [
  //     // A maximum of 10 properties are allowed
  //     {
  //       label: 'Primary Surgical Procedure',
  //       dataField: 'primary_surgical_procedure',
  //     },
  //     {
  //       label: 'Chemotherapy Regimen Group',
  //       dataField: 'chemotherapy_regimen_group',
  //     },
  //     {
  //       label: 'Chemotherapy Regimen',
  //       dataField: 'chemotherapy_regimen',
  //     },
  //     {
  //       label: 'Endocrine Therapy Type',
  //       dataField: 'endocrine_therapy_type',
  //     },
  //   ],
  // },
  // {
  //   sectionHeader: 'Follow Up',
  //   // sectionDesc: 'Follow Up Related Info',
  //   properties: [
  //     // A maximum of 10 properties are allowed
  //     {
  //       label: 'Is Disease Free',
  //       dataField: 'dfs_event_indicator',
  //     },
  //     {
  //       label: 'Is Recurrence Free',
  //       dataField: 'recurrence_free_indicator',
  //     },
  //     {
  //       label: 'Is Distant Recurrence Free',
  //       dataField: 'distant_recurrence_indicator',
  //     },
  //     {
  //       label: 'Disease Free Event Type',
  //       dataField: 'dfs_event_type',
  //     },
  //     {
  //       label: 'Recurrence Event Type',
  //       dataField: 'first_recurrence_type',
  //     },
  //     {
  //       label: 'Days to Progression',
  //       dataField: 'days_to_progression',
  //     },
  //     {
  //       label: 'Days to Recurrence',
  //       dataField: 'days_to_recurrence',
  //     },
  //   ],
  // },
];

// --------------- Dahboard Table external link configuration --------------
// Ideal size for externalLinkIcon is 16x16 px
export const externalLinkIcon = {
  src: 'https://raw.githubusercontent.com/CBIIT/datacommons-assets/main/bento/images/icons/svgs/externalLinkIcon.svg',
  alt: 'External link icon',
};

export const tab = {
  items: [
    {
      index: 0,
      label: 'ADVERSE EVENTS',
      value: 'table1',
      primaryColor: '#D6F2EA',
    },
    {
      index: 1,
      label: 'RADIATION THERAPY',
      value: 'table2',
      primaryColor: '#F7D7F7',
    },
    {
      index: 2,
      label: 'MEDICAL HISTORY',
      value: 'table2',
      primaryColor: '#D6F2EA',
    },
    {
      index: 3,
      label: 'COURSE TIMING',
      value: 'table2',
      primaryColor: '#F7D7F7',
    },
    {
      index: 4,
      label: 'ASSOCIATED FILES',
      value: 'table2',
      primaryColor: '#F7D7F7',
    },
  ],
};

// --------------- Table 1 adverse events --------------
const table1 = {
  // Set 'display' to false to hide the table entirely
  display: true,
  // Table title
  tableTitle: 'Adverse Events',
  // Field name for files data, need to be updated only when using a different GraphQL query
  subjectDetailField: 'adverse_events',
  // Value must be one of the 'dataField's in fileTableColumns
  defaultSortField: 'ae_code',
  // 'asc' or 'desc'
  defaultSortDirection: 'asc',
  // Text to appear on Add to cart button
  buttonText: 'Add Selected Files',
  saveButtonDefaultStyle: {
    color: '#fff',
    backgroundColor: '#09A175',
    opacity: '1',
    border: '0px',
    cursor: 'pointer',
  },
  ActiveSaveButtonDefaultStyle: {
    disabled: 'true',
    opacity: '0.3',
    cursor: 'auto',
  },
  DeactiveSaveButtonDefaultStyle: {
    cursor: 'pointer',
    opacity: 'unset',
    border: 'unset',
  },
  // Help Icon Message
  tooltipMessage: 'Click button to add selected files.',
  helpMessage: 'Here help message',
  // showHideColumns 'true' or 'false'
  showHideColumns: true,
  // download csv 'true' or 'false'
  download: false,
  // downloaded File Name
  downloadFileName: 'Bento_case_samples_download',
  // Set 'selectableRows' to true to show the row selection
  selectableRows: true,
  // A maximum of 10 columns are allowed
  columns: [
    {
      dataField: 'ADVERSE_EVENT',
      header: 'Adverse Event',
    },
    {
      dataField: 'AE_CODE',
      header: 'Adverse Event Code',
    },
    {
      dataField: 'COURSE',
      header: 'Course',
    },
    {
      dataField: 'COURSE_NUMBER',
      header: 'Course Number',
    },
    {
      dataField: 'AE_SYSTEM',
      header: 'Adverse Event System',
    },
    {
      dataField: 'AE_GRADE',
      header: 'Adverse Event Grade',
    },
    {
      dataField: 'AE_OUTCOME',
      header: 'Adverse Event Outcome',
    },
    {
      dataField: 'AE_MEDICATION',
      header: 'Adverse Event Medication',
    },
    {
      dataField: 'AE_PATHOGEN',
      header: 'Adverse Event Pathogen',
    },
    {
      dataField: 'AVN_METHOD',
      header: 'AVN Method',
    },
    {
      dataField: 'INFECTION_CLASSIFICATION',
      header: 'Infection Classification',
    },
    {
      dataField: 'AGE_AT_AE_RESOLVED',
      header: 'Age at AE Resolved',
    },
  ],
  // Util Functions
  // Custom function on selct checkbox is selected.
  customOnRowsSelect: FileOnRowsSelect,
};

// --------------- Table 2: radiation therapy --------------
const table2 = {
  // Set 'display' to false to hide the table entirely
  display: true,
  // Table title
  tableTitle: 'Radiation Therapy',
  // Field name for files data, need to be updated only when using a different GraphQL query
  subjectDetailField: 'radiation_therapy',
  // Value must be one of the 'dataField's in fileTableColumns
  defaultSortField: 'disease_phase_number',
  // 'asc' or 'desc'
  defaultSortDirection: 'asc',
  // Text to appear on Add to cart button
  buttonText: 'Add Selected Files',
  saveButtonDefaultStyle: {
    color: '#fff',
    backgroundColor: '#09A175',
    opacity: '1',
    border: '0px',
    cursor: 'pointer',
  },
  ActiveSaveButtonDefaultStyle: {
    disabled: 'true',
    opacity: '0.3',
    cursor: 'auto',
  },
  DeactiveSaveButtonDefaultStyle: {
    cursor: 'pointer',
    opacity: 'unset',
    border: 'unset',
  },
  // Help Icon Message
  tooltipMessage: 'Click button to add selected files.',
  helpMessage: 'Here help message',
  // showHideColumns 'true' or 'false'
  showHideColumns: true,
  // download csv 'true' or 'false'
  download: false,
  // downloaded File Name
  downloadFileName: 'Bento_case_samples_download',
  // Set 'selectableRows' to true to show the row selection
  selectableRows: true,
  // A maximum of 10 columns are allowed
  columns: [
    {
      dataField: 'AGE_AT_RT_START',
      header: 'Age at RT Start',
    },
    {
      dataField: 'AGE_AT_RT_END',
      header: 'Age at RT End',
    },
    {
      dataField: 'DISEASE_PHASE',
      header: 'Disease Phase',
    },
    {
      dataField: 'DISEASE_PHASE_NUMBER',
      header: 'Disease Phase Number',
    },
    {
      dataField: 'COURSE',
      header: 'Course',
    },
    {
      dataField: 'COURSE_NUMBER',
      header: 'Course Number',
    },
    {
      dataField: 'RT_SITE',
      header: 'RT Site',
    },
    {
      dataField: 'RT_DOSE',
      header: 'RT Dose',
    },
    {
      dataField: 'RT_UNIT',
      header: 'RT Unit',
    },
    {
      dataField: 'TUMOR_CLASSIFICATION',
      header: 'Tumor Classification',
    },
    {
      dataField: 'TUMOR_TISSUE_TYPE',
      header: 'Tumor Tissue Type',
    },
    {
      dataField: 'RT_LATERALITY',
      header: 'RT Laterality',
    },
    {
      dataField: 'ENERGY_TYPE',
      header: 'Energy Type',
    },
    {
      dataField: 'TRANSPOSITION_ORGAN',
      header: 'Transposition Organ',
    },
    {
      dataField: 'BOOST',
      header: 'Boost',
    },
  ],
  // Util Functions
  // Custom function on selct checkbox is selected.
  customOnRowsSelect: FileOnRowsSelect,
};

// --------------- Table 3: medical history --------------
const table3 = {
  // Set 'display' to false to hide the table entirely
  display: true,
  // Table title
  tableTitle: 'Medical History',
  // Field name for files data, need to be updated only when using a different GraphQL query
  subjectDetailField: 'medical_history',
  // Value must be one of the 'dataField's in fileTableColumns
  defaultSortField: 'medical_history',
  // 'asc' or 'desc'
  defaultSortDirection: 'asc',
  // Text to appear on Add to cart button
  buttonText: 'Add Selected Files',
  saveButtonDefaultStyle: {
    color: '#fff',
    backgroundColor: '#09A175',
    opacity: '1',
    border: '0px',
    cursor: 'pointer',
  },
  ActiveSaveButtonDefaultStyle: {
    disabled: 'true',
    opacity: '0.3',
    cursor: 'auto',
  },
  DeactiveSaveButtonDefaultStyle: {
    cursor: 'pointer',
    opacity: 'unset',
    border: 'unset',
  },
  // Help Icon Message
  tooltipMessage: 'Click button to add selected files.',
  helpMessage: 'Here help message',
  // showHideColumns 'true' or 'false'
  showHideColumns: true,
  // download csv 'true' or 'false'
  download: false,
  // downloaded File Name
  downloadFileName: 'Bento_case_samples_download',
  // Set 'selectableRows' to true to show the row selection
  selectableRows: true,
  // A maximum of 10 columns are allowed
  columns: [
    {
      dataField: 'MEDICAL_HISTORY',
      header: 'Medical History',
    },
    {
      dataField: 'DYSGENETIC_GONAD',
      header: 'Dysgenetic Gonad',
    },
  ],
  // Util Functions
  // Custom function on select checkbox is selected.
  customOnRowsSelect: FileOnRowsSelect,
};

// --------------- Table 4: Course Timing --------------
const table4 = {
  // Set 'display' to false to hide the table entirely
  display: true,
  // Table title
  tableTitle: 'Course Timing',
  // Field name for files data, need to be updated only when using a different GraphQL query
  subjectDetailField: 'course_timing',
  // Value must be one of the 'dataField's in fileTableColumns
  defaultSortField: 'course_number',
  // 'asc' or 'desc'
  defaultSortDirection: 'asc',
  // Text to appear on Add to cart button
  buttonText: 'Add Selected Files',
  saveButtonDefaultStyle: {
    color: '#fff',
    backgroundColor: '#09A175',
    opacity: '1',
    border: '0px',
    cursor: 'pointer',
  },
  ActiveSaveButtonDefaultStyle: {
    disabled: 'true',
    opacity: '0.3',
    cursor: 'auto',
  },
  DeactiveSaveButtonDefaultStyle: {
    cursor: 'pointer',
    opacity: 'unset',
    border: 'unset',
  },
  // Help Icon Message
  tooltipMessage: 'Click button to add selected files.',
  helpMessage: 'Here help message',
  // showHideColumns 'true' or 'false'
  showHideColumns: true,
  // download csv 'true' or 'false'
  download: false,
  // downloaded File Name
  downloadFileName: 'Bento_case_samples_download',
  // Set 'selectableRows' to true to show the row selection
  selectableRows: true,
  // A maximum of 10 columns are allowed
  columns: [
    {
      dataField: 'COURSE',
      header: 'Course',
    },
    {
      dataField: 'COURSE_NUMBER',
      header: 'Course Number',
    },
    {
      dataField: 'AGE_AT_COURSE_START',
      header: 'Age at Course Start',
    },
    {
      dataField: 'AGE_AT_COURSE_END',
      header: 'Age at Course End',
    },
    {
      dataField: 'AGE_AT_COURSE_ANC_500',
      header: 'Age at Course ANC 500',
    },
    {
      dataField: 'AGE_AT_TXASSIGN',
      header: 'Age at Treatment Assign',
    },
  ],
  // Util Functions
  // Custom function on selct checkbox is selected.
  customOnRowsSelect: FileOnRowsSelect,
};

// --------------- Table 4 configuration --------------
const table5 = {
  // Set 'display' to false to hide the table entirely
  display: true,
  // Table title
  tableTitle: 'ASSOCIATED FILES',
  // Field name for files data, need to be updated only when using a different GraphQL query
  subjectDetailField: 'files',
  // Value must be one of the 'dataField's in fileTableColumns
  defaultSortField: 'file_name',
  // 'asc' or 'desc'
  defaultSortDirection: 'asc',
  // Text to appear on Add to cart button
  buttonText: 'Add Selected Files',
  saveButtonDefaultStyle: {
    color: '#fff',
    backgroundColor: '#09A175',
    opacity: '1',
    border: '0px',
    cursor: 'pointer',
  },
  ActiveSaveButtonDefaultStyle: {
    disabled: 'true',
    opacity: '0.3',
    cursor: 'auto',
  },
  DeactiveSaveButtonDefaultStyle: {
    cursor: 'pointer',
    opacity: 'unset',
    border: 'unset',
  },
  // Help Icon Message
  tooltipMessage: 'Click button to add selected files.',
  helpMessage: 'Here help message',
  // showHideColumns 'true' or 'false'
  showHideColumns: true,
  // download csv 'true' or 'false'
  download: false,
  // downloaded File Name
  downloadFileName: 'Bento_case_samples_download',
  // Set 'selectableRows' to true to show the row selection
  selectableRows: true,
  // A maximum of 10 columns are allowed
  columns: [
    {
      dataField: 'FILE_NAME',
      header: 'File Name',
    },
    {
      dataField: 'UUID',
      header: 'File ID',
    },
    {
      dataField: 'FILE_TYPE',
      header: 'File Type',
    },
    {
      dataField: 'FILE_DESCRIPTION',
      header: 'Description',
    },
    {
      dataField: 'FILE_FORMAT',
      header: 'Format',
    },
    {
      dataField: 'FILE_SIZE',
      header: 'Size',
      // set formatBytes to true to display file size (in bytes) in a more human readable format
      formatBytes: true,
    },
  ],
  // Util Functions
  // Custom function on selct checkbox is selected.
  customOnRowsSelect: FileOnRowsSelect,
};

// --------------- GraphQL query configuration --------------

// query name, also used as root of returned data
const dataRoot = 'subjectDetails';
// query name, also used as key for files to Samples Mapping.
const filesOfSamples = 'samplesForSubjectId';
// Primary ID field used to query a case
const caseIDField = 'pcdc_subject_id';

// GraphQL query to retrieve detailed info for a case
const GET_CASE_DETAIL_DATA_QUERY = gql`
    query subjectDetail($subject_id: String!) {
        subjectDetails(subject_id: $subject_id) {
            pcdc_subject_id
            honest_broker_subject_id
            data_contributor_id
            age_at_enrollment
            treatment_arm
            enrolled_status
            year_at_enrollment
            adverse_events{
                AGE_AT_AE
                DISEASE_PHASE
                DISEASE_PHASE_NUMBER
                COURSE
                COURSE_NUMBER
                ADVERSE_EVENT
                AE_CODE
                AE_SYSTEM
                AE_SYSTEM_VERSION
                AE_GRADE
                AE_ATTRIBUTION
                AE_OUTCOME
                AE_ICU
                AE_MEDICATION
                AE_INTERVENTION
                AE_MED_INTERVENTION_DETAIL
                AE_PATHOGEN
                AE_PATHOGEN_CONFIRMATION
                GVHD_ACUITY
                GVHD_ORGAN
                AGE_AT_AE_RESOLVED
                AVN_JOINT
                AVN_JOINT_LATERALITY
                AVN_METHOD
                ORTHOPEDIC_PROCEDURE
                INFECTION_CLASSIFICATION
            }
            radiation_therapy{
                AGE_AT_RT_START
                AGE_AT_RT_END
                DISEASE_PHASE
                DISEASE_PHASE_NUMBER
                COURSE
                COURSE_NUMBER
                RT_SITE
                RT_DOSE
                RT_UNIT
                TUMOR_CLASSIFICATION
                TUMOR_TISSUE_TYPE
                RT_LATERALITY
                ENERGY_TYPE
                NUM_FRACTION
                TRANSPOSITION_ORGAN
                BOOST
            }
            medical_history{
                MEDICAL_HISTORY
                DYSGENETIC_GONAD
            }
            course_timing{
                COURSE
                COURSE_NUMBER
                AGE_AT_COURSE_START
                AGE_AT_COURSE_END
                AGE_AT_COURSE_ANC_500
                AGE_AT_TXASSIGN
            }
            files {
                FILE_NAME
                FILE_TYPE
                FILE_DESCRIPTION
                FILE_FORMAT
                FILE_SIZE
                UUID
                MD5SUM
            }
        }
    }
`;

export {
  caseHeader,
  dataRoot,
  caseIDField,
  filesOfSamples,
  leftPanel,
  rightPanel,
  table1,
  table2,
  table3,
  table4,
  table5,
  GET_CASE_DETAIL_DATA_QUERY,
  statBarItems,
};
