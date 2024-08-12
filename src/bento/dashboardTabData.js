import gql from 'graphql-tag';
import { cellTypes } from '@bento-core/table';
import { customParticipantsTabDownloadCSV, customSamplesTabDownloadCSV, customDiagnosisTabDownloadCSV, customStudyTabDownloadCSV } from './tableDownloadCSV';
import questionIcon from '../assets/icons/Question_Icon.svg';

// --------------- Tooltip configuration --------------
export const tooltipContentAddAll = {
  icon: questionIcon,
  alt: 'tooltipIcon',
  Participants: 'Click button to add all files associated with the filtered row(s).',
  Diagnosis: 'Click button to add all files associated with the filtered row(s).',
  Studies: 'Click button to add all files associated with the filtered row(s).',
  Samples: 'Click button to add all files associated with the filtered row(s).',
  Files: 'Click button to add all files associated with the filtered row(s).',
  arrow: true,
  styles: {
  }
};

export const tooltipContent = {
  icon: questionIcon,
  alt: 'tooltipIcon',
  Participants: 'Click button to add files associated with the selected row(s).',
  Diagnosis: 'Click button to add files associated with the selected row(s).',
  Studies: 'Click button to add files associated with the selected row(s).',
  Samples: 'Click button to add files associated with the selected row(s).',
  Files: 'Click button to add files associated with the selected row(s).',
  arrow: true,
  styles: {
    border: '#03A383 1px solid',
  }
};

// --------------- Dahboard Table external link configuration --------------
// Ideal size for externalLinkIcon is 16x16 px
export const externalLinkIcon = {
  src: 'https://raw.githubusercontent.com/CBIIT/datacommons-assets/main/bento/images/icons/svgs/externalLinkIcon.svg',
  alt: 'External link icon',
};

//NOTE: Change 'getParticipants' to 'searchParticipants' in the backend.
export const DASHBOARD_QUERY_NEW = gql`
query search(
  # Demographics
  $participant_ids: [String],
  $ethnicity: [String],
  $race: [String],
  $sex_at_birth: [String],

  # Diagnoses
  $age_at_diagnosis: [Int],
  $anatomic_site: [String],
  $diagnosis: [String],
  $diagnosis_classification_system: [String],
  $diagnosis_basis: [String],
  $disease_phase: [String],

  # Studies
  $dbgap_accession: [String],
  $study_name: [String],

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
  diagnosis: $diagnosis,
  diagnosis_classification_system: $diagnosis_classification_system,
  diagnosis_basis: $diagnosis_basis,
  disease_phase: $disease_phase,
  
  # Studies
  dbgap_accession: $dbgap_accession,
  study_name: $study_name,

  # Survivals
  age_at_last_known_survival_status: $age_at_last_known_survival_status,
  first_event: $first_event,
  last_known_survival_status: $last_known_survival_status
) {
  numberOfParticipants
  numberOfDiagnoses
  numberOfDiseases
  numberOfStudies
  numberOfSurvivals
  numberOfTreatments
  numberOfTreatmentResponses

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

export const GET_FILES_OVERVIEW_QUERY = gql`
query fileOverview(
    $participant_ids: [String],
    $gender: [String] ,
    $race: [String] ,
    $ethnicity: [String] ,
    $age_at_diagnosis: [Int] ,
    $diagnosis_anatomic_site: [String] ,
    $disease_phase: [String] ,
    $diagnosis_icd_o: [String] ,
    $vital_status: [String] ,
    $sample_anatomic_site: [String] ,
    $participant_age_at_collection: [Int] ,
    $sample_tumor_status: [String] ,
    $tumor_classification: [String] ,
    $assay_method: [String],
    $file_type: [String],
    $dbgap_accession: [String],
    $grant_id: [String],
    $institution: [String],
    $study_name: [String],
    $library_selection: [String],
    $library_source: [String],
    $library_strategy: [String],
    $first: Int, 
    $offset: Int, 
    $order_by: String,
    $sort_direction: String ){
    fileOverview(
        participant_ids: $participant_ids,
        gender: $gender,
        race: $race,
        ethnicity: $ethnicity,
        age_at_diagnosis: $age_at_diagnosis,
        diagnosis_anatomic_site: $diagnosis_anatomic_site,
        disease_phase: $disease_phase,
        diagnosis_icd_o: $diagnosis_icd_o,
        vital_status: $vital_status,
        sample_anatomic_site: $sample_anatomic_site,
        participant_age_at_collection: $participant_age_at_collection,
        sample_tumor_status: $sample_tumor_status,
        tumor_classification: $tumor_classification,
        assay_method: $assay_method,
        file_type: $file_type,
        dbgap_accession: $dbgap_accession,       
        grant_id: $grant_id,
        institution: $institution,
        study_name: $study_name,
        library_selection: $library_selection,
        library_source: $library_source,
        library_strategy: $library_strategy,
        first: $first, 
        offset: $offset, 
        order_by: $order_by,
        sort_direction: $sort_direction
    ){
        id
        file_name
        file_category
        file_description
        file_type
        file_size
        study_id
        participant_id
        sample_id
        file_id
        guid
        md5sum
    }
}
`;

export const GET_SURVIVAL_OVERVIEW_QUERY = gql`
query survivalOverview(
  # Demographics
  $participant_ids: [String],
  $ethnicity: [String],
  $race: [String],
  $sex_at_birth: [String],

  # Diagnoses
  $age_at_diagnosis: [Int],
  $anatomic_site: [String],
  $diagnosis: [String],
  $diagnosis_classification_system: [String],
  $diagnosis_basis: [String],
  $disease_phase: [String],

  # Studies
  $dbgap_accession: [String],
  $study_name: [String],

  # Survivals
  $age_at_last_known_survival_status: [Int],
  $first_event: [String],
  $last_known_survival_status: [String]

  # Table config
  $first: Int,
  $offset: Int,
  $order_by: String,
  $sort_direction: String
) {
  survivalOverview(
      # Demographics
      participant_ids: $participant_ids,
      ethnicity: $ethnicity,
      race: $race,
      sex_at_birth: $sex_at_birth,

      # Diagnoses
      age_at_diagnosis: $age_at_diagnosis,
      anatomic_site: $anatomic_site,
      diagnosis: $diagnosis,
      diagnosis_classification_system: $diagnosis_classification_system,
      diagnosis_basis: $diagnosis_basis,
      disease_phase: $disease_phase,
      
      # Studies
      dbgap_accession: $dbgap_accession,
      study_name: $study_name,

      # Survivals
      age_at_last_known_survival_status: $age_at_last_known_survival_status,
      first_event: $first_event,
      last_known_survival_status: $last_known_survival_status

      # Table config
      first: $first,
      offset: $offset,
      order_by: $order_by,
      sort_direction: $sort_direction
  ) {
      # Participant
      participant_id

      # Study
      study_id
      dbgap_accession

      # Survival
      age_at_event_free_survival_status
      age_at_last_known_survival_status
      event_free_survival_status
      first_event
      last_known_survival_status
      survival_id

      __typename
  }
}`;

export const GET_PARTICIPANTS_OVERVIEW_QUERY = gql`
query participantOverview(
  # Demographics
  $participant_ids: [String],
  $ethnicity: [String],
  $race: [String],
  $sex_at_birth: [String],

  # Diagnoses
  $age_at_diagnosis: [Int],
  $anatomic_site: [String],
  $diagnosis: [String],
  $diagnosis_classification_system: [String],
  $diagnosis_basis: [String],
  $disease_phase: [String],

  # Studies
  $dbgap_accession: [String],
  $study_name: [String],

  # Survivals
  $age_at_last_known_survival_status: [Int],
  $first_event: [String],
  $last_known_survival_status: [String]

  # Table config
  $first: Int,
  $offset: Int,
  $order_by: String,
  $sort_direction: String
) {
  participantOverview(
      # Demographics
      participant_ids: $participant_ids,
      ethnicity: $ethnicity,
      race: $race,
      sex_at_birth: $sex_at_birth,

      # Diagnoses
      age_at_diagnosis: $age_at_diagnosis,
      anatomic_site: $anatomic_site,
      diagnosis: $diagnosis,
      diagnosis_classification_system: $diagnosis_classification_system,
      diagnosis_basis: $diagnosis_basis,
      disease_phase: $disease_phase,
      
      # Studies
      dbgap_accession: $dbgap_accession,
      study_name: $study_name,

      # Survivals
      age_at_last_known_survival_status: $age_at_last_known_survival_status,
      first_event: $first_event,
      last_known_survival_status: $last_known_survival_status

      # Table config
      first: $first,
      offset: $offset,
      order_by: $order_by,
      sort_direction: $sort_direction
  ) {
      # Participants
      ethnicity
      participant_id
      race
      sex_at_birth

      # Studies
      dbgap_accession
      study_id

      __typename
  }
}`;

export const GET_DIAGNOSIS_OVERVIEW_QUERY = gql`
query diagnosisOverview(
  # Demographics
  $participant_ids: [String],
  $ethnicity: [String],
  $race: [String],
  $sex_at_birth: [String],

  # Diagnoses
  $age_at_diagnosis: [Int],
  $anatomic_site: [String],
  $diagnosis: [String],
  $diagnosis_classification_system: [String],
  $diagnosis_basis: [String],
  $disease_phase: [String],

  # Studies
  $dbgap_accession: [String],
  $study_name: [String],

  # Survivals
  $age_at_last_known_survival_status: [Int],
  $first_event: [String],
  $last_known_survival_status: [String]

  # Table config
  $first: Int,
  $offset: Int,
  $order_by: String,
  $sort_direction: String
) {
  diagnosisOverview(
      # Demographics
      participant_ids: $participant_ids,
      ethnicity: $ethnicity,
      race: $race,
      sex_at_birth: $sex_at_birth,

      # Diagnoses
      age_at_diagnosis: $age_at_diagnosis,
      anatomic_site: $anatomic_site,
      diagnosis: $diagnosis,
      diagnosis_classification_system: $diagnosis_classification_system,
      diagnosis_basis: $diagnosis_basis,
      disease_phase: $disease_phase,
      
      # Studies
      dbgap_accession: $dbgap_accession,
      study_name: $study_name,

      # Survivals
      age_at_last_known_survival_status: $age_at_last_known_survival_status,
      first_event: $first_event,
      last_known_survival_status: $last_known_survival_status

      # Table config
      first: $first,
      offset: $offset,
      order_by: $order_by,
      sort_direction: $sort_direction
  ) {
      # Diagnosis
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

      # Participants
      participant_id

      # Study
      study_id
      dbgap_accession

      __typename
  }
}`;

export const GET_STUDY_OVERVIEW_QUERY = gql`
query studyOverview(
  # Demographics
  $participant_ids: [String],
  $ethnicity: [String],
  $race: [String],
  $sex_at_birth: [String],

  # Diagnoses
  $age_at_diagnosis: [Int],
  $anatomic_site: [String],
  $diagnosis: [String],
  $diagnosis_classification_system: [String],
  $diagnosis_basis: [String],
  $disease_phase: [String],

  # Studies
  $dbgap_accession: [String],
  $study_name: [String],

  # Survivals
  $age_at_last_known_survival_status: [Int],
  $first_event: [String],
  $last_known_survival_status: [String]

  # Table config
  $first: Int,
  $offset: Int,
  $order_by: String,
  $sort_direction: String
) {
  studyOverview(
      # Demographics
      participant_ids: $participant_ids,
      ethnicity: $ethnicity,
      race: $race,
      sex_at_birth: $sex_at_birth,

      # Diagnoses
      age_at_diagnosis: $age_at_diagnosis,
      anatomic_site: $anatomic_site,
      diagnosis: $diagnosis,
      diagnosis_classification_system: $diagnosis_classification_system,
      diagnosis_basis: $diagnosis_basis,
      disease_phase: $disease_phase,
      
      # Studies
      dbgap_accession: $dbgap_accession,
      study_name: $study_name,

      # Survivals
      age_at_last_known_survival_status: $age_at_last_known_survival_status,
      first_event: $first_event,
      last_known_survival_status: $last_known_survival_status

      # Table config
      first: $first,
      offset: $offset,
      order_by: $order_by,
      sort_direction: $sort_direction
  ) {
      # Studies
      acl
      consent
      consent_number
      external_url
      dbgap_accession
      study_description
      study_id
      study_name

      __typename
  }
}`;

export const GET_ALL_FILEIDS_PARTICIPANTSTAB_FOR_SELECT_ALL = gql`
query search (          
  $participant_ids: [String],
){
  fileIDsFromList (          
      participant_ids: $participant_ids,
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

export const GET_ALL_FILEIDS_FROM_PARTICIPANTSTAB_FOR_ADD_ALL_CART = gql`
query participantsAddAllToCart(
    $participant_ids: [String],
    $gender: [String] ,
    $race: [String] ,
    $ethnicity: [String] ,
    $age_at_diagnosis: [Int] ,
    $diagnosis_anatomic_site: [String] ,
    $disease_phase: [String] ,
    $diagnosis_icd_o: [String] ,
    $vital_status: [String] ,
    $sample_anatomic_site: [String] ,
    $participant_age_at_collection: [Int] ,
    $sample_tumor_status: [String] ,
    $tumor_classification: [String] ,
    $assay_method: [String],
    $file_type: [String],
    $dbgap_accession: [String],
    $grant_id: [String],
    $institution: [String],
    $study_name: [String],
    $library_selection: [String],
    $library_source: [String],
    $library_strategy: [String],
    $first: Int,
    $offset: Int= 0, 
    $order_by: String = "file_id",
    $sort_direction: String = "asc" 
  ){
    participantOverview(
      participant_ids: $participant_ids,
      gender: $gender,
      race: $race,
      ethnicity: $ethnicity,
      age_at_diagnosis: $age_at_diagnosis,
      diagnosis_anatomic_site: $diagnosis_anatomic_site,
      disease_phase: $disease_phase,
      diagnosis_icd_o: $diagnosis_icd_o,
      vital_status: $vital_status,
      sample_anatomic_site: $sample_anatomic_site,
      participant_age_at_collection: $participant_age_at_collection,
      sample_tumor_status: $sample_tumor_status,
      tumor_classification: $tumor_classification,
      assay_method: $assay_method,
      file_type: $file_type,
      dbgap_accession: $dbgap_accession,       
      grant_id: $grant_id,
      institution: $institution,
      study_name: $study_name,
      library_selection: $library_selection,
      library_source: $library_source,
      library_strategy: $library_strategy,
      first: $first,
      offset: $offset,
      order_by: $order_by,
      sort_direction: $sort_direction
      ) {
      files
  }
}
    `;

export const GET_ALL_FILEIDS_FROM_SAMPLETAB_FOR_ADD_ALL_CART = gql`
    query samplesAddAllToCart(
      $participant_ids: [String],
      $gender: [String] ,
      $race: [String] ,
      $ethnicity: [String] ,
      $age_at_diagnosis: [Int] ,
      $diagnosis_anatomic_site: [String] ,
      $disease_phase: [String] ,
      $diagnosis_icd_o: [String] ,
      $vital_status: [String] ,
      $sample_anatomic_site: [String] ,
      $participant_age_at_collection: [Int] ,
      $sample_tumor_status: [String] ,
      $tumor_classification: [String] ,
      $assay_method: [String],
      $file_type: [String],
      $dbgap_accession: [String],
      $grant_id: [String],
      $institution: [String],
      $study_name: [String],
      $library_selection: [String],
      $library_source: [String],
      $library_strategy: [String],
      $first: Int,
      $offset: Int= 0, 
      $order_by: String = "file_id",
      $sort_direction: String = "asc" ){
      sampleOverview(
          participant_ids: $participant_ids,
          gender: $gender,
          race: $race,
          ethnicity: $ethnicity,
          age_at_diagnosis: $age_at_diagnosis,
          diagnosis_anatomic_site: $diagnosis_anatomic_site,
          disease_phase: $disease_phase,
          diagnosis_icd_o: $diagnosis_icd_o,
          vital_status: $vital_status,
          sample_anatomic_site: $sample_anatomic_site,
          participant_age_at_collection: $participant_age_at_collection,
          sample_tumor_status: $sample_tumor_status,
          tumor_classification: $tumor_classification,
          assay_method: $assay_method,
          file_type: $file_type,
          dbgap_accession: $dbgap_accession,       
          grant_id: $grant_id,
          institution: $institution,
          study_name: $study_name,
          library_selection: $library_selection,
          library_source: $library_source,
          library_strategy: $library_strategy,
          first: $first,
          offset: $offset,
          order_by: $order_by,
          sort_direction: $sort_direction
          ) {
          files
      }
    }
        `;

export const GET_ALL_FILEIDS_FROM_FILESTAB_FOR_ADD_ALL_CART = gql`
query fileAddAllToCart(
  $participant_ids: [String],
  $gender: [String] ,
  $race: [String] ,
  $ethnicity: [String] ,
  $age_at_diagnosis: [Int] ,
  $diagnosis_anatomic_site: [String] ,
  $disease_phase: [String] ,
  $diagnosis_icd_o: [String] ,
  $vital_status: [String] ,
  $sample_anatomic_site: [String] ,
  $participant_age_at_collection: [Int] ,
  $sample_tumor_status: [String] ,
  $tumor_classification: [String] ,
  $assay_method: [String],
  $file_type: [String],
  $dbgap_accession: [String],
  $grant_id: [String],
  $institution: [String],
  $study_name: [String],
  $library_selection: [String],
  $library_source: [String],
  $library_strategy: [String],
  $first: Int,
  $offset: Int= 0, 
  $order_by: String = "file_id",
  $sort_direction: String = "asc"
 ){
  fileOverview(
      participant_ids: $participant_ids,
      gender: $gender,
      race: $race,
      ethnicity: $ethnicity,
      age_at_diagnosis: $age_at_diagnosis,
      diagnosis_anatomic_site: $diagnosis_anatomic_site,
      disease_phase: $disease_phase,
      diagnosis_icd_o: $diagnosis_icd_o,
      vital_status: $vital_status,
      sample_anatomic_site: $sample_anatomic_site,
      participant_age_at_collection: $participant_age_at_collection,
      sample_tumor_status: $sample_tumor_status,
      tumor_classification: $tumor_classification,
      assay_method: $assay_method,
      file_type: $file_type,
      dbgap_accession: $dbgap_accession,       
      grant_id: $grant_id,
      institution: $institution,
      study_name: $study_name,
      library_selection: $library_selection,
      library_source: $library_source,
      library_strategy: $library_strategy,
      first: $first,
      offset: $offset,
      order_by: $order_by,
      sort_direction: $sort_direction
  ){
    files
  }
}
            `;

export const GET_ALL_FILEIDS_FROM_DIAGNOSISTAB_FOR_ADD_ALL_CART = gql`
query diagnosisAddAllToCart(
  $participant_ids: [String],
  $gender: [String] ,
  $race: [String] ,
  $ethnicity: [String] ,
  $age_at_diagnosis: [Int] ,
  $diagnosis_anatomic_site: [String] ,
  $disease_phase: [String] ,
  $diagnosis_icd_o: [String] ,
  $vital_status: [String] ,
  $sample_anatomic_site: [String] ,
  $participant_age_at_collection: [Int] ,
  $sample_tumor_status: [String] ,
  $tumor_classification: [String] ,
  $assay_method: [String],
  $file_type: [String],
  $dbgap_accession: [String],
  $grant_id: [String],
  $institution: [String],
  $study_name: [String],
  $library_selection: [String],
  $library_source: [String],
  $library_strategy: [String],
  $first: Int,
  $offset: Int= 0, 
  $order_by: String = "file_id",
  $sort_direction: String = "asc" ){
  diagnosisOverview(
      participant_ids: $participant_ids,
      gender: $gender,
      race: $race,
      ethnicity: $ethnicity,
      age_at_diagnosis: $age_at_diagnosis,
      diagnosis_anatomic_site: $diagnosis_anatomic_site,
      disease_phase: $disease_phase,
      diagnosis_icd_o: $diagnosis_icd_o,
      vital_status: $vital_status,
      sample_anatomic_site: $sample_anatomic_site,
      participant_age_at_collection: $participant_age_at_collection,
      sample_tumor_status: $sample_tumor_status,
      tumor_classification: $tumor_classification,
      assay_method: $assay_method,
      file_type: $file_type,
      dbgap_accession: $dbgap_accession,       
      grant_id: $grant_id,
      institution: $institution,
      study_name: $study_name,
      library_selection: $library_selection,
      library_source: $library_source,
      library_strategy: $library_strategy,
      first: $first,
      offset: $offset,
      order_by: $order_by,
      sort_direction: $sort_direction
      ) {
      files
  }
}
    `;

export const GET_ALL_FILEIDS_FROM_STUDYTAB_FOR_ADD_ALL_CART = gql`
query studyAddAllToCart(
  $participant_ids: [String],
  $gender: [String] ,
  $race: [String] ,
  $ethnicity: [String] ,
  $age_at_diagnosis: [Int] ,
  $diagnosis_anatomic_site: [String] ,
  $disease_phase: [String] ,
  $diagnosis_icd_o: [String] ,
  $vital_status: [String] ,
  $sample_anatomic_site: [String] ,
  $participant_age_at_collection: [Int] ,
  $sample_tumor_status: [String] ,
  $tumor_classification: [String] ,
  $assay_method: [String],
  $file_type: [String],
  $dbgap_accession: [String],
  $grant_id: [String],
  $institution: [String],
  $study_name: [String],
  $library_selection: [String],
  $library_source: [String],
  $library_strategy: [String],
  $first: Int,
  $offset: Int= 0, 
  $order_by: String = "file_id",
  $sort_direction: String = "asc" ){
  studyOverview(
      participant_ids: $participant_ids,
      gender: $gender,
      race: $race,
      ethnicity: $ethnicity,
      age_at_diagnosis: $age_at_diagnosis,
      diagnosis_anatomic_site: $diagnosis_anatomic_site,
      disease_phase: $disease_phase,
      diagnosis_icd_o: $diagnosis_icd_o,
      vital_status: $vital_status,
      sample_anatomic_site: $sample_anatomic_site,
      participant_age_at_collection: $participant_age_at_collection,
      sample_tumor_status: $sample_tumor_status,
      tumor_classification: $tumor_classification,
      assay_method: $assay_method,
      file_type: $file_type,
      dbgap_accession: $dbgap_accession,       
      grant_id: $grant_id,
      institution: $institution,
      study_name: $study_name,
      library_selection: $library_selection,
      library_source: $library_source,
      library_strategy: $library_strategy,
      first: $first,
      offset: $offset,
      order_by: $order_by,
      sort_direction: $sort_direction
      ) {
      files
  }
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

export const GET_TREATMENT_OVERVIEW_QUERY = gql`
query treatmentOverview(
    # Demographics
    $participant_ids: [String],
    $ethnicity: [String],
    $race: [String],
    $sex_at_birth: [String],

    # Diagnoses
    $age_at_diagnosis: [Int],
    $anatomic_site: [String],
    $diagnosis: [String],
    $diagnosis_classification_system: [String],
    $diagnosis_basis: [String],
    $disease_phase: [String],

    # Studies
    $dbgap_accession: [String],
    $study_acronym: [String],
    $study_name: [String],

    # Survivals
    $age_at_last_known_survival_status: [Int],
    $first_event: [String],
    $last_known_survival_status: [String]

    # Table config
    $first: Int,
    $offset: Int,
    $order_by: String,
    $sort_direction: String
) {
    treatmentOverview(
        # Demographics
        participant_ids: $participant_ids,
        ethnicity: $ethnicity,
        race: $race,
        sex_at_birth: $sex_at_birth,

        # Diagnoses
        age_at_diagnosis: $age_at_diagnosis,
        anatomic_site: $anatomic_site,
        diagnosis: $diagnosis,
        diagnosis_classification_system: $diagnosis_classification_system,
        diagnosis_basis: $diagnosis_basis,
        disease_phase: $disease_phase,
        
        # Studies
        dbgap_accession: $dbgap_accession,
        study_acronym: $study_acronym,
        study_name: $study_name,

        # Survivals
        age_at_last_known_survival_status: $age_at_last_known_survival_status,
        first_event: $first_event,
        last_known_survival_status: $last_known_survival_status

        # Table config
        first: $first,
        offset: $offset,
        order_by: $order_by,
        sort_direction: $sort_direction
    ) {
        # Participant
        participant_id

        # Treatment
        treatment_id
        age_at_treatment_start
        age_at_treatment_end
        treatment_type
        treatment_agent
        dbgap_accession
        __typename
    }
}`;
export const GET_TREATMENT_RESPONSE_OVERVIEW_QUERY = gql`
query treatmentResponseOverview(
    # Demographics
    $participant_ids: [String],
    $ethnicity: [String],
    $race: [String],
    $sex_at_birth: [String],

    # Diagnoses
    $age_at_diagnosis: [Int],
    $anatomic_site: [String],
    $diagnosis: [String],
    $diagnosis_classification_system: [String],
    $diagnosis_basis: [String],
    $disease_phase: [String],

    # Studies
    $dbgap_accession: [String],
    $study_name: [String],

    # Survivals
    $age_at_last_known_survival_status: [Int],
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
    participant_ids: $participant_ids,
    ethnicity: $ethnicity,
    race: $race,
    sex_at_birth: $sex_at_birth,

    # Diagnoses
    age_at_diagnosis: $age_at_diagnosis,
    anatomic_site: $anatomic_site,
    diagnosis: $diagnosis,
    diagnosis_classification_system: $diagnosis_classification_system,
    diagnosis_basis: $diagnosis_basis,
    disease_phase: $disease_phase,
    
    # Studies
    dbgap_accession: $dbgap_accession,
    study_name: $study_name,

    # Survivals
    age_at_last_known_survival_status: $age_at_last_known_survival_status,
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
    participant_id

    # Study
    dbgap_accession

    # Treatment Response
    treatment_response_id
    response
    age_at_response
    response_category
    response_system
dbgap_accession
    __typename
}}`;

// --------------- Tabs Table configuration --------------
export const tabContainers = [
  {
    name: 'Studies',
    dataField: 'dataStudy',
    api: GET_STUDY_OVERVIEW_QUERY,
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
      },
    },
    columns: [
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
        dataField: "acl",
        header: "ACL",
        display: false,
        tooltipText: "sort",
        role: "cellTypes.DISPLAY"
      },
      {
        dataField: 'study_name',
        header: 'Study Name',
        display: true,
        tooltipText: 'sort',
        role: cellTypes.DISPLAY,
      },
      {
        dataField: "study_description",
        header: "Study Description",
        display: false,
        tooltipText: "sort",
        role: "cellTypes.DISPLAY"
      },
      {
        dataField: "consent",
        header: "Consent",
        display: false,
        tooltipText: "sort",
        role: "cellTypes.DISPLAY"
      },
      {
        dataField: "consent_number",
        header: "Consent Number",
        display: false,
        tooltipText: "sort",
        role: "cellTypes.DISPLAY"
      },
      {
        dataField: "external_url",
        header: "External URL",
        display: false,
        tooltipText: "sort",
        role: "cellTypes.DISPLAY"
      }


    ],
    id: 'study_tab',
    tabIndex: '4',
    selectableRows: true,
    tableDownloadCSV: customStudyTabDownloadCSV,
    downloadFileName: 'C3DC Studies Download',
    tableMsg: {
      noMatch: 'No Matching Records Found',
    },
    addFilesRequestVariableKey: 'study_ids',
    addFilesResponseKeys: ['fileIDsFromList'],
    addAllFilesResponseKeys: ['studyOverview', 'files'],
    addAllFileQuery: GET_ALL_FILEIDS_FROM_STUDYTAB_FOR_ADD_ALL_CART,
    addSelectedFilesQuery: GET_ALL_FILEIDS_STUDYISTAB_FOR_SELECT_ALL,
  },
  {
    name: 'Participants',
    dataField: 'dataParticipant',
    api: GET_PARTICIPANTS_OVERVIEW_QUERY,
    paginationAPIField: 'participantOverview',
    count: 'numberOfParticipants',
    fileCount: 'participantsFileCount',
    dataKey: 'participant_id',
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
      },
    },
    columns: [
      {
        dataField: 'participant_id',
        header: 'Participant Id',
        display: true,
        tooltipText: 'sort',
        role: cellTypes.DISPLAY,
      },
      {
        dataField: 'race',
        header: 'Race',
        display: true,
        tooltipText: 'sort',
        role: cellTypes.DISPLAY,
      },
      {
        dataField: 'ethnicity',
        header: 'Ethnicity',
        display: true,
        tooltipText: 'sort',
        role: cellTypes.DISPLAY,
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
          rootPath: 'https://www.ncbi.nlm.nih.gov/projects/gap/cgi-bin/study.cgi?study_id=',
        },
        cellType: cellTypes.CUSTOM_ELEM,
      },
    ],
    id: 'participant_tab',
    tableDownloadCSV: customParticipantsTabDownloadCSV,
    tabIndex: '0',
    downloadFileName: 'C3DC Participants Download',
    tableMsg: {
      noMatch: 'No Matching Records Found',
    },
    addFilesRequestVariableKey: 'participant_ids',
    addFilesResponseKeys: ['fileIDsFromList'],
    addAllFilesResponseKeys: ['participantOverview', 'files'],
    addAllFileQuery: GET_ALL_FILEIDS_FROM_PARTICIPANTSTAB_FOR_ADD_ALL_CART,
    addSelectedFilesQuery: GET_ALL_FILEIDS_PARTICIPANTSTAB_FOR_SELECT_ALL,
  },
  {
    name: 'Diagnosis',
    dataField: 'dataDiagnosis',
    api: GET_DIAGNOSIS_OVERVIEW_QUERY,
    paginationAPIField: 'diagnosisOverview',
    defaultSortField: 'participant_id',
    defaultSortDirection: 'asc',
    count: 'numberOfDiagnoses',
    fileCount: 'diagnosisFileCount',
    toolTipText: 'Count of Diagnosis Record',
    dataKey: 'id',
    tableID: 'diagnosis_tab_table',
    extendedViewConfig: {
      pagination: true,
      manageViewColumns: false,
      download: true,
      downloadButtonConfig: {
        title: 'DOWNLOAD DATA',
        cloudIcon: true,
      },
    },
    columns: [
      {
        dataField: 'participant_id',
        header: 'Participant Id',
        display: true,
        tooltipText: 'sort',
        role: cellTypes.DISPLAY,
      },
      {
        dataField: 'diagnosis_id',
        header: 'Diagnosis ID',
        display: false,
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
      },
      {
        dataField: 'diagnosis_basis',
        header: 'Diagnosis Basis',
        display: true,
        tooltipText: 'sort',
        role: cellTypes.DISPLAY,
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
      },

    ],
    id: 'diagnosis_tab',
    tabIndex: '3',
    tableDownloadCSV: customDiagnosisTabDownloadCSV,
    downloadFileName: 'C3DC Diagnosis Download',
    tableMsg: {
      noMatch: 'No Matching Records Found',
    },
    addFilesRequestVariableKey: 'diagnosis_ids',
    addFilesResponseKeys: ['fileIDsFromList'],
    addAllFilesResponseKeys: ['diagnosisOverview', 'files'],
    addAllFileQuery: GET_ALL_FILEIDS_FROM_DIAGNOSISTAB_FOR_ADD_ALL_CART,
    addSelectedFilesQuery: GET_ALL_FILEIDS_DIAGNOSISTAB_FOR_SELECT_ALL,
  },
  {
    name: 'Treatment',
    dataField: 'dataTreatment',
    api: GET_TREATMENT_OVERVIEW_QUERY,
    paginationAPIField: 'treatmentOverview',
    defaultSortField: 'treatment_id',
    defaultSortDirection: 'asc',
    count: 'numberOfTreatments',
    fileCount: 'treatmentFileCount',
    dataKey: 'id',
    tableID: 'treatment_tab_table',
    toolTipText: 'Count of Treatment Record',
    extendedViewConfig: {
      pagination: true,
      manageViewColumns: false,
      download: true,
      downloadButtonConfig: {
        title: 'DOWNLOAD DATA',
        cloudIcon: true,
      },
    },
    columns: [
      {
        dataField: 'participant_id',
        header: 'Participant ID',
        display: true,
        tooltipText: 'sort',
        role: cellTypes.DISPLAY,
      },
      {
        dataField: "treatment_id",
        header: "Treatment ID",
        display: true,
        tooltipText: "sort",
        role: "cellTypes.DISPLAY"
      },
      {
        dataField: "age_at_treatment_start",
        header: "Age at Treatment Start",
        display: true,
        tooltipText: "sort",
        role: "cellTypes.DISPLAY"
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
        role: "cellTypes.DISPLAY"
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

    ],
    id: 'treatment_tab',
    tabIndex: '4',
    selectableRows: true,
    tableDownloadCSV: customStudyTabDownloadCSV,
    downloadFileName: 'C3DC Studies Download',
    tableMsg: {
      noMatch: 'No Matching Records Found',
    },
    addFilesRequestVariableKey: 'treatment_ids',
    addFilesResponseKeys: ['fileIDsFromList'],
    addAllFilesResponseKeys: ['treatmentOverview', 'files'],
    addAllFileQuery: GET_ALL_FILEIDS_FROM_DIAGNOSISTAB_FOR_ADD_ALL_CART,
    addSelectedFilesQuery: GET_ALL_FILEIDS_DIAGNOSISTAB_FOR_SELECT_ALL,
  },
  {
    name: 'Treatment Response',
    dataField: 'dataTreatmentResponse',
    api: GET_TREATMENT_RESPONSE_OVERVIEW_QUERY,
    paginationAPIField: 'treatmentResponseOverview',
    defaultSortField: 'treatment_response_id',
    defaultSortDirection: 'asc',
    count: 'numberOfTreatmentResponses',
    fileCount: 'treatmentResponseFileCount',
    dataKey: 'id',
    tableID: 'treatment_response_tab_table',
    toolTipText: 'Count of Treatment Response Record',
    extendedViewConfig: {
      pagination: true,
      manageViewColumns: false,
      download: true,
      downloadButtonConfig: {
        title: 'DOWNLOAD DATA',
        cloudIcon: true,
      },
    },
    columns: [
      {
        dataField: 'participant_id',
        header: 'Participant ID',
        display: true,
        tooltipText: 'sort',
        role: cellTypes.DISPLAY,
      },
      {
        dataField: "treatment_response_id",
        header: "Treatment Response ID",
        display: true,
        tooltipText: "sort",
        role: "cellTypes.DISPLAY"
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
        header: 'Age At Response',
        display: true,
        tooltipText: 'sort',
        role: cellTypes.DISPLAY,
      },
      {
        dataField: "response_category",
        header: "Response Category",
        display: true,
        tooltipText: "sort",
        role: "cellTypes.DISPLAY"
      },
      {
        dataField: "response_system",
        header: "Response System",
        display: true,
        tooltipText: "sort",
        role: "cellTypes.DISPLAY"
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
    ],
    id: 'treatment_response_tab',
    tabIndex: '4',
    selectableRows: true,
    tableDownloadCSV: customStudyTabDownloadCSV,
    downloadFileName: 'C3DC Studies Download',
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
    count: 'numberOfSurvivals',
    fileCount: 'samplesFileCount',
    paginationAPIField: 'survivalOverview',
    dataKey: 'id',
    defaultSortField: 'participant_id',
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
        dataField: 'participant_id',
        header: 'Participant Id',
        display: true,
        tooltipText: 'sort',
        role: cellTypes.DISPLAY,
      },
      {
        dataField: "survival_id",
        header: "Survival ID",
        display: false,
        tooltipText: "sort",
        role: "cellTypes.DISPLAY"
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
        role: "cellTypes.DISPLAY"
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
    ],
    id: 'survival_tab',
    tabIndex: '1',
    tableDownloadCSV: customSamplesTabDownloadCSV,
    downloadFileName: 'C3DC Survival Download',
    tableMsg: {
      noMatch: 'No Matching Records Found',
    },
  }
];



