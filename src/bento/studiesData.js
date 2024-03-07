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
  dataField: 'studyList',
  // Value must be one of the 'field' in columns
  defaultSortField: 'study_code',
  // 'asc' or 'desc'
  defaultSortDirection: 'asc',
  // Set 'selectableRows' to true to show the row selection
  selectableRows: false,
  // A maximum of 10 columns are allowed
  columns: [
    {
      dataField: 'study_code',
      header: 'Study Code',
      tooltipText: 'Sort by Study Code',
      cellType: cellTypes.LINK,
      linkAttr: {
        rootPath: '/study',
        pathParams: ['study_code']
      },
      display: true,
    },
    {
      dataField: 'study_name',
      header: 'Study Name',
      tooltipText: 'Sort by Study Name',
      display: true,
    },
    {
      dataField: 'participants_count',
      header: 'Participants Count',
      tooltipText: 'Sort by Participants Count',
      display: true,
    },
    {
      dataField: 'diagnosis_count',
      header: 'Diagnosis Count',
      tooltipText: 'Sort by Diagnosis Count',
      display: true,
    },
  ],
};

// --------------- GraphQL query - Retrieve program info --------------
const GET_STUDIES_DATA_QUERY = gql`{
  studyList  {
    study_code
    study_name
    participants_count
    diagnosis_count
  }
}
 `;

export {
  table,
  GET_STUDIES_DATA_QUERY,
};