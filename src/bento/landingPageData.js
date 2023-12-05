import gql from 'graphql-tag';
// import Test from '../assets/header/CTDC_Logo.svg';

import landingPageHeroImage from '../assets/landing/Landingpage_Image.svg'

// TODO: Mmove it to Data common asstes folder later on.
// Titles
import landingTile1 from '../assets/landing/landingTile1.png'
import landingTile2 from '../assets/landing/landingTile2.png'
import landingTile3 from '../assets/landing/landingTile3.png'
import landingTile4 from '../assets/landing/landingTile4.png'

import landingTileBackground from '../assets/landing/LandingTileBackground.png'

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
    descriptionText: 'C3DC is a database that houses childhood cancer demographics and phenotypic clinical data. These data have been harmonized to a standard set of common data elements (CDEs). C3DC empowers researchers to search for participant-level data to create synthetic cohorts and export data for analysis.',
    callToActionText: 'READ MORE',
    callToActionLink: '/explore', // This links to the "About" static page.
  },
  tile2: {
    alt: '',
    img: landingTile2,
    titleText: 'Data Model',
    descriptionText: 'Navigate the C3DC model to gain understanding and access specific information.',
    callToActionText: 'Explore Data Model',
    callToActionLink: '/programs', // This links to the Programs Listing Page.
  },
  tile3: {
    alt: '',
    img: landingTile3,
    titleText: 'Announcements',
    descriptionText: 'Available: Data from TARGET Neuroblastoma study and MCI',
    callToActionText: 'Learn More',
    callToActionLink: '/resources', // Link to the "Resources" Static Page
  },
  tile4: {
    alt: '',
    img: landingTile4,
    titleText: 'C3DC Data',
    descriptionText: 'Explore C3DC data, construct your cohort, and export it for analysis alongside other data types.',
    callToActionText: 'Explore Data',
    callToActionLink: '/explore', // This links to the cases dashboard.
  },
};

// --------------- GraphQL query - Retrieve Landing page data --------------
export const GET_LANDING_PAGE_DATA_QUERY = gql`{
  numberOfPrograms
  numberOfStudies
  numberOfSubjects
  numberOfSamples
  numberOfFiles
  }
  `;
