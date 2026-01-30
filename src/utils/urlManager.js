import { generateQueryStr } from '@bento-core/util';
import { queryParams, URL_CHARACTER_LIMIT, whitelistedUrlParams } from '../bento/dashTemplate';
import { generateUrl } from '../pages/inventory/filterQueryBar/QueryBarUtils';

/**
 * Builds the complete filter state object from Redux state
 *
 * @param {object} activeFilters - Redux state from statusReducer.filterState
 * @param {object} localFind - Redux state from localFind
 * @param {object} unknownAgesState - Redux state from statusReducer.unknownAgesState
 * @param {array} whitelist - Optional list of datafields to include (if null, includes all)
 * @returns {object} Complete filter state object
 */
export const buildFilterStateObject = (activeFilters, localFind, unknownAgesState, whitelist = null) => {
  const filterObject = {};

  // Add facet filters
  if (activeFilters) {
    Object.keys(activeFilters).forEach((key) => {
      // Skip if whitelist provided and key not in whitelist
      if (whitelist && !whitelist.includes(key)) {
        return;
      }
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

  // IMPORTANT: Always sync participant IDs from Redux state to ensure they're included in URL
  // This prevents losing upload modal data when adding facet filters
  const completeParamValue = { ...paramValue };

  // Sync autocomplete participant IDs from Redux state
  if (localFind.autocomplete && localFind.autocomplete.length > 0) {
    completeParamValue.p_id = localFind.autocomplete.map((data) => data.title).join('|');
  } else if (!paramValue.p_id) {
    // Only clear if not explicitly set in paramValue
    completeParamValue.p_id = '';
  }

  // Sync uploaded participant IDs from Redux state
  if (localFind.upload && localFind.upload.length > 0) {
    completeParamValue.u = localFind.upload.map((data) => data.participant_id).join('|');

    // Sync upload metadata (file content and unmatched IDs)
    if (localFind.uploadMetadata && localFind.uploadMetadata.fileContent) {
      const fc = localFind.uploadMetadata.fileContent
        .split(/[,\n]/g)
        .map((e) => e.trim().replace(/\r/g, '').toUpperCase())
        .filter((e) => e && e.length > 1);
      completeParamValue.u_fc = fc.join('|');
    }

    if (localFind.uploadMetadata
      && localFind.uploadMetadata.unmatched
      && localFind.uploadMetadata.unmatched.length > 0) {
      completeParamValue.u_um = localFind.uploadMetadata.unmatched.join('|');
    }
  } else if (!paramValue.u) {
    // Only clear if not explicitly set in paramValue
    completeParamValue.u = '';
    completeParamValue.u_fc = '';
    completeParamValue.u_um = '';
  }

  // Generate the query string with current parameters (excluding old filterQuery)
  const queryStr = generateQueryStr(currentQuery, queryParams, completeParamValue);
  const fullUrl = `${basePath}${queryStr}`;

  // Check if URL exceeds character limit
  if (fullUrl.length > URL_CHARACTER_LIMIT) {
    // Build filter state with ONLY whitelisted facets for browser URL
    // This ensures browser URL only contains updateURL: true facets + participant IDs
    const filterObject = buildFilterStateObject(activeFilters, localFind, unknownAgesState, whitelistedUrlParams);
    const filterQueryStr = JSON.stringify(filterObject);

    // Generate filterQuery URL using interop service
    await generateUrl(filterQueryStr, basePath, (filterQueryUrl) => {
      // The generateUrl callback receives the full URL with filterQuery parameter
      window.history.replaceState(null, '', filterQueryUrl);
    });
  } else if (hasFilterQuery) {
    // We were using filterQuery but the deconstructed URL is now under the limit
    // We can switch back to normal URL to make it more readable
    window.history.replaceState(null, '', fullUrl);
  } else {
    // URL is under limit, use normal approach
    window.history.replaceState(null, '', fullUrl);
  }
};
