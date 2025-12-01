/* eslint-disable block-scoped-var */
/* eslint-disable no-plusplus */
/* eslint-disable no-unused-vars */
/* eslint-disable guard-for-in */
/* eslint-disable no-var */
/* eslint-disable vars-on-top */
/* eslint-disable no-restricted-syntax */
/* eslint-disable arrow-body-style */
import React, { useState } from 'react';
import {
  useLocation,
  useNavigate,
} from "react-router-dom";
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
import styles from './BentoFacetFilterStyle';
import { NewFacetFilter } from '@bento-core/facet-filter';
import { generateQueryStr } from '@bento-core/util';
import { facetsConfig, facetSectionVariables, resetIcon, sectionLabel, queryParams } from '../../../bento/dashTemplate';
import FacetFilterThemeProvider from './NewFilterThemeConfig';
import {
  getAllParticipantIds, getAllIds,
} from './BentoFilterUtils';

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
    updateBrowserUrl: (query, navigate, newUniqueValue) => {
      const paramValue = {
        'p_id': newUniqueValue.map((data) => data.title).join('|')
      };
      const queryStr = generateQueryStr(query, queryParams, paramValue);
      navigate(`/explore${queryStr}`);
    },
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
    updateBrowserUrl: (query, navigate, filename, fileContent, matchIds, unmatchedIds) => {
      const fc = fileContent
        .split(/[,\n]/g)
        .map((e) => e.trim().replace(/\r/g, '').toUpperCase())
        .filter((e) => e && e.length > 1);
      const paramValue = {
        'u': matchIds.map((data) => data.participant_id).join('|'),
        'u_fc': fc.join('|'),
        'u_um': unmatchedIds.join('|'),
      };
      const queryStr = generateQueryStr(query, queryParams, paramValue);
      navigate(`/explore${queryStr}`);
    },
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
    inputPlaceholder: 'e.g. PARTICIPANT-101025, PARTICIPANT-101026, PARTICIPANT-101027',
    inputTooltip: 'Enter valid Participant IDs.',
    uploadTooltip: 'Select a file from your computer.',
    accept: '.csv,.txt',
    maxSearchTerms: 5000,
    matchedId: 'participant_id',
    matchedLabel: 'Submitted Participant ID',
    associateId: 'dbgap_accession',
    associateLabel: '',
    projectName: 'CCDI Hub',
    caseIds: 'Participant IDs',
  },
});

const NewBentoFacetFilter = ({
  classes,
  searchData,
  activeFilters,
  selectedSection,
  unknownAgesState,
}) => {
  /** Note:
  * Generate Custom facet Section Component
  * 1. Config local search input for Case
  * 2. Facet Section Name
  */
  const CustomFacetSection = ({ section, expanded }) => {
    const { name } = section;
    const { hasSearch = false } = facetSectionVariables[name];

    let searchConfig = {
      title: 'Participants',
    }

    return (
      <>
        {hasSearch && (
          <SearchView
            classes={classes}
            SearchBox={SearchBox}
            UploadModal={UploadModal}
            hidden={!expanded}
            config={searchConfig}
            queryParams={queryParams}
          />
        )}
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

  return (
    <div>
      {
        selectedSection !== -1 && (
          <FacetFilterThemeProvider>
            <NewFacetFilter
              data={searchData}
              activeFilters={activeFilters}
              facetSectionConfig={facetSectionVariables}
              facetsConfig={facetsConfig}
              selectedSection={selectedSection}
              CustomFacetSection={CustomFacetSection}
              CustomFacetView={CustomFacetView}
              queryParams={queryParams}
              unknownAgesState={unknownAgesState}
              searchFacetClasses={classes}
            />
          </FacetFilterThemeProvider>
        )
      }
    </div>
  );
};

export default withStyles(styles)(NewBentoFacetFilter);
