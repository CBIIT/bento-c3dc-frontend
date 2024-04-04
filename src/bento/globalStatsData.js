import gql from 'graphql-tag';
import studiesLogo from '../assets/stats/Studies_Logo.svg';
import participantsLogo from '../assets/stats/Participants_Logo.svg';
import diagnosisLogo from '../assets/stats/Diagnosis_Logo.svg';


export const statsStyling = {
  global: {
    horizontalStyle: false,
    statTitleFirst: false,
    height: '56px',
    background: '#A7DBD6',
    top: '0',
    position: 'relative',
  },
  statsGroup: {
    margin: '6px 9.25px',
    padding: '0.1% 6% 2% 6%',
    borderRight: '1px solid #0B3556',
    '&:first-child': {
      padding: '0.1% 3% 2% 6%',
    },
    '&:last-child': {
      padding: '0.1% 6% 2% 6%',
    },
  },
  statsIcon: {
    width: '40px',
    height: '45px',
    margin: '7px 0px 0px -45px',
    position: 'relative',
  },
  statCount: {
    color: '#003D3D',
    fontFamily: 'Poppins',
    fontSize: '22px',
    fontWeight: '275',
    lineHeight: '17px',
    letterSpacing: '0.02em',
    margin: '4px 0 2px 13px',
  },
  statTitle: {
    color: '#000000',
    fontFamily: 'Poppins',
    fontSize: '11px',
    fontWeight: '500',
    lineHeight: '16px',
    textTransform: 'uppercase',
    margin: '0 0 0 13px',
    width: '100%',
  },
};

/**
 * @property {statAPI} numberOfPrograms Used to index a stat value
 */
export const globalStatsData = [
  // A maximum of 6 stats are allowed
  {
    statTitle: 'Diagnoses',
    type: 'field',
    statAPI: 'numberOfDiseases',
    statIconSrc: diagnosisLogo,
    statIconAlt: 'A teddy bear representing Diagnosis'
  },
  {
    statTitle: 'Participants',
    type: 'field',
    statAPI: 'numberOfParticipants',
    statIconSrc: participantsLogo,
    statIconAlt: 'A teddy bear representing participants'
  },
  {
    statTitle: 'Studies',
    type: 'field',
    statAPI: 'numberOfStudies',
    statIconSrc: studiesLogo,
    statIconAlt: 'A teddy bear representing Studies'
  },
];

// --------------- GraphQL query - Retrieve stats details --------------
export const GET_GLOBAL_STATS_DATA_QUERY = gql`
{
  numberOfDiseases,
  numberOfParticipants,
  numberOfReferenceFiles,
  numberOfStudies,
  numberOfSurvivals
  }
  `;
