import gql from 'graphql-tag';
import studiesLogo from '../assets/stats/Studies_Logo.svg';
import participantsLogo from '../assets/stats/Participants_Logo.svg';
import samplesLogo from '../assets/stats/Samples_Logo.svg';
import fileLogo from '../assets/stats/Files_Logo.svg';

export const statsStyling = {
  global: {
    horizontalStyle: false,
    statTitleFirst: false,
    height: '56px',
    background: '#29B3BC',
    top: '0',
    position: 'relative',
  },
  statsGroup: {
    margin: '6px 9.25px',
    padding: '0.1% 6% 2% 6%',
    borderRight: '1px solid #0B3556',
    '&:first-child': {
      padding: '0.1% 6% 2% 6%',
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
    fontFamily: 'Oswald',
    fontSize: '20px',
    lineHeight: '17px',
    letterSpacing: '0.02em',
    margin: '4px 0 2px 13px',
  },
  statTitle: {
    color: '#062D4F',
    fontFamily: 'Nunito',
    fontSize: '12px',
    fontWeight: '700',
    lineHeight: '16px',
    textTransform: 'uppercase',
    margin: '0 0 0 13px',
  },
};

/**
 * @property {statAPI} numberOfPrograms Used to index a stat value
 */
export const globalStatsData = [
  // A maximum of 6 stats are allowed
  {
    statTitle: 'Studies',
    type: 'field',
    statAPI: 'numberOfStudies',
    statIconSrc: studiesLogo,
    statIconAlt: 'An open notebook representing studies',
  },
  {
    statTitle: 'Participants',
    type: 'field',
    statAPI: 'numberOfParticipants',
    statIconSrc: participantsLogo,
    statIconAlt: 'A teddy bear representing participants'
  },
  {
    statTitle: 'Samples',
    type: 'field',
    statAPI: 'numberOfSamples',
    statIconSrc: samplesLogo,
    statIconAlt: 'A test tube holder with three test tubes in the holder representing samples'
  },
  {
    statTitle: 'Files',
    type: 'field',
    statAPI: 'numberOfFiles',
    statIconSrc: fileLogo,
    statIconAlt: 'An open file drawer representing files'
  },
];

// --------------- GraphQL query - Retrieve stats details --------------
export const GET_GLOBAL_STATS_DATA_QUERY = gql`{
  numberOfFiles
  numberOfParticipants
  numberOfSamples
  numberOfStudies
  }
  `;
