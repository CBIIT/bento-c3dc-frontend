import { onRowSeclect, TableContext } from '@bento-core/paginated-table';
import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import { useGlobal } from '../../../../components/Global/GlobalProvider';
import { onCreateNewCohort } from '../../../../components/CohortSelectorState/store/action';
import { CohortStateContext } from '../../../../components/CohortSelectorState/CohortStateContext';
import { CohortModalContext } from '../../CohortModal/CohortModalContext';
import { onRowSelectHidden } from '@bento-core/paginated-table/dist/table/state/Actions';

const ButtonContainer = styled.div`
  position: relative;
  margin-top: 10px;
  display: inline-block;
  width: 200px;
  margin-left: 20px;
`;

const ButtonStyled = styled.button`
  font-size: 18px;
  font-family: 'Poppins';
  color: white;
  width: 189px;
  min-height: 41px;
  max-width: 189px;
  border-radius: 5px;
  border: 1.25px ${(props) => (props.borderColor)} solid;
  background: ${(props) => (props.backgroundColor)};
  cursor: pointer;
  font-weight: 600;
  text-align: center;
  line-height: 1;
  opacity: ${(props) => props.isActive ? "1" : "0.4"}
  display: flex;
  justify-content: center;
  align-items: center;
  text-overflow: ellipsis;

  
  &:hover {
    background-color:${(props) => (props.hoverColor)};
  }
  
  .title {
    width: 100%;
    display: flex;
    justify-content: center;
    font-size: 12px;
    
  }
`;

export const CustomButton = ({ label, backgroundColor, type, hoverColor, cohortsAvailable, borderColor }) => {

  const tableContext = useContext(TableContext);
  const { dispatch } = useContext(CohortStateContext);
  const { setShowCohortModal, setWarningMessage, setCurrentCohortChanges} = useContext(CohortModalContext);
  const { Notification } = useGlobal();
  const [isActive, setIsActive] = useState(false);

  const triggerNotification = (count) => {
    if (count > 1) {
      Notification.show(" " + count + ' Participants added ', 5000,);
    } else {
      Notification.show(" " + count + ' Participant added ', 5000,);
    }

  };

  useEffect(() => {
    if (type === "VIEW") {
      setIsActive(cohortsAvailable);
    } else {
      const { context } = tableContext;
      const {
        hiddenSelectedRows = [],
      } = context;
      setIsActive(hiddenSelectedRows.length > 0);
    }

  }, [tableContext])

  const clearSelection = () => {
    const { context } = tableContext;
    const {
      dispatch
    } = context;

    dispatch(onRowSeclect([]));
    dispatch(onRowSelectHidden([]));
  }

  const buildCohortFormat = (jsonArray) => {
    return jsonArray.map(item => ({
      ...item,
      participant_id: typeof item.participant === 'object' ? item.participant.participant_id : item.participant_id,
      participant_pk:  typeof item.participant === 'object' ? item.participant.id : item.id,
    }));
  };

  const handleClick = () => {
    if (isActive) {
      if (type === "VIEW") {
        setShowCohortModal(true);
        setCurrentCohortChanges(null);
      } else {
        const { context } = tableContext;
        const {
          hiddenSelectedRows = []
        } = context;
        clearSelection();
        setCurrentCohortChanges(null);
        dispatch(onCreateNewCohort(
          "",
          "",
         buildCohortFormat(hiddenSelectedRows),
          (count) => { 
            triggerNotification(count);
            setShowCohortModal(true);
          },
          (error) => {
          
          setWarningMessage(error.toString().replace("Error:",""));
          }
        ));
      }

    }
  };


  return (
    <ButtonContainer>
      <ButtonStyled borderColor={borderColor} isActive={isActive} backgroundColor={backgroundColor} onClick={handleClick} hoverColor={hoverColor}>
        <span className="title">{label}</span>
      </ButtonStyled>
    </ButtonContainer>
  );
};
