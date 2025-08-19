import React from 'react';
import questionIcon3 from '../../../assets/icons/Question_Icon_3.svg';
import DownloadIcon from '../../../assets/icons/DownloadIcon.svg';
import ToolTip from "@bento-core/tool-tip/dist/ToolTip";

const CohortAnalyzerHeader = ({
  selectedCohorts,
  nodeIndex,
  setNodeIndex,
  handleDownload,
  classes
}) => {
  return (
    <>
       <div className={classes.chartContainerHeader} role={"Complementary"}>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
                                    <div style={{display: 'flex',flexDirection: 'row', gap:0,alignItems:'center'}}>
                                        <p style={{ margin: 15, marginTop: 5,marginRight: 0, marginBottom: 0, fontSize: 17, fontFamily: 'Poppins', color: 'white' }}>Select a data category for cohort matching:</p>
                                        <ToolTip maxWidth="380px"   backgroundColor={'white'} zIndex={3000}  title={"The venn diagram is a stylized representation of the selected cohorts and their shared Participant IDs, and are not proportionally accurate,"} arrow placement="top">
                                           <img alt={"Question mark"} src={questionIcon3} style={{marginTop: -4}} height={10} />
                                        </ToolTip>
                                    </div>
                                    <fieldset className={classes.chartRadioContainer} style={{ border: 'none' }}>
                                        <legend style={{ position: 'absolute', width: '1px', height: '1px', padding: 0, margin: '-1px', overflow: 'hidden', clip: 'rect(0,0,0,0)', whiteSpace: 'nowrap', border: 0 }}>
                                            Data category options
                                        </legend>
                                        <ToolTip backgroundColor={'white'} zIndex={3000} title={"All Venn diagram selected areas will be cleared when changing buttons"} arrow placement="top">
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
                                                }} name="node_type" aria-label="Participant radio button" />
                                                Participant ID
                                            </p>
                                        </ToolTip>
                                        <ToolTip backgroundColor={'white'} zIndex={3000} title={"All Venn diagram selected areas will be cleared when changing buttons"} arrow placement="top">

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
                                                }} name="node_type" aria-label="Diagnosis Radio button" />
                                                Diagnosis
                                            </p>
                                        </ToolTip>
                                        <ToolTip backgroundColor={'white'} zIndex={3000} title={"All Venn diagram selected areas will be cleared when changing buttons"} arrow placement="top">

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
                                                }} type="radio" name="node_type" aria-label="Treatment Radio button" />
                                                Treatment
                                            </p>
                                        </ToolTip>
                                    </fieldset>
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