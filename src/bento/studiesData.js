import gql from 'graphql-tag';

// --------------- Icons configuration --------------
// Ideal size for siteListingIcon is 100x100 px
// Ideal size for externalLinkIcon is 16x16 px
const studyListingIcon = {
  src: 'https://raw.githubusercontent.com/CBIIT/datacommons-assets/main/bento/images/icons/svgs/programIcon.svg',
  alt: 'PCDC Studies logo',
};

const externalLinkIcon = {
  src: 'https://raw.githubusercontent.com/CBIIT/datacommons-assets/main/bento/images/icons/svgs/externalLinkIcon.svg',
  alt: 'External link icon',
};

// --------------- Table configuration --------------
const table = {
  display: true,
  title: 'Studies',
  dataField: 'sitesInfo',
  defaultSortField: 'site_id',
  defaultSortDirection: 'asc',
  selectableRows: false,
  columns: [
    {
      dataField: 'site_id',
      header: 'Study ID',
      link: '/study/{site_id}',
    },
    {
      dataField: 'siteName',
      header: 'Study Name',
    },
    {
      dataField: 'siteAddress',
      header: 'Address',
    },
    {
      dataField: 'siteStatus',
      header: 'Status',
    },
    {
      dataField: 'num_subjects',
      header: 'Associated Cases',
    },
  ],
};

// --------------- GraphQL query - Retrieve sites info --------------
const GET_STUDIES_DATA_QUERY = gql`{
  sitesInfo{
      site_id
      siteName
      siteAddress
      siteStatus
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
