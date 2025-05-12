import { useState, useEffect, useContext, useRef } from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import { CohortStateContext } from "../../components/CohortSelectorState/CohortStateContext";
import { CohortModalContext } from "../inventory/cohortModal/CohortModalContext";
import CohortModalGenerator from "../inventory/cohortModal/cohortModalGenerator";
import { useGlobal } from "../../components/Global/GlobalProvider";
import { onCreateNewCohort } from "../../components/CohortSelectorState/store/action";
import { analyzer_query, responseKeys } from "../../bento/cohortAnalayzerPageData";
import client from "../../utils/graphqlClient";
import {
    addCohortColumn,
    generateQueryVariable,
    triggerNotification,
    getAllIds,
    getIdsFromCohort,
    filterAllParticipantWithDiagnosisName,
    filterAllParticipantWithTreatmentType
} from "./CohortAnalyzerUtil";
import store from "../../store";
import { updateUploadData, updateUploadMetadata } from "@bento-core/local-find";

export const useCohortAnalyzer = () => {
    /* STATE */
    const { state, dispatch } = useContext(CohortStateContext);
    const [selectedCohorts, setSelectedCohorts] = useState([]);
    const [queryVariable, setQueryVariable] = useState({});
    const [rowData, setRowData] = useState([]);
    const [refershInit] = useState(false);
    const [searchValue, setSearchValue] = useState("");
    const [cohortList, setCohortList] = useState(Object.keys(state) || {});
    const [selectedChart, setSelectedChart] = useState([]);
    const [refershSelectedChart, setRefershSelectedChart] = useState(false);
    const [refershTableContent, setRefershTableContent] = useState(false);
    const [selectedCohortSection, setSelectedCohortSections] = useState([]);
    const [sortType, setSortType] = useState("alphabet");
    const [deleteInfo, setDeleteInfo] = useState({ showDeleteConfirmation: false, deleteType: '', cohortId: '' });
    const [generalInfo, setGeneralInfo] = useState({});
    const [nodeIndex, setNodeIndex] = useState(0);
    const [cohortData, setCohortData] = useState();
    const [showNavigateAwayModal, setShowNavigateAwayModal] = useState(false);
    const { setShowCohortModal, showCohortModal, setCurrentCohortChanges, setWarningMessage, warningMessage } = useContext(CohortModalContext);
    const { CohortModal } = CohortModalGenerator();
    const { Notification } = useGlobal();
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [HoveredCohort, setHoveredCohort] = useState(true);
    const [tooltipOpen, setTooltipOpen] = useState(false);
    const [tooltipOpenExplore, setTooltipOpenExplore] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    let movedToToolTipText = false;
    let movedToToolTipTextExplore = false;

    /* FUNCTIONS */
    const handleUserRedirect = () => {
        // NOTE: If needed to show in only Autocomplete of Localfind.
        // const data = rowData.map(r=>({type: 'participantIds', title: r.participant_id}))
        // store.dispatch(updateAutocompleteData(data));
        // navigate('/explore');

        const upload = rowData.map(r => ({ participant_id: r.participant_id, study_id: r.dbgap_accession }));
        const uploadMetadata = {
            filename: "",
            fileContent: upload.map(p => p.participant_id).join(","),
            matched: upload,
            unmatched: [],
        };

        store.dispatch(updateUploadData(upload));
        store.dispatch(updateUploadMetadata(uploadMetadata));
        navigate('/explore');
    }

    const handleBuildInExplore = () => {
        const hideModal = localStorage.getItem('hideNavigateModal') === 'true';
        if (hideModal) {
            handleUserRedirect(); // skip modal
        } else {
            setShowNavigateAwayModal(true); // show modal
        }
    }

    const handleExportToCCDIHub = () => {
        const participantIds = rowData.map(p => p.participant_id).join("|");
        const dbgapAccessions = [...new Set(rowData.map(p => p.dbgap_accession))].join("|");

        const baseUrl = "https://ccdi.cancer.gov/explore?p_id=";
        const dbgapBase = "&dbgap_accession=";

        const finalUrl = `${baseUrl}${participantIds}${dbgapBase}${dbgapAccessions}`;
        window.open(finalUrl, '_blank');

        return finalUrl;
    }

    const handleHideTooltip = (eventSource) => {
        if (eventSource === "tooltipText") {
            setTooltipOpen(false);
        } else if (eventSource === "questionIcon") {
            setTimeout(() => {
                if (!movedToToolTipText) {
                    setTooltipOpen(false);
                }
            }, 1000);
        }

    }

    const handleHideTooltipExplore = (eventSource) => {
        if (eventSource === "tooltipText") {
            setTooltipOpenExplore(false);
        } else if (eventSource === "questionIcon") {
            setTimeout(() => {
                if (!movedToToolTipTextExplore) {
                    setTooltipOpenExplore(false);
                }
            }, 1000);
        }

    }

    const handleMouseMove = (event, cohortName) => {

        if (cohortName.length > 17) {
            setHoveredCohort(cohortName)
        }
        setMousePosition({ x: event.clientX, y: event.clientY });
    };
    const handleMouseLeave = () => {
        setHoveredCohort("");
    }
    const searchRef = useRef();


    const handleSearchValue = (e) => {
        setSearchValue(e.target.value)


        if (searchRef.current) {
            searchRef.current.value = e.target.value;
            if (searchRef.current.value == "") {

                setTimeout(() => {
                    searchRef.current.focus();
                }, 200);

            }
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

    async function getJoinedCohort(isReset = false) {
        let queryVariables = generateQueryVariable(selectedCohorts, state);
        if (Object.keys(generalInfo).length > 0) {
            queryVariables = { "participant_pk": isReset ? getIdsFromCohort(state, selectedCohorts) : getAllIds(generalInfo), first: 10000 };
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
            if (location && location.state && location.state.cohort && location.state.cohort.cohortId) {

            } else {
                setRowData([]);
            }

        }
    }

    async function getJoinedCohortByD(selectedCohortSection = null) {
        let queryVariables = generateQueryVariable(selectedCohorts, state);
        if (Object.keys(generalInfo).length > 0) {
            queryVariables = { "participant_pk": getIdsFromCohort(state, selectedCohorts), first: 10000 };
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
            queryVariables = { "participant_pk": getIdsFromCohort(state, selectedCohorts), first: 10000 };
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

    function shortenText(text, maxSize = 17) {
        return text.length > maxSize ? text.slice(0, maxSize) + "..." : text;
    }

    const handleCheckbox = (cohort, self) => {
        if (selectedCohorts.includes(cohort)) {
            let finalCohortList = [];
            selectedCohorts.forEach((cohortItem) => {
                if (cohort !== cohortItem) {
                    finalCohortList.push(cohortItem);
                }
            })
            setSelectedCohorts(finalCohortList)
        } else {
            if (selectedCohorts.length === 3) {
                self.preventDefault();
            } else {
                setSelectedCohorts([...selectedCohorts, cohort])
            }
        }

    }

    const handleClick = () => {
        if (selectedCohortSection.length > 0 && rowData.length > 0) {

            setCurrentCohortChanges(null);
            dispatch(onCreateNewCohort(
                "",
                "",
                rowData,
                (count) => {
                    triggerNotification(count, Notification);
                    setShowCohortModal(true);
                },
                (error) => {
                    setWarningMessage(error.toString().replace("Error:", ""));
                }
            ));
        }
    };

    const getTableMessage = (cohortList, selectedCohortSection, tableConfig) => {
        if (cohortList.length === 0) {
            return { noMatch: 'To proceed, please create your cohort by visiting the Explore Page.' };
        }
        if (selectedCohortSection.length === 0) {
            return tableConfig.tableMsg;
        }
        return { noMatch: "No data available for the selected segment/segments. Please try a different segment/segments." };
    };


    /* LIFECYCLE */
    useEffect(() => {
        if (location) {
            const viewCohort = location && location.state ? location.state.cohort : null;
            if (viewCohort) {
                handleCheckbox(viewCohort.cohortId, null);
            }
        }

    }, [location]);

    useEffect(() => {
        setSearchValue("");
        if (searchRef.current) {
            searchRef.current.value = "";
        }

    }, [selectedChart])

    useEffect(() => {


        if (selectedChart.length >= 0) {

            if (nodeIndex === 0) {
                getJoinedCohort();
            } else if (nodeIndex === 1) {
                getJoinedCohortByD(generalInfo);
            } else if (nodeIndex === 2) {
                getJoinedCohortByT(generalInfo)
            }
        }


        if (nodeIndex === 0 || nodeIndex === 1 || nodeIndex === 2) {
            let finalVennSelection = [];
            selectedCohortSection.forEach((section) => {
                if (section.split(" ∩ ").length > 1) {
                    let validCohorts = [];
                    section.split(" ∩ ").forEach((sec, index) => {
                        const regex = /(.*?)(?= \(\d+\))/;
                        const match = sec.match(regex);
                        if (selectedCohorts.includes(match[1])) {
                            validCohorts.push(sec);
                        }
                    })

                    if (validCohorts.length > 0) {
                        finalVennSelection.push(validCohorts.join(" ∩ "))
                    }
                } else {
                    const regex = /(.*?)(?= \(\d+\))/;
                    const match = section.match(regex);
                    if (match) {
                        if (selectedCohorts.includes(match[1])) {
                            finalVennSelection.push(section)
                        }
                    }

                }

            })
            setSelectedCohortSections(finalVennSelection);

        }


        if (selectedCohorts.length === 0) {
            setGeneralInfo({});
            if (location && location.state && location.state.cohort && location.state.cohort.cohortId) {

            } else {
                setRowData([]);
            }

        }
    }, [selectedCohorts, selectedChart]);



    useEffect(() => {

        if (nodeIndex === 0) {
            getJoinedCohort();
        } else if (nodeIndex === 1) {
            getJoinedCohortByD(generalInfo);
        } else if (nodeIndex === 2) {
            getJoinedCohortByT(generalInfo)
        }
    }, [searchValue])

    useEffect(() => {
        if (nodeIndex === 0) {
            getJoinedCohort();
        } else if (nodeIndex === 1) {

            getJoinedCohortByD(generalInfo);
        } else if (nodeIndex === 2) {
            getJoinedCohortByT(generalInfo)
        }

    }, [generalInfo])

    useEffect(() => {

        setSelectedCohortSections([]);
        setGeneralInfo({})
        setSearchValue("");
        if (searchRef.current) {
            searchRef.current.value = "";
        }
        if (nodeIndex === 0) {
            getJoinedCohort(true);
        } else if (nodeIndex === 1) {

            getJoinedCohortByD({});
        } else if (nodeIndex === 2) {
            getJoinedCohortByT({})
        }

    }, [nodeIndex])

    useEffect(() => {
        setRefershTableContent(false)
        setTimeout(() => setRefershTableContent(true), 0)
    }, [cohortList, nodeIndex, cohortData])

    return {
        nodeIndex, setNodeIndex, handleSearchValue,
        searchValue, searchRef, getTableMessage, cohortList,
        selectedCohortSection, showNavigateAwayModal, setShowNavigateAwayModal, handleUserRedirect, state,
        selectedCohorts, deleteInfo, setDeleteInfo, setCohortList, setSelectedCohorts, dispatch,
        setGeneralInfo, setRowData, rowData, warningMessage, setWarningMessage, CohortModal,
        showCohortModal, setShowCohortModal, sortType, setSortType, handleMouseMove, handleCheckbox, handleMouseLeave,
        refershTableContent, cohortData, setSelectedChart, setRefershSelectedChart, refershSelectedChart,
        setSelectedCohortSections, handleClick, queryVariable, handleBuildInExplore, tooltipOpen, movedToToolTipText,
        setTooltipOpen, handleHideTooltip, handleExportToCCDIHub, tooltipOpenExplore, movedToToolTipTextExplore,
        setTooltipOpenExplore, handleHideTooltipExplore, refershInit
    }
};