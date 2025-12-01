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
        '&.diagnosisCheckedEven': {
          backgroundColor: '#E4F6F5',
        },
        '&.diagnosisCheckedOdd': {
          backgroundColor: '#EAFFFE',
        },
        '&.demographicsCheckedEven': {
          backgroundColor: '#E4F6F5',
        },
        '&.demographicsCheckedOdd': {
          backgroundColor: '#EAFFFE',
        },
        '&.treatmentCheckedEven': {
          backgroundColor: '#E4F6F5',
        },
        '&.treatmentCheckedOdd': {
          backgroundColor: '#EAFFFE',
        },
        '&.treatmentresponseCheckedEven': {
          backgroundColor: '#E4F6F5',
        },
        '&.treatmentresponseCheckedOdd': {
          backgroundColor: '#EAFFFE',
        },
        '&.survivalCheckedEven': {
          backgroundColor: '#E4F6F5',
        },
        '&.survivalCheckedOdd': {
          backgroundColor: '#EAFFFE',
        },
        '&.samplesCheckedEven': {
          backgroundColor: '#E4F6F5',
        },
        '&.samplesCheckedOdd': {
          backgroundColor: '#EAFFFE',
        },
        '&.datacategoryCheckedEven': {
          backgroundColor: '#E4F6F5',
        },
        '&.datacategoryCheckedOdd': {
          backgroundColor: '#EAFFFE',
        },
        '&.studyCheckedEven': {
          backgroundColor: '#E4F6F5',
        },
        '&.studyCheckedOdd': {
          backgroundColor: '#EAFFFE',
        },
        '&.sequencinglibraryCheckedEven': {
          backgroundColor: '#E4F6F5',
        },
        '&.sequencinglibraryCheckedOdd': {
          backgroundColor: '#EAFFFE',
        },
      },
    },
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
    },
    MuiTypography: {
      root: {
        '&.diagnosisSubjects': {
          color: '#325A67',
          backgroundColor: '#CEECEB',
          padding: '1px 2px',
          fontSize: '11px',
          fontFamily: 'Nunito',
          marginRight: '0px',
          fontWeight: '600',

        },
        '&.demographicsSubjects': {
          color: '#325A67',
          backgroundColor: '#CEECEB',
          padding: '1px 2px',
          fontSize: '11px',
          fontFamily: 'Nunito',
          marginRight: '0px',
          fontWeight: '600',

        },
        '&.treatmentSubjects': {
          color: '#325A67',
          backgroundColor: '#CEECEB',
          padding: '1px 2px',
          fontSize: '11px',
          fontFamily: 'Nunito',
          marginRight: '0px',
          fontWeight: '600',

        },
        '&.treatmentresponseSubjects': {
          color: '#325A67',
          backgroundColor: '#CEECEB',
          padding: '1px 2px',
          fontSize: '11px',
          fontFamily: 'Nunito',
          marginRight: '0px',
          fontWeight: '600',
        },
        '&.survivalSubjects': {
          color: '#325A67',
          backgroundColor: '#CEECEB',
          padding: '1px 2px',
          fontSize: '11px',
          fontFamily: 'Nunito',
          marginRight: '0px',
          fontWeight: '600',
        },
        '&.samplesSubjects': {
          color: '#325A67',
          backgroundColor: '#CEECEB',
          padding: '1px 2px',
          fontSize: '11px',
          fontFamily: 'Nunito',
          marginRight: '0px',
          fontWeight: '600',
        },
        '&.datacategorySubjects': {
          color: '#325A67',
          backgroundColor: '#CEECEB',
          padding: '1px 2px',
          fontSize: '11px',
          fontFamily: 'Nunito',
          marginRight: '0px',
          fontWeight: '600',
        },
        '&.studySubjects': {
          color: '#325A67',
          backgroundColor: '#CEECEB',
          padding: '1px 2px',
          fontSize: '11px',
          fontFamily: 'Nunito',
          marginRight: '0px',
          fontWeight: '600',
        },
        '&.sequencinglibrarySubjects': {
          color: '#325A67',
          backgroundColor: '#CEECEB',
          padding: '1px 2px',
          fontSize: '11px',
          fontFamily: 'Nunito',
          marginRight: '0px',
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
