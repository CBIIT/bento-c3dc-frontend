// Default threshold for font size adjustment in the chart. 
// The value 999 was chosen as a high threshold to ensure font size adjustments are only applied in extreme cases.
export const DEFAULT_FONT_SIZE_THRESHOLD = 999;
export const nodes = ["participant_pk","diagnosis","treatment_type"];


// Utility Functions
export const hexToRgba = (hex, alpha = 1) => {
  const rgb = hex.replace("#", "").match(/.{2}/g).map(x => parseInt(x, 16));
  return `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, ${alpha})`;
};

export const baseColorArray = ["#F9E28B", "#86E2B9", "#5198C8D9"].map(color => hexToRgba(color));