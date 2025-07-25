import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import DownloadIcon from "../../../assets/icons/Download_Histogram_icon.svg";
import ExpandIcon from "../../../assets/icons/Expand_Histogram_icon.svg";
import { useHistogramData } from './useHistogramData';
import ToolTip from "@bento-core/tool-tip/dist/ToolTip";
import questionIcon from "../../../assets/icons/Question_icon_2.svg";
import {
  HistogramContainer, ChartWrapper, HeaderSection, RadioGroup, RadioInput
  , RadioLabel, ChartActionButtons, ChartTitle,
  CenterContainer,
} from './HistogramPanel.styled';
import ExpandedChartModal from './HistogramPopup';
import PlaceHolderImage from '../../../assets/vennDigram/placeHolder.svg';
import PlaceHolder2 from '../../../assets/histogram/Placeholder2.svg';
import TreatmentTypePlaceHolder from '../../../assets/histogram/TreatmentTypePlaceHolder.svg';

const Histogram = ({c1,c2,c3}) => {
  const { graphData, viewType, setViewType, activeTab, setActiveTab, selectedDatasets, expandedChart, setExpandedChart, chartRef, handleDatasetChange, downloadChart } = useHistogramData({c1,c2,c3});
  const titles = {
    treatmentType: 'Treatment Type',
    //treatmentOutcome: 'Treatment Outcome',
    sexAtBirth: 'Sex at Birth',
    race: 'Race'
  };
  const nullImages = {
    treatmentType: TreatmentTypePlaceHolder,
    //treatmentOutcome: 'Treatment Outcome',
    sexAtBirth: PlaceHolder2,
    race: PlaceHolder2
  };
  // Custom tooltip componen
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div style={{
          backgroundColor: 'white',
          padding: '10px',
          border: '1px solid #ccc',
          borderRadius: '4px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}>
          <p style={{ margin: 0, fontWeight: 'bold' }}>{data.name}</p>
          <p style={{ margin: 0, color: '#666' }}>
            Count: {data.count}
          </p>
          <p style={{ margin: 0, color: '#666' }}>
            Percentage: {data.percentage}%
          </p>
        </div>
      );
    }
    return null;
  };

  const CustomTick = ({ x, y, payload }) => {
    const lines = payload.value.split(' ');
    return (
      <g transform={`translate(${x},${y})`}>
        {lines.map((line, index) => (
          <text
            key={index}
            x={0}
            y={index * 12}
            dy={16}
            textAnchor="middle"
            fill="#333"
            fontSize="8"
          >
            {line}
          </text>
        ))}
      </g>
    );
  };
  let data = graphData;


  /*
    if(Object.keys(data).length === 0) {
      return (
        <img src={PlaceHolderImage} alt="Placeholder" style={{ width: '100%', height: '100%' }} />
      )
  }
*/
  return (
    <HistogramContainer>
      {/* Dataset Selection */}
      <p style={{fontSize: 17,fontFamily: 'Poppins'
      }}>View Venn Diagram in set operations:</p>
      <div style={{ marginBottom: '20px' }}>
        {Object.keys(titles).map((key, index) => (
          <label key={key} style={{ marginRight: '20px', fontFamily: 'Nunito', fontSize: '14px', color: '#666' }}>
            <input
              type="checkbox"
              value={key}
              checked={selectedDatasets.includes(key)}
              onChange={() => handleDatasetChange(key)}
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
        return (
         
            
            <ChartWrapper id={`chart-${dataset}`} ref={(el) => chartRef.current[dataset] + el}>
              <HeaderSection>

                <ChartTitle>
                  {titles[dataset]}
                  {Array.isArray(graphData[dataset]) && graphData[dataset].length > 5 && (
                       <ToolTip
                                        maxWidth="335px"
                                        border={'1px solid #598ac5'}
                                        arrowBorder={'1px solid #598AC5'}
                                        title={<div>
                                            {"you should expand to see the full item"}
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
                  <span onClick={() => setExpandedChart(dataset)} >
                    <img src={ExpandIcon} alt={"expnad"} style={{ width: '23px', height: '23px' }} />
                  </span>
                  <span onClick={() => downloadChart(dataset)}>
                    <img src={DownloadIcon} alt={"download"} style={{ width: '23px', height: '23px' }} />
                  </span>

                </ChartActionButtons>

              </HeaderSection>
              <div style={{ margin: 0, width: '100%', display: 'flex', flexDirection: 'row' }}>
             
             {Array.isArray(data[dataset]) && data[dataset].length > 0 ? (
              <> 
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
  <ResponsiveContainer width="80%" height="100%">
    <BarChart
      data={graphData[dataset].slice(0, 4)}
      margin={{ top: 20, right: 30, left: 10, bottom: 0 }}
    >
      <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" horizontal={true} vertical={false} />
      <XAxis
        dataKey="name"
        interval={0}
        angle={0}
        textAnchor="middle"
        height={50}
        tick={<CustomTick />}
      />
      <YAxis
        domain={[0, viewType[dataset] === 'percentage' ? 100 : 'dataMax']}
        tickFormatter={(value) => viewType[dataset] === 'percentage' ? `${value}%` : value}
        tick={{ fontSize: 12, fill: '#333' }}
      />
      <Tooltip content={<CustomTooltip />} />
      <Bar dataKey="valueA" opacity={0.8} maxBarSize={60}>
        {graphData[dataset].map((entry, entryIndex) => (
          <Cell key={`cell-${dataset}-${entryIndex}`} fill={entry.colorA} />
        ))}
      </Bar>
      <Bar dataKey="valueB" opacity={0.8} maxBarSize={60}>
        {graphData[dataset].map((entry, entryIndex) => (
          <Cell key={`cell-${dataset}-${entryIndex}`} fill={entry.colorB} />
        ))}
      </Bar>
      <Bar dataKey="valueC" opacity={0.8} maxBarSize={60}>
        {graphData[dataset].map((entry, entryIndex) => (
          <Cell key={`cell-${dataset}-${entryIndex}`} fill={entry.colorC} />
        ))}
      </Bar>
    </BarChart>
  </ResponsiveContainer>
  </>
) : (
  <div style={{ width: '100%', height: '200px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
    <img src={nullImages[dataset]} alt="No data" style={{ maxWidth: '100%', maxHeight: '100%' }} />
  </div>
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
          data={data}
          titles={titles}
        />
      )}

    </HistogramContainer>
  );
};

export default Histogram;