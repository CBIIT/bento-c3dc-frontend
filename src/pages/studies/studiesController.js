import React from 'react';
import { useQuery } from '@apollo/client';
import CircularProgress from '@material-ui/core/CircularProgress';
import View from './studiesView';
import { Typography } from '../../components/Wrappers/Wrappers';
import { GET_STUDIES_DATA_QUERY } from '../../bento/studiesData';

const container = () => {
  //const { loading, error, data } = useQuery(GET_STUDIES_DATA_QUERY);
  //if (loading) return <CircularProgress />;
  //if (error) return <Typography variant="headline" color="error" size="sm">{error ? `An error has occurred in loading stats component: ${error}` : 'Recieved wrong data'}</Typography>;
  let data = {
    studyList: [
      {
        study_code: 'MCI',
        study_name: 'Molecular Characterization Initiative',
        participants_count: 100,
        diagnosis_count: 50,
      },
      {
        study_code: 'Target-NBL',
        study_name: 'Target Neuroblastoma',
        participants_count: 200,
        diagnosis_count: 100,
      },
    ],
  };
  return <View data={data} />;
};

export default container;
