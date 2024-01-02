import gql from 'graphql-tag';
import studiesLogo from '../assets/stats/Studies_Logo.svg';
import participantsLogo from '../assets/stats/Participants_Logo.svg';
import diagnosisLogo from '../assets/stats/Diagnosis_Logo.svg';


export const statsStyling = {
  global: {
    horizontalStyle: false,
    statTitleFirst: false,
    height: '56px',
    background: '#A7DBD6',
    top: '0',
    position: 'relative',
  },
  statsGroup: {
    margin: '6px 9.25px',
    padding: '0.1% 6% 2% 6%',
    borderRight: '1px solid #0B3556',
    '&:first-child': {
      padding: '0.1% 6% 2% 6%',
    },
    '&:last-child': {
      padding: '0.1% 6% 2% 6%',
    },
  },
  statsIcon: {
    width: '40px',
    height: '45px',
    margin: '7px 0px 0px -45px',
    position: 'relative',
  },
  statCount: {
    color: '#003D3D',
    fontFamily: 'Oswald',
    fontSize: '20px',
    lineHeight: '17px',
    letterSpacing: '0.02em',
    margin: '4px 0 2px 13px',
  },
  statTitle: {
    color: '#062D4F',
    fontFamily: 'Nunito',
    fontSize: '12px',
    fontWeight: '700',
    lineHeight: '16px',
    textTransform: 'uppercase',
    margin: '0 0 0 13px',
  },
};

/**
 * @property {statAPI} numberOfPrograms Used to index a stat value
 */
export const globalStatsData = [
  // A maximum of 6 stats are allowed
  {
    statTitle: 'Diagnoses',
    type: 'field',
    statAPI: 'numberOfDiagnoses',
    statIconSrc: diagnosisLogo,
    statIconAlt: 'A teddy bear representing Diagnosis'
  },
  {
    statTitle: 'Participants',
    type: 'field',
    statAPI: 'numberOfParticipants',
    statIconSrc: participantsLogo,
    statIconAlt: 'A teddy bear representing participants'
  },
  {
    statTitle: 'Studies',
    type: 'field',
    statAPI: 'numberOfStudies',
    statIconSrc: studiesLogo,
    statIconAlt: 'A teddy bear representing Studies'
  },
];

// --------------- GraphQL query - Retrieve stats details --------------
export const GET_GLOBAL_STATS_DATA_QUERY = gql`
query search(
  # Demographics
  $participant_ids: [String],
  $ethnicity: [String],
  $race: [String],
  $sex_at_birth: [String],

  # Diagnoses
  $age_at_diagnosis: [Int],
  $anatomic_site: [String],
  $diagnosis_classification: [String],
  $diagnosis_classification_system: [String],
  $diagnosis_verification_status: [String],
  $diagnosis_basis: [String],
  $disease_phase: [String],

  # Studies
  $phs_accession: [String],
  $study_acronym: [String],
  $study_short_title: [String],

  # Survivals
  $age_at_last_known_survival_status: [Int],
  $first_event: [String],
  $last_known_survival_status: [String]
) {
getParticipants(
  # Demographics
  participant_ids: $participant_ids,
  ethnicity: $ethnicity,
  race: $race,
  sex_at_birth: $sex_at_birth,

  # Diagnoses
  age_at_diagnosis: $age_at_diagnosis,
  anatomic_site: $anatomic_site,
  diagnosis_classification: $diagnosis_classification,
  diagnosis_classification_system: $diagnosis_classification_system,
  diagnosis_verification_status: $diagnosis_verification_status,
  diagnosis_basis: $diagnosis_basis,
  disease_phase: $disease_phase,
  
  # Studies
  phs_accession: $phs_accession,
  study_acronym: $study_acronym,
  study_short_title: $study_short_title,

  # Survivals
  age_at_last_known_survival_status: $age_at_last_known_survival_status,
  first_event: $first_event,
  last_known_survival_status: $last_known_survival_status
) {
  numberOfParticipants
  numberOfDiagnoses
  numberOfStudies

  # Widget counts
  participantCountByEthnicity {
    group
    subjects
    __typename
  }
  participantCountByRace {
    group
    subjects
    __typename
  }
  participantCountBySexAtBirth {
    group
    subjects
    __typename
  }
  participantCountByAgeAtLastKnownSurvivalStatus {
    group
    subjects
    __typename
  }
  participantCountByFirstEvent {
    group
    subjects
    __typename
  }
  participantCountByLastKnownSurvivalStatus {
    group
    subjects
    __typename
  }

  # Demographic filter counts
  filterParticipantCountByEthnicity {
    group
    subjects
    __typename
  }
  filterParticipantCountByRace {
    group
    subjects
    __typename
  }
  filterParticipantCountBySexAtBirth {
    group
    subjects
    __typename
  }

  # Diagnosis filter counts
  filterParticipantCountByAgeAtDiagnosis {
    lowerBound
    upperBound
    subjects
    __typename
  }
  filterParticipantCountByAnatomicSite {
    group
    subjects
    __typename
  }
  filterParticipantCountByDiagnosisClassification {
    group
    subjects
    __typename
  }
  filterParticipantCountByDiagnosisClassificationSystem {
    group
    subjects
    __typename
  }
  filterParticipantCountByDiagnosisVerificationStatus {
    group
    subjects
    __typename
  }
  filterParticipantCountByDiagnosisBasis {
    group
    subjects
    __typename
  }
  filterParticipantCountByDiseasePhase {
    group
    subjects
    __typename
  }

  # Study filter counts
  filterParticipantCountByPhsAccession {
    group
    subjects
    __typename
  }
  filterParticipantCountByStudyAcronym {
    group
    subjects
    __typename
  }
  filterParticipantCountByStudyShortTitle {
    group
    subjects
    __typename
  }

  # Survival filter counts
  filterParticipantCountByAgeAtLastKnownSurvivalStatus {
    lowerBound
    upperBound
    subjects
    __typename
  }
  filterParticipantCountByFirstEvent {
    group
    subjects
    __typename
  }
  filterParticipantCountByLastKnownSurvivalStatus {
    group
    subjects
    __typename
  }
  __typename
}
}

  `;
