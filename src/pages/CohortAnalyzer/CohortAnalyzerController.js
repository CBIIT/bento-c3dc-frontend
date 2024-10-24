import React, { useContext, useState, useEffect } from "react";
import { CohortStateProvider } from "../../components/CohortSelectorState/CohortStateContext";
import { CohortAnalyzer } from "./CohortAnalyzer";

const CohortAnalyzerController = (state) => {

  return (
    <CohortStateProvider>
      <CohortAnalyzer />
    </CohortStateProvider>

  )
}
export default CohortAnalyzerController;