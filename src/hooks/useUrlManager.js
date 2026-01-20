import { useSelector } from 'react-redux';
import { useCallback, useRef, useEffect } from 'react';
import { updateBrowserUrlWithLimit } from '../utils/urlManager';

/**
 * Hook to manage URL updates with automatic fallback to filterQuery for long URLs
 * Includes debouncing to wait 1 seconds after last change before updating URL
 *
 * @param {string} basePath - Base path for URLs (default: '/explore')
 * @param {number} debounceMs - Debounce delay in milliseconds (default: 1000)
 * @returns {Function} Function to update browser URL with character limit handling
 */
export const useUrlManager = (basePath = '/explore', debounceMs = 1000) => {
  // Get Redux state
  const activeFilters = useSelector((state) => state.statusReducer && state.statusReducer.filterState);
  const localFind = useSelector((state) => state.localFind);
  const unknownAgesState = useSelector((state) => state.statusReducer && state.statusReducer.unknownAgesState);

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
        await updateBrowserUrlWithLimit(pendingUpdateRef.current, {
          activeFilters,
          localFind,
          unknownAgesState,
          basePath,
        });
        pendingUpdateRef.current = null;
      }
    }, debounceMs);
  }, [activeFilters, localFind, unknownAgesState, basePath, debounceMs]);

  return updateUrl;
};
