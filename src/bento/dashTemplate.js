import { sortType, InputTypes } from '@bento-core/facet-filter';
import clearButton from '../assets/icons/Clear_Icon.svg';
import clearButtonActive from '../assets/icons/Clear_Icon_Active.svg';
import clearButtonActiveHover from '../assets/icons/Clear_Icon_White.svg';

const DEMOGRAPHICS = 'Demographics';
const DIAGNOSIS = 'Diagnosis';
const STUDY = 'Study';
const SURVIVAL = 'Survival';
const GROUP = 'group';

// --------------- Facet resetIcon link configuration --------------
// Ideal size for resetIcon is 16x16 px
export const resetIcon = {
  src: clearButton,
  srcActive: clearButtonActive,
  srcActiveHover: clearButtonActiveHover,
  alt: 'Reset icon',
  size: '12px',
};

export const sectionLabel = {
  Datacategory: "Data Category",
};

// --------------- Dashboard Sidebar Sections styling --------------
export const facetSectionVariables = {
  Demographics: {
    isExpanded: true,
    hasSearch: true,
  },
  Diagnosis: {
    isExpanded: false,
  },
  Study: {
    isExpanded: false,
  },
  Survival: {
    isExpanded: false,
  },
};

  const sliderStyles = {
    colorPrimary: {
      color: '#794900',
    },
    sliderRoot: {
      marginTop: '1px',
      marginLeft: '20px',
      marginRight: 'Auto',
      paddingRight: '20px',
    },
    minValue: {
      fontFamily: 'Nunito',
      fontSize: '15px',
      color: '#000000',
      marginBottom: '0px',
      float: 'left',
      width: '50%',
      display: 'flex',
      textTransform: 'uppercase',
    },
    maxValue: {
      fontFamily: 'Nunito',
      fontSize: '15px',
      color: '#000000',
      float: 'right',
      marginBottom: '0px',
      width: '50%',
      display: 'flex',
      textTransform: 'uppercase',
    },
    rail: {
      borderRadius: 4,
      height: 6,
      background: '#142D64',
    },
    minInputLabel: {
      float: 'left',
      lineHeight: '34px',
      marginRight: '5px',
      fontFamily: 'Montserrat',
      fontSize: '11px',
      fontWeight: 500,
    },
    maxInputLabel: {
      float: 'left',
      lineHeight: '34px',
      marginRight: '5px',
      fontFamily: 'Montserrat',
      fontSize: '11px',
      fontWeight: 500,
    },
    thumb: {
      height: 16,
      width: 16,
      background: '#794900',
    },
    invalidThumb: {
      height: 16,
      width: 16,
      background: '#F44336',
    },
    track: {
      borderRadius: 4,
      height: 6,
      background: '#794900',
      '&~&': {
        background: '#142D64',
      },
    },
    invalidTrack: {
      borderRadius: 4,
      height: 6,
      background: '#F44336',
      '&~&': {
        background: '#142D64',
      },
    },
    upperBound: {
      fontFamily: 'Montserrat',
      fontWeight: 500,
      fontSize: '10px',
      color: '#000000',
      float: 'right',
      marginLeft: 'Auto',
      marginRight: 'Auto',
      marginBottom: '15px',
    },
    lowerBound: {
      fontFamily: 'Montserrat',
      fontWeight: 500,
      fontSize: '10px',
      color: '#000000',
      float: 'left',
      marginLeft: 'Auto',
      marginRight: 'Auto',
      marginBottom: '15px',
    },
    sliderText: {
      color: '#000',
      lineHeight: '120%',
      fontFamily: 'Nunito',
      fontSize: '16px',
      padding: '5px 15px 5px 0px',
      width: '100%',
      textAlign: 'left',
      background: '#F3F9FB',
      marginTop: '10px',
    },
    invalidSliderText: {
      color: '#D32F2F',
      lineHeight: '120%',
      fontFamily: 'Nunito',
      fontSize: '14px',
      padding: '5px 15px 5px 0px',
      width: '100%',
      textAlign: 'right',
      background: '#E57373',
      marginTop: '10px',
    },
    sliderListItem: {
      height: '15px',
    },
    listItemGutters: {
      display: 'flex',
      justifyContent: 'space-between',
      padding: '2px 5px 2px 8px',
    },
    lowerUpperBound: {
      height: '15px',
    },
  }

export const facetsConfig = [
  {
    section: DEMOGRAPHICS,
    label: 'Sex At Birth',
    apiPath: 'participantCountBySexAtBirth',
    apiForFiltering: 'filterParticipantCountBySexAtBirth',
    datafield: 'sex_at_birth',
    field: GROUP,
    type: InputTypes.CHECKBOX,
    sort_type: sortType.ALPHABET,
    show: true,
  },
  {
    section: DEMOGRAPHICS,
    label: 'Race',
    apiPath: 'participantCountByRace',
    apiForFiltering: 'filterParticipantCountByRace',
    datafield: 'race',
    field: GROUP,
    type: InputTypes.CHECKBOX,
    sort_type: sortType.ALPHABET,
    show: true,
  },
  {
    section: DEMOGRAPHICS,
    label: 'Ethnicity',
    apiPath: 'participantCountByEthnicity',
    apiForFiltering: 'filterParticipantCountByEthnicity',
    datafield: 'ethnicity',
    field: GROUP,
    type: InputTypes.CHECKBOX,
    sort_type: sortType.ALPHABET,
    show: true,
  },
  {
    section: DIAGNOSIS,
    label: 'Age at Diagnosis (days)',
    apiPath: 'filterParticipantCountByAgeAtDiagnosis',
    apiForFiltering: 'filterParticipantCountByAgeAtDiagnosis',
    datafield: 'age_at_diagnosis',
    ApiLowerBoundName: 'lowerBound',
    ApiUpperBoundName: 'upperBound',
    show: true,
    slider: true,
    type: InputTypes.SLIDER,
    sort_type: 'none',
    minLowerBound: 0,
    maxUpperBound: 100,
    quantifier: 'Days',
    style: sliderStyles,
  },
  {
    section: DIAGNOSIS,
    label: 'Anatomic Site',
    apiPath: '',
    apiForFiltering: 'filterParticipantCountByAnatomicSite',
    datafield: 'anatomic_site',
    field: GROUP,
    type: InputTypes.CHECKBOX,
    sort_type: sortType.ALPHABET,
    show: true,
  },
   {
    section: DIAGNOSIS,
    label: 'Diagnosis',
    apiPath: '',
    apiForFiltering: 'filterParticipantCountByDiagnosis',
  datafield: 'diagnosis',
    field: GROUP,
     type: InputTypes.CHECKBOX,
   sort_type: sortType.ALPHABET,
    show: true,
   },
   {
    section: DIAGNOSIS,
    label: 'Diagnosis Classification System',
    apiPath: '',
    apiForFiltering: 'filterParticipantCountByDiagnosisClassificationSystem',
    datafield: 'diagnosis_classification_system',
    field: GROUP,
    type: InputTypes.CHECKBOX,
    sort_type: sortType.ALPHABET,
    show: true,
  },
  // {
  //   section: DIAGNOSIS,
  //   label: 'Diagnosis Verification Status',
  //   apiPath: '',
  //   apiForFiltering: 'filterParticipantCountByDiagnosisVerificationStatus',
  //   datafield: 'diagnosis_verification_status',
  //   field: GROUP,
  //   type: InputTypes.CHECKBOX,
  //   sort_type: sortType.ALPHABET,
  //   show: true,
  // },
  {
    section: DIAGNOSIS,
    label: 'Diagnosis Basis',
    apiPath: '',
    apiForFiltering: 'filterParticipantCountByDiagnosisBasis',
    datafield: 'diagnosis_basis',
    field: GROUP,
    type: InputTypes.CHECKBOX,
    sort_type: sortType.ALPHABET,
    show: true,
  },
  {
    section: DIAGNOSIS,
    label: 'Disease Phase',
    apiPath: '',
    apiForFiltering: 'filterParticipantCountByDiseasePhase',
    datafield: 'disease_phase',
    field: GROUP,
    type: InputTypes.CHECKBOX,
    sort_type: sortType.ALPHABET,
    show: true,
  },
  {
    section: SURVIVAL,
    label: 'Last Known Survival Status',
    apiPath: 'participantCountByLastKnownSurvivalStatus',
    apiForFiltering: 'filterParticipantCountByLastKnownSurvivalStatus',
    datafield: 'last_known_survival_status',
    field: GROUP,
    type: InputTypes.CHECKBOX,
    sort_type: sortType.ALPHABET,
    show: true,
  },
  {
    section: SURVIVAL,
    label: 'Age at Last Known Survival Status',
    apiPath: 'filterParticipantCountByAgeAtLastKnownSurvivalStatus',
    apiForFiltering: 'filterParticipantCountByAgeAtLastKnownSurvivalStatus',
    datafield: 'age_at_last_known_survival_status',
    ApiLowerBoundName: 'lowerBound',
    ApiUpperBoundName: 'upperBound',
    show: true,
    slider: true,
    type: InputTypes.SLIDER,
    sort_type: 'none',
    minLowerBound: 0,
    maxUpperBound: 100,
    quantifier: 'Days',
    style: sliderStyles,
  },
  {
    section: SURVIVAL,
    label: 'First Event',
    apiPath: 'participantCountByFirstEvent',
    apiForFiltering: 'filterParticipantCountByFirstEvent',
    datafield: 'first_event',
    field: GROUP,
    type: InputTypes.CHECKBOX,
    sort_type: sortType.ALPHABET,
    show: true,
  },
  {
    section: STUDY,
    label: 'DBGAP ACCESSION',
    apiPath: '',
    apiForFiltering: 'filterParticipantCountByDbgapAccession',
    datafield: 'dbgap_accession',
    field: GROUP,
    type: InputTypes.CHECKBOX,
    sort_type: sortType.ALPHABET,
    show: true,
  },
  {
    section: STUDY,
    label: 'Study Name',
    apiPath: '',
    apiForFiltering: 'filterParticipantCountByStudyName',
    datafield: 'study_name',
    field: GROUP,
    type: InputTypes.CHECKBOX,
    sort_type: sortType.ALPHABET,
    show: true,
  },
  {
    section: STUDY,
    label: 'Acronym',
    apiPath: '',
    apiForFiltering: 'filterParticipantCountByStudyAcronym',
    datafield: 'study_acronym',
    field: GROUP,
    type: InputTypes.CHECKBOX,
    sort_type: sortType.ALPHABET,
    show: true,
  },
];

// --------------- Dashboard Widgets configuration --------------
// Sunburst chart color scheme
export const SUNBURST_COLORS_LEVEL_1 = [
  '#7dc242',
  '#274fa5',
  '#79287c',
  '#f78f48',
  '#057ebd',
];

export const SUNBURST_COLORS_LEVEL_2 = [
  '#057ebd',
  '#f78f48',
  '#79287c',
  '#0e3151',
  '#057ebd',
  '#7dc242',
];

// A maximum of 6 widgets are allowed
// for donuts only the following are required: type, title, dataName
//
// type: 'sunburst' | 'donut'
// title: string
// dataName: string
// datatable_level1_field: string
// datatable_level1_colors: string[]
// datatable_level2_field: string
// datatable_level2_colors: string[]
// sliceTitle: string (optional)
export const widgetConfig = [
  {
    type: 'donut',
    title: 'Race',
    dataName: 'participantCountByRace',
    sliceTitle: 'Participants',
    chartTitleAlignment: 'center'
  },
  {
    type: 'donut',
    title: 'Ethnicity',
    dataName: 'participantCountByEthnicity',
    sliceTitle: 'Participants',
  },
  {
    type: 'bar',
    title: 'Sex at Birth',
    dataName: 'participantCountBySexAtBirth',
    width: '100%',
    height: 210,
  },
  {
    type: 'donut',
    title: 'Diagnosis',
    dataName: 'participantCountByDiagnosis',
    sliceTitle: 'Participants',
  },
  {
    type: 'donut',
    title: 'Anatomic Site',
    dataName: 'participantCountByAnatomicSite',
    sliceTitle: 'Participants',
  },
  {
    type: 'bar',
    title: 'Age at Diagnosis (years)',
    dataName: 'participantCountByAgeAtDiagnosis',
    width: '100%',
    height: 210,
  },
];
