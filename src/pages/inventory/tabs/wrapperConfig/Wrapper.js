import {
  btnTypes,
  types,
} from '@bento-core/paginated-table';
import React, { useState } from 'react';
import {
  tooltipContentAddToNewCohort,
  tooltipContentAddToExistingCohort,
  tooltipContentListAll,
} from '../../../../bento/dashboardTabData';
import { alertMessage } from '../../../../bento/fileCentricCartWorkflowData';
import { CustomDropDown } from './CustomDropDown';
import { CustomButton } from './customButton';

const options = [
  "cohrot 2020 232323",
  "cohrot 2020 1293",
  "cohrot 2020 3425",
  "cohrot 2020 9923",
]

export const layoutConfig = [{
  container: 'buttons',
  size: 'xl',
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
        role: btnTypes.ADD_SELECTED_FILES,
        btnType: btnTypes.ADD_SELECTED_FILES,
        tooltipCofig: tooltipContentAddToNewCohort,
        conditional: false,
        CustomViewElem: () => {
          return (
            <CustomButton label={"CREATE COHORT"} />
          )
        },
        alertMessage,
      },
      {
        title: 'Add Participants to Existing Cohort',
        clsName: 'add_selected_button',
        type: types.CUSTOM_ELEM,
        role: btnTypes.ADD_SELECTED_FILES,
        btnType: btnTypes.ADD_SELECTED_FILES,
        section: 'addToExisting',
        tooltipCofig: tooltipContentAddToExistingCohort,
        conditional: true,
        CustomViewElem: () => {

          return (
            <CustomDropDown label={"ADD PARTICIPANTS TO EXISTING COHORT"} backgroundColor={"#0B4E75"} borderColor={"#73A9C7"} options={options} />
          )
        }
      },
      {
        title: 'View All Cohorts',
        clsName: 'add_selected_button',
        type: types.CUSTOM_ELEM,
        role: btnTypes.ADD_SELECTED_FILES,
        btnType: btnTypes.ADD_SELECTED_FILES,
        tooltipCofig: tooltipContentListAll,
        conditional: true,
        CustomViewElem: () => {

          return (
            <CustomDropDown isHidden={true} label={"VIEW ALL COHOROTS(" + options.length + ")"} backgroundColor={"#935824"} borderColor={"#C79673"} options={options} />
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


/**
* 1. addFileQuery - query to addAll files or add selected files on cart
* 2. responseKeys - provided respose key for addFileQuery
*/
export const configWrapper = (tab, configs) => {
  const wrpConfig = configs.map((container) => ({
    ...container,
    items: (!container.paginatedTable) ? container.items.map((item) => ({
      ...item,
      addFileQuery: (item.role === btnTypes.ADD_ALL_FILES)
        ? tab.addAllFileQuery : tab.addSelectedFilesQuery,
      dataKey: tab.addFilesRequestVariableKey,
      responseKeys: (item.role === btnTypes.ADD_ALL_FILES)
        ? tab.addAllFilesResponseKeys : tab.addFilesResponseKeys,
    })) : [],
  }));
  return wrpConfig;
};
