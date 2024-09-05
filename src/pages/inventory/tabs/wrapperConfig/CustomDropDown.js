import { ArrowDownward, ArrowDropDownOutlined, ArrowUpwardRounded } from '@material-ui/icons';
import React, { useState } from 'react';
import styled from 'styled-components';

const DropdownContainer = styled.div`
  position: relative;
  margin-top: 10px;
  display: inline-block;
  width: 200px;
  margin-left: 20px;
`;

const DropdownHeader = styled.div`
  font-size: 18px;
  font-family: 'Poppins';
  color: white;
  min-width: 189px;
  min-height: 41px;
  max-width: 189px;

  border-radius: 5px 5px 0 0;
  border-radius: ${(props) => (props.isOpen ? '5px 5px 0 0' : '5px')};
  background: #0B4E75;
  cursor: pointer;
  font-weight: 600;
  text-align: left;
  line-height: 1;
  display: flex;
  overflow: hidden;
  font-size: 17px;
  align-items: center;
  justify-content: center;
  text-overflow: ellipsis;
  
.title{
    align-self: center;
    justify-content: space-evenly;
    width: 90%;
    display: flex;
    margin-left: 30px;
    font-size: 16px;
}
  
`;

const Arrow = styled.span`
  transition: transform 0.3s;
  transform: ${(props) => (props.isOpen ? 'rotate(180deg)' : 'rotate(0)')};
`;

const DropdownList = styled.ul`
  position: absolute;
  min-width: 189px;
  max-width: 189px;
  left: 0;
  right: 0;
  background-color: #2A6E93;
  list-style: none;
  margin: 0;
  padding: 0;
  border-radius: 0 0 5px 5px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
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
    cursor: pointer;
    padding: 4px;
    border-bottom: 1px solid #ccc;
    max-height: 27px;
    text-align: center;
    border: 0px 1px 1px 1px;
    border-color: #73A9C7;
    background-color: #EFF2F6;
    color: #343434;
    &:nth-child(even){
        background-color: #CCD5E1; 
    }
  &:last-child {
    border-bottom: none;
  }
`;

export const CustomDropDown = ({options}) => {
  const [selectedValue, setSelectedValue] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleSelect = (value) => {
    setSelectedValue(value);
    setIsOpen(false);
  };

  return (
    <DropdownContainer>
      <DropdownHeader isOpen={isOpen}  onClick={toggleDropdown}>
       <span className='title'> {selectedValue ? `  ${selectedValue}` : 'Add To Existing Cohort'}
        <Arrow isOpen={isOpen}>
        <ArrowDropDownOutlined />

        </Arrow>
        </span> 
      </DropdownHeader>
      {isOpen && (
        <DropdownList>
            {options.map((option,index)=>{
return (
    <DropdownItem  onClick={() => handleSelect(option)}>{option}</DropdownItem>
        
)
            })}
        </DropdownList>
      )}
    </DropdownContainer>
  );
};
