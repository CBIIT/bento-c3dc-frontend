import React from "react";
import {
  RadioGroup, RadioInput
  , RadioLabel, ModalChartWrapper, ModalContent
  , ModalOverlay, CloseButton, Tab, TabContainer
} from './HistogramPanel.styled';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import DownloadIcon from "../../../assets/icons/Download_Histogram_icon.svg";
import { useHistogramData } from "./useHistogramData";


const CustomTooltip = ({ active, payload }) => {
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
          fontSize="10"
        >
          {line}
        </text>
      ))}
    </g>
  );
};



const ExpandedChartModal = ({
  activeTab,
  setActiveTab,
  setExpandedChart,
  viewType,
  setViewType,
  data,
  titles,
  downloadChart
}) => {

  let valueA = 0;
  let valueB = 0;
  let valueC = 0;
  if (Array.isArray(data[activeTab])) {
    data[activeTab].map((entry) => {
      valueA += entry.valueA || 0;
      valueB += entry.valueB || 0;
      valueC += entry.valueC || 0;
    });
  }

  return (
    <ModalOverlay onClick={() => setExpandedChart(null)}>
            
      <ModalContent onClick={(e) => e.stopPropagation()}>
          <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', position: 'relative',width:"100%"}}>
          {/* Tab Navigation */}
          <TabContainer>
            {Object.keys(data).map(dataset => (
              <Tab
                key={dataset}
                active={activeTab === dataset}
                onClick={() => setActiveTab(dataset)}
              >
                {titles[dataset]}
              </Tab>
            ))}
          </TabContainer>

          <div style={{ minWidth: 300, right: 10, top:2, position:'absolute', justifyContent: 'flex-end', display: 'flex', gap: 5 }}>
            <span style={{ marginTop: 5 }} onClick={() => downloadChart(activeTab)}>
              <img src={DownloadIcon} alt={"download"} style={{ width: '23px', height: '23px' }} />
            </span>
            <CloseButton onClick={() => setExpandedChart(null)}>×</CloseButton>
          </div>

        </div>
        <ModalChartWrapper>
          <div style={{ display: 'flex', flexDirection: 'row', height: '100%', alignItems: 'center', justifyContent: 'flex-start' }}>
            <RadioGroup style={{ height: '100px', marginTop: '20px' }}>
              <RadioLabel>
                <RadioInput
                  type="radio"
                  name={`modalViewType-${activeTab}`}
                  value="count"
                  checked={viewType[activeTab] === 'count'}
                  onChange={(e) => setViewType((prev) => ({ ...prev, [activeTab]: e.target.value }))}
                />
                # of Cases
              </RadioLabel>
              <RadioLabel>
                <RadioInput
                  type="radio"
                  name={`modalViewType-${activeTab}`}
                  value="percentage"
                  checked={viewType[activeTab] === 'percentage'}
                  onChange={(e) => setViewType((prev) => ({ ...prev, [activeTab]: e.target.value }))}
                />
                % of Cases
              </RadioLabel>
            </RadioGroup>
           {Array.isArray(data[activeTab]) && data[activeTab].length > 0 ? (
  <ResponsiveContainer id={`chart-${activeTab}`} width="50%"  height="100%">
    <BarChart
      data={data[activeTab]}
      margin={{ top: 20, right: 30, left: 10, bottom: 60 }}
    >
      <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" horizontal={true} vertical={false} />
      <XAxis
        dataKey="name"
        tick={<CustomTick />}
        interval={0}
        angle={0}
        textAnchor="middle"
        height={80}
      />
      <YAxis
        domain={[0, viewType[activeTab] === 'percentage' ? 100 : 'dataMax']}
        tickFormatter={(value) => viewType[activeTab] === 'percentage' ? `${value}%` : value}
        tick={{ fontSize: 14, fill: '#333' }}
      />
      <Tooltip content={<CustomTooltip />} />
      {valueA>0 &&
      <Bar dataKey="valueA" name="Dataset 1" fill="#FCF1CC" opacity={0.8} maxBarSize={60} />

      }
      {valueB>0 &&
      <Bar dataKey="valueB" name="Dataset 2" fill="#A4E9CB" opacity={0.8} maxBarSize={60} />
      }
      {valueC>0 &&
      <Bar dataKey="valueC" name="Dataset 3" fill="#A2CCE8" opacity={0.8} maxBarSize={60} />
      }
    </BarChart>
  </ResponsiveContainer>
) : (
  <div style={{
    width: '90%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '16px',
    fontFamily: 'Poppins',
    color: '#999',
    padding: '2rem'
  }}>
    No data available
  </div>
)}

          </div>
        </ModalChartWrapper>
      </ModalContent>
    </ModalOverlay>
  );
};

export default ExpandedChartModal;