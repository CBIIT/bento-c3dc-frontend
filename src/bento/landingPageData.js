import gql from 'graphql-tag';
// import Test from '../assets/header/CTDC_Logo.svg';
import landingPageHeroImage from '../assets/landing/Landingpage_Image.png'
// TODO: Mmove it to Data common asstes folder later on.
// Titles
import landingTile1 from '../assets/landing/landingTile1.png'
import landingTile2 from '../assets/landing/landingTile2.png'
import landingTile3 from '../assets/landing/landingTile3.png'
import landingTile4 from '../assets/landing/landingTile4.png'
import landingTileBackground from '../assets/landing/LandingTileBackground.png'
import heartlineTracker from '../assets/landing/animation/heartlineTracker.svg'
import heartlineFull from '../assets/landing/animation/heartline_full.svg'
import diagnosesIcon from '../assets/landing/DiagnosesIcon.svg'
import participantsIcon from '../assets/landing/ParticipantsIcon.svg'
import studiesIcon from '../assets/landing/StudiesIcon.svg'
// The ideal image size of landingPageHero 1400x600px
// Tile1 Tile2 Tile3 images 293x349 px
// Tile4 image optimum size 600x 436 px
export const landingPageData = {
  callToActionTitle: 'Access and Visualize\nData Sets within the\nC3DC Community',
  callToActionDescription: 'Get to know C3DC\nby selecting available Information below',
  callToActionButtonText: 'EXPLORE THE SITE',
  callToActionLink: '/explore',
  landingPageHero: {
    alt: 'Alt tag1',
    img: landingPageHeroImage,
  },
  heartbeatAnimation: {
    heartlineFull: heartlineFull,
    tracker: heartlineTracker,
    lineAlt: 'Heartbeat Line Animation',
    trackerAlt: 'Heartbeat Tracker Animation',
  },
  landingPageStatsIcons: {
    diagnosesIcon: diagnosesIcon,
    diagnosesIconAlt: 'Diagnoses Icon',
    participantsIcon: participantsIcon,
    participantsIconAlt: 'Participants Icon',
    studiesIcon: studiesIcon,
    studiesIconAlt: 'Studies Icon',
  },
  landingPageStatsBar: [
    {
      statTitle: 'Programs',
      statAPI: 'numberOfPrograms',
    },
    {
      statTitle: 'Arms',
      statAPI: 'numberOfStudies',
    },
    {
      statTitle: 'Cases',
      statAPI: 'numberOfSubjects',
    },
    {
      statTitle: 'samples',
      statAPI: 'numberOfSamples',
    },
    {
      statTitle: 'files',
      statAPI: 'numberOfFiles',
    },
  ],
  landingTileBackground: {
    img: landingTileBackground,
  },
  tile1: {
    alt: '',
    img: landingTile1,
    titleText: 'About the Childhood Cancer Clinical Data Commons',
    descriptionText: 'The Childhood Cancer Clinical Data Commons (C3DC) is a database that houses childhood cancer demographics and phenotypic clinical data. These data have been harmonized to a standard set of common data elements (CDEs). C3DC empowers researchers to search for participant-level data to create synthetic cohorts and export data for analysis.',
    callToActionText: 'READ MORE',
    callToActionLink: '/about', // This links to the "About" static page.
  },
  tile2: {
    alt: '',
    img: landingTile2,
    titleText: 'Data Model',
    descriptionText: 'Review components to gain a deeper understanding of the specifics of harmonization.',
    callToActionText: 'Explore Data Model',
    callToActionLink: 'https://github.com/CBIIT/c3dc-model', // This links to the Data Model GitHub Page.
  },
  tile3: {
    alt: '',
    img: landingTile3,
    titleText: 'Announcements',
    descriptionText: 'The latest updates for both datasets and the application are now available. Stay current with the latest enhancements and improvements.',
    callToActionText: 'EXPLORE ANNOUNCEMENTS',
    callToActionLink: '/announcements', //Link to the "Announcement" Static Page
  },
  tile4: {
    alt: '',
    img: landingTile4,
    titleText: 'C3DC Data',
    descriptionText: 'Explore and export C3DC data for analysis alongside other data types.',
    callToActionText: 'Explore Data',
    callToActionLink: '/explore', // This links to the explore dashboard.
  },
};
// --------------- GraphQL query - Retrieve Landing page data --------------
export const GLOBAL_STATS_BAR_QUERY = gql`{
  numberOfDiseases,
  numberOfParticipants,
  numberOfStudies,
  numberOfSurvivals
  }
  `;