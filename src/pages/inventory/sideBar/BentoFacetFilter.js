/* eslint-disable block-scoped-var */
/* eslint-disable no-plusplus */
/* eslint-disable no-unused-vars */
/* eslint-disable guard-for-in */
/* eslint-disable no-var */
/* eslint-disable vars-on-top */
/* eslint-disable no-restricted-syntax */
/* eslint-disable arrow-body-style */
import React, { useEffect, useState } from 'react';
import {
  AccordionSummary,
  Button,
  withStyles,
} from '@material-ui/core';
import {
  ArrowDropDown as ArrowDropDownIcon,
} from '@material-ui/icons';
import clsx from 'clsx';
import {
  resetAllData, chunkSplit,
  SearchView, SearchBoxGenerator, UploadModalGenerator,
} from '@bento-core/local-find';
import store from '../../../store';
import styles, { uploadModalStyles } from './BentoFacetFilterStyle';
import { FacetFilter, ClearAllFiltersBtn } from '@bento-core/facet-filter';
import { facetsConfig, facetSectionVariables, resetIcon, sectionLabel } from '../../../bento/dashTemplate';
import FacetFilterThemeProvider from './FilterThemeConfig';
import {
  getAllParticipantIds, getAllIds,
} from './BentoFilterUtils';
import { toUpper } from 'lodash';

const CustomExpansionPanelSummary = withStyles({
  root: {
    marginBottom: -1,
    paddingTop: 6,
    paddingLeft: 14,
    paddingRight: 14,
    minHeight: 48,
    '&$expanded': {
      minHeight: 48,
    },
  },
  content: {
    display: 'block',
    textTransform: 'uppercase',
    // '&$expanded': {
    //   margin: '4px 0px 15px 0px',
    // },
  },
  expanded: {},
})(AccordionSummary);

// Generate SearchBox Component
const { SearchBox } = SearchBoxGenerator({
  config: {
    inputPlaceholder: 'Participant ID Search',
    noOptionsText: 'No matching items found',
    searchType: 'participantIds',
  },
  functions: {
    getSuggestions: async (searchType) => {
      try {
        const response = await getAllIds(searchType).catch(() => []);
        return response && response[searchType] instanceof Array
          ? response[searchType].map((id) => ({ type: searchType, title: id }))
          : [];
      } catch (e) {
        return [];
      }
    },
  },
});

// Generate UploadModal Component
const { UploadModal } = UploadModalGenerator({
  functions: {
    searchMatches: async (inputArray) => {
      try {
        // Split the search terms into chunks of 500
        const caseChunks = chunkSplit(inputArray, 500);
        const matched = (await Promise.allSettled(caseChunks.map((chunk) => getAllParticipantIds(chunk))))
          .filter((result) => result.status === 'fulfilled')
          .map((result) => result.value || [])
          .flat(1);

        // Combine the results and remove duplicates
        const unmatched = new Set(inputArray);
        matched.forEach((obj) => unmatched.delete(obj.participant_id.toUpperCase()));
        return { matched, unmatched: [...unmatched] };
      } catch (e) {
        return { matched: [], unmatched: [] };
      }
    },
  },
  config: {
    title: 'Upload Participants Set',
    inputPlaceholder: 'e.g. C3DC-PARTICIPANT-101025, C3DC-PARTICIPANT-101026, C3DC-PARTICIPANT-101027',
    inputTooltip: 'Enter valid Participant IDs.',
    uploadTooltip: 'Select a file from your computer.',
    accept: '.csv,.txt',
    maxSearchTerms: 1000,
    matchedId: 'participant_id',
    matchedLabel : 'Submitted Participant ID',
    associateId: 'dbgap_accession',
    associateLabel: '',
    projectName: 'C3DC',
    caseIds: 'Participant IDs',
  },

  customStyles : uploadModalStyles,
});

const BentoFacetFilter = ({
  classes,
  searchData,
  activeFilters,
}) => {
  /**
  * Clear All Filter Button
  * Custom button component
  * bento core params
  * 1. onClearAllFilters - dispatch clear all filters
  * 2. disable - true/ false
  */
  const CustomClearAllFiltersBtn = ({ onClearAllFilters, disable }) => {
    const [isHover, setIsHover] = useState(false);
    return (
      <div className={classes.floatRight}>
        <Button
          id="button_sidebar_clear_all_filters"
          variant="outlined"
          disabled={disable}
          onClick={() => {
            onClearAllFilters();
            store.dispatch(resetAllData());
          }}
          className={classes.customButton}
          classes={{ root: classes.clearAllButtonRoot }}
          onMouseEnter={() => setIsHover(true)}
          onMouseLeave={() => setIsHover(false)}
          style= { disable ? { border: '1px solid #AEBDBE' } : {}}
        >
          <img
            src={ disable ? resetIcon.src : ( isHover ? resetIcon.srcActiveHover : resetIcon.srcActive ) }
            height={resetIcon.size}
            width={resetIcon.size}
            alt={resetIcon.alt}
          />
        </Button>
        <span className={disable
          ? classes.resetTextDisabled : classes.resetText}
        >
          Clear all filtered selections
        </span>
      </div>
    );
  };

  /** Note:
  * Generate Custom facet Section Component
  * 1. Config local search input for Case
  * 2. Facet Section Name
  */
  const CustomFacetSection = ({ section }) => {
    const { name, expandSection } = section;
    const { hasSearch = false } = facetSectionVariables[name];

    const [expanded, setExpanded] = useState(expandSection);
    const [showSearch, setShowSearch] = useState(true);

    const toggleSearch = (e) => {
      e.stopPropagation();
      setShowSearch(!showSearch);
    };

    const collapseHandler = () => {
      setExpanded(!expanded);
    };

    let searchConfig = {
      title: 'Participants',
    }

    return (
      <>
        <CustomExpansionPanelSummary onClick={collapseHandler} id={section}>
          <div className={classes.sectionSummaryTextContainer}>
            {sectionLabel[name] !== undefined ? sectionLabel[name] : name}
            {hasSearch && (
              <div className={classes.findCaseButton} onClick={toggleSearch}>
                <img src="https://raw.githubusercontent.com/CBIIT/datacommons-assets/main/c3dc/images/icons/svgs/C3DCFacetLocalFindSearchIcon.svg" className={classes.findCaseIcon} alt="search" />
              </div>
            )}
          </div>
          {hasSearch && (
            <SearchView
              classes={classes}
              SearchBox={SearchBox}
              UploadModal={UploadModal}
              hidden={!expanded || !showSearch}
              config = {searchConfig}
            />
          )}
        </CustomExpansionPanelSummary>
      </>
    );
  };

  /**
  * Generate Custom facet View Component
  * 1. Config local search input for Case
  * 2. Facet Section Name
  */
  const CustomFacetView = ({ facet, facetClasses }) => {
    return (
      <>
        <CustomExpansionPanelSummary
          expandIcon={(
            <ArrowDropDownIcon
              classes={{ root: classes.dropDownIconSubSection }}
              style={{ fontSize: 26 }}
            />
          )}
          id={facet.label}
          className={classes.customExpansionPanelSummaryRoot}
        >
          <div
            id={facet.label}
            className={
              clsx(classes.sectionSummaryText, classes[facetClasses])
            }
          >
            {facet.label}
          </div>
        </CustomExpansionPanelSummary>
      </>
    );
  };

  if (activeFilters['dbgap_accession']) {
    facetSectionVariables['Study'].isExpanded = true;
  }
  
  function updateSubjects(obj) {
    if (Array.isArray(obj)) {
      
        return obj.map(item => updateSubjects(item));
    } else if (typeof obj === 'object' && obj !== null) {
        let newObj = {};
        for (let key in obj) {
            if (obj.hasOwnProperty(key)) {
                if (key === 'subjects') {
                    
                    newObj[key] = obj[key].toLocaleString();
                } else {
                    
                    newObj[key] = updateSubjects(obj[key]);

                }
            }
        }
        return newObj;
    }
    return obj;
}
  return (
    <div>
      <FacetFilterThemeProvider>
        <ClearAllFiltersBtn
          Component={CustomClearAllFiltersBtn}
          activeFilters={activeFilters}
        />
        <FacetFilter
          data={updateSubjects(searchData)}
          facetSectionConfig={facetSectionVariables}
          facetsConfig={facetsConfig}
          CustomFacetSection={CustomFacetSection}
          CustomFacetView={CustomFacetView}
        />
      </FacetFilterThemeProvider>
    </div>
  );
};

export default withStyles(styles)(BentoFacetFilter);
