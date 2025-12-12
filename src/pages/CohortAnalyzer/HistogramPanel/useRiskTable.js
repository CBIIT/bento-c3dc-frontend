import { useEffect, useState, useRef } from 'react';
import { gql } from '@apollo/client';
import { useApolloClient } from '@apollo/client';

const RISK_TABLE_QUERY = gql`
  query riskTableData(
    $c1: [String]!,
    $c2: [String]!,
    $c3: [String]!
  ) {
    riskTableData(
      c1: $c1,
      c2: $c2,
      c3: $c3
    ) {
      cohorts {
        cohort
        survivalData {
          group
          subjects
        }
      }
      timeIntervals
    }
  }
`;

/**
 * Custom hook to fetch and manage Risk Table data
 * @param {Array} c1 - Cohort 1 array
 * @param {Array} c2 - Cohort 2 array
 * @param {Array} c3 - Cohort 3 array
 * @returns {Object} { data, loading, error }
 */
export default function useRiskTable({ c1, c2, c3 }) {
  const [data, setData] = useState(null);
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
      setData(null);
      setLoading(false);
      setError(null);
      return;
    }
    
    // Prevent double fetch calls
    if (fetchInProgressRef.current) {
      return;
    }
    
    const fetchRiskTable = async () => {
      fetchInProgressRef.current = true;
      setLoading(true);
      setError(null);
      
      try {
        const result = await client.query({
          query: RISK_TABLE_QUERY,
          variables: { c1, c2, c3 },
        });

        // Only update state if component is still mounted
        if (!isMountedRef.current) {
          return;
        }

        if (result.errors) {
          throw new Error((result.errors[0] && result.errors[0].message) || 'Unknown error');
        }

        // The GraphQL response already has the correct structure
        // Response format: { cohorts: [{ cohort: "c1", survivalData: [{ group: "0 Months", subjects: 100 }, ...] }, ...], timeIntervals: [...] }
        const riskTableData = (result.data && result.data.riskTableData) || null;
        
        if (riskTableData) {
          setData({
            cohorts: riskTableData.cohorts || [],
            timeIntervals: riskTableData.timeIntervals || []
          });
        } else {
          setData(null);
        }
        setError(null);
      } catch (err) {
        console.error('Error fetching Risk Table data:', err);
        if (isMountedRef.current) {
          setError(err);
          setData(null);
        }
      } finally {
        if (isMountedRef.current) {
          setLoading(false);
        }
        fetchInProgressRef.current = false;
      }
    };

    fetchRiskTable();
  }, [c1, c2, c3, client]);

  return { data, loading, error };
}

