import gql from 'graphql-tag';
// import Test from '../assets/header/CTDC_Logo.svg';

import landingPageHeroImage from '../assets/landing/Landingpage_Image.svg'

// TODO: Mmove it to Data common asstes folder later on.
// Titles
import landingTile1 from '../assets/landing/landingTile1.png'
import landingTile2 from '../assets/landing/landingTile2.png'
import landingTile3 from '../assets/landing/landingTile3.png'

// The ideal image size of landingPageHero 1400x600px
// Tile1 Tile2 Tile3 images 293x349 px
// Tile4 image optimum size 600x 436 px
export const landingPageData = {
  callToActionTitle: 'Access, Analyze, Visualize Data Sets within the C3DC Community',
  callToActionDescription: 'Get to know C3DC by selecting available Information below',
  callToActionButtonText: 'EXPLORE THE SITE',
  callToActionLink: '/explore',
  landingPageHero: {
    alt: 'Alt tag1',
    img: landingPageHeroImage,
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
  tile1: {
    alt: '',
    img: landingTile1,
    titleText: 'About the Childhood Cancer Clinical Data Commons',
    descriptionText: 'Effective data management is key to scientific discovery. Bento is an open source framework, developed by the Frederick National Laboratory for Cancer Research, to support the creation of data sharing platforms, that adhere to the FAIR principles of scientific data management.',
    callToActionText: 'Explore',
    callToActionLink: '/explore', // This links to the "About" static page.
  },
  tile2: {
    alt: '',
    img: landingTile2,
    titleText: 'Data Model',
    descriptionText: 'Navigate the C3DC Data Model.',
    callToActionText: 'Go to Data Model',
    callToActionLink: '/programs', // This links to the Programs Listing Page.
  },
  tile3: {
    alt: '',
    img: landingTile3,
    titleText: 'Submit Data',
    descriptionText: 'Submitters should start by contacting the C3DC helpdesk@mail.nih.gov',
    callToActionText: 'Start the process',
    callToActionLink: '/resources', // Link to the "Resources" Static Page
  },
  tile4: {
    alt: '',
    img: 'https://raw.githubusercontent.com/CBIIT/datacommons-assets/main/bento/images/icons/png/landing_tileCases.png',
    titleText: 'C3DC Data',
    descriptionText: 'Search C3DC cases and export data from C3DC cohorts. The data files from these cohorts can then be analyzed in an NCI Cloud Resource.',
    callToActionText: 'Learn More',
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
