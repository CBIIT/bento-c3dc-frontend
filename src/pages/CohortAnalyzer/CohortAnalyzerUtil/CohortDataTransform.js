import client from '../../../utils/graphqlClient';
import { analyzer_query, responseKeys } from '../../../bento/cohortAnalayzerPageData';
import { generateQueryVariable, getIdsFromCohort, getAllIds, filterAllParticipantWithDiagnosisName, filterAllParticipantWithTreatmentType, addCohortColumn } from './CohortAnalyzerUtil';

const getJoinedCohortData = async ({
    nodeIndex,
    selectedCohorts,
    state,
    generalInfo = {},
    searchValue = "",
    setQueryVariable,
    setRowData,
    location,
    setCohortData
}) => {
    const DEFAULT_QUERY_LIMIT = 10000;
    function transformData(data, type) {
        if (type === "treatment") {
            return data.map(({ participant, id, ...rest }) => ({
                participant_pk: participant.id,
                participant_id: participant.participant_id,
                treatment_pk: id,
                ...rest,
            }));
        } else if (type === "diagnosis") {
            return data.map(({ participant, id, ...rest }) => ({
                participant_pk: participant.id,
                participant_id: participant.participant_id,
                diagnosis_pk: id,
                ...rest,
            }));
        } else {
            return data.map(({ id, participant_id, ...rest }) => ({
                participant_pk: id,
                participant_id: participant_id,
                id: id,
                ...rest,
            }));
        }

    }

    function updatedCohortContent(newParticipantsData) {
        const newState = { ...state };
        selectedCohorts.forEach(cohortId => {
            const existingParticipants = newState[cohortId].participants || [];

            const updatedParticipants = existingParticipants.map(participant => {
                const matchingNewParticipant = newParticipantsData.find(
                    newParticipant => newParticipant.participant_pk === participant.participant_pk
                );

                if (matchingNewParticipant) {
                    return {
                        ...participant, ...matchingNewParticipant

                    };
                }

                return participant;
            })
            newState[cohortId] = {
                ...newState[cohortId],
                participants: updatedParticipants,
            };

        });
        setCohortData(newState);
    }

    function updatedCohortContentAllowDuplication(newParticipantsData) {
        const newState = { ...state };
        selectedCohorts.forEach(cohortId => {
            const existingParticipants = newState[cohortId].participants || [];


            let finalResponse = [];
            newParticipantsData.forEach((participant) => {
                const matchingExistingParticipants = existingParticipants.find(
                    existingParticipant => existingParticipant.participant_pk === participant.participant_pk
                );

                if (matchingExistingParticipants) {
                    finalResponse.push({
                        ...matchingExistingParticipants, ...participant
                    })
                }

            })

            newState[cohortId] = {
                ...newState[cohortId],
                participants: finalResponse,
            };

        });
        setCohortData(newState);
    }

    async function getJoinedCohort(isReset = false) {
        let queryVariables = generateQueryVariable(selectedCohorts, state);
        if (Object.keys(generalInfo).length > 0) {
            queryVariables = { "participant_pk": isReset ? getIdsFromCohort(state, selectedCohorts) : getAllIds(generalInfo), first: DEFAULT_QUERY_LIMIT };
        }
        setQueryVariable(queryVariables);
        let { data } = await client.query({
            query: analyzer_query[nodeIndex],
            variables: queryVariables,
        });
        data = { [responseKeys[nodeIndex]]: transformData(data[responseKeys[nodeIndex]], "participants") }
        if (queryVariables.participant_pk.length > 0) {
            if (searchValue !== "") {
                let filteredRowData = data[responseKeys[nodeIndex]].filter((a, b) => a.participant_id.includes(searchValue))
                setRowData(addCohortColumn(filteredRowData, state, selectedCohorts));
            } else {
                setRowData(addCohortColumn(data[responseKeys[nodeIndex]], state, selectedCohorts, "participant"));
                updatedCohortContent(data[responseKeys[nodeIndex]])

            }
        } else {
            if (!location || !location.state || !location.state.cohort || !location.state.cohort.cohortId) {
                setRowData([]);
            }

        }
    }

    async function getJoinedCohortByD(selectedCohortSection = null) {
        let queryVariables = generateQueryVariable(selectedCohorts, state);
        if (Object.keys(generalInfo).length > 0) {
            queryVariables = { "participant_pk": getIdsFromCohort(state, selectedCohorts), first: DEFAULT_QUERY_LIMIT };
        }
        setQueryVariable(queryVariables);
        let { data } = await client.query({
            query: analyzer_query[nodeIndex],
            variables: queryVariables,
        });
        data = { [responseKeys[nodeIndex]]: transformData(data[responseKeys[nodeIndex]], "diagnosis") }
        if (queryVariables.participant_pk.length > 0) {
            if (searchValue !== "") {

                let filteredRowData = data[responseKeys[nodeIndex]].filter((a, b) => a.participant_id.includes(searchValue))

                if (JSON.stringify(selectedCohortSection) !== "{}") {
                    filteredRowData = filterAllParticipantWithDiagnosisName(generalInfo, filteredRowData)
                }
                setRowData(addCohortColumn(filteredRowData, state, selectedCohorts));

            } else {


                if (JSON.stringify(selectedCohortSection) !== "{}") {

                    let filterRowData = filterAllParticipantWithDiagnosisName(generalInfo, data[responseKeys[nodeIndex]])
                    setRowData(addCohortColumn(filterRowData, state, selectedCohorts));
                } else {
                    setRowData(addCohortColumn(data[responseKeys[nodeIndex]], state, selectedCohorts));
                    updatedCohortContent(data[responseKeys[nodeIndex]])
                }

            }
        } else {
            if (location && location.state && location.state.cohort && location.state.cohort.cohortId) {

            } else {
                setRowData([]);
            }

        }
    }

    async function getJoinedCohortByT(selectedCohortSection = null) {
        let queryVariables = generateQueryVariable(selectedCohorts, state);
        if (Object.keys(generalInfo).length > 0) {
            queryVariables = { "participant_pk": getIdsFromCohort(state, selectedCohorts), first: DEFAULT_QUERY_LIMIT };
        }
        setQueryVariable(queryVariables);
        let { data } = await client.query({
            query: analyzer_query[nodeIndex],
            variables: queryVariables,
        });
        data = { [responseKeys[nodeIndex]]: transformData(data[responseKeys[nodeIndex]], "treatment") }

        if (queryVariables.participant_pk.length > 0) {
            if (searchValue !== "") {
                let filteredRowData = data[responseKeys[nodeIndex]].filter((a, b) => a.participant_id.includes(searchValue))
                if (JSON.stringify(selectedCohortSection) !== "{}") {
                    filteredRowData = filterAllParticipantWithTreatmentType(generalInfo, filteredRowData)
                }
                setRowData(addCohortColumn(filteredRowData, state, selectedCohorts));
            } else {


                if (JSON.stringify(selectedCohortSection) !== "{}") {

                    let filterRowData = filterAllParticipantWithTreatmentType(generalInfo, data[responseKeys[nodeIndex]])
                    setRowData(addCohortColumn(filterRowData, state, selectedCohorts));
                    //updatedCohortContent(filterRowData)

                } else {
                    setRowData(addCohortColumn(data[responseKeys[nodeIndex]], state, selectedCohorts));
                    updatedCohortContentAllowDuplication(data[responseKeys[nodeIndex]])
                }

            }
        } else {
            if (location && location.state && location.state.cohort && location.state.cohort.cohortId) {

            } else {
                setRowData([]);
            }

        }
    }

    if (nodeIndex === 0) {
        getJoinedCohort();
    } else if (nodeIndex === 1) {

        getJoinedCohortByD(generalInfo);
    } else if (nodeIndex === 2) {
        getJoinedCohortByT(generalInfo)
    }

};

export { getJoinedCohortData };