
/**
 * Default configuration for Cohort Selector Modal
 * This serves as both a fallback and template for developers.
 */
export const DEFAULT_CONFIG_COHORTMODAL = {
    // Misc. Configuration Options
    config: {
      title: 'View of All Cohorts',

      // Default Configuration for the Cohort List Subcomponent
      cohortList: {
        listHeading: 'COHORTS',
        listItemPrefix: 'Cohort ID:',
      },
      cohortDetails: {
        datePrefix: 'Last Updated:',
        cohortHeaderLabel: 'Cohort ID:',
        cohortCountsLabel: 'PARTICIPANTS IDs',
      },
    },
  
    // Helper functions used by the component
    functions: {
      /**
       * Callback function called when the modal is closed.
       *
       * @param void
       * @return void
       */
      modalClosed: () => {},
  
    },
  };
  
  export default DEFAULT_CONFIG_COHORTMODAL;