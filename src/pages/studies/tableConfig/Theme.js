export const tblHeader = {
    MuiTableSortLabel: {
      root: {
        color: '#0F253A !important',
        position: 'relative',
        fontSize: '15px',
        fontFamily: 'Open Sans',
        fontWeight: '700',
        textDecoration: 'none',
        '&:hover': {
          color: '#13344A',
        },
      },
    },
    MuiTableCell: {
      root: {
        padding: '0px 0px 0px 20px',
        paddingRight: '5px',
        color: '#13344A',
        '&.del_all_row': {
          minWidth: '150px',
          cursor: 'pointer',
        },
      },
    },
    MuiTooltip: {
      tooltipPlacementBottom: {
        '@media (min-width: 600px)': {
          marginTop: '-10px',
          marginLeft: '-20px',
          background: 'none',
        },
      },
      popper: {
        '&#header-tooltip div': {
          background: '#61614F',
          marginTop: '0px',
          marginLeft: '0px',
        },
      },
    },
    MuiIconButton: {
      root: {
        '&.del_all_row_btn': {
          paddingLeft: '5px',
        },
      },
    },
    MuiTypography: {
      root: {
        color: '#A61401',
        '&.remove_all_tooltip': {
          width: '110px',
          border: '2px solid #A61401',
          height: '48px',
          padding: '5px 10px',
          fontSize: '12px',
          background: '#fff',
          textAlign: 'center',
          fontWeight: '500',
          borderRadius: '7px',
        },
        '&.del_all_row_text': {
          float: 'left',
          fontSize: '11pt',
          textAlign: 'center',
          fontWeight: 'bold',
          fontFamily: 'Lato Regular, Raleway, sans-serif',
          lineHeight: '47px',
        },
      },
    },
    MuiTableRow: {
        head: {
            height: '40px',
            borderTop: '3px solid #8A7F7C',
            borderBottom: '1px solid #000000',
        },
    },
  };
  
  export const tblPgn = {
    MuiTablePagination: {
      root: {
        
      },
      toolbar: {
        minHeight: '45px',
      },
    },
  };
  
  export const tblBody = {
    MuiTableBody: {
      root: {
        margin: 'auto 3% auto 3%',
        maxWidth: '100%',
      },
    },
    MuiTableRow :{
      root:{
        height: '40px',
        fontSize: '8px',
        color: '#004C73',
        '&:nth-child(odd)': {
          backgroundColor: '#F4F4F4',
        },
      },
    },
    MuiTableCell: {
      body: {
        color: 'inherit',
        fontSize: '16px',
        maxWidth: '250px',
        fontStyle: 'normal',
        fontFamily: 'Nunito',
        fontWeight: 'normal',
        paddingLeft: '20px',
        overflowWrap: 'break-word',
        letterSpacing: '0.025em',
        '&.numberOfSubjects': {
          paddingLeft: '55px',
        },
        '&.numberOfFiles': {
          paddingLeft: '55px',
        },
      },
      root: {
        display: 'table-cell',
        padding: '5px',
        fontSize: '.875rem',
        textAlign: 'left',
        fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
        fontWeight: '400',
        lineHeight: '1.43',
        borderBottom: '0px',
        letterSpacing: '0.01071em',
        verticalAlign: 'inherit',
        height: '40px',
      },
    },
    MuiLink: {
      root: {
        color: '#3156A0',
        textDecoration: 'underline .5px !important',
        textDecorationThickness: '.5px',
        '&:hover': {
            textDecoration: 'underline 1.5px !important',
        },
      },
    },
    MuiTypography: {
      body1: {
        fontSize: '16px',
        fontFamily: 'Open Sans',
        fontWeight: '600',
      },
    },
  };
  
  export const tblContainer = {
    MuiTableContainer: {
      root: {
        width: '100%',
        overflowX: 'auto',
        transform: 'rotateX(180deg)',
        boxShadow: 'none',
        borderRadius: '0',
      }
    },
    MuiTable: {
      root: {
        transform: 'rotateX(180deg)',
        width: '100%',
        display: 'table',
        borderSpacing: '0',
        borderCollapse: 'collapse',
      },
    },
  };

  export const extendedView = {
    tblTopPgn: {
        MuiButtonBase: {
            root: {
                '&:hover': {
                    backgroundColor: '#F5F5F5',
                },
            },
        },
        MuiTablePagination: {
            root: {
                // borderTop: '1px solid #8A7F7C',
                marginLeft: 'auto',
            },
            caption: {
                textTransform: 'uppercase',
                fontFamily: 'Open Sans',
                fontSize: '14px',
            },
            select: {
                fontFamily: 'Open Sans',
                fontSize: '14px',
            },
            toolbar: {
                minHeight: '40px',
            },
        },
        MuiSelect: {
            select: {
                '&:focus': {
                    backgroundColor: '#FFFFFF'
                }
            },
            icon: {
                padding: '2px 0 0 3px',
            },
                iconOpen: {
                padding: '2px 0 0 3px',
            },
        },
        MuiMenu: {
            paper: {
                boxShadow: 'none',
                border: '1px solid #99A1B7',
                background: '#F5F5F5',
            },
            list: {
                paddingTop: '0',
                paddingBottom: '0',
            },
        },
        MuiMenuItem: {
            root: {
                fontFamily: 'Open Sans',
                fontSize: '14px',
                padding: '2px 8px',
                paddingTop: '2px',
                paddingBottom: '2px',
                minHeight: '24px',
            },
        },
        MuiListItem: {
            button: {
                '&:hover': {
                    backgroundColor: '#F5F5F5',
                    color: 'rgb(96, 121, 123)',
                }
            },
        },
    },
  };
  
  export const themeConfig = {
    tblHeader,
    tblPgn,
    tblBody,
    tblContainer,
    extendedView,
  };