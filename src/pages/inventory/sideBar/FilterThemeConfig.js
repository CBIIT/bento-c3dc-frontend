import React from 'react';
import { ThemeProvider, createTheme } from '@material-ui/core/styles';
import { FACET_NAMES, obtainColorFromSectionName } from '../../../bento/dashTemplate';

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
          backgroundColor: obtainColorFromSectionName(FACET_NAMES.STUDY).zebraStripesColor1,
        },
        '&.studyCheckedOdd': {
          backgroundColor: obtainColorFromSectionName(FACET_NAMES.STUDY).zebraStripesColor2,
        },
        '&.demographicsCheckedEven': {
          backgroundColor: obtainColorFromSectionName(FACET_NAMES.DEMOGRAPHICS).zebraStripesColor1,
        },
        '&.demographicsCheckedOdd': {
          backgroundColor: obtainColorFromSectionName(FACET_NAMES.DEMOGRAPHICS).zebraStripesColor2,
        },
        '&.diagnosisCheckedEven': {
          backgroundColor: obtainColorFromSectionName(FACET_NAMES.DIAGNOSIS).zebraStripesColor1,
        },
        '&.diagnosisCheckedOdd': {
          backgroundColor: obtainColorFromSectionName(FACET_NAMES.DIAGNOSIS).zebraStripesColor2,
        },
        '&.geneticanalysisCheckedEven': {
          backgroundColor: obtainColorFromSectionName(FACET_NAMES.GENETICANALYSIS).zebraStripesColor1,
        },
        '&.geneticanalysisCheckedOdd': {
          backgroundColor: obtainColorFromSectionName(FACET_NAMES.GENETICANALYSIS).zebraStripesColor2,
        },
        '&.treatmentCheckedEven': {
          backgroundColor: obtainColorFromSectionName(FACET_NAMES.TREATMENT).zebraStripesColor1,
        },
        '&.treatmentCheckedOdd': {
          backgroundColor: obtainColorFromSectionName(FACET_NAMES.TREATMENT).zebraStripesColor2,
        },
        '&.treatmentresponseCheckedEven': {
          backgroundColor: obtainColorFromSectionName(FACET_NAMES.TREATMENTRESPONSE).zebraStripesColor1,
        },
        '&.treatmentresponseCheckedOdd': {
          backgroundColor: obtainColorFromSectionName(FACET_NAMES.TREATMENTRESPONSE).zebraStripesColor2,
        },
        '&.survivalCheckedEven': {
          backgroundColor: obtainColorFromSectionName(FACET_NAMES.SURVIVAL).zebraStripesColor1,
        },
        '&.survivalCheckedOdd': {
          backgroundColor: obtainColorFromSectionName(FACET_NAMES.SURVIVAL).zebraStripesColor2,
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
      },

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