import React, {useMemo, useRef} from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import DownloadIcon from "../../../assets/icons/Download_Histogram_icon.svg";
import ExpandIcon from "../../../assets/icons/Expand_Histogram_icon.svg";
import { useHistogramData } from './useHistogramData';
import ToolTip from "@bento-core/tool-tip/dist/ToolTip";
import questionIcon from "../../../assets/icons/Question_icon_2.svg";
import CustomChartTooltip from './CustomChartTooltip';
import CustomXAxisTick from './CustomXAxisTick';
import {
  HistogramContainer, ChartWrapper, HeaderSection, RadioGroup, RadioInput
  , RadioLabel, ChartActionButtons, ChartTitle,
  CenterContainer, DatasetSelectionTitle,
} from './HistogramPanel.styled';
import ExpandedChartModal from './HistogramPopup';
import PlaceHolder2 from '../../../assets/histogram/Placeholder2.svg';
import TreatmentTypePlaceHolder from '../../../assets/histogram/TreatmentTypePlaceHolder.svg';

const Histogram = ({c1,c2,c3}) => {
  const { graphData, viewType, setViewType, activeTab, setActiveTab, selectedDatasets, expandedChart, setExpandedChart, chartRef, handleDatasetChange, downloadChart } = useHistogramData({c1,c2,c3});
  
  const titles = {
   sexAtBirth: 'Sex at Birth',
    race: 'Race',
    treatmentType: 'Treatment Type',
    response: 'Treatment Outcome',
  };
  const nullImages = {
    treatmentType: TreatmentTypePlaceHolder,
    response: TreatmentTypePlaceHolder,
    sexAtBirth: PlaceHolder2,
    race: PlaceHolder2
  };

  let data = graphData;
  const MAX_BARS_DISPLAYED = 6;
  const MAX_BARS_DISPLAYED_EXPANDED = 21;
  const cellHover = useRef(null);
  const filteredData = useMemo(() => {
    if (Object.keys(graphData).length > 0 && selectedDatasets.length > 0) {
      const otherKey = expandedChart ? 'OtherMany' : 'OtherFew';
      const maxDisplayed = expandedChart ? MAX_BARS_DISPLAYED_EXPANDED : MAX_BARS_DISPLAYED;
      const graphDataCopy = JSON.parse(JSON.stringify(graphData));

      selectedDatasets.forEach((dataset) => {
        const manyOthers = graphDataCopy[dataset].find(item => item.name === otherKey);

        const filteredRegularItems = graphDataCopy[dataset]
          .filter(item => item.name !== 'OtherFew' && item.name !== 'OtherMany');
        const regularItems = filteredRegularItems.slice(0, manyOthers ? maxDisplayed - 1 : maxDisplayed);
        graphDataCopy[dataset] = [...regularItems];
        if(manyOthers){
          graphDataCopy[dataset].push(manyOthers);
        }
      })
      return graphDataCopy;
    }
    return graphData;
  }, [graphData, selectedDatasets, expandedChart])

  // Hover effect for bars
  const handleMouseEnter = (entry) => {
    cellHover.current = entry;
  };

  const handleMouseLeave = () => {
    cellHover.current = null;
  };

  const allInputsEmpty = [c1, c2, c3].every(arr => !Array.isArray(arr) || arr.length === 0);

  return (
    <HistogramContainer>
      {/* Dataset Selection */}
      <DatasetSelectionTitle disabled={allInputsEmpty}>
        View Venn Diagram in set operations:
      </DatasetSelectionTitle>
      <div style={{ marginBottom: '15px' }}>
        {Object.keys(titles).map((key, index) => (
          <label key={key} style={{ marginRight: '20px', fontFamily: 'Nunito', fontSize: '14px', color: '#666' }}>
            <input
              type="checkbox"
              value={key}
              checked={selectedDatasets.includes(key)}
              onChange={() => handleDatasetChange(key)}
              disabled={allInputsEmpty}
              style={{ marginRight: '8px', accentColor: '#6D5F5B' }}
            />
            {titles[key]}
          </label>
        ))}
      </div>

      {/* View Type Selection */}

        <CenterContainer> 
      {/* Multiple Charts */}
      {selectedDatasets.map((dataset, index) => {
        let valueA = 0;
        let valueB = 0;
        let valueC = 0;
        if (Array.isArray(filteredData[dataset])) {
          filteredData[dataset].forEach((entry) => {
            valueA += entry.valueA || 0;
            valueB += entry.valueB || 0;
            valueC += entry.valueC || 0;
          });
        }
        return (
         
            
            <ChartWrapper id={`chart-${dataset}`} ref={(el) => chartRef.current[dataset] = el}>
              <HeaderSection>

                <ChartTitle className={`${Array.isArray(data[dataset]) && data[dataset].length > 0  ? '' : 'empty'}`} >
                  {titles[dataset]}
                  {Array.isArray(filteredData[dataset]) && filteredData[dataset].length > 5 && (
                       <ToolTip
                                        maxWidth="335px"
                                        border={'1px solid #598ac5'}
                                        arrowBorder={'1px solid #598AC5'}
                                        title={<div>
                                            {"You can expand to see the full item"}
                                        </div>}
                                        placement="top-end"
                                        arrow
                                        interactive
                                        arrowSize="30px"
                                    >

                                      <img alt="Question Icon" src={questionIcon} width={10} style={{ border: "0px",top: -3,position: 'relative' }} /> 

                                    </ToolTip>
                  )}
                </ChartTitle>

                <ChartActionButtons>
                  <span onClick={() => {
                    if(!allInputsEmpty){
                    setExpandedChart(dataset);
                    setActiveTab(dataset);
                    }
                  }} >
                    <img src={ExpandIcon} alt={"expand"} style={{ opacity: allInputsEmpty ? 0.5 : 1, width: '23px', height: '23px' }} />
                  </span>
                  <span onClick={() => !allInputsEmpty && downloadChart(dataset, false)}>
                    <img src={DownloadIcon} alt={"download"} style={{opacity: allInputsEmpty ? 0.5 : 1, width: '23px', height: '23px' }} />
                  </span>

                </ChartActionButtons>

              </HeaderSection>
              <div style={{ margin: 0, width: '100%', display: 'flex', flexDirection: 'row' }}>
             
             {Array.isArray(data[dataset]) && data[dataset].length > 0  ? (
              <> 
                <fieldset style={{ border: 'none' }}>
                  <legend style={{ position: 'absolute', width: '1px', height: '1px', padding: 0, margin: '-1px', overflow: 'hidden', clip: 'rect(0,0,0,0)', whiteSpace: 'nowrap', border: 0 }}>
                       Data Type Options
                  </legend>
                 <RadioGroup>
                  <RadioLabel>
                    <RadioInput
                      type="radio"
                      name={`viewType-${dataset}`}
                      value="count"
                      checked={viewType[dataset] === 'count'}
                      onChange={(e) => setViewType({ ...viewType, [dataset]: e.target.value })}
                    />
                      # of Cases
                  </RadioLabel>
                  <RadioLabel>
                    <RadioInput
                      type="radio"
                      name={`viewType-${dataset}`}
                      value="percentage"
                      checked={viewType[dataset] === 'percentage'}
                      onChange={(e) => setViewType({ ...viewType, [dataset]: e.target.value })}
                    />
                      % of Cases   
                  </RadioLabel>
                </RadioGroup>
                </fieldset>
  <ResponsiveContainer width="80%" height="100%">
                    <BarChart
                      data={filteredData[dataset]}
                      margin={{ top: 20, right: 30, left: 10, bottom: 0 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" horizontal={true} vertical={false} />
                      <XAxis
                        dataKey="name"
                        interval={0}
                        angle={0}
                        textAnchor="middle"
                        height={50}
                        tick={(props) => {
                          // Calculate available width per tick based on chart width and data points
                          // Assuming chart is about 80% of container width (from ResponsiveContainer)
                          // and leaving some padding between ticks
                          const dataLength = (filteredData[dataset] && filteredData[dataset].length) || 1;
                          const estimatedChartWidth = 400; // Approximate width of chart area
                          const availableWidth = (estimatedChartWidth / dataLength) * 0.9; // 90% to leave padding
                          return <CustomXAxisTick {...props} width={availableWidth} fontSize={8} />;
                        }}
                      />
                      <YAxis
                        domain={[0, 'dataMax']}
                        tickFormatter={(value) => {
                        const num = Number(value);
                        const formatted = num % 1 === 0 ? num : num.toFixed(1);
                        return viewType[dataset] === 'percentage' ? `${formatted}%` : formatted;
                      }} tick={{ fontSize: 11, fill: '#666666', fontFamily: 'Nunito', fontWeight: 500 }}
                      />
                      <Tooltip content={<CustomChartTooltip viewType={viewType[dataset]} cellHoverRef={cellHover} />} />
                      {valueA > 0 && (
                        <Bar dataKey="valueA" maxBarSize={60} stroke="#000" strokeWidth={0.6}>
                          {filteredData[dataset].map((entry, entryIndex) => (
                            <Cell key={`cell-${dataset}-${entryIndex}`} fill={entry.colorA} onMouseEnter={() => handleMouseEnter("valueA")} onMouseLeave={handleMouseLeave} />
                          ))}
                        </Bar>
                      )}
                      {valueB > 0 && (
                        <Bar dataKey="valueB" maxBarSize={60} stroke="#000" strokeWidth={0.6} >
                          {filteredData[dataset].map((entry, entryIndex) => (
                            <Cell key={`cell-${dataset}-${entryIndex}`} fill={entry.colorB} onMouseEnter={() => handleMouseEnter("valueB")} onMouseLeave={handleMouseLeave} />
                          ))}
                        </Bar>
                      )}
                      {valueC > 0 && (
                        <Bar dataKey="valueC" maxBarSize={60} stroke="#000" strokeWidth={0.6}>
                          {filteredData[dataset].map((entry, entryIndex) => (
                            <Cell key={`cell-${dataset}-${entryIndex}`} fill={entry.colorC} onMouseEnter={() => handleMouseEnter("valueC")} onMouseLeave={handleMouseLeave} />
                          ))}
                        </Bar>)}
                    </BarChart>
  </ResponsiveContainer>
  </>
) : (
  allInputsEmpty ? (
  <div style={{ width: '100%', height: '200px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
    <img src={nullImages[dataset]} alt="No data" style={{ maxWidth: '100%', maxHeight: '100%' }} />
  </div> ) : (
    <div style={{ width: '100%', height: '200px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <p>No data available</p>
    </div>
  )
)}


              </div>
            </ChartWrapper>
       
        );
      })}
      </CenterContainer>
      {expandedChart && (
        <ExpandedChartModal
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          setExpandedChart={setExpandedChart}
          viewType={viewType}
          setViewType={setViewType}
          data={filteredData}
          titles={titles}
          downloadChart={downloadChart}
        />
      )}

    </HistogramContainer>
  );
};

export default Histogram;