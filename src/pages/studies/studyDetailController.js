import React from 'react';
import { useQuery } from '@apollo/client';
import CircularProgress from '@material-ui/core/CircularProgress';
import StudyView from './studyDetailView';
import { Typography } from '../../components/Wrappers/Wrappers';
import { GET_STUDY_DETAIL_DATA_QUERY } from '../../bento/studyDetailData';
import StudyDetailView from './studyDetailView';

const StudyDetailContainer = ({ match }) => {
  /*
  const { loading, error, data } = useQuery(GET_STUDY_DETAIL_DATA_QUERY, {
    variables: { program_id: match.params.studyId },
  });

  if (loading) return <CircularProgress />;
  if (error || !data || data.studyDetail.study_id !== match.params.id) 

  if(false){
    return (
      <Typography variant="headline" color="error" size="sm">
        {error ? `An error has occurred in loading stats component: ${error}` : 'Recieved wrong data'}
      </Typography>
    );
  } 

*/
  return <StudyDetailView data={null} />;
};

export default StudyDetailContainer;