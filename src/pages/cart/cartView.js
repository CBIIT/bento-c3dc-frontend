import React from 'react';
import { Grid, withStyles } from '@material-ui/core';
import { TableView } from '@bento-core/paginated-table';
import { configColumn } from './tableConfig/Column';
import { themeConfig } from './tableConfig/Theme';
import styles from './cartView.style';
import CartWrapper from './cartWrapper';

const CartView = (props) => {
  const {
    classes,
    config,
    filesId = [],
  } = props;

  /**
  * configure table state
  */
  const initTblState = (initailState) => ({
    ...initailState,
    title: 'myFiles',
    query: config.api,
    dataKey: config.dataKey,
    columns: configColumn({ columns: config.columns, ...props }),
    selectedRows: [],
    tableMsg: config.tableMsg,
    paginationAPIField: config.paginationAPIField,
    sortBy: config.defaultSortField,
    sortOrder: config.defaultSortDirection,
    rowsPerPage: 10,
    page: 0,
  });

  const variables = {};
  variables.file_ids = filesId;
  return (
    <Grid className={classes.backgroundContainer}>
      <Grid item xs={12}>
        <div className={classes.myFilesWrapper}>
          <div className={classes.textContainer}>
            <p>Thank you for your interest in CCDI supported data.</p>
            Selecting the “Download Manifest” button will produce a manifest of assay files for items within the cart.  This manifest file can be uploaded in the <a className={classes.cartIntroLink} href="https://www.cancergenomicscloud.org/" target="_blank" rel="noopener noreferrer">Cancer Genomics Cloud</a> to access and analyze controlled access information. Additional help and information about the CGC use and access is available at the <a className={classes.cartIntroLink} href="https://docs.cancergenomicscloud.org/" target="_blank" rel="noopener noreferrer">CGC Knowledge Center</a>.
          </div>
          <CartWrapper
            classes={classes}
            queryVariables={variables}
          >
            <TableView
              initState={initTblState}
              themeConfig={themeConfig}
              queryVariables={variables}
              totalRowCount={filesId.length}
            />
          </CartWrapper>
        </div>
      </Grid>
    </Grid>
  );
};

export default withStyles(styles)(CartView);
