import React from "react";
import { CohortStateProvider } from "../../components/CohortSelectorState/CohortStateContext";
import { CohortAnalyzer } from "./CohortAnalyzer";
import { CohortModalProvider } from "../inventory/CohortModal/CohortModalContext";

const CohortAnalyzerController = (state) => {
  return (
    <CohortStateProvider>
      <CohortModalProvider>
        <CohortAnalyzer />
      </CohortModalProvider>
    </CohortStateProvider>
  )
}
export default CohortAnalyzerController;