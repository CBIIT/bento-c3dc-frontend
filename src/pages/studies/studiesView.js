import React from 'react';
import {
  Grid,
  withStyles,
} from '@material-ui/core';
import { 
  TableContextProvider,
  TableView,
} from '@bento-core/paginated-table';
import { table } from '../../bento/studiesData';
import Stats from '../../components/Stats/GlobalStatsController';
import { Typography } from '../../components/Wrappers/Wrappers';
import { themeConfig } from './tableConfig/Theme';
import studiesListingBackground from '../../assets/studies/studiesListingBackground.png';


const initTblState = (initailState) => ({
  ...initailState,
  title: table.name,
  columns: table.columns,
  selectedRows: [],
  tableMsg: table.tableMsg,
  sortBy: table.defaultSortField,
  sortOrder: table.defaultSortDirection,
  rowsPerPage: 10,
  dataKey: table.dataKey,
  page: 0,
  paginationCustomStyle : {
    topPagination: {

    },
    bottomPagination: {
      borderTop: '3px solid #8A7F7C',
    },
  },
  extendedViewConfig: {
    pagination: true,
  },
  showDownloadIcon: false,
})

const Studies = ({ classes, data }) => {
  return (
    <>
      {
        <Stats />
        }
      <div className={classes.tableContainer}>
        <div className={classes.container}>
          <div className={classes.header}>
            <div className={classes.headerTitle}>
                <span>
                  <Typography>
                    <span className={classes.headerMainTitle}>{table.title}</span>
                  </Typography>
                </span>
            </div>
          </div>

          { table.display ? (
            <div id="table_studies" className={classes.tableDiv}>
              <TableContextProvider>
                  <Grid container>
                    <Grid item xs={12} id={table.tableID}>
                      <TableView
                        initState={initTblState}
                        server={false}
                        themeConfig={themeConfig}
                        tblRows={data[table.dataField]}
                        totalRowCount={data[table.dataField].length}
                        activeTab={true}
                      />
                    </Grid>
                  </Grid>
              </TableContextProvider>
            </div>
            
          ) : ''}
        </div>

      </div>
    </>
  );
};

const styles = (theme) => ({

  link: {
    textDecoration: 'none',
    fontWeight: 'bold',
    color: theme.palette.text.link,
    '&:hover': {
      textDecoration: 'underline',
    },
  },
  card: {
    minHeight: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  container: {
    margin: 'auto',
    maxWidth: '1440px',
    padding: '10px 94px 10px 94px',
  },
  paper: {
    textAlign: 'center',
  },
  fakeToolbar: {
    ...theme.mixins.toolbar,
  },
  root: {
    fontFamily: '"Lato Regular","Open Sans", sans-serif',
    fontSize: '9pt',
    letterSpacing: '0.025em',
    color: '#000',
    background: '#eee',
  },
  header: {
    paddingTop: '50px',
    paddingBottom: '38px',
    display: 'flex',
  },
  headerMainTitle: {
    fontFamily: 'Poppins',
    fontWeight: '500',
    color: '#FFFFFF',
    fontSize: '35px',
    lineHeight: '45px',
  },
  headerTitle: {
    maxWidth: '1440px',
    margin: 'auto',
  },
  logo: {
    position: 'absolute',
    float: 'left',
    marginLeft: '-17px',
    width: '100px',
    filter: 'drop-shadow(-3px 2px 6px rgba(27,28,28,0.29))',
  },
  tableContainer: {
    backgroundImage: `url(${studiesListingBackground})`,
    backgroundSize: 'cover',
    width: '100%',
    minHeight: '600px',  
    paddingBottom: '50px',
  },
  tableDiv: {
    padding: '25px 40px',
    background: 'white',
    borderRadius: '20px',
    border: '2.5px solid #9FBEB5',
  },
  externalLinkIcon: {
    width: '14.5px',
    verticalAlign: 'sub',
    marginLeft: '4px',
    paddingBottom: '2px',
  },
  linkSpan: {
    display: '-webkit-box',
  },
});

export default withStyles(styles, { withTheme: true })(Studies);
