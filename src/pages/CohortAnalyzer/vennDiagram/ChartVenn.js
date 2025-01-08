import React, { useEffect, useRef, useState } from "react";
import { VennDiagramChart, extractSets } from "chartjs-chart-venn";

// Utility Functions
const hexToRgba = (hex, alpha = 1) => {
  const rgb = hex.replace("#", "").match(/.{2}/g).map(x => parseInt(x, 16));
  return `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, ${alpha})`;
};

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

  const selectedColor = "rgba(255, 99, 132, 0.7)";
  const baseColorArray = ["#86E2B9", "#5198C8D9", "#F9E28B"].map(color => hexToRgba(color));;
  const nodes = ["participant_pk","diagnosis"];

  const [baseSets, setBaseSets] = useState([]);
  const [data, setData] = useState(null);

  useEffect(() => {
    const updatedBaseSets = cohortData.map((cohort) => ({
      label: `${cohort.cohortId} (${cohort.participants.length})`,
      values: cohort.participants.map(p => p[nodes[intersection]]),
      size: cohort.participants.length,
    }));
    setBaseSets(updatedBaseSets);
  }, [cohortData]);
  
  useEffect(() => {
    if (baseSets.length > 0) {
      const updatedData = extractSets(
        baseSets.map(set => ({ label: set.label, values: set.values, value: set.size }))
      );
      console.log("Newbasesets: ", updatedData);
      setData(updatedData);
    }
    console.log("baseSets: ", baseSets);
  }, [baseSets]);

 

  const handleChartClick = (event) => {
    const elementsAtEvent = chartRef.current.getElementsAtEventForMode(
      event,
      "nearest",
      { intersect: true },
      true
    );

    if (elementsAtEvent.length && data) {
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

      setSelectedCohortSections(prev => {
        return prev.includes(label)
          ? prev.filter(item => item !== label)
          : [...prev, label];
      });
    }
  };

  const getBackgroundColor = (item, index) => {
    if (item.sets.length > 1) {
      const intersectingColors = item.sets.map(set => {
        const setIndex = baseSets.findIndex(bSet => bSet.label === set);
        return setIndex !== -1 ? baseColorArray[setIndex] : "rgba(0, 0, 0, 0)";
      });

      const blendedColor = intersectingColors.reduce((acc, color) => blendColors(acc || intersectingColors[0], color));
      return selectedCohortSection.includes(item.label) ? selectedColor : blendedColor;
    } else {
      return selectedCohortSection.includes(item.label)
        ? selectedColor
        : baseColorArray[index];
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
          borderWidth: 1,
        },
      ],
    },
    options: {
      onClick: handleChartClick,
      onHover: (event, elements) => {
        const canvas = event.native.target;
        if (elements.length) {
          canvas.style.cursor = 'pointer';
        } else {
          canvas.style.cursor = 'default';
        }
      }
    },
  };


}
 

  useEffect(() => {
    if (chartRef.current) chartRef.current.destroy();
    chartRef.current = new VennDiagramChart(canvasRef.current, config);

    return () => {
      if (chartRef.current) chartRef.current.destroy();
    };
    
  }, [selectedCohortSection, data,selectedCohort]);

  useEffect(() => {
    let updatedStat = {};
    if(data){
      data.datasets[0].data.forEach(item => {
        if (selectedCohortSection.includes(item.label)) {
          updatedStat[item.label] = item.values;
        }
      });
      setGeneralInfo(updatedStat);
    }
   
  },[selectedCohortSection])

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
