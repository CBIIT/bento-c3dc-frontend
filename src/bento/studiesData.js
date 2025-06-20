import gql from 'graphql-tag';
import { cellTypes } from '@bento-core/table';

// --------------- Table configuration --------------
const table = {
  // Set 'display' to false to hide the table entirely
  name: 'studies',
  display: true,
  dataKey: 'study_name',
  tableID: 'studies_table',
  // Table title
  title: 'C3DC Studies',
  // Field name for table data, need to be updated only when using a different GraphQL query
  dataField: 'studiesListing',
  // Value must be one of the 'field' in columns
  defaultSortField: 'dbgap_accession',
  // 'asc' or 'desc'
  defaultSortDirection: 'asc',
  // Set 'selectableRows' to true to show the row selection
  selectableRows: false,
  // A maximum of 10 columns are allowed
  columns: [
    {
      dataField: 'study_name',
      header: 'Study Name',
      tooltipText: 'Sort by Study Name',
      display: true,
      linkAttr: {
        rootPath: '/studies/',
        linkField: 'dbgap_accession',
      },
      cellType: cellTypes.CUSTOM_ELEM,
    },
    {
      dataField: 'num_participants',
      header: 'Participants Count',
      tooltipText: 'Sort by Participants Count',
      display: true,
      role: cellTypes.COMMA,
        cellType: cellTypes.COMMA,
    },
    {
      dataField: 'num_diseases',
      header: 'Diagnosis Count',
      tooltipText: 'Sort by Diagnosis Count',
      display: true,
    },
    {
      dataField: 'dbgap_accession',
      header: 'dbGaP Accession',
      tooltipText: 'Sort by dbGaP ACCESSION',
      cellType: cellTypes.CUSTOM_ELEM,
      linkAttr: {
          rootPath: 'https://www.ncbi.nlm.nih.gov/projects/gap/cgi-bin/study.cgi?study_id=',
      },
      display: true,
    },
  ],
};

// --------------- GraphQL query - Retrieve program info --------------
const GET_STUDIES_DATA_QUERY = gql`{
  studiesListing  {
    dbgap_accession
    study_name
    num_participants
    num_diseases
  }
}
 `;

export {
  table,
  GET_STUDIES_DATA_QUERY,
};