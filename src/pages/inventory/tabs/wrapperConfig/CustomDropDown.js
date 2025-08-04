import { onRowSeclect, TableContext } from '@bento-core/paginated-table';
import { onRowSelectHidden } from '@bento-core/paginated-table/dist/table/state/Actions';
import { KeyboardArrowDownOutlined } from '@material-ui/icons';
import React, { useContext, useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import { onAddParticipantsToCohort } from '../../../../components/CohortSelectorState/store/action';
import { onCreateNewCohort } from '../../../../components/CohortSelectorState/store/action';
import { CohortStateContext } from '../../../../components/CohortSelectorState/CohortStateContext';
import { CohortModalContext } from '../../../../components/CohortModal/CohortModalContext';
import { useGlobal } from '../../../../components/Global/GlobalProvider';
import client from "../../../../utils/graphqlClient"
import { GET_PARTICIPANTS_OVERVIEW_QUERY } from '../../../../bento/dashboardTabData';
import { connect } from 'react-redux';
import { getFilters } from '@bento-core/facet-filter';
import CustomCheckBox from '../../../../components/CustomCheckbox/CustomCheckbox';
import DeleteConfirmationModal from '../../../../components/CohortModal/components/shared/DeleteConfirmationModal';

const DropdownContainer = styled.div`
  position: relative;
  margin-top: 10px;
  display: inline-block;
  width: 200px;
  margin-left: 20px;
  margin-bottom: 10px;
  top: -6px;
`;

const DropdownHeader = styled.div`
  font-size: 12px;
  font-family: 'Poppins';
  color: white;
  min-width: 189px;
  max-height: 41px;
  min-height: 41px;
  max-width: 189px;
  border-radius: 5px 5px 0 0;
  border-radius: ${(props) => (props.isOpen ? '5px 5px 0 0' : '5px')};
  background:  ${(props) => (props.isActive ? props.backgroundColor : "gray")}
  border: 1.25px solid ${(props) => (props.borderColor)};
  opacity: ${(props) => (props.isActive ? "1" : "0.4")}
  cursor: pointer;
  font-weight: 600;
  text-align: left;
  line-height: 1;
  display: flex;
  overflow: hidden;
  font-size: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-overflow: ellipsis;
  

`;

const Title = styled.div`
paddingLeft: 20px;
    align-self: center;
    justify-content: center;
    align-self: center;
    width: 70%;
    display: flex;
    font-size: 12px;
    overflow: hidden;
`


const Arrow = styled.span`
  transition: transform 0.3s;
  transform: ${(props) => (props.isOpen ? 'rotate(180deg)' : 'rotate(0)')};
   display: ${(props) => (props.isHidden ? ' none' : ' block)')};
`;

const DropdownList = styled.ul`
  position: absolute;
  min-width: 189px;
  max-width: 189px;
  left: 0;
  scrollbar-color: #003F74 #003F74;
  right: 0;
  background-color: #2A6E93;
  list-style: none;
  margin: 0;
  padding: 0;
  border-radius: 0 0 5px 5px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  border:  1px #73A9C7 solid;
  z-index: 1;
  overflow-y: scroll;
  max-height: 200px;
`;

const DropdownItem = styled.li`
  font-family: Poppins;
  font-size: 14px;
  font-weight: 500;
  line-height: 13px;
  letter-spacing: 0.02em;
  text-align: left;
  padding: 4px;
  max-height: 27px;
  padding-left: 18px;
  border: 0px 1px 1px 1px;
  border-color: #73A9C7;
  background-color: ${(props) =>
    props.isDisabled ? "#F0F0F0" : "#EFF2F6"};
  color: ${(props) => (props.isDisabled ? "#A0A0A0" : "#343434")};
  cursor: ${(props) => (props.isDisabled ? "default" : "pointer")};
  border-bottom: 1px solid #ccc;

  &:nth-child(even) {
    background-color: ${(props) =>
      props.isDisabled ? "#F0F0F0" : "#CCD5E1"};
  }

  &:last-child {
    border-bottom: none;
  }

  &.new-cohort-item {
    color: ${(props) => (props.isDisabled ? "#A0A0A0" : "#286273")};
    border: none;
    background-color: ${(props) => (props.isDisabled ? "#F0F0F0" : "#FFFFFF")};
  }

  &.new-cohort-item:first-child {
    font-weight: 700;
  }

  &.new-cohort-item:last-child {
    color: ${(props) => (props.isDisabled ? "#A0A0A0" : "#343434")};
  }

  &.existing-cohort-item:nth-child(1),
  &.existing-cohort-item:nth-child(2) {
    order: none;
    background-color: #ffffff;
    border-bottom: none;
  }

  &.existing-cohort-item:nth-child(1) {
    padding-top: 0.5rem;
  }

  &.existing-cohort-item:nth-child(2) {
    color: #00639d;
    font-weight: 700;
    border-bottom: 2px solid #00639d;
    padding-bottom: 1.5rem;
  }

  &.existing-cohort-item:nth-child(n+3) {
    display: flex;
    gap: 0.75rem;
    align-items: center;
    border-bottom: 1px solid #00639d;
  }

  &.existing-cohort-item:nth-child(odd) {
    background-color: #ffffff;
  }

  &.existing-cohort-item:last-child {
    border-bottom: none;
  }
`;


const CustomDropDownComponent = ({ options, label, isHidden, backgroundColor, type, borderColor, enabledWithoutSelect = null, filterState, localFindUpload, localFindAutocomplete }) => {

  const [isOpen, setIsOpen] = useState(false);
  const tableContext = useContext(TableContext);
  const [isActive, setIsActive] = useState(false);
  const [exceedLimitAllParticipant, setExceedLimitAllParticipant] = useState(false);
  const [exceedLimitSelectedParticipant, setExceedLimitSelectedParticipant] = useState(false);
  const [checkedItems, setCheckedItems] = useState([]);
  const [showPopupMessage,setShowPopupMessage] = useState("");
  const { setShowCohortModal, setWarningMessage } = useContext(CohortModalContext);

  useEffect(() => {
    const { context } = tableContext;
    const {
      hiddenSelectedRows = [],
    } = context;
    if (enabledWithoutSelect) {
      setIsActive(true);
    }
    else {
      setIsActive(hiddenSelectedRows.length > 0 && options.length > 0);
    }
  }, [tableContext, enabledWithoutSelect]);

  useEffect(() => {
    if (!isOpen) {
      setCheckedItems([]);
    }

  }, [isOpen]);

 
  useEffect(() => {
    if (checkedItems.length > 0) {
      const cohortState = JSON.parse(localStorage.getItem('cohortState'));
      let exceedItemFoundAll = false;
      let exceedItemFoundSelected = false;
      checkedItems.forEach((cohortId) => {
        const cohort = cohortState[cohortId];
        if (cohort) {
          const existingParticpantCount = cohort.participants.length;
          if ((existingParticpantCount + totalRowCount) > 4000) {
            setExceedLimitAllParticipant(true);
            exceedItemFoundAll = true;
          }
          if ((existingParticpantCount + hiddenSelectedRows.length) > 4000) {
            setExceedLimitSelectedParticipant(true);
            exceedItemFoundSelected = true;
          }
        }
      })
      if (!exceedItemFoundAll) {
        setExceedLimitAllParticipant(false);
      }
      if (!exceedItemFoundSelected) {
        setExceedLimitSelectedParticipant(false);
      }
    } else {
      setExceedLimitAllParticipant(false);
      setExceedLimitSelectedParticipant(false);
    }
  }, [checkedItems]);


  const toggleDropdown = () => isActive && setIsOpen(!isOpen);

  const clearSelection = () => {
    const { context } = tableContext;
    const {
      dispatch
    } = context;

    dispatch(onRowSeclect([]));
    dispatch(onRowSelectHidden([]));

  }
  const { Notification } = useGlobal();

  const triggerNotification = (count) => {
    if (count > 1) {
      Notification.show(" " + count + ' Participants added ', 5000,);
    } else {
      Notification.show(" " + count + ' Participant added ', 5000,);
    }

  };
  const { dispatch } = useContext(CohortStateContext);
  const { context } = tableContext;
  const {
    hiddenSelectedRows = [],
    totalRowCount = 0
  } = context;

  const buildCohortFormat = (jsonArray) => {
   const seen = new Set();
   const result = jsonArray.reduce((acc, item) => {
    const participant_id = typeof item.participant === 'object' ? item.participant.participant_id : item.participant_id;
    if(seen.has(participant_id)) return acc;
    seen.add(participant_id);
    acc.push({
      ...item,
      participant_id,
      participant_pk: typeof item.participant === 'object' ? item.participant.id : item.id,
    });
    return acc;
   },[]);
   return result;
 };




  const handleSelect = async (value) => {
    if (isActive && type === "existing") {
      const { context } = tableContext;
      const {
        hiddenSelectedRows = [],
      } = context;
      let toBeAdded = hiddenSelectedRows;
      setIsOpen(false);
      clearSelection();
      
      if (value === "all participants") {
        const activeFilters = {
          ...getFilters(filterState),
          participant_ids: [
            ...(localFindUpload || []).map((obj) => obj.participant_id),
            ...(localFindAutocomplete || []).map((obj) => obj.title),
          ],
        };
        let { data } = await client.query({
          query: GET_PARTICIPANTS_OVERVIEW_QUERY,
          variables: { ...activeFilters, first: 4000 },
          fetchPolicy: 'network-only'
        });
        toBeAdded = data.participantOverview.map((item) => ({ participant_id: item.participant_id, id: item.id, dbgap_accession: item.dbgap_accession }));

      }

      checkedItems.forEach((item)=>dispatch(onAddParticipantsToCohort(
        item,
        buildCohortFormat(toBeAdded),
        (count) => triggerNotification(count) // Pass as a callback
      )))
    }
    else {
      const { context } = tableContext;
      const {
        hiddenSelectedRows = [],
      } = context;

      let toBeAdded = hiddenSelectedRows;

      if (value === "all participants") {
       
        const activeFilters = {
          ...getFilters(filterState),
          participant_ids: [
            ...(localFindUpload || []).map((obj) => obj.participant_id),
            ...(localFindAutocomplete || []).map((obj) => obj.title),
          ],
        
        };
     
        let { data } = await client.query({
          query: GET_PARTICIPANTS_OVERVIEW_QUERY,
          variables: { ...activeFilters, first: 4000 },
          fetchPolicy: 'network-only'
        });
        toBeAdded = data.participantOverview.map((item) => ({ participant_id: item.participant_id, id: item.id, dbgap_accession: item.dbgap_accession }));
      }

      let participantCount = null;
      clearSelection();
      dispatch(onCreateNewCohort(
        "",
        "",
        buildCohortFormat(toBeAdded),
        (count) => {
          participantCount = count;
        },
        (error) => {
        setWarningMessage(error.toString().replace("Error:",""));
        }
      ));

      if (participantCount) {
        triggerNotification(participantCount);
        setShowCohortModal((prev)=>true);
      }
    }
  };
  const handleCheckbox = async (value) => {
    const isChecked = checkedItems.includes(value);

    if (isChecked) {
      setCheckedItems(checkedItems.filter((item)=>value!==item));
    }
    else {
      setCheckedItems([...checkedItems,value]);
    }
  };

  const onExistingOptionSelect = (option,isDisabled,totalRowCount) =>{
    if(option === "all participants" && totalRowCount>4000){
      setShowPopupMessage("You are not allowed to add more than 4000 participants in a single cohort");
    }if(option === "all participants" && exceedLimitAllParticipant){
      setShowPopupMessage("You are not allowed to add more than 4000 participants in a single cohort");
    }

    if(option === "selected participants" && isDisabled){
      setShowPopupMessage("You are not allowed to add more than 4000 participants in a single cohort");
    }
    if(!isDisabled){
      handleSelect(option);    }
  }
  
  const dropDownListRef = useRef(null);

  function useClickOutside(ref, onClickOutside) {
    useEffect(() => {
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          onClickOutside();
        }
      }
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref, onClickOutside]);
  }

  useClickOutside(dropDownListRef, () => setIsOpen(false));

  const getNewCohortDropDownItem = (index,option,hiddenSelectedRows,totalRowCount) => {
    if (option === "Selected Participants" && hiddenSelectedRows.length === 0) {
      return (
        <DropdownItem key={index} className='new-cohort-item' isDisabled={true}>{option}</DropdownItem>
      )
    }
    if (option === "All Participants" && totalRowCount > 4000) {
      return (
        <DropdownItem className='new-cohort-item' onClick={(() => {setShowPopupMessage("You are not allowed to add more than 4000 participants in a single cohort")})} isDisabled={false} key={index}>{option}</DropdownItem>
      )
    }
    return (
      <DropdownItem key={index} className='new-cohort-item' onClick={() => { handleSelect(option.toLowerCase()) }}>{option}</DropdownItem>
    )
  }

  const getExistingCohortDropDownItem = (index,option,hiddenSelectedRows,totalRowCount) => {
    const isAllParticipantDisabled = totalRowCount > 4000 || checkedItems.length ===0 || exceedLimitAllParticipant;
    const isSelectedParticipantDisabled = hiddenSelectedRows.length === 0 || checkedItems.length === 0 || exceedLimitSelectedParticipant;
    if (option === "Selected Participants") {
      return (
        <DropdownItem key={index}  isDisabled={isSelectedParticipantDisabled}  onClick={()=>{onExistingOptionSelect(option.toLowerCase(),isSelectedParticipantDisabled, totalRowCount)}}>{option}</DropdownItem>
      )
    }
    if (option === "All Participants" && checkedItems.length === 0) {
      return (
        <DropdownItem className='new-cohort-item' onClick={(() => {setShowPopupMessage("Please Select a cohort from the list")})} isDisabled={true} key={index}>{option}</DropdownItem>
      )
    }
    if (option === "All Participants" ) {
      return (
        <DropdownItem className='new-cohort-item' isDisabled={false} onClick={()=>{onExistingOptionSelect(option.toLowerCase(),isAllParticipantDisabled, totalRowCount)}} key={index}>{option}</DropdownItem>
      )
    }
    if (index > 1) {
      return (
        <DropdownItem key={index} className='existing-cohort-item' >
          <CustomCheckBox selectedItems={checkedItems} item={option.cohortId} handleCheckbox={handleCheckbox} />
          <span>{option.cohortName}</span>
        </DropdownItem>
      )
    }
  }

  return (
    <DropdownContainer isHidden={isHidden}>
      <DropdownHeader isOpen={isOpen} isActive={isActive} backgroundColor={backgroundColor} borderColor={borderColor} onClick={toggleDropdown}>
        <Title> {label} </Title>
        <Arrow isOpen={isOpen} isHidden={isHidden}>
          <KeyboardArrowDownOutlined />

        </Arrow>

      </DropdownHeader>
      {isOpen && (
        <DropdownList ref={dropDownListRef}>
          {options.map((option, index) => {
            if (type === "new") {
              return getNewCohortDropDownItem(index,option,hiddenSelectedRows,totalRowCount);
            }
            if (type === "existing") {
              return getExistingCohortDropDownItem(index,option,hiddenSelectedRows,totalRowCount);
            }
            return (
              <DropdownItem key={index} onClick={() => { handleSelect(option.toLowerCase()) }}>{option}</DropdownItem>
            )
          })}
        </DropdownList>
      )}
          <DeleteConfirmationModal
                classes={""}
                open={showPopupMessage}
                setOpen={() => { setShowPopupMessage("")  }}
                handleDelete={() => { setShowPopupMessage("") }}
                deletionType={false}
                message={showPopupMessage}
            />
    </DropdownContainer>
  );
};

const mapStateToProps = (state) => ({
  filterState: state.statusReducer.filterState,
  localFindUpload: state.localFind.upload,
  localFindAutocomplete: state.localFind.autocomplete,
});

export const CustomDropDown = connect(mapStateToProps, null)(CustomDropDownComponent);