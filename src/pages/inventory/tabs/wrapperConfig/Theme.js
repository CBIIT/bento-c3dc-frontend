export const customTheme = {
  MuiContainer: {
    root: {
      paddingTop: '5px',
      '& img': {
        position:'relative',
        top: '-10px',
      },
      '&.container_header': {
        textAlign: 'right',
        top: '40px',
      },
      '&.container_footer': {
        paddingTop: '10px',
        textAlign: 'right',
      },
      '&.container_footer_link': {
        textAlign: 'right',
        paddingRight: '100px',
        height: '65px',
        color: '#3E6886',
        fontSize: '12px',
        fontFamily: 'Lato',
        borderBottom: '1px solid #3E6886',
        textDecoration: 'none',
      },
    },
  },
  MuiButton: {
    text: {
      padding: '10px 16px',
    },
    root: {
      width: '189px',
      height: '41px',
      padding: '12px 30px 12px 30px',
      gap: '10px',
      borderRadius: '5px',
      border: '1.25px 0px 0px 0px',
      opacity: '0px',
      color: '#fff',
      marginTop: '5px',
      '&.add_all_button': {
        marginRight: '6px',
        // width: '120px',
        backgroundColor: '#536D70',
      },
      '&.add_selected_button': {
        marginRight: '6px',
        marginLeft: '15px',
      },
      '&.add_selected_button_Participants': {
        backgroundColor: '#2A6E93',
      },
      '&.add_selected_button_Samples': {
        backgroundColor: '#2A6E93',
      },
      '&.add_selected_button_Files': {
        backgroundColor: '#2A6E93',
      },
      '&.add_selected_button_Diagnosis': {
        backgroundColor: '#2A6E93',
      },
      '&.add_selected_button_Studies': {
        backgroundColor: '#2A6E93',
      },
      '&.Mui-disabled': {
        color: '#fff',
        '&.add_selected_button_Participants': {
          backgroundColor: '#B3D6EA',
        },
        '&.add_selected_button_Samples': {
          backgroundColor: '#B3D6EA',
        },
        '&.add_selected_button_Files': {
          backgroundColor: '#B3D6EA',
        },
        '&.add_selected_button_Diagnosis': {
          backgroundColor: '#B3D6EA',
        },
        '&.add_selected_button_Studies': {
          backgroundColor: '#B3D6EA',
        },
      },
      '&.yesBtn': {
        width: '133px',
        height: '45px',
        cursor: 'pointer',
        background: '#98a19e',
      },
      '&.noBtn': {
        width: '133px',
        height: '45px',
        cursor: 'pointer',
        background: '#42779a',
      },
    },
  },
  MuiLink: {
    root: {
      height: '65px',
      color: '#3E6886',
      fontSize: '12px',
      fontFamily: 'Lato',
      borderBottom: '1px solid #3E6886',
      textDecoration: 'none',
    },
  },
  MuiDialog: {
    paper: {
      width: '431px',
      height: '170px',
      borderRadius: '25px !important',
      textAlign: 'center',
      backgroundColor: '#E8DFDC !important',
      border: '2px solid #A61401',
    },
  },
  MuiDialogContent: {
    root: {
      padding: '40px 20px 0px 20px',
      '&.alter-content': {
        fontFamily: 'Lato',
        size: '16px',
      },
    },
  },
  MuiDialogActions: {
    root: {
      justifyContent: 'center',
      paddingBottom: '25px',
    },
  },
};

export const themeConfig = {
  customTheme,
};
