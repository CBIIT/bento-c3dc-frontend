import { onRowSeclect, TableContext } from '@bento-core/paginated-table';
import React, { useContext, useEffect, useReducer, useState } from 'react';
import styled from 'styled-components';
import { useGlobal } from '../../../../components/Global/GlobalProvider';
import NotificationView from '../../../../components/Notifications/NotifactionView';
import NotificationFunctions from '../../../../components/Notifications/NotificationFunctions';

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
  border: 1.25px #73C7BE solid;
  background: ${(props) => (props.backgroundColor )};
  cursor: pointer;
  font-weight: 600;
  text-align: center;
  line-height: 1;
  opacity: ${(props) => props.isActive ? "1": "0.4"}
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

export const CustomButton = ({ label, backgroundColor,type,hoverColor,cohortsAvailable }) => {

  const tableContext = useContext(TableContext);
  
  const { Notification } = useGlobal();
  const [isActive,setIsActive] = useState(false);

  const triggerNotification = (count) => {
    Notification.show(" " + count + ' Participants added ', 5000,); 
  };
  useEffect(() => {
    if(type == "VIEW"){
      setIsActive(cohortsAvailable);
    }else{
      const { context } = tableContext;
      const {
        hiddenSelectedRows = [],
      } = context;
      setIsActive(hiddenSelectedRows.length > 0);
    }
   
  },[tableContext])
  
  
  const handleClick = () => {
    const { context } = tableContext;
    const {
      hiddenSelectedRows = [],
    } = context;
    
    
    triggerNotification(hiddenSelectedRows.length);
  };

  return (
    <ButtonContainer>
      <ButtonStyled isActive={isActive} backgroundColor={backgroundColor} onClick={handleClick} hoverColor={hoverColor}>
        <span className="title">{label}</span>
      </ButtonStyled>
    </ButtonContainer>
  );
};
