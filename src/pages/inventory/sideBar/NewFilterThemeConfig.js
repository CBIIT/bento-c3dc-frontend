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
    MuiAccordion: {
      root: {
        margin: '0px 0px !important',
      },
      '&$expanded': {
        margin: '0px 0px',
      },
    },
    MuiAccordionDetails: {
      root: {
        padding: '0px 1px 0px',
        // margin: '0px 0px',
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
          backgroundColor: '#EFF3F1',
        },
        '&.studyCheckedOdd': {
          backgroundColor: '#F9FAFA',
        },
        '&.demographicsCheckedEven': {
          backgroundColor: '#EFF3F1',
        },
        '&.demographicsCheckedOdd': {
          backgroundColor: '#F9FAFA',
        },
        '&.diagnosisCheckedEven': {
          backgroundColor: '#EFF3F1',
        },
        '&.diagnosisCheckedOdd': {
          backgroundColor: '#F9FAFA',
          '&.geneticanalysisCheckedEven': {
          backgroundColor: '#EFF3F1',
        },
        '&.geneticanalysisCheckedOdd': {
          backgroundColor: '#F9FAFA',
        },
        },
        '&.treatmentCheckedEven': {
          backgroundColor: '#EFF3F1',
        },
        '&.treatmentCheckedOdd': {
          backgroundColor: '#F9FAFA',
        },
        '&.treatmentresponseCheckedEven': {
          backgroundColor: '#EFF3F1',
        },
        '&.treatmentresponseCheckedOdd': {
          backgroundColor: '#F9FAFA',
        },
        '&.survivalCheckedEven': {
          backgroundColor: '#EFF3F1',
        },
        '&.survivalCheckedOdd': {
          backgroundColor: '#F9FAFA',
        },
      },
    },/*
    MuiSvgIcon: {
      root: {
        '&.demographicsCheckedIcon': {
          color: '#6D5F5B',
        },
        '&.diagnosisCheckedIcon': {
          color: '#6D5F5B',
        },
        '&.samplesCheckedIcon': {
          color: '#6D5F5B',
        },
        '&.datacategoryCheckedIcon': {
          color: '#6D5F5B',
        },
        '&.studyCheckedIcon': {
          color: '#6D5F5B',
        },
        '&.sequencinglibraryCheckedIcon': {
          color: '#6D5F5B',
        },
      },
    },*/
    MuiTypography: {
      root: {
        '&.studySubjects': {
          color: '#504343',
          backgroundColor: '#D8D8D8',
          padding: '2px 2px 1px 2px',
          fontSize: '11px',
          fontFamily: 'Nunito',
          marginRight: '0px',
          marginTop: 'auto',
          fontWeight: '600',
        },
        '&.demographicsSubjects': {
          color: '#504343',
          backgroundColor: '#D8D8D8',
          padding: '2px 2px 1px 2px',
          fontSize: '11px',
          fontFamily: 'Nunito',
          marginRight: '0px',
          marginTop: 'auto',
          fontWeight: '600',
        },
        '&.diagnosisSubjects': {
          color: '#504343',
          backgroundColor: '#D8D8D8',
          padding: '2px 2px 1px 2px',
          fontSize: '11px',
          fontFamily: 'Nunito',
          marginRight: '0px',
          marginTop: 'auto',
          fontWeight: '600',
        },
        '&.geneticanalysisSubjects': {
          color: '#504343',
          backgroundColor: '#D8D8D8',
          padding: '2px 2px 1px 2px',
          fontSize: '11px',
          fontFamily: 'Nunito',
          marginRight: '0px',
          marginTop: 'auto',
          fontWeight: '600',
        },
        '&.treatmentSubjects': {
          color: '#504343',
          backgroundColor: '#D8D8D8',
          padding: '2px 2px 1px 2px',
          fontSize: '11px',
          fontFamily: 'Nunito',
          marginRight: '0px',
          marginTop: 'auto',
          fontWeight: '600',
        },
        '&.treatmentresponseSubjects': {
          color: '#504343',
          backgroundColor: '#D8D8D8',
          padding: '2px 2px 1px 2px',
          fontSize: '11px',
          fontFamily: 'Nunito',
          marginRight: '0px',
          marginTop: 'auto',
          fontWeight: '600',
        },
        '&.survivalSubjects': {
          color: '#504343',
          backgroundColor: '#D8D8D8',
          padding: '2px 2px 1px 2px',
          fontSize: '11px',
          fontFamily: 'Nunito',
          marginRight: '0px',
          marginTop: 'auto',
          fontWeight: '600',
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
          backgroundColor: '#4D889E',
        },
        '&.divider1': {
          backgroundColor: '#974599',
        },
        '&.divider2': {
          backgroundColor: '#4150A4',
        },
        '&.divider3': {
          backgroundColor: '#E9B34A',
        },
        '&.divider4': {
          backgroundColor: '#CD5C4E',
        },
        '&.divider5': {
          backgroundColor: '#1F6BBF',
        },
        '&.divider6': {
          backgroundColor: '#60C4A1',
        },
        '&.divider7': {
          backgroundColor: '#357288',
        },
        '&.divider8': {
          backgroundColor: '#974599',
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
