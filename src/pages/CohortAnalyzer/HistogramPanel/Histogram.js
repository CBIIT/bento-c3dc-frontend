import React, { useMemo, useRef, useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import DownloadIcon from "../../../assets/icons/Download_Histogram_icon.svg";
import DownloadIconBorderless from "../../../assets/icons/download-icon-borderless.svg";
import ExpandIcon from "../../../assets/icons/Expand_Histogram_icon.svg";
import { useHistogramData } from './useHistogramData';
import ToolTip from "@bento-core/tool-tip/dist/ToolTip";
import questionIcon from "../../../assets/icons/Question_icon_2.svg";
import CustomChartTooltip from './CustomChartTooltip';
import CustomXAxisTick from './CustomXAxisTick';
import { KaplanMeierChart } from '@bento-core/kmplot';
import useKmplot from './useKmplot';
import {
  HistogramContainer, ChartWrapper, HeaderSection, RadioGroup, RadioInput
  , RadioLabel, ChartActionButtons, ChartTitle,
  CenterContainer, DatasetSelectionTitle, DownloadDropdown, DownloadDropdownMenu, DownloadDropdownItem,
} from './HistogramPanel.styled';
import ExpandedChartModal from './HistogramPopup';
import PlaceHolder2 from '../../../assets/histogram/Placeholder2.svg';
import TreatmentTypePlaceHolder from '../../../assets/histogram/TreatmentTypePlaceHolder.svg';
import RiskTable from '@bento-core/risk-table';

const htmlToImage = require('html-to-image');

const Histogram = ({ c1, c2, c3 }) => {
  const { graphData, viewType, setViewType, activeTab, setActiveTab, selectedDatasets, expandedChart, setExpandedChart, chartRef, handleDatasetChange, downloadChart } = useHistogramData({ c1, c2, c3 });
  const { 
    data: kmPlotData, 
    loading: kmLoading, 
    error: kmError
  } = useKmplot({ c1, c2, c3 });
  const kmChartRef = useRef(null);
  const riskTableRef = useRef(null);
  const survivalAnalysisContainerRef = useRef(null);
  const [showDownloadDropdown, setShowDownloadDropdown] = useState(false);
  const dropdownRef = useRef(null);
  
  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDownloadDropdown(false);
      }
    };

    if (showDownloadDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showDownloadDropdown]);

  // Download function for Kaplan-Meier chart
  const downloadKaplanMeierChart = (kmChartRef) => {
    try {
      if (!kmChartRef.current) return;
      
      const svgElement = kmChartRef.current.querySelector("svg");
      if (!svgElement) return;

      const scaleFactor = 2;
      
      // Get SVG dimensions from viewBox or width/height attributes, fallback to bounding rect
      let width, height;
      const viewBox = svgElement.getAttribute('viewBox');
      if (viewBox) {
        const [, , vw, vh] = viewBox.split(/\s+/).map(parseFloat);
        width = vw || svgElement.width.baseVal.value || svgElement.getBoundingClientRect().width;
        height = vh || svgElement.height.baseVal.value || svgElement.getBoundingClientRect().height;
      } else {
        width = svgElement.width.baseVal.value || svgElement.getBoundingClientRect().width;
        height = svgElement.height.baseVal.value || svgElement.getBoundingClientRect().height;
      }

      // Clone SVG and set explicit dimensions to ensure proper rendering
      const clonedSvg = svgElement.cloneNode(true);
      clonedSvg.setAttribute('width', width);
      clonedSvg.setAttribute('height', height);
      clonedSvg.removeAttribute('style'); // Remove any inline styles that might affect size

      const canvas = document.createElement("canvas");
      canvas.width = width * scaleFactor;
      canvas.height = height * scaleFactor;
      const ctx = canvas.getContext("2d");
      const TRANSPARENT_COLOR = "#00000000";

      ctx.fillStyle = TRANSPARENT_COLOR;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.scale(scaleFactor, scaleFactor);

      const svgData = new XMLSerializer().serializeToString(clonedSvg);
      const svgBlob = new Blob([svgData], { type: "image/svg+xml;charset=utf-8" });
      const url = URL.createObjectURL(svgBlob);

      const img = new Image();
      img.onload = () => {
        ctx.drawImage(img, 0, 0, width, height);
        URL.revokeObjectURL(url);

        canvas.toBlob((blob) => {
          const downloadUrl = URL.createObjectURL(blob);
          const a = document.createElement("a");
          a.href = downloadUrl;
          a.download = `kaplan_meier_chart.png`;
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          URL.revokeObjectURL(downloadUrl);
        }, "image/png");
      };

      img.src = url;
      setShowDownloadDropdown(false);
    } catch (error) {
      console.error("Error downloading Kaplan-Meier chart:", error);
    }
  };

  // Download function for Risk table
  const downloadRiskTable = (riskTableRef) => {
    try {
      if (!riskTableRef || !riskTableRef.current) {
        console.error("Risk table ref not available");
        return;
      }

      // Use the ref directly to capture the Risk Table element
      const tableElement = riskTableRef.current;
    

      // Store original margin and temporarily remove it
      const originalMargin = tableElement.style.marginLeft;
      tableElement.style.marginLeft = '0';

      // Generate image from the ref element using html-to-image
      htmlToImage.toPng(tableElement, {
        backgroundColor: 'transparent',
        pixelRatio: 4,
        quality: 1.0
      }).then((dataUrl) => {
        // Restore original margin
        tableElement.style.marginLeft = originalMargin;
        
        const a = document.createElement("a");
        a.href = dataUrl;
        a.download = `risk_table.png`;
        document.body.appendChild(a);
        a.click();
        setTimeout(() => {
          document.body.removeChild(a);
        }, 100);
      }).catch(error => {
        // Restore original margin even on error
        tableElement.style.marginLeft = originalMargin;
        console.error("Error using html-to-image:", error);
        alert("Error downloading Risk table. Please check the console for details.");
      });

      setShowDownloadDropdown(false);
    } catch (error) {
      console.error("Error downloading Risk table:", error);
      alert("Error downloading Risk table. Please check the console for details.");
    }
  };

  // Download both charts as a single combined image
  const downloadBoth = (kmChartRef, riskTableRef) => {
    try {
      setShowDownloadDropdown(false);
      
      if (!survivalAnalysisContainerRef.current) {
        console.error("Survival analysis container ref not available");
        alert("Container not available for download.");
        return;
      }

      const containerElement = survivalAnalysisContainerRef.current;

      htmlToImage.toPng(containerElement, {
        backgroundColor: 'transparent',
        pixelRatio: 2,
        quality: 1.0,
        useCORS: true,
        allowTaint: true
      }).then((dataUrl) => {
        const a = document.createElement("a");
        a.href = dataUrl;
        a.download = `survival_analysis_combined.png`;
        document.body.appendChild(a);
        a.click();
        setTimeout(() => {
          document.body.removeChild(a);
        }, 100);
      }).catch((error) => {
        console.error("Error downloading combined chart:", error);
        alert("Error downloading combined chart. Please check the console for details.");
      });
    } catch (error) {
      console.error("Error downloading combined chart:", error);
      alert("Error downloading combined chart. Please check the console for details.");
    }
  };

  const cohorts = [
    {
      id: '1',
      name: 'Cohort 12345...',
      color: '#ADD8E6',
      data: {
        '0 Months': 122,
        '6 Months': 119,
        '12 Months': 95,
        '18 Months': 17,
        '24 Months': 10,
        '30 Months': 1,
        '36 Months': 0,
      },
    },
    {
      id: '2',
      name: 'Cohort 2..',
      color: '#e61d0bff',
      data: {
        '0 Months': 122,
        '6 Months': 119,
        '12 Months': 95,
        '18 Months': 17,
        '24 Months': 10,
        '30 Months': 1,
        '36 Months': 0,
      },
    },
    {
      id: '2',
      name: 'Cohort 2..',
      color: '#fdea10ff',
      data: {
        '0 Months': 122,
        '6 Months': 119,
        '12 Months': 95,
        '18 Months': 17,
        '24 Months': 10,
        '30 Months': 1,
        '36 Months': 0,
      },
    },
    // ... more cohorts
  ];

  const timeIntervals = [
    '0 Months',
    '6 Months',
    '12 Months',
    '18 Months',
    '24 Months',
    '30 Months',
    '36 Months',
  ];
  const titles = {
    sexAtBirth: 'Sex at Birth',
    race: 'Race',
    treatmentType: 'Treatment Type',
    response: 'Treatment Outcome',
    survivalAnalysis: 'Survival Analysis',
  };
  const nullImages = {
    treatmentType: TreatmentTypePlaceHolder,
    response: TreatmentTypePlaceHolder,
    sexAtBirth: PlaceHolder2,
    race: PlaceHolder2,
    survivalAnalysis: PlaceHolder2
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
        // Skip survivalAnalysis as it doesn't have data in graphData
        if (dataset === 'survivalAnalysis' || !graphDataCopy[dataset]) {
          return;
        }
        const manyOthers = graphDataCopy[dataset].find(item => item.name === otherKey);

        const filteredRegularItems = graphDataCopy[dataset]
          .filter(item => item.name !== 'OtherFew' && item.name !== 'OtherMany');
        const regularItems = filteredRegularItems.slice(0, manyOthers ? maxDisplayed - 1 : maxDisplayed);
        graphDataCopy[dataset] = [...regularItems];
        if (manyOthers) {
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
        {selectedDatasets
          .filter(dataset => dataset !== 'survivalAnalysis') // Filter out survivalAnalysis as it's rendered separately
          .map((dataset, index) => {
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

                <ChartTitle className={`${Array.isArray(data[dataset]) && data[dataset].length > 0 ? '' : 'empty'}`} >
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

                      <img alt="Question Icon" src={questionIcon} width={10} style={{ border: "0px", top: -3, position: 'relative' }} />

                    </ToolTip>
                  )}
                </ChartTitle>

                <ChartActionButtons>
                  <span onClick={() => {
                    if (!allInputsEmpty) {
                      setExpandedChart(dataset);
                      setActiveTab(dataset);
                    }
                  }} >
                    <img src={ExpandIcon} alt={"expand"} style={{ opacity: allInputsEmpty ? 0.5 : 1, width: '23px', height: '23px' }} />
                  </span>
                  <span onClick={() => !allInputsEmpty && downloadChart(dataset, false)}>
                    <img src={DownloadIcon} alt={"download"} style={{ opacity: allInputsEmpty ? 0.5 : 1, width: '23px', height: '23px' }} />
                  </span>

                </ChartActionButtons>

              </HeaderSection>
              <div style={{ margin: 0, width: '100%', display: 'flex', flexDirection: 'row' }}>

                {Array.isArray(data[dataset]) && data[dataset].length > 0 ? (
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
                    </div>) : (
                    <div style={{ width: '100%', height: '200px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                      <p>No data available</p>
                    </div>
                  )
                )}


              </div>
            </ChartWrapper>

          );
        })}

        {selectedDatasets.includes('survivalAnalysis') && (
          <ChartWrapper>
            <div style={{ width: '100%',display: 'flex', flexDirection: 'column', justifyContent: 'center',alignItems: 'center' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px', width: '100%', padding: 3 }}>
                <p style={{fontSize: 19, fontWeight: 400 , fontFamily: 'Poppins', margin:2, padding: 3}}>
                  Overall Survival by Diagnosis
                </p>
                <ChartActionButtons>
                  <span onClick={() => {
                    if (!allInputsEmpty) {
                      setExpandedChart('survivalAnalysis');
                      setActiveTab('survivalAnalysis');
                    }
                  }} style={{ cursor: allInputsEmpty ? 'not-allowed' : 'pointer' }}>
                    <img src={ExpandIcon} alt={"expand"} style={{ opacity: allInputsEmpty ? 0.5 : 1, width: '23px', height: '23px' }} />
                  </span>
                  <DownloadDropdown ref={dropdownRef}>
                    <span 
                      onClick={() => !allInputsEmpty && setShowDownloadDropdown(!showDownloadDropdown)}
                      style={{ cursor: allInputsEmpty ? 'not-allowed' : 'pointer' }}
                    >
                      <img src={DownloadIcon} alt={"download"} style={{ opacity: allInputsEmpty ? 0.5 : 1, width: '23px', height: '23px' }} />    
                    </span>
                    {showDownloadDropdown && !allInputsEmpty && (
                      <DownloadDropdownMenu>
                        <DownloadDropdownItem onClick={() => downloadKaplanMeierChart(kmChartRef)}>
                          <img src={DownloadIconBorderless} alt="download" style={{ width: '16px', height: '16px' }} />
                          Kaplan-Meier 
                        </DownloadDropdownItem>
                        <DownloadDropdownItem onClick={() => downloadRiskTable(riskTableRef)}>
                          <img src={DownloadIconBorderless} alt="download" style={{ width: '16px', height: '16px' }} />
                          Risk Table 
                        </DownloadDropdownItem>
                        <DownloadDropdownItem onClick={() => downloadBoth(kmChartRef, riskTableRef)}>
                          <img src={DownloadIconBorderless} alt="download" style={{ width: '16px', height: '16px' }} />
                          Download Both
                        </DownloadDropdownItem>
                      </DownloadDropdownMenu>
                    )}
                  </DownloadDropdown>
                </ChartActionButtons>
              </div>

              <div ref={survivalAnalysisContainerRef} style={{width: '100%', display: 'flex', flexDirection: 'column'}}>
                <div ref={kmChartRef} style={{width: '100%', paddingLeft: '160px', marginRight: '100px'}}>
                  <KaplanMeierChart
                    data={kmPlotData}
                    title=""
                    width={"100%"}
                    height={200}
                    loading={kmLoading}
                    error={kmError}
                  />
                </div>
                <div ref={riskTableRef} style={{width: '100%', paddingLeft: '30px', paddingRight: '50px'}}>
                  <RiskTable
                    cohorts={cohorts}
                    timeIntervals={timeIntervals}
                  />
                </div>
              </div>
            </div>
          </ChartWrapper>
        )}





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
          kmPlotData={kmPlotData}
          kmLoading={kmLoading}
          kmError={kmError}
          kmChartRef={kmChartRef}
          riskTableRef={riskTableRef}
          cohorts={cohorts}
          timeIntervals={timeIntervals}
        />
      )}

    </HistogramContainer>
  );
};

export default Histogram;