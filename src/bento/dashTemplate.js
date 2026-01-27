import { sortType, InputTypes } from '@bento-core/facet-filter';
import clearButtonSrc from '../assets/icons/Clear_Icon_Faded.svg';
import clearButtonActive from '../assets/icons/Clear_Icon_Filled.svg';
import clearButtonHover from '../assets/icons/Clear_Icon_White.svg';
import questionIcon from '../assets/icons/Question_Icon.svg';

const DEMOGRAPHICS = 'Demographics';
const DIAGNOSIS = 'Diagnosis';
const STUDY = 'Study';
const SURVIVAL = 'Survival';
const GROUP = 'group';
const TREATMENT = 'Treatment';
const TREATMENTRESPONSE = 'Treatmentresponse';
const GENETICANALYSIS = 'Geneticanalysis';

export const FACET_NAMES = {
  DEMOGRAPHICS,
  DIAGNOSIS,
  STUDY,
  SURVIVAL,
  TREATMENT,
  TREATMENTRESPONSE,
  GENETICANALYSIS,
};

// MODIFY THIS ORDER TO CHANGE THE COLOR STYLES
export const FACET_ORDER = [
  STUDY,
  DEMOGRAPHICS,
  DIAGNOSIS,
  GENETICANALYSIS,
  TREATMENT,
  TREATMENTRESPONSE,
  SURVIVAL,
];

//Facet colors generated based on index (modulo the length of the array)
const FACET_COLORS = [
  { facetCategoryColor: '#3388A6', slideOutComponentColor: '#307F9C', zebraStripesColor1: '#EFF3F1', zebraStripesColor2: '#F9FAFA',  queryBarNameBkgdColor: '#98D6EC', queryBarAttrbTextColor: '#307F9C' },
  { facetCategoryColor: '#C78800', slideOutComponentColor: '#9D6C00', zebraStripesColor1: '#EFF3F1', zebraStripesColor2: '#F9FAFA',  queryBarNameBkgdColor: '#FFDA8A', queryBarAttrbTextColor: '#9D6C00' },
  { facetCategoryColor: '#39A28A', slideOutComponentColor: '#2A8470', zebraStripesColor1: '#EFF3F1', zebraStripesColor2: '#F9FAFA',  queryBarNameBkgdColor: '#A2E0D2', queryBarAttrbTextColor: '#2A8470' },
  { facetCategoryColor: '#9852DC', slideOutComponentColor: '#9852DC', zebraStripesColor1: '#EFF3F1', zebraStripesColor2: '#F9FAFA',  queryBarNameBkgdColor: '#CEA3F8', queryBarAttrbTextColor: '#9852DC' },
  { facetCategoryColor: '#006B57', slideOutComponentColor: '#006B57', zebraStripesColor1: '#E0ECEA', zebraStripesColor2: '#E9F5F3',  queryBarNameBkgdColor: '#91B6AF', queryBarAttrbTextColor: '#006B57' },
  { facetCategoryColor: '#862405', slideOutComponentColor: '#862405', zebraStripesColor1: '#FFEDE7', zebraStripesColor2: '#FFF6F3',  queryBarNameBkgdColor: '#DDA0A0', queryBarAttrbTextColor: '#862405' },
];

export const obtainColorFromFacetIndex = (index) => {
  return FACET_COLORS[index % FACET_COLORS.length];
};

export const obtainColorFromSectionName = (sectionName) => {
  return obtainColorFromFacetIndex(FACET_ORDER.indexOf(sectionName));
};

// --------------- Facet resetIcon link configuration --------------
// Ideal size for resetIcon is 16x16 px
export const resetIcon = {
  src: clearButtonSrc,
  srcActive: clearButtonActive,
  srcHover: clearButtonHover,
  alt: 'Reset icon',
  size: '12px',
};

export const sectionLabel = {
  Treatmentresponse: "Treatment Response",
  Geneticanalysis: "Genetic Analysis",
};

// --------------- Dashboard Sidebar Sections styling --------------
export const facetSectionVariables = {
  Study: {
    isExpanded: false,
  },
  Demographics: {
    isExpanded: true,
    hasSearch: true,
  },
  Diagnosis: {
    isExpanded: false,
  },
  Treatment: {
    isExpanded: false,
  },
  Treatmentresponse: {
    isExpanded: false,
  },
  Survival: {
    isExpanded: false,
  },
  Geneticanalysis: {
    isExpanded: false,
  },
};

  const sliderStyles = {
    colorPrimary: {
      color: '#794900',
    },
    colorPrimaryTreatment: {
      color: '#057ebd !important',
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
      fontSize: '11px !important',
      color: '#000000',
      float: 'right',
      marginLeft: 'Auto',
      marginRight: 'Auto',
      marginBottom: '15px',
    },
    lowerBound: {
      fontFamily: 'Montserrat',
      fontWeight: 500,
      fontSize: '11px !important',
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
      fontSize: '16px !important',
      padding: '5px 15px 5px 20px',
      width: '100%',
      textAlign: 'left',
      background: '#F3F9FB',
      marginTop: '10px',
      display: 'flex',
      justifyContent: 'start',
      borderBottom: '1px solid #CCCCCC',
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
      borderBottom: '1px solid #CCCCCC',
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
    inputMinMax: {
      slider_INPUT_MIN: {
        fontFamily: 'Montserrat',
        fontSize: '13px',
        fontWeight: 500,
        color: '#717171',
        background: '#F0F0F0',
        '& input': {
          width: '68px',
          paddingLeft: '2px',
        },
      },
      slider_INPUT_MAX: {
        fontFamily: 'Montserrat',
        fontSize: '13px',
        fontWeight: 500,
        color: '#717171',
        background: '#F0F0F0',
        '& input': {
          width: '68px',
          paddingLeft: '2px',
        },
      },
    },
  }

// Helper function to create section-specific slider styles
const createSliderStylesForSection = (color) => ({
  ...sliderStyles,
  colorPrimary: {
    color: color,
  },
  rail: {
    ...sliderStyles.rail,
    background: '#CECECE',
    opacity: 1,
    top: '11px',
  },
  track: {
    ...sliderStyles.track,
    background: color,
    height: '6px',
    top: '11px',
  },
  thumb: {
    ...sliderStyles.thumb,
    background: color,
  },
  toggleButton: {
    height: 24,
    border: '1px solid #535353', 
    fontFamily: 'Raleway',
    fontWeight: 600,
    fontSize: 11,
    '&:not(:first-of-type)': {
      borderLeft: 'none',
      borderTopLeftRadius: 0,
      borderBottomLeftRadius: 0,
    },
    '&:not(:last-of-type)': {
      borderTopRightRadius: 0,
      borderBottomRightRadius: 0,
    },
  }
});

// Define individual section facet configurations

const studyFacets = [
  {
    section: STUDY,
    label: 'dbGaP ACCESSION',
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
];

const demographicsFacets = [
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
];

const diagnosisFacets = [
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
    style: createSliderStylesForSection(obtainColorFromSectionName(DIAGNOSIS).slideOutComponentColor),
  },
  {
    section: DIAGNOSIS,
    label: 'Anatomic Site',
    apiPath: 'participantCountByAnatomicSite',
    apiForFiltering: 'filterParticipantCountByAnatomicSite',
    datafield: 'anatomic_site',
    field: GROUP,
    type: InputTypes.CHECKBOX,
    sort_type: sortType.ALPHABET,
    show: true,
    search: true,
    searchPlaceholder: 'e.g. Neuroblastoma, NOS',
  },
  {
    section: DIAGNOSIS,
    label: 'Diagnosis',
    apiPath: 'participantCountByDiagnosis',
    apiForFiltering: 'filterParticipantCountByDiagnosis',
    datafield: 'diagnosis',
    field: GROUP,
    type: InputTypes.CHECKBOX,
    sort_type: sortType.ALPHABET,
    show: true,
    search: true,
    searchPlaceholder: 'e.g. Abdomen, NOS',
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
];

const geneticAnalysisFacets = [
  {
    section: GENETICANALYSIS,
    label: 'Reported Significance',
    apiPath: '',
    apiForFiltering: 'filterParticipantCountByReportedSignificance',
    datafield: 'reported_significance',
    field: GROUP,
    type: InputTypes.CHECKBOX,
    sort_type: sortType.ALPHABET,
    show: true,
  },
  {
    section: GENETICANALYSIS,
    label: 'Reported Significance System',
    apiPath: '',
    apiForFiltering: 'filterParticipantCountByReportedSignificanceSystem',
    datafield: 'reported_significance_system',
    field: GROUP,
    type: InputTypes.CHECKBOX,
    sort_type: sortType.ALPHABET,
    show: true,
  },
  {
    section: GENETICANALYSIS,
    label: 'Gene Symbol',
    apiPath: '',
    apiForFiltering: 'filterParticipantCountByGeneSymbol', 
    datafield: 'gene_symbol',
    field: GROUP,
    type: InputTypes.CHECKBOX,
    sort_type: sortType.ALPHABET,
    show: true,
    search: true,
    searchPlaceholder: 'e.g. MLL, TP53, BRAF',
  },
  {
    section: GENETICANALYSIS,
    label: 'Alteration',
    apiPath: '',
    apiForFiltering: 'filterParticipantCountByAlteration',
    datafield: 'alteration',
    field: GROUP,
    type: InputTypes.CHECKBOX,
    sort_type: sortType.ALPHABET,
    show: true,
    search: true,
    searchPlaceholder: 'e.g. LOH, Gain, Heterozygosity',
  },
  {
    section: GENETICANALYSIS,
    label: 'Fusion Partner Gene',
    apiPath: '',
    apiForFiltering: 'filterParticipantCountByFusionPartnerGene',
    datafield: 'fusion_partner_gene',
    field: GROUP,
    type: InputTypes.CHECKBOX,
    sort_type: sortType.ALPHABET,
    show: true,
  },
  {
    section: GENETICANALYSIS,
    label: 'Alteration Type',
    apiPath: '',
    apiForFiltering: 'filterParticipantCountByAlterationType',
    datafield: 'alteration_type',
    field: GROUP,
    type: InputTypes.CHECKBOX,
    sort_type: sortType.ALPHABET,
    show: true,
  },
  {
    section: GENETICANALYSIS,
    label: 'Status',
    apiPath: '',
    apiForFiltering: 'filterParticipantCountByStatus',
    datafield: 'status',
    field: GROUP,
    type: InputTypes.CHECKBOX,
    sort_type: sortType.ALPHABET,
    show: true,
  },
];

const treatmentFacets = [
  {
    section: TREATMENT,
    label: 'Age at Treatment Start',
    apiPath: 'filterParticipantCountByAgeAtTreatmentStart',
    apiForFiltering: 'filterParticipantCountByAgeAtTreatmentStart',
    datafield: 'age_at_treatment_start',
    ApiLowerBoundName: 'lowerBound',
    ApiUpperBoundName: 'upperBound',
    show: true,
    slider: true,
    type: InputTypes.SLIDER,
    sort_type: 'none',
    minLowerBound: 0,
    maxUpperBound: 100,
    quantifier: 'Days',
    style: createSliderStylesForSection(obtainColorFromSectionName(TREATMENT).slideOutComponentColor),
  },
  {
    section: TREATMENT,
    label: 'Age at Treatment End',
    apiPath: 'filterParticipantCountByAgeAtTreatmentEnd',
    apiForFiltering: 'filterParticipantCountByAgeAtTreatmentEnd',
    datafield: 'age_at_treatment_end',
    ApiLowerBoundName: 'lowerBound',
    ApiUpperBoundName: 'upperBound',
    show: true,
    slider: true,
    type: InputTypes.SLIDER,
    sort_type: 'none',
    minLowerBound: 0,
    maxUpperBound: 100,
    quantifier: 'Days',
    style: createSliderStylesForSection(obtainColorFromSectionName(TREATMENT).slideOutComponentColor),
  },
  {
    section: TREATMENT,
    label: 'Treatment Type',
    apiPath: 'participantCountByTreatmentType',
    apiForFiltering: 'filterParticipantCountByTreatmentType',
    datafield: 'treatment_type',
    field: GROUP,
    type: InputTypes.CHECKBOX,
    sort_type: sortType.ALPHABET,
    show: true,
  },
  {
    section: TREATMENT,
    label: 'Treatment Agent',
    apiPath: '',
    apiForFiltering: 'filterParticipantCountByTreatmentAgent',
    datafield: 'treatment_agent',
    field: GROUP,
    type: InputTypes.CHECKBOX,
    sort_type: sortType.ALPHABET,
    show: true,
  },
];

const treatmentResponseFacets = [
  {
    section: TREATMENTRESPONSE,
    label: 'Response',
    apiPath: '',
    apiForFiltering: 'filterParticipantCountByResponse',
    datafield: 'response',
    field: GROUP,
    type: InputTypes.CHECKBOX,
    sort_type: sortType.ALPHABET,
    show: true,
  },
  {
    section: TREATMENTRESPONSE,
    label: 'Age at Response',
    apiPath: 'filterParticipantCountByAgeAtResponse',
    apiForFiltering: 'filterParticipantCountByAgeAtResponse',
    datafield: 'age_at_response',
    ApiLowerBoundName: 'lowerBound',
    ApiUpperBoundName: 'upperBound',
    show: true,
    slider: true,
    type: InputTypes.SLIDER,
    sort_type: 'none',
    minLowerBound: 0,
    maxUpperBound: 100,
    quantifier: 'Days',
    style: createSliderStylesForSection(obtainColorFromSectionName(TREATMENTRESPONSE).slideOutComponentColor),
  },
  {
    section: TREATMENTRESPONSE,
    label: 'Response Category',
    apiPath: '',
    apiForFiltering: 'filterParticipantCountByResponseCategory',
    datafield: 'response_category',
    field: GROUP,
    type: InputTypes.CHECKBOX,
    sort_type: sortType.ALPHABET,
    show: true,
  },
  {
    section: TREATMENTRESPONSE,
    label: 'Response System',
    apiPath: '',
    apiForFiltering: 'filterParticipantCountByResponseSystem',
    datafield: 'response_system',
    field: GROUP,
    type: InputTypes.CHECKBOX,
    sort_type: sortType.ALPHABET,
    show: true,
  },
];

const survivalFacets = [
  {
    section: SURVIVAL,
    label: 'Last Known Survival Status',
    apiPath: '',
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
    style: createSliderStylesForSection(obtainColorFromSectionName(SURVIVAL).slideOutComponentColor),
  },
  {
    section: SURVIVAL,
    label: 'Cause Of Death',
    apiPath: '',
    apiForFiltering: 'filterParticipantCountByCauseOfDeath',
    datafield: 'cause_of_death',
    field: GROUP,
    type: InputTypes.CHECKBOX,
    sort_type: sortType.ALPHABET,
    show: true,
  },
  {
    section: SURVIVAL,
    label: 'First Event',
    apiPath: '',
    apiForFiltering: 'filterParticipantCountByFirstEvent',
    datafield: 'first_event',
    field: GROUP,
    type: InputTypes.CHECKBOX,
    sort_type: sortType.ALPHABET,
    show: true,
  },
];

// Map section names to their corresponding facet arrays
const sectionFacetsMap = {
  [STUDY]: studyFacets,
  [DEMOGRAPHICS]: demographicsFacets,
  [DIAGNOSIS]: diagnosisFacets,
  [GENETICANALYSIS]: geneticAnalysisFacets,
  [TREATMENT]: treatmentFacets,
  [TREATMENTRESPONSE]: treatmentResponseFacets,
  [SURVIVAL]: survivalFacets,
};

// Combine facets based on FACET_ORDER
export const facetsConfig = FACET_ORDER.reduce((acc, section) => {
  return [...acc, ...sectionFacetsMap[section]];
}, []);

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
    width: '100%',
    height: 210,
    tooltip: 'Switch displays between pie and bar charts',
    countType: 'discrete',
  },
  {
    type: 'bar',
    title: 'Sex at Birth',
    dataName: 'participantCountBySexAtBirth',
    sliceTitle: 'Participants',
    width: '100%',
    height: 210,
    tooltip: 'Switch displays between pie and bar charts',
    countType: 'discrete',
  },
  {
    type: 'donut',
    title: 'Diagnosis',
    dataName: 'participantCountByDiagnosis',
    sliceTitle: 'Participants',
    width: '100%',
    height: 210,
    tooltip: 'Switch displays between pie and bar charts',
    countType: 'discrete',
  },
  {
    type: 'donut',
    title: 'Anatomic Site',
    dataName: 'participantCountByAnatomicSite',
    sliceTitle: 'Participants',
    width: '100%',
    height: 210,
    tooltip: 'Switch displays between pie and bar charts',
    countType: 'discrete',
  },
  {
    type: 'bar',
    title: 'Age at Diagnosis (years)',
    dataName: 'participantCountByAgeAtDiagnosis',
    sliceTitle: 'Participants',
    width: '100%',
    height: 210,
    tooltip: 'Switch displays between pie and bar charts',
    countType: 'continuous',
  },
  {
    type: 'donut',
    title: 'Treatment Type',
    dataName: 'participantCountByTreatmentType',
    sliceTitle: 'Participants',
    width: '100%',
    height: 210,
    tooltip: 'Switch displays between pie and bar charts',
    countType: 'discrete',
  },
];

export const WIDGET_DATASET_LIMIT = 20;

export const widgetToolTipConfig = {
  'Race': {
    icon: questionIcon,
    alt: 'race tooltip question mark icon',
    arrow: true,
    maxWidth: '230px',
    clsName: 'widgetTotalTooltipIcon',
    plural: 'races',
  },
  'Sex at Birth': {
    icon: questionIcon,
    alt: 'sex tooltip question mark icon',
    arrow: true,
    maxWidth: '230px',
    clsName: 'widgetTotalTooltipIcon',
    plural: 'sexes',
  },
  'Diagnosis': {
    icon: questionIcon,
    alt: 'diagnosis tooltip question mark icon',
    arrow: true,
    maxWidth: '230px',
    clsName: 'widgetTotalTooltipIcon',
    plural: 'diagnoses',
  },
  'Anatomic Site': {
    icon: questionIcon,
    alt: 'anatomic site tooltip question mark icon',
    arrow: true,
    maxWidth: '230px',
    clsName: 'widgetTotalTooltipIcon',
    plural: 'anatomic sites',
  },
  'Age at Diagnosis (years)': {
    icon: questionIcon,
    alt: 'age at diagnosis tooltip question mark icon',
    arrow: true,
    maxWidth: '230px',
    clsName: 'widgetTotalTooltipIcon',
    plural: 'age groups',
  },
  'Treatment Type': {
    icon: questionIcon,
    alt: 'treatment type tooltip question mark icon',
    arrow: true,
    maxWidth: '230px',
    clsName: 'widgetTotalTooltipIcon',
    plural: 'treatment types',
  },
};

// --------------- query url configuration --------------
// Facets, tab, pagination paramters

export const queryParams = [
   // Special search/import parameters
   'import_from', 'p_id', 'u', 'u_fc', 'u_um',
   // Study values
   'dbgap_accession', 'study_name',
   // Demographics values
   'sex_at_birth', 'race',
   // Diagnosis values
   'age_at_diagnosis', 'anatomic_site', 'diagnosis', 'diagnosis_classification_system',
   'diagnosis_basis', 'disease_phase',
   'age_at_diagnosis_unknownAges',
   // Treatment values
   'age_at_treatment_start', 'age_at_treatment_end', 'treatment_type', 'treatment_agent',
   'age_at_treatment_start_unknownAges', 'age_at_treatment_end_unknownAges',
   // Treatment Response values
   'response', 'age_at_response', 'response_category', 'response_system',
   'age_at_response_unknownAges',
   // Survival values
   'last_known_survival_status', 'age_at_last_known_survival_status', 'cause_of_death',
   'first_event',
   'age_at_last_known_survival_status_unknownAges',
   // Genetic Analysis values
   'reported_significance', 'reported_significance_system', 'gene_symbol', 'alteration',
   'fusion_partner_gene', 'alteration_type', 'status',
   // Tab parameter
   'tab',
];

export const excludedParams = [
  'import_from',
  'tab',
];

export const ageRelatedParams = [
  'age_at_diagnosis',
  'age_at_treatment_start',
  'age_at_treatment_end',
  'age_at_response',
  'age_at_last_known_survival_status',
];
