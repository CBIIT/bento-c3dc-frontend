import React from 'react';
import { connect } from 'react-redux';
import { CohortProvider } from '../../components/CohortSelector/CohortContext';
import CohortManager from './CohortManager';

const CohortManagerController = ((props) => {
  return (
    <CohortProvider>
        <CohortManager {...props} />
    </CohortProvider>
  );
});

const mapStateToProps = (state) => ({
  filterState: state.statusReducer.filterState,
  localFindUpload: state.localFind.upload,
  localFindAutocomplete: state.localFind.autocomplete,
});

export default connect(mapStateToProps, null)(CohortManagerController);