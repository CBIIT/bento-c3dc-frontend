import React from 'react';
import { useQuery } from '@apollo/client';
import CircularProgress from '@material-ui/core/CircularProgress';
import StudyView from './studyDetailView';
import { Typography } from '../../components/Wrappers/Wrappers';
import { GET_STUDY_DETAIL_DATA_QUERY } from '../../bento/studyDetailData';

const StudyDetailContainer = ({ match }) => {
  const { loading, error, data } = useQuery(GET_STUDY_DETAIL_DATA_QUERY, {
    variables: { study_id: match.params.id },
  });

  if (loading) return <CircularProgress />;
  if (error || !data || data.studyDetails.study_id !== match.params.id) {
    return (
      <Typography variant="headline" color="error" size="sm">
        {error ? `An error has occurred in loading stats component: ${error}` : 'Received wrong data'}
      </Typography>
    );
  }
  return <StudyView data={data} />;
};

export default StudyDetailContainer;
