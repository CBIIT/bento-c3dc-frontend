import gql from 'graphql-tag';
// import Test from '../assets/header/CTDC_Logo.svg';

// The ideal image size of landingPageHero 1400x600px
// Tile1 Tile2 Tile3 images 293x349 px
// Tile4 image optimum size 600x 436 px
export const landingPageData = {
  callToActionTitle: 'Prostate Cancer Natual History Study- data portal',
  callToActionDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  callToActionButtonText: 'EXPLORE THE SITE',
  callToActionLink: '/cases',
  landingPageHero: {
    alt: 'Alt tag1',
    img: 'https://raw.githubusercontent.com/CBIIT/datacommons-assets/main/bento/images/icons/png/landing_Hero_Graphic.png',
  },
  landingPageStatsBar: [
    {
      statTitle: 'Programs',
      type: 'field',
      statAPI: 'numberOfTrials',
    },
    {
      statTitle: 'Studies',
      type: 'field',
      statAPI: 'numberOfStudies',
    },
    /* {
      statTitle: 'files',
      type: 'field',
      statAPI: 'numberOfFiles',
    }, */
  ],
  tile1: {
    alt: '',
    img: 'https://raw.githubusercontent.com/CBIIT/datacommons-assets/main/bento/images/icons/png/landing_tileAbout.png',
    titleText: 'The Bento Framework',
    descriptionText: 'Effective data management is key to scientific discovery. Bento is an open source framework, developed by the Frederick National Laboratory for Cancer Research, to support the creation of data sharing platforms, that adhere to the FAIR principles of scientific data management.',
    callToActionText: 'Read More',
    callToActionLink: '/bento', // This links to the "About" static page.
  },
  tile2: {
    alt: '',
    img: 'https://raw.githubusercontent.com/CBIIT/datacommons-assets/main/bento/images/icons/png/landing_tileProgam.png',
    titleText: 'Programs',
    descriptionText: 'Access data from the TAILORx clinical trial, on this data sharing platform, built on Bento.',
    callToActionText: 'View',
    callToActionLink: '/programs', // This links to the Programs Listing Page.
  },
  tile3: {
    alt: '',
    img: 'https://raw.githubusercontent.com/CBIIT/datacommons-assets/main/bento/images/icons/png/landing_tileAnalytics.png',
    titleText: 'Resources',
    descriptionText: 'Use Bento to build your own data sharing platform.',
    callToActionText: 'Read More',
    callToActionLink: '/resources', // Link to the "Resources" Static Page
  },
  tile4: {
    alt: '',
    img: 'https://raw.githubusercontent.com/CBIIT/datacommons-assets/main/bento/images/icons/png/landing_tileCases.png',
    titleText: 'Cases',
    descriptionText: 'Analyze cases from the TAILORx clinical trial.',
    callToActionText: 'Explore',
    callToActionLink: '/cases', // This links to the cases dashboard.
  },
};

// --------------- GraphQL query - Retrieve Landing page data --------------
export const GET_LANDING_PAGE_DATA_QUERY = gql`{
  numOfPrograms
  num_of_studies
#  numberOfFiles
  }
  `;
