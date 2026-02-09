import React, { useEffect, useState } from 'react';
import { useApolloClient } from '@apollo/client';
import { connect } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { CircularProgress } from '@material-ui/core';
import { getFiltersWithUnknownAges } from '@bento-core/facet-filter';
import InventoryView from './inventoryView';
import { DASHBOARD_QUERY_NEW } from '../../bento/dashboardTabData';
import { CohortStateProvider } from '../../components/CohortSelectorState/CohortStateContext';
import { CohortModalProvider } from '../../components/CohortModal/CohortModalContext';
import { setActiveFilterByPathQuery } from './sideBar/BentoFilterUtils';


let latestRequestId = 0;

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
  const filterQuery = searchParams.get("filterQuery");
  const [loadingFilterQuery, setLoadingFilterQuery] = useState(false);


  const navigate = useNavigate();

  useEffect(() => {
    if (filterQuery) {
      // Fetch filter string from backend using the id in URL
      setLoadingFilterQuery(true); // start loading

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
        }).finally(() => setLoadingFilterQuery(false));
    }
  }, [filterQuery]);

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
});

export default connect(mapStateToProps, null)(InventoryController);