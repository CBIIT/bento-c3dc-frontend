import { useEffect, useState, useRef } from 'react';
import { gql } from '@apollo/client';
import { useApolloClient } from '@apollo/client';

const KM_PLOT_QUERY = gql`
  query kMPlot(
    $c1: [String],
    $c2: [String],
    $c3: [String]
  ) {
    kMPlot(
      c1: $c1,
      c2: $c2,
      c3: $c3
    ) {
      id
      time
      event
      group
      __typename
    }
  }
`;

/**
 * Custom hook to fetch and manage KM plot data
 * @param {Array} c1 - Cohort 1 array
 * @param {Array} c2 - Cohort 2 array
 * @param {Array} c3 - Cohort 3 array
 * @returns {Object} { data, loading, error }
 */
export default function useKmplot({ c1, c2, c3 }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const client = useApolloClient();
  const isMountedRef = useRef(true);
  const fetchInProgressRef = useRef(false);

  useEffect(() => {
    isMountedRef.current = true;
    
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  useEffect(() => {
    // Don't fetch if no cohorts are selected
    const hasCohorts = (c1 && c1.length > 0) || (c2 && c2.length > 0) || (c3 && c3.length > 0);
    
    if (!hasCohorts) {
      setData([]);
      setLoading(false);
      setError(null);
      return;
    }
    
    // Prevent double fetch calls
    if (fetchInProgressRef.current) {
      return;
    }
    
    const fetchKmPlot = async () => {
      fetchInProgressRef.current = true;
      setLoading(true);
      setError(null);
      
      try {
        const result = await client.query({
          query: KM_PLOT_QUERY,
          variables: { c1, c2, c3 },
          fetchPolicy: 'no-cache', 
        });

        // Only update state if component is still mounted
        if (!isMountedRef.current) {
          return;
        }

        if (result.errors) {
          throw new Error((result.errors[0] && result.errors[0].message) || 'Unknown error');
        }

        // Use the fetched data from GraphQL
        setData((result.data && result.data.kMPlot) || []);
        setError(null);
      } catch (err) {
        console.error('Error fetching KM plot data:', err);
        if (isMountedRef.current) {
          setError(err);
          setData([]);
        }
      } finally {
        if (isMountedRef.current) {
          setLoading(false);
        }
        fetchInProgressRef.current = false;
      }
    };

    fetchKmPlot();
  }, [c1, c2, c3, client]);

  return { data, loading, error };
}
