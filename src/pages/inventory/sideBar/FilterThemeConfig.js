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
          backgroundColor: '#B5DDE5',
        },
        '&.demographicsCheckedOdd': {
          backgroundColor: '#A5C2C8',
        },
        '&.diagnosisCheckedEven': {
          backgroundColor: '#FFF2DF',
        },
        '&.diagnosisCheckedOdd': {
          backgroundColor: '#F0DCBE',
        },
        '&.survivalCheckedEven': {
          backgroundColor: '#E6FFF9',
        },
        '&.survivalCheckedOdd': {
          backgroundColor: '#BCE1D8',
        },
        '&.studyCheckedEven': {
          backgroundColor: '#F6F0FB',
        },
        '&.studyCheckedOdd': {
          backgroundColor: '#D3BFE8',
        },
      },
    },
    MuiListItemText: {
      root: {
        //flex: 'none',
        //paddingRight: '3px',
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
          backgroundColor: '#9664C7',
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
