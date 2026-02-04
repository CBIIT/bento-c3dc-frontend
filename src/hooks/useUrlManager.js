import { useCallback, useRef, useEffect } from 'react';
import { updateBrowserUrlWithLimit } from '../utils/urlManager';
import store from '../store';

/**
 * Hook to manage URL updates with automatic fallback to filterQuery for long URLs
 * Includes debouncing to wait 1 seconds after last change before updating URL
 *
 * @param {string} basePath - Base path for URLs (default: '/explore')
 * @param {number} debounceMs - Debounce delay in milliseconds (default: 500)
 * @returns {Function} Function to update browser URL with character limit handling
 */
export const useUrlManager = (basePath = '/explore', debounceMs = 500) => {
  // Store timeout reference
  const timeoutRef = useRef(null);
  const pendingUpdateRef = useRef(null);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  // Create debounced callback function
  const updateUrl = useCallback((paramValue) => {
    // Clear any pending timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Store the pending update
    pendingUpdateRef.current = paramValue;

    // Set new timeout to update URL after debounce period
    timeoutRef.current = setTimeout(async () => {
      if (pendingUpdateRef.current) {
        // Read FRESH state from Redux store at execution time
        // This ensures we get the latest state after all dispatches have completed
        const state = store.getState();
        const activeFilters = (state.statusReducer && state.statusReducer.filterState) || {};
        const localFind = state.localFind || {};
        const unknownAgesState = (state.statusReducer && state.statusReducer.unknownAgesState) || {};

        await updateBrowserUrlWithLimit(pendingUpdateRef.current, {
          activeFilters,
          localFind,
          unknownAgesState,
          basePath,
        });
        pendingUpdateRef.current = null;
      }
    }, debounceMs);
  }, [basePath, debounceMs]); // Remove state dependencies - we read fresh state inside

  return updateUrl;
};
