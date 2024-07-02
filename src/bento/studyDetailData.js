import gql from 'graphql-tag';

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
};

// --------------- GraphQL query - Retrieve program details --------------
// const GET_PROGRAM_DETAIL_DATA_QUERY = gql`
// query programDetail($program_id: String!) {
//   programDetail(program_id: $program_id) {
//     program_acronym
//     program_id
//     program_name
//     program_full_description
//     institution_name
//     program_external_url
//     num_subjects
//     num_files
//     num_samples
//     num_lab_procedures
//     disease_subtypes
//     diagnoses {
//       group
//       subjects
//     }
//     studies { 
//       study_name
//       study_type
//       study_acronym
//       study_info
//       study_full_description
//       num_subjects
//     }
//   }
// }`;

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

const studyDetailDownloadLinks = {
  "phs000467": {
    "TARGET_NBL_ClinicalData_Discovery_20220125.xlsx": "https://nci-crdc.datacommons.io/user/data/download/dg.4DFC/92192aee-a4e7-11ee-b42e-1ed67ff2713c",
    "TARGET_NBL_ClinicalData_Validation_20220125.xlsx": "https://nci-crdc.datacommons.io/user/data/download/dg.4DFC/92192b84-a4e7-11ee-b42f-1ed67ff2713c"
  },
  "phs000470": {
    "TARGET_RT_ClinicalData_Discovery_20211111.xlsx": "https://nci-crdc.datacommons.io/user/data/download/dg.4DFC/2d835abd-7ac7-491e-aa87-00f021240b17",
    "TARGET_RT_ClinicalData_Validation_20211111.xlsx": "https://nci-crdc.datacommons.io/user/data/download/dg.4DFC/0aed243f-5292-4a82-bbd0-4847590b426d"
  },
  "phs000471": {
    "TARGET_WT_ClinicalData_Discovery_20211111.xlsx": "https://nci-crdc.datacommons.io/user/data/download/dg.4DFC/ff2f8ab7-92a0-4d0a-bfd1-edf95db91590",
    "TARGET_WT_ClinicalData_Validation_20211111.xlsx": "https://nci-crdc.datacommons.io/user/data/download/dg.4DFC/c1251495-749e-413e-b2a4-31edadb86d12"
  }
};


export {
  pageTitle,
  pageSubTitle,
  aggregateCount,
  programDetailIcon,
  leftPanel,
  rightPanel,
  externalLinkIcon,
  breadCrumb,
  // GET_PROGRAM_DETAIL_DATA_QUERY,
  GET_STUDY_DETAIL_DATA_QUERY,
  table,
  studyDetailDownloadLinks

};

export async function openDoubleLink(url, setError) {
  try {
    let urlContent = await fetch(url);
    if (urlContent.ok) {
      let finalContent = await urlContent.json();
      if (typeof finalContent == "object") {
        if (finalContent.url) {
          window.location.href = finalContent.url
        } else {
          setError("The server response does not contain a valid download link");
        }
      } else {
        setError("Received an invalid response from the server. Please try again later")
      }
    } else {
      setError("Network error. Please check your internet connection and try again");
    }
  } catch (e) {
    setError("Failed to fetch the download URL. Please try again");
  }
}