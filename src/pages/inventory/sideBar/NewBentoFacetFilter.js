import React, { useMemo } from 'react';
/*
import {
  useLocation,
  useNavigate,
} from "react-router-dom";*/
import {
  AccordionSummary,
  withStyles,
} from '@material-ui/core';
import {
  ArrowDropDown as ArrowDropDownIcon,
} from '@material-ui/icons';
import clsx from 'clsx';
import {
  chunkSplit,
  SearchView, SearchBoxGenerator, UploadModalGenerator,
} from '@bento-core/local-find';
import styles from './BentoFacetFilterStyle';
import { NewFacetFilter } from '@bento-core/facet-filter';
import { facetsConfig, facetSectionVariables, queryParams } from '../../../bento/dashTemplate';
import FacetFilterThemeProvider from './NewFilterThemeConfig';
import {
  getAllParticipantIds, getAllIds,
} from './BentoFilterUtils';
import { useUrlManager } from '../../../hooks/useUrlManager';

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

const NewBentoFacetFilter = ({
  classes,
  searchData,
  activeFilters,
  selectedSection,
  unknownAgesState,
}) => {
  const updateUrl = useUrlManager('/explore');

  // Generate SearchBox Component with URL manager
  const { SearchBox } = useMemo(() => SearchBoxGenerator({
    config: {
      inputPlaceholder: 'Participant ID Search',
      noOptionsText: 'No matching items found',
      searchType: ['participantIds', 'associatedIds'],
    },
    functions: {
      updateBrowserUrl: (newUniqueValue) => {
        const paramValue = {
          'p_id': newUniqueValue.map((data) => data.title).join('|')
        };
        updateUrl(paramValue);
      },
      getSuggestions: async (searchType) => {
        try {
          const response = await getAllIds(searchType).catch(() => []);

          const participantSuggestions = response && response[searchType[0]] instanceof Array
            ? response[searchType[0]].map((id) => ({ type: searchType[0], title: id }))
            : [];

          const associatedIdsSuggestions = response && response[searchType[1]] instanceof Object
            ? response[searchType[1]].map((item) => ({ type: searchType[1], title: item.participant_id, synonym: item.associated_id }))
            : [];

          return [...participantSuggestions, ...associatedIdsSuggestions];
        } catch (e) {
          return [];
        }
      },
    },
  }), [updateUrl]);

  // Generate UploadModal Component with URL manager
  const { UploadModal } = useMemo(() => UploadModalGenerator({
    functions: {
      updateBrowserUrl: (_filename, fileContent, matchIds, unmatchedIds) => {
        const fc = fileContent
          .split(/[,\n]/g)
          .map((e) => e.trim().replace(/\r/g, '').toUpperCase())
          .filter((e) => e && e.length > 1);
        const paramValue = {
          'u': matchIds.map((data) => data.participant_id).join('|'),
          'u_fc': fc.join('|'),
          'u_um': unmatchedIds.join('|'),
        };
        updateUrl(paramValue);
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
      inputPlaceholder: 'e.g. C3DC-PARTICIPANT-101025, C3DC-PARTICIPANT-101026, C3DC-PARTICIPANT-101027',
      inputTooltip: 'Enter valid Participant IDs.',
      uploadTooltip: 'Select a file from your computer.',
      accept: '.csv,.txt',
      maxSearchTerms: 1000,
      mappedLabel: 'Participant record(s)',
      matchedId: 'participant_id',
      matchedLabel : 'Participant ID',
      associateId: 'study_id',
      associateLabel: 'Study ID',
      projectName: 'C3DC',
      caseIds: 'Participant ID(s)',
    },
  }), [updateUrl]);

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
      searchLabel: 'Demographics',
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
  const CustomFacetView = ({ facet, facetClasses, expanded }) => {
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
          className={(facet.slider || facet.search) && expanded ? classes.customExpansionPanelSummaryRootSpecial : classes.customExpansionPanelSummaryRoot}      >
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
              onUrlUpdate={updateUrl}
            />
          </FacetFilterThemeProvider>
        )
      }
    </div>
  );
};

export default withStyles(styles)(NewBentoFacetFilter);
