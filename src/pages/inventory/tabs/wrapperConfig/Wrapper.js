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

const GetOptions = () => {
  const { state } = useContext(CohortStateContext);
  return Object.keys(state);
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
          return (
            <CustomButton borderColor={"#73C7BE"} label={"CREATE COHORT"} backgroundColor={"#375C67"} type={"CREATE"} hoverColor={"#375C67"} />
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
          let options = GetOptions();
          return (
            <CustomDropDown label={"ADD PARTICIPANTS TO EXISTING COHORT"} backgroundColor={"#0B4E75"} borderColor={"#73A9C7"} options={options} />
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
  {
    container: 'buttons',
    size: 'xl',
    clsName: 'container_footer',
    items: [
    ],
  },
];

export const configWrapper = (tab, configs) => {
  const wrpConfig = configs.map((container) => ({
    ...container,
    items: (!container.paginatedTable) && (tab.name !== "Studies") ? container.items.map((item) => ({
      ...item,
    })) : [],
  }));
  return wrpConfig;
};
