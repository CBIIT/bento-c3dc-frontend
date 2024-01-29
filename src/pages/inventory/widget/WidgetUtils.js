import { v4 as uuid } from 'uuid';

const COLORS_LEVEL_1 = [
  '#D4D4D4',
  '#057EBD',
  '#0C3151',
  '#F78F49',
  '#79287C',
  '#7CC242',
  '#61479D',
];

const COLORS_LEVEL_2 = [
  '#F78F49',
  '#79287C',
  '#7CC242',
  '#61479D',
  '#D4D4D4',
  '#057EBD',
  '#0C3151',
];

const removeEmptySubjectsFromDonutData = (data) => data.filter((item) => item.subjects !== 0);


// eslint-disable-next-line no-unused-vars
const transformInitialDataForSunburst = (data, level1 = 'program', level2 = 'arm', level1Children = 'children', level1Colors = COLORS_LEVEL_1, level2Colors = COLORS_LEVEL_2) => {
  const output = {};
  output.key = uuid();
  output.title = 'root';
  output.color = level1Colors[parseInt(1, 10)];
  output.children = data.map((level1Child, index) => ({
    title: level1Child[level1],
    color: level1Colors[parseInt(index, 10)],
    caseSize: level1Child.caseSize,
    children: level1Child[level1Children].map((level2Child, index2) => ({
      title: `${level1Child[level1]} : ${level2Child[level2]}`,
      color: level2Colors[parseInt(index2, 10)],
      caseSize: level2Child.caseSize,
      size: level2Child.caseSize,
    })),
  }));
  return output;
}

export function formatWidgetData(data, custodianConfig) {
  const formatted = custodianConfig.reduce((acc, widget) => {
    const {
      type, dataName, datatable_level1_field, datatable_level2_field,
      datatable_level1_colors, datatable_level2_colors,
    } = widget;
   
    const dataset = type === 'sunburst'
      ? transformInitialDataForSunburst(data[dataName], datatable_level1_field, datatable_level2_field, 'children', datatable_level1_colors, datatable_level2_colors)
      : removeEmptySubjectsFromDonutData(data[dataName]);
      
    return { ...acc, [dataName]: dataset };
  }, {});

  return formatted;
}
