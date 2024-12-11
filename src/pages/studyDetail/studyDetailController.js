import React from 'react';
import {  useQuery } from '@apollo/client';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Typography } from '../../components/Wrappers/Wrappers';
import { GET_STUDY_DETAIL_DATA_QUERY } from '../../bento/studyDetailData';
import StudyDetailView from './studyDetailView';
import { useParams } from 'react-router-dom';

const studyDetailContainer = () => {
  console.log(process.env.PUBLIC_URL);
  const {studyId} = useParams();
  const { loading, error, data } = useQuery(GET_STUDY_DETAIL_DATA_QUERY, {
    variables: { "study_id": studyId },
  });
 
  if (loading) return <CircularProgress />;
  if (error || !data || !data.studyDetails ) {
    return (
      <Typography variant="h5" color="error" size="sm">
        {error ? `An error has occurred in loading stats component: ${error}` : 'Recieved wrong data'}
      </Typography>
    );
  }

  return (
    <StudyDetailView data={data} />
  );
};

export default studyDetailContainer;