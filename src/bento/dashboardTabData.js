import gql from 'graphql-tag';
import { customCasesTabDownloadCSV, customFilesTabDownloadCSV } from './tableDownloadCSV';

// --------------- Tooltip configuration --------------
export const tooltipContent = {
  icon: 'https://raw.githubusercontent.com/google/material-design-icons/master/src/action/help/materialicons/24px.svg',
  alt: 'tooltipIcon',
  0: 'Click button to add selected files associated with the selected case(s).',
  1: 'Click button to add selected files associated with the selected sample(s).',
  2: 'Click button to add selected files.',
};

// --------------- Dahboard Table external link configuration --------------
// Ideal size for externalLinkIcon is 16x16 px
export const externalLinkIcon = {
  src: 'https://raw.githubusercontent.com/CBIIT/datacommons-assets/main/bento/images/icons/svgs/externalLinkIcon.svg',
  alt: 'External link icon',
};

// --------------- Tabs Table configuration --------------
export const tabContainers = [
  {
    name: 'Cases',
    dataField: 'dataCase',
    api: 'GET_CASES_OVERVIEW_QUERY',
    paginationAPIField: 'subjectOverviewPaged',
    paginationAPIFieldDesc: 'subjectOverviewPagedDesc',
    count: 'numberOfSubjects',
    dataKey: 'pcdc_subject_id',
    defaultSortField: 'pcdc_subject_id',
    defaultSortDirection: 'asc',
    buttonText: 'Add Selected Files',
    saveButtonDefaultStyle: {
      color: '#fff',
      backgroundColor: '#09A175',
      opacity: '1',
      border: '0px',
      cursor: 'pointer',
    },
    ActiveSaveButtonDefaultStyle: {
      cursor: 'pointer',
      opacity: 'unset',
      border: 'unset',
    },
    DeactiveSaveButtonDefaultStyle: {
      opacity: '0.3',
      cursor: 'auto',
    },
    columns: [
      {
        dataField: 'pcdc_subject_id',
        header: 'Case ID',
        sort: 'asc',
        link: '/case/{pcdc_subject_id}',
        primary: true,
        display: true,
      },
      {
        dataField: 'cancer',
        header: 'Cancer',
        sort: 'asc',
        display: true,
      },
      {
        dataField: 'sex',
        header: 'Sex',
        sort: 'asc',
        display: true,
      },
      {
        dataField: 'race',
        header: 'Race',
        sort: 'asc',
        display: true,
      },
      {
        dataField: 'disease_phase',
        header: 'Disease Phase',
        sort: 'asc',
        display: true,
      },
      {
        dataField: 'treatment_arm',
        header: 'Treatment Arm',
        sort: 'asc',
        display: true,
      },
      {
        dataField: 'disease_site',
        header: 'Disease Site',
        sort: 'asc',
        display: true,
      },
      {
        dataField: 'data_contributor_id',
        header: 'Data Contributor',
        sort: 'asc',
        display: true,
      },
      {
        dataField: 'ae_grade',
        header: 'Adverse Events Grade',
        sort: 'asc',
        display: true,
      },
      {
        dataField: 'ae_outcome',
        header: 'Adverse Events Outcome',
        sort: 'asc',
        display: true,
      },
      {
        dataField: 'study_id',
        header: 'Study Id',
        sort: 'asc',
        link: '/study/{study_id}',
        display: true,
      },
    ],
    id: 'case_tab',
    onRowsSelect: 'type1',
    disableRowSelection: 'type1',
    tableID: 'case_tab_table',
    selectableRows: true,
    tableDownloadCSV: customCasesTabDownloadCSV,
    tabIndex: '0',
    viewColumns: true,
    downloadFileName: 'Bento_Dashboard_cases_download',
    headerPagination: true,
    footerPagination: true,
  },
  {
    name: 'Files',
    dataField: 'dataFile',
    api: 'GET_FILES_OVERVIEW_QUERY',
    paginationAPIField: 'fileOverview',
    paginationAPIFieldDesc: 'fileOverviewDesc',
    defaultSortField: 'file_name',
    defaultSortDirection: 'asc',
    count: 'numberOfFiles',
    buttonText: 'Add Selected Files',
    dataKey: 'file_name',
    saveButtonDefaultStyle: {
      color: '#fff',
      backgroundColor: '#DC2FDA',
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
        dataField: 'file_name',
        header: 'File Name',
        sort: 'asc',
        primary: true,
        display: true,
      },
      {
        dataField: 'file_type',
        header: 'File Type',
        sort: 'asc',
        primary: true,
        display: true,
      },
      {
        dataField: 'uuid',
        header: 'File ID',
        sort: 'asc',
        display: false,
      },
      {
        dataField: 'file_description',
        header: 'Description',
        sort: 'asc',
        display: true,
      },
      {
        dataField: 'file_format',
        header: 'File Format',
        sort: 'asc',
        display: true,
      },
      {
        dataField: 'file_size',
        header: 'Size',
        sort: 'asc',
        display: true,
        formatBytes: true,
      },
      {
        dataField: '', // This need to left empty if no data need to be displayed before file download icon
        header: 'Access',
        sort: 'asc',
        display: true,
        downloadDocument: true, // To indicate that column is document donwload
        documentDownloadProps: {
          // Max file size needs to bin Bytes to seperate two support file preview and download
          maxFileSize: 1073741824,
          // Tool top text for file download
          toolTipTextFileDownload: 'Download a copy of this file',
          // Tool top text for file preview
          toolTipTextFilePreview: 'Because of its size and/or format, this file is unavailable for download and must be accessed via the My Files workflow',
          // datafield where file file column exists in the table
          fileSizeColumn: 'file_size',
          // datafield where file file id exists in the table which is used to get file location
          fileLocationColumn: 'uuid',
          // file download icon
          iconFileDownload: 'https://raw.githubusercontent.com/CBIIT/datacommons-assets/main/bento/images/icons/svgs/DocumentDownloadPDF.svg',
          // file preview ico
          iconFilePreview: 'https://raw.githubusercontent.com/CBIIT/datacommons-assets/main/bento/images/icons/svgs/DocumentDownloadCloud.svg',
        },
      },
      {
        dataField: 'pcdc_subject_id',
        header: 'Case ID',
        sort: 'asc',
        link: '/case/{pcdc_subject_id}',
        display: true,
      },
    ],
    id: 'file_tab',
    onRowsSelect: 'type2',
    disableRowSelection: 'type3',
    tableID: 'file_tab_table',
    selectableRows: true,
    tabIndex: '2',
    viewColumns: true,
    tableDownloadCSV: customFilesTabDownloadCSV,
    downloadFileName: 'Bento_Dashboard_cases_download',
    headerPagination: true,
    footerPagination: true,
  },
];

// --------------- Tabs Header Data configuration --------------
export const tabs = [
  {
    id: 'case_tab',
    title: 'Cases',
    dataField: 'dataCase',
    count: 'numberOfSubjects',
  },
  {
    id: 'file_tab',
    title: 'Files',
    dataField: 'dataFile',
    count: 'numberOfFiles',
  },
];

// --------------- Tabs Header Style configuration --------------
export const tabIndex = [
  {
    title: 'Cases',
    primaryColor: '#D6F2EA',
    secondaryColor: '#FFDFB8',
    selectedColor: '#10A075',
  },
  {
    title: 'Files',
    primaryColor: '#F7D7F7',
    secondaryColor: '#86D6F0',
    selectedColor: '#C92EC7',
  },
];

export const DASHBOARD_QUERY = gql`{
    numOfPrograms
    num_of_studies
    numberOfSubjects
    numberOfFiles
#    subjectCountByTreatmentArm {
#        group
#        subjects
#    }
    subjectCountByProgram{
        group
        subjects
    }
    subjectCountByStudy{
        group
        subjects
    }
    subjectCountByDataContributorId{
        group
        subjects
    }
    subjectCountByDiseasePhase{
        group
        subjects
    }
    subjectCountBySex{
        group
        subjects
    }
    subjectCountByRace{
        group
        subjects
    }
#    subjectCountByCourse{
#        group
#        subjects
#    }
    subjectCountByDiseaseSite{
        group
        subjects
    }
    subjectCountByAEGrade{
        group
        subjects
    }
    subjectCountByAEOutcome{
        group
        subjects
    }
    subjectOverviewPaged(first: 10) {
        pcdc_subject_id
        race
        disease_phase
        treatment_arm
        disease_site
        data_contributor_id
        ae_grade
        ae_outcome
        study_id
        files{
            file_id
        }
    }
}`;

export const FILTER_GROUP_QUERY = gql`
    query groupCounts($subject_ids: [String]){
        searchSubjects(pcdc_subject_id: $subject_ids) {
            numOfPrograms
            numberOfSubjects
            num_of_studies
            numberOfFiles
            fileIds
            subjectIds
        }
#        subjectCountByTreatmentArm (subject_id: $subject_ids){
#            group
#            subjects
#        }
        subjectCountByProgram (subject_ids: $subject_ids){
            group
            subjects
        }
        subjectCountByStudy (subject_ids: $subject_ids){
            group
            subjects
        }
        subjectCountByDataContributorId (subject_ids: $subject_ids){
            group
            subjects
        }
        subjectCountByDiseasePhase (subject_ids: $subject_ids){
            group
            subjects
        }
        subjectCountBySex (subject_ids: $subject_ids){
            group
            subjects
        }
        subjectCountByRace (subject_ids: $subject_ids){
            group
            subjects
        }
        subjectCountByCourse(subject_ids: $subject_ids) {
            group
            subjects
        }
        subjectCountByDiseaseSite(subject_ids: $subject_ids) {
            group
            subjects
        }
        subjectCountByAEGrade(subject_ids: $subject_ids) {
            group
            subjects
        }
        subjectCountByAEOutcome(subject_ids: $subject_ids) {
            group
            subjects
        }
    }
`;

export const FILTER_QUERY = gql`
    query search(
        $pcdc_subject_id: [String],
        $data_contributor_id: [String],
        $study_id: [String],
        $treatment_arm: [String],
        $race: [String]
        $sex: [String],
        $disease_phase: [String],
        $ae_outcome: [String],
        $ae_grade: [String],
        $disease_site: [String],
        $fileType: [String],
        $cancer: [String]
    ) {
        searchSubjects(
            pcdc_subject_id: $pcdc_subject_id
            data_contributor_id: $data_contributor_id
            study_id: $study_id
            treatment_arm: $treatment_arm
            race: $race
            sex: $sex
            disease_phase: $disease_phase
            ae_outcome: $ae_outcome
            ae_grade: $ae_grade
            disease_site: $disease_site
            fileType: $fileType
            cancer: $cancer
        ) {
            numOfPrograms
            numberOfSubjects
            num_of_studies
            numberOfFiles
            fileIds
            subjectIds
        }
        
        filterSubjectCountByTreatmentArm(
            pcdc_subject_id: $pcdc_subject_id
            data_contributor_id: $data_contributor_id
            study_id: $study_id
            treatment_arm: $treatment_arm
            race: $race
            sex: $sex
            disease_phase: $disease_phase
            ae_outcome: $ae_outcome
            ae_grade: $ae_grade
            disease_site: $disease_site
            fileType: $fileType
            cancer: $cancer
        ) {
            group
            subjects
        }
        
        filterSubjectCountByDataContributor(
            pcdc_subject_id: $pcdc_subject_id
            data_contributor_id: $data_contributor_id
            study_id: $study_id
            treatment_arm: $treatment_arm
            race: $race
            sex: $sex
            disease_phase: $disease_phase
            ae_outcome: $ae_outcome
            ae_grade: $ae_grade
            disease_site: $disease_site
            fileType: $fileType
            cancer: $cancer
        ) {
            group
            subjects
        }
        
        filterSubjectCountByStudy(
            pcdc_subject_id: $pcdc_subject_id
            data_contributor_id: $data_contributor_id
            study_id: $study_id
            treatment_arm: $treatment_arm
            race: $race
            sex: $sex
            disease_phase: $disease_phase
            ae_outcome: $ae_outcome
            ae_grade: $ae_grade
            disease_site: $disease_site
            fileType: $fileType
            cancer: $cancer
        ) {
            group
            subjects
        }
        
        filterSubjectCountByTreatmentArm(
            pcdc_subject_id: $pcdc_subject_id
            data_contributor_id: $data_contributor_id
            study_id: $study_id
            treatment_arm: $treatment_arm
            race: $race
            sex: $sex
            disease_phase: $disease_phase
            ae_outcome: $ae_outcome
            ae_grade: $ae_grade
            disease_site: $disease_site
            fileType: $fileType
            cancer: $cancer
        ) {
            group
            subjects
        }
        
        filterSubjectCountByRace(
            pcdc_subject_id: $pcdc_subject_id
            data_contributor_id: $data_contributor_id
            study_id: $study_id
            treatment_arm: $treatment_arm
            race: $race
            sex: $sex
            disease_phase: $disease_phase
            ae_outcome: $ae_outcome
            ae_grade: $ae_grade
            disease_site: $disease_site
            fileType: $fileType
            cancer: $cancer
        ) {
            group
            subjects
        }
        
        filterSubjectCountBySex(
            pcdc_subject_id: $pcdc_subject_id
            data_contributor_id: $data_contributor_id
            study_id: $study_id
            sex: $sex
            treatment_arm: $treatment_arm
            race: $race
            disease_phase: $disease_phase
            ae_outcome: $ae_outcome
            ae_grade: $ae_grade
            disease_site: $disease_site
            fileType: $fileType
            cancer: $cancer
        ) {
            group
            subjects
        }
        
        filterSubjectCountByAEOutcome(
            pcdc_subject_id: $pcdc_subject_id
            data_contributor_id: $data_contributor_id
            study_id: $study_id
            treatment_arm: $treatment_arm
            race: $race
            sex: $sex
            disease_phase: $disease_phase
            ae_outcome: $ae_outcome
            ae_grade: $ae_grade
            disease_site: $disease_site
            fileType: $fileType
            cancer: $cancer
        ) {
            group
            subjects
        }
        
        filterSubjectCountByAEGrade(
            pcdc_subject_id: $pcdc_subject_id
            data_contributor_id: $data_contributor_id
            study_id: $study_id
            treatment_arm: $treatment_arm
            race: $race
            sex: $sex
            disease_phase: $disease_phase
            ae_outcome: $ae_outcome
            ae_grade: $ae_grade
            disease_site: $disease_site
            fileType: $fileType
            cancer: $cancer
        ) {
            group
            subjects
        }
        
        filterSubjectCountByDiseaseSite(
            pcdc_subject_id: $pcdc_subject_id
            data_contributor_id: $data_contributor_id
            study_id: $study_id
            treatment_arm: $treatment_arm
            race: $race
            sex: $sex
            disease_phase: $disease_phase
            ae_outcome: $ae_outcome
            ae_grade: $ae_grade
            disease_site: $disease_site
            fileType: $fileType
            cancer: $cancer
        ) {
            group
            subjects
        }
        
        filterSubjectCountByFileType(
            pcdc_subject_id: $pcdc_subject_id
            data_contributor_id: $data_contributor_id
            study_id: $study_id
            treatment_arm: $treatment_arm
            race: $race
            sex: $sex
            disease_phase: $disease_phase
            ae_outcome: $ae_outcome
            ae_grade: $ae_grade
            disease_site: $disease_site
            fileType: $fileType
            cancer: $cancer
        ) {
            group
            subjects
        }
        
        filterSubjectCountByProgram(
            pcdc_subject_id: $pcdc_subject_id
            data_contributor_id: $data_contributor_id
            study_id: $study_id
            treatment_arm: $treatment_arm
            race: $race
            sex: $sex
            disease_phase: $disease_phase
            ae_outcome: $ae_outcome
            ae_grade: $ae_grade
            disease_site: $disease_site
            fileType: $fileType
            cancer: $cancer
        ) {
            group
            subjects
        }
    }
`;

// --------------- GraphQL query - Retrieve files tab details --------------
export const GET_FILES_OVERVIEW_QUERY = gql`
    query fileOverview($file_ids: [String], $offset: Int = 0, $first: Int = 10, $order_by:String ="file_name"){
        fileOverview(file_ids: $file_ids, offset: $offset,first: $first, order_by: $order_by) {
            uuid
            file_name
            file_description
            file_type
            file_format
            file_size
            program_id
            subject_id
            study_id
            file_status
        }
    }
`;

export const GET_FILES_OVERVIEW_DESC_QUERY = gql`
    query fileOverviewDesc($file_ids: [String], $offset: Int = 0, $first: Int = 10, $order_by:String ="file_name"){
        fileOverviewDesc(file_ids: $file_ids, offset: $offset,first: $first, order_by: $order_by) {
            uuid
            file_name
            file_description
            file_type
            file_format
            file_size
            program_id
            subject_id
            study_id
            file_status
        }
    }
`;
// todo: filterSUbjectCountBy
//   data_contributor_id: [String] = [],
//   study_id: [String] = [],
//   treatment_arm: [String] = [],
//   race: [String] = [],
//   sex: [String] = [],
//   disease_phase: [String] = [],
//   ae_outcome: [String] = [],
//   ae_grade: [String] = [],
//   disease_site: [String] = [],
//   fileType: [String] = [],
//   cancer: [String] = []
//
// todo: SubjectOverviewPaged
// pcdc_subject_id: String
// race: String
// sex: String
// disease_phase: String
// treatment_arm: String
// disease_site: String
// data_contributor_id: String
// ae_grade: String
// ae_outcome: String
// study_id: String
// program_id: String
// cancer: String
// files: [FileId]

// --------------- GraphQL query - Retrieve Cases tab details --------------
export const GET_CASES_OVERVIEW_QUERY = gql`
    query subjectOverViewPaged($subject_ids: [String], $offset: Int = 0, $first: Int = 10, $order_by:String =""){
        subjectOverviewPaged(subject_ids: $subject_ids, first: $first, offset: $offset, order_by: $order_by) {
            pcdc_subject_id
            race
            sex
            disease_phase
            treatment_arm
            disease_site
            data_contributor_id
            ae_grade
            ae_outcome
            study_id
            files{
                file_id
            }
        }
    }
`;

// --------------- GraphQL query - Retrieve sample tab details --------------
export const GET_CASES_OVERVIEW_DESC_QUERY = gql`
    query subjectOverViewPaged($subject_ids: [String],
    $offset: Int = 0, $first: Int = 10, $order_by:String =""){
        subjectOverviewPagedDesc(subject_ids: $subject_ids,
        first: $first, offset: $offset, order_by: $order_by) {
            pcdc_subject_id
            race
            sex
            disease_phase
            treatment_arm
            disease_site
            data_contributor_id
            ae_grade
            ae_outcome
            study_id
            files{
                file_id
            }
        }
    }
`;

export const GET_ALL_FILEIDS_CASESTAB_FOR_SELECT_ALL = gql`
    query subjectOverViewPaged($subject_ids: [String], $first: Int = 10000000){
        subjectOverviewPaged(subject_ids: $subject_ids, first: $first) {
            files {
                file_id
            }
        }
    }
`;

export const GET_ALL_FILEIDS_FILESTAB_FOR_SELECT_ALL = gql`
    query fileOverview($file_ids: [String], $offset: Int = 0, $first: Int = 10, $order_by: String = "file_name") {
        fileOverview(file_ids: $file_ids, offset: $offset, first: $first, order_by: $order_by) {
            uuid
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
            uuid
        }
    }`;
