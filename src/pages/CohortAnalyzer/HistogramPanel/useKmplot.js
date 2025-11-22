import { useEffect, useState } from 'react';
import mocData from './brain_tumor_data.json';
/**
 * Custom hook to fetch and manage KM plot data
 * @param {Array} c1 - Cohort 1 array
 * @param {Array} c2 - Cohort 2 array
 * @param {Array} c3 - Cohort 3 array
 * @returns {Object} { data, loading, error }
 */
export default function useKmplot({ c1, c2, c3 }) {
  const [data, setData] = useState(mocData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Only fetch if at least one cohort is provided
    if ((!c1 || c1.length === 0) && (!c2 || c2.length === 0) && (!c3 || c3.length === 0)) {
      setData(mocData);
      return;
    }
    
    // TODO: Uncomment when API is ready
    // setLoading(true);
    // setError(null);

    // FAKE API RESPONSE - Commented out until API is ready
    // const fetchKmPlot = async () => {
    //   try {
    //     const response = await fetch('/graphql', {
    //       method: 'POST',
    //       headers: {
    //         'Content-Type': 'application/json',
    //       },
    //       body: JSON.stringify({
    //         query: `query kmPlot($c1: [String], $c2: [String], $c3: [String]) {\n  kmPlot(c1: $c1, c2: $c2, c3: $c3) {\n    id\n    time\n    event\n    group\n    __typename\n  }\n}`,
    //         variables: { c1, c2, c3 },
    //       }),
    //     });
    //     const result = await response.json();
    //     if (result.errors) {
    //       throw new Error(result.errors[0]? result.errors[0].message : "" || 'Unknown error');
    //     }
    //     setData(result.data.kmPlot || mocData);
    //   } catch (err) {
    //     setError(err);
    //     setData();
    //   } finally {
    //     setLoading(false);
    //   }
    // };

    // fetchKmPlot();

    // TEMPORARY: Simulate API call with mock data
    // Simulating async behavior with setTimeout
    setLoading(true);
    setTimeout(() => {
      // Fake successful response - using mock data
      setData(mocData);
      setLoading(false);
      setError(null);
    }, 500); // Simulate 500ms API delay
  }, [c1, c2, c3]);

  return { data, loading, error };
}
