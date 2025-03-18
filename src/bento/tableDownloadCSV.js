import gql from 'graphql-tag';


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
    dbgap_accession
    diagnosis_icd_o
    disease_phase
    anatomic_site
    age_at_diagnosis
    vital_status
  }
}
`;

export const customDiagnosisTabDownloadCSV = {
  keysToInclude: ['participant_id', 'dbgap_accession', 'diagnosis_icd_o', 'disease_phase', 'anatomic_site', 'age_at_diagnosis', 'vital_status'],
  header: ['Participant ID', 'dbGaP ACCESSION', 'ICD-O Morphology', 'Disease Phase', 'Anatomic Site', 'Age at Diagnosis (days)', 'Vital Status'],
  query: GET_DIAGNOSIS_TAB,
  apiVariable: 'diagnosisOverview',
  fileName: 'tableDownload',
  defaultFullTableDownload: false,
};

export const GET_STUDY_TAB = gql`
query studyOverview($study_id: [String], $offset: Int = 0, $first: Int = 1000, $order_by:String =""){
  studyOverview(study_id: $participant_id, offset: $offset,first: $first, order_by: $order_by) {
    participant_id
    dbgap_accession
    diagnosis_icd_o
    disease_phase
    anatomic_site
    age_at_diagnosis
    vital_status
  }
}
`;

export const customStudyTabDownloadCSV = {
  keysToInclude: ['study_id', 'pubmed_id', 'grant_id', 'dbgap_accession', 'study_name', 'personnel_name', 'number_of_participants', 'diagnosis', 'number_of_samples', 'anatomic_site', 'number_of_files', 'file_type'],
  header: ['Study ID', 'PubMed ID', 'Grant ID', 'dbGaP ACCESSION', 'Study Name', 'Principle Investigator(s)', 'Number of Participants', 'Diagnosis', 'Number of Samples', 'Diagnosis Anatomic Site', 'Number of Files', 'File Type'],
  query: GET_STUDY_TAB,
  apiVariable: 'studyOverview',
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
}`;

export const customMyFilesTabDownloadCSV = {
  keysToInclude: ['file_name', 'file_type', 'association', 'file_description', 'file_format', 'file_size', 'subject_id', 'study_code'],
  header: ['File Name', 'File Type', 'Association', 'Description', 'File Format', 'Size', 'Case ID', 'Study Code'],
  query: MY_CART,
  apiVariable: 'filesInList',
  fileName: 'BENTO File Manifest',
  defaultFullTableDownload: false,
};
