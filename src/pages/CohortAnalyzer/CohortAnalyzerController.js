import React, { useState } from "react";
import { CohortStateProvider } from "../../components/CohortSelectorState/CohortStateContext";
import { CohortAnalyzer } from "./CohortAnalyzer";
import { CohortModalContext } from "../inventory/cohortModal/CohortModalContext";

const CohortAnalyzerController = (state) => {
  const [showCohortModal, setShowCohortModal] = useState(false);
  const [warningMessage, setWarningMessage] = useState("");
  const [currentCohortChanges, setCurrentCohortChanges] = useState(null);

  return (
    <CohortModalContext.Provider value={{ showCohortModal, setShowCohortModal, warningMessage, setWarningMessage, currentCohortChanges, setCurrentCohortChanges }}>
     
    <CohortStateProvider>
      <CohortAnalyzer />
    </CohortStateProvider>
    </CohortModalContext.Provider>

  )
}
export default CohortAnalyzerController;