import gql from 'graphql-tag';
import { cellTypes } from '@bento-core/table';
import questionIcon from '../assets/icons/Question_Icon.svg';
import React from 'react';

// --------------- Tooltip configuration --------------

const newCohortToolTip = 
  <p style={{ fontFamily: "Poppins", fontWeight: 400, margin: 0 }}>
    Create a new cohort with the selected Participant IDs. 
    <br/> 
    <div style={{height: 10}}/>
    <b>
      Note:&nbsp;
    </b> 
    The optimal number of participants in a cohort is =&lt; 4000 participants
  </p>;
const existingCohortToolTip = 
  <p style={{ fontFamily: "Poppins", fontWeight: 400, margin: 0 }}>
    Add selected Participant IDs to existing cohort from dropdown list.
    <br/>
    <div style={{height: 10}}/>
    <b>
      Note:&nbsp;
    </b>
    The optimal number of participants in a cohort is =&lt; 4000 participants
  </p>;

export const tooltipContentAddToNewCohort = {
    icon: questionIcon,
    alt: 'tooltipIcon',
    maxWidth:'290px',
    Participants: newCohortToolTip,
    Diagnosis: newCohortToolTip,
    Studies: newCohortToolTip,
    Treatment: newCohortToolTip,
    Survival: newCohortToolTip,
    "Treatment Response": newCohortToolTip,
    "Genetic Analysis": newCohortToolTip,
    arrow: true,
}

export const tooltipContentAddToExistingCohort = {
  icon: questionIcon,
  alt: 'tooltipIcon',
  maxWidth:'290px',
  Participants: existingCohortToolTip,
  Diagnosis: existingCohortToolTip,
  Studies: existingCohortToolTip,
  Survival: existingCohortToolTip,
  Treatment: existingCohortToolTip,
  "Treatment Response": existingCohortToolTip,
  "Genetic Analysis": existingCohortToolTip,
  arrow: true,
}

export const tooltipContentListAll = {
  icon: questionIcon,
  alt: 'tooltipIcon',
  Participants: 'Click to view the complete list of all cohorts',
  Diagnosis: 'Click to view the complete list of all cohorts',
  Studies: 'Click to view the complete list of all cohorts',
  Treatment: 'Click to view the complete list of all cohorts',
  Survival: 'Click to view the complete list of all cohorts',
  "Treatment Response": 'Click to view the complete list of all cohorts',
  "Genetic Analysis": 'Click to view the complete list of all cohorts',
  arrow: true,
}

// --------------- Dahboard Table external link configuration --------------
// Ideal size for externalLinkIcon is 16x16 px
export const externalLinkIcon = {
  src: 'https://raw.githubusercontent.com/CBIIT/datacommons-assets/main/bento/images/icons/svgs/externalLinkIcon.svg',
  alt: 'External link icon',
};

// --------------- Responsive Tab Breakpoint Configuration --------------
export const tabResponsiveBreakpoints = {
  breakpoints: [
    { maxWidth: 1249, tabLimit: 2 },
    { maxWidth: 1399, tabLimit: 3 },
    { maxWidth: 1549, tabLimit: 4 },
    { maxWidth: 1699, tabLimit: 5 },
  ],
  defaultTabLimit: 6, // >= 1700px
};

//NOTE: Change 'getParticipants' to 'searchParticipants' in the backend.
export const DASHBOARD_QUERY_NEW = gql`
query search(
  # Demographics
  $participant_pk: [String],
  $participant_id: [String],
  $race: [String],
  $sex_at_birth: [String],

  # Diagnoses
  $age_at_diagnosis: [Int],
  $anatomic_site: [String],
  $diagnosis: [String],
  $diagnosis_classification_system: [String],
  $diagnosis_basis: [String],
  $disease_phase: [String],

  # Genetic Analyses
  $alteration: [String],
  $alteration_type: [String],
  $fusion_partner_gene: [String],
  $gene_symbol: [String],
  $reported_significance: [String],
  $reported_significance_system: [String],
  $status: [String],

  # Studies
  $dbgap_accession: [String],
  $study_name: [String],

  # Survivals
  $age_at_last_known_survival_status: [Int],
  $cause_of_death: [String],
  $first_event: [String],
  $last_known_survival_status: [String],

  # Treatments
  $age_at_treatment_start: [Int],
  $age_at_treatment_end: [Int],
  $treatment_type: [String],
  $treatment_agent: [String],

  # Treatment Responses
  $response: [String],
  $age_at_response: [Int],
  $response_category: [String],
  $response_system: [String]
) {
getParticipants(
  # Demographics
  participant_pk: $participant_pk,
  participant_id: $participant_id,
  race: $race,
  sex_at_birth: $sex_at_birth,

  # Diagnoses
  age_at_diagnosis: $age_at_diagnosis,
  anatomic_site: $anatomic_site,
  diagnosis: $diagnosis,
  diagnosis_classification_system: $diagnosis_classification_system,
  diagnosis_basis: $diagnosis_basis,
  disease_phase: $disease_phase,

  # Genetic Analyses
  alteration: $alteration,
  alteration_type: $alteration_type,
  fusion_partner_gene: $fusion_partner_gene,
  gene_symbol: $gene_symbol,
  reported_significance: $reported_significance,
  reported_significance_system: $reported_significance_system,
  status: $status,
  
  # Studies
  dbgap_accession: $dbgap_accession,
  study_name: $study_name,

  # Survivals
  age_at_last_known_survival_status: $age_at_last_known_survival_status,
  cause_of_death: $cause_of_death,
  first_event: $first_event,
  last_known_survival_status: $last_known_survival_status

  # Treatments
  age_at_treatment_start: $age_at_treatment_start,
  age_at_treatment_end: $age_at_treatment_end,
  treatment_type: $treatment_type,
  treatment_agent: $treatment_agent,

  # Treatment Responses
  response: $response,
  age_at_response: $age_at_response,
  response_category: $response_category,
  response_system: $response_system
) {
  numberOfParticipants
  numberOfDiagnoses
  numberOfDiseases
  numberOfGeneticAnalyses
  numberOfStudies
  numberOfSurvivals
  numberOfTreatments
  numberOfTreatmentResponses

  # Widget counts
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
  participantCountByAgeAtDiagnosis {
    group
    subjects
    __typename
  }
  participantCountByAnatomicSite {
    group
    subjects
    __typename
  }
  participantCountByDiagnosis {
    group
    subjects
    __typename
  }
  participantCountByTreatmentType {
    group
    subjects
    __typename
  }

  # Demographic filter counts
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
  filterParticipantCountByDiagnosis {
    group
    subjects
    __typename
  }
  filterParticipantCountByDiagnosisClassificationSystem {
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

  # Genetic Analysis filter counts
  filterParticipantCountByAlteration {
    group
    subjects
    __typename
  }
  filterParticipantCountByAlterationType {
    group
    subjects
    __typename
  }
  filterParticipantCountByFusionPartnerGene {
    group
    subjects
    __typename
  }
  filterParticipantCountByGeneSymbol {
    group
    subjects
    __typename
  }
  filterParticipantCountByReportedSignificance {
    group
    subjects
    __typename
  }
  filterParticipantCountByReportedSignificanceSystem {
    group
    subjects
    __typename
  }
  filterParticipantCountByStatus {
    group
    subjects
    __typename
  }

  # Study filter counts
  filterParticipantCountByDbgapAccession {
    group
    subjects
    __typename
  }
  filterParticipantCountByStudyName {
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
  filterParticipantCountByCauseOfDeath {
    group
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

  # Treatment filter counts
  filterParticipantCountByAgeAtTreatmentStart {
    lowerBound
    upperBound
    subjects
    __typename
  }
  filterParticipantCountByAgeAtTreatmentEnd {
    lowerBound
    upperBound
    subjects
    __typename
  }
  filterParticipantCountByTreatmentType {
    group
    subjects
    __typename
  }
  filterParticipantCountByTreatmentAgent {
    group
    subjects
    __typename
  }

  # Treatment Response filter counts
  filterParticipantCountByResponse {
    group
    subjects
    __typename
  }
  filterParticipantCountByAgeAtResponse {
    lowerBound
    upperBound
    subjects
    __typename
  }
  filterParticipantCountByResponseCategory {
    group
    subjects
    __typename
  }
  filterParticipantCountByResponseSystem {
    group
    subjects
    __typename
  }

  __typename
}}
`;

export const DASHBOARD_QUERY_STATS = gql`
query search(
  # Demographics
  $participant_pk: [String],
  $participant_id: [String],
  $race: [String],
  $sex_at_birth: [String],

  # Diagnoses
  $age_at_diagnosis: [Int],
  $anatomic_site: [String],
  $diagnosis: [String],
  $diagnosis_classification_system: [String],
  $diagnosis_basis: [String],
  $disease_phase: [String],

  # Genetic Analyses
  $alteration: [String],
  $alteration_type: [String],
  $fusion_partner_gene: [String],
  $gene_symbol: [String],
  $reported_significance: [String],
  $reported_significance_system: [String],
  $status: [String],

  # Studies
  $dbgap_accession: [String],
  $study_name: [String],

  # Survivals
  $age_at_last_known_survival_status: [Int],
  $cause_of_death: [String],
  $first_event: [String],
  $last_known_survival_status: [String],

  # Treatments
  $age_at_treatment_start: [Int],
  $age_at_treatment_end: [Int],
  $treatment_type: [String],
  $treatment_agent: [String],

  # Treatment Responses
  $response: [String],
  $age_at_response: [Int],
  $response_category: [String],
  $response_system: [String]
) {
getParticipants(
  # Demographics
  participant_pk: $participant_pk,
  participant_id: $participant_id,
  race: $race,
  sex_at_birth: $sex_at_birth,

  # Diagnoses
  age_at_diagnosis: $age_at_diagnosis,
  anatomic_site: $anatomic_site,
  diagnosis: $diagnosis,
  diagnosis_classification_system: $diagnosis_classification_system,
  diagnosis_basis: $diagnosis_basis,
  disease_phase: $disease_phase,

  # Genetic Analyses
  alteration: $alteration,
  alteration_type: $alteration_type,
  fusion_partner_gene: $fusion_partner_gene,
  gene_symbol: $gene_symbol,
  reported_significance: $reported_significance,
  reported_significance_system: $reported_significance_system,
  status: $status,
  
  # Studies
  dbgap_accession: $dbgap_accession,
  study_name: $study_name,

  # Survivals
  age_at_last_known_survival_status: $age_at_last_known_survival_status,
  cause_of_death: $cause_of_death,
  first_event: $first_event,
  last_known_survival_status: $last_known_survival_status

  # Treatments
  age_at_treatment_start: $age_at_treatment_start,
  age_at_treatment_end: $age_at_treatment_end,
  treatment_type: $treatment_type,
  treatment_agent: $treatment_agent,

  # Treatment Responses
  response: $response,
  age_at_response: $age_at_response,
  response_category: $response_category,
  response_system: $response_system
) {
  numberOfParticipants
  numberOfDiagnoses
  numberOfDiseases
  numberOfGeneticAnalyses
  numberOfStudies
  numberOfSurvivals
  numberOfTreatments
  numberOfTreatmentResponses
  pageSize

  __typename
}}
`;

export const GET_COHORT_METADATA_QUERY = gql`
query cohortMetadata(
  # Demographics
  $participant_pk: [String],

  # Table config
  $first: Int,
  $offset: Int,
  $order_by: String,
  $sort_direction: String
) {
cohortMetadata(
  # Demographics
  participant_pk: $participant_pk,

  # Table config
  first: $first,
  offset: $offset,
  order_by: $order_by,
  sort_direction: $sort_direction
) {
  dbgap_accession

  consent_groups {
    consent_group_name
    consent_group_number

    participants {
      id
      participant_id
      race
      sex_at_birth

      diagnoses {
        id
        diagnosis_id
        age_at_diagnosis
        anatomic_site
        diagnosis
        diagnosis_basis
        diagnosis_classification_system
        diagnosis_comment
        disease_phase
        toronto_childhood_cancer_staging
        tumor_classification
        tumor_grade
        tumor_stage_clinical_m
        tumor_stage_clinical_n
        tumor_stage_clinical_t
      }
      survivals {
        id
        survival_id
        age_at_event_free_survival_status
        age_at_last_known_survival_status
        cause_of_death
        event_free_survival_status
        first_event
        last_known_survival_status
      }
      synonyms {
        id
        associated_id
        data_location
        domain_category
        domain_description
        repository_of_synonym_id
      }
      treatments {
        id
        treatment_id
        age_at_treatment_end
        age_at_treatment_start
        treatment_agent
        treatment_type
      }
      treatment_responses {
        id
        treatment_response_id
        age_at_response
        response
        response_category
        response_system
      }
    }
  }
}}
`;

export const DISPLAY_COHORT_QUERY = gql`
query participantOverview(
    # Demographics
    $participant_pk: [String],

    # Table config
    $first: Int,
    $offset: Int,
    $order_by: String,
    $sort_direction: String
) {
participantOverview(
    # Demographics
    participant_pk: $participant_pk,

    # Table config
    first: $first,
    offset: $offset,
    order_by: $order_by,
    sort_direction: $sort_direction
) { 
    # Participants
    participant_id
    id 
    race
    sex_at_birth

    # Studies
    dbgap_accession

    __typename
}}
`;
export const GET_COHORT_MANIFEST_QUERY = gql`
query cohortManifest(
    # Demographics
    $participant_pk: [String],

    # Table config
    $first: Int,
    $offset: Int,
    $order_by: String,
    $sort_direction: String
) {
diagnosisOverview(
    # Demographics
    participant_pk: $participant_pk,

    # Table config
    first: $first,
    offset: $offset,
    order_by: $order_by,
    sort_direction: $sort_direction
) {
    # Diagnosis
    id
    diagnosis

    # Participants
    participant {
        id
        participant_id
        race
        sex_at_birth
    }

    # Study
    dbgap_accession

    __typename
}}
`;

export const GET_STUDY_OVERVIEW_QUERY = gql`
query studyOverview(
  # Demographics
  $participant_pk: [String],
  $participant_id: [String],
  $race: [String],
  $sex_at_birth: [String],

  # Diagnoses
  $age_at_diagnosis: [Int],
  $anatomic_site: [String],
  $diagnosis: [String],
  $diagnosis_classification_system: [String],
  $diagnosis_basis: [String],
  $disease_phase: [String],

  # Genetic Analyses
  $alteration: [String],
  $alteration_type: [String],
  $fusion_partner_gene: [String],
  $gene_symbol: [String],
  $reported_significance: [String],
  $reported_significance_system: [String],
  $status: [String],

  # Studies
  $dbgap_accession: [String],
  $study_name: [String],

  # Survivals
  $age_at_last_known_survival_status: [Int],
  $cause_of_death: [String],
  $first_event: [String],
  $last_known_survival_status: [String],

  # Treatments
  $age_at_treatment_start: [Int],
  $age_at_treatment_end: [Int],
  $treatment_type: [String],
  $treatment_agent: [String],

  # Treatment Responses
  $response: [String],
  $age_at_response: [Int],
  $response_category: [String],
  $response_system: [String],

  # Table config
  $first: Int,
  $offset: Int,
  $order_by: String,
  $sort_direction: String
) {
studyOverview(
  # Demographics
  participant_pk: $participant_pk,
  participant_id: $participant_id,
  race: $race,
  sex_at_birth: $sex_at_birth,

  # Diagnoses
  age_at_diagnosis: $age_at_diagnosis,
  anatomic_site: $anatomic_site,
  diagnosis: $diagnosis,
  diagnosis_classification_system: $diagnosis_classification_system,
  diagnosis_basis: $diagnosis_basis,
  disease_phase: $disease_phase,

  # Genetic Analyses
  alteration: $alteration,
  alteration_type: $alteration_type,
  fusion_partner_gene: $fusion_partner_gene,
  gene_symbol: $gene_symbol,
  reported_significance: $reported_significance,
  reported_significance_system: $reported_significance_system,
  status: $status,
  
  # Studies
  dbgap_accession: $dbgap_accession,
  study_name: $study_name,

  # Survivals
  age_at_last_known_survival_status: $age_at_last_known_survival_status,
  cause_of_death: $cause_of_death,
  first_event: $first_event,
  last_known_survival_status: $last_known_survival_status

  # Treatments
  age_at_treatment_start: $age_at_treatment_start,
  age_at_treatment_end: $age_at_treatment_end,
  treatment_type: $treatment_type,
  treatment_agent: $treatment_agent,

  # Treatment Responses
  response: $response,
  age_at_response: $age_at_response,
  response_category: $response_category,
  response_system: $response_system,

  # Table config
  first: $first,
  offset: $offset,
  order_by: $order_by,
  sort_direction: $sort_direction
) {
  # Studies
  id
  external_url
  dbgap_accession
  study_description
  study_id
  study_name

  __typename
}}
`;

export const GET_PARTICIPANTS_OVERVIEW_QUERY = gql`
query participantOverview(
  # Demographics
  $participant_pk: [String],
  $participant_id: [String],
  $race: [String],
  $sex_at_birth: [String],

  # Diagnoses
  $age_at_diagnosis: [Int],
  $anatomic_site: [String],
  $diagnosis: [String],
  $diagnosis_classification_system: [String],
  $diagnosis_basis: [String],
  $disease_phase: [String],

  # Genetic Analyses
  $alteration: [String],
  $alteration_type: [String],
  $fusion_partner_gene: [String],
  $gene_symbol: [String],
  $reported_significance: [String],
  $reported_significance_system: [String],
  $status: [String],

  # Studies
  $dbgap_accession: [String],
  $study_name: [String],

  # Survivals
  $age_at_last_known_survival_status: [Int],
  $cause_of_death: [String],
  $first_event: [String],
  $last_known_survival_status: [String],

  # Treatments
  $age_at_treatment_start: [Int],
  $age_at_treatment_end: [Int],
  $treatment_type: [String],
  $treatment_agent: [String],

  # Treatment Responses
  $response: [String],
  $age_at_response: [Int],
  $response_category: [String],
  $response_system: [String],

  # Table config
  $first: Int,
  $offset: Int,
  $order_by: String,
  $sort_direction: String
) {
participantOverview(
  # Demographics
  participant_pk: $participant_pk,
  participant_id: $participant_id,
  race: $race,
  sex_at_birth: $sex_at_birth,

  # Diagnoses
  age_at_diagnosis: $age_at_diagnosis,
  anatomic_site: $anatomic_site,
  diagnosis: $diagnosis,
  diagnosis_classification_system: $diagnosis_classification_system,
  diagnosis_basis: $diagnosis_basis,
  disease_phase: $disease_phase,

  # Genetic Analyses
  alteration: $alteration,
  alteration_type: $alteration_type,
  fusion_partner_gene: $fusion_partner_gene,
  gene_symbol: $gene_symbol,
  reported_significance: $reported_significance,
  reported_significance_system: $reported_significance_system,
  status: $status,
  
  # Studies
  dbgap_accession: $dbgap_accession,
  study_name: $study_name,

  # Survivals
  age_at_last_known_survival_status: $age_at_last_known_survival_status,
  cause_of_death: $cause_of_death,
  first_event: $first_event,
  last_known_survival_status: $last_known_survival_status,

  # Treatments
  age_at_treatment_start: $age_at_treatment_start,
  age_at_treatment_end: $age_at_treatment_end,
  treatment_type: $treatment_type,
  treatment_agent: $treatment_agent,

  # Treatment Responses
  response: $response,
  age_at_response: $age_at_response,
  response_category: $response_category,
  response_system: $response_system,

  # Table config
  first: $first,
  offset: $offset,
  order_by: $order_by,
  sort_direction: $sort_direction
) {
    # Participants
    id
    participant_id
    race
    sex_at_birth

    # Studies
    dbgap_accession
    study_id

    # Synonyms
    cpi_data {
        associated_id
        repository_of_synonym_id
        domain_description
        domain_category
        data_location
        data_type

        __typename
    }
    
    __typename
}}
`;

export const GET_DIAGNOSIS_OVERVIEW_QUERY = gql`
query diagnosisOverview(
  # Demographics
  $participant_pk: [String],
  $participant_id: [String],
  $race: [String],
  $sex_at_birth: [String],

  # Diagnoses
  $age_at_diagnosis: [Int],
  $anatomic_site: [String],
  $diagnosis: [String],
  $diagnosis_classification_system: [String],
  $diagnosis_basis: [String],
  $disease_phase: [String],

  # Genetic Analyses
  $alteration: [String],
  $alteration_type: [String],
  $fusion_partner_gene: [String],
  $gene_symbol: [String],
  $reported_significance: [String],
  $reported_significance_system: [String],
  $status: [String],

  # Studies
  $dbgap_accession: [String],
  $study_name: [String],

  # Survivals
  $age_at_last_known_survival_status: [Int],
  $cause_of_death: [String],
  $first_event: [String],
  $last_known_survival_status: [String],

  # Treatments
  $age_at_treatment_start: [Int],
  $age_at_treatment_end: [Int],
  $treatment_type: [String],
  $treatment_agent: [String],

  # Treatment Responses
  $response: [String],
  $age_at_response: [Int],
  $response_category: [String],
  $response_system: [String],

  # Table config
  $first: Int,
  $offset: Int,
  $order_by: String,
  $sort_direction: String
) {
diagnosisOverview(
  # Demographics
  participant_pk: $participant_pk,
  participant_id: $participant_id,
  race: $race,
  sex_at_birth: $sex_at_birth,

  # Diagnoses
  age_at_diagnosis: $age_at_diagnosis,
  anatomic_site: $anatomic_site,
  diagnosis: $diagnosis,
  diagnosis_classification_system: $diagnosis_classification_system,
  diagnosis_basis: $diagnosis_basis,
  disease_phase: $disease_phase,

  # Genetic Analyses
  alteration: $alteration,
  alteration_type: $alteration_type,
  fusion_partner_gene: $fusion_partner_gene,
  gene_symbol: $gene_symbol,
  reported_significance: $reported_significance,
  reported_significance_system: $reported_significance_system,
  status: $status,
  
  # Studies
  dbgap_accession: $dbgap_accession,
  study_name: $study_name,

  # Survivals
  age_at_last_known_survival_status: $age_at_last_known_survival_status,
  cause_of_death: $cause_of_death,
  first_event: $first_event,
  last_known_survival_status: $last_known_survival_status,

  # Treatments
  age_at_treatment_start: $age_at_treatment_start,
  age_at_treatment_end: $age_at_treatment_end,
  treatment_type: $treatment_type,
  treatment_agent: $treatment_agent,

  # Treatment Responses
  response: $response,
  age_at_response: $age_at_response,
  response_category: $response_category,
  response_system: $response_system,

  # Table config
  first: $first,
  offset: $offset,
  order_by: $order_by,
  sort_direction: $sort_direction
) {
  # Demographics
  participant {
    id
    participant_id
    race
    sex_at_birth
  }

  # Diagnosis
  id
  age_at_diagnosis
  anatomic_site
  diagnosis_basis
  diagnosis
  diagnosis_classification_system
  diagnosis_comment
  diagnosis_id
  disease_phase
  toronto_childhood_cancer_staging
  tumor_classification
  tumor_grade
  tumor_stage_clinical_m
  tumor_stage_clinical_n
  tumor_stage_clinical_t

  # Study
  dbgap_accession
  study_id

  __typename
}}
`;

export const GET_TREATMENT_OVERVIEW_QUERY = gql`
query treatmentOverview(
  # Demographics
  $participant_pk: [String],
  $participant_id: [String],
  $race: [String],
  $sex_at_birth: [String],

  # Diagnoses
  $age_at_diagnosis: [Int],
  $anatomic_site: [String],
  $diagnosis: [String],
  $diagnosis_classification_system: [String],
  $diagnosis_basis: [String],
  $disease_phase: [String],

  # Genetic Analyses
  $alteration: [String],
  $alteration_type: [String],
  $fusion_partner_gene: [String],
  $gene_symbol: [String],
  $reported_significance: [String],
  $reported_significance_system: [String],
  $status: [String],

  # Studies
  $dbgap_accession: [String],
  $study_name: [String],

  # Survivals
  $age_at_last_known_survival_status: [Int],
  $cause_of_death: [String],
  $first_event: [String],
  $last_known_survival_status: [String],

  # Treatments
  $age_at_treatment_start: [Int],
  $age_at_treatment_end: [Int],
  $treatment_type: [String],
  $treatment_agent: [String],

  # Treatment Responses
  $response: [String],
  $age_at_response: [Int],
  $response_category: [String],
  $response_system: [String],

  # Table config
  $first: Int,
  $offset: Int,
  $order_by: String,
  $sort_direction: String
) {
treatmentOverview(
  # Demographics
  participant_pk: $participant_pk,
  participant_id: $participant_id,
  race: $race,
  sex_at_birth: $sex_at_birth,

  # Diagnoses
  age_at_diagnosis: $age_at_diagnosis,
  anatomic_site: $anatomic_site,
  diagnosis: $diagnosis,
  diagnosis_classification_system: $diagnosis_classification_system,
  diagnosis_basis: $diagnosis_basis,
  disease_phase: $disease_phase,

  # Genetic Analyses
  alteration: $alteration,
  alteration_type: $alteration_type,
  fusion_partner_gene: $fusion_partner_gene,
  gene_symbol: $gene_symbol,
  reported_significance: $reported_significance,
  reported_significance_system: $reported_significance_system,
  status: $status,
  
  # Studies
  dbgap_accession: $dbgap_accession,
  study_name: $study_name,

  # Survivals
  age_at_last_known_survival_status: $age_at_last_known_survival_status,
  cause_of_death: $cause_of_death,
  first_event: $first_event,
  last_known_survival_status: $last_known_survival_status

  # Treatments
  age_at_treatment_start: $age_at_treatment_start,
  age_at_treatment_end: $age_at_treatment_end,
  treatment_type: $treatment_type,
  treatment_agent: $treatment_agent,

  # Treatment Responses
  response: $response,
  age_at_response: $age_at_response,
  response_category: $response_category,
  response_system: $response_system,

  # Table config
  first: $first,
  offset: $offset,
  order_by: $order_by,
  sort_direction: $sort_direction
) {
  # Participant
  participant {
    id
    participant_id
    race
    sex_at_birth
  }

  # Study
  dbgap_accession
  study_id

  # Treatment
  id
  treatment_id
  age_at_treatment_start
  age_at_treatment_end
  treatment_type
  treatment_agent

  __typename
}}
`;

export const GET_TREATMENT_RESPONSE_OVERVIEW_QUERY = gql`
query treatmentResponseOverview(
  # Demographics
  $participant_pk: [String],
  $participant_id: [String],
  $race: [String],
  $sex_at_birth: [String],

  # Diagnoses
  $age_at_diagnosis: [Int],
  $anatomic_site: [String],
  $diagnosis: [String],
  $diagnosis_classification_system: [String],
  $diagnosis_basis: [String],
  $disease_phase: [String],

  # Genetic Analyses
  $alteration: [String],
  $alteration_type: [String],
  $fusion_partner_gene: [String],
  $gene_symbol: [String],
  $reported_significance: [String],
  $reported_significance_system: [String],
  $status: [String],

  # Studies
  $dbgap_accession: [String],
  $study_name: [String],

  # Survivals
  $age_at_last_known_survival_status: [Int],
  $cause_of_death: [String],
  $first_event: [String],
  $last_known_survival_status: [String],

  # Treatments
  $age_at_treatment_start: [Int],
  $age_at_treatment_end: [Int],
  $treatment_type: [String],
  $treatment_agent: [String],

  # Treatment Responses
  $response: [String],
  $age_at_response: [Int],
  $response_category: [String],
  $response_system: [String],

  # Table config
  $first: Int,
  $offset: Int,
  $order_by: String,
  $sort_direction: String
) {
treatmentResponseOverview(
  # Demographics
  participant_pk: $participant_pk,
  participant_id: $participant_id,
  race: $race,
  sex_at_birth: $sex_at_birth,

  # Diagnoses
  age_at_diagnosis: $age_at_diagnosis,
  anatomic_site: $anatomic_site,
  diagnosis: $diagnosis,
  diagnosis_classification_system: $diagnosis_classification_system,
  diagnosis_basis: $diagnosis_basis,
  disease_phase: $disease_phase,

  # Genetic Analyses
  alteration: $alteration,
  alteration_type: $alteration_type,
  fusion_partner_gene: $fusion_partner_gene,
  gene_symbol: $gene_symbol,
  reported_significance: $reported_significance,
  reported_significance_system: $reported_significance_system,
  status: $status,
  
  # Studies
  dbgap_accession: $dbgap_accession,
  study_name: $study_name,

  # Survivals
  age_at_last_known_survival_status: $age_at_last_known_survival_status,
  cause_of_death: $cause_of_death,
  first_event: $first_event,
  last_known_survival_status: $last_known_survival_status

  # Treatments
  age_at_treatment_start: $age_at_treatment_start,
  age_at_treatment_end: $age_at_treatment_end,
  treatment_type: $treatment_type,
  treatment_agent: $treatment_agent,

  # Treatment Responses
  response: $response,
  age_at_response: $age_at_response,
  response_category: $response_category,
  response_system: $response_system,

  # Table config
  first: $first,
  offset: $offset,
  order_by: $order_by,
  sort_direction: $sort_direction
) {
  # Participant
  participant {
    id
    participant_id
    race
    sex_at_birth
  }

  # Study
  dbgap_accession
  study_id

  # Treatment Response
  id
  treatment_response_id
  response
  age_at_response
  response_category
  response_system

  __typename
}}
`;

export const GET_SURVIVAL_OVERVIEW_QUERY = gql`
query survivalOverview(
  # Demographics
  $participant_pk: [String],
  $participant_id: [String],
  $race: [String],
  $sex_at_birth: [String],

  # Diagnoses
  $age_at_diagnosis: [Int],
  $anatomic_site: [String],
  $diagnosis: [String],
  $diagnosis_classification_system: [String],
  $diagnosis_basis: [String],
  $disease_phase: [String],

  # Genetic Analyses
  $alteration: [String],
  $alteration_type: [String],
  $fusion_partner_gene: [String],
  $gene_symbol: [String],
  $reported_significance: [String],
  $reported_significance_system: [String],
  $status: [String],

  # Studies
  $dbgap_accession: [String],
  $study_name: [String],

  # Survivals
  $age_at_last_known_survival_status: [Int],
  $cause_of_death: [String],
  $first_event: [String],
  $last_known_survival_status: [String],

  # Treatments
  $age_at_treatment_start: [Int],
  $age_at_treatment_end: [Int],
  $treatment_type: [String],
  $treatment_agent: [String],

  # Treatment Responses
  $response: [String],
  $age_at_response: [Int],
  $response_category: [String],
  $response_system: [String],

  # Table config
  $first: Int,
  $offset: Int,
  $order_by: String,
  $sort_direction: String
) {
survivalOverview(
  # Demographics
  participant_pk: $participant_pk,
  participant_id: $participant_id,
  race: $race,
  sex_at_birth: $sex_at_birth,

  # Diagnoses
  age_at_diagnosis: $age_at_diagnosis,
  anatomic_site: $anatomic_site,
  diagnosis: $diagnosis,
  diagnosis_classification_system: $diagnosis_classification_system,
  diagnosis_basis: $diagnosis_basis,
  disease_phase: $disease_phase,

  # Genetic Analyses
  alteration: $alteration,
  alteration_type: $alteration_type,
  fusion_partner_gene: $fusion_partner_gene,
  gene_symbol: $gene_symbol,
  reported_significance: $reported_significance,
  reported_significance_system: $reported_significance_system,
  status: $status,
  
  # Studies
  dbgap_accession: $dbgap_accession,
  study_name: $study_name,

  # Survivals
  age_at_last_known_survival_status: $age_at_last_known_survival_status,
  cause_of_death: $cause_of_death,
  first_event: $first_event,
  last_known_survival_status: $last_known_survival_status,

  # Treatments
  age_at_treatment_start: $age_at_treatment_start,
  age_at_treatment_end: $age_at_treatment_end,
  treatment_type: $treatment_type,
  treatment_agent: $treatment_agent,

  # Treatment Responses
  response: $response,
  age_at_response: $age_at_response,
  response_category: $response_category,
  response_system: $response_system,

  # Table config
  first: $first,
  offset: $offset,
  order_by: $order_by,
  sort_direction: $sort_direction
) {
  # Participant
  participant {
    id
    participant_id
    race
    sex_at_birth
  }

  # Study
  dbgap_accession
  study_id

  # Survival
  id
  age_at_event_free_survival_status
  age_at_last_known_survival_status
  cause_of_death
  event_free_survival_status
  first_event
  last_known_survival_status
  survival_id

  __typename
}}
`;

export const GET_GENETIC_ANALYSIS_OVERVIEW_QUERY = gql`
query geneticAnalysisOverview(
  # Demographics
  $participant_pk: [String],
  $participant_id: [String],
  $race: [String],
  $sex_at_birth: [String],

  # Diagnoses
  $age_at_diagnosis: [Int],
  $anatomic_site: [String],
  $diagnosis: [String],
  $diagnosis_classification_system: [String],
  $diagnosis_basis: [String],
  $disease_phase: [String],

  # Genetic Analyses
  $alteration: [String],
  $alteration_type: [String],
  $fusion_partner_gene: [String],
  $gene_symbol: [String],
  $reported_significance: [String],
  $reported_significance_system: [String],
  $status: [String],

  # Studies
  $dbgap_accession: [String],
  $study_name: [String],

  # Survivals
  $age_at_last_known_survival_status: [Int],
  $cause_of_death: [String],
  $first_event: [String],
  $last_known_survival_status: [String],

  # Treatments
  $age_at_treatment_start: [Int],
  $age_at_treatment_end: [Int],
  $treatment_type: [String],
  $treatment_agent: [String],

  # Treatment Responses
  $response: [String],
  $age_at_response: [Int],
  $response_category: [String],
  $response_system: [String],

  # Table config
  $first: Int,
  $offset: Int,
  $order_by: String,
  $sort_direction: String
) {
geneticAnalysisOverview(
  # Demographics
  participant_pk: $participant_pk,
  participant_id: $participant_id,
  race: $race,
  sex_at_birth: $sex_at_birth,

  # Diagnoses
  age_at_diagnosis: $age_at_diagnosis,
  anatomic_site: $anatomic_site,
  diagnosis: $diagnosis,
  diagnosis_classification_system: $diagnosis_classification_system,
  diagnosis_basis: $diagnosis_basis,
  disease_phase: $disease_phase,

  # Genetic Analyses
  alteration: $alteration,
  alteration_type: $alteration_type,
  fusion_partner_gene: $fusion_partner_gene,
  gene_symbol: $gene_symbol,
  reported_significance: $reported_significance,
  reported_significance_system: $reported_significance_system,
  status: $status,
  
  # Studies
  dbgap_accession: $dbgap_accession,
  study_name: $study_name,

  # Survivals
  age_at_last_known_survival_status: $age_at_last_known_survival_status,
  cause_of_death: $cause_of_death,
  first_event: $first_event,
  last_known_survival_status: $last_known_survival_status,

  # Treatments
  age_at_treatment_start: $age_at_treatment_start,
  age_at_treatment_end: $age_at_treatment_end,
  treatment_type: $treatment_type,
  treatment_agent: $treatment_agent,

  # Treatment Responses
  response: $response,
  age_at_response: $age_at_response,
  response_category: $response_category,
  response_system: $response_system,

  # Table config
  first: $first,
  offset: $offset,
  order_by: $order_by,
  sort_direction: $sort_direction
) {
  # Study
  dbgap_accession

  # Participant
  participant {
    id
    participant_id
  }

  # Genetic Analysis
  id
  genetic_analysis_id
  alteration
  cytoband
  gene_symbol
  genomic_source_category
  hgvs_coding
  hgvs_genome
  hgvs_protein
  status
  test
  reported_significance
  reported_significance_system

  # Additional properties for download
  alteration_effect
  alteration_type
  chromosome
  exon
  fusion_partner_exon
  fusion_partner_gene
  reference_genome

  __typename
}}
`;

export const GET_ALL_FILEIDS_PARTICIPANTSTAB_FOR_SELECT_ALL = gql`
query search (          
  $participant_id: [String],
){
  fileIDsFromList (          
      participant_id: $participant_id,
  ) 
}
  `;

export const GET_ALL_FILEIDS_SAMPLESTAB_FOR_SELECT_ALL = gql`
query search (          
  $sample_ids: [String],
){
  fileIDsFromList (          
    sample_ids: $sample_ids,
  ) 
}
  `;

export const GET_ALL_FILEIDS_FILESTAB_FOR_SELECT_ALL = gql`
query search (          
  $file_ids: [String] 
){
  fileIDsFromList (          
      file_ids: $file_ids
  ) 
}
  `;

export const GET_ALL_FILEIDS_DIAGNOSISTAB_FOR_SELECT_ALL = gql`
query search (          
  $diagnosis_ids: [String] 
){
  fileIDsFromList (          
      diagnosis_ids: $diagnosis_ids
  ) 
}
  `;
export const GET_ALL_FILEIDS_STUDYISTAB_FOR_SELECT_ALL = gql`
query search (          
  $study_ids: [String] 
){
  fileIDsFromList (          
      study_ids: $study_ids
  ) 
}
  `;

// --------------- GraphQL query - Retrieve files tab details --------------
export const GET_FILES_NAME_QUERY = gql`
query fileOverview($file_ids: [String], $offset: Int = 0, $first: Int = 100000, $order_by:String ="file_name"){
  fileOverview(file_ids: $file_ids, offset: $offset,first: $first, order_by: $order_by) {
    file_name
  }
}
  `;

export const GET_FILE_IDS_FROM_FILE_NAME = gql`
  query (
      $file_name: [String],
      $offset: Int,
      $first: Int,
      $order_by: String
  )
  {
      fileIdsFromFileNameDesc(
          file_name:$file_name, 
          offset:$offset,
          first:$first,
          order_by:$order_by
      )
      {
          file_id
      }
  }`;


// --------------- Tabs Table configuration --------------
export const tabContainers = [
  {
    name: 'Studies',
    dataField: 'dataStudy',
    api: GET_STUDY_OVERVIEW_QUERY,
    statsQuery: DASHBOARD_QUERY_STATS,
    statsQueryName: 'getParticipants',
    //asyncDownload: true,
    paginationAPIField: 'studyOverview',
    defaultSortField: 'dbgap_accession',
    defaultSortDirection: 'asc',
    count: 'numberOfStudies',
    fileCount: 'studiesFileCount',
    toolTipText: 'Count of Study Record',
    dataKey: 'id',
    tableID: 'study_tab_table',
    extendedViewConfig: {
      pagination: true,
      manageViewColumns: false,
      download: true,
      downloadButtonConfig: {
        title: 'DOWNLOAD DATA',
        cloudIcon: true,
        //downloadLimit: 5000,
      },
    },
    columns: [
      {
        dataField: "study_id",
        header: "Study ID",
        display: false,
        tooltipText: "sort",
        role: cellTypes.DISPLAY
      },
      {
        dataField: 'dbgap_accession',
        header: 'dbGaP Accession',
        display: true,
        tooltipText: 'sort',
        role: cellTypes.DISPLAY,
        linkAttr: {
          rootPath: 'https://www.ncbi.nlm.nih.gov/projects/gap/cgi-bin/study.cgi?study_id=',
        },
        cellType: cellTypes.CUSTOM_ELEM,
      },
      {
        dataField: 'study_name',
        header: 'Study Name',
        display: true,
        tooltipText: 'sort',
        role: cellTypes.DISPLAY,
        linkAttr: {
          rootPath: '/studies/',
          linkField: 'dbgap_accession',
        },
        cellType: cellTypes.CUSTOM_ELEM,
      },
      {
        dataField: "study_description",
        header: "Study Description",
        display: false,
        tooltipText: "sort",
        role: cellTypes.DISPLAY
      },
      {
        dataField: "external_url",
        header: "External URL",
        display: false,
        tooltipText: "sort",
        role: cellTypes.DISPLAY
      }
    ],
    id: 'study_tab',
    tabIndex: '4',
    selectableRows: true,
    tableDownloadCSV: {},
    downloadFileName: 'C3DC Studies Download',
    tableMsg: {
      noMatch: 'No Matching Records Found',
    },

    // addFilesRequestVariableKey: 'study_ids',
    // addFilesResponseKeys: ['fileIDsFromList'],
    // addAllFilesResponseKeys: ['studyOverview', 'files'],
    // addAllFileQuery: GET_ALL_FILEIDS_FROM_STUDYTAB_FOR_ADD_ALL_CART,
    // addSelectedFilesQuery: GET_ALL_FILEIDS_STUDYISTAB_FOR_SELECT_ALL,

  },
  {
    name: 'Participants',
    dataField: 'dataParticipant',
    api: GET_PARTICIPANTS_OVERVIEW_QUERY,
    statsQuery: DASHBOARD_QUERY_STATS,
    statsQueryName: 'getParticipants',
    //asyncDownload: true,
    paginationAPIField: 'participantOverview',
    count: 'numberOfParticipants',
    fileCount: 'participantsFileCount',
    dataKey: 'participant_id',
    hiddenDataKeys: ['participant_id', 'id', 'dbgap_accession'],
    defaultSortField: 'participant_id',
    defaultSortDirection: 'asc',
    toolTipText: 'Count of Participant Record',
    buttonText: 'Add Selected Files',
    tableID: 'participant_tab_table',
    hasToolTip: true,
    extendedViewConfig: {
      pagination: true,
      manageViewColumns: false,
      download: true,
      downloadButtonConfig: {
        title: 'DOWNLOAD DATA',
        cloudIcon: true,
        //downloadLimit: 5000,
      },
    },
    columns: [
      {
        cellType: cellTypes.CHECKBOX,
        display: true,
        role: cellTypes.CHECKBOX,
      },
      {
        dataField: 'participant_id',
        header: 'Participant ID',
        display: true,
        tooltipText: 'sort',
        role: cellTypes.DISPLAY,
        cellType: cellTypes.CPI,
      },
      {
        dataField: 'race',
        header: 'Race',
        display: true,
        tooltipText: 'sort',
        role: cellTypes.DISPLAY,
        cellType: cellTypes.CUSTOM_ELEM,
      },
      {
        dataField: 'sex_at_birth',
        header: 'Sex at Birth',
        display: true,
        tooltipText: 'sort',
        role: cellTypes.DISPLAY,
      },
      {
        dataField: 'dbgap_accession',
        header: 'dbGaP Accession',
        display: true,
        tooltipText: 'sort',
        role: cellTypes.DISPLAY,
        linkAttr: {
          linkAttr: {
            rootPath: 'https://www.ncbi.nlm.nih.gov/projects/gap/cgi-bin/study.cgi?study_id=',
          },
          cellType: cellTypes.CUSTOM_ELEM,
        },
        doNotDownload: true,
      },
      {
        dataField: "study_id",
        header: "Study ID",
        display: false,
        tooltipText: "sort",
        role: cellTypes.DISPLAY
      },
    ],
    id: 'participant_tab',
    tableDownloadCSV: {},
    tabIndex: '0',
    downloadFileName: 'C3DC Participants Download',
    tableMsg: {
      noMatch: 'No Matching Records Found',
    },
  },
  {
    name: 'Diagnosis',
    dataField: 'dataDiagnosis',
    api: GET_DIAGNOSIS_OVERVIEW_QUERY,
    statsQuery: DASHBOARD_QUERY_STATS,
    statsQueryName: 'getParticipants',
    //asyncDownload: true,
    paginationAPIField: 'diagnosisOverview',
    defaultSortField: 'participant.participant_id',
    defaultSortDirection: 'asc',
    count: 'numberOfDiagnoses',
    fileCount: 'diagnosisFileCount',
    toolTipText: 'Count of Diagnosis Record',
    dataKey: "id",
    hiddenDataKeys: ['participant', 'participant_pk', 'dbgap_accession'],
    tableID: 'diagnosis_tab_table',
    extendedViewConfig: {
      pagination: true,
      manageViewColumns: false,
      download: true,
      downloadButtonConfig: {
        title: 'DOWNLOAD DATA',
        cloudIcon: true,
        //downloadLimit: 5000,
      },
    },
    columns: [
      {
        cellType: cellTypes.CHECKBOX,
        display: true,
        role: cellTypes.CHECKBOX,
      },
      {
        dataField: 'participant',
        sortField: 'participant.participant_id',
        header: 'Participant ID',
        display: true,
        tooltipText: 'sort',
        role: cellTypes.DISPLAY,
        cellType: cellTypes.CUSTOM_ELEM
      },
      {
        dataField: 'diagnosis_id',
        header: 'Diagnosis ID',
        display: true,
        tooltipText: 'sort',
        role: cellTypes.DISPLAY,
      },
      {
        dataField: 'diagnosis',
        header: 'Diagnosis',
        display: true,
        tooltipText: 'sort',
        role: cellTypes.DISPLAY,
      },
      {
        dataField: 'diagnosis_classification_system',
        header: 'Diagnosis Classification System',
        display: true,
        tooltipText: 'sort',
        role: cellTypes.DISPLAY,
        cellType: cellTypes.CUSTOM_ELEM,
      },
      {
        dataField: 'diagnosis_basis',
        header: 'Diagnosis Basis',
        display: true,
        tooltipText: 'sort',
        role: cellTypes.DISPLAY,
        cellType: cellTypes.CUSTOM_ELEM,
      },
      {
        dataField: 'diagnosis_comment',
        header: 'Diagnosis Comment',
        display: false,
        tooltipText: 'sort',
        role: cellTypes.DISPLAY,
      },
      {
        dataField: 'disease_phase',
        header: 'Disease Phase',
        display: false,
        tooltipText: 'sort',
        role: cellTypes.DISPLAY,
      },
      {
        dataField: 'tumor_classification',
        header: 'Tumor Classification',
        display: true,
        tooltipText: 'sort',
        role: cellTypes.DISPLAY,
      },
      {
        dataField: 'anatomic_site',
        header: 'Anatomic Site',
        display: true,
        tooltipText: 'sort',
        role: cellTypes.DISPLAY,
      },
      {
        dataField: 'age_at_diagnosis',
        header: 'Age at Diagnosis (days)',
        display: true,
        tooltipText: 'sort',
        role: cellTypes.COMMA,
        cellType: cellTypes.COMMA,
      },
      {
        dataField: 'toronto_childhood_cancer_staging',
        header: 'Toronto Childhood Cancer Staging',
        display: false,
        tooltipText: 'sort',
        role: cellTypes.DISPLAY,
      },
      {
        dataField: 'tumor_grade',
        header: 'Tumor Grade',
        display: false,
        tooltipText: 'sort',
        role: cellTypes.DISPLAY,
      },
      {
        dataField: 'tumor_stage_clinical_t',
        header: 'Tumor Stage Clinical T',
        display: false,
        tooltipText: 'sort',
        role: cellTypes.DISPLAY,
      },
      {
        dataField: 'tumor_stage_clinical_n',
        header: 'Tumor Stage Clinical N',
        display: false,
        tooltipText: 'sort',
        role: cellTypes.DISPLAY,
      },
      {
        dataField: 'tumor_stage_clinical_m',
        header: 'Tumor Stage Clinical M',
        display: false,
        tooltipText: 'sort',
        role: cellTypes.DISPLAY,
      },
      {
        dataField: 'dbgap_accession',
        header: 'dbGaP Accession',
        display: true,
        tooltipText: 'sort',
        role: cellTypes.DISPLAY,
        linkAttr: {
          rootPath: 'https://www.ncbi.nlm.nih.gov/projects/gap/cgi-bin/study.cgi?study_id=',
        },
        cellType: cellTypes.CUSTOM_ELEM,
        doNotDownload: true,
      },
      {
        dataField: "study_id",
        header: "Study ID",
        display: false,
        tooltipText: "sort",
        role: cellTypes.DISPLAY
      },


    ],
    id: 'diagnosis_tab',
    tabIndex: '3',
    tableDownloadCSV: {},
    downloadFileName: 'C3DC Diagnosis Download',
    tableMsg: {
      noMatch: 'No Matching Records Found',
    },
    /*
    addFilesRequestVariableKey: 'diagnosis_ids',
    addFilesResponseKeys: ['fileIDsFromList'],
    addAllFilesResponseKeys: ['diagnosisOverview', 'files'],
    addAllFileQuery: GET_ALL_FILEIDS_FROM_DIAGNOSISTAB_FOR_ADD_ALL_CART,
    addSelectedFilesQuery: GET_ALL_FILEIDS_DIAGNOSISTAB_FOR_SELECT_ALL,
    */
  },
  {
    name: 'Treatment',
    dataField: 'dataTreatment',
    api: GET_TREATMENT_OVERVIEW_QUERY,
    statsQuery: DASHBOARD_QUERY_STATS,
    statsQueryName: 'getParticipants',
    //asyncDownload: true,
    paginationAPIField: 'treatmentOverview',
    defaultSortField: 'participant.participant_id',
    sortBy: 'participant.participant_id',
    defaultSortDirection: 'asc',
    count: 'numberOfTreatments',
    fileCount: 'treatmentFileCount',
    dataKey: 'treatment_id',
    hiddenDataKeys: ['participant', 'participant_pk', 'dbgap_accession'],
    tableID: 'treatment_tab_table',
    toolTipText: 'Count of Treatment Record',
    extendedViewConfig: {
      pagination: true,
      manageViewColumns: false,
      download: true,
      downloadButtonConfig: {
        title: 'DOWNLOAD DATA',
        cloudIcon: true,
        //downloadLimit: 5000,
      },
    },
    columns: [
      {
        cellType: cellTypes.CHECKBOX,
        display: true,
        role: cellTypes.CHECKBOX,
      },
      {
         dataField: 'participant',
        sortField: 'participant.participant_id',
        header: 'Participant ID',
        display: true,
        tooltipText: 'sort',
        role: cellTypes.DISPLAY,
        cellType: cellTypes.CUSTOM_ELEM
      },
      {
        dataField: "id",
        header: "Treatment ID",
        display: true,
        tooltipText: "sort",
        role: cellTypes.DISPLAY
      },
      {
        dataField: "age_at_treatment_start",
        header: "Age at Treatment Start",
        display: true,
        tooltipText: "sort",
        role: cellTypes.DISPLAY
      },
      {
        dataField: 'age_at_treatment_end',
        header: 'Age at Treatment End',
        display: true,
        tooltipText: 'sort',
        role: cellTypes.DISPLAY,
      },
      {
        dataField: 'treatment_type',
        header: 'Treatment Type',
        display: true,
        tooltipText: 'sort',
        role: cellTypes.DISPLAY,
      },
      {
        dataField: "treatment_agent",
        header: "Treatment Agent",
        display: true,
        tooltipText: "sort",
        role: cellTypes.DISPLAY,
        cellType: cellTypes.CUSTOM_ELEM,
      },
      {
        dataField: 'dbgap_accession',
        header: 'dbGaP Accession',
        display: true,
        tooltipText: 'sort',
        role: cellTypes.DISPLAY,
        linkAttr: {
          rootPath: 'https://www.ncbi.nlm.nih.gov/projects/gap/cgi-bin/study.cgi?study_id=',
        },
        cellType: cellTypes.CUSTOM_ELEM,
        doNotDownload: true,
      },
      {
        dataField: "study_id",
        header: "Study ID",
        display: false,
        tooltipText: "sort",
        role: cellTypes.DISPLAY
      },

    ],
    id: 'treatment_tab',
    tabIndex: '4',
    selectableRows: true,
    tableDownloadCSV: {},
    downloadFileName: 'C3DC Treatment Download',
    tableMsg: {
      noMatch: 'No Matching Records Found',
    },
    addFilesRequestVariableKey: 'treatment_ids',
    addFilesResponseKeys: ['fileIDsFromList'],
    addAllFilesResponseKeys: ['treatmentOverview', 'files'],
    addAllFileQuery: "",
    addSelectedFilesQuery: GET_ALL_FILEIDS_DIAGNOSISTAB_FOR_SELECT_ALL,
  },
  {
    name: 'Treatment Response',
    dataField: 'dataTreatmentResponse',
    api: GET_TREATMENT_RESPONSE_OVERVIEW_QUERY,
    statsQuery: DASHBOARD_QUERY_STATS,
    statsQueryName: 'getParticipants',
    //asyncDownload: true,
    paginationAPIField: 'treatmentResponseOverview',
    defaultSortField: 'participant.participant_id',
    defaultSortDirection: 'asc',
    count: 'numberOfTreatmentResponses',
    fileCount: 'treatmentResponseFileCount',
    dataKey: 'treatment_response_id',
    hiddenDataKeys: ['participant', 'participant_pk', 'dbgap_accession'],
    tableID: 'treatment_response_tab_table',
    toolTipText: 'Count of Treatment Response Record',
    extendedViewConfig: {
      pagination: true,
      manageViewColumns: false,
      download: true,
      downloadButtonConfig: {
        title: 'DOWNLOAD DATA',
        cloudIcon: true,
        //downloadLimit: 5000,
      },
    },
    columns: [
      {
        cellType: cellTypes.CHECKBOX,
        display: true,
        role: cellTypes.CHECKBOX,
      },
      {
         dataField: 'participant',
        sortField: 'participant.participant_id',
        header: 'Participant ID',
        display: true,
        tooltipText: 'sort',
        role: cellTypes.DISPLAY,
        cellType: cellTypes.CUSTOM_ELEM
      },
      {
        dataField: "treatment_response_id",
        header: "Treatment Response ID",
        display: true,
        tooltipText: "sort",
        role: cellTypes.DISPLAY
      },
      {
        dataField: 'response',
        header: 'Response',
        display: true,
        tooltipText: 'sort',
        role: cellTypes.DISPLAY,
      },
      {
        dataField: 'age_at_response',
        header: 'Age at Response',
        display: true,
        tooltipText: 'sort',
        role: cellTypes.DISPLAY,
      },
      {
        dataField: "response_category",
        header: "Response Category",
        display: true,
        tooltipText: "sort",
        role: cellTypes.DISPLAY
      },
      {
        dataField: "response_system",
        header: "Response System",
        display: true,
        tooltipText: "sort",
        role: cellTypes.DISPLAY
      },
      {
        dataField: 'dbgap_accession',
        header: 'dbGaP Accession',
        display: true,
        tooltipText: 'sort',
        role: cellTypes.DISPLAY,
        linkAttr: {
          rootPath: 'https://www.ncbi.nlm.nih.gov/projects/gap/cgi-bin/study.cgi?study_id=',
        },
        cellType: cellTypes.CUSTOM_ELEM,
        doNotDownload: true,
      },
      {
        dataField: "study_id",
        header: "Study ID",
        display: false,
        tooltipText: "sort",
        role: cellTypes.DISPLAY
      },
    ],
    id: 'treatment_response_tab',
    tabIndex: '4',
    selectableRows: true,
    tableDownloadCSV: {},
    downloadFileName: 'C3DC Treatment Response Download',
    tableMsg: {
      noMatch: 'No Matching Records Found',
    },
    addFilesRequestVariableKey: 'treatment_response_ids',
    addFilesResponseKeys: ['fileIDsFromList'],
    addAllFilesResponseKeys: ['treatmentResponseOverview', 'files'],
  },
  {
    name: 'Survival',
    dataField: 'dataSurvival',
    api: GET_SURVIVAL_OVERVIEW_QUERY,
    statsQuery: DASHBOARD_QUERY_STATS,
    statsQueryName: 'getParticipants',
    //asyncDownload: true,
    count: 'numberOfSurvivals',
    fileCount: 'samplesFileCount',
    paginationAPIField: 'survivalOverview',
    dataKey: 'id',
    hiddenDataKeys: ['participant', 'participant_pk', 'dbgap_accession'],
    defaultSortField: 'participant.participant_id',
    defaultSortDirection: 'asc',
    toolTipText: 'Count of Survival Record',
    tableID: 'survival_tab_table',
    extendedViewConfig: {
      pagination: true,
      manageViewColumns: false,
      download: true,
      downloadButtonConfig: {
        title: 'DOWNLOAD DATA',
        cloudIcon: true,
        //downloadLimit: 5000,
      },
    },
    saveButtonDefaultStyle: {
      color: '#fff',
      backgroundColor: '#00AEEF',
      opacity: '1',
      border: '0px',
      cursor: 'pointer',
    },
    DeactiveSaveButtonDefaultStyle: {
      opacity: '0.3',
      cursor: 'auto',
    },
    ActiveSaveButtonDefaultStyle: {
      cursor: 'pointer',
      opacity: 'unset',
      border: 'unset',
    },
    columns: [
      {
        cellType: cellTypes.CHECKBOX,
        display: true,
        role: cellTypes.CHECKBOX,
      },
      {
        dataField: 'participant',
        sortField: 'participant.participant_id',
        header: 'Participant ID',
        display: true,
        tooltipText: 'sort',
        role: cellTypes.DISPLAY,
        cellType: cellTypes.CUSTOM_ELEM
      },
      {
        dataField: "id",
        header: "Survival ID",
        display: true,
        tooltipText: "sort",
        role: cellTypes.DISPLAY
      },
      {
        dataField: 'last_known_survival_status',
        header: 'Last Known Survival Status',
        display: true,
        tooltipText: 'sort',
        role: cellTypes.DISPLAY,
      },
      {
        dataField: 'age_at_last_known_survival_status',
        header: 'Age at Last Known Survival Status',
        display: true,
        tooltipText: 'sort',
        role: cellTypes.DISPLAY,
        cellType: cellTypes.COMMA
      },
      {
        dataField: "event_free_survival_status",
        header: "Event-Free Survival Status",
        display: false,
        tooltipText: "sort",
        role: cellTypes.DISPLAY
      },
      {
        dataField: "age_at_event_free_survival_status",
        header: "Age at Event-Free Survival Status",
        display: false,
        tooltipText: "sort",
        role: cellTypes.COMMA,
        cellType: cellTypes.COMMA
      },
      {
        dataField: 'first_event',
        header: 'First Event',
        display: true,
        tooltipText: 'sort',
        role: cellTypes.DISPLAY,
      },
      {
        dataField: 'cause_of_death',
        header: 'Cause of Death',
        display: true,
        tooltipText: 'sort',
        role: cellTypes.DISPLAY,
      },
      {
        dataField: 'dbgap_accession',
        header: 'dbGaP Accession',
        display: true,
        tooltipText: 'sort',
        role: cellTypes.DISPLAY,
        linkAttr: {
          rootPath: 'https://www.ncbi.nlm.nih.gov/projects/gap/cgi-bin/study.cgi?study_id=',
        },
        cellType: cellTypes.CUSTOM_ELEM,
        doNotDownload: true,
      },
      {
        dataField: "study_id",
        header: "Study ID",
        display: false,
        tooltipText: "sort",
        role: cellTypes.DISPLAY
      },

    ],
    id: 'survival_tab',
    tabIndex: '1',
    tableDownloadCSV: {},
    downloadFileName: 'C3DC Survival Download',
    tableMsg: {
      noMatch: 'No Matching Records Found',
    },
  },
  {
    name: 'Genetic Analysis',
    dataField: 'dataGeneticAnalysis',
    api: GET_GENETIC_ANALYSIS_OVERVIEW_QUERY,
    statsQuery: DASHBOARD_QUERY_STATS,
    statsQueryName: 'getParticipants',
    //asyncDownload: true,
    paginationAPIField: 'geneticAnalysisOverview',
    defaultSortField: 'participant.participant_id',
    defaultSortDirection: 'asc',
    count: 'numberOfGeneticAnalyses',
    fileCount: 'geneticAnalysisFileCount',
    toolTipText: 'Count of Genetic Analysis Record',
    dataKey: "id",
    hiddenDataKeys: ['participant', 'participant_pk', 'dbgap_accession'],
    tableID: 'genetic_analysis_tab_table',
    extendedViewConfig: {
      pagination: true,
      manageViewColumns: false,
      download: true,
      downloadButtonConfig: {
        title: 'DOWNLOAD DATA',
        cloudIcon: true,
        //downloadLimit: 5000,
      },
    },
    columns: [
      {
        cellType: cellTypes.CHECKBOX,
        display: true,
        role: cellTypes.CHECKBOX,
      },
      {
        dataField: 'participant',
        sortField: 'participant.participant_id',
        header: 'Participant ID',
        display: true,
        tooltipText: 'sort',
        role: cellTypes.DISPLAY,
        cellType: cellTypes.CUSTOM_ELEM
      },
      {
        dataField: 'genetic_analysis_id',
        header: 'Genetic Analysis ID',
        display: true,
        tooltipText: 'sort',
        role: cellTypes.DISPLAY,
      },
      {
        dataField: 'gene_symbol',
        header: 'Gene Symbol',
        display: true,
        tooltipText: 'sort',
        role: cellTypes.DISPLAY,
        cellType: cellTypes.CUSTOM_ELEM,
      },
      {
        dataField: 'status',
        header: 'Status',
        display: true,
        tooltipText: 'sort',
        role: cellTypes.DISPLAY,
      },
      {
        dataField: 'chromosome',
        header: 'Chromosome',
        display: false,
        tooltipText: 'sort',
        role: cellTypes.DISPLAY,
      },
      {
        dataField: 'cytoband',
        header: 'Cytoband',
        display: false,
        tooltipText: 'sort',
        role: cellTypes.DISPLAY,
      },
      {
        dataField: 'test',
        header: 'Test',
        display: false,
        tooltipText: 'sort',
        role: cellTypes.DISPLAY,
      },
      {
        dataField: 'reported_significance',
        header: 'Reported Significance',
        display: true,
        tooltipText: 'sort',
        role: cellTypes.DISPLAY,
      },
      {
        dataField: 'reported_significance_system',
        header: 'Reported Significance System',
        display: true,
        tooltipText: 'sort',
        role: cellTypes.DISPLAY,
      },
      {
        dataField: 'reference_genome',
        header: 'Reference Genome',
        display: false,
        tooltipText: 'sort',
        role: cellTypes.DISPLAY,
      },
      {
        dataField: 'hgvs_genome',
        header: 'HGVS Genome',
        display: true,
        tooltipText: 'sort',
        role: cellTypes.DISPLAY,
      },
      {
        dataField: 'hgvs_coding',
        header: 'HGVS Coding',
        display: false,
        tooltipText: 'sort',
        role: cellTypes.DISPLAY,
      },
      {
        dataField: 'hgvs_protein',
        header: 'HGVS Protein',
        display: false,
        tooltipText: 'sort',
        role: cellTypes.DISPLAY,
      },
      {
        dataField: 'exon',
        header: 'Exon',
        display: false,
        tooltipText: 'sort',
        role: cellTypes.DISPLAY,
      },
      {
        dataField: 'alteration',
        header: 'Alteration',
        display: true,
        tooltipText: 'sort',
        role: cellTypes.DISPLAY,
      },
      {
        dataField: 'alteration_effect',
        header: 'Alteration Effect',
        display: false,
        tooltipText: 'sort',
        role: cellTypes.DISPLAY,
      },
      {
        dataField: 'alteration_type',
        header: 'Alteration Type',
        display: false,
        tooltipText: 'sort',
        role: cellTypes.DISPLAY,
      },
      {
        dataField: 'fusion_partner_gene',
        header: 'Fusion Partner Gene',
        display: false,
        tooltipText: 'sort',
        role: cellTypes.DISPLAY,
      },
      {
        dataField: 'fusion_partner_exon',
        header: 'Fusion Partner Exon',
        display: false,
        tooltipText: 'sort',
        role: cellTypes.DISPLAY,
      },
      {
        dataField: 'genomic_source_category',
        header: 'Genomic Source Category',
        display: false,
        tooltipText: 'sort',
        role: cellTypes.DISPLAY,
      },
      {
        dataField: 'dbgap_accession',
        header: 'dbGaP Accession',
        display: true,
        tooltipText: 'sort',
        role: cellTypes.DISPLAY,
        linkAttr: {
          rootPath: 'https://www.ncbi.nlm.nih.gov/projects/gap/cgi-bin/study.cgi?study_id=',
        },
        cellType: cellTypes.CUSTOM_ELEM,
        doNotDownload: true,
      },
    ],
    id: 'genetic_analysis_tab',
    tabIndex: '6',
    tableDownloadCSV: {},
    downloadFileName: 'C3DC Genetic Analysis Download',
    tableMsg: {
      noMatch: 'No Matching Records Found',
    },
  }
];