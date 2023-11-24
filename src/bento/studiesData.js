import gql from 'graphql-tag';

// --------------- Icons configuration --------------
// Ideal size for programListingIcon is 100x100 px
// Ideal size for externalLinkIcon is 16x16 px
const studyListingIcon = {
  src: 'https://raw.githubusercontent.com/CBIIT/datacommons-assets/main/bento/images/icons/svgs/programIcon.svg',
  alt: 'Bento program logo',
};

const externalLinkIcon = {
  src: 'https://raw.githubusercontent.com/CBIIT/datacommons-assets/main/bento/images/icons/svgs/externalLinkIcon.svg',
  alt: 'External link icon',
};

// --------------- Table configuration --------------
const table = {
  // Set 'display' to false to hide the table entirely
  display: true,
  // Table title
  title: 'Studies',
  // Field name for table data, need to be updated only when using a different GraphQL query
  dataField: 'studyInfo',
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
      header: 'Study Code',
      link: '/study/{study_id}',
      display: true
    },
    {
      dataField: 'study_id',
      header: 'Study ID',
    },
    {
      dataField: 'study_name',
      header: 'Study Name',
    },
    {
      dataField: 'start_date',
      header: 'Start Date',
    },
    {
      dataField: 'end_date',
      header: 'End Date',
    },
    {
      dataField: 'pubmed_id',
      header: 'PubMed ID',
      link: 'https://pubmed.ncbi.nlm.nih.gov/{pubmed_id}',
    },
    {
      dataField: 'num_studies',
      header: 'Number of Arms',
    },
    {
      dataField: 'num_subjects',
      header: 'Associated Cases',
    },
  ],
};

// --------------- GraphQL query - Retrieve study info --------------
const GET_STUDIES_DATA_QUERY = gql`{
  studyInfo {
    study_acronym
    study_id
    study_name
    start_date
    end_date
    pubmed_id
    num_studies
    num_subjects
    }
  }
 `;

export {
  studyListingIcon,
  externalLinkIcon,
  table,
  GET_STUDIES_DATA_QUERY,
};
