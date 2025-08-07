import React from 'react';
//import Tooltip from '../../../components/ToolTipIcon/ToolTipIconView';
import questionIcon from '../../../assets/icons/Question_Icon.svg';
import questionIcon3 from '../../../assets/icons/Question_Icon_3.svg';
import DownloadIcon from '../../../assets/icons/DownloadIcon.svg';
import { Tooltip } from '@material-ui/core';

const CohortAnalyzerHeader = ({
  selectedCohorts,
  nodeIndex,
  setNodeIndex,
  handleDownload,
  classes
}) => {
  return (
    <>
       <div className={classes.chartContainerHeader}>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
                                    <div style={{display: 'flex',flexDirection: 'row', gap:0,alignItems:'center'}}>
                                        <p style={{ margin: 15, marginTop: 5,marginRight: 0, marginBottom: 0, fontSize: 17, fontFamily: 'Poppins', color: 'white' }}>Select a data category for cohort matching:</p>
                                        <Tooltip maxWidth="380px"  backgroundColor={'white'} zIndex={3000}  title={"The venn diagram is a stylized representation of the selected cohorts and their shared Participant IDs, and are not proportionally accurate,"} arrow placement="top">
                                           <img alt={"Question mark"} src={questionIcon3} style={{marginTop: -4}} height={10} />
                                        </Tooltip>
                                    </div>
                                    <div className={classes.chartRadioContainer}>
                                        <Tooltip backgroundColor={'white'} zIndex={3000} title={"All Venn diagram selected areas will be cleared when changing buttons"} arrow placement="top">
                                             <p style={{ fontSize: 15, fontFamily: 'Poppins', margin: 0, gap: 3, display: 'flex',alignItems: 'center', justifyContent: 'center',opacity: selectedCohorts.length === 0 ? 0.6 : 1 }}>
                                                <input 
                                                 style={{
                                                   appearance: 'none',
                                                   width: '10px',
                                                   height: '10px',
                                                   cursor: 'pointer',
                                                   outline: '2px solid white',
                                                   backgroundColor: nodeIndex === 0 ? '#00E1E1' : 'transparent',
                                                   borderRadius: '50%',                                   
                                                    marginTop: -3,
                                                    border: '1px solid black'
                                                }}
                                                disabled={selectedCohorts.length === 0} type="radio" value={"1"} checked={nodeIndex === 0} onClick={() => {
                                                    setNodeIndex(0);
                                                }} radioGroup="node_type" name="node_type" aria-label="Participant radio button" />
                                                Participant ID
                                            </p>
                                        </Tooltip>
                                        <Tooltip backgroundColor={'white'} zIndex={3000} title={"All Venn diagram selected areas will be cleared when changing buttons"} arrow placement="top">

                                            <p style={{ fontSize: 15, fontFamily: 'Poppins', margin: 0, gap: 3, display: 'flex',alignItems: 'center', justifyContent: 'center',opacity: selectedCohorts.length === 0 ? 0.6 : 1 }}>
                                                <input 
                                                 style={{
                                                   appearance: 'none',
                                                   width: '10px',
                                                   height: '10px',
                                                   cursor: 'pointer',
                                                   outline: '2px solid white',
                                                   backgroundColor: nodeIndex === 1 ? '#00E1E1' : 'transparent',
                                                   borderRadius: '50%',
                                                    marginTop: -3 ,
                                                    border: '1px solid black'
                                                }}
                                                disabled={selectedCohorts.length === 0} type="radio" value={"2"} onClick={() => {
                                                    setNodeIndex(1);
                                                }} radioGroup="node_type" name="node_type" aria-label="Diagnosis Radio button" />
                                                Diagnosis
                                            </p>
                                        </Tooltip>
                                        <Tooltip backgroundColor={'white'} zIndex={3000} title={"All Venn diagram selected areas will be cleared when changing buttons"} arrow placement="top">

                                              <p style={{ fontSize: 15, fontFamily: 'Poppins', margin: 0, gap: 3, display: 'flex',alignItems: 'center', justifyContent: 'center', opacity: selectedCohorts.length === 0 ? 0.6 : 1 }}>
                                                <input 
                                                 style={{
                                                   appearance: 'none',
                                                   width: '10px',
                                                   height: '10px',
                                                   cursor: 'pointer',
                                                   outline: '2px solid white',
                                                   backgroundColor: nodeIndex === 2 ? '#00E1E1' : 'transparent',
                                                   borderRadius: '50%',
                                                    marginTop: -3,
                                                    border: '1px solid black'
                                                }}
                                                disabled={selectedCohorts.length === 0} value={"3"} onClick={() => {
                                                    setNodeIndex(2);
                                                }} type="radio" radioGroup="node_type" name="node_type" aria-label="Treatment Radio button" />
                                                Treatment
                                            </p>
                                        </Tooltip>
                                    </div>
                                </div>

                                <span onClick={()=>{
                                    handleDownload();
                                }} style={{ margin: 15, cursor: selectedCohorts.length > 0 ? 'pointer' : 'not-allowed' }}>
                                    <img alt={"download icon"} src={DownloadIcon} width={60} />
                                </span>
                            </div>
    </>
  );
};

export default CohortAnalyzerHeader;