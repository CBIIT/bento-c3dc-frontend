export const customTheme = {
  MuiTabs: {
    root: {
      borderBottom: '2px solid #71767A',
    },
  },
  MuiTab: {
    root: {
      marginTop: '40px',
      color: '#6E6E6E',
      height: '45px',
      overflow: 'hidden',
      background: '#D7D7D7',
      borderTop: '6px solid #8B8B8B',
      borderLeft: '1px solid #8B8B8B',
      borderRight: '1px solid #8B8B8B',
      fontWeight: '400',
      lineHeight: '19px',
      letterSpacing: '0.25px',
      marginRight: '10px',
      fontSize: '17px',
      width: '203px',
      textTransform: 'none',
      fontFamily: 'Poppins',
      '& span': {
        color: '#000000',
      },
      '&.Mui-selected': {
        fontWeight: '500',
        fontSize: '18px',
        '&.participants': {
          background: '#FFFFFF',
          color: '#000000',
          borderTop: '6px solid #006A8F',
        },
        '&.diagnosis': {
          background: '#FFFFFF',
          color: '#000000',
          borderTop: '6px solid #E39520',
        },
        '&.survival': {
          background: '#FFFFFF',
          color: '#000000',
          borderTop: '6px solid #35B899',
        },
        '&.studies': {
          background: '#FFFFFF',
          color: '#000000',
          borderTop: '6px solid #9664C7',
        },
        '&.treatment': {
          background: '#FFFFFF',
          color: '#000000',
          borderTop: '6px solid #00614F',
        },
        '&.treatment_response': {
          background: '#FFFFFF',
          color: '#000000',
          borderTop: '6px solid #862405',
        },
        },
        '&.MuiTypography-body1': {
          color: 'red',
        },
      },
      '& span.participants_count': {
        marginLeft: '5px',
        fontSize: '16px',
        fontWeight: '300',
      },
      '& span.diagnosis_count': {
        marginLeft: '5px',
        fontSize: '16px',
        fontWeight: '300',
      },
      '& span.survival_count': {
        marginLeft: '5px',
        fontSize: '16px',
        fontWeight: '300',
      },
      '& span.studies_count': {
        marginLeft: '5px',
        fontSize: '16px',
        fontWeight: '300',
      },
      '& span.treatment_count': {
        marginLeft: '5px',
        fontSize: '16px',
        fontWeight: '300',
      },
      '& span.treatment_response_count': {
        marginLeft: '5px',
        fontSize: '16px',
        fontWeight: '300',
      },
    },
  };
;
