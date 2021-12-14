import gql from 'graphql-tag';

// --------------- Page title configuration --------------
const pageTitle = {
  label: 'Study:',
  dataField: 'study_description',
};

const pageSubTitle = {
  dataField: 'study_id',
};

const breadCrumb = {
  label: 'ALL Programs',
  link: '/programs',
};

// --------------- Aggregated count configuration --------------
const aggregateCount = {
  labelText: 'Cases',
  dataField: 'num_cases',
  link: '/cases',
  display: true,
};

// --------------- Icons configuration --------------
// Ideal size for programDetailIcon is 107x107 px
// Ideal size for externalLinkIcon is 16x16 px
const studyDetailIcon = {
  src: 'https://raw.githubusercontent.com/CBIIT/datacommons-assets/main/bento/images/icons/svgs/programIcon.svg',
  alt: 'GMB Site logo',
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
      dataField: 'study_description',
      label: 'Study',
    },
    {
      dataField: 'study_id',
      label: 'Study Id',
    },
    {
      dataField: 'siteContact',
      label: 'Contact Person',
    },
    {
      dataField: 'siteEmail',
      label: 'Email',
    },
    {
      dataField: 'sitePhone',
      label: 'Phone',
    },
    {
      dataField: 'siteStatus',
      label: 'Status',
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
      dataField: 'num_files',
      label: 'Number of files',
      fileIconSrc: 'https://raw.githubusercontent.com/CBIIT/datacommons-assets/main/bento/images/icons/svgs/programNumberofFilesIcon.svg',
      fileIconAlt: 'Number of files icon',
      display: true,
    },
  ],
};

const statBarItems = [
  {
    statTitle: 'Studies',
    type: 'field',
    statAPI: 'num_of_studies',
  },
  {
    statTitle: 'Cases',
    type: 'field',
    statAPI: 'numberOfSubjects',
  },
  {
    statTitle: 'files',
    type: 'field',
    statAPI: 'numberOfFiles',
  },
];

// --------------- Table configuration --------------
const table = {
  display: true,
  title: 'Cases',
  dataField: 'subjects',
  defaultSortField: 'subject_id',
  defaultSortDirection: 'asc',
  selectableRows: false,
  columns: [
    {
      dataField: 'pcdc_subject_id',
      header: 'Case ID',
      link: '/case/{pcdc_subject_id}',
    },
    {
      dataField: 'treatment_arm',
      header: 'Treatment Arm',
    },
    {
      dataField: 'enrolled_status',
      header: 'Enrolled Status',
    },
    {
      dataField: 'age_at_enrollment',
      header: 'Enrollment Age',
    },
    {
      dataField: 'year_at_enrollment',
      header: 'Enrollment Year',
    },
    {
      dataField: 'honest_broker_subject_id',
      header: 'Broker Subject ID',
    },
    {
      dataField: 'data_contributor_id',
      header: 'Contributor ID',
    },
  ],
};

// --------------- GraphQL query - Retrieve study details --------------

const GET_STUDY_DETAIL_DATA_QUERY = gql`query studyDetail($study_id: String) {
    studyDetails(study_id: $study_id) {
        study_id
        study_description
        num_cases
        num_files
        subjects {
            pcdc_subject_id
            honest_broker_subject_id
            data_contributor_id
            age_at_enrollment
            treatment_arm
            enrolled_status
            year_at_enrollment
        }
    }
}`;

export {
  pageTitle,
  pageSubTitle,
  aggregateCount,
  studyDetailIcon,
  leftPanel,
  rightPanel,
  externalLinkIcon,
  breadCrumb,
  GET_STUDY_DETAIL_DATA_QUERY,
  table,
  statBarItems,
};
