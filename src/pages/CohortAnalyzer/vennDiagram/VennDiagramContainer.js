import React, { useMemo } from 'react';
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
        refreshTableContent,
        selectedCohorts,
        nodeIndex,
        cohortData,
        setSelectedChart,
        refreshSelectedChart,
        setRefreshSelectedChart,
        setSelectedCohortSections,
        selectedCohortSection,
        setGeneralInfo,
        setNodeIndex,
        setAlert
    } = useCohortAnalyzer();

    const mappedCohortData = useMemo(() => {
        if(cohortData && selectedCohorts.length > 0 && state) {
            return cohortData ? (selectedCohorts.map(cohortId => cohortData[cohortId])) : (selectedCohorts.map(cohortId => state[cohortId]));
        }
        return [];
    }, [cohortData, selectedCohorts, state]);

    const handleDownload = () => {
        if (containerRef.current && canvasRef.current) {
            const canvas = canvasRef.current;

            // Create download link
            const link = document.createElement('a');
            link.download = 'venn-diagram.png';
            link.href = canvas.toDataURL('image/png');
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            setAlert({ type: 'success', message: 'Confirmed download of Venn Diagram from the Cohort Analyzer by Participant ID' });
        }
    };

    const handleSetSelectedChart = (data) => { setSelectedChart(data); setRefreshSelectedChart(!refreshSelectedChart) }


    return (
        <div className={classes.chartContainer}>
            <CohortAnalyzerHeader
                selectedCohorts={selectedCohorts}
                nodeIndex={nodeIndex}
                setNodeIndex={setNodeIndex}
                handleDownload={handleDownload}
                classes={classes}
            />

            {refreshTableContent && selectedCohorts.length > 0 &&
                <ChartVenn
                    intersection={nodeIndex}
                    cohortData={mappedCohortData}
                    setSelectedChart={handleSetSelectedChart}
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
                <img src={placeHolder} alt='placeholder' width={1125} style={{ marginTop: 10, alignSelf: 'center' }} />
            }
        </div>
    )
}

export default VennDiagramContainer;