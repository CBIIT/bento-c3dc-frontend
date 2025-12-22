const tabColor = "#006A8F";

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
        '&.studies': {
          background: '#FFFFFF',
          color: '#000000',
          borderTop: `6px solid ${tabColor}`,
        },
        '&.participants': {
          background: '#FFFFFF',
          color: '#000000',
          borderTop: `6px solid ${tabColor}`,
        },
        '&.diagnosis': {
          background: '#FFFFFF',
          color: '#000000',
          borderTop: `6px solid ${tabColor}`,
        },
        '&.treatment': {
          background: '#FFFFFF',
          color: '#000000',
          borderTop: `6px solid ${tabColor}`,
        },
        '&.treatment_response': {
          background: '#FFFFFF',
          color: '#000000',
          borderTop: `6px solid ${tabColor}`,
        },
        '&.survival': {
          background: '#FFFFFF',
          color: '#000000',
          borderTop: `6px solid ${tabColor}`,
        },
        '&.genetic_analysis': {
          background: '#FFFFFF',
          color: '#000000',
          borderTop: `6px solid ${tabColor}`,
        },
        '&.MuiTypography-body1': {
          color: 'red',
        },
      },
      '& span.studies_count': {
        marginLeft: '5px',
        fontSize: '16px',
        fontWeight: '300',
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
      '& span.survival_count': {
        marginLeft: '5px',
        fontSize: '16px',
        fontWeight: '300',
      },
      '& span.genetic_analysis_count': {
        marginLeft: '5px',
        fontSize: '16px',
        fontWeight: '300',
      },
    },
  },
  MuiList: {
    root: {
      '&.popover-list': {
        padding: 0,
      },
    },
  },
  MuiListItem: {
    root: {
      '&.popover-list-item': {
        minWidth: '200px',
        padding: '13px 16px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        '& .popover-tab-name': {
          fontFamily: 'Poppins',
          fontWeight: 300,
          fontSize: '14px',
          color: 'black',
          lineHeight: '107%',
          letterSpacing: '-2%',
          textTransform: 'capitalize',
          flex: 1,
          textAlign: 'left',
        },
        '& .popover-tab-count': {
          fontFamily: 'Poppins',
          fontWeight: 300,
          fontSize: '14px',
          color: 'black',
          lineHeight: '107%',
          letterSpacing: '-2%',
          textAlign: 'right',
          marginLeft: '16px',
        },
      },
    },
  },
  MuiButton: {
    root: {
      '&.more-button': {
        width: '125px',
        height: '45px',
        marginTop: '40px',
        marginRight: '10px',
        fontFamily: 'Poppins',
        fontWeight: 300,
        fontSize: '14px',
        lineHeight: '107%',
        letterSpacing: '-2%',
        textTransform: 'capitalize',
        color: 'black',
        background: 'transparent',
        border: 'none',
        '&:hover': {
          background: 'transparent',
        },
        '& span': {
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
        },
        '& img': {
          height: '15px',
        },
      },
    },
  },
};
