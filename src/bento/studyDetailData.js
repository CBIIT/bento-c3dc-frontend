import gql from 'graphql-tag';
/*
// --------------- Page title configuration --------------
const pageTitle = {
  label: 'Program :',
  dataField: 'program_acronym',
};

const pageSubTitle = {
  dataField: 'program_id',
};

const breadCrumb = {
  label: 'ALL PROGRAMS',
  link: '/programs',
};

// --------------- Aggregated count configuration --------------
const aggregateCount = {
  labelText: 'Cases',
  dataField: 'num_subjects',
  link: '/explore',
  display: true,
};

// --------------- Icons configuration --------------
// Ideal size for programDetailIcon is 107x107 px
// Ideal size for externalLinkIcon is 16x16 px

const programDetailIcon = {
  src: 'https://raw.githubusercontent.com/CBIIT/datacommons-assets/main/bento/images/icons/svgs/programIcon.svg',
  alt: 'Bento program logo',
};

const externalLinkIcon = {
  src: 'https://raw.githubusercontent.com/CBIIT/datacommons-assets/main/bento/images/icons/svgs/externalLinkIcon.svg',
  alt: 'External link icon',
};

// --------------- Left Pannel configuration --------------
// A maximum of 6 leftPanelattributes are allowed
const leftPanel = {
  attributes: [
    {
      dataField: 'program_acronym',
      label: 'Program',
    },
    {
      dataField: 'program_name',
      label: 'Program Name',
    },
    {
      dataField: 'program_id',
      label: 'Program Id',
    },
    {
      dataField: 'study_description',
      label: 'Program Description',
    },
    {
      dataField: 'institution_name',
      label: 'Institution',
    },
    {
      dataField: 'program_external_url',
      label: 'External Link to Program',
      externalLinkToLabel: true,
    },
  ],
};
*/

// --------------- Right Pannel configuration --------------
// Ideal size for fileIconSrc is 66x53 px
const rightPanel = {
  widget: [
    {
      dataField: 'diagnoses',
      label: 'Diagnosis',
      display: true,
    },
  ],
  files: [
    {
      dataField: 'num_participants',
      label: 'PARTICIPANTS',
      display: true,
    },
    {
      dataField: 'num_survivals',
      label: 'SURVIVAL RECORDS',
      display: true,
    },
    {
      dataField: 'num_diseases',
      label: 'DIAGNOSES',
      display: true,
    },
    {
      dataField: 'num_anatomic_sites',
      label: 'ANATOMICAL SITES',
      display: true,
    },
  ],
};
/*
// --------------- Table configuration --------------
const table = {
  // Set 'display' to false to hide the table entirely
  display: true,
  // Table title
  title: 'ARMS',
  // Field name for table data, need to be updated only when using a different GraphQL query
  dataField: 'studies',
  // Value must be one of the 'field' in columns
  defaultSortField: 'study_acronym',
  // 'asc' or 'desc'
  defaultSortDirection: 'asc',
  // Set 'selectableRows' to true to show the row selection
  selectableRows: false,
  // A maximum of 10 columns are allowed
  columns: [
    {
      dataField: 'study_acronym',
      header: 'Arm',
      link: '/arm/{study_acronym}'
    },
    {
      dataField: 'study_name',
      header: 'Arm Name',
    },
    {
      dataField: 'study_full_description',
      header: 'Arm Description',
    },
    {
      dataField: 'study_type',
      header: 'Arm Type',
    },
    {
      dataField: 'num_subjects',
      header: 'Associated Cases',
    },
  ],
};*/

const GET_STUDY_DETAIL_DATA_QUERY = gql`
query studyDetails($study_id: String) {
  studyDetails(study_id: $study_id) {
      dbgap_accession
      study_description
      num_participants
      num_diseases
      num_anatomic_sites
      num_survivals
      
      __typename
  }
}`

//const downloadLinkPrefix = "https://d2ugardyiv9yoe.cloudfront.net/"; //non-prod
const downloadLinkPrefix = "https://d2l5jy2ao2mx5b.cloudfront.net/"; //prod

const studyDetailDownloadLinks = {
  "phs000466": {
    "TARGET_CCSK_ClinicalData_Discovery_20170525.xlsx": downloadLinkPrefix + "TARGET-CCSK_clinicalData_PUBLIC_20220207/TARGET_CCSK_ClinicalData_Discovery_20170525.xlsx",
  },
  "phs000467": {
    "TARGET_NBL_ClinicalData_Discovery_20220125.xlsx": downloadLinkPrefix + "target-nbl/TARGET_NBL_ClinicalData_Discovery_20220125.xlsx",
    "TARGET_NBL_ClinicalData_Validation_20220125.xlsx": downloadLinkPrefix + "target-nbl/TARGET_NBL_ClinicalData_Validation_20220125.xlsx",
  },
  "phs000470": {
    "TARGET_RT_ClinicalData_Discovery_20211111.xlsx": downloadLinkPrefix + "TARGET-RT_clinicalData_PUBLIC_20220209/TARGET_RT_ClinicalData_Discovery_20211111.xlsx",
    "TARGET_RT_ClinicalData_Validation_20211111.xlsx": downloadLinkPrefix + "TARGET-RT_clinicalData_PUBLIC_20220209/TARGET_RT_ClinicalData_Validation_20211111.xlsx",
  },
  "phs000471": {
    "TARGET_WT_ClinicalData_Discovery_20211111.xlsx": downloadLinkPrefix + "TARGET-WT_clinicalData_PUBLIC_20220131/TARGET_WT_ClinicalData_Discovery_20211111.xlsx",
    "TARGET_WT_ClinicalData_Validation_20211111.xlsx": downloadLinkPrefix + "TARGET-WT_clinicalData_PUBLIC_20220131/TARGET_WT_ClinicalData_Validation_20211111.xlsx",
  }
};


export {
  //pageTitle,
  //pageSubTitle,
  //aggregateCount,
  //programDetailIcon,
  //leftPanel,
  rightPanel,
  //externalLinkIcon,
  //breadCrumb,
  // GET_PROGRAM_DETAIL_DATA_QUERY,
  GET_STUDY_DETAIL_DATA_QUERY,
  //table,
  studyDetailDownloadLinks

};