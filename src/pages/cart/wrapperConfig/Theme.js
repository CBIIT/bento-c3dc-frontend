export const customTheme = {
  MuiContainer: {
    root: {
      paddingTop: '5px',
      '&.container_outer_layout': {
        maxWidth: '100%',
        height: '75px',
        borderBottom: '#98ADC4 10px solid',
        '& img': {
          float: 'left',
          marginTop: '-33px',
          marginLeft: '-50px',
          width: '126px',
          filter: 'drop-shadow(-3px 2px 6px rgba(27,28,28,0.29))',
        },
        '& span': {
          color: '#4555AB',
          fontSize: '18pt',
          fontFamily: 'Open Sans, sans-serif',
          lineHeight: '55px',
          '&.cart_header_text': {
            letterSpacing: '0.017em',
            fontWeight: '300',
          },
          '&.cart_sel_files_text': {
            letterSpacing: '0.025em',
            fontWeight: 'bold',
            marginLeft: '0px',
          },
        },
      },
      '&.container_header': {
        maxWidth: '100%',
        padding: '45px 0px',
        marginRight: '-5px',
        position: 'relative',
        textAlign: 'right',
        '& img.tooltip_icon': {
          marginTop: '5px',
          marginLeft: '5px',
          marginRight: '7px',
          verticalAlign: 'top',
        },
      },
      '&.tooltip_icon': {
        width: '25px',
      },
      '&.container_footer': {
        maxWidth: '100%',
        textAlign: 'left',
        paddingLeft: '0px',
        '& textarea.manifest_comments': {
          color: '#000',
          border: '1.5px solid #707070',
          height: '170px',
          resize: 'none',
          padding: '15px',
          fontSize: '10px',
          minWidth: '412px',
          background: '#ebebeb',
          fontFamily: 'Open Sans',
          marginRight: '10px',
          borderRadius: '10px',
        },
      },
    },
  },
  MuiButton: {
    text: {
      padding: '10px 16px',
    },
    root: {
      color: '#fff',
      backgroundColor: '#2A6E93',
      fontFamily: 'Poppins',
      fontWeight: '600',
      fontSize: '12px',
      borderRadius: '5px',
      margin: '5px 0px',
      textTransform: 'uppercase',
      '&:hover': {
        backgroundColor: '#2A6E93',
      },
      '&.Mui-disabled': {
        color: '#fff',
        backgroundColor: '#B3D6EA',
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
