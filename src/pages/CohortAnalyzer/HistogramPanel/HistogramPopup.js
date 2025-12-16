import React, { useRef, useEffect, useMemo } from "react";
import { createPortal } from "react-dom";
import {
  RadioInput,
  RadioLabel,
  ModalChartWrapper,
  ModalContent,
  ModalOverlay,
  CloseButton,
  Tab,
  TabContainer,
  barColors,
  SurvivalAnalysisModalContainer,
  SurvivalAnalysisModalContent,
  KmChartModalWrapper,
  RiskTableModalWrapper,
  ModalHeaderContainer,
  ModalActionButtons,
  DownloadButtonWrapper,
  DownloadButton,
  DownloadIconImage,
  DownloadIconSmall,
  ModalChartContainer,
  ModalRadioFieldset,
  ModalRadioGroup,
  ModalNoDataContainer,
} from './HistogramPanel.styled';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import DownloadIcon from "../../../assets/icons/Download_Histogram_icon.svg";
import DownloadIconBorderless from "../../../assets/icons/download-icon-borderless.svg";
import CustomChartTooltip from './CustomChartTooltip';
import CustomXAxisTick from './CustomXAxisTick';
import { KaplanMeierChart } from '@bento-core/kmplot';
import RiskTable from '@bento-core/risk-table';
import { DownloadDropdown, DownloadDropdownMenu, DownloadDropdownItem, } from './HistogramPanel.styled';
import * as htmlToImage from 'html-to-image';

const ExpandedChartModal = ({
  activeTab,
  setActiveTab,
  setExpandedChart,
  viewType,
  setViewType,
  data,
  titles,
  downloadChart,
  kmPlotData,
  kmLoading,
  kmError,
  kmChartRef,
  riskTableRef,
  cohorts,
  timeIntervals,
  c1,
  c2,
  c3
}) => {
  const [showDownloadDropdown, setShowDownloadDropdown] = React.useState(false);
  const [chartHeight, setChartHeight] = React.useState(350);
  const dropdownRef = useRef(null);
  const survivalAnalysisContainerRef = useRef(null);
  
  // Filter KM plot data to only include selected cohorts - must be at top level
  const filteredKmPlotData = useMemo(() => {
    if (!kmPlotData || !Array.isArray(kmPlotData)) return [];
    
    const selectedGroups = [];
    if (c1 && c1.length > 0) selectedGroups.push('c1');
    if (c2 && c2.length > 0) selectedGroups.push('c2');
    if (c3 && c3.length > 0) selectedGroups.push('c3');
    
    return kmPlotData.filter(item => {
      const group = item.group || item.group_id || '';
      return selectedGroups.some(selectedGroup => {
        const groupStr = String(group).toLowerCase();
        const selectedStr = selectedGroup.toLowerCase();
        return groupStr.includes(selectedStr) || 
               groupStr.includes(selectedStr.replace('c', '')) ||
               (selectedGroup === 'c1' && (groupStr === '1' || groupStr === 'cohort 1' || groupStr === 'cohort1')) ||
               (selectedGroup === 'c2' && (groupStr === '2' || groupStr === 'cohort 2' || groupStr === 'cohort2')) ||
               (selectedGroup === 'c3' && (groupStr === '3' || groupStr === 'cohort 3' || groupStr === 'cohort3'));
      });
    });
  }, [kmPlotData, c1, c2, c3]);

  // Map cohort colors based on which cohorts are selected - must be at top level
  const cohortColors = useMemo(() => {
    const colors = [];
    if (c1 && c1.length > 0) colors.push(barColors.colorA);
    if (c2 && c2.length > 0) colors.push(barColors.colorB);
    if (c3 && c3.length > 0) colors.push(barColors.colorC);
    return colors;
  }, [c1, c2, c3]);
  
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

  // Download functions for survival analysis
  const downloadKaplanMeierChart = (kmChartRef) => {
    try {
      if (!kmChartRef || !kmChartRef.current) {
        console.error("KM chart ref not available");
        return;
      }
      
      const svgElement = kmChartRef.current.querySelector("svg");
      if (!svgElement) {
        console.error("Could not find SVG element in KM chart");
        return;
      }

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
      alert("Error downloading Kaplan-Meier chart. Please check the console for details.");
    }
  };

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

  const downloadBoth = () => {
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

  let valueA = 0;
  let valueB = 0;
  let valueC = 0;
  if (Array.isArray(data[activeTab])) {
    data[activeTab].forEach((entry) => {
      valueA += entry.valueA || 0;
      valueB += entry.valueB || 0;
      valueC += entry.valueC || 0;
    });
  }

 const cellHover = useRef(null);

 // Hover effect for bars
  const handleMouseEnter = (entry) => {
    cellHover.current = entry;
  };

  const handleMouseLeave = () => {
    cellHover.current = null;
  };

  //Disable scroll
  useEffect(() => {
      const original = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = original;
      };
    
  }, []);

  // Calculate height for KM chart and risk table to share space equally
  useEffect(() => {
    const updateHeight = () => {
      if (survivalAnalysisContainerRef.current && activeTab === 'survivalAnalysis') {
        const containerHeight = survivalAnalysisContainerRef.current.clientHeight;
        // Divide space equally, accounting for gap (10px) and margins
        const availableHeight = containerHeight - 10; // gap between elements
        const halfHeight = Math.floor(availableHeight / 2);
        setChartHeight(Math.max(250, halfHeight - 20)); // min 250px, account for padding
      }
    };

    updateHeight();
    window.addEventListener('resize', updateHeight);
    return () => window.removeEventListener('resize', updateHeight);
  }, [activeTab]);


  return (
    createPortal(
    <ModalOverlay onClick={() => setExpandedChart(null)}>
            
      <ModalContent onClick={(e) => e.stopPropagation()}>
          <ModalHeaderContainer>
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
            {titles.survivalAnalysis && (
              <Tab
                active={activeTab === 'survivalAnalysis'}
                onClick={() => setActiveTab('survivalAnalysis')}
              >
                {titles.survivalAnalysis}
              </Tab>
            )}
          </TabContainer>

          <ModalActionButtons>
            {activeTab === 'survivalAnalysis' ? (
              <DownloadButtonWrapper>
               <DownloadButton 
                  onClick={() => setShowDownloadDropdown(!showDownloadDropdown)}
                >
                  <DownloadIconImage src={DownloadIcon} alt={"download"} />
                </DownloadButton>
              <DownloadDropdown ref={dropdownRef}>
               
                {showDownloadDropdown && (
                  <DownloadDropdownMenu>
                    <DownloadDropdownItem onClick={() => downloadKaplanMeierChart(kmChartRef)}>
                      <DownloadIconSmall src={DownloadIconBorderless} alt="download" />
                      Kaplan-Meier 
                    </DownloadDropdownItem>
                    <DownloadDropdownItem onClick={() => downloadRiskTable(riskTableRef)}>
                      <DownloadIconSmall src={DownloadIconBorderless} alt="download" />
                      Risk Table 
                    </DownloadDropdownItem>
                    <DownloadDropdownItem onClick={() => downloadBoth()}>
                      <DownloadIconSmall src={DownloadIconBorderless} alt="download" />
                      Download Both
                    </DownloadDropdownItem>
                  </DownloadDropdownMenu>
                )}
              </DownloadDropdown>
              </DownloadButtonWrapper>
            ) : (
              <DownloadButton onClick={() => downloadChart(activeTab,true)}>
                <DownloadIconImage src={DownloadIcon} alt={"download"} />
              </DownloadButton>
            )}
            <CloseButton onClick={() => setExpandedChart(null)}>×</CloseButton>
          </ModalActionButtons>

        </ModalHeaderContainer>
        <ModalChartWrapper>
          {activeTab === 'survivalAnalysis' ? (
            <SurvivalAnalysisModalContainer>
              <SurvivalAnalysisModalContent ref={survivalAnalysisContainerRef}>
                <KmChartModalWrapper ref={kmChartRef}>
                  <KaplanMeierChart
                    data={filteredKmPlotData}
                    title=""
                    width={"100%"}
                    height={chartHeight}
                    loading={kmLoading}
                    error={kmError}
                    colors={cohortColors}
                    showLabels={false}
                    showLegend={false}
                  />
                </KmChartModalWrapper>
                <RiskTableModalWrapper ref={riskTableRef}>
                  <RiskTable
                    cohorts={cohorts}
                    timeIntervals={timeIntervals}
                  />
                </RiskTableModalWrapper>
              </SurvivalAnalysisModalContent>
            </SurvivalAnalysisModalContainer>
          ) : (
            <ModalChartContainer>
             <ModalRadioFieldset>
              <ModalRadioGroup>
                <RadioLabel>
                  <RadioInput
                    type="radio"
                    name={`modalViewType-${activeTab}`}
                    value="count"
                    checked={viewType[activeTab] === 'count'}
                    onChange={(e) => setViewType((prev) => ({ ...prev, [activeTab]: e.target.value }))}
                  />
                      <legend>
                        # of Cases
                      </legend>
                </RadioLabel>
                <RadioLabel>
                  <RadioInput
                    type="radio"
                    name={`modalViewType-${activeTab}`}
                    value="percentage"
                    checked={viewType[activeTab] === 'percentage'}
                    onChange={(e) => setViewType((prev) => ({ ...prev, [activeTab]: e.target.value }))}
                  />
                  <legend>
                    % of Cases
                  </legend>
                </RadioLabel>
              </ModalRadioGroup>
               </ModalRadioFieldset>
             {Array.isArray(data[activeTab]) && data[activeTab].length > 0 ? (
  <ResponsiveContainer id={`expanded-chart-${activeTab}`} width="100%"  height="100%">
    <BarChart
      data={data[activeTab]}
      margin={{ top: 20, right: 30, left: 10, bottom: 60 }}
    >
      <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" horizontal={true} vertical={false} />
      <XAxis
        dataKey="name"
        tick={(props) => {
          // Calculate available width per tick based on chart width and data points
          // Modal has more space, so we use a larger estimated width
          const dataLength = (data[activeTab] && data[activeTab].length) || 1;
          const estimatedChartWidth = 800; // Larger width for expanded modal
          const availableWidth = (estimatedChartWidth / dataLength) * 0.9; // 90% to leave padding
          return <CustomXAxisTick {...props} width={availableWidth} fontSize={10} />;
        }}
        interval={0}
        angle={0}
        textAnchor="middle"
        height={80}
      />
      <YAxis
        domain={[0, 'dataMax']}
        tickFormatter={(value) => {
    const num = Number(value);
    const formatted = num % 1 === 0 ? num : num.toFixed(1);
    return viewType[activeTab] === 'percentage' ? `${formatted}%` : formatted;
  }}
        tick={{ fontSize: 11, fill: '#666666', fontFamily: 'Nunito', fontWeight: 500 }}
      />
      <Tooltip content={(props) => ( <CustomChartTooltip {...props} viewType={viewType[activeTab]} cellHoverRef={cellHover} /> )} />
       {valueA>0 &&
      <Bar dataKey="valueA" name="Dataset 1" fill={"#FAE69C"}  maxBarSize={60}  stroke="#000"  onMouseEnter={() => handleMouseEnter("valueA")} onMouseLeave={handleMouseLeave} strokeWidth={0.6} barSize={valueC > 0 ? undefined : 40} />

      }
      {valueB>0 &&
      <Bar dataKey="valueB" name="Dataset 2" fill={"#A4E9CB"}  maxBarSize={60}  stroke="#000"  onMouseEnter={() => handleMouseEnter("valueB")} onMouseLeave={handleMouseLeave} strokeWidth={0.6} barSize={valueC > 0 ? undefined : 40} />
      }
      {valueC>0 &&
      <Bar dataKey="valueC" name="Dataset 3" fill={"#A3CCE8"}  maxBarSize={60}  stroke="#000"  onMouseEnter={() => handleMouseEnter("valueC")} onMouseLeave={handleMouseLeave} strokeWidth={0.6} barSize={40} />
      }
    </BarChart>
  </ResponsiveContainer>
) : (
  <ModalNoDataContainer>
    No data available
  </ModalNoDataContainer>
)}

            </ModalChartContainer>
          )}
        </ModalChartWrapper>
      </ModalContent>
    </ModalOverlay>,
  document.body
));
};

export default ExpandedChartModal;