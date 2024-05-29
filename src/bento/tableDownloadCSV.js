import gql from 'graphql-tag';

export const GET_PARTICIPANTS_TAB = gql`
query participantOverViewPaged($participant_ids: [String], $offset: Int = 0, $first: Int = 1000, $order_by:String =""){
  participantOverViewPaged(participant_ids: $participant_ids, first: $first, offset: $offset, order_by: $order_by) {
    participant_id
    phs_accession
    race
    gender
    ethnicity
  }
}
`;

export const customParticipantsTabDownloadCSV = {
  keysToInclude: ['participant_id', 'phs_accession', 'race', 'gender', 'ethnicity'],
  header: ['Participant ID', 'Study Accession', 'Race', 'Gender', 'Ethnicity'],
  query: GET_PARTICIPANTS_TAB,
  apiVariable: 'participantOverView',
  fileName: 'tableDownload',
  defaultFullTableDownload: false,
};

export const GET_SAMPLES_TAB = gql`
query sampleOverview($sample_ids: [String], $offset: Int = 0, $first: Int = 1000, $order_by:String =""){
  sampleOverview(sample_ids: $sample_ids, offset: $offset,first: $first, order_by: $order_by) {
    sample_id,
    participant_id
    study_id
    anatomic_site
    participant_age_at_collection
    diagnosis_icd_o
    sample_tumor_status
    tumor_classification
  }
}
`;

export const customSamplesTabDownloadCSV = {
  keysToInclude: ['sample_id', 'participant_id', 'study_id', 'anatomic_site', 'participant_age_at_collection', 'diagnosis_icd_o', 'sample_tumor_status', 'tumor_classification'],
  header: ['Sample ID', 'Participant ID', 'Study ID', 'Anatomic Site', 'Age at Sample Collection', 'Sample ICD-O Morphology', 'Sample Tumor Status', 'Sample Tumor Classification'],
  query: GET_SAMPLES_TAB,
  apiVariable: 'sampleOverview',
  fileName: 'tableDownload',
  defaultFullTableDownload: false,
};

export const GET_FILES_TAB = gql`
query fileOverview($file_ids: [String], $offset: Int = 0, $first: Int = 10, $order_by:String ="file_name"){
  fileOverview(file_ids: $file_ids, offset: $offset,first: $first, order_by: $order_by) {
    file_name
    file_category
    file_description
    file_type
    file_size
    study_id
    participant_id
    sample_id
    file_id
    md5sum
  }
}
`;

export const customFilesTabDownloadCSV = {
  keysToInclude: ['file_name', 'file_category', 'file_description', 'file_type', 'file_size', 'study_id', 'participant_id', 'sample_id', 'file_id', 'md5sum'],
  header: ['File Name', 'File Category', 'File Description', 'File Type', 'File Size', 'Study ID', 'Participant ID', 'Sample ID', 'GUID', 'MD5sum'],
  query: GET_FILES_TAB,
  apiVariable: 'fileOverview',
  fileName: 'tableDownload',
  defaultFullTableDownload: false,
};

export const GET_DIAGNOSIS_TAB = gql`
query diagnosisOverview($diagnosis_id: [String], $offset: Int = 0, $first: Int = 1000, $order_by:String =""){
  diagnosisOverview(diagnosis_id: $diagnosis_id, offset: $offset,first: $first, order_by: $order_by) {
    diagnosis_id
    participant_id
    phs_accession
    diagnosis_icd_o
    disease_phase
    anatomic_site
    age_at_diagnosis
    vital_status
  }
}
`;

export const customDiagnosisTabDownloadCSV = {
  keysToInclude: ['participant_id', 'phs_accession', 'diagnosis_icd_o', 'disease_phase', 'anatomic_site', 'age_at_diagnosis', 'vital_status'],
  header: ['Participant ID', 'Study Accession', 'ICD-O Morphology', 'Disease Phase', 'Anatomic Site', 'Age at Diagnosis (days)', 'Vital Status'],
  query: GET_DIAGNOSIS_TAB,
  apiVariable: 'diagnosisOverview',
  fileName: 'tableDownload',
  defaultFullTableDownload: false,
};

export const GET_STUDY_TAB = gql`
query studyOverview($study_id: [String], $offset: Int = 0, $first: Int = 1000, $order_by:String =""){
  studyOverview(study_id: $participant_id, offset: $offset,first: $first, order_by: $order_by) {
    participant_id
    phs_accession
    diagnosis_icd_o
    disease_phase
    anatomic_site
    age_at_diagnosis
    vital_status
  }
}
`;

export const customStudyTabDownloadCSV = {
  keysToInclude: ['study_id', 'pubmed_id', 'grant_id', 'phs_accession', 'study_short_title', 'personnel_name', 'number_of_participants', 'diagnosis', 'number_of_samples', 'anatomic_site', 'number_of_files', 'file_type'],
  header: ['Study ID', 'PubMed ID', 'Grant ID', 'Study Accession', 'Study Short Title', 'Principle Investigator(s)', 'Number of Participants', 'Diagnosis', 'Number of Samples', 'Diagnosis Anatomic Site', 'Number of Files', 'File Type'],
  query: GET_STUDY_TAB,
  apiVariable: 'studyOverview',
  fileName: 'tableDownload',
  defaultFullTableDownload: false,
};

export const GET_TREATMENT_TAB = gql`
query studyOverview($study_id: [String], $offset: Int = 0, $first: Int = 1000, $order_by:String =""){
  studyOverview(study_id: $participant_id, offset: $offset,first: $first, order_by: $order_by) {
    participant_id
    phs_accession
    diagnosis_icd_o
    disease_phase
    anatomic_site
    age_at_diagnosis
    vital_status
  }
}
`;

export const customTreatmentTabDownloadCSV = {
  keysToInclude: ['participant_id', 'treatment_id', 'age_at_treatment_start', 'ge_at_treatment_end', 'treatment_type', 'treatment_agent', 'study_accession'],
  header: ['Participant ID', 'Treatment ID', 'Age At Treatment Start', 'Age At Treatment End', 'Treatment Type', 'Treatment Agent', 'Study Accession'],
  query: GET_STUDY_TAB,
  apiVariable: 'studyOverview',
  fileName: 'tableDownload',
  defaultFullTableDownload: false,
};

export const GET_TREATMENT_RESPONSE_TAB = gql`
query studyOverview($study_id: [String], $offset: Int = 0, $first: Int = 1000, $order_by:String =""){
  studyOverview(study_id: $participant_id, offset: $offset,first: $first, order_by: $order_by) {
    participant_id
    phs_accession
    diagnosis_icd_o
    disease_phase
    anatomic_site
    age_at_diagnosis
    vital_status
  }
}
`;

export const customTreatmentResponseTabDownloadCSV = {
  keysToInclude: ['participant_id', 'treatment_response_id', 'response', 'age_at_response', 'response_catagory', 'response_system', 'study_accession'],
  header: ['Participant ID', 'Treatment Response ID', 'Response', 'Age At Response', 'Response Catagory', 'Response System', 'Study Accession'],
  query: GET_TREATMENT_RESPONSE_TAB,
  apiVariable: 'TreatmentResponseOverview',
  fileName: 'tableDownload',
  defaultFullTableDownload: false,
};

export const MY_CART = gql`
query filesInList($file_ids: [String], $offset: Int = 0, $first: Int = 1000, $order_by:String ="") {
    filesInList(file_ids: $file_ids, offset: $offset,first: $first, order_by: $order_by) {
        study_code
        subject_id
        file_name
        file_type
        association
        file_description
        file_format
        file_size
        file_id
        md5sum
    }
}
`;

export const customMyFilesTabDownloadCSV = {
  keysToInclude: ['file_name', 'file_type', 'association', 'file_description', 'file_format', 'file_size', 'subject_id', 'study_code'],
  header: ['File Name', 'File Type', 'Association', 'Description', 'File Format', 'Size', 'Case Id', 'Study Code'],
  query: MY_CART,
  apiVariable: 'filesInList',
  fileName: 'BENTO File Manifest',
  defaultFullTableDownload: false,
};
