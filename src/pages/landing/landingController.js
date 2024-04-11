import React from 'react';
import { useQuery } from '@apollo/client';
import CircularProgress from '@material-ui/core/CircularProgress';
import LandingView from './landingView';
import { Typography } from '../../components/Wrappers/Wrappers';
import { GLOBAL_STATS_BAR_QUERY } from '../../bento/landingPageData';

const landingController = () => {
  const { loading, error, data } = useQuery(GLOBAL_STATS_BAR_QUERY, {
    fetchPolicy: 'no-cache',
  });

  if (loading) return <CircularProgress />;
  if (error) {
    return (
      <Typography variant="h5" color="error" size="sm">
        {error && `An error has occurred in loading stats component: ${error}`}
      </Typography>
    );
  }

  return <LandingView statsData={formatNumbers(data)} />;
};

export default landingController;

function formatNumbers(statCounts) {
  const resultObject = {};

  Object.keys(statCounts).forEach((key) => {
    const value = statCounts[key];

    if (value >= 1000000000) {
      const beforeDecimal = Math.floor(value / 1000000000);
      const afterDecimal = Math.round((value % 1000000000) / 100000000) / 10;
      resultObject[key] = { num: beforeDecimal + afterDecimal, char: 'B' };
    } else if (value >= 1000000) {
      const beforeDecimal = Math.floor(value / 1000000);
      const afterDecimal = Math.round((value % 1000000) / 100000) / 10;
      resultObject[key] = { num: beforeDecimal + afterDecimal, char: 'M' };
    } else if (value >= 1000) {
      const beforeDecimal = Math.floor(value / 1000);
      const afterDecimal = Math.round((value % 1000) / 100) / 10;
      resultObject[key] = { num: beforeDecimal + afterDecimal, char: 'K' };
    } else {
      resultObject[key] = { num: value, char: '' };
    }
  });

  return resultObject;
}