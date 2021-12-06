import gql from 'graphql-tag';

const pageTitle = {
  label: 'Program:',
  dataField: 'trialName',
};

const pageSubTitle = {
  dataField: 'trial_id',
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

const GET_PROGRAM_DETAIL_DATA_QUERY = gql`query trialDetail($trial_id: String){
    trialDetail(trial_id: $trial_id){
        trial_id
        trialName
        trialLongName
        trialDesription
        leadOrganization
        trialType
        trialPrincipalInvestigator
        num_subjects
        num_files
        sites{
          site_id
          siteName
          siteAddress
          siteStatus
          subjectCount
        }
    }
    subjectCountByStageAtEntry(trial_id: $trial_id){
        group
        subjects
    }
}`;

const programDetailIcon = {
  src: 'https://raw.githubusercontent.com/CBIIT/datacommons-assets/main/bento/images/icons/svgs/programIcon.svg',
  alt: 'PCDC Program logo',
};

const leftPanel = {
  attributes: [
    {
      dataField: 'trialName',
      label: 'Program',
    },
    {
      dataField: 'trialLongName',
      label: 'Program Name',
    },
    {
      dataField: 'trial_id',
      label: 'Program Id',
    },
    {
      dataField: 'trialDesription',
      label: 'Program Description',
    },
    {
      dataField: 'leadOrganization',
      label: 'Lead Organization',
    },
    {
      dataField: 'trialPrincipalInvestigator',
      label: 'Principal Investigator',
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
  title: 'Sites',
  dataField: 'sites',
  defaultSortField: 'site_id',
  defaultSortDirection: 'asc',
  selectableRows: false,
  columns: [
    {
      dataField: 'site_id',
      header: 'Site ID',
      link: '/study/{site_id}',
    },
    {
      dataField: 'siteName',
      header: 'Name',
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
      dataField: 'subjectCount',
      header: 'Cases',
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
  table,
};
