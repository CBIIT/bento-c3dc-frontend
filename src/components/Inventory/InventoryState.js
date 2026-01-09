export const initialState = {
  initialLoading: true,
  isDataloading: false,
  importFromURL: null,
  importFromData: [],
  activeFilters: null,
  dashData: null,
  return_2_page: false,
  return_query_url: '',
  tab: 0,
  action_type: 'facet',
};

export const AFTER_INITIAL_LOADING = 'Inventory/AFTER_INITIAL_LOADING';
export const DATA_LOADING = 'Inventory/DATA_LOADING';
export const UPDATE_IMPORTFROM = 'Inventory/UPDATE_IMPORTFROM';
export const FACET_VALUE_CHANGED = 'Inventory/FACET_VALUE_CHANGED';
export const DASHBOARD_DATA_CHANGED = 'Inventory/DASHBOARD_DATA_CHANGED';
export const RETURN_2_PAGE = 'return_2_page';
export const RETURN_QUERY_URL = 'return_query_url';
export const CHANGE_TAB = 'change_tab';
export const RESTORE_ACTION_TYPE = 'restore_action_type';

export const afterInitialLoading = () => ({
  type: AFTER_INITIAL_LOADING,
  payload: {
    initialLoading: false,
  },
});

export const inDataloading = (isDataloading) => ({
  type: DATA_LOADING,
  payload: {
    isDataloading,
  },
});

export const updateImportfrom = (importFromURL, importFromData) => ({
  type: UPDATE_IMPORTFROM,
  payload: {
    importFromURL,
    importFromData,
  },
});

export const syncUpFacets = (facets) => ({
  type: FACET_VALUE_CHANGED,
  payload: {
    facets,
  },
});

export const syncUpDashboard = (facets, dashData) => ({
  type: DASHBOARD_DATA_CHANGED,
  payload: {
    facets,
    dashData,
  },
});

export const return2Page = (returned) => ({
  type: RETURN_2_PAGE,
  payload: {
    return_2_page: returned,
  },
});

export const returnQueryUrl = (url) => ({
  type: RETURN_QUERY_URL,
  payload: {
    return_query_url: url,
  },
});

export const changeTab = (idx, action_type) => ({
  type: CHANGE_TAB,
  payload: {
    tab: idx,
    action_type: action_type,
  },
});

export const restoreActionType = () => ({
  type: RESTORE_ACTION_TYPE,
  payload: {
    action_type: "facet",
  },
});

export default function InventoryReducer(state = initialState, { type, payload }) {
  switch (type) {
    case AFTER_INITIAL_LOADING:
      return {
        ...state,
        initialLoading: payload.initialLoading,
      };
    case DATA_LOADING:
      return {
        ...state,
        isDataloading: payload.isDataloading,
      };
    // Update importFromData with the fetched data
    case UPDATE_IMPORTFROM:
      return {
        ...state,
        importFromURL: payload.importFromURL,
        importFromData: payload.importFromData,
      };
    case FACET_VALUE_CHANGED:
      return {
        ...state,
        activeFilters: payload.facets,
      };
    case DASHBOARD_DATA_CHANGED:
      return {
        ...state,
        activeFilters: payload.facets,
        dashData: payload.dashData,
      };
    case RETURN_2_PAGE:
      return {
        ...state,
        return_2_page: payload.return_2_page,
      };
    case RETURN_QUERY_URL:
      return {
        ...state,
        return_query_url: payload.return_query_url,
      };
    case CHANGE_TAB:
      return {
        ...state,
        tab: payload.tab,
        action_type: payload.action_type,
      };
    case RESTORE_ACTION_TYPE:
      return {
        ...state,
        action_type: payload.action_type,
      };
    default:
      return state;
  }
}