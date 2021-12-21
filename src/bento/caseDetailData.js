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
  dataField: 'subject_id',
};

// --------------- Data panel configuration --------------
const leftPanel = [
  // Each object here represents a subsection in the panel
  // A maximum of 3 subsections are allowed
  {
    sectionHeader: 'Demographics',
    // sectionDesc: 'Demographic Related Info',
    properties: [
      // A maximum of 10 properties are allowed
      {
        label: 'Gender',
        dataField: 'gender',
      },
      {
        label: 'Race',
        dataField: 'race',
      },
      {
        label: 'Age at Entry',
        dataField: 'ageAtEntry',
      },
      {
        label: 'Registering Institution',
        dataField: 'registeringInstitution',
      },
      {
        label: 'Disease Term',
        dataField: 'diseaseTerm',
      },
      {
        label: 'Patient Subgroup',
        dataField: 'patientSubgroup',
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
      label: 'GERMLINE VARIANT',
      value: 'table2',
      primaryColor: '#F7D7F7',
    },
    {
      index: 2,
      label: 'SOMATIC VARIANT',
      value: 'table2',
      primaryColor: '#D6F2EA',
    },
    {
      index: 3,
      label: 'ASSOCIATED FILES',
      value: 'table2',
      primaryColor: '#F7D7F7',
    },
  ],
};

// --------------- Table 1 configuration --------------
const table1 = {
  // Set 'display' to false to hide the table entirely
  display: true,
  // Table title
  tableTitle: 'Adverse Events',
  // Field name for files data, need to be updated only when using a different GraphQL query
  subjectDetailField: 'adverseEvents',
  // Value must be one of the 'dataField's in fileTableColumns
  defaultSortField: 'organClass',
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
      dataField: 'organClass',
      header: 'Organ Class',
    },
    {
      dataField: 'outcome',
      header: 'Outcome',
    },
    {
      dataField: 'serious',
      header: 'Serious',
    },
  ],
  // Util Functions
  // Custom function on selct checkbox is selected.
  customOnRowsSelect: FileOnRowsSelect,
};

// --------------- Table 2: Germline Variant --------------
const table2 = {
  // Set 'display' to false to hide the table entirely
  display: true,
  // Table title
  tableTitle: 'Germline Variant',
  // Field name for files data, need to be updated only when using a different GraphQL query
  subjectDetailField: 'germlineVariant',
  // Value must be one of the 'dataField's in fileTableColumns
  defaultSortField: 'panelCode',
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
      dataField: 'panelCode',
      header: 'Panel Code',
    },
    {
      dataField: 'germlinePathogenicity',
      header: 'Pathogenicity',
    },
    {
      dataField: 'genePathogenicVariant',
      header: 'Pathogenic Variant',
    },
  ],
  // Util Functions
  // Custom function on selct checkbox is selected.
  customOnRowsSelect: FileOnRowsSelect,
};

// --------------- Table 3: Somatic Variant --------------
const table3 = {
  // Set 'display' to false to hide the table entirely
  display: true,
  // Table title
  tableTitle: 'Somatic Variant',
  // Field name for files data, need to be updated only when using a different GraphQL query
  subjectDetailField: 'somaticVariant',
  // Value must be one of the 'dataField's in fileTableColumns
  defaultSortField: 'genePanel500',
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
      dataField: 'genePanel500',
      header: 'Panel Code',
    },
    {
      dataField: 'somaticPathogenicity',
      header: 'Pathogenicity',
    },
    {
      dataField: 'genePathogenicVariant',
      header: 'Pathogenic Variant',
    },
  ],
  // Util Functions
  // Custom function on selct checkbox is selected.
  customOnRowsSelect: FileOnRowsSelect,
};

// --------------- Table 4 configuration --------------
const table4 = {
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
      dataField: 'file_name',
      header: 'File Name',
    },
    {
      dataField: 'file_type',
      header: 'File Type',
    },
    {
      dataField: 'file_description',
      header: 'Description',
    },
    {
      dataField: 'file_format',
      header: 'Format',
    },
    {
      dataField: 'file_size',
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
const dataRoot = 'subjectDetail';
// query name, also used as key for files to Samples Mapping.
const filesOfSamples = 'samplesForSubjectId';
// Primary ID field used to query a case
const caseIDField = 'pcdc_subject_id';

// GraphQL query to retrieve detailed info for a case
const GET_CASE_DETAIL_DATA_QUERY = gql`
  query subjectDetail($subject_id: String!) {
    subjectDetail(subject_id: $subject_id) {
      pcdc_subject_id
      gender
      ageAtEntry
      race
      registeringInstitution
      diseaseTerm
      patientSubgroup
      files {
        subject_id
        file_name
        file_type
        file_description
        file_format
        file_size
        file_id
        md5sum
      }
      enrollments {
        dateOfDiagnosis
        histology
        eligibility
        gleasonScore
        consentSignedDate
        consentVersionDate
        stageAtEntry
        labsInclusionStartDate
      }
      adverseEvents{
        course
        courseDay
        onsetDate
        resolvedDate
        term
        organClass
        eventDescription
        grade
        researchAttribution
        otherAttribution
        otherExtra
        unexpectedAdverseEvents
        serious
        action
        therapy
        outcome
        expeditedReportToIRB
        expeditedReportToCCR
      }
      somaticVariant{
        genePanel500
        genePathogenicVariant
        somaticPathogenicity
      }
      germlineVariant{
        panelCode
        genePathogenicVariant
        germlinePathogenicity
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
  GET_CASE_DETAIL_DATA_QUERY,
};
