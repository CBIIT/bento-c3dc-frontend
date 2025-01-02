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

  return `rgba(${blendedColor.join(", ")})`;
};

const ChartVenn = ({ cohortData, setSelectedChart, setSelectedCohortSections, selectedCohortSection, selectedCohort, setGeneralInfo }) => {
  const canvasRef = useRef(null);
  const chartRef = useRef(null);
  const [selectedVenns, setSelectedVenns] = useState([]);
  //const [generalInfo, setGeneralInfo] = useState({});

  const selectedColor = "rgba(255, 99, 132, 0.7)";
 

  const baseColorArray = ["#FBEBB0", "#BAD9CB", "#B9CEDC"].map(color => hexToRgba(color));;
  
  
  const baseSets = cohortData.map((cohort) => ({
    label: `${cohort.cohortName} (${cohort.participants.length})`,
    values: cohort.participants.map(p => p.participant_pk),
    size: cohort.participants.length,
  }));

  const data = extractSets(
    baseSets.map(set => ({ label: set.label, values: set.values, value: set.size }))
  );

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

      setSelectedCohortSections(prev => {
        return prev.includes(label)
          ? prev.filter(item => item !== label)
          : [...prev, label];
      });
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

  const config = {
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

  useEffect(() => {
    if (chartRef.current) chartRef.current.destroy();
    chartRef.current = new VennDiagramChart(canvasRef.current, config);

    return () => {
      if (chartRef.current) chartRef.current.destroy();
    };

  }, [selectedCohortSection, data, selectedCohort]);

  useEffect(() => {
    let updatedStat = {};
    data.datasets[0].data.forEach(item => {
      if (selectedCohortSection.includes(item.label)) {
        updatedStat[item.label] = item.values;
      }
    });
    setGeneralInfo(updatedStat);
  }, [selectedCohortSection])

  return (
    <div className="App">
      <canvas style={{ width: 800, height: 100,position:'relative',left:0,top:-30}} ref={canvasRef} id="canvas"></canvas>

    </div>
  );
};

export default ChartVenn;
