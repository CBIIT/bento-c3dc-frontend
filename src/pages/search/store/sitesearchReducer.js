/* eslint-disable arrow-body-style */
/* eslint-disable react/destructuring-assignment */
import store from '../../../store';
import client from '../../../utils/graphqlClient';
import {
  SEARCH_PAGE_RESULTS_PUBLIC,
} from '../../../bento/sitesearch';

const storeKey = 'dashboardTab';

const initialState = {
  sitesearch: {},
};

export async function getPublicSearchPageResults(inputValue) {
  const allIds = await client.query({
    query: SEARCH_PAGE_RESULTS_PUBLIC,
    variables: {
      input: inputValue,
    },
    context: { clientName: 'publicService' },
  }).then((response) => response.data.globalSearch);
  return allIds;
}

// reducers
const reducers = {
  SET_SEARCH_CRITERIA: (state, item) => ({
    ...state,
    searchCriteria: item,
  }),
  REQUEST_DASHBOARDTAB: (state) => ({ ...state, isLoading: true }),
  SET_SIDEBAR_LOADING: (state) => ({ ...state, setSideBarLoading: true }),
  SET_SINGLE_FILTER: (state, item) => (
    {
      ...state,
      allActiveFilters: item,
    }
  ),
  SET_DASHBOARDTABLE_LOADING: (state) => ({ ...state, isDashboardTableLoading: true }),
  CLEAR_TABLE_SELECTION: (state) => ({
    ...state,
    dataCaseSelected: {
      selectedRowInfo: [],
      selectedRowIndex: [],
    },
    dataSampleSelected: {
      selectedRowInfo: [],
      selectedRowIndex: [],
    },
    dataFileSelected: {
      selectedRowInfo: [],
      selectedRowIndex: [],
    },
  }),
  RESET_ALL: (state) => ({
    ...state,
    autoCompleteSelection: {
      subject_ids: [],
      sample_ids: [],
      file_ids: [],
    },
    bulkUpload: {
      subject_ids: [],
      sample_ids: [],
      file_ids: [],
    },
    allActiveFilters: {},
  }),
  RESET_ALL_EXCEPT_BULK_UPLOAD: (state) => ({
    ...state,
    autoCompleteSelection: {
      subject_ids: [],
      sample_ids: [],
      file_ids: [],
    },
    allActiveFilters: {},
  }),
  ADD_AUTOCOMPLETE_DATA: (state, { type, value }) => ({
    ...state,
    autoCompleteSelection: {
      ...state.autoCompleteSelection,
      [`${type}_ids`]: value,
    },
  }),
  ADD_BULKSEARCHDATA: (state, { type, value }) => ({
    ...state,
    bulkUpload: {
      [`${type}_ids`]: value,
    },
  }),
};

// INJECT-REDUCERS INTO REDUX STORE
store.injectReducer(storeKey, (state = initialState, { type, payload }) => (
  reducers[type] ? reducers[type](state, payload) : state));
