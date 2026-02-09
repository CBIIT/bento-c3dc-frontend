import { useState, useRef, useMemo, useEffect } from "react";
import { gql } from "@apollo/client";
import { useApolloClient } from "@apollo/client";
import { barColors } from "./HistogramPanel.styled";
export const useHistogramData = ({c1=[],c2=[],c3=[]}) => {
  const viewTypeApiKeys= {
    treatmentType: 'treatment_type',
    response: 'response',
    sexAtBirth: 'sex_at_birth',
    race: 'race'
  };

  const [viewType, setViewType] = useState({
    treatmentType: "percentage",
    response: "percentage",
    sexAtBirth: "percentage",
    race: "percentage"
  });

  const [expandedChart, setExpandedChart] = useState(null);
  const [activeTab, setActiveTab] = useState("sexAtBirth");
  const [selectedDatasets, setSelectedDatasets] = useState(["sexAtBirth","race"]);
  const chartRef = useRef({});
  const [fetchedData, setFetchedData] = useState({});

   const COHORT_CHARTS_QUERY = gql`
  query cohortCharts(
    $c1: [String]
    $c2: [String]
    $c3: [String]
    $charts: [CohortChartConfigChart]
  ) {
    cohortCharts(c1: $c1, c2: $c2, c3: $c3, charts: $charts) {
      property
      cohorts {
        cohort
        participantsByGroup {
          group
          subjects
        }
      }
    }
  }
`;

  // assign colors in a round‐robin
  const colorPalette = [
    '#4A90E2', '#7ED321', '#F5A623', '#50E3C2',
    '#B8E986', '#9013FE', '#FF6B6B', '#4ECDC4'
  ];

  const handleDatasetChange = (key) => {
    setSelectedDatasets((prev) =>
      prev.includes(key) ? prev.filter((item) => item !== key) : [...prev, key]
    );
  };

  const downloadChart = (dataset, isExpanded) => {
    try {
      const elementId = isExpanded ? `expanded-chart-${dataset}` : `chart-${dataset}`;
      const chartElement = document.getElementById(elementId);
      if (!chartElement) return;

      const svgElement = chartElement.querySelector("svg");
      if (!svgElement) return;

      const scaleFactor = 2;
      const bbox = svgElement.getBoundingClientRect();
      const width = bbox.width;
      const height = bbox.height;

      const canvas = document.createElement("canvas");
      canvas.width = width * scaleFactor;
      canvas.height = height * scaleFactor;
      const ctx = canvas.getContext("2d");
      const TRANSPARENT_COLOR = "#00000000";

      ctx.fillStyle = TRANSPARENT_COLOR;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.scale(scaleFactor, scaleFactor);

      const svgData = new XMLSerializer().serializeToString(svgElement);
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
          a.download = `data_chart.png`;
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          URL.revokeObjectURL(downloadUrl);
        }, "image/png");
      };

      img.src = url;
    } catch (error) {
      console.error("Error downloading chart:", error);
    }
  };


const convertGraphQLResponse = (response) => {
  const chartData = {};

  // avoid optional chaining; bail out if no charts
  if (!response || !response.cohortCharts) {
    return chartData;
  }

  response.cohortCharts.forEach((chart) => {
    const property = chart.property;

    // collect unique group names
    const groupSet = new Set();
    chart.cohorts.forEach((cohort) => {
      if (cohort.participantsByGroup) {
        cohort.participantsByGroup.forEach((entry) => {
          groupSet.add(entry.group);
        });
      }
    });

    const groupColors = {};
    Array.from(groupSet).forEach((group, i) => {
      groupColors[group] = colorPalette[i % colorPalette.length];
    });

    // flatten into [ { name, cohort, count, percentage, color }, … ]
    const entries = [];
    chart.cohorts.forEach((cohort) => {
      if (cohort.participantsByGroup) {
        cohort.participantsByGroup.forEach((entry) => {
          entries.push({
            name: entry.group,
            cohort: cohort.cohort,
            count: entry.subjects,
            percentage: 0,
            color: groupColors[entry.group]
          });
        });
      }
    });

    chartData[property] = entries;
  });

  return chartData;
};

const client = useApolloClient();

const fetchChartData = async () => {
  try {
    const charts = [];
    Object.keys(viewType).forEach((key) => {
      charts.push({ property: viewTypeApiKeys[key], type: viewType[key] });
    });
    const { data } = await client.query({
      query: COHORT_CHARTS_QUERY,
      variables: {
        c1: c1,
        c2: c2,
        c3: c3,
        charts: [
          ...charts
        ]
      }
    });

    const parsed = convertGraphQLResponse(data);
    setFetchedData(parsed);
  } catch (error) {
    console.error("Failed to fetch chart data:", error);
  }
};

  
  useEffect(() => {
    fetchChartData(); // Only runs once to fetch simulated data
  }, [c1, c2, c3, viewType]);

  // Reset checkboxes to default when all cohorts are empty
  useEffect(() => {
    const allInputsEmpty = [c1, c2, c3].every(arr => arr.length === 0);
    if (allInputsEmpty) {
      setSelectedDatasets(["sexAtBirth", "race"]);
    }
  }, [c1, c2, c3]);

  const toCamelCase = (input) => {
  return input
    .split("_")
    .map((word, index) =>
      index === 0 ? word.toLowerCase() : word.charAt(0).toUpperCase() + word.slice(1)
    )
    .join("");
};
const transformToGroupedValues = (flatData) => {
  const grouped = {};

  flatData.forEach((item) => {
    const { name, cohort, count } = item;

    if (!grouped[name]) {
      grouped[name] = { name };
    }

    if (cohort === "c1") {
      grouped[name].valueA = count;
      grouped[name].colorA = barColors.colorA;
    } else if (cohort === "c2") {
      grouped[name].valueB = count;
      grouped[name].colorB = barColors.colorB;
    } else if (cohort === "c3") {
      grouped[name].valueC = count;
      grouped[name].colorC = barColors.colorC;
    }
  });

  return Object.values(grouped);
};

const graphData = useMemo(() => {
  const transformed = {};

  Object.keys(fetchedData).forEach((key) => {
    const camelKey = toCamelCase(key);
    transformed[camelKey] = transformToGroupedValues(fetchedData[key]);
  });

  return transformed;
}, [fetchedData]);



  return {
    graphData,
    viewType,
    setViewType,
    activeTab,
    setActiveTab,
    selectedDatasets,
    setSelectedDatasets,
    expandedChart,
    setExpandedChart,
    chartRef,
    handleDatasetChange,
    downloadChart,
    barColors
  };
};


