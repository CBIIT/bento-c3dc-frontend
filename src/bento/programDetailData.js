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
  labelText: 'Studies',
  dataField: 'num_studies',
  link: '/studies',
  display: true,
};

const statBarItems = [
  {
    statTitle: 'Programs',
    type: 'field',
    statAPI: 'numOfPrograms',
  },
  {
    statTitle: 'Studies',
    type: 'field',
    statAPI: 'num_of_studies',
  },
  {
    statTitle: 'Files',
    type: 'field',
    statAPI: 'numberOfFiles',
  },
];

const GET_PROGRAM_DETAIL_DATA_QUERY = gql`query programDetails($program_id : String){
  programDetails(program_id: $program_id) {
    cancer
    program_headquarters
    program_consortium_manager
    num_studies
    num_files
    program_consortium
    studies{
      study_id
      study_description
    }
  }
    programSubjectCountByTreatmentArm(program_ids: [$program_id]) {
        group
        subjects
    }
}`;

const programDetailIcon = {
  src: 'https://raw.githubusercontent.com/CBIIT/datacommons-assets/main/bento/images/icons/svgs/programIcon.svg',
  alt: 'C3DC Program logo',
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
      dataField: 'program_consortium_manager',
      label: 'Program Consortium Manager',
    },
    {
      dataField: 'num_studies',
      label: 'No. of Studies',
    },
    {
      dataField: 'num_files',
      label: 'No. of Files',
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
      link: '/studies/{study_id}',
    },
    {
      dataField: 'study_description',
      header: 'Study Description',
    },
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
  statBarItems,
  table,
};
