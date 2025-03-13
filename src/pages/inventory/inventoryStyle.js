export default () => ({
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
  sideBar: {
    width: '270px',
    maxHeight: '1300px',
    overflowX: 'hidden',
    backgroundColor: 'transparent',
    borderLeft: 'thin solid #B1B1B1',
    borderBottom: 'thin solid #B1B1B1',
    overflow: 'auto',
    zIndex: '99',
    '&::-webkit-scrollbar': {
      width: "7px"
    },
    '&::-webkit-scrollbar-thumb': {
      width: "7px",
      backgroundColor: '#003F74'
    },
    '&::-webkit-scrollbar-track': {
      background: '#CECECE',
    },
  },
  rightContent: {
    width: 'calc(100% - 270px)',
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
