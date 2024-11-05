import React, { useEffect, useRef, useState } from "react";
import { VennDiagramChart, extractSets } from "chartjs-chart-venn";


const ChartVenn = ({ cohortData }) => {
  const canvasRef = useRef(null);
  const chartRef = useRef(null);

  const [selectedVenns, setSelectedVenns] = useState([]);

  const baseColors = {
    Cohort1: "rgba(54, 162, 235, 0.5)",        // Blue
    Cohort2: "rgba(255, 206, 86, 0.5)",        // Yellow
    Cohort3: "rgba(75, 192, 192, 0.5)",    // Green
  };
  const selectedColor = "rgba(255, 99, 132, 0.7)"; // Red for selected sections

  const getValue = (c,key='participant_pk') => c.map((o)=>o[key]);

  const baseSets = cohortData.map((c) => ({ label: c.cohortId, values: getValue(c.participants) }));

  // Note: Keeping these lines as example.
  // const data = extractSets(
  //   [
  //     { label: "Cohort1", values: ["alex", "casey", "drew", "hunter", "jade"] },
  //     { label: "Cohort2", values: ["casey", "drew", "jade"] },
  //     { label: "Cohort3", values: ["drew", "glen", "jade", "hunter"] }
  //   ],
  //   { label: "Cohort diagram" }
  // );

  const data = extractSets(baseSets,{ label: "Cohort diagram" });


  const config = {
    type: "venn",
    data: {
      ...data,
      datasets: [
        {
          ...data.datasets[0],
          backgroundColor: data.datasets[0].data.map((item) =>
            selectedVenns.includes(item.label) ? selectedColor : baseColors[item.sets[0]]
          ),
          borderWidth: 1,
        },
      ],
    },
    options: {
      onClick: (event) => {
        const elementsAtEvent = chartRef.current.getElementsAtEventForMode(
          event,
          "nearest",
          { intersect: true },
          true
        );

        if (elementsAtEvent.length) {
          const firstElement = elementsAtEvent[0];
          const datasetIndex = firstElement.datasetIndex;
          const index = firstElement.index;  // Capture the index within the dataset
          const label = config.data.datasets[datasetIndex].data[index].label;
          //  alert("label: " + label);
          // Toggle selection in selectedVenns state
          setSelectedVenns((prevSelected) => {
            if (prevSelected.includes(label)) {
              return prevSelected.filter((item) => item !== label);
            } else {
              return [...prevSelected, label];
            }
          });
        }
      },
      plugins: {
      }
    },
  };

  useEffect(() => {
    if (chartRef.current) chartRef.current.destroy(); // Clean up previous chart instance if it exists
    chartRef.current = new VennDiagramChart(canvasRef.current, config);

    return () => {
      if (chartRef.current) chartRef.current.destroy(); // Clean up on unmount
    };
  }, [selectedVenns,data]); // Re-render the chart when selectedVenns changes

  return (
    <div className="App">
      <canvas ref={canvasRef} id="canvas"></canvas>
      <div>
        <h4>Selected Venn Sections:</h4>
        <ul>
          {selectedVenns.map((venn, index) => (
            <li key={index}>{venn}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ChartVenn;
