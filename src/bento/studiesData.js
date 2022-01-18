import gql from 'graphql-tag';

// --------------- Icons configuration --------------
// Ideal size for siteListingIcon is 100x100 px
// Ideal size for externalLinkIcon is 16x16 px
const studyListingIcon = {
  src: 'https://raw.githubusercontent.com/CBIIT/datacommons-assets/main/bento/images/icons/svgs/programIcon.svg',
  alt: 'C3DC Studies logo',
};

const externalLinkIcon = {
  src: 'https://raw.githubusercontent.com/CBIIT/datacommons-assets/main/bento/images/icons/svgs/externalLinkIcon.svg',
  alt: 'External link icon',
};

// --------------- Table configuration --------------
const table = {
  display: true,
  title: 'Studies',
  dataField: 'list_of_studies',
  defaultSortField: 'study_id',
  defaultSortDirection: 'asc',
  selectableRows: false,
  columns: [
    {
      dataField: 'study_id',
      header: 'Study ID',
      link: '/study/{study_id}',
    },
    {
      dataField: 'study_description',
      header: 'Study Description',
    },
    {
      dataField: 'associated_subject_count',
      header: 'Associated Subject Count',
    },
  ],
};

// --------------- GraphQL query - Retrieve studies info --------------
const GET_STUDIES_DATA_QUERY = gql`{
  list_of_studies{
      study_id
      study_description
      associated_subject_count
  }
}`;

export {
  studyListingIcon,
  externalLinkIcon,
  table,
  GET_STUDIES_DATA_QUERY,
};
