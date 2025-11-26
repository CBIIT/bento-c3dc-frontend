import React , { useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import {
  RadioGroup, RadioInput
  , RadioLabel, ModalChartWrapper, ModalContent
  , ModalOverlay, CloseButton, Tab, TabContainer,
} from './HistogramPanel.styled';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import DownloadIcon from "../../../assets/icons/Download_Histogram_icon.svg";
import DownloadIconBorderless from "../../../assets/icons/download-icon-borderless.svg";
import CustomChartTooltip from './CustomChartTooltip';
import CustomXAxisTick from './CustomXAxisTick';
import { KaplanMeierChart } from '@bento-core/kmplot';
import RiskTable from '@bento-core/risk-table';
import { DownloadDropdown, DownloadDropdownMenu, DownloadDropdownItem } from './HistogramPanel.styled';

const htmlToImage = require('html-to-image');



// CustomTick removed - using CustomXAxisTick instead



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
  timeIntervals
}) => {
  const [showDownloadDropdown, setShowDownloadDropdown] = React.useState(false);
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

      // Clone SVG to avoid modifying the original
      const clonedSvg = svgElement.cloneNode(true);
      clonedSvg.setAttribute('width', width);
      clonedSvg.setAttribute('height', height);
      clonedSvg.style.width = `${width}px`;
      clonedSvg.style.height = `${height}px`;

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

  const downloadBoth = (kmChartRef, riskTableRef) => {
    try {
      if (!kmChartRef || !kmChartRef.current) {
        console.error("KM chart ref not available");
        return;
      }
      
      if (!riskTableRef || !riskTableRef.current) {
        console.error("Risk table ref not available");
        return;
      }
      
      const kmSvgElement = kmChartRef.current.querySelector("svg");
      const tableElement = riskTableRef.current;
      
      if (!kmSvgElement) {
        console.error("Could not find Kaplan-Meier SVG element");
        return;
      }

      const scaleFactor = 2;
      
      // Get dimensions of KM chart from viewBox or width/height attributes
      let kmWidth, kmHeight;
      const viewBox = kmSvgElement.getAttribute('viewBox');
      if (viewBox) {
        const [, , vw, vh] = viewBox.split(/\s+/).map(parseFloat);
        kmWidth = vw || kmSvgElement.width.baseVal.value || kmSvgElement.getBoundingClientRect().width || 800;
        kmHeight = vh || kmSvgElement.height.baseVal.value || kmSvgElement.getBoundingClientRect().height || 300;
      } else {
        kmWidth = kmSvgElement.width.baseVal.value || kmSvgElement.getBoundingClientRect().width || 800;
        kmHeight = kmSvgElement.height.baseVal.value || kmSvgElement.getBoundingClientRect().height || 300;
      }
      
      // Get dimensions of Risk Table element (it's HTML, not SVG)
      const tableBbox = tableElement.getBoundingClientRect();
      const tableWidth = tableBbox.width || 760;
      const tableHeight = tableBbox.height || 200;
      
      // Create a canvas that fits both charts vertically
      const combinedWidth = Math.max(kmWidth, tableWidth);
      const combinedHeight = kmHeight + tableHeight + 20; // 20px spacing between charts
      
      const canvas = document.createElement("canvas");
      canvas.width = combinedWidth * scaleFactor;
      canvas.height = combinedHeight * scaleFactor;
      const ctx = canvas.getContext("2d");
      
      // Fill with white background
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.scale(scaleFactor, scaleFactor);

      // Helper function to draw SVG to canvas
      const drawSvgToCanvas = (svgElement, x, y) => {
        return new Promise((resolve, reject) => {
          try {
            // Get SVG dimensions from viewBox or width/height attributes, fallback to bounding rect
            let width, height;
            const viewBox = svgElement.getAttribute('viewBox');
            if (viewBox) {
              const [, , vw, vh] = viewBox.split(/\s+/).map(parseFloat);
              width = vw || svgElement.width.baseVal.value || svgElement.getBoundingClientRect().width || 800;
              height = vh || svgElement.height.baseVal.value || svgElement.getBoundingClientRect().height || 300;
            } else {
              width = svgElement.width.baseVal.value || svgElement.getBoundingClientRect().width || 800;
              height = svgElement.height.baseVal.value || svgElement.getBoundingClientRect().height || 300;
            }

            // Clone SVG to avoid modifying the original
            const clonedSvg = svgElement.cloneNode(true);
            clonedSvg.setAttribute('width', width);
            clonedSvg.setAttribute('height', height);
            clonedSvg.style.width = `${width}px`;
            clonedSvg.style.height = `${height}px`;

            const svgData = new XMLSerializer().serializeToString(clonedSvg);
            const svgBlob = new Blob([svgData], { type: "image/svg+xml;charset=utf-8" });
            const url = URL.createObjectURL(svgBlob);

            const img = new Image();
            img.onload = () => {
              try {
                ctx.drawImage(img, x, y, width, height);
                URL.revokeObjectURL(url);
                resolve();
              } catch (err) {
                console.error("Error drawing image:", err);
                URL.revokeObjectURL(url);
                reject(err);
              }
            };
            img.onerror = (err) => {
              console.error("Error loading image:", err);
              URL.revokeObjectURL(url);
              reject(err);
            };
            img.src = url;
          } catch (err) {
            console.error("Error serializing SVG:", err);
            reject(err);
          }
        });
      };

      // Helper function to draw Risk Table using the ref with html-to-image
      const drawRiskTableToCanvas = (riskTableRef, x, y) => {
        return new Promise((resolve, reject) => {
          if (!riskTableRef || !riskTableRef.current) {
            reject(new Error("Risk table ref not available"));
            return;
          }

          // Use the ref directly to capture the Risk Table element
          const tableElement = riskTableRef.current;
          
          // Store original margin and temporarily remove it
          const originalMargin = tableElement.style.marginLeft;
          tableElement.style.marginLeft = '0';

          htmlToImage.toCanvas(tableElement, {
            backgroundColor: 'transparent',
            pixelRatio: scaleFactor,
            quality: 1.0
          }).then(tableCanvas => {
            try {
              // Restore original margin
              tableElement.style.marginLeft = originalMargin;
              
              // Draw at the correct position (canvas is already scaled, but ctx is also scaled)
              // So we need to divide by scaleFactor to get the correct size
              ctx.drawImage(tableCanvas, x, y, tableCanvas.width / scaleFactor, tableCanvas.height / scaleFactor);
              resolve();
            } catch (err) {
              // Restore original margin even on error
              tableElement.style.marginLeft = originalMargin;
              console.error("Error drawing table canvas:", err);
              reject(err);
            }
          }).catch(error => {
            // Restore original margin even on error
            tableElement.style.marginLeft = originalMargin;
            console.error("Error using html-to-image:", error);
            reject(error);
          });
        });
      };

      // Draw both charts sequentially
      const promises = [];
      
      // Always draw KM chart (SVG)
      promises.push(drawSvgToCanvas(kmSvgElement, 0, 0));
      
      // Draw Risk Table using the ref directly
      promises.push(drawRiskTableToCanvas(riskTableRef, 0, kmHeight + 20));
      
      Promise.all(promises)
        .then(() => {
          canvas.toBlob((blob) => {
            if (!blob) {
              console.error("Failed to create blob");
              return;
            }
            const downloadUrl = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = downloadUrl;
            a.download = `survival_analysis_combined.png`;
            document.body.appendChild(a);
            a.click();
            setTimeout(() => {
              document.body.removeChild(a);
              URL.revokeObjectURL(downloadUrl);
            }, 100);
          }, "image/png");
        })
        .catch((error) => {
          console.error("Error drawing charts to canvas:", error);
          alert("Error downloading combined chart. Please check the console for details.");
        });

      setShowDownloadDropdown(false);
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
    
  }, [])


  return (
    createPortal(
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
            {titles.survivalAnalysis && (
              <Tab
                active={activeTab === 'survivalAnalysis'}
                onClick={() => setActiveTab('survivalAnalysis')}
              >
                {titles.survivalAnalysis}
              </Tab>
            )}
          </TabContainer>

          <div style={{ minWidth: 300, right: 10, top:2, position:'absolute', justifyContent: 'flex-end', display: 'flex', gap: 5 }}>
            {activeTab === 'survivalAnalysis' ? (
              <DownloadDropdown ref={dropdownRef}>
                <span 
                  onClick={() => setShowDownloadDropdown(!showDownloadDropdown)}
                  style={{ cursor: 'pointer', marginTop: 5 }}
                >
                  <img src={DownloadIcon} alt={"download"} style={{ width: '23px', height: '23px' }} />
                </span>
                {showDownloadDropdown && (
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
            ) : (
              <span style={{ marginTop: 5, cursor: 'pointer' }} onClick={() => downloadChart(activeTab,true)}>
                <img src={DownloadIcon} alt={"download"} style={{ width: '23px', height: '23px' }} />
              </span>
            )}
            <CloseButton onClick={() => setExpandedChart(null)}>×</CloseButton>
          </div>

        </div>
        <ModalChartWrapper>
          {activeTab === 'survivalAnalysis' ? (
            <div style={{ width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '20px' }}>
              <div style={{width: '100%', display: 'flex', flexDirection: 'column'}}>
                <div ref={kmChartRef} style={{width: '100%', paddingLeft: '160px', marginRight: '100px'}}>
                  <KaplanMeierChart
                    data={kmPlotData}
                    title="Overall Survival by Diagnosis"
                    width={"100%"}
                    height={300}
                    loading={kmLoading}
                    error={kmError}
                  />
                </div>
                <div ref={riskTableRef} style={{width: '100%', paddingLeft: '160px', marginRight: '100px'}}>
                  <RiskTable
                    cohorts={cohorts}
                    timeIntervals={timeIntervals}
                  />
                </div>
              </div>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'row', height: '100%', alignItems: 'center', justifyContent: 'flex-start' }}>
             <fieldset style={{ border: 'none' }}>
              <RadioGroup style={{ height: '100px', width:'180px', marginTop: '20px' }}>
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
              </RadioGroup>
               </fieldset>
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
          )}
        </ModalChartWrapper>
      </ModalContent>
    </ModalOverlay>,
  document.body
));
};

export default ExpandedChartModal;