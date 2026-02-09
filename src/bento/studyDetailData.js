import gql from 'graphql-tag';

// --------------- Right Panel configuration --------------
// Ideal size for fileIconSrc is 66x53 px
const rightPanel = {
  widget: [
    {
      dataField: 'diagnoses',
      label: 'Diagnosis',
      display: true,
    },
  ],
  files: [
    {
      dataField: 'num_participants',
      label: 'PARTICIPANTS',
      display: true,
    },
    {
      dataField: 'num_survivals',
      label: 'SURVIVAL RECORDS',
      display: true,
    },
    {
      dataField: 'num_diseases',
      label: 'DIAGNOSES',
      display: true,
    },
    {
      dataField: 'num_anatomic_sites',
      label: 'ANATOMICAL SITES',
      display: true,
    },
  ],
};

const GET_STUDY_DETAIL_DATA_QUERY = gql`
query studyDetails($study_id: String) {
  studyDetails(study_id: $study_id) {
      dbgap_accession
      study_description
      num_participants
      num_diseases
      num_anatomic_sites
      num_survivals
      
      __typename
  }
}`;


export {
  rightPanel,
  GET_STUDY_DETAIL_DATA_QUERY,
};