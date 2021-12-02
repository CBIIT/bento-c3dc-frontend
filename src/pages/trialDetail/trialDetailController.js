import React from 'react';
import { useQuery } from '@apollo/client';
import CircularProgress from '@material-ui/core/CircularProgress';
import TrialView from './trialDetailView';
import { Typography } from '../../components/Wrappers/Wrappers';
import { GET_TRIAL_DETAIL_DATA_QUERY } from '../../bento/trialDetailData';

const TrialDetailContainer = ({ match }) => {
  debugger; // eslint-disable-line no-debugger
  const { loading, error, data } = useQuery(GET_TRIAL_DETAIL_DATA_QUERY, {
    variables: { trial_id: match.params.id },
  });

  if (loading) return <CircularProgress />;
  if (error || !data || data.trialDetail.trial_id !== match.params.id) {
    return (
      <Typography variant="headline" color="error" size="sm">
        {error ? `An error has occurred in loading stats component: ${error}` : 'Recieved wrong data'}
      </Typography>
    );
  }
  return <TrialView data={data} />;
};

export default TrialDetailContainer;
