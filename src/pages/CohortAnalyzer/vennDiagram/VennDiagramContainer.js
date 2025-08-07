import React from 'react';
import CohortAnalyzerHeader from '../components/CohortAnalyzerHeader';
import ChartVenn from './ChartVenn';
import placeHolder from '../../../assets/vennDigram/placeHolder.png';
import { useCohortAnalyzer } from '../CohortAnalyzerContext';

const VennDiagramContainer = ({
    classes,
    state,
    containerRef,
    canvasRef,
}) => {

    const {
        refershTableContent,
        selectedCohorts,
        nodeIndex,
        cohortData,
        setSelectedChart,
        refershSelectedChart,
        setRefershSelectedChart,
        setSelectedCohortSections,
        selectedCohortSection,
        setGeneralInfo,
        setNodeIndex,
        handleDownload,
    } = useCohortAnalyzer();

    return (
        <div className={classes.chartContainer}>
            <CohortAnalyzerHeader
                selectedCohorts={selectedCohorts}
                nodeIndex={nodeIndex}
                setNodeIndex={setNodeIndex}
                handleDownload={handleDownload}
                classes={classes}
            />

            {refershTableContent && selectedCohorts.length > 0 &&
                <ChartVenn
                    intersection={nodeIndex}
                    cohortData={cohortData ? (selectedCohorts.map(cohortId => cohortData[cohortId])) : (selectedCohorts.map(cohortId => state[cohortId]))}
                    setSelectedChart={(data) => { setSelectedChart(data); setRefershSelectedChart(!refershSelectedChart) }}
                    setSelectedCohortSections={(data) => {
                        setSelectedCohortSections(data);
                    }}
                    selectedCohortSection={selectedCohortSection}
                    selectedCohort={selectedCohorts}
                    setGeneralInfo={setGeneralInfo}
                    containerRef={containerRef}
                    canvasRef={canvasRef}
                />}

            {selectedCohorts.length === 0 &&
                <img src={placeHolder} alt='placeholder' width={725} style={{ marginTop: 10, alignSelf: 'center' }} />
            }
        </div>
    )
}

export default VennDiagramContainer;