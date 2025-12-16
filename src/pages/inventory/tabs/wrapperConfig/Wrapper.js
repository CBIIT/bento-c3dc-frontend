import {
  btnTypes,
  types,
} from '@bento-core/paginated-table';
import React, { useContext } from 'react';
import {
  tooltipContentAddToNewCohort,
  tooltipContentAddToExistingCohort,
  tooltipContentListAll,
} from '../../../../bento/dashboardTabData';
import { alertMessage } from '../../../../bento/fileCentricCartWorkflowData';
import { CustomDropDown } from './CustomDropDown';
import { CustomButton } from './customButton';
import { CohortStateContext } from '../../../../components/CohortSelectorState/CohortStateContext';

const GetOptions = () => { //This function has been updated to return the name field instead of the ID field
  const { state } = useContext(CohortStateContext);
  return Object.values(state).map(cohort => cohort.cohortName);
}

const getParticipants = () => { 
  const { state } = useContext(CohortStateContext);
  return ["All Participants", "Selected Participants", ...Object.values(state).map(cohort => ({cohortId:cohort.cohortId, cohortName:cohort.cohortName}))];
}

const getParticipantOptions = () => { 
  return ["All Participants", "Selected Participants"];
}

export const layoutConfig = [{
  container: 'buttons',
  size: 'xxl',
  clsName: 'container_header',
  items: [
  ],
}];

/**
* Configuration display component based on index
* CAUTION: provide position of table component
*/
export const wrapperConfig = [
  {
    container: 'buttons',
    size: 'xl',
    clsName: 'container_header',
    items: [
      {
        title: 'Create Cohort',
        clsName: 'add_selected_button',
        type: types.CUSTOM_ELEM,
        role: btnTypes.CUSTOM_ELEM,
        btnType: btnTypes.CUSTOM_ELEM,
        tooltipCofig: tooltipContentAddToNewCohort,
        conditional: false,
        CustomViewElem: () => {
          const options = getParticipantOptions();
          return (
            <CustomDropDown borderColor={"#73C7BE"} label={"CREATE NEW COHORT"} backgroundColor={"#375C67"} type={"new"} options={options} enabledWithoutSelect={true}/>
          )
        },
        alertMessage,
      },
      {
        title: 'Add Participants to Existing Cohort',
        clsName: 'add_selected_button',
        type: types.CUSTOM_ELEM,
        role: btnTypes.CUSTOM_ELEM,
        btnType: btnTypes.CUSTOM_ELEM,
        section: 'addToExisting',
        tooltipCofig: tooltipContentAddToExistingCohort,
        conditional: true,
        CustomViewElem: () => {
          let options = getParticipants();
          return (
            <CustomDropDown label={"ADD PARTICIPANTS TO EXISTING COHORT"} backgroundColor={"#0B4E75"} borderColor={"#73A9C7"} options={options} type={"existing"} enabledWithoutSelect={true}/>
          )
        }
      },
      {
        title: 'View All Cohorts',
        clsName: 'add_selected_button',
        type: types.CUSTOM_ELEM,
        role: btnTypes.CUSTOM_ELEM,
        btnType: btnTypes.CUSTOM_ELEM,
        tooltipCofig: tooltipContentListAll,
        conditional: true,
        CustomViewElem: () => {
          let options = GetOptions();
          return (
            <CustomButton borderColor={"#C79673"} label={"VIEW ALL COHORTS(" + options.length + ")"} cohortsAvailable={options.length > 0} backgroundColor={"#935824"} hoverColor={"#704015"} type={"VIEW"} />
          )
        },
        alertMessage,
      }],
  },
  {
    container: 'paginatedTable',
    paginatedTable: true,
  },
  /* Unused Footer Button Container currently renders empty container */
  /*
  {
    container: 'buttons',
    size: 'xl',
    clsName: 'container_footer',
    items: [
    ],
  },*/
];

export const configWrapper = (tab, configs) => {
  // For Studies tab, filter out the header button container
  if (tab.name === "Studies") {
    return configs.filter((container) => container.clsName !== 'container_header');
  }
  return configs;
};
