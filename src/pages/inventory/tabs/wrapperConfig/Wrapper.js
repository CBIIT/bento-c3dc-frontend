import {
  btnTypes,
  types,
} from '@bento-core/paginated-table';
import React, { useState } from 'react';
import {
  tooltipContentAddAll, tooltipContent,
} from '../../../../bento/dashboardTabData';
import { alertMessage } from '../../../../bento/fileCentricCartWorkflowData';
import { Button, FormControl, InputLabel, MenuItem, Select } from '@material-ui/core';
import { customTheme } from './Theme';
import { CustomDropDown } from './CustomDropDown';




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
      clsName: 'add_all_button',
      type: types.BUTTON,
      role: btnTypes.ADD_ALL_FILES,
      btnType: btnTypes.ADD_ALL_FILES,
      tooltipCofig: tooltipContentAddAll,
      conditional: false,
      alertMessage,
    },
    {
      title: 'Add Participants to Existing Cohort',
      clsName: 'add_selected_button',
      type: types.CUSTOM_ELEM,
      role: btnTypes.ADD_SELECTED_FILES,
      btnType: btnTypes.ADD_SELECTED_FILES,
      tooltipCofig: tooltipContent,
      conditional: true,
      CustomViewElem: ()=> {

        return(

          <CustomDropDown options={options} />
         )
      }
    },
    {
      title: 'View All Cohorts',
      clsName: 'add_selected_button',
      type: types.BUTTON,
      role: btnTypes.ADD_SELECTED_FILES,
      btnType: btnTypes.ADD_SELECTED_FILES,
      tooltipCofig: tooltipContent,
      conditional: true,
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
