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
query search($participant_id: [String]) {
  findParticipantIdsInList(participant_id: $participant_id) {
    participant_id
    study_id
    __typename
  }
}
`;

export const GET_IDS_BY_TYPE = () => gql`{
  idsLists {
    participantIds
    associatedIds {
      associated_id
      participant_id
    }
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
