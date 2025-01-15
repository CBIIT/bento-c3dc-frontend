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

  const [_, r, g, b, a = 1] = matches.map(Number); // Default alpha to 1 if not specified
  const newAlpha = a * (1 - reductionPercentage / 100);
  return `rgba(${r}, ${g}, ${b}, ${newAlpha})`;
}

const blendColors = (color1, color2) => {
  const rgba1 = color1.match(/[\d.]+/g).map(Number);
  const rgba2 = color2.match(/[\d.]+/g).map(Number);

  if (rgba1.length < 3 || rgba2.length < 3) {
    throw new Error("Invalid color format. Colors must be in rgba or rgb format.");
  }

  const blendedColor = [
    Math.round((rgba1[0] + rgba2[0]) / 2), // Red
    Math.round((rgba1[1] + rgba2[1]) / 2), // Green
    Math.round((rgba1[2] + rgba2[2]) / 2), // Blue
    rgba1[3] !== undefined && rgba2[3] !== undefined 
      ? (rgba1[3] + rgba2[3]) / 2
      : 1, // Alpha
  ];

  return `rgba(${blendedColor.join(",")})`;
};

const ChartVenn = ({ intersection, cohortData, setSelectedChart, setSelectedCohortSections,selectedCohortSection,selectedCohort,setGeneralInfo }) => {
  const canvasRef = useRef(null);
  const chartRef = useRef(null);
  const [selectedVenns, setSelectedVenns] = useState([]);
  //const [generalInfo, setGeneralInfo] = useState({});
  const [generalInfoBaseset, setGeneralInfoBaseSet ]= useState([]);
  const [generalInfoData, setGeneralInfoData ] =useState(null);

  const selectedColor = "rgba(255, 99, 132, 0.7)";
  const baseColorArray = ["#F9E28B", "#86E2B9", "#5198C8D9", ].map(color => hexToRgba(color));;
  const nodes = ["participant_pk","diagnosis","treatment_type"];

  const [baseSets, setBaseSets] = useState([]);
  const [data, setData] = useState(null);

  useEffect(() => {
    const updatedBaseSets = cohortData.map((cohort) => ({
      label: `${cohort.cohortId} (${cohort.participants.length})`,
      values: cohort.participants.map(p =>  p[nodes[intersection]]),
      size: cohort.participants.length,
    }));  


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
    return selectedCohortSection.includes(item.label) ? "white" : "#929292";
  }

  const getBorderWidth = (item, index) =>{
  
    return selectedCohortSection.includes(item.label) ? 4 : 0.5;
  }

  const getBackgroundColor = (item, index) => {
    if (item.sets.length > 1) {
      const intersectionKey = item.sets.sort().join("-");
      const hardcodedColor = intersectionColors[index] || "rgba(223, 29, 29, 0)";
  
  return selectedCohortSection.includes(item.label) ? hardcodedColor :  reduceOpacity(hardcodedColor, 35);;
    } else {
      return selectedCohortSection.includes(item.label)
        ? baseColorArray[index]
        : reduceOpacity(baseColorArray[index], 55);
    }
  };

  
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
                    size: 15,
                    weight: 300,
                },
                color: '#000',
            },
        },
        y: {
            ticks: {
                font: {
                    family: 'Nunito',
                    size: 17,
                    weight: 800,
                },
                color: 'black',
            },
        },
    },
    hover: {
      mode: null,
      animationDuration: 0 
    }
    },
  };

}

 

useEffect(() => {
  if (chartRef.current && canvasRef.current) {
    chartRef.current.destroy();
    canvasRef.current.width = 600;
    canvasRef.current.height = 270; 
  }
  chartRef.current = new VennDiagramChart(canvasRef.current, config);

  return () => {
    if (chartRef.current) chartRef.current.destroy();
  };
}, [selectedCohortSection, data, selectedCohort]);
    
    

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
    <div className="App">
      <canvas style={{ width: 800, height: 100 }} ref={canvasRef} id="canvas"></canvas>
    
    </div>
  );
};

export default ChartVenn;