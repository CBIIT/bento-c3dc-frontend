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
  dataField: 'listOfPrograms',
  defaultSortField: 'program_id',
  defaultSortDirection: 'asc',
  selectableRows: false,
  columns: [
    {
      dataField: 'program_id',
      header: 'Program ID',
      link: '/program/{program_id}',
    },
    {
      dataField: 'cancer',
      header: 'Cancer Name',
    }, {
      dataField: 'program_consortium',
      header: 'Program Consortium',
    }, {
      dataField: 'consortium_manager',
      header: 'Consortium Manager',
    },
    {
      dataField: 'program_headquarters',
      header: 'Program Headquarters',
    },
    {
      dataField: 'associated_sub_count',
      header: 'Associated Subjects',
      link: '/cases',
    },
  ],
};

// const GET_PROGRAMS_DATA_QUERY = gql`{
//    trialsInfo{
//     trial_id
//     trialName
//     trialType
//     trialDescription
//     num_subjects
//    }
// }`;

const GET_PROGRAMS_DATA_QUERY = gql`{
  listOfPrograms{
    program_id
    cancer
    program_consortium
    consortium_manager
    program_headquarters
    associated_sub_count
   }
}`;

export {
  programListingIcon,
  externalLinkIcon,
  table,
  GET_PROGRAMS_DATA_QUERY,
};
