import React, { useEffect, useRef, useState } from "react";
import { VennDiagramChart, extractSets } from "chartjs-chart-venn";

// Utility Functions
const hexToRgba = (hex, alpha = 1) => {
  const rgb = hex.replace("#", "").match(/.{2}/g).map(x => parseInt(x, 16));
  return `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, ${alpha})`;
};

const intersectionColors = [
  "#000","#000","#cbdfcc",
  "#cbdfcc",
  "#e4e3c4",
  "#bcd8d1",
  "#65DEA8"
].map(color => hexToRgba(color));

function reduceOpacity(rgbaColor, reductionPercentage) {
  const matches = rgbaColor.match(/rgba?\((\d+), (\d+), (\d+),? ([\d.]+)?\)/);
  if (!matches) throw new Error("Invalid RGBA color format");

  const [, r, g, b, a = 1] = matches.map(Number); 
  const newAlpha = a * (1 - reductionPercentage / 100);
  return `rgba(${r}, ${g}, ${b}, ${newAlpha})`;
}

function getFontSize(dataset) {
  const largeDataCount = dataset.data
    .filter(item => item.sets.length > 1)
    .reduce((sum, item) => sum + item.values.length, 0);
  return largeDataCount > 999 ? 10 : 15;
}



const ChartVenn = ({ intersection, cohortData, setSelectedChart, setSelectedCohortSections,selectedCohortSection,selectedCohort,setGeneralInfo,containerRef,canvasRef }) => {
  const chartRef = useRef(null);

  const baseColorArray = ["#F9E28B", "#86E2B9", "#5198C8D9", ].map(color => hexToRgba(color));;
  const nodes = ["participant_pk","diagnosis","treatment_type"];

  const [baseSets, setBaseSets] = useState([]);
  const [data, setData] = useState(null);

  useEffect(() => {
    const updatedBaseSets = cohortData.map((cohort) => {
      const seenValues = new Set();
      return {
        label: `${cohort.cohortName.length > 15 ? cohort.cohortName.slice(0, 15) + '...' : cohort.cohortName} (${cohort.participants.length})`,
        values: cohort.participants
          .map(p => p[nodes[intersection]])
          .filter(value => {
            if (value !== null && value !== undefined && !seenValues.has(value)) {
              seenValues.add(value);
              return true;
            }
            return false;
          }),
        size: cohort.participants.length,
      };
    });
   

    setBaseSets(updatedBaseSets);
  }, [cohortData]);
  
  useEffect(() => {
    if (baseSets.length > 0) {
      const updatedData = extractSets(
        baseSets.map(set => ({ label: set.label, values: set.values, value: set.size}))
      );

      
      setData(updatedData);
    } 
  }, [baseSets]);

 

  const handleChartClick = (event) => {
    const elementsAtEvent = chartRef.current.getElementsAtEventForMode(
      event,
      "nearest",
      { intersect: true },
      true
    );

    if (elementsAtEvent.length) {
      const firstElement = elementsAtEvent[0];
      const datasetIndex = firstElement.datasetIndex;
      const index = firstElement.index;
      const label = data.datasets[datasetIndex].data[index].label;
      const content = data.datasets[datasetIndex].data[index].values;

      setSelectedChart(prev => {
        const updatedChart = new Set(prev);
        content.forEach(item => updatedChart.has(item) ? updatedChart.delete(item) : updatedChart.add(item));
        return Array.from(updatedChart);
      });
      let prevData = [...selectedCohortSection];
      if(prevData.includes(label)){
        prevData = prevData.filter(labels => labels !== label);
      }else{
        prevData =[...prevData,label];

      }
     
      setSelectedCohortSections(prevData);
    }
  };



  
  const getBorderColor = (item, index ) => {
    return selectedCohortSection.includes(item.label) ? "rgba(0, 0, 0, 0.1)" : "#929292";
  }

  const getBorderWidth = (item, index) =>{
  
    return selectedCohortSection.includes(item.label) ? 4 : 0.5;
  }

  const getBackgroundColor = (item, index) => {
    if (item.sets.length > 1) {
      const hardcodedColor = intersectionColors[index] || "rgba(223, 29, 29, 0)";
 
  return selectedCohortSection.includes(item.label) ? hardcodedColor :  reduceOpacity(hardcodedColor, 35);;
    } else {
      return selectedCohortSection.includes(item.label)
        ? baseColorArray[index]
        : reduceOpacity(baseColorArray[index], 55);
    }
  };

const fontSizeX = React.useMemo(() => {
  if (!data || !data.datasets || !data.datasets[0] || !data.datasets[0].data) return 15;

  const largeDataCount = data.datasets[0].data
    .filter(item => item.sets.length > 1)
    .reduce((sum, item) => sum + item.values.length, 0);

  return largeDataCount > 999 ? 10 : 15;
}, [data]);


let config = {};
if(data){
   config = {
    type: "venn",
    data: {
      ...data,
      datasets: [
        {
          ...data.datasets[0],
          backgroundColor: data.datasets[0].data.map(getBackgroundColor),
          borderColor: data.datasets[0].data.map(getBorderColor),
          borderWidth: data.datasets[0].data.map(getBorderWidth) ,
        },
      ],
    },
    options: {
      onClick: handleChartClick,
      scales: {
        x: {
            ticks: {
                font: {
                    family: 'Nunito',
                    size: fontSizeX,
                    weight: 0,
                },
                color: '#000',
            },
        },
        y: {
            ticks: {
                font: {
                    family: 'Nunito',
                    size: 16,
                    weight: 570,
                },
                color: 'black',
            },
        },
    },
    hover: {
      mode: null,
      animationDuration: 0 
    },
    },
  };

}

 

useEffect(() => {
  if (chartRef.current && canvasRef.current) {
    chartRef.current.destroy();
    canvasRef.current.width = cohortData.length === 2 ? 800 : 700;
    canvasRef.current.height =  cohortData.length === 2 ? 200 : 270; 
  }
  chartRef.current = new VennDiagramChart(canvasRef.current, config);

  return () => {
    if (chartRef.current) chartRef.current.destroy();
  };
}, [selectedCohortSection, data, selectedCohort , cohortData]);
    
    

  useEffect(() => {
    let updatedStat = {};
    if(data){
     
      data.datasets[0].data.forEach(item => {
        if (selectedCohortSection.includes(item.label)) {
          updatedStat[item.label] = item.values;
        }
      });

      setGeneralInfo(updatedStat)
    }
   
  },[selectedCohortSection,intersection])

  if(!data){
    return (
      <div>
        <p>Loading....</p>
      </div>
    )
  }
  return (
    <div ref={containerRef}  className="App">
   <div style={{minHeight: 45}}>
    </div> 
      <canvas  ref={canvasRef} id="canvas"></canvas>
    
    </div>
  );
};

export default ChartVenn;