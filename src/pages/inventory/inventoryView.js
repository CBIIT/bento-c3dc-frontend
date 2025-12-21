import React, { useState , useMemo } from 'react';
import {
  useLocation,
  //useNavigate,
} from "react-router-dom";
import { 
  Button,
  Divider,
  withStyles,
} from '@material-ui/core';
import styled from 'styled-components';
import { ClearAllFiltersBtn } from '@bento-core/facet-filter';
import store from '../../store';
import {
  resetAllData,
} from '@bento-core/local-find';
//import { generateQueryStr } from '@bento-core/util';
import { 
  resetIcon, 
  facetsConfig,
  //queryParams, 
  sectionLabel, 
  obtainColorFromFacetIndex,
} from '../../bento/dashTemplate';
import styles from './inventoryStyle';
import NewBentoFacetFilter from './sideBar/NewBentoFacetFilter';
import WidgetView from './widget/WidgetView';
import StatsView from '../../components/Stats/StatsView';
import TabsView from './tabs/TabsView';
import QueryBarView from './filterQueryBar/QueryBarView';
import UserGuideButton from './sideBar/ExploreUserGuide';
import { CircularProgress } from '@material-ui/core';
import vectorIcon from '../../assets/icons/Vector_icon.svg';
import closeIcon from '../../assets/icons/Window_Close_Icon.svg';

const ULSection = styled.ul`
  li {
    cursor: pointer;
    
    .categoryIcon {
      display: none;
    }
    
    &:hover {    
      .categoryIcon {
        display: block;
      }
    }
  }

  .categoryItemSelected {
    .categoryIcon {
      display: block;
    }
  }
`;

const SideBarContentPanel = styled.div`
  width: ${(props) => (props.selected === -1 ? '262px' : '270px')};
  margin-left: ${(props) => (props.selected === -1 ? '-262px' : '0px')};
  padding: 10px 0 0 0;
  background-color: transparent;
  transition: all .5s;
  background-color: #FFFFFF;
`;

const RightContentPanel = styled.div`
  width: ${(props) => (props.selected === -1 ? 'calc(100% - 270px)' : 'calc(100% - 540px)')};
  position: relative;
  border-right: thin solid #8A7F7C;
  border-left: thin solid #8A7F7C;
  transition: all .5s;
`;

const Inventory = ({
  classes,
  dashData,
  activeFilters,
  unknownAgesState,
}) => {
  const [selectedSection, setSelectedSection] = useState(-1);

  // Calculate filter-related counts and lists using memoization for performance
  const {
    activeFiltersCount, // Total number of active filters across all sections
    sectionList,        // List of unique section names from facet config
    sectionCount        // Count of active filters per section
  } = useMemo(() => {
    // Return empty values if facet config is missing
    if (!facetsConfig || !facetsConfig.length) {
      return { activeFiltersCount: 0, sectionList: [], sectionCount: {} };
    }
  
    // Get current URL parameters
    const query = new URLSearchParams(useLocation().search);
    
    // Create list of sections with their active filter counts
    const facetsConfigList = facetsConfig.map(item => {
      let count = (activeFilters && activeFilters[item.datafield] ? activeFilters[item.datafield].length : 0);
      
      // For slider-type facets, check both Redux state and URL parameters for unknownAges
      if (item.type === 'slider') {
        let unknownAges = 'include'; // default value
        
        // First check Redux state
        if (unknownAgesState && unknownAgesState[item.datafield]) {
          unknownAges = unknownAgesState[item.datafield];
        }
        // If not in Redux state, check URL parameters
        else {
          const unknownAgesParam = `${item.datafield}_unknownAges`;
          const urlUnknownAges = query.get(unknownAgesParam);
          if (urlUnknownAges) {
            unknownAges = urlUnknownAges;
          }
        }
        
        if (unknownAges !== 'include') {
          count += 1; // Count unknownAges selection as an active filter
        }
      }
      
      return {
        section: item.section,
        datafield: item.datafield,
        count: count
      };
    });
  
    // Get unique list of section names
    const sectionList = [...new Set(facetsConfig.map(item => item.section))];
    
    // Calculate total number of active filters across all sections
    let activeFiltersCount = 0;
    const ageRelatedParams = ['age_at_diagnosis', 'age_at_treatment_start', 'age_at_response', 'age_at_last_known_survival_status', 'participant_age_at_collection'];
    
    // Count filters, but handle age-related facets specially to avoid double counting
    Object.keys(activeFilters || {}).forEach(key => {
      if (ageRelatedParams.includes(key)) {
        // For age-related facets, only count once regardless of slider or unknownAges
        const hasSliderFilter = activeFilters[key] && activeFilters[key].length > 0;
        
        let hasUnknownAgesFilter = false;
        let unknownAges = 'include';
        
        // Check Redux state first
        if (unknownAgesState && unknownAgesState[key]) {
          unknownAges = unknownAgesState[key];
        }
        // If not in Redux state, check URL parameters
        else {
          const unknownAgesParam = `${key}_unknownAges`;
          const urlUnknownAges = query.get(unknownAgesParam);
          if (urlUnknownAges) {
            unknownAges = urlUnknownAges;
          }
        }
        
        hasUnknownAgesFilter = unknownAges !== 'include';
        
        // Count as one filter if either slider or unknownAges is active
        if (hasSliderFilter || hasUnknownAgesFilter) {
          activeFiltersCount += 1;
        }
      } else {
        // For non-age-related facets, count normally
        activeFiltersCount += activeFilters[key].length;
      }
    });
  
    // Calculate total active filters per section
    const sectionCount = facetsConfigList.reduce((acc, item) => {
      acc[item.section] = (acc[item.section] || 0) + item.count;
      return acc;
    }, {});
  
    return { activeFiltersCount, sectionList, sectionCount };
  }, [facetsConfig, activeFilters, unknownAgesState, useLocation().search]); // Only recalculate when these dependencies change

  /**
    * Clear All Filter Button
    * Custom button component
    * bento core params
    * 1. onClearAllFilters - dispatch clear all filters
    * 2. disable - true/ false
  */
  const CustomClearAllFiltersBtn = ({ onClearAllFilters, disable }) => {
    const [isHover, setIsHover] = useState(false);
    //const query = new URLSearchParams(useLocation().search);
    //const navigate = useNavigate();
    return (
      <div className={classes.floatRight}>
        <Button
          id="button_sidebar_clear_all_filters"
          variant="outlined"
          disabled={disable}
          onClick={() => {
            /*
            const paramValue = {
              'p_id': '', 'u': '', 'u_fc': '', 'u_um': '', 'sex_at_birth': '', 'race': '',
              'age_at_diagnosis': '', 'age_at_diagnosis_unknownAges': '', 'diagnosis': '', 'diagnosis_anatomic_site': '', 'diagnosis_classification_system': '', 'diagnosis_basis': '', 'disease_phase': '',
              'treatment_type': '', 'treatment_agent': '', 'age_at_treatment_start': '', 'age_at_treatment_start_unknownAges': '', 'response_category': '', 'age_at_response': '', 'age_at_response_unknownAges': '',
              'age_at_last_known_survival_status': '', 'age_at_last_known_survival_status_unknownAges': '', 'first_event': '', 'last_known_survival_status': '',
              'participant_age_at_collection': '', 'participant_age_at_collection_unknownAges': '', 'sample_anatomic_site': '', 'sample_tumor_status': '', 'tumor_classification': '',
              'data_category': '', 'file_type': '', 'dbgap_accession': '', 'study_name': '', 'study_status': '',
              'library_selection': '', 'library_strategy': '', 'library_source_material': '', 'library_source_molecule': ''
            };
            const queryStr = generateQueryStr(query, queryParams, paramValue);
            navigate(`/explore${queryStr}`);*/
            onClearAllFilters();
            store.dispatch(resetAllData());
            
            // Reset unknownAges state to default values
            const ageRelatedParams = ['age_at_diagnosis', 'age_at_treatment_start', 'age_at_response', 'age_at_last_known_survival_status', 'participant_age_at_collection'];
            ageRelatedParams.forEach(param => {
              store.dispatch({
                type: 'UNKNOWN_AGES_CHANGED',
                payload: {
                  datafield: param,
                  unknownAges: 'include',
                },
              });
            });
          }}
          className={classes.customButton}
          onMouseEnter={() => setIsHover(true)}
          onMouseLeave={() => setIsHover(false)}
          style={disable ? { border: '1px solid #ffffff' } : {}}
        >
          <img
            src={isHover ? resetIcon.srcHover : resetIcon.src}
            height={resetIcon.size}
            width={resetIcon.size}
            alt={resetIcon.alt}
          />
        </Button>
        <span className={disable
          ? classes.resetTextDisabled : classes.resetText}
        >
          Clear all filtered selections
        </span>
      </div>
    );
  };
  
  const handleCategoryClick = (categoryID) => {
    if(categoryID === selectedSection) {
      setSelectedSection(-1);
    } else {
      setSelectedSection(categoryID);
    }
  };

  const handleCloseContentPanelClick = (event) => {
    event.preventDefault();
    setSelectedSection(-1);
  };

  if (!dashData) {
    return (<div style={{"height": "1200px","paddingTop": "10px"}}><div style={{"margin": "auto","display": "flex","maxWidth": "1800px"}}><CircularProgress /></div></div>);
  }

  return (
    <div className={classes.dashboardContainer}>
      <StatsView data={dashData} />
      <div className={classes.contentBox}>
        <div className={classes.content}>
          <div className={classes.sideBar}>
            <div className={classes.sideBarCover} />
            <label htmlFor="local_find_input" style={{ display: 'none' }}>Participant ID Text Search box</label>
            <div className={classes.sideBarMenuSider}>
              <UserGuideButton />
              <ClearAllFiltersBtn
                Component={CustomClearAllFiltersBtn}
                activeFilters={activeFilters}
              />
              <div className={classes.activeFiltersCountContainer}>
                <div className={classes.activeFiltersCount}>
                  Total Filters Selected:
                  <span>
                    {activeFiltersCount}
                  </span>
                </div>
              </div>
              <ULSection className={classes.siderContent}>
                {
                  sectionList.map((category, idx) => {
                    return (
                      <React.Fragment key={category}>
                        <li onClick={() => handleCategoryClick(idx)}>
                          <div className={classes.categoryContainer}>
                            <div className={classes.categoryTitleContainer}>
                              <span className={classes.categoryTitle}>{sectionLabel[category] !== undefined ? sectionLabel[category] : category}</span>
                              <span className={classes.categoryCount}>
                                {sectionCount[category] !== 0 ? (
                                  <svg width="9" height="9" viewBox="0 0 9 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <circle cx="4.5" cy="4.5" r="4.5" fill={obtainColorFromFacetIndex(idx).facetCategoryColor} />
                                  </svg>
                                ) : ''}
                              </span>
                            </div>
                            {selectedSection === idx && <img src={vectorIcon} alt="vector" className={classes.categoryIcon} />}
                          </div>
                        </li>
                        <Divider className={`${classes.divider} divider${idx}`}/>
                      </React.Fragment>
                    );
                  })
                }
              </ULSection>
              <div className={classes.activeFilterLegend}>
                <span>Facets(s) selected denoted with</span>
                <svg width="9" height="9" viewBox="0 0 9 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="4.5" cy="4.5" r="4.5" fill="#616161" />
                </svg>
              </div>
            </div>
          </div>
          {
            <SideBarContentPanel selected={selectedSection}>
              <div className={classes.contentPanelHeader}>
                <a href='/#' onClick={(event) => handleCloseContentPanelClick(event)}>
                  <img src={closeIcon} alt="close" className={classes.closeIcon} />
                </a>
              </div>
              <div className={classes.contentPanelBody}>
                <div className={classes.facetsWrapper}>
                  <NewBentoFacetFilter
                    searchData={dashData}
                    activeFilters={activeFilters}
                    selectedSection={selectedSection}
                    unknownAgesState={unknownAgesState}
                  />
                </div>
              </div>
            </SideBarContentPanel>
          }
          <RightContentPanel selected={selectedSection}>
            <div className={classes.widgetsContainer}>
              <QueryBarView data={dashData} unknownAgesState={unknownAgesState} />
              <WidgetView
                data={dashData}
                activeFilters={activeFilters}
              />
              <TabsView
                dashboardStats={dashData}
                activeFilters={activeFilters}
              />
            </div>
          </RightContentPanel>
        </div>
      </div>
    </div>
  );
};

export default withStyles(styles)(Inventory);
