import Logo from '../assets/header/Portal_Logo.svg';
import LogoSmall from '../assets/header/Portal_Logo_Small.svg';
import searchbarIcon from '../assets/header/Search_Icon.svg';
import cartLogo from '../assets/header/Cart_Logo.svg';
import usFlagSmall from '../assets/header/us_flag_small.png';

// globalHeaderLogo image 468x100
// globalHeaderImage: image 2200x100
export const headerData = {
  globalHeaderLogo: Logo,
  globalHeaderLogoSmall: LogoSmall,
  globalHeaderLogoLink: '/',
  globalHeaderLogoAltText: 'Portal Logo',
  globalHeaderSearchIcon: searchbarIcon,
  globalHeaderSearchIconAltText: 'search Icon',
};

export const USGovBannerData = {
  logo: usFlagSmall,
};

export const navMobileList = [
  {
      name: 'Home',
      link: '/home',
      className: 'navMobileItem',
  },
  {
    name: 'Explore',
    link: '/explore',
    className: 'navMobileItem',
  },
  // {
  //     name: 'Applications',
  //     link: '',
  //     className: 'navMobileItem clickable',
  // },
  // {
  //     name: 'Other Resources',
  //     link: '',
  //     className: 'navMobileItem clickable',
  // },
  {
    name: 'Studies',
    link: '/studies',
    className: 'navMobileItem',
  },
  {
    name: 'Data Model',
    link: '/data_model',
    className: 'navMobileItem',
},
  // {
  //     name: 'News',
  //     link: '/news',
  //     className: 'navMobileItem',
  // },
 
  {
    name: 'Resources',
    link: '',
    className: 'navMobileItem clickable',
  },
  {
       name: 'About',
       link: '/about',
       className: 'navMobileItem',
  },/*
  {
    name: 'My File',
    link: '/fileCentricCart',
    className: 'cart',
  },*/
];

export const navbarSublists = {
  Applications: [
    {
      name:'Applications',
      link: '',
      className: 'navMobileSubTitle',
    },
    {
      name:'Childhood Cancer Data Catalog',
      link: '/#ccdc',
      className: 'navMobileSubItem',
    },
    {
      name:'Clinical Interpretation of Variants in Cancer',
      link: '/#civic',
      className: 'navMobileSubItem',
    },
    {
      name: 'Molecular Characterization Initiative for Childhood Cancers',
      link: '/#mci',
      className: 'navMobileSubItem',
    },
    {
      name: 'Molecular Targets Platform',
      link: '/#mtp',
      className: 'navMobileSubItem',
    },
    {
      name:'National Childhood Cancer Registry Explorer',
      link: '/#nccr',
      className: 'navMobileSubItem',
    }],
    Resources: 
    [
      {
        name:'Resources',
        link: '/resources',
        className: 'navMobileSubItem',
      },
      {
        name:'C3DC Data Model',
        link: 'https://github.com/CBIIT/c3dc-model',
        className: 'navMobileSubItem',
        externalLink: true,
      }, 
      {
        name:'GitHub Harmonization Repository',
        link: 'https://github.com/chicagopcdc/c3dc_etl',
        className: 'navMobileSubItem',
        externalLink: true,
      },
      {
        name:'The Childhood Cancer Data Initiative (CCDI Hub)',
        link: 'https://ccdi.cancer.gov/',
        className: 'navMobileSubItem',
        externalLink: true,
      }, 
      {
        name:'The GDC Data Portal',
        link: 'https://portal.gdc.cancer.gov/',
        className: 'navMobileSubItem',
        externalLink: true,
      },
      {
        name:'The Cancer Data Standards Repository',
        link: 'https://cadsr.cancer.gov/onedata/Home.jsp',
        className: 'navMobileSubItem',
        externalLink: true,
      },
    ],
};

export const navBarCartData = {
  cartLabel: '',
  cartLink: '/fileCentricCart',
  cartIcon: cartLogo,
  cartIconAlt: 'cart_logo',
  cartLabelType: 'labelUnderCount',
};