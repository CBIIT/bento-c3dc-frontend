import React from 'react';
import { connect, useDispatch } from 'react-redux';
import {
  useLocation
}  from "react-router-dom";
import { clearAllFilters, clearFacetSection, clearSliderSection, toggleCheckBox } from '@bento-core/facet-filter';
import { resetAllData, resetUploadData, updateAutocompleteData } from '@bento-core/local-find';
// import { updateImportfrom } from '../../../components/Inventory/InventoryState';
import store from '../../../store';
import { QueryBarGenerator } from '@bento-core/query-bar';
import { generateQueryStr } from '@bento-core/util';
import { 
  facetsConfig, 
  queryParams, 
  excludedParams, 
  ageRelatedParams 
} from '../../../bento/dashTemplate';
import { customStyles } from './QueryBarStyles';
import { Container, createTheme, ThemeProvider } from '@material-ui/core';
import theme from './QueryBarTheme';
import { generateUrl } from './QueryBarUtils';

/**
 * Generate the Explore Tab Query Bar
 *
 * @param {object} props
 * @param {object} props.data API search resultset
 * @param {object} props.statusReducer Facet Filter State
 * @param {object} props.localFind Local Find State
 * @param {object} props.unknownAgesState Unknown Ages State
 * @param {boolean} props.hasImportFrom Has Import From Data
 * @returns {JSX.Element}
 */
const QueryBarView = ({ data, statusReducer, localFind, unknownAgesState, hasImportFrom }) => {
  const dispatch = useDispatch();
  const query = new URLSearchParams(useLocation().search);

  const sectionOrder = facetsConfig.map((v) => v.datafield);

  // Helper function to sync participant IDs from Redux state to URL
  const syncParticipantIdsToUrl = (paramValue) => {
    /* eslint-disable no-param-reassign */
    // Sync autocomplete participant IDs
    if (localFind && localFind.autocomplete && localFind.autocomplete.length > 0) {
      paramValue.p_id = localFind.autocomplete.map((data) => data.title).join('|');
    } else {
      paramValue.p_id = '';
    }

    // Sync uploaded participant IDs
    if (localFind && localFind.upload && localFind.upload.length > 0) {
      paramValue.u = localFind.upload.map((data) => data.participant_id).join('|');

      // Sync upload metadata
      if (localFind.uploadMetadata && localFind.uploadMetadata.fileContent) {
        const fc = localFind.uploadMetadata.fileContent
          .split(/[,\n]/g)
          .map((e) => e.trim().replace(/\r/g, '').toUpperCase())
          .filter((e) => e && e.length > 1);
        paramValue.u_fc = fc.join('|');
      } else {
        paramValue.u_fc = '';
      }

      if (localFind.uploadMetadata
        && localFind.uploadMetadata.unmatched
        && localFind.uploadMetadata.unmatched.length > 0) {
        paramValue.u_um = localFind.uploadMetadata.unmatched.join('|');
      } else {
        paramValue.u_um = '';
      }
    } else {
      paramValue.u = '';
      paramValue.u_fc = '';
      paramValue.u_um = '';
    }
    /* eslint-enable no-param-reassign */
  };

  // Create mapped filter state from regular facets
  const mappedFilterState = Object.keys(statusReducer || {}).map((facet) => {
    const config = facetsConfig.find((config) => config.datafield === facet);
    if (!config) {
      console.warn(`No configuration found for facet: ${facet}`);
      return null;
    }
    return {
      ...config,
      items: statusReducer[facet],
      data: data[config.apiForFiltering],
    };
  }).filter(Boolean);

  // Add unknownAges parameters to existing entries or create new ones
  // Check both Redux state and URL parameters for unknownAges
  ageRelatedParams.forEach(param => {
    let unknownAges = 'include'; // default value

    // First check Redux state
    if (unknownAgesState && unknownAgesState[param]) {
      unknownAges = unknownAgesState[param];
    }
    // If not in Redux state, check URL parameters for page load
    else {
      const unknownAgesParam = `${param}_unknownAges`;
      const urlUnknownAges = query.get(unknownAgesParam);
      if (urlUnknownAges) {
        unknownAges = urlUnknownAges;
      }
    }

    if (unknownAges && unknownAges !== 'include') {
      // Check if there's already an entry for this parameter (with range)
      const existingEntryIndex = mappedFilterState.findIndex(entry => entry.datafield === param);

      if (existingEntryIndex !== -1) {
        // Add unknownAges to existing entry
        mappedFilterState[existingEntryIndex].unknownAges = unknownAges;
      } else {
        // Create a new entry only if there's no range selected
        const config = facetsConfig.find((config) => config.datafield === param);
        if (config) {
          const unknownAgesItem = {
            ...config,
            datafield: `${param}_unknownAges`,
            label: config.label, // Use original label, let SliderFilter handle unknownAges formatting
            items: [unknownAges],
            data: data[config.apiForFiltering],
            isUnknownAges: true,
            parentDatafield: param,
            unknownAges: unknownAges,
          };
          mappedFilterState.push(unknownAgesItem);
        }
      }
    }
  });

  mappedFilterState.sort((a, b) => sectionOrder.indexOf(a.datafield) - sectionOrder.indexOf(b.datafield));

  const { QueryBar } = QueryBarGenerator({
    config: {
      maxItems: 2,
      displayAllActiveFilters: true,
      count: 'count',
      caseIDLabel: 'Participant IDs',
      rootPath: `${window.location.href}/`,
      viewQueryURL: true,
      queryUrlCharacterLimit: 70,
    },
    functions: {
      clearAll: () => {
        const paramValue = queryParams
          .filter((param) => !excludedParams.includes(param))
          .reduce((acc, param) => {
            acc[param] = '';
            return acc;
          }, {});
        const queryStr = generateQueryStr(query, queryParams, paramValue);
        window.history.replaceState(null, '', `/explore${queryStr}`);
        dispatch(resetAllData());
        dispatch(clearAllFilters());
      },
      clearImportFrom: () => {
        /*
        const paramValue = {
          'import_from': '',
        };
        // const queryStr = generateQueryStr(query, queryParams, paramValue);
        // navigate(`/explore${queryStr}`, { replace: true });
        // dispatch(updateImportfrom(null, []));
        */
      },
      clearUpload: () => {
        const paramValue = {
          'u': '',
          'u_fc': '',
          'u_um': '',
        };
        const queryStr = generateQueryStr(query, queryParams, paramValue);
        window.history.replaceState(null, '', `/explore${queryStr}`);
        dispatch(resetUploadData());
      },
      clearAutocomplete: () => {
        const paramValue = {
          'p_id': ''
        };
        const queryStr = generateQueryStr(query, queryParams, paramValue);
        window.history.replaceState(null, '', `/explore${queryStr}`);
        dispatch(updateAutocompleteData([]));
      },
      deleteAutocompleteItem: (title) => {
        const { autocomplete } = localFind;
        const newdata = [...autocomplete];
        const index = newdata.findIndex((v) => v.title === title);

        if (index > -1) {
          newdata.splice(index, 1);
          const paramValue = {
            'p_id': newdata.map((dt) => dt.title).join('|')
          };
          const queryStr = generateQueryStr(query, queryParams, paramValue);
          window.history.replaceState(null, '', `/explore${queryStr}`);
          dispatch(updateAutocompleteData(newdata));
        }
      },
      resetFacetSection: (section) => {
        // Only update URL if updateURL flag is explicitly set to true in facet config
        if (section.updateURL === true) {
          const field = section.datafield;
          const paramValue = {};
          paramValue[field] = '';

          // Sync participant IDs from Redux state
          syncParticipantIdsToUrl(paramValue);

          const queryStr = generateQueryStr(query, queryParams, paramValue);
          window.history.replaceState(null, '', `/explore${queryStr}`);
        }
        dispatch(clearFacetSection(section));
      },
      resetFacetSlider: (section) => {
        const field = section.datafield;
        const paramValue = {};

        // Check if this is an unknownAges entry
        if (section.isUnknownAges) {
          // For unknownAges entries, clear the unknownAges parameter
          const unknownAgesField = `${section.parentDatafield}_unknownAges`;
          paramValue[unknownAgesField] = '';

          // Get the parent config to check updateURL flag
          const parentConfig = facetsConfig.find((c) => c.datafield === section.parentDatafield);
          if (parentConfig && parentConfig.updateURL === true) {
            // Sync participant IDs from Redux state
            syncParticipantIdsToUrl(paramValue);

            const queryStr = generateQueryStr(query, queryParams, paramValue);
            window.history.replaceState(null, '', `/explore${queryStr}`);
          }

          // Reset the unknownAges parameter in Redux state
          store.dispatch({
            type: 'UNKNOWN_AGES_CHANGED',
            payload: {
              datafield: section.parentDatafield,
              unknownAges: 'include',
            },
          });
        } else {
          // For regular slider entries, clear the slider range
          paramValue[field] = '';

          // Also clear the corresponding unknownAges parameter if it exists
          const unknownAgesField = `${field}_unknownAges`;
          if (queryParams.includes(unknownAgesField)) {
            paramValue[unknownAgesField] = '';
          }

          // Only update URL if updateURL flag is explicitly set to true in facet config
          if (section.updateURL === true) {
            // Sync participant IDs from Redux state
            syncParticipantIdsToUrl(paramValue);

            const queryStr = generateQueryStr(query, queryParams, paramValue);
            window.history.replaceState(null, '', `/explore${queryStr}`);
          }
          dispatch(clearSliderSection(section));
        }
      },
      resetUnknownAges: (section) => {
        const field = section.parentDatafield || section.datafield.replace('_unknownAges', '');
        const unknownAgesField = `${field}_unknownAges`;
        const paramValue = {};
        paramValue[unknownAgesField] = '';

        // Get the parent config to check updateURL flag
        const parentConfig = facetsConfig.find((c) => c.datafield === field);
        if (parentConfig && parentConfig.updateURL === true) {
          // Sync participant IDs from Redux state
          syncParticipantIdsToUrl(paramValue);

          const queryStr = generateQueryStr(query, queryParams, paramValue);
          window.history.replaceState(null, '', `/explore${queryStr}`);
        }

        // Reset the corresponding unknownAges parameter in Redux state
        store.dispatch({
          type: 'UNKNOWN_AGES_CHANGED',
          payload: {
            datafield: field,
            unknownAges: 'include',
          },
        });
      },
      resetFacetCheckbox: (section, checkbox) => {
        const field = section.datafield;
        const items = section.items;
        const idx = items.indexOf(checkbox);
        if (idx > -1) {
          items.splice(idx, 1);
        }

        // Only update URL if updateURL flag is explicitly set to true in facet config
        if (section.updateURL === true) {
          const paramValue = {};
          paramValue[field] = items.length > 0 ? items.join('|') : '';

          // Sync participant IDs from Redux state
          syncParticipantIdsToUrl(paramValue);

          const queryStr = generateQueryStr(query, queryParams, paramValue);
          window.history.replaceState(null, '', `/explore${queryStr}`);
        }

        dispatch(toggleCheckBox({
          datafield: section.datafield,
          isChecked: false,
          name: checkbox
        }));
      },
      generateUrl,
    },
    customStyles,
  });

  return (
    <ThemeProvider theme={createTheme(theme)}>
      <Container
        maxWidth="xl"
        className="c3dc_query_bar"
      >
        <QueryBar
          hasImportFrom={hasImportFrom}
          statusReducer={mappedFilterState}
          localFind={localFind}
        />
      </Container>
    </ThemeProvider>
  );
};

const mapStateToProps = (state) => ({
  hasImportFrom: state.inventoryReducer && state.inventoryReducer.importFromData && state.inventoryReducer.importFromData.length > 0,
  statusReducer: state.statusReducer.filterState,
  localFind: state.localFind,
  unknownAgesState: state.statusReducer.unknownAgesState,
});

export default connect(mapStateToProps, null)(QueryBarView);