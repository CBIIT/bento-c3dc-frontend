import React from 'react';
import { ThemeProvider, createTheme } from '@material-ui/core/styles';

const theme = {
  overrides: {
    Mui: {
      '&$expanded': {
        margin: '0px 0px',
      },
      checked: {
        color: 'red',
      },
    },
    MuiAccordionDetails: {
      root: {
        padding: '0px 1px 0px',
      },
    },
    MuiAccordion: {
      root: {
        '&$expanded': {
          margin: 'auto',
        },
      },
    },
    MuiAccordionSummary: {
      content: {
        margin: '0',
      },
    },
    MuiList: {
      padding: {
        paddingTop: '0',
        paddingBottom: '0',
      },
    },
    MuiCheckbox: {
      colorSecondary: {
        '&:first-child': {
          color: '#000000',
        },
      },
    },
    MuiListItem: {
      root: {
        '&.studyCheckedEven': {
          backgroundColor: '#B5DDE5',
        },
        '&.studyCheckedOdd': {
          backgroundColor: '#A5C2C8',
        },
        '&.demographicsCheckedEven': {
          backgroundColor: '#FFF2DF',
        },
        '&.demographicsCheckedOdd': {
          backgroundColor: '#F0DCBE',
        },
        '&.diagnosisCheckedEven': {
          backgroundColor: '#C2FFF1',
        },
        '&.diagnosisCheckedOdd': {
          backgroundColor: '#BCE1D8',
        },
        '&.treatmentCheckedEven': {
          backgroundColor: '#E8D8F5',
        },
        '&.treatmentCheckedOdd': {
          backgroundColor: '#D3BFE8',
        },
        '&.treatmentresponseCheckedEven': {
          backgroundColor: '#E0ECEA',
        },
        '&.treatmentresponseCheckedOdd': {
          backgroundColor: '#E9F5F3',
        },
        '&.survivalCheckedEven': {
          backgroundColor: '#FFEDE7',
        },
        '&.survivalCheckedOdd': {
          backgroundColor: '#FFF6F3',
        },
        '&.geneticanalysisCheckedEven': {
          backgroundColor: '#B5D8F9',
        },
        '&.geneticanalysisCheckedOdd': {
          backgroundColor: '#92BADF',
        },
      },
    },
    MuiListItemText: {
      root: {
        flex: 'none',
        //width: '3px',
        paddingRight: '3px',
      },
    },
    MuiTypography: {
      body1: {
        color: '#000000',
        fontFamily: 'Nunito',
        fontWeight: '300',
        fontSize: '14px !important',
        lineHeight: '19.1px',
      },
    },
    MuiSlider: {
      thumb: {
        height: 16,
        width: 16,
        "&.invalidThumb": {
          height: "16px !important",
          width: "16px !important",
        },
        "&.thumbStudy": {
          background: '#006A8F',
        },
        "&.thumbDemographics": {
          background: '#E39520',
        },
        "&.thumbDiagnosis": {
          background: '#35B899',
        },
        "&.thumbTreatment": {
          background: '#9664C7',
        },
        "&.thumbTreatmentresponse": {
          background: '#006B57',
        },
        "&.thumbSurvival": {
          background: '#862405',
        },
        "&.thumbGeneticanalysis": {
          background: '#268CEA',
        }
      },
      track: {
        borderRadius: 4,
        height: 6,
        "&.invalidTrack": {
          borderRadius: "4px !important",
          height: "6px !important",
        },
        '&~&': {
          background: '#142D64',
        },
        "&.trackStudy": {
          background: '#006A8F',
        },
        "&.trackDemographics": {
          background: '#E39520',
        },
        "&.trackDiagnosis": {
          background: '#35B899',
        },
        "&.trackTreatment": {
          background: '#9664C7',
        },
        "&.trackTreatmentresponse": {
          background: '#006B57',
        },
        "&.trackSurvival": {
          background: '#862405',
        },
        "&.trackGeneticanalysis": {
          background: '#268CEA',
        }
      },
      colorPrimary: {
        "&.colorPrimaryStudy": {
          color: '#006A8F',
        },
        "&.colorPrimaryDemographics": {
          color: '#E39520',
        },
        "&.colorPrimaryDiagnosis": {
          color: '#35B899',
        },
        "&.colorPrimaryTreatment": {
          color: '#9664C7',
        },
        "&.colorPrimaryTreatmentresponse": {
          color: '#006B57',
        },
        "&.colorPrimarySurvival": {
          color: '#862405',
        },
        "&.colorPrimaryGeneticanalysis": {
          color: '#268CEA',
        }
      },
      rail: {
        borderRadius: 4,
        height: 6,
        "&.railStudy": {
          background: '#006A8F',
        },
        "&.railDemographics": {
          background: '#E39520',
        },
        "&.railDiagnosis": {
          background: '#35B899',
        },
        "&.railTreatment": {
          background: '#9664C7',
        },
        "&.railTreatmentresponse": {
          background: '#006B57',
        },
        "&.railSurvival": {
          background: '#862405',
        },
        "&.railGeneticanalysis": {
          background: '#268CEA',
        }
      }

    },
    MuiDivider: {
      middle: {
        marginLeft: '0px',
        marginRight: '0px',
      },
      root: {
        height: '8px',
        '&.divider0': {
          backgroundColor: '#006A8F',
        },
        '&.divider1': {
          backgroundColor: '#E39520',
        },
        '&.divider2': {
          backgroundColor: '#35B899',
        },
        '&.divider3': {
          backgroundColor: '#268CEA',
        },
        '&.divider4': {
          backgroundColor: '#9664C7',
        },
        '&.divider5': {
          backgroundColor: '#006B57',
        },
        '&.divider6': {
          backgroundColor: '#862405',
        },
      },
    },
    checkboxRoot: {
      color: 'inherit',
      '&$checked': {
        color: '#8DCAFF',
      },
    },
  },
};

export default ({
  children,
}) => {
  const computedTheme = createTheme(theme);
  return (
    <ThemeProvider theme={computedTheme}>
      {children}
    </ThemeProvider>
  );
};