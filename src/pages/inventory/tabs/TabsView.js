import React, { useContext } from 'react';
import { connect, useDispatch } from 'react-redux';
import {
  useLocation,
  useNavigate,
} from "react-router-dom";
import { generateQueryStr } from '@bento-core/util';
import {
  changeTab,
} from '../../../components/Inventory/InventoryState';
import { queryParams } from '../../../bento/dashTemplate';
import TabPanel from './TabPanel';
import { tabContainers, tabResponsiveBreakpoints } from '../../../bento/dashboardTabData';
import { Tabs as BentoTabs }  from '@bento-core/tab';
import { customTheme } from './DefaultTabTheme';
import CohortModal from '../../../components/CohortModal/CohortModal';
import { CohortModalContext } from '../../../components/CohortModal/CohortModalContext';
import DeleteConfirmationModal from '../../../components/CohortModal/components/shared/DeleteConfirmationModal';


const Tabs = (props) => {
  const { currentTab } = props;
  const { showCohortModal, setShowCohortModal , setWarningMessage, warningMessage } = useContext(CohortModalContext);
  const dispatch = useDispatch();
  const query = new URLSearchParams(useLocation().search);
  const navigate = useNavigate();

  const handleTabChange = (event, value) => {
    let paramValue = {};
    paramValue.tab = value;
    const queryStr = generateQueryStr(query, queryParams, paramValue);
    navigate(`/explore${queryStr}`, { replace: false });
    dispatch(changeTab(value, 'not-facet'));
  };

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
        enableGrouping={true}
        responsiveBreakpoints={tabResponsiveBreakpoints}
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

const mapStateToProps = (state) => ({
  currentTab: state.inventoryReducer.tab
});

export default connect(mapStateToProps, null)(Tabs);