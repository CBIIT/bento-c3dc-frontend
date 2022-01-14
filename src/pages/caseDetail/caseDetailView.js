import React from 'react';
import {
  Grid,
  withStyles,
} from '@material-ui/core';
// import { useDispatch } from 'react-redux';
import { getOptions, getColumns } from 'bento-components';
// import StatsView from '../../components/Stats/StatsView';
import { Typography } from '../../components/Wrappers/Wrappers';
import GridWithFooter from '../../components/GridWithFooter/GridView';
import icon from '../../assets/icons/Cases.Icon.svg';
import Subsection from '../../components/PropertySubsection/caseDetailSubsection';
import CustomBreadcrumb from '../../components/Breadcrumb/BreadcrumbView';
import TabThemeProvider from './components/tabThemeConfig';
import CustomStatsView from '../../components/Stats/CustomStatsView';
import {
  caseHeader,
  leftPanel,
  rightPanel,
  table1,
  table2,
  table3,
  table4,
  table5,
  tooltipContent,
  tab,
  statBarItems,
} from '../../bento/caseDetailData';
import Snackbar from '../../components/Snackbar';
import Tab from './components/Tab';
import TabPanel from './components/TabPanel';

// Main case detail component
const CaseDetail = ({ data, classes }) => {
  const [snackbarState, setsnackbarState] = React.useState({
    open: false,
    value: 0,
  });
  const [currentTab, setCurrentTab] = React.useState(0);
  const handleTabChange = (event, value) => {
    setCurrentTab(value);
  };

  function openSnack(value1) {
    setsnackbarState({ open: true, value: value1 });
  }
  function closeSnack() {
    setsnackbarState({ open: false });
  }

  function getBorderStyle() {
    const style = '3px solid #42779a';
    return `${style}`;
  }

  function getTableColor() {
    return `${tab.items[currentTab].primaryColor}`;
  }

  // make sure dashboard data has been loaded first for stats bar to work
  React.useEffect(() => {
    // dispatch(fetchDataForDashboardDataTable());
  }, []);

  const stat = {
    numOfPrograms: undefined,
    num_of_studies: undefined,
    numberOfSubjects: 1,
    numberOfFiles: (data.files && data.files.length) || 0,
  };

  const breadCrumbJson = [{
    name: 'ALL CASES /',
    to: '/cases',
    isALink: true,
  }];

  function tableGenerator(tableData) {
    return (
      <div id="case_detail_table_associated_files" className={classes.tableContainer}>
        <div className={classes.tableDiv}>
          <Grid item xs={12}>
            <Grid container spacing={4}>
              <Grid item xs={12}>
                <GridWithFooter
                  data={data[tableData.subjectDetailField]}
                  title={(
                    <div className={classes.tableTitle}>
                      <span className={classes.tableHeader}>{tableData.tableTitle}</span>
                    </div>
                      )}
                  columns={getColumns(tableData, classes, data)}
                  options={getOptions(tableData, classes)}
                  customOnRowsSelect={tableData.customOnRowsSelect}
                  openSnack={openSnack}
                  closeSnack={closeSnack}
                  disableRowSelection={tableData.disableRowSelection}
                  buttonText={tableData.buttonText}
                  saveButtonDefaultStyle={tableData.saveButtonDefaultStyle}
                  ActiveSaveButtonDefaultStyle={tableData.ActiveSaveButtonDefaultStyle}
                  DeactiveSaveButtonDefaultStyle={tableData.DeactiveSaveButtonDefaultStyle}
                  tooltipMessage={tableData.tooltipMessage}
                  tooltipContent={tooltipContent}
                />
              </Grid>
            </Grid>
          </Grid>
        </div>
      </div>
    );
  }

  return (
    <>
      <Snackbar
        snackbarState={snackbarState}
        closeSnack={closeSnack}
        autoHideDuration={3000}
        classes={classes}
      />
      {/* <StatsView data={stat} /> */}
      <CustomStatsView data={stat} displayItems={statBarItems} />
      <div className={classes.container}>
        <div className={classes.innerContainer}>
          <div className={classes.header}>
            <div className={classes.logo}>
              <img
                className={classes.caseIcon}
                src={icon}
                alt="Bento case detail header logo"
              />

            </div>
            <div className={classes.headerTitle}>
              <div className={classes.headerMainTitle}>
                {`${caseHeader.label} :`}
                { data[caseHeader.dataField]
                  ? (
                    <span className={classes.headerMainTitleTwo}>
                      {' '}
                      {data[caseHeader.dataField]}
                    </span>
                  )
                  : (
                    <Typography variant="h5" color="error" size="sm">
                      {`"${caseHeader.dataField}" is not a valid property name`}
                    </Typography>
                  )}
              </div>
              <div className={classes.breadCrumb}>
                {' '}
                <CustomBreadcrumb data={breadCrumbJson} />
              </div>
            </div>
          </div>

          <Grid container spacing={1} className={classes.detailContainer}>
            {/* Left panel */}
            <Grid
              item
              sm={rightPanel.length > 0 ? 6 : 12}
              xs={12}
              className={[classes.detailPanel, classes.leftPanel]}
            >
              <div className={classes.innerPanel}>
                <Grid container spacing={2}>
                  {leftPanel.slice(0, 3).map((section) => (
                    <Subsection
                      key={section.sectionHeader}
                      config={section}
                      data={data}
                    />
                  ))}
                </Grid>
              </div>
            </Grid>
            {/* Left panel end */}
            {/* Right panel */}
            {rightPanel.length > 0 ? (
              <Grid item sm={6} xs={12} className={[classes.detailPanel, classes.rightPanel]}>
                <div style={{ paddingLeft: '7px' }} className={classes.innerPanel}>
                  <Grid container spacing={2}>
                    {rightPanel.slice(0, 3).map((section) => (
                      <Subsection
                        key={section.sectionHeader}
                        config={section}
                        data={data}
                      />
                    ))}
                  </Grid>
                </div>
              </Grid>
            ) : ''}
            {/* Right panel end */}
          </Grid>
        </div>
      </div>
      <div id="case_detail_table_associated_files" className={classes.tableContainer}>
        <div className={classes.tableDiv}>
          <Grid container>
            <Grid item xs={12}>
              <TabThemeProvider tableBorder={getBorderStyle()} tablecolor={getTableColor()}>
                <Tab
                  styleClasses={classes}
                  tabItems={tab.items}
                  currentTab={currentTab}
                  handleTabChange={handleTabChange}
                />
              </TabThemeProvider>
            </Grid>
          </Grid>
        </div>
      </div>
      <TabPanel value={currentTab} index={0}>
        {table1.display
          ? (tableGenerator(table1)) : ''}
      </TabPanel>
      <TabPanel value={currentTab} index={1}>
        {table2.display
          ? (tableGenerator(table2)) : ''}
      </TabPanel>
      <TabPanel value={currentTab} index={2}>
        {table3.display
          ? (tableGenerator(table3)) : ''}
      </TabPanel>
      <TabPanel value={currentTab} index={3}>
        {table4.display
          ? (tableGenerator(table4)) : ''}
      </TabPanel>
      <TabPanel value={currentTab} index={4}>
        {table5.display
          ? (tableGenerator(table5)) : ''}
      </TabPanel>
      <div className={classes.blankSpace} />
    </>
  );
};

const styles = (theme) => ({
  container: {
    backgroundColor: '#FFFFFF',
    padding: '0 32px',
  },
  innerContainer: {
    maxWidth: '1340px',
    margin: '0 auto',
    padding: '38px 0 0 0',
    fontFamily: theme.custom.fontFamily,
    background: '#FFFFFF',
  },
  root: {
    fontFamily: theme.custom.fontFamily,
    fontSize: '12px',
    letterSpacing: '0.025em',
    color: '#000',
    background: '#f3f3f3',
  },
  header: {
    paddingRight: '32px',
    borderBottom: '#42779A 10px solid',
    height: '80px',
    maxWidth: theme.custom.maxContentWidth,
    margin: 'auto auto 10px auto',
  },
  caseIcon: {
    height: '94px',
  },
  headerTitle: {
    maxWidth: theme.custom.maxContentWidth,
    margin: 'auto',
    float: 'left',
    paddingLeft: '98px',
    width: 'calc(100% - 265px)',
  },
  headerMainTitle: {
    fontFamily: 'Lato',
    color: '#274FA5',
    fontSize: '26px',
    lineHeight: '24px',
    paddingLeft: '0px',
    paddingTop: '20px',
  },
  headerMainTitleTwo: {
    fontWeight: 'bold',
    letterSpacing: '0.025em',
  },
  logo: {
    position: 'absolute',
    float: 'left',
    marginTop: '-6px',
    filter: 'drop-shadow( 2px 2px 2px rgba(0, 0, 0, 0.2))',
  },
  link: {
    color: '#DC762F',
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
  detailContainer: {
    maxWidth: theme.custom.maxContentWidth,
    margin: 'auto',
    padding: '26px 10px 26px 0px',
    fontFamily: theme.custom.fontFamily,
    letterSpacing: '0.014em',
    color: '#000000',
    size: '12px',
    lineHeight: '23px',
  },
  detailPanel: {
    paddingTop: '0 !important',
    paddingBottom: '0 !important',
    borderRight: '1px solid #81A6BA',
  },
  leftPanel: {
    paddingLeft: '25px !important',
  },
  rightPanel: {
    paddingLeft: '16px !important',
  },
  innerPanel: {
    height: '100%',
    minHeight: '209px',
    maxHeight: '380px',
    overflowY: 'auto',
    overflowX: 'hidden',
    paddingLeft: '0px',
    scrollbarColor: '#697270',
  },
  innerPanelRight: {
    paddingLeft: '30px',
  },
  tableContainer: {
    background: '#f3f3f3',
  },
  tableDiv: {
    maxWidth: '1340px',
    margin: 'auto',
    paddingTop: '30px',
    paddingLeft: '0px',
  },
  tableTitle: {
    textTransform: 'uppercase',
    fontFamily: 'Lato',
    fontSize: '17px',
    letterSpacing: '0.025em',
    color: '#3695A9',
  },
  breadCrumb: {
    paddingTop: '3px',
  },
  snackBarMessageIcon: {
    verticalAlign: 'middle',
  },
  externalLinkIcon: {
    width: '14.5px',
    verticalAlign: 'sub',
    marginLeft: '4px',
    paddingBottom: '2px',
  },
  blankSpace: {
    height: '73px',
    background: '#f3f3f3',
  },
});

export default withStyles(styles, { withTheme: true })(CaseDetail);
