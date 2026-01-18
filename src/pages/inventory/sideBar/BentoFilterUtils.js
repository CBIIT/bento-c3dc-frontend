import { 
  clearAllAndSelectFacet, InputTypes
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
import { facetsConfig } from '../../../bento/dashTemplate';

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
 * @param {Array} types search fields
 * @returns {Promise<string[]>} all ids for the search field
 */
export async function getAllIds(types) {
  const allids = await client
    .query({
      query: GET_IDS_BY_TYPE(),
      variables: {},
    })
    .then((result) => (result.data.idsLists))
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
  const query = decodeURIComponent(filterQuery || '');
  const filterObject = JSON.parse(query);
  const { autocomplete = [], upload = [], uploadMetadata, unknownAgesState } = filterObject;

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

  const transformSliderFilters = (filters) => {
    return Object.keys(filters).reduce((acc, key) => {
      const isSlider = facetsConfig.some(facet => facet.datafield === key && facet.type === InputTypes.SLIDER);
      if (isSlider) {
        acc[key] = Object.keys(filters[key]).map(Number);
      } else {
        acc[key] = filters[key];
      }
      return acc;
    }, {});
  };

  store.dispatch(clearAllAndSelectFacet(transformSliderFilters(activeFilterValues)));
  store.dispatch(updateAutocompleteData(autocomplete));
  store.dispatch(updateUploadData(upload));
  store.dispatch(updateUploadMetadata(uploadMetadata));

  // Restore unknownAgesState if it exists
  if (unknownAgesState) {
    Object.keys(unknownAgesState).forEach((datafield) => {
      store.dispatch({
        type: 'UNKNOWN_AGES_CHANGED',
        payload: {
          datafield,
          unknownAges: unknownAgesState[datafield],
        },
      });
    });
  }
};
