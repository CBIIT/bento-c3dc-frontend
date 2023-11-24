import React from 'react';
import { withStyles } from '@material-ui/core';
import {
  SEARCH_PAGE_RESULT_ABOUT_PUBLIC,
} from '../../../../bento/sitesearch';
import styles from '../../styles';
import SearchViewTabs from './searchViewTabs';

const getTabProperties = (classes, searchResults, allLabel) => [
  {
    name: 'About',
    datafield: 'about_page',
    classes: {
      root: classes.buttonRoot,
      wrapper: classes.aboutTab,
    },
    queryForApi: SEARCH_PAGE_RESULT_ABOUT_PUBLIC,
    count: searchResults.about_count || 0,
    value: '1',
  },
];

const PublicTabView = ({
  classes, options, searchText,
}) => {
  const { searchResults } = options;
  const tabProperties = getTabProperties(classes, searchResults);

  const AllLabel = () => (
    <div>
      <img
        className={classes.filterIcon}
        src="https://raw.githubusercontent.com/CBIIT/datacommons-assets/main/bento/images/icons/svgs/FunnelIcon.svg"
        alt="filter icon"
      />
      <span classes={classes.allText}>ALL</span>
    </div>
  );

  return (
    <SearchViewTabs
      AllLabel={AllLabel}
      classes={classes}
      isPublic
      options={{ ...options, properties: tabProperties }}
      searchText={searchText}
    />
  );
};

export default withStyles(styles, { withTheme: true })(PublicTabView);
