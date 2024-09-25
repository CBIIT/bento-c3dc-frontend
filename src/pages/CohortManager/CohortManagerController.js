import React from 'react';
import { connect } from 'react-redux';
import { CohortStateProvider } from '../../components/CohortSelectorState/CohortStateContext';
import CohortManager from './CohortManager';

const CohortManagerController = ((props) => {
  return (
    <CohortStateProvider>
        <CohortManager {...props} />
    </CohortStateProvider>
  );
});

const mapStateToProps = (state) => ({
  filterState: state.statusReducer.filterState,
  localFindUpload: state.localFind.upload,
  localFindAutocomplete: state.localFind.autocomplete,
});

export default connect(mapStateToProps, null)(CohortManagerController);