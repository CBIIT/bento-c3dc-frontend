import React from "react";
import { CohortStateProvider } from "../../components/CohortSelectorState/CohortStateContext";
import { CohortAnalyzer } from "./CohortAnalyzer";
import { CohortAnalyzerProvider } from "./CohortAnalyzerContext";
import { CohortModalProvider } from "../../components/CohortModal/CohortModalContext";

const CohortAnalyzerController = (state) => {
  return (
    <CohortStateProvider>
      <CohortModalProvider>
      <CohortAnalyzerProvider>
        <CohortAnalyzer />
      </CohortAnalyzerProvider>
      </CohortModalProvider>
    </CohortStateProvider>
  )
}
export default CohortAnalyzerController;