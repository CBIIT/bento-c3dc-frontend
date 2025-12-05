import { CCDI_INTEROP_SERVICE_URL } from '../../../bento/cohortModalData';

export const generateUrl = async (queryStr, root, setUrlCallback) => {
    try {
      const graphqlQuery = `
        query storeManifest($manifestString: String!, $type: String!) {
          storeManifest(manifest: $manifestString, type: $type)
        }
      `;

      const response = await fetch(CCDI_INTEROP_SERVICE_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: graphqlQuery,
          variables: {
            manifestString: JSON.stringify({ key: encodeURIComponent(queryStr) }),
            type: 'json',
          },
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();

      if (result.errors) {
        const errorMessage = (result.errors[0] && result.errors[0].message) || 'Unknown error';
        throw new Error(`CCDI Interop Service Error: ${errorMessage}`);
      }

      // Process and open the URL
      const processedUrl = (result.data && result.data.storeManifest) || null;
      if (!processedUrl) {
        throw new Error('No valid URL returned from interop service');
      }

      setUrlCallback(root.slice(0, -1).concat(`?filterQuery=${processedUrl}`));
    } catch (error) {
      console.log('Error generating URL:', error);
    }
  };