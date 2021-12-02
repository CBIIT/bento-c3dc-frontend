import React from 'react';
import { useQuery } from '@apollo/client';
import CircularProgress from '@material-ui/core/CircularProgress';
import View from './programsView';
import { Typography } from '../../components/Wrappers/Wrappers';
import { GET_PROGRAMS_DATA_QUERY } from '../../bento/programsData';

const errorTypoDets = {
  variant: 'headline', color: 'error', size: 'sm', errorAvailable: (error) => `An Error has occured in loading stats component: ${error}`, defaultMsg: 'Received wrong data.',
};

function container() {
  const { loading, error, data } = useQuery(GET_PROGRAMS_DATA_QUERY);
  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return (
      <Typography
        variant={errorTypoDets.variant}
        color={errorTypoDets.color}
        size={errorTypoDets.size}
      >
        {error ? errorTypoDets.errorAvailable(error) : errorTypoDets.defaultMsg}
      </Typography>
    );
  }
  return <View data={data} />;
}

export default container;
