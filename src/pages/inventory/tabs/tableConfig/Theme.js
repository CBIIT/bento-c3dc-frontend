export const tblHeader = {
  MuiTableCell: {
    head: {
      color: '#0F253A',
      position: 'relative',
      fontSize: '15px',
      fontFamily: 'Open Sans',
      fontWeight: '700',
      letterSpacing: '0.06em',
      textDecoration: 'none',
    },
  },
  MuiTableSortLabel: {
    root: {
      color: '#0F253A !important',
      position: 'relative',
      fontSize: '15px',
      fontFamily: 'Open Sans',
      fontWeight: '700',
      letterSpacing: '0.06em',
      textDecoration: 'none',
      '&:hover': {
        color: '#13344A',
      },
      '&:hover $svg': {
      },
    },
  },
  MuiTableRow: {
    head: {
      height: '40px',
      borderBottom: '1px solid #000000',
    },
  },
};

const tblBody = {
  MuiTableRow: {
    root: {
      height: '40px',
      '&:nth-child(odd)': {
        background: '#FFFFFF',
      },
      '&:nth-child(even)': {
        background: '#F4F4F4',
      },
    },
  },
  MuiTableCell: {
    root: {
      minHeight: '45px',
      padding: '0px 5px 0px 20px',
      color: '#004C73',
      borderBottom: 'none',
    },
    paddingCheckbox: {
      width: '48px',
      padding: '0 0 0 16px',
    },
    body: {
      fontFamily: 'Open Sans',
      fontSize: '14px',
      color: '#343434',
      '& p': {
        fontFamily: 'Open Sans',
        fontSize: '14px',
      },
      '&.pubmed_id': {
        minWidth: '150px',
        '& p': {
          lineBreak: 'anywhere',
        },
      },
      '&.grant_id': {
        minWidth: '150px',
        '& p': {
          lineBreak: 'anywhere',
        },
      },
      '&.study_id': {
        minWidth: '150px',
        '& p': {
          lineBreak: 'anywhere',
        },
      },
      '&.file_name': {
        minWidth: '300px',
        '& p': {
          lineBreak: 'anywhere',
        },
      },
      '&.study_short_title': {
        minWidth: '300px',
      },
      '&.md5sum': {
        minWidth: '160px',
        '& p': {
          lineBreak: 'anywhere',
        },
      },
      '&.num_of_participants': {
        minWidth: '150px',
        '& p': {
          lineBreak: 'anywhere',
        },
      },
      '&.num_of_samples': {
        minWidth: '150px',
        '& p': {
          lineBreak: 'anywhere',
        },
      },
      '&.num_of_files': {
        minWidth: '150px',
        '& p': {
          lineBreak: 'anywhere',
        },
      },
      '&.diagnosis': {
        minWidth: '300px',
        '& p': {
          lineBreak: 'anywhere',
        },
      },
      '&.anatomic_site': {
        minWidth: '300px',
        '& p': {
          lineBreak: 'anywhere',
        },
      },
      '&.file_type': {
        minWidth: '200px',
        '& p': {
          lineBreak: 'anywhere',
        },
      },
      '&.acl': {
        textAlign: 'center',
      },
    },
  },
}

export const extendedView = {
  MuiIconButton: {
    root: {
      padding: '0 0 0 0',
    },
  },
  tblTopPgn: {
    MuiTablePagination: {
      root: {
        paddingRight: '50px',
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

export const toolbar = {
  MuiToolbar: {
    root: {
      borderTop: '1px solid #8A7F7C',
      '& div' :{
        fontFamily: 'Open Sans',
        fontSize: '14px',
      }
    },
    regular: {
      '@media (min-width: 600px)': {
        minHeight: '35px',
      },
    },
  },
};

export const tblPgn = {
  MuiTablePagination: {
    root: {
      paddingRight: '50px',
      marginLeft: 'auto',
      // borderBottom: '1px solid #8A7F7C',
      '&:last-child': {
        paddingRight: '50px',
      }
    },
    toolbar: {
      minHeight: '40px',
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
    }
  },
  MuiMenuItem: {
    root: {
      fontFamily: 'Open Sans',
      fontSize: '14px',
      padding: '2px 8px',
      paddingTop: '2px',
      paddingBottom: '2px',
      minHeight: '24px',
    }
  },
  MuiListItem: {
    button: {
      '&:hover': {
        backgroundColor: '#F5F5F5',
        color: 'rgb(96, 121, 123)',
      }
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
      borderTop: '3px solid #8A7F7C',
      borderBottom: '2px solid #8A7F7C',
    },
  },
};

export const themeConfig = {
  tblHeader,
  tblBody,
  tblContainer,
  tblPgn,
  extendedView,
  toolbar,
};
