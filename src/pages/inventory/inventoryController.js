import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { CohortStateProvider } from '../../components/CohortSelectorState/CohortStateContext';
import { CohortModalProvider } from '../../components/CohortModal/CohortModalContext';
import { setActiveFilterByPathQuery } from './sideBar/BentoFilterUtils';
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