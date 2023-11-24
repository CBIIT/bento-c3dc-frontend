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
        '&.demographicsCheckedEven': {
          backgroundColor: '#CBDFE0',
        },
        '&.demographicsCheckedOdd': {
          backgroundColor: '#E4ECE9',
        },
        '&.diagnosisCheckedEven': {
          backgroundColor: '#C8A4C840',
        },
        '&.diagnosisCheckedOdd': {
          backgroundColor: '#E1C9E140',
        },
        '&.samplesCheckedEven': {
          backgroundColor: '#D9C5A040',
        },
        '&.samplesCheckedOdd': {
          backgroundColor: '#F0DFBD40',
        },
        '&.datacategoryCheckedEven': {
          backgroundColor: '#E1B4AD40',
        },
        '&.datacategoryCheckedOdd': {
          backgroundColor: '#F8D7D240',
        },
        '&.studyCheckedEven': {
          backgroundColor: '#9FBCDD40',
        },
        '&.studyCheckedOdd': {
          backgroundColor: '#CEDEF040',
        },
        '&.libraryCheckedEven': {
          backgroundColor: '#95C6B340',
        },
        '&.libraryCheckedOdd': {
          backgroundColor: '#DDEAE540',
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
        '&.libraryCheckedIcon': {
          color: '#6D5F5B',
        },
      },
    },
    MuiTypography: {
      root: {
        '&.demographicsSubjects': {
          color: '#357288',
          fontSize: '12px',
          fontFamily: 'Nunito',
          marginRight: '0px',
          fontWeight: '600',
        },
        '&.diagnosisSubjects': {
          color: '#7D267E',
          fontSize: '12px',
          fontFamily: 'Nunito',
          marginRight: '0px',
          fontWeight: '600',
        },
        '&.samplesSubjects': {
          color: '#897E67',
          fontSize: '12px',
          fontFamily: 'Nunito',
          marginRight: '0px',
          fontWeight: '600',
        },
        '&.datacategorySubjects': {
          color: '#A85348',
          fontSize: '12px',
          fontFamily: 'Nunito',
          marginRight: '0px',
          fontWeight: '600',
        },
        '&.studySubjects': {
          color: '#24568E',
          fontSize: '12px',
          fontFamily: 'Nunito',
          marginRight: '0px',
        },
        '&.librarySubjects': {
          color: '#14835C',
          fontSize: '12px',
          fontFamily: 'Nunito',
          marginRight: '0px',
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
          backgroundColor: '#E9B34A',
        },
        '&.divider3': {
          backgroundColor: '#CD5C4E',
        },
        '&.divider4': {
          backgroundColor: '#1F6BBF',
        },
        '&.divider5': {
          backgroundColor: '#60C4A1',
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
