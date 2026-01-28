/**
 * Generate the default styling for the component
 */
import { FACET_NAMES, obtainColorFromSectionName } from '../../../bento/dashTemplate';
export  const customStyles = {
    queryWrapper: {
      //height: '120px',
      paddingBottom: '12px',
      backgroundColor: '#FFFFFF',
      borderBottom: '1px solid #B0B0B0',
      padding: '2.7px 0px 12px 25px',
      overflowY: 'auto',
    },
    queryContainer: {
      marginLeft: 5,
      position: 'relative',
      lineHeight: '25px',
      fontFamily: 'Nunito',
      fontSize: '12px',
      color: '#000000',
    },
    filterName: {
      textTransform: 'uppercase',
      padding: '1px 5px',
      borderRadius: 5,
      fontSize: 12,
      fontWeight: 600,
      fontFamily: 'Nunito',
      cursor: 'pointer',
      backgroundColor: '#E6FFF9',
      lineHeight: '100%',
      letterSpacing: '0%',
      maxHeight: '20px',
    },
    filterCheckboxes: {
      padding: '1.5px 6px',
      borderRadius: 5,
      fontSize: 12,
      fontWeight: 500,
      fontFamily: 'Nunito',
      lineHeight: '100%',
      letterSpacing: '0%',
      border: '0.5px solid #646464',
      width: 'fit-content',
      backgroundColor: '#fff',
      cursor: 'pointer',
      color: '#008566',
      maxHeight: '20px',
    },
    bracketsOpen: {
      fontSize: 20,
      fontFamily: 'Nunito',
      color: '#646464',
      marginRight: 3,
      fontWeight: 600,
    },
    bracketsClose: {
      fontSize: 20,
      fontFamily: 'Nunito',
      color: '#646464',
      marginLeft: 3,
      fontWeight: 600,
    },
    ellipsis: {
      fontFamily: 'Nunito',
      fontWeight: 600,
      fontSize: 10,
      marginLeft: 3,
    },
    operators: {
      color: '#646464',
      marginLeft: '3px',
      marginRight: '3px',
      borderBottom: 'none',
      textDecoration: 'none',
      fontSize: 10,
      fontWeight: 'bold',
    },
    clearQueryButton: {
      margin: '1px',
      //marginLeft: -6,
      fontWeight: 600,
      fontSize: '12px',
      color: '#fff',
      borderRadius: '5px',
      fontFamily: 'Nunito',
      boxSizing: 'border-box',
      backgroundColor: '#646464',
      textTransform: 'capitalize',
      border: 'none',
      padding: '2px 7px',
      marginBottom: '1.6px',
      '&:hover': {
        backgroundColor: '#646464',
      },
    },
    divider: {
      paddingLeft: '16px',
      fontSize: '26px',
      borderRight: '.5px solid #969696',
      marginRight: '8px',
      verticalAlign: 'middle',
    },
    viewLinkToggleBtn: {
      margin: '1px',
      fontWeight: 600,
      fontSize: '12px',
      color: '#fff',
      borderRadius: '5px',
      fontFamily: 'Nunito',
      boxSizing: 'border-box',
      backgroundColor: '#1D79A8',
      textTransform: 'capitalize',
      border: 'none',
      padding: '2px 7px',
      '&:hover': {
        backgroundColor: '#1D79A8',
      },
    },
    urlContainer: {
      display: 'flex',
      marginTop: '5px',
      minHeight: '10px',
    },
    /* Custom Styling by Project */
    localFind: {
      color: '#7AA6B6',
    },
    localFindBackground: {
      backgroundColor: '#E4ECE9',
    },
    /*
    facetSectionCases: {
      color: '#7AA6B6',
    },
    facetSectionCasesBackground: {
      backgroundColor: '#E4ECE9',
    },
    facetSectionFiles: {
      color: '#E636E4',
    },
    facetSectionFilesBackground: {
      backgroundColor: '#F5C3F1',
    },*/
    facetSectionStudy: {
      color: obtainColorFromSectionName(FACET_NAMES.STUDY).queryBarAttrbTextColor,
    },
    facetSectionStudyBackground: {
      backgroundColor: obtainColorFromSectionName(FACET_NAMES.STUDY).queryBarNameBkgdColor,
      border: '1px solid #646464',
    },
    facetSectionDemographics: {
      color: obtainColorFromSectionName(FACET_NAMES.DEMOGRAPHICS).queryBarAttrbTextColor,
    },
    facetSectionDemographicsBackground: {
      backgroundColor: obtainColorFromSectionName(FACET_NAMES.DEMOGRAPHICS).queryBarNameBkgdColor,
      border: '1px solid #646464',
    },
    facetSectionDiagnosis: {
      color: obtainColorFromSectionName(FACET_NAMES.DIAGNOSIS).queryBarAttrbTextColor,
    },
    facetSectionDiagnosisBackground: {
      backgroundColor: obtainColorFromSectionName(FACET_NAMES.DIAGNOSIS).queryBarNameBkgdColor,
      border: '1px solid #646464',
    },
    facetSectionGeneticanalysis: {
      color: obtainColorFromSectionName(FACET_NAMES.GENETICANALYSIS).queryBarAttrbTextColor,
    },
    facetSectionGeneticanalysisBackground: {
      backgroundColor: obtainColorFromSectionName(FACET_NAMES.GENETICANALYSIS).queryBarNameBkgdColor,
      border: '1px solid #646464',
    },
    facetSectionTreatment: {
      color: obtainColorFromSectionName(FACET_NAMES.TREATMENT).queryBarAttrbTextColor,
    },
    facetSectionTreatmentBackground: {
      backgroundColor: obtainColorFromSectionName(FACET_NAMES.TREATMENT).queryBarNameBkgdColor,
      border: '1px solid #646464',
    },
    facetSectionTreatmentresponse: {
      color: obtainColorFromSectionName(FACET_NAMES.TREATMENTRESPONSE).queryBarAttrbTextColor,
    },
    facetSectionTreatmentresponseBackground: {
      backgroundColor: obtainColorFromSectionName(FACET_NAMES.TREATMENTRESPONSE).queryBarNameBkgdColor,
      border: '1px solid #646464',
    },
    facetSectionSurvival: {
      color: obtainColorFromSectionName(FACET_NAMES.SURVIVAL).queryBarAttrbTextColor,
    },
    facetSectionSurvivalBackground: {
      backgroundColor: obtainColorFromSectionName(FACET_NAMES.SURVIVAL).queryBarNameBkgdColor,
      border: '1px solid #646464',
    },
    localFindAssociatedIdsBackground: {
      backgroundColor: '#F6A700',
    },
    localFindAssociatedIdsText: {
      color: '#B36B00',
    },

    /*
    facetSectionSamples: {
      color: '#907642',
    },
    facetSectionSamplesBackground: {
      backgroundColor: '#F0DFBD40',
      border: '1px solid #646464',
    },
    facetSectionDatacategory: {
      color: '#A85348',
    },
    facetSectionDatacategoryBackground: {
      backgroundColor: '#F8D7D240',
      border: '1px solid #646464',
    },

    facetSectionLibrary: {
      color: '#14A773',
    },
    facetSectionLibraryBackground: {
      backgroundColor: '#DDEAE540',
      border: '1px solid #646464',
    },*/
  }
  