import React, { useMemo, useCallback } from 'react';
import { TableView } from '@bento-core/paginated-table';
import { CreateNewCohortButton } from '../CreateNewCohortButton/CreateNewCohortButton';
import DownloadSelectedCohort from '../downloadCohort/DownloadSelectedCohorts';
import { exploreCCDIHubTooltip, exploreDashboardTooltip } from '../CohortAnalyzerConfig';
import linkoutIcon from '../../../assets/landing/Export_Icon_White.svg';
import { useCohortAnalyzer } from '../CohortAnalyzerContext';
import { ButtonWithTooltip } from './ButtonWithTooltip';

const row = { display: 'flex', alignItems: 'center' };
const bar = { display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: 12, marginTop: 10, flexWrap: 'wrap' };


const CohortAnalyzerTableSection = ({ classes, questionIcon, handleClick, handleBuildInExplore, handleExportToCCDIHub, themeConfig, initTblState }) => {
  const { selectedCohortSection, queryVariable, selectedCohorts, rowData, refreshTableContent } = useCohortAnalyzer();


  const hasSel = useMemo(() => selectedCohorts.length > 0, [selectedCohorts]);
  const hasRows = useMemo(() => rowData.length > 0, [rowData]);
  const canBuild = hasSel;
  const canHub = hasSel && hasRows && rowData.length <= 600;


  const onBuild = useCallback(() => canBuild && handleBuildInExplore(), [canBuild, handleBuildInExplore]);
  const onHub = useCallback(() => canHub && handleExportToCCDIHub(), [canHub, handleExportToCCDIHub]);


  return (
    <div className={classes.tableSectionOuterContainer}>
      <div className={classes.cohortCountSection}>
        <div style={bar}>
          <div style={row}>
            <CreateNewCohortButton
              selectedCohortSection={selectedCohortSection}
              classes={classes}
              questionIcon={questionIcon}
              handleClick={handleClick}
            />
          </div>


          <div style={row}>
            <DownloadSelectedCohort queryVariable={queryVariable} isSelected={hasSel && hasRows} />
          </div>


          <ButtonWithTooltip
            className={canBuild ? classes.exploreButton : classes.exploreButtonFaded}
            disabled={!canBuild}
            onClick={onBuild}
            tooltip={exploreDashboardTooltip}
            icon={questionIcon}
          >
            BUILD IN EXPLORE DASHBOARD
          </ButtonWithTooltip>


          <ButtonWithTooltip
            className={canHub ? classes.exploreButton : classes.exploreButtonFaded}
            disabled={!canHub}
            onClick={onHub}
            tooltip={exploreCCDIHubTooltip}
            icon={questionIcon}
          >
            EXPLORE IN CCDI HUB
            <img alt="link out" src={linkoutIcon} height={13} width={13} />
          </ButtonWithTooltip>
        </div>
      </div>

      <div className={classes.rightSideTableContainer}>
        {refreshTableContent && (
          <TableView
            initState={initTblState}
            themeConfig={themeConfig}
            tblRows={rowData}
            queryVariables={queryVariable}
            server={false}
            totalRowCount={rowData.length || 0}
            activeTab="Participant"
          />
        )}
      </div>
    </div>
  );
}

export { CohortAnalyzerTableSection };