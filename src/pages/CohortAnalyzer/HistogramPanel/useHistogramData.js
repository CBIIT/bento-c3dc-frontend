import { set } from "lodash";
import { useState, useRef, useMemo, useEffect } from "react";
import { gql } from "@apollo/client";
import { useApolloClient } from "@apollo/client";

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

  // Hardcoded data (fallback)
  const treatmentType = [
    { name: 'Surgical Procedure', count: 450, percentage: 75.0, color: '#4A90E2' },
    { name: 'Pharmaceutical Therapy', count: 300, percentage: 50.0, color: '#7ED321' },
    { name: 'Radiation Therapy', count: 180, percentage: 30.0, color: '#F5A623' },
    { name: 'Chemotherapy', count: 150, percentage: 25.0, color: '#50E3C2' },
    { name: 'Molecular Beam Radiation', count: 120, percentage: 20.0, color: '#B8E986' },
    { name: 'Proton Beam Radiation', count: 90, percentage: 15.0, color: '#9013FE' },
    { name: 'Immunotherapy', count: 60, percentage: 10.0, color: '#FF6B6B' },
    { name: 'Autologous Stem Cell Tx', count: 30, percentage: 5.0, color: '#4ECDC4' }
  ];

  const treatmentOutcome = [
    { name: 'Unknown', count: 280, percentage: 46.7, color: '#4A90E2' },
    { name: 'Complete Remission', count: 280, percentage: 46.7, color: '#7ED321' },
    { name: 'Not Reported', count: 280, percentage: 46.7, color: '#F5A623' }
  ];

  const handleDatasetChange = (key) => {
    setSelectedDatasets((prev) =>
      prev.includes(key) ? prev.filter((item) => item !== key) : [...prev, key]
    );
  };

  const downloadChart = (dataset) => {
    try {
      const chartElement = document.getElementById(`chart-${dataset}`);
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

      ctx.fillStyle = "#00000000";
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

const mergeGroupedBarData = (key, datasets) => {
  if (!Array.isArray(datasets) || !Array.isArray(datasets[0])) return [];

  return datasets[0].map((item, index) => ({
    name: item.name,
    valueA: viewType[key] === "percentage" ? item.percentage : item.count,
    valueB: viewType[key] === "percentage"
      ? (datasets[1] && datasets[1][index] && datasets[1][index].percentage)
      : (datasets[1] && datasets[1][index] && datasets[1][index].count),
    valueC: viewType[key] === "percentage"
      ? (datasets[2] && datasets[2][index] && datasets[2][index].percentage)
      : (datasets[2] && datasets[2][index] && datasets[2][index].count),
    colorA: item.color || 'red',
    colorB: (datasets[1] && datasets[1][index] && datasets[1][index].color) || 'blue',
    colorC: (datasets[2] && datasets[2][index] && datasets[2][index].color) || 'yellow'
  }));
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

    // assign colors in a round‐robin
    const colorPalette = [
      '#4A90E2','#7ED321','#F5A623','#50E3C2',
      '#B8E986','#9013FE','#FF6B6B','#4ECDC4'
    ];
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
    const { name, cohort, count, color } = item;

    if (!grouped[name]) {
      grouped[name] = { name };
    }

    if (cohort === "c1") {
      grouped[name].valueA = count;
      grouped[name].colorA = '#FCF1CC';
    } else if (cohort === "c2") {
      grouped[name].valueB = count;
      grouped[name].colorB = '#A4E9CB';
    } else if (cohort === "c3") {
      grouped[name].valueC = count;
      grouped[name].colorC = '#A2CCE8';
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
    treatmentOutcome,
    treatmentType
  };
};

// Mock GraphQL response to simulate server return
const mockGraphQLResponse = async () => {
  return {
    data: {
      cohortCharts: [
        {
          property: "treatment_type",
          cohorts: [
            {
              cohort: "c1",
              participantsByGroup: [
                { group: "Chemotherapy", subjects: 30 },
                { group: "Radiation", subjects: 20 },
                { group: "Surgery", subjects: 10 }
              ]
            },
            {
              cohort: "c2",
              participantsByGroup: [
                { group: "Chemotherapy", subjects: 25 },
                { group: "Radiation", subjects: 15 },
                { group: "Surgery", subjects: 20 }
              ]
            },
            {
              cohort: "c3",
              participantsByGroup: [
                { group: "Chemotherapy", subjects: 20 },
                { group: "Radiation", subjects: 25 },
                { group: "Surgery", subjects: 30 }
              ]
            }
          ],
        },
        {
          property: "treatment_outcome",
          cohorts: [
            {
              cohort: "c1",
              participantsByGroup: [
                { group: "Chemotherapy", subjects: 430 },
                { group: "Radiation", subjects: 120 },
                { group: "Surgery", subjects: 120 }
              ]
            },
            {
              cohort: "c2",
              participantsByGroup: [
                { group: "Chemotherapy", subjects: 55 },
                { group: "Radiation", subjects: 16 },
                { group: "Surgery", subjects: 60 }
              ]
            },
            {
              cohort: "c3",
              participantsByGroup: [
                { group: "Chemotherapy", subjects: 20 },
                { group: "Radiation", subjects: 25 },
                { group: "Surgery", subjects: 30 }
              ]
            }
          ]
        }
      
      ],
    }
  };
};
