import { cellTypes } from "@bento-core/table";
import {
  GET_COHORT_MANIFEST_QUERY,
  GET_PARTICIPANTS_OVERVIEW_QUERY,
  GET_DIAGNOSIS_OVERVIEW_QUERY,
  GET_TREATMENT_OVERVIEW_QUERY
} from "./dashboardTabData";

export const tableConfig = {
  name: 'Participants',
  dataField: 'dataParticipant',
  api: GET_COHORT_MANIFEST_QUERY,
  paginationAPIField: 'cohortManifest',
  count: 'numberOfParticipants',
  fileCount: 'participantsFileCount',
  dataKey: 'participant_id',
  hiddenDataKeys: ['participant_id', 'participant_pk', 'dbgap_accession'],
  defaultSortField: 'participant_id',
  defaultSortDirection: 'asc',
  toolTipText: 'Count of Participant Record',
  buttonText: 'Add Selected Files',
  tableID: 'participant_tab_table',
  hasToolTip: true,
  extendedViewConfig: {
    pagination: true,
  },
  columns: [
    {
      dataField: 'participant_id',
      header: 'Participant ID',
      display: true,
      tooltipText: 'sort',
      role: cellTypes.DISPLAY,
    },
    {
      dataField: 'dbgap_accession',
      header: 'dbGaP Accession',
      display: true,
      tooltipText: 'sort',
      role: cellTypes.DISPLAY,
      linkAttr: {
        linkAttr: {
          rootPath: 'https://www.ncbi.nlm.nih.gov/projects/gap/cgi-bin/study.cgi?study_id=',
        },
        cellType: cellTypes.CUSTOM_ELEM,
      },
      doNotDownload: true,
    },
    {
      dataField: 'race',
      header: 'Race',
      display: true,
      tooltipText: 'sort',
      role: cellTypes.DISPLAY,
    },
    {
      dataField: 'sex_at_birth',
      header: 'Sex at Birth',
      display: true,
      tooltipText: 'sort',
      role: cellTypes.DISPLAY,
    },
    {
      dataField: "study_id",
      header: "Study ID",
      display: false,
      tooltipText: "sort",
      role: cellTypes.DISPLAY
    },
    {
      dataField: "cohort",
      header: "Cohorts",
      display: true,
      tooltipText: "This entry is found in the following cohorts",
      role: cellTypes.DISPLAY,
      cellType: cellTypes.CUSTOM_ELEM
    }
  ],
  id: 'participant_tab',
  tableDownloadCSV: {},
  tabIndex: '0',
  downloadFileName: 'C3DC Participants Download',
  tableMsg: {
    noMatch: 'To proceed, please select a cohort from the Cohort List (Left Panel).',
  },
};

export const diagnosesTableConfig =
{
  name: 'Participants',
  dataField: 'dataParticipant',
  api: GET_COHORT_MANIFEST_QUERY,
  paginationAPIField: 'cohortManifest',
  count: 'numberOfParticipants',
  fileCount: 'participantsFileCount',
  dataKey: 'participant_id',
  hiddenDataKeys: ['participant_id', 'participant_pk', 'dbgap_accession'],
  defaultSortField: 'participant_id',
  defaultSortDirection: 'asc',
  toolTipText: 'Count of Participant Record',
  buttonText: 'Add Selected Files',
  tableID: 'participant_tab_table',
  hasToolTip: true,
  extendedViewConfig: {
    pagination: true,
  },
  columns: [
    {
      dataField: 'participant_id',
      header: 'Participant ID',
      display: true,
      tooltipText: 'sort',
      role: cellTypes.DISPLAY
    },
    {
      dataField: 'diagnosis',
      header: 'Diagnosis',
      display: true,
      tooltipText: 'sort',
      role: cellTypes.DISPLAY,
    },
    {
      dataField: 'anatomic_site',
      header: 'Anatomic Sites',
      display: true,
      tooltipText: 'sort',
      role: cellTypes.DISPLAY,
    },
    {
      dataField: 'age_at_diagnosis',
      header: 'Age At Diagnosis',
      display: true,
      tooltipText: 'sort',
      role: cellTypes.DISPLAY,
    },
    {
      dataField: "cohort",
      header: "Cohorts",
      display: true,
      tooltipText: "This entry is found in the following cohorts",
      role: cellTypes.DISPLAY,
      cellType: cellTypes.CUSTOM_ELEM
    }
  ],
  id: 'participant_tab',
  tableDownloadCSV: {},
  tabIndex: '0',
  downloadFileName: 'C3DC Participants Download',
  tableMsg: {
    noMatch: 'To proceed, please select a cohort from the Cohort List (Left Panel).',
  },
}
export const treatmentTableConfig = {
  name: 'Participants',
  dataField: 'dataParticipant',
  api: GET_COHORT_MANIFEST_QUERY,
  paginationAPIField: '',
  count: 'numberOfParticipants',
  fileCount: 'participantsFileCount',
  dataKey: 'participant_id',
  hiddenDataKeys: ['participant_id', 'participant_pk', 'dbgap_accession'],
  defaultSortField: 'participant_id',
  defaultSortDirection: 'asc',
  toolTipText: 'Count of Participant Record',
  buttonText: 'Add Selected Files',
  tableID: 'participant_tab_table',
  hasToolTip: true,
  extendedViewConfig: {
    pagination: true,
  },
  columns: [
    {
      dataField: 'participant_id',
      header: 'Participant ID',
      display: true,
      tooltipText: 'sort',
      role: cellTypes.DISPLAY,
    },
    {
      dataField: 'treatment_type',
      header: 'Treatment Type',
      display: true,
      tooltipText: 'sort',
      role: cellTypes.DISPLAY,
    },
    {
      dataField: 'treatment_agent',
      header: 'Treatment Agent',
      display: true,
      tooltipText: 'sort',
      role: cellTypes.DISPLAY,
    }, {
      dataField: 'treatment_pk',
      header: 'Treatment ID',
      display: true,
      tooltipText: 'sort',
      role: cellTypes.DISPLAY,
    },
    {
      dataField: "cohort",
      header: "Cohorts",
      display: true,
      tooltipText: "This entry is found in the following cohorts",
      role: cellTypes.DISPLAY,
      cellType: cellTypes.CUSTOM_ELEM
    }
  ],
  id: 'participant_tab',
  tableDownloadCSV: {},
  tabIndex: '0',
  downloadFileName: 'C3DC Participants Download',
  tableMsg: {
    noMatch: 'To proceed, please select a cohort from the Cohort List (Left Panel).',
  },
};

export const analyzer_query = [GET_PARTICIPANTS_OVERVIEW_QUERY, GET_DIAGNOSIS_OVERVIEW_QUERY, GET_TREATMENT_OVERVIEW_QUERY];
export const analyzer_tables = [tableConfig, diagnosesTableConfig, treatmentTableConfig];
export const responseKeys = ["participantOverview", "diagnosisOverview", "treatmentOverview"];