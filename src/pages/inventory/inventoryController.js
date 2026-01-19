import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { CohortStateProvider } from '../../components/CohortSelectorState/CohortStateContext';
import { CohortModalProvider } from '../../components/CohortModal/CohortModalContext';
import { setActiveFilterByPathQuery } from './sideBar/BentoFilterUtils';
import { facetsConfig, queryParams } from '../../bento/dashTemplate';
import { generateQueryStr } from '@bento-core/util';
import InventoryView from './inventoryView';
import InventoryCover from './inventoryCover';

const InventoryController = (() => {
  const [searchParams] = useSearchParams();
  const filterQuery = searchParams.get("filterQuery");
  const [loadingFilterQuery, setLoadingFilterQuery] = useState(false);
  const [justProcessedFilterQuery, setJustProcessedFilterQuery] = useState(false);
  const navigate = useNavigate();

  // Read from Redux (data is stored by inventoryCover)
  const activeFilters = useSelector((state) => state.inventoryReducer && state.inventoryReducer.activeFilters);
  const dashData = useSelector((state) => state.inventoryReducer && state.inventoryReducer.dashData);
  const unknownAgesState = useSelector((state) => state.statusReducer.unknownAgesState);

  // Handle filterQuery parameter (C3DC-specific cohort modal feature)
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
          // Parse the filterQuery data to extract facets
          const filterObject = JSON.parse(decodeURIComponent(data.key || ''));

          // Set the Redux state with all filters
          setActiveFilterByPathQuery(data.key);

          // Build URL parameters for facets with updateURL: true
          const query = new URLSearchParams();
          const paramValue = {};

          // Get list of facets that should update URL
          const updateURLFacets = facetsConfig
            .filter((f) => f.updateURL === true)
            .map((f) => f.datafield);

          // Add updateURL facets to paramValue
          Object.keys(filterObject).forEach((key) => {
            if (updateURLFacets.includes(key) && Array.isArray(filterObject[key])) {
              paramValue[key] = filterObject[key].join('|');
            }
          });

          // Add unknownAges parameters for updateURL facets if they exist
          if (filterObject.unknownAgesState) {
            Object.keys(filterObject.unknownAgesState).forEach((datafield) => {
              if (updateURLFacets.includes(datafield)) {
                const unknownAges = filterObject.unknownAgesState[datafield];
                if (unknownAges && unknownAges !== 'include') {
                  const unknownAgesParam = `${datafield}_unknownAges`;
                  paramValue[unknownAgesParam] = unknownAges;
                }
              }
            });
          }

          // Generate query string
          const queryStr = generateQueryStr(query, queryParams, paramValue);
          const redirectUrl = `/explore${queryStr}`;

          navigate(redirectUrl, { replace: true });
        })
        .catch((err) => {
          console.error("Error loading filterQuery:", err);
          setJustProcessedFilterQuery(false);
        })
        .finally(() => setLoadingFilterQuery(false));
    }
  }, [filterQuery]);

  return (
    <CohortStateProvider>
      <CohortModalProvider>
        <InventoryCover
          justProcessedFilterQuery={justProcessedFilterQuery}
          setJustProcessedFilterQuery={setJustProcessedFilterQuery}
        />
        <InventoryView
          dashData={dashData}
          activeFilters={activeFilters}
          unknownAgesState={unknownAgesState}
          loading={loadingFilterQuery}
        />
      </CohortModalProvider>
    </CohortStateProvider>
  );
});

export default InventoryController;