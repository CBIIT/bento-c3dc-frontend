import React, { createContext, useContext, useState } from "react";
import { CohortStateContext } from "../../components/CohortSelectorState/CohortStateContext";

const CohortAnalyzerContext = createContext();

export const useCohortAnalyzer = () => {
    return useContext(CohortAnalyzerContext);
}

export const CohortAnalyzerProvider = ({ children }) => {
    //cohort modal context
    const { state } = useContext(CohortStateContext);

    // states
    const [deleteInfo, setDeleteInfo] = useState({ showDeleteConfirmation: false, deleteType: '', cohortId: '' });
    const [nodeIndex, setNodeIndex] = useState(0);
    const [cohortList, setCohortList] = useState(Object.keys(state) || {});
    const [selectedCohorts, setSelectedCohorts] = useState([]);



    //event handlers
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

    const contextValue = {
        deleteInfo,
        setDeleteInfo,
        nodeIndex,
        setNodeIndex,
        cohortList,
        setCohortList,
        handleCheckbox,
        selectedCohorts,
        setSelectedCohorts
    };

    return (
        <CohortAnalyzerContext.Provider value={contextValue}>
            {children}
        </CohortAnalyzerContext.Provider>
    );
}