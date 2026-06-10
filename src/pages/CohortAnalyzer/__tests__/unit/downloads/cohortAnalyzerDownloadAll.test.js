jest.mock('html-to-image', () => ({}));
jest.mock('jspdf', () => ({
  jsPDF: jest.fn().mockImplementation(() => ({
    addImage: jest.fn(),
    save: jest.fn(),
  })),
}));

import {
  CHART_EXPORT_PADDING_PX,
  CHART_EXPORT_EXCLUDE_ATTR,
  buildRawCohortChartTabularRows,
  formatRowsAsTsv,
  formatRowsAsCsv,
  downloadTextFile,
  shouldIncludeNodeInChartExport,
} from '../../../downloads/cohortAnalyzerDownloadAll';

describe('cohortAnalyzerDownloadAll', () => {
  it('exports chart padding constant', () => {
    expect(CHART_EXPORT_PADDING_PX).toBe(50);
  });

  it('exports chart exclude attribute constant', () => {
    expect(CHART_EXPORT_EXCLUDE_ATTR).toBe('data-chart-export-exclude');
  });

  describe('shouldIncludeNodeInChartExport', () => {
    it('excludes nodes inside chart export exclude markers', () => {
      const root = document.createElement('div');
      const excluded = document.createElement('button');
      excluded.setAttribute(CHART_EXPORT_EXCLUDE_ATTR, 'true');
      const label = document.createElement('span');
      label.textContent = 'ADD CHART';
      excluded.appendChild(label);
      root.appendChild(excluded);

      expect(shouldIncludeNodeInChartExport(root)).toBe(true);
      expect(shouldIncludeNodeInChartExport(excluded)).toBe(false);
      expect(shouldIncludeNodeInChartExport(label)).toBe(false);
    });
  });

  describe('buildRawCohortChartTabularRows', () => {
    it('flattens histogram fetched data into rows', () => {
      const rows = buildRawCohortChartTabularRows({
        histogram: {
          fetchedData: {
            sex_at_birth: [{ name: 'Male', cohort: 'A', count: 3 }],
          },
          viewType: { sexAtBirth: 'count' },
        },
      });
      expect(rows).toHaveLength(1);
      expect(rows[0].chart_property).toBe('sex_at_birth');
      expect(rows[0].group).toBe('Male');
      expect(rows[0].aggregation).toBe('count');
    });

    it('returns empty array when payload has no histogram', () => {
      expect(buildRawCohortChartTabularRows({})).toEqual([]);
    });
  });

  describe('formatRowsAsTsv / formatRowsAsCsv', () => {
    const rows = [
      { a: 'x', b: 'y' },
      { a: 'comma,here', b: 'tab\there' },
    ];

    it('formats TSV with headers', () => {
      const tsv = formatRowsAsTsv(rows);
      expect(tsv.split('\n')[0]).toBe('a\tb');
    });

    it('escapes CSV special characters', () => {
      const csv = formatRowsAsCsv(rows);
      expect(csv).toContain('"comma,here"');
    });

    it('returns empty string for no rows', () => {
      expect(formatRowsAsTsv([])).toBe('');
      expect(formatRowsAsCsv([])).toBe('');
    });
  });

  describe('downloadTextFile', () => {
    afterEach(() => {
      jest.restoreAllMocks();
    });

    it('creates a download link and triggers click', () => {
      const click = jest.fn();
      const anchor = { click, href: '', download: '' };
      const createObjectURL = jest.fn(() => 'blob:mock');
      const revokeObjectURL = jest.fn();
      global.URL.createObjectURL = createObjectURL;
      global.URL.revokeObjectURL = revokeObjectURL;
      jest.spyOn(document, 'createElement').mockReturnValue(anchor);
      jest.spyOn(document.body, 'appendChild').mockImplementation(() => {});
      jest.spyOn(document.body, 'removeChild').mockImplementation(() => {});

      downloadTextFile('hello', 'out.txt', 'text/plain');

      expect(createObjectURL).toHaveBeenCalled();
      expect(click).toHaveBeenCalled();
      expect(revokeObjectURL).toHaveBeenCalledWith('blob:mock');
    });
  });
});
