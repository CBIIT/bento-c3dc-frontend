import { transformInitialDataForSunburst } from '@bento-core/util';
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

/**
 * Removes empty subjects from donut data.
 *
 * @param {object} data
 * @returns {object} filtered data
 */
const removeEmptySubjectsFromDonutData = (data) => data.filter((item) => item.subjects !== 0);




export function formatWidgetData(data, custodianConfig) {
  const formatted = custodianConfig.reduce((acc, widget) => {
    const {
      type, dataName, title, sliceTitle
    } = widget;
    console.log("alertD "+ JSON.stringify(data));
    const dataset = type === 'sunburst'
      ? transformInitialDataForSunburst(data[dataName], title, sliceTitle, 'children', COLORS_LEVEL_1, COLORS_LEVEL_2)
      : removeEmptySubjectsFromDonutData(data[dataName]);

    return { ...acc, [dataName]: dataset };
  }, {});

  return formatted;
}
