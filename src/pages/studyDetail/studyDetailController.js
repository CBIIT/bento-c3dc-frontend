import React from 'react';
import {  useQuery } from '@apollo/client';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Typography } from '../../components/Wrappers/Wrappers';
import { GET_STUDY_DETAIL_DATA_QUERY } from '../../bento/studyDetailData';
import StudyDetailView from './studyDetailView';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import env from '../../utils/env';

const studyDetailContainer = () => {
  const {studyId} = useParams();
  const { loading, error, data } = useQuery(GET_STUDY_DETAIL_DATA_QUERY, {
    variables: { "study_id": studyId },
  });

  const [manifestData, setManifestData] = useState({});

  useEffect(() => {
    const fetchManifestData = async () => {
      try {
        const URL = env.REACT_APP_CCDI_MANIFEST_FILES_URL || "https://raw.githubusercontent.com/CBIIT/C3DC-Data-Releases/refs/heads/dev/ccdiManifestURL.json";
        const response = await fetch(URL);
        const jsonData = await response.json();
        setManifestData(jsonData);
      } catch (error) {
        setManifestData({networkError: "Error fetching manifest data."});
        console.error('Error fetching manifest data:', error);
      }
    };

    fetchManifestData();
  }, []);
 
  if (loading) return <CircularProgress />;
  if (error || !data || !data.studyDetails ) {
    return (
      <Typography variant="h5" color="error" size="sm">
        {error ? `An error has occurred in loading stats component: ${error}` : 'Recieved wrong data'}
      </Typography>
    );
  }

  return (
    <StudyDetailView data={data} manifestData={manifestData} />
  );
};

export default studyDetailContainer;