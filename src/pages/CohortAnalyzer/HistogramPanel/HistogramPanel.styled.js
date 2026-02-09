import styled from 'styled-components';

export const barColors = {
  colorA: '#FAE69C',
  colorB: '#A4E9CB',
  colorC: '#A3CCE8'
};

export const HistogramContainer = styled.div`
  background: white;
  border: 1px solid #679AAA;
  border-radius: 8px;
  padding: 20px;
  margin: 0;
  min-width: 50%;
  max-width: 50%;
  margin-left: 0px;
  min-height: 682px;
  height: auto;
  @media (max-width: 1900px) {
    max-width: 100%;
    max-height: 100%;
    margin: 45px 0 0;
  }

`;


export const DatasetSelectionTitle = styled.div`
  font-family: Poppins; 
  font-size: 19px;
  color: ${props => props.disabled ? '#999999' : '#000000'};
  opacity: ${props => props.disabled ? 0.8 : 1};
`;


export const ChartTitle = styled.h2`
  font-family: Poppins; 
  font-size: 19px;
  font-weight: 600;
  color: #333;
  margin-bottom: 20px;
  text-align: left;
  margin-left: 3px;
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
  @media (min-width: 1900px) {
  justify-content: flex-start;
  align-items: flex-start;
    }
`;

export const ChartWrapper = styled.div`
  position: relative;
  width: 66%;
  min-height: 261px;
  max-height: auto;
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
    @media (min-width: 1560px) {
    min-width: 100%;
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
  gap: 5px;
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
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1500;
  overflow: hidden;
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
  height: calc(100% - 50px);
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

export const DownloadDropdown = styled.div`
  position: relative;
  display: inline-block;
`;

export const DownloadDropdownMenu = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  margin-top: 5px;
  background: white;
  border: 1.5px solid #4E8191
  border-radius: 4px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  z-index: 1000;
  min-width: 200px;
  overflow: hidden;
  padding-left: 8px;
  padding-top: 4px;
  padding-bottom: 4px;
`;

export const DownloadDropdownItem = styled.div`
  padding: 2px;
  font-family: 'Nunito', sans-serif;
  font-size: 14px;
  color: #333;
  cursor: pointer;
  transition: background-color 0.2s;
  display: flex;
  align-items: center;
  gap: 3px;

  &:hover {
    background-color: #f5f5f5;
  }


`;
export const SurvivalAnalysisWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const SurvivalAnalysisHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  width: 100%;
  padding: 3px;
  padding-left: 12px;
`;

export const SurvivalAnalysisContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const KmChartWrapper = styled.div`
  width: 100%;
  padding-left: 100px;
  margin-top: -20px;
`;

export const RiskTableWrapper = styled.div`
  width: 100%;
  padding-right: 50px;
  margin-top: 10px;
  min-width: 0;
`;

export const SurvivalAnalysisModalContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  overflow: hidden;
  box-sizing: border-box;
`;

export const SurvivalAnalysisModalContent = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  gap: 5px;
`;

export const KmChartModalWrapper = styled.div`
  width: 100%;
  padding-left: 120px;
  padding-right: 100px;
  margin-right: 0px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: visible;
`;

export const RiskTableModalWrapper = styled.div`
  width: 100%;
  padding-right: 145px;
  overflow-x: auto;
  overflow-y: auto;
  height: 280px;
  flex-shrink: 0;
`;

export const ModalHeaderContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  position: relative;
  width: 100%;
`;

export const ModalActionButtons = styled.div`
  min-width: 300px;
  right: 10px;
  top: 2px;
  position: absolute;
  justify-content: flex-end;
  display: flex;
  gap: 5px;
`;

export const DownloadButtonWrapper = styled.div`
  margin-right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const DownloadButton = styled.span`
  cursor: pointer;
  margin-top: 5px;
`;

export const DownloadIconImage = styled.img`
  width: 23px;
  height: 23px;
`;

export const DownloadIconSmall = styled.img`
  width: 16px;
  height: 16px;
`;

export const ModalChartContainer = styled.div`
  display: flex;
  flex-direction: row;
  height: 100%;
  align-items: center;
  justify-content: flex-start;
`;

export const ModalRadioFieldset = styled.fieldset`
  border: none;
`;

export const ModalRadioGroup = styled(RadioGroup)`
  height: 100px;
  width: 180px;
  margin-top: 20px;
`;

export const ModalNoDataContainer = styled.div`
  width: 90%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  font-family: Poppins;
  color: #999;
  padding: 2rem;
`;
