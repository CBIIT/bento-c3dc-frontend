import React, { useEffect, useState } from 'react';
import { useApolloClient } from '@apollo/client';
import { connect, useSelector } from 'react-redux';
import { useNavigate, useSearchParams, useLocation } from 'react-router-dom';
import { CircularProgress } from '@material-ui/core';
import { getFilters, getFiltersWithUnknownAges, updateFilterState } from '@bento-core/facet-filter';
import { updateUploadData, updateAutocompleteData, updateUploadMetadata, resetUploadData } from '@bento-core/local-find';
import store from '../../store';
import {
  inDataloading,
  updateImportfrom,
  syncUpDashboard,
  afterInitialLoading,
  return2Page,
  returnQueryUrl,
  changeTab,
  restoreActionType,
} from '../../components/Inventory/InventoryState';
import InventoryView from './inventoryView';
import { DASHBOARD_QUERY_NEW } from '../../bento/dashboardTabData';
import { queryParams, ageRelatedParams } from '../../bento/dashTemplate';
import { CohortStateProvider } from '../../components/CohortSelectorState/CohortStateContext';
import { CohortModalProvider } from '../../components/CohortModal/CohortModalContext';
import { setActiveFilterByPathQuery } from './sideBar/BentoFilterUtils';


let latestRequestId = 0;

// Helper function to parse URL parameters and generate filter state
const generateFacetFilters = (filters, query, queryParams) => {
  let newFilterState = {};
  let unknownAgesState = {};

  queryParams.forEach((param) => {
    if (param === 'import_from' || param === 'p_id' || param === 'u' || param === 'u_fc' || param === 'u_um' || param === 'tab') {
      return;
    }
    const paramValues = query.get(param);
    if (paramValues) {
      if (ageRelatedParams.includes(param)) {
        const rangeParams = paramValues.split(',');
        const lowerBound = parseInt(rangeParams[0]);
        const upperBound = parseInt(rangeParams[1]);
        if (rangeParams.length !== 2 || typeof lowerBound !== 'number' || Number.isNaN(lowerBound) || typeof upperBound !== 'number' || Number.isNaN(upperBound)) {
          return;
        } else {
          filters[param] = [lowerBound, upperBound];
          newFilterState[param] = [lowerBound, upperBound];

          // Handle unknownAges parameter for age-related filters
          const unknownAgesParam = `${param}_unknownAges`;
          const unknownAgesValue = query.get(unknownAgesParam);
          if (unknownAgesValue) {
            unknownAgesState[param] = unknownAgesValue;
          } else {
            // Default to "include" if not specified
            unknownAgesState[param] = 'include';
          }
        }
      } else {
        filters[param] = paramValues.split('|');
        newFilterState[param] = {};
        paramValues.split('|').forEach((item) => {
          newFilterState[param][item] = true;
        });
      }
    }
  });

  // Set default unknownAges values for age-related parameters that don't have values
  ageRelatedParams.forEach(param => {
    if (!unknownAgesState[param]) {
      unknownAgesState[param] = 'include';
    }
  });

  // Add unknownAgesState to the return object
  return { newFilterState, unknownAgesState };
};

const getDashData = (states) => {
  const {
    filterState, unknownAgesState,
    localFindUpload, localFindAutocomplete,
  } = states;

  const client = useApolloClient();
  const [dashData, setDashData] = useState(null);
  const [loading, setLoading] = useState(true); // new loading state

  async function getData(activeFilters) {
    const currentRequestId = ++latestRequestId;
    setLoading(true); // start loading

    let result = await client.query({
      query: DASHBOARD_QUERY_NEW,
      variables: activeFilters,
    })
      .then((response) => response.data);

    if (currentRequestId !== latestRequestId) {
      return null;
    }

    setLoading(false); // done loading
    return result;
  }


  const activeFilters = {
    ...getFiltersWithUnknownAges(filterState, unknownAgesState),
    participant_id: [
      ...(localFindUpload || []).map((obj) => obj.participant_id),
      ...(localFindAutocomplete || []).map((obj) => obj.title),
    ],
  };

  useEffect(() => {
    const controller = new AbortController();
    getData(activeFilters).then((result) => {
      if (result && result.getParticipants) {
        setDashData(result.getParticipants);
      }
    });
    return () => controller.abort();
  }, [filterState, unknownAgesState, localFindUpload, localFindAutocomplete]);
  return { dashData, activeFilters, loading };
};

const InventoryController = ((props) => {
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const filterQuery = searchParams.get("filterQuery");
  const [loadingFilterQuery, setLoadingFilterQuery] = useState(false);
  const [justProcessedFilterQuery, setJustProcessedFilterQuery] = useState(false);
  const navigate = useNavigate();
  const client = useApolloClient();
  const navigationType = location.state && location.state.navigationType;

  // Get Redux state - read inside useEffect but NOT in dependencies
  const return_2_page = useSelector((state) => state.inventoryReducer && state.inventoryReducer.return_2_page);
  const return_query_url = useSelector((state) => state.inventoryReducer && state.inventoryReducer.return_query_url);
  const action_type = useSelector((state) => state.inventoryReducer && state.inventoryReducer.action_type);

  // Handle filterQuery parameter (existing cohort logic)
  useEffect(() => {
    if (filterQuery) {
      setLoadingFilterQuery(true);
      setJustProcessedFilterQuery(true);
      fetch(`${filterQuery}`)
        .then((res) => {
          if (!res.ok) throw new Error("Failed to fetch filterQuery");
          return res.json();
        })
        .then((data) => {
          setActiveFilterByPathQuery(data.key);
          const redirectUrl = "/explore";
          navigate(redirectUrl, { replace: true });
        })
        .catch((err) => {
          console.error("Error loading filterQuery:", err);
          setJustProcessedFilterQuery(false);
        })
        .finally(() => setLoadingFilterQuery(false));
    }
  }, [filterQuery]);

  // Handle URL parameter parsing and filter application
  useEffect(() => {
    // Skip this effect if we just processed a filterQuery to avoid overwriting filters
    if (justProcessedFilterQuery) {
      setJustProcessedFilterQuery(false);
      return;
    }

    // If there are no query parameters and the user is returning to a page,
    if (query.size === 0 && return_2_page === true) {
      navigate(`/explore${return_query_url}`);
      return;
    }

    //Check if the user is returning to the same page from the main menu
    if (query.size === 0 && return_2_page === false && return_query_url !== '' && navigationType === 'main_menu') {
      navigate(`/explore${return_query_url}`);
      return;
    }

    // Parse all query params
    let filters = {};
    const import_from = query.get('import_from');
    const participant_id = query.get('p_id');
    const upload = query.get('u');
    const upload_filecontent = query.get('u_fc');
    const upload_unmatched = query.get('u_um');
    const tab = query.get('tab');
    // Helper to finish the rest of the logic after import_from is handled
    const continueWithFilters = (extraParticipantIds = []) => {
      filters.participant_ids = [];
      if (participant_id) {
        filters.participant_ids = [...filters.participant_ids, ...participant_id.split('|')];
      }
      if (upload) {
        filters.participant_ids = [...filters.participant_ids, ...upload.split('|')];
      }
      if (extraParticipantIds.length > 0) {
        filters.import_data = extraParticipantIds;
      }

      // Generate filter state from URL parameters
      const { newFilterState, unknownAgesState } = generateFacetFilters(filters, query, queryParams);

      // Add unknownAges parameters to GraphQL filters
      Object.keys(unknownAgesState).forEach(key => {
        const unknownAgesValue = unknownAgesState[key];
        const value = Array.isArray(unknownAgesValue) ? unknownAgesValue[0] : unknownAgesValue;
        if (value && value !== 'include') {
          const unknownAgesParam = `${key}_unknownAges`;
          filters[unknownAgesParam] = [value];
        }
      });

      // Update autocomplete data
      if (participant_id) {
        const data = participant_id.split('|').map((item) => ({
          type: 'participantIds',
          title: item,
        }));
        store.dispatch(updateAutocompleteData(data));
      } else {
        store.dispatch(updateAutocompleteData([]));
      }

      // Update upload data and metadata
      if (upload) {
        const data = upload.split('|').map((item) => ({
          participant_id: item,
        }));
        let fc = '';
        let um = [];
        if (upload_filecontent && upload_unmatched) {
          fc = upload_filecontent.split('|').join(',');
          um = upload_unmatched.split('|');
        } else {
          fc = upload.split('|').join(',');
          um = [];
        }
        const metadata = {
          filename: "",
          fileContent: fc,
          matched: data,
          unmatched: um,
        };
        store.dispatch(updateUploadData(data));
        store.dispatch(updateUploadMetadata(metadata));
      } else {
        store.dispatch(resetUploadData());
      }

      // Update filter state in Redux
      store.dispatch(updateFilterState(newFilterState));

      // Handle tab parameter
      if (tab) {
        const tab_number = parseInt(tab, 10);
        !isNaN(tab_number) && store.dispatch(changeTab(tab_number, 'facet'));
      } else {
        store.dispatch(changeTab(0, 'facet'));
      }

      // Data loading logic
      if (action_type === "facet") {
        store.dispatch(inDataloading(true));
        client.query({
          query: DASHBOARD_QUERY_NEW,
          variables: filters,
        })
          .then((response) => response.data)
          .then((result) => {
            if (result.searchParticipants) {
              store.dispatch(return2Page(false));
              store.dispatch(returnQueryUrl(window.location.search));
              store.dispatch(afterInitialLoading());
              store.dispatch(inDataloading(false));
              store.dispatch(syncUpDashboard(filters, result.searchParticipants));
            }
          });
      } else {
        store.dispatch(return2Page(false));
        store.dispatch(returnQueryUrl(window.location.search));
        store.dispatch(restoreActionType());
      }
    };

    // Handle import_from if present
    if (import_from) {
      fetch(import_from)
        .then(response => response.json())
        .then(jsonData => {
          store.dispatch(updateImportfrom(import_from, jsonData));
          // If jsonData is an array of participant IDs, pass them to continueWithFilters
          continueWithFilters(Array.isArray(jsonData) ? jsonData.map(obj => JSON.stringify(obj)) : []);
        })
        .catch(error => {
          console.error("Failed to fetch import_from JSON:", error);
          store.dispatch(updateImportfrom(null, []));
          continueWithFilters();
        });
    } else {
      store.dispatch(updateImportfrom(null, []));
      continueWithFilters();
    }
  }, [searchParams, navigationType]);

  useEffect(() => {
    return () => {
      console.log("do something when left!");
      store.dispatch(return2Page(true));
    };
  }, []);

  const { dashData, activeFilters, loading } = getDashData(props);
  if (!dashData) {
    return (<div style={{"height": "1200px","paddingTop": "10px"}}><div style={{"margin": "auto","display": "flex","maxWidth": "1800px"}}><CircularProgress /></div></div>);
  }

  return (
    <CohortStateProvider>
      <CohortModalProvider>
        <InventoryView
          {...props}
          dashData={dashData}
          activeFilters={activeFilters}
          loading={loading || loadingFilterQuery}
        />
      </CohortModalProvider>
    </CohortStateProvider>
  );
});

const mapStateToProps = (state) => ({
  filterState: state.statusReducer.filterState,
  unknownAgesState: state.statusReducer.unknownAgesState,
  localFindUpload: state.localFind.upload,
  localFindAutocomplete: state.localFind.autocomplete,
  return_2_page: state.inventoryReducer && state.inventoryReducer.return_2_page,
  return_query_url: state.inventoryReducer && state.inventoryReducer.return_query_url,
  action_type: state.inventoryReducer && state.inventoryReducer.action_type,
});

export default connect(mapStateToProps, null)(InventoryController);