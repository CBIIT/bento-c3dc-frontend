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
  "COHORT ID: 232323",
  "COHORT ID: 232323",
  "COHORT ID: 342527",
  "COHORT ID: 992329",
  "COHORT ID: 232323",
  "COHORT ID: 129329",
  "COHORT ID: 342598",
  "COHORT ID: 992399",
  "COHORT ID: 232323",
  "COHORT ID: 129387",
  "COHORT ID: 342524",
  "COHORT ID: 992326",
]

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
            <CustomButton label={"CREATE COHORT"} backgroundColor={"#375C67"} type={"CREATE"} hoverColor={"#37"} />
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
          
          return (
            <CustomButton label={"VIEW ALL COHORTS(" + options.length + ")"} cohortsAvailable={options.length > 0} backgroundColor={"#935824"} hoverColor={"#704015"} type={"VIEW"}/>
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
