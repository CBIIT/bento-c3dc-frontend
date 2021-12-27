import gql from 'graphql-tag';

// --------------- Dashboard Sidebar Filters configuration --------------
export const facetSearchData = [
  {
    label: 'Race',
    field: 'group',
    api: 'subjectCountByRace',
    apiForFiltering: 'filterSubjectCountByRace',
    datafield: 'race',
    section: 'Filter By Cases',
    show: true,
  },
  {
    label: 'Disease Phase',
    field: 'group',
    api: 'subjectCountByDiseasePhase',
    apiForFiltering: 'filterSubjectCountByDiseasePhase',
    datafield: 'disease_phase',
    section: 'Filter By Cases',
    show: true,
  },
  {
    label: 'Sites of Disease',
    field: 'group',
    api: 'subjectCountByDiseaseSite',
    apiForFiltering: 'filterSubjectCountByDiseaseSite',
    datafield: 'disease_site',
    section: 'Filter By Cases',
    show: true,
  },
  {
    label: 'Program',
    field: 'group',
    api: 'subjectCountByProgram',
    apiForFiltering: 'filterSubjectCountByProgram',
    datafield: 'program_id',
    section: 'Filter By Cases',
    show: true,
  },
  {
    label: 'Study',
    field: 'group',
    api: 'subjectCountByStudy',
    apiForFiltering: 'filterSubjectCountByStudy',
    datafield: 'study_id',
    section: 'Filter By Cases',
    show: true,
  },
  {
    label: 'Data Contributor',
    field: 'group',
    api: 'subjectCountByDataContributorId',
    apiForFiltering: 'filterSubjectCountByDataContributor',
    datafield: 'data_contributor_id',
    section: 'Filter By Cases',
    show: true,
  },
  {
    label: 'Disease Stage at Entry',
    field: 'group',
    api: 'subjectCountBySex',
    apiForFiltering: 'filterSubjectCountBySex',
    datafield: 'sex',
    section: 'Filter By Cases',
    show: true,
  },
  {
    label: 'Course',
    field: 'group',
    api: 'subjectCountByCourse',
    apiForFiltering: 'filterSubjectCountByCourse',
    datafield: 'course',
    section: 'Filter By Cases',
    show: true,
  },
  {
    label: 'Adverse Event Grade',
    field: 'group',
    api: 'subjectCountByAEGrade',
    apiForFiltering: 'filterSubjectCountByAEGrade',
    datafield: 'ae_grade',
    section: 'Filter By Cases',
    show: true,
  },
  {
    label: 'Adverse Event Outcome',
    field: 'group',
    api: 'subjectCountByAEOutcome',
    apiForFiltering: 'filterSubjectCountByAEOutcome',
    datafield: 'ae_outcome',
    section: 'Filter By Cases',
    show: true,
  },
];

// A maximum of 12 facetSearchData are allowed
/* export const facetSearchData = [

  {
    label: 'System Organ Class',
    field: 'group',
    api: 'subjectCountBySystemOrganClass',
    apiForFiltering: 'filterSubjectCountBySystemOrganClass',
    datafield: 'systemOrganClass',
    section: 'Filter By Cases',
    show: true,
  },
  {
    label: 'Serious',
    field: 'group',
    api: 'subjectCountBySerious',
    apiForFiltering: 'filterSubjectCountBySerious',
    datafield: 'serious',
    section: 'Filter By Cases',
    show: true,
  },
  {
    label: 'Outcome',
    field: 'group',
    api: 'subjectCountByOutcome',
    apiForFiltering: 'filterSubjectCountByOutcome',
    datafield: 'outcome',
    section: 'Filter By Cases',
    show: true,
  },
  {
    label: 'Somatic Pathogenicity',
    field: 'group',
    api: 'subjectCountBySomaticPathogenicity',
    apiForFiltering: 'filterSubjectCountBySomaticPathogenicity',
    datafield: 'somaticPathogenicity',
    section: 'Filter By Cases',
    show: true,
  },
  {
    label: 'Germline Pathogenicity',
    field: 'group',
    api: 'subjectCountByGermlinePathogenicity',
    apiForFiltering: 'filterSubjectCountByGermlinePathogenicity',
    datafield: 'germlinePathogenicity',
    section: 'Filter By Cases',
    show: true,
  },
  {
    label: 'File Type',
    field: 'group',
    api: 'subjectCountByFileType',
    apiForFiltering: 'filterSubjectCountByFileType',
    datafield: 'fileType',
    section: 'Filter By Files',
    show: true,
  },
]; */

// --------------- Dashboard Sidebar Sections styling --------------
export const facetSectionVariables = {
  'Filter By Cases': {
    color: '#10A075',
    checkBoxColorsOne: '#E8F7DC',
    checkBoxColorsTwo: '#F5FDEE',
    height: '5px',
    isExpanded: false,
  },
  'Filter By Samples': {
    color: '#10BEFF',
    checkBoxColorsOne: '#C9EBF7',
    checkBoxColorsTwo: '#E8F8FE',
    height: '5px',
    isExpanded: false,
  },
  'Filter By Files': {
    color: '#E636E4',
    checkBoxColorsOne: '#FBE3FB',
    checkBoxColorsTwo: '#FFF2FF',
    height: '5px',
    isExpanded: false,
  },
};

// --------------- Default Dashboard Sidebar Sections styling --------------
export const defaultFacetSectionVariables = {
  color: '#000000',
  checkBoxColorsOne: '#E8F7DC',
  checkBoxColorsTwo: '#F5FDEE',
  height: '5px',
  isExpanded: false,
};

// --------------- Dashboard Widgets configuration --------------
// A maximum of 6 widgets are allowed
export const widgetsData = [
  // {
  //   type: 'donut',
  //   label: 'Treatment Arm',
  //   dataName: 'subjectCountByTreatmentArm',
  //   datatable_field: 'treatment_arm',
  //   titleText: 'Cases',
  //   show: true,
  // },
  {
    type: 'donut',
    label: 'Adverse Events Outcome',
    dataName: 'subjectCountByAEOutcome',
    datatable_field: 'ae_outcome',
    titleText: 'Cases',
    show: true,
  },
  {
    type: 'donut',
    label: 'Adverse Events Grade',
    dataName: 'subjectCountByAEGrade',
    datatable_field: 'ae_grade',
    titleText: 'Cases',
    show: true,
  },
  {
    type: 'donut',
    label: 'Study',
    dataName: 'subjectCountByStudy',
    datatable_field: 'study_id',
    titleText: 'Cases',
    show: true,
  },
  {
    type: 'donut',
    label: 'Race',
    dataName: 'subjectCountByRace',
    datatable_field: 'race',
    titleText: 'Cases',
    show: true,
  },
  {
    type: 'donut',
    label: 'Disease Phase',
    dataName: 'subjectCountByDiseasePhase',
    datatable_field: 'disease_phase',
    titleText: 'Cases',
    show: true,
  },
  {
    type: 'donut',
    label: 'Sex',
    dataName: 'subjectCountBySex',
    datatable_field: 'sex',
    titleText: 'Cases',
    show: true,
  },
  {
    type: 'donut',
    label: 'Course',
    dataName: 'subjectCountByCourse',
    datatable_field: 'course',
    titleText: 'Cases',
    show: true,
  },
  {
    type: 'donut',
    label: 'Disease Site',
    dataName: 'subjectCountByDiseaseSite',
    datatable_field: 'disease_site',
    titleText: 'Cases',
    show: true,
  },
  {
    type: 'donut',
    label: 'Contributor ID',
    dataName: 'subjectCountByDataContributorId',
    datatable_field: 'data_contributor_id',
    titleText: 'Cases',
    show: true,
  },
];

// --------------- Dahboard Table external link configuration --------------
// Ideal size for externalLinkIcon is 16x16 px
export const externalLinkIcon = {
  src: 'https://raw.githubusercontent.com/CBIIT/datacommons-assets/main/bento/images/icons/svgs/externalLinkIcon.svg',
  alt: 'External link icon',
};

// --------------- Facet resetIcon link configuration --------------
// Ideal size for resetIcon is 16x16 px
export const resetIcon = {
  src: 'https://raw.githubusercontent.com/CBIIT/datacommons-assets/main/bento/images/icons/svgs/Clear-icon.svg',
  alt: 'Reset icon',
  size: '12 px',
};
export const resetIconFilter = {
  src: 'https://raw.githubusercontent.com/CBIIT/datacommons-assets/main/bento/images/icons/svgs/Clear-icon.svg',
  alt: 'Reset icon',
  size: '12 px',
};

// --------------- Dashboard Table configuration --------------
export const dashboardTable = {
  tableTitle: 'Cases',
  tableData: [
    // A maximum of 10 columns (tableData) are allowed
    {
      dataField: 'pcdc_subject_id',
      header: 'Case ID',
      sort: 'asc',
      link: '/case/{pcdc_subject_id}',
      primary: true,
      display: true,
    },
    {
      dataField: 'race',
      header: 'Race',
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
      dataField: 'disease_phase',
      header: 'Disease Phase',
      sort: 'asc',
      display: true,
    },
    {
      dataField: 'cancer',
      header: 'Cancer',
      sort: 'asc',
      link: '/program/{program_id}',
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
      header: 'Study ID',
      sort: 'asc',
      display: true,
    },
  ],
};

// --------------- Sorting related labels configuration --------------
export const sortLabels = {
  sortAlphabetically: 'Sort alphabetically',
  sortByCount: 'Sort by counts',
  showMore: '...expand to see all selections',
};

export const showCheckboxCount = 5;

// --------------- Dashboard Query configuration --------------
export const GET_DASHBOARD_DATA_QUERY = gql`{
    numberOfPrograms
    numberOfSubjects
    numberOfFiles
    subjectCountByProgram {
        group
        subjects
    }
    subjectCountByStudy {
        group
        subjects
    }
    subjectCountByDataContributorId{
        group
        subjects
    }
    subjectCountByDiseasePhase {
        group
        subjects
    }
    subjectCountBySex {
        group
        subjects
    }
    subjectCountByRace {
        group
        subjects
    }
    subjectCountByCourse {
        group
        subjects
    }
    subjectCountByDiseaseSite {
        group
        subjects
    }
    subjectCountByAEGrade{
        group
        subjects
    }
    subjectCountByAEOutcome {
        group
        subjects
    }
    subjectOverViewPaged(first: 100) {
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

// --------------- Dashboard Query configuration --------------
export const GET_DASHBOARD_TABLE_DATA_QUERY = gql`{
    subjectOverViewPaged(first: 1000000) {
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
