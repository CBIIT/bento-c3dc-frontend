import gql from 'graphql-tag';

const programListingIcon = {
  src: 'https://raw.githubusercontent.com/CBIIT/datacommons-assets/main/bento/images/icons/svgs/programIcon.svg',
  alt: 'Bento Program Logo',
};

const externalLinkIcon = {
  src: 'https://raw.githubusercontent.com/CBIIT/datacommons-assets/main/bento/images/icons/svgs/externalLinkIcon.svg',
  alt: 'External link icon',
};

const table = {
  display: true,
  title: 'Programs',
  dataField: 'trialsInfo',
  defaultSortField: 'trial_id',
  defaultSortDirection: 'asc',
  selectableRows: false,
  columns: [
    {
      dataField: 'trial_id',
      header: 'Program ID',
      link: '/program/{trial_id}',
    },
    {
      dataField: 'trialName',
      header: 'Program Name',
    },
    {
      dataField: 'trialType',
      header: 'Program Type',
    },
    {
      dataField: 'num_subjects',
      header: 'Associated Cases',
    },
  ],
};

const GET_PROGRAMS_DATA_QUERY = gql`{
   trialsInfo{
    trial_id
    trialName
    trialType
    trialDescription
    num_subjects
   }
}`;

export {
  programListingIcon,
  externalLinkIcon,
  table,
  GET_PROGRAMS_DATA_QUERY,
};
