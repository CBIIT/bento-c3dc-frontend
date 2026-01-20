import { generateQueryStr } from '@bento-core/util';
import { queryParams, URL_CHARACTER_LIMIT } from '../bento/dashTemplate';
import { generateUrl } from '../pages/inventory/filterQueryBar/QueryBarUtils';

/**
 * Builds the complete filter state object from Redux state
 *
 * @param {object} activeFilters - Redux state from statusReducer.filterState
 * @param {object} localFind - Redux state from localFind
 * @param {object} unknownAgesState - Redux state from statusReducer.unknownAgesState
 * @returns {object} Complete filter state object
 */
export const buildFilterStateObject = (activeFilters, localFind, unknownAgesState) => {
  const filterObject = {};

  // Add facet filters
  if (activeFilters) {
    Object.keys(activeFilters).forEach((key) => {
      const filterValue = activeFilters[key];
      if (filterValue && typeof filterValue === 'object') {
        // Convert object of {value: true} to array of values
        const values = Object.keys(filterValue).filter((v) => filterValue[v] === true);
        if (values.length > 0) {
          filterObject[key] = values;
        }
      } else if (Array.isArray(filterValue) && filterValue.length > 0) {
        // Already an array (e.g., slider values)
        filterObject[key] = filterValue;
      }
    });
  }

  // Add autocomplete participant IDs
  if (localFind && localFind.autocomplete && localFind.autocomplete.length > 0) {
    filterObject.autocomplete = localFind.autocomplete;
  }

  // Add uploaded participant data
  if (localFind && localFind.upload && localFind.upload.length > 0) {
    filterObject.upload = localFind.upload;
  }

  // Add upload metadata
  if (localFind && localFind.uploadMetadata) {
    filterObject.uploadMetadata = localFind.uploadMetadata;
  }

  // Add unknownAges state
  if (unknownAgesState && Object.keys(unknownAgesState).length > 0) {
    filterObject.unknownAgesState = unknownAgesState;
  }

  return filterObject;
};

/**
 * Updates the browser URL, using filterQuery approach if URL would exceed character limit
 *
 * @param {object} paramValue - URL parameters to set
 * @param {object} options - Configuration options
 * @param {object} options.activeFilters - Redux state from statusReducer.filterState
 * @param {object} options.localFind - Redux state from localFind
 * @param {object} options.unknownAgesState - Redux state from statusReducer.unknownAgesState
 * @param {string} options.basePath - Base path (default: '/explore')
 * @returns {Promise<void>}
 */
export const updateBrowserUrlWithLimit = async (paramValue, options = {}) => {
  const {
    activeFilters = {},
    localFind = {},
    unknownAgesState = {},
    basePath = '/explore',
  } = options;

  // Check if we're currently using a filterQuery URL
  const currentQuery = new URLSearchParams(window.location.search);
  const hasFilterQuery = currentQuery.has('filterQuery');

  // If we're using filterQuery, we need to rebuild from Redux state, not from URL
  // Remove filterQuery from current query to avoid mixing approaches
  if (hasFilterQuery) {
    currentQuery.delete('filterQuery');
  }

  // Generate the query string with current parameters (excluding old filterQuery)
  const queryStr = generateQueryStr(currentQuery, queryParams, paramValue);
  const fullUrl = `${basePath}${queryStr}`;

  // Check if URL exceeds character limit OR if we were already using filterQuery
  if (fullUrl.length > URL_CHARACTER_LIMIT || hasFilterQuery) {
    // Build complete filter state object from Redux (the source of truth)
    const filterObject = buildFilterStateObject(activeFilters, localFind, unknownAgesState);
    const filterQueryStr = JSON.stringify(filterObject);

    // Generate filterQuery URL using interop service
    await generateUrl(filterQueryStr, basePath, (filterQueryUrl) => {
      // The generateUrl callback receives the full URL with filterQuery parameter
      window.history.replaceState(null, '', filterQueryUrl);
    });
  } else {
    // URL is under limit, use normal approach
    window.history.replaceState(null, '', fullUrl);
  }
};
