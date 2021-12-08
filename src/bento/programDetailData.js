import gql from 'graphql-tag';

const pageTitle = {
  label: 'Program:',
  dataField: 'cancer',
};

const pageSubTitle = {
  dataField: 'program_id',
};

const breadcrumbs = {
  label: 'All Programs',
  link: '/programs',
};

const aggregateCount = {
  labelText: 'Cases',
  dataField: 'num_subjects',
  link: '/cases',
  display: true,
};

const GET_PROGRAM_DETAIL_DATA_QUERY = gql`query programDetail($progam_id: String){
  programDetail(program_id: $program_id) {
    program_id
    cancer
    headquarters
    consortium_manager
    consortium
    num_subjects
    num_files
    studies{
      study_id
      study_description
      subject_count
    }
  }
}`;

// const GET_PROGRAM_DETAIL_DATA_QUERY = gql`query trialDetail($program_id: String){
//     trialDetail(trial_id: $program_id){
//         trial_id
//         trialName
//         trialLongName
//         trialDesription
//         leadOrganization
//         trialType
//         trialPrincipalInvestigator
//         num_subjects
//         num_files
//         sites{
//           site_id
//           siteName
//           siteAddress
//           siteStatus
//           subjectCount
//         }
//     }
//     subjectCountByStageAtEntry(trial_id: $program_id){
//         group
//         subjects
//     }
// }`;

const programDetailIcon = {
  src: 'https://raw.githubusercontent.com/CBIIT/datacommons-assets/main/bento/images/icons/svgs/programIcon.svg',
  alt: 'PCDC Program logo',
};

const leftPanel = {
  attributes: [
    {
      dataField: 'cancer',
      label: 'Program',
    },
    {
      dataField: 'program_headquarters',
      label: 'Program Headquarters',
    },
    {
      dataField: 'program_id',
      label: 'Program Id',
    },
    {
      dataField: 'program_consortium',
      label: 'Program Consortium',
    },
    {
      dataField: 'consortium_manager',
      label: 'Program Consortium Manager',
    },
  ],
};

const rightPanel = {
  widget: [
    {
      dataField: 'N/A',
      label: 'Stage at Entry Distribution',
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

const externalLinkIcon = {
  src: 'https://raw.githubusercontent.com/CBIIT/datacommons-assets/main/bento/images/icons/svgs/externalLinkIcon.svg',
  alt: 'External link icon',
};

const table = {
  display: true,
  title: 'Studies',
  dataField: 'studies',
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
    /* {
      dataField: 'siteAddress',
      header: 'Address',
    },
    {
      dataField: 'siteStatus',
      header: 'Status',
    },
    {
      dataField: 'subjectCount',
      header: 'Cases',
    }, */
  ],
};

export {
  pageTitle,
  pageSubTitle,
  aggregateCount,
  programDetailIcon,
  leftPanel,
  rightPanel,
  externalLinkIcon,
  breadcrumbs,
  GET_PROGRAM_DETAIL_DATA_QUERY,
  table,
};
