import gql from 'graphql-tag';

// --------------- Page title configuration --------------
const pageTitle = {
  label: 'Study:',
  dataField: 'siteName',
};

const pageSubTitle = {
  dataField: 'site_id',
};

const breadCrumb = {
  label: 'ALL Programs',
  link: '/programs',
};

// --------------- Aggregated count configuration --------------
const aggregateCount = {
  labelText: 'Cases',
  dataField: 'num_subjects',
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
      dataField: 'siteName',
      label: 'Study',
    },
    {
      dataField: 'site_id',
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
      dataField: 'subject_id',
      header: 'Case ID',
      link: '/case/{subject_id}',
    },
    {
      dataField: 'race',
      header: 'Race',
    },
    {
      dataField: 'diseaseTerm',
      header: 'DiseaseTerm',
    },
  ],
};

// --------------- GraphQL query - Retrieve study details --------------
const GET_STUDY_DETAIL_DATA_QUERY = gql`query studyDetail($study_id: String){
    studyDetail(study_id: $study_id){       
      study_id
      study_description
      num_subjects
      num_files
      subjects{
        pcdc_subject_id
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
};
