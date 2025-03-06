import { 
  clearAllAndSelectFacet 
} from '@bento-core/facet-filter';
import {
  updateAutocompleteData, 
  updateUploadData, 
  updateUploadMetadata,
} from '@bento-core/local-find';
import {
  GET_IDS_BY_TYPE, GET_PARTICIPANT_IDS,
} from '../../../bento/localSearchData';
import store from '../../../store';
import client from '../../../utils/graphqlClient';

export const getFacetValues = (facet, facetValue) => ({[facet]: { [facetValue]: true }});

/**
* set filter item from Arm/Program details page (NUMBER OF CASES: button)
*/
export const onClearAllAndSelectFacetValue = (facet, facetValue) => {
  const filterValue = getFacetValues(facet, facetValue );
  store.dispatch(clearAllAndSelectFacet(filterValue));
}

/**
 * Get list of all available ids for a search field
 *
 * @async
 * @param {string} type search field
 * @returns {Promise<string[]>} all ids for the search field
 */
export async function getAllIds(type) {
  const allids = await client
    .query({
      query: GET_IDS_BY_TYPE(type),
      variables: {},
    })
    .then((result) => result.data.idsLists)
    .catch(() => []);
  return allids;
}

/**
 * Get list of matching ids for a list of ids
 *
 * @param {string[]} subjectIdsArray
 * @returns {Promise<string[]>}
 */
export async function getAllParticipantIds(participantIdsArray) {
  const allids = await client
    .query({
      query: GET_PARTICIPANT_IDS,
      variables: {
        participant_id: participantIdsArray,
      },
    })
    .then((result) => result.data.findParticipantIdsInList)
    .catch(() => []);
  return allids;
}

export const setActiveFilterByPathQuery = (filterQuery) => {
  const query = Buffer.from(decodeURIComponent(filterQuery || ''), "base64")
  const filterObject = JSON.parse(query);
  const { autocomplete = [], upload = [], uploadMetadata } = filterObject;

  const activeFilterValues = Object.keys(filterObject).reduce((curr, key) => {
    if (Array.isArray(filterObject[key])) {
      const activeFilters = filterObject[key].reduce((value, item) => ({
        ...value,
        [item]: true,
      }), {});
      return {
        ...curr,
        [key]: activeFilters,
      };
    }
    return curr;
  }, {});
  store.dispatch(clearAllAndSelectFacet(activeFilterValues));
  store.dispatch(updateAutocompleteData(autocomplete));
  store.dispatch(updateUploadData(upload));
  store.dispatch(updateUploadMetadata(uploadMetadata));
};
