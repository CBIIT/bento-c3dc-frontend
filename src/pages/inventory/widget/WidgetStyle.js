const styles = (theme) => ({
  dashboardContainer: {
    backgroundColor: '#FFFFFF',
  },
  dashboardDivider: {
    height: 16,
    marginTop: '32px',
    backgroundColor: '#E2E7EC',
  },
  dashboardDividerTop: {
    height: 16,
    backgroundColor: theme.palette.widgetBackground.main,
  },
  rightContent: {
    maxWidth: 'calc(100% - 250px)',
    position: 'relative',
    borderRight: 'thin solid #B1B1B1',
  },
  content: {
    display: 'flex',
    maxWidth: '1800px',
    margin: 'auto',
  },
  widgetsContainer: {
    background: theme.palette.widgetBackground.main,
  },
  widgetTitle: {
    fontSize: '19px !important',
    fontWeight: '500',
    fontFamily: 'Lato',
    color: theme.palette.text.primary,
    textAlign: "start",
    width: "100%",
  },
  contentShift: {
    width: `calc(100vw - ${theme.custom.drawerWidth})`,
    marginLeft: theme.custom.drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  card: {
    minHeight: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  paper: {
    textAlign: 'center',
  },
  fakeToolbar: {
    ...theme.mixins.toolbar,
  },
  sunburst: {
    textAlign: 'center',
  },
  widgetInner: {
    marginTop: '-8px',
   // borderBottom: '6px solid red',
  },
  widgetsCollapse: {
    background: theme.palette.widgetBackground.main,
    position: 'relative',
  },
  floatRight: {
    top: '-1px',
    right: '80px',
    position: 'absolute',
    zIndex: 1,
  },
  floatLeft: {
    float: 'left',
  },
  customSwitch: {
    marginTop: '-6px',
  },
  customButton: {
    borderRadius: '0 0 18px 18px',
    minHeight: '20px',
    fontSize: 12,
    color: '#ffffff',
    textTransform: 'capitalize',
    backgroundColor: '#686F7F',
    marginRight: '4px',
    fontFamily: theme.custom.fontFamilySans,
    // marginTop: '-4px',
    '&:hover': {
      backgroundColor: '#566672',
    },
  },
  backgroundWidgets: {
    background: theme.palette.widgetBackground.main,
  },
  sideBar: {
    width: '250px',
    overflowX: 'hidden',
    backgroundColor: 'transparent',
    borderRight: 'thin solid #B1B1B1',
    borderLeft: 'thin solid #B1B1B1',
    overflow: 'auto',
    zIndex: '99',
  },
  statsBar: {
    position: 'fixed',
  },
  padding:{
    padding: '30px',
  },
  widgetBox: {
   transition: 'box-shadow .3s',
   borderRadius: '20px', 
    '&:hover': {
      boxShadow: '0 0 11px rgba(33,33,33,.3)',
    },
  },
  widgetTotalTooltipIcon: {
    width: '10px',
    transform: 'translateY(-10px) translateX(1px)',
  },
});

export default styles;
