import gql from 'graphql-tag';

// --------------- GraphQL query - Retrieve stats details --------------
export const GET_ALL_IDS = gql`{
  idsLists{
    subjectIds
    sampleIds
    fileIds
    fileNames
}
  }
  `;

export const GET_PARTICIPANT_IDS = gql`
  query search ($participant_ids: [String]){
    findParticipantIdsInList (participant_ids: $participant_ids) {
        participant_ids
        program_id
    }
}
`;

export const GET_IDS_BY_TYPE = (type) => gql`{
  idsLists {
    ${type}
  }
}
`;

// type: 'sunburst' | 'donut'
// title: string
// dataName: string
// datatable_level1_field: string
// datatable_level2_field: string
// datatable_field: string
// sliceTitle: string (optional)
export const widgetsSearchData = [
  {
    type: 'sunburst',
    title: 'Programs and Arms',
    dataName: 'armsByPrograms',
    mapWithDashboardWidget: 'armsByPrograms',
    datatable_level1_field: 'program',
    datatable_level2_field: 'arm',
  },
  {
    type: 'donut',
    title: 'Diagnosis',
    dataName: 'subjectCountByDiagnosesFromLists',
    mapWithDashboardWidget: 'subjectCountByDiagnoses',
  },
  {
    type: 'donut',
    title: 'Recurrence Score',
    dataName: 'subjectCountByRecurrenceScoreFromLists',
    mapWithDashboardWidget: 'subjectCountByRecurrenceScore',
  },
  {
    type: 'donut',
    title: 'Tumor Size',
    dataName: 'subjectCountByTumorSizeFromLists',
    mapWithDashboardWidget: 'subjectCountByTumorSize',
  },
  {
    type: 'donut',
    title: 'Chemotherapy',
    dataName: 'subjectCountByChemotherapyRegimenFromLists',
    mapWithDashboardWidget: 'subjectCountByChemotherapyRegimen',
  },
  {
    type: 'donut',
    title: 'Endocrine Therapy',
    dataName: 'subjectCountByEndocrineTherapyFromLists',
    mapWithDashboardWidget: 'subjectCountByEndocrineTherapy',
  },
];

export const ageAtIndex = 10;
