import React, { useState, useContext } from 'react';
import TabPanel from './TabPanel';
import { tabContainers } from '../../../bento/dashboardTabData';
import { Tabs as BentoTabs }  from '@bento-core/tab';
import { customTheme } from './DefaultTabTheme';
import CohortModalGenerator from '../cohortModal/cohortModalGenerator';
import { CohortModalContext } from '../cohortModal/CohortModalContext';
import DeleteConfirmationModal from '../cohortModal/components/deleteConfirmationModal';


const Tabs = (props) => {
  const [currentTab, setCurrentTab] = tabContainers.length > 0 ? useState(1) : useState(0);
  const handleTabChange = (event, value) => {
    setCurrentTab(value);
  };

  const { showCohortModal, setShowCohortModal , setWarningMessage, warningMessage} = useContext(CohortModalContext);

  /**
  * 1. change <name> to <display> as array item
  * 2. <display> -> [tab.name, props.dashboardStats[tab.count]]
  */
  const getTabs = (tabs) => tabs.map((tab) => ({
    ...tab,
    name: tab.name,
    hasToolTip: true,
    toolTipText: tab.toolTipText,
    count: tab.count !== "none" ? `(${props.dashboardStats[tab.count].toLocaleString()})` : "(NA)",
    display: tab.count !== "none" ?  [tab.name, props.dashboardStats[tab.count].toLocaleString()] :"NA",
    clsName:  `${tab.name}`.toLowerCase().replace(' ', '_') ,
    tooltipStyles: {border: '1px solid #2D5380', arrowBorder: '1px solid #598AC5'}
  }));

  const { CohortModal } = CohortModalGenerator();

  return (
    <>
      <CohortModal
        open={showCohortModal}
        onCloseModal={() => setShowCohortModal(false)}
        />

      <DeleteConfirmationModal
           classes={""}
           open={warningMessage}
           setOpen={() => { setWarningMessage("") }}
           handleDelete={() => { setWarningMessage("") }}
           deletionType={false}
           message={warningMessage}
       />
       
      <BentoTabs
        tabItems={getTabs(tabContainers)}
        currentTab={currentTab}
        handleTabChange={handleTabChange}
        customTheme={customTheme}
      />
      {
        tabContainers.map((tab, index) => (
          <>
            <div hidden={currentTab !== index}>           
              <TabPanel
                {...props}
                tab={tab}
                config={tab}
                activeTab={index === currentTab}
              />
            </div>
          </>
        ))
      }
    </>
  );
};

export default Tabs;
