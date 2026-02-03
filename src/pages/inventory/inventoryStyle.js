import { obtainColorFromFacetIndex } from "../../bento/dashTemplate";

export default () => ({
    customButton: {
      borderRadius: '9px',
      maxWidth: '30px',
      maxHeight: '30px',
      minWidth: '30px',
      minHeight: '30px',
      marginTop: '0px',
      fontSize: 9,
      textTransform: 'none',
      color: '#3d4241',
      marginLeft: '0px',
      border: '1px solid #063134 !important',
      backgroundColor: '#ffffff',
      '&:hover': {
        backgroundColor: '#063134',
        border: '1px solid #063134',
      },
      '&:disabled': {
        border: '1px solid #AEBDBE !important',
      },
  },
  divider: {
    marginLeft: '0px',
    marginRight: '0px',
    height: '8px',
    // backgroundColor: '#4D889E',
    '&.divider0': {
      backgroundColor: obtainColorFromFacetIndex(0).facetCategoryColor,
    },
    '&.divider1': {
      backgroundColor: obtainColorFromFacetIndex(1).facetCategoryColor,
    },
    '&.divider2': {
      backgroundColor: obtainColorFromFacetIndex(2).facetCategoryColor,
    },
    '&.divider3': {
      backgroundColor: obtainColorFromFacetIndex(3).facetCategoryColor,
    },
    '&.divider4': {
      backgroundColor: obtainColorFromFacetIndex(4).facetCategoryColor,
    },
    '&.divider5': {
      backgroundColor: obtainColorFromFacetIndex(5).facetCategoryColor,
    },
    '&.divider6': {
      backgroundColor: obtainColorFromFacetIndex(6).facetCategoryColor,
    },
  },
  floatRight: {
    display: 'flex',
    backgroundColor: '#DBF0F3',
    padding: '8px 0px 8px 12.5px',
  },
  resetText: {
    marginTop: '0px',
    marginLeft: '8px',
    color: '#415153',
    fontSize: 14,
    fontFamily: 'Nunito Sans',
    fontWeight: 600,
    lineHeight: '30px',
  },
  resetTextDisabled: {
    marginTop: '0px',
    marginLeft: '8px',
    color: '#AEBDBE',
    fontSize: 14,
    fontFamily: 'Nunito Sans',
    fontWeight: 600,
    lineHeight: '30px',
  },
  backdrop: {
    width: '100%',
    zIndex: 99999,
    background: 'rgba(0, 0, 0, 0.1)',
  },
  dashboardContainer: {
    backgroundColor: '#FFFFFF',
  },
  contentBox: {
    paddingTop: '0px',
    borderTop: '1px solid #B0B0B0',
  },
  content: {
    display: 'flex',
    maxWidth: '1800px',
    margin: 'auto',
  },
  activeFiltersCountContainer: {
    borderBottom: '#000000 1px solid',
  },
  activeFiltersCount: {
    color: '#415153',
    fontFamily: 'Open Sans',
    fontWeight: 400,
    fontSize: 14,
    textAlign: 'center',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '8px 16px 8px 4px',
    margin: '0 12.5px',
    borderTop: '#ADADAD 0.5px solid',
    '& span': {
      color: '#415153',
      fontFamily: 'Nunito',
      fontSize: '11px',
      fontWeight: 600,
      border: '0.5px solid #415153',
      padding: '0 4px',
    }
  },
  activeFilterLegend: {
    color: '#312E2E',
    fontFamily: 'Open Sans',
    fontWeight: 400,
    fontSize: 14,
    letterSpacing: '0',
    margin: '0 16px',
    padding: '16px 0',
    fontStyle: 'italic',
    '& svg': {
      marginLeft: '10px',
    }
  },
  sideBarCover: {
    marginLeft: '-100px',
    width: '100px',
    backgroundColor: 'red',
    position: 'absolute',
  },
  sideBar: {
    width: '262px',
    overflowX: 'hidden',
    borderLeft: 'thin solid #8A7F7C',
    borderRight: 'thin solid #8A7F7C',
    overflow: 'auto',
    zIndex: '99',
    position: 'relative',
    backgroundColor: '#FFFFFF',
    display: 'flex',
    flexDirection: 'column',
  },
  sideBarMenuSider: {
    width: '262px',
    backgroundColor: '#DBF0F3',
  },
  siderContent: {
    listStyle: 'none',
    padding: '0px',
    margin: '0px',
    backgroundColor: '#f4f4f4',
    '& li': {
      height: '53px',
      lineHeight: '53px',
      padding: '0 5px 0 13px',
      minHeight: '48px',
      paddingLeft: '14px',
      marginBottom: '-1px',
      paddingRight: '11px',
    }
  },
  categoryContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: '100%',
  },
  categoryTitleContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  facetCategory: {
    cursor: 'pointer',
    '&:hover': {
      opacity: '0.8',
    }
  },
  facetCategoryActive: {
    cursor: 'pointer',
    backgroundColor: '#00546e',
  }, 
  categoryIcon: {
    lineHeight: '22px',
    fontSize: '22px',
    verticalAlign: '-5px',
    marginRight: '2px',
  },
  categoryTitle: {
    color: '#000000',
    display: 'flex',
    zIndex: 2,
    fontSize: '18.5px',
    alignItems: 'center',
    fontFamily: 'Poppins',
    fontWeight: 500,
    marginLeft: '3px',
    marginRight: '6px',
    letterSpacing: '-0.02em',
    justifyContent: 'space-between',
    textTransform: 'uppercase',
  },
  sidebarMenuContentPanel: {
    width: '270px',
    padding: '16px 16px 0 16px',
  },
  contentPanelHeader: {
    display: 'flex',
    justifyContent: 'flex-end',
    fontSize: '14px',
    height: '22px',
    cursor: 'pointer',
    marginRight: '10px',
    marginTop: '1.5px',
    '& a': {
      width: '16px',
      '& svg': {
        width: '16px',
        height: '16px',
      }
    }
  },
  contentPanelBody: {
    paddingTop: '0px',
  },
  rightContent: {
    width: 'calc(100% - 540px)',
    position: 'relative',
    borderRight: 'thin solid #B1B1B1',
    borderLeft: 'thin solid #B1B1B1',
  },
  goToCartLink: {
    fontFamily: 'Lato',
    fontSize: '12px',
    textAlign: 'right',
    height: '65px',
    padding: '5px 100px 0 0',
    '& a': {
      color: '#3E6886',
      borderBottom: '1px solid #3E6886',
      textDecoration: 'none',
      '&:hover': {
        textDecoration: 'underline',
      }
    }
  },
});
