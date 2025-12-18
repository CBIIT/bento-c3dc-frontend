import React from 'react';
import { ThemeProvider, createTheme } from '@material-ui/core/styles';
import { FACET_NAMES, FACET_ORDER, FACET_COLORS } from '../../../bento/dashTemplate';

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
          backgroundColor: FACET_COLORS[FACET_ORDER.indexOf(FACET_NAMES.STUDY) % FACET_COLORS.length].zebraStripesColor1,
        },
        '&.studyCheckedOdd': {
          backgroundColor: FACET_COLORS[FACET_ORDER.indexOf(FACET_NAMES.STUDY) % FACET_COLORS.length].zebraStripesColor2,
        },
        '&.demographicsCheckedEven': {
          backgroundColor: FACET_COLORS[FACET_ORDER.indexOf(FACET_NAMES.DEMOGRAPHICS) % FACET_COLORS.length].zebraStripesColor1,
        },
        '&.demographicsCheckedOdd': {
          backgroundColor: FACET_COLORS[FACET_ORDER.indexOf(FACET_NAMES.DEMOGRAPHICS) % FACET_COLORS.length].zebraStripesColor2,
        },
        '&.diagnosisCheckedEven': {
          backgroundColor: FACET_COLORS[FACET_ORDER.indexOf(FACET_NAMES.DIAGNOSIS) % FACET_COLORS.length].zebraStripesColor1,
        },
        '&.diagnosisCheckedOdd': {
          backgroundColor: FACET_COLORS[FACET_ORDER.indexOf(FACET_NAMES.DIAGNOSIS) % FACET_COLORS.length].zebraStripesColor2,
        },
        '&.geneticanalysisCheckedEven': {
          backgroundColor: FACET_COLORS[FACET_ORDER.indexOf(FACET_NAMES.GENETICANALYSIS) % FACET_COLORS.length].zebraStripesColor1,
        },
        '&.geneticanalysisCheckedOdd': {
          backgroundColor: FACET_COLORS[FACET_ORDER.indexOf(FACET_NAMES.GENETICANALYSIS) % FACET_COLORS.length].zebraStripesColor2,
        },
        '&.treatmentCheckedEven': {
          backgroundColor: FACET_COLORS[FACET_ORDER.indexOf(FACET_NAMES.TREATMENT) % FACET_COLORS.length].zebraStripesColor1,
        },
        '&.treatmentCheckedOdd': {
          backgroundColor: FACET_COLORS[FACET_ORDER.indexOf(FACET_NAMES.TREATMENT) % FACET_COLORS.length].zebraStripesColor2,
        },
        '&.treatmentresponseCheckedEven': {
          backgroundColor: FACET_COLORS[FACET_ORDER.indexOf(FACET_NAMES.TREATMENTRESPONSE) % FACET_COLORS.length].zebraStripesColor1,
        },
        '&.treatmentresponseCheckedOdd': {
          backgroundColor: FACET_COLORS[FACET_ORDER.indexOf(FACET_NAMES.TREATMENTRESPONSE) % FACET_COLORS.length].zebraStripesColor2,
        },
        '&.survivalCheckedEven': {
          backgroundColor: FACET_COLORS[FACET_ORDER.indexOf(FACET_NAMES.SURVIVAL) % FACET_COLORS.length].zebraStripesColor1,
        },
        '&.survivalCheckedOdd': {
          backgroundColor: FACET_COLORS[FACET_ORDER.indexOf(FACET_NAMES.SURVIVAL) % FACET_COLORS.length].zebraStripesColor2,
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