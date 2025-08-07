import styled from 'styled-components';

export const barColors = {
  colorA: '#FCF1CC',
  colorB: '#A4E9CB',
  colorC: '#A2CCE8'
};

export const HistogramContainer = styled.div`
  background: white;
  border: 0.75px solid #679AAA;
  border-radius: 8px;
  padding: 20px;
  margin: 20px 0 0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  min-width: 50%;
  max-width: 50%;
  margin-left: 10px;
  min-height: 682px;
  height: auto;
  @media (max-width: 1660px) {
    max-width: 100%;
  }

`;


export const DatasetSelectionTitle = styled.div`
  font-family: Poppins; 
  font-size: 19px;
  color: ${props => props.disabled ? '#999999' : '#000000'};
  opacity: ${props => props.disabled ? 0.8 : 1};
`;


export const ChartTitle = styled.h3`
  font-family: Poppins; 
  font-size: 19px;
  font-weight: 600;
  color: #333;
  margin-bottom: 20px;
  text-align: left;

  &.empty {
    opacity: 0.3;
  }
`;

export const ChartActionButtons = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  width: 200px;
  justify-content: flex-end;
  margin: 10px;
`;

export const CenterContainer = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
width: 100%;
align-items: center;
align-content: center;
  @media (min-width: 1660px) {
  justify-content: flex-start;
  align-items: flex-start;
    }
`;

export const ChartWrapper = styled.div`
  position: relative;
  width: 66%;
  min-height: 261px;
  max-height: 261px;
  margin-bottom: 10px;
  padding: 0px;
  border: 1px solid #D4D4D4;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  border-radius: 10px;
  &:hover {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }
    @media (min-width: 1660px) {
    width: 100%;
    }
`;

export const HeaderSection = styled.div`
display: flex;
justify-content: space-between;
height: 50px;
margin: 0;
width: 100%;
margin-left: 5px;
padding-left: 15px;
`;

export const RadioGroup = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 15px;
  gap: 20px;
  justify-content: flex-end;
  flex-direction: column;
  width: 110px;
  height: 75%;
`;

export const RadioLabel = styled.label`
  display: flex;
  align-items: center;
  font-family: Poppins;
  font-size: 14px;
  color: #666;
  cursor: pointer;
`;

export const RadioInput = styled.input`
  margin-right: 8px;
  accent-color: #3A7587;
  width: 16px;
  height: 16px;
`;


export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1500;
`;

export const ModalContent = styled.div`
  background: white;
  border-radius: 8px;
  padding: 20px;
  width: 90%;
  max-width: 1200px;
  height: 80%;
  max-height: 800px;
  position: relative;
  z-index: 2000px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
`;

export const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: #666;
  &:hover {
    color: #333;
  }
`;

export const ModalChartWrapper = styled.div`
  width: 100%;
  height: calc(100% - 100px);
  margin-top: 20px;
`;

export const TabContainer = styled.div`
  display: flex;
  border-bottom: 1px solid #e0e0e0;
  margin-bottom: 20px;
  flex: 1;
`;

export const Tab = styled.button`
  background: #ffffff;
  border: none;
  padding: 12px 24px;
  cursor: pointer;
  font-family: 'Nunito', sans-serif;
  font-size: 20px;
  color: ${props => props.active ? '#4A5C5E' : '#666'};
  border-bottom: ${props => props.active ? '2px solid #3A7587' : 'none'};
  
  &:hover {
    background: #ffffff;
  }
`;