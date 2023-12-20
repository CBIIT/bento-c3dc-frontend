import env from '../utils/env';
import instagramIcon from '../assets/footer/Instgram_Logo.svg';
import twitterIcon from '../assets/footer/Twitter_Logo.svg';
import facebookIcon from '../assets/footer/Facebook_Logo.svg';
import youtubeIcon from '../assets/footer/Youtube_Logo.svg';
import linkedInIcon from '../assets/footer/LinkedIn_Logo.svg';
// footerLogoImage ideal image size 310x80 px

export default {
  footerLogoImage: 'https://raw.githubusercontent.com/cbiit/datacommons-assets/main/bento/images/icons/png/footerlogo.png',
  footerLogoAltText: 'Footer Logo',
  footerLogoHyperlink: 'https://www.cancer.gov/',
  footerStaticText: 'NIH … Turning Discovery Into Health®',
  version: env.REACT_APP_FE_VERSION,
  BEversion: env.REACT_APP_BE_VERSION,
  // A maximum of 3 Subsections (link_sections) are allowed
  // A maximum of 4 Subsection Links ('items' under link_sections) are allowed
  // A maximum of 4 Anchor Links (global_footer_links) are allowed
  // Ideal size for icon is 20x20 px
  link_sections: [
    {
      title: 'About',
      items: [
        {
          text: 'About',
          link: '/about',
        },
        {
          text: 'About CCDI',
          link: 'https://www.cancer.gov/research/areas/childhood/childhood-cancer-data-initiative',
        },
        {
          text: 'Contact C3DC',
          link: 'mailto:NCIChildhoodCancerDataInitiative@mail.nih.gov',
        },
      ],
    },
    {
      title: 'Resources',
      items: [
        {
          text: 'C3DC Data Model',
          link: 'https://github.com/CBIIT/c3dc-model',
        },/*
        {
          text: 'GraphQL',
          link: '/',
        },*/
        {
          text: 'Bento',
          link: 'https://cbiit.github.io/bento-docs/master/index.html',
        },
      ],
    },
    {
      title: 'Policies',
      items: [
        {
          text: 'Accessibility',
          link: 'https://www.cancer.gov/policies/accessibility',
        },
        {
          text: 'FOIA',
          link: 'https://www.cancer.gov/policies/foia',
        },
        {
          text: 'Privacy & Security',
          link: 'https://www.cancer.gov/policies/privacy-security',
        },
        {
          text: 'Disclaimer',
          link: 'https://www.cancer.gov/policies/disclaimer',
        },
        {
          text: 'Vulnerability Disclosure',
          link: 'https://www.hhs.gov/vulnerability-disclosure-policy/index.html',
        },
        
      ],
    },
  ],
  followUs_links: [
    {
      description: 'Instagram icon',
      img: instagramIcon,
      link: 'https://www.instagram.com/nationalcancerinstitute/',
    },
    {
      description: 'Twitter icon',
      img: twitterIcon,
      link: 'https://twitter.com/thenci',
    },
    {
      description: 'Facebook icon',
      img: facebookIcon,
      link: 'https://www.facebook.com/cancer.gov',
    },
    {
      description: 'YouTube icon',
      img: youtubeIcon,
      link: 'https://www.youtube.com/NCIgov',
    },
    {
      description: 'LinkedIn icon',
      img: linkedInIcon,
      link: 'https://www.linkedin.com/company/nationalcancerinstitute/',
    }
  ],
  contact_links: [
    {
      text: 'NCIChildhoodCancerDataInitiative@mail.nih.gov',
      link: 'mailto:NCIChildhoodCancerDataInitiative@mail.nih.gov',
    },
  ],
  global_footer_links: [
    {
      text: 'U.S. Department of Health and Human Services',
      link: 'https://www.hhs.gov',
    },
    {
      text: 'National Institutes of Health',
      link: 'https://www.nih.gov',
    },
    {
      text: 'National Cancer Institute',
      link: 'https://www.cancer.gov',
    },
    {
      text: 'USA.gov',
      link: 'https://www.usa.gov',
    },
  ],
};
