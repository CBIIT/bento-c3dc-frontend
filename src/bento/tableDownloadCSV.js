import gql from 'graphql-tag';

export const GET_CASES_TAB = gql`
query subjectOverViewPaged($subject_ids: [String], $offset: Int = 0, $first: Int = 1000, $order_by:String =""){
    subjectOverviewPaged(subject_ids: $subject_ids, first: $first, offset: $offset, order_by: $order_by) {
      subject_id
      race
      diseaseTerm
      registeringInstitution
      patientSubgroup
      stageAtEntry
      causeOfDeath
      sitesOfDiseaseAtAutopsy
      sourceOfTheLabData
      labTest
      systemOrganClass
      serious
      outcome
      pathogenicity
      germlinePathogenicity
      files{
        file_id
      }
  }
}
`;

export const customCasesTabDownloadCSV = {
  keysToInclude: ['subject_id', 'race', 'diseaseTerm', 'registeringInstitution', 'patientSubgroup', 'stageAtEntry', 'causeOfDeath',
    'sitesOfDiseaseAtAutopsy', 'sourceOfTheLabData', 'labTest'],
  header: ['Case ID', 'Race', 'Disease Term', 'Registering Institution', 'Patient Subgroup', 'Stage at Entry', 'Cause of Death',
    'Sites of Disease at Autopsy', 'Source of The Lab Data', 'Lab Test'],
  query: GET_CASES_TAB,
  apiVariable: 'subjectOverviewPaged',
  fileName: 'GMB_Cases_download',
  defaultFullTableDownload: true,
};

export const GET_FILES_TAB = gql`
query fileOverview($file_ids: [String], $offset: Int = 0, $first: Int = 10, $order_by:String ="file_name"){
  fileOverview(file_ids: $file_ids, offset: $offset,first: $first, order_by: $order_by) {
    file_id
    file_name
    file_description
    file_format
    file_size
    trial_id
    trial_short_name
    arm
    subject_id
  }
}
`;

export const customFilesTabDownloadCSV = {
  keysToInclude: ['file_id', 'file_name', 'file_description', 'file_format', 'file_size', 'trial_id',
    'trial_short_name', 'arm', 'subject_id'],
  header: ['File ID', 'File Name', 'Description', 'File Format', 'Size', 'Trial Id', 'Trial Name', 'Arm', 'Case ID'],
  query: GET_FILES_TAB,
  apiVariable: 'fileOverview',
  fileName: 'GMB_Files_download',
  defaultFullTableDownload: true,
};

export const MY_CART = gql`
query filesInList($file_ids: [String], $offset: Int = 0, $first: Int = 1000, $order_by:String ="") {
    filesInList(file_ids: $file_ids, offset: $offset,first: $first, order_by: $order_by) {
        subject_id
        file_name
        file_type
        file_description
        file_format
        file_size
        file_id
        md5sum
    }
}`;

export const customMyFilesTabDownloadCSV = {
  keysToInclude: ['file_name', 'file_type', 'file_description', 'file_format', 'file_size', 'file_id', 'md5sum'],
  header: ['File Name', 'File Type', 'Description', 'File Format', 'Size', 'Case Id', 'md5sum'],
  query: MY_CART,
  apiVariable: 'filesInList',
  fileName: 'GMB File Manifest',
  defaultFullTableDownload: true,
};
