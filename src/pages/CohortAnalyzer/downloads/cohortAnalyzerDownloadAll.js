import * as htmlToImage from 'html-to-image';
import { jsPDF } from 'jspdf';

/** White margin around captured chart area for PNG/PDF exports. */
export const CHART_EXPORT_PADDING_PX = 50;

/** Elements marked with this attribute are omitted from PNG/PDF chart captures. */
export const CHART_EXPORT_EXCLUDE_ATTR = 'data-chart-export-exclude';

export function shouldIncludeNodeInChartExport(node) {
  if (!(node instanceof Element)) return true;
  return !node.closest(`[${CHART_EXPORT_EXCLUDE_ATTR}]`);
}

function escapeCsvCell(value) {
  const s = String(value == null ? '' : value);
  if (/[",\n\r]/.test(s)) {
    return `"${s.replace(/"/g, '""')}"`;
  }
  return s;
}

/** Map API chart property (e.g. sex_at_birth) to viewType key (e.g. sexAtBirth). */
function apiPropertyToDatasetKey(property) {
  return property
    .split('_')
    .map((word, index) =>
      index === 0 ? word.toLowerCase() : word.charAt(0).toUpperCase() + word.slice(1),
    )
    .join('');
}

/**
 * Rows from cohortCharts / fetchedData (pre-aggregation chart input), not rendered chart values.
 */
export function buildRawCohortChartTabularRows(payload) {
  const hist = payload && payload.histogram ? payload.histogram : {};
  const fetchedData = hist.fetchedData || {};
  const viewType = hist.viewType || {};
  const rows = [];
  Object.keys(fetchedData).forEach((property) => {
    const datasetKey = apiPropertyToDatasetKey(property);
    const vt = viewType[datasetKey] != null ? viewType[datasetKey] : '';
    const list = fetchedData[property];
    if (!Array.isArray(list)) return;
    list.forEach((entry) => {
      rows.push({
        chart_property: property,
        group: entry.name != null ? entry.name : '',
        cohort: entry.cohort != null ? entry.cohort : '',
        subjects: entry.count != null ? entry.count : '',
        aggregation: vt,
      });
    });
  });
  return rows;
}

export function formatRowsAsTsv(rows) {
  if (!rows.length) return '';
  const headers = Object.keys(rows[0]);
  const lines = [
    headers.join('\t'),
    ...rows.map((r) =>
      headers
        .map((h) => String(r[h] == null ? '' : r[h]).replace(/\t/g, ' '))
        .join('\t'),
    ),
  ];
  return lines.join('\n');
}

export function formatRowsAsCsv(rows) {
  if (!rows.length) return '';
  const headers = Object.keys(rows[0]);
  const lines = [
    headers.map(escapeCsvCell).join(','),
    ...rows.map((r) => headers.map((h) => escapeCsvCell(r[h])).join(',')),
  ];
  return lines.join('\n');
}

export function downloadTextFile(content, filename, mimeType) {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export function downloadJsonPayload(payload, filename = 'cohort-analyzer-export.json') {
  const text = JSON.stringify(payload, null, 2);
  downloadTextFile(text, filename, 'application/json;charset=utf-8');
}

/**
 * Surround PNG data URL with uniform white padding (returns new data URL).
 */
function addUniformPaddingToPngDataUrl(dataUrl, paddingPx) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      try {
        const w = img.naturalWidth || img.width;
        const h = img.naturalHeight || img.height;
        const canvas = document.createElement('canvas');
        canvas.width = w + paddingPx * 2;
        canvas.height = h + paddingPx * 2;
        const ctx = canvas.getContext('2d');
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, paddingPx, paddingPx);
        resolve(canvas.toDataURL('image/png'));
      } catch (err) {
        reject(err);
      }
    };
    img.onerror = reject;
    img.src = dataUrl;
  });
}

async function dataUrlToBlob(dataUrl) {
  const res = await fetch(dataUrl);
  return res.blob();
}

export async function downloadChartAreaAsPng(element, filename = 'cohort-analyzer-charts.png') {
  if (!element) {
    window.alert('Chart area is not ready to export.');
    return;
  }
  try {
    const dataUrl = await htmlToImage.toPng(element, {
      pixelRatio: 2,
      cacheBust: true,
      backgroundColor: '#ffffff',
      filter: shouldIncludeNodeInChartExport,
    });
    const padded = await addUniformPaddingToPngDataUrl(dataUrl, CHART_EXPORT_PADDING_PX);
    const blob = await dataUrlToBlob(padded);
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  } catch (e) {
    console.error('PNG export failed', e);
    window.alert('Could not export PNG. If the page is still loading, wait and try again.');
  }
}

export async function downloadChartAreaAsPdf(element, filename = 'cohort-analyzer-charts.pdf') {
  if (!element) {
    window.alert('Chart area is not ready to export.');
    return;
  }
  try {
    const dataUrl = await htmlToImage.toPng(element, {
      pixelRatio: 2,
      cacheBust: true,
      backgroundColor: '#ffffff',
      filter: shouldIncludeNodeInChartExport,
    });
    const paddedDataUrl = await addUniformPaddingToPngDataUrl(dataUrl, CHART_EXPORT_PADDING_PX);
    const img = new Image();
    await new Promise((resolve, reject) => {
      img.onload = resolve;
      img.onerror = reject;
      img.src = paddedDataUrl;
    });
    const iw = img.naturalWidth || img.width;
    const ih = img.naturalHeight || img.height;
    const orientation = iw >= ih ? 'landscape' : 'portrait';
    const pdf = new jsPDF({ orientation, unit: 'pt', format: 'a4' });
    const pageW = pdf.internal.pageSize.getWidth();
    const pageH = pdf.internal.pageSize.getHeight();
    const margin = 24;
    const maxW = pageW - margin * 2;
    const maxH = pageH - margin * 2;
    const ratio = Math.min(maxW / iw, maxH / ih);
    const dw = iw * ratio;
    const dh = ih * ratio;
    const ox = (pageW - dw) / 2;
    const oy = (pageH - dh) / 2;
    pdf.addImage(paddedDataUrl, 'PNG', ox, oy, dw, dh);
    pdf.save(filename);
  } catch (e) {
    console.error('PDF export failed', e);
    window.alert('Could not export PDF. If the page is still loading, wait and try again.');
  }
}
