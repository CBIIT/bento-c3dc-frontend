export const resourceIntroduction = {
  title: 'A Growing Resource Network',
  text: 'Welcome to the C3DC Resources page, your gateway to essential tools, repositories, and platforms! Here, we have curated a selection of key resources to support your work in data modeling, harmonization, and analysis.',
};

export const availableResources = [
  {
    id: 'datamodel',
    urlInTitle: false,
    title: 'C3DC Data Model',
    text: 'The C3DC model is a conceptual and structural representation of the harmonized data from CCDI and other studies. Developed in collaboration with the PCDC at the University of Chicago, the C3DC data model will initially focus on a limited set of data elements to establish processes for data ingestion, harmonization and storage.',
    url: 'https://github.com/CBIIT/c3dc-model',
  },
  {
    id: 'GHR',
    urlInTitle: false,
    title: 'GitHub Harmonization Repository',
    text: 'The GitHub hosted, open source, repository where the harmonization scripts, translation files and other resources are located.',
    url: 'https://github.com/chicagopcdc/c3dc_etl',
  },
  {
    id: 'CCDI',
    urlInTitle: false,
    title: 'CCDI Hub',
    text: 'The Childhood Cancer Data Initiative (CCDI) Hub is an entry point for researchers, data scientists, and citizen scientists looking to use and connect with CCDI-related data. It provides information about available tools and applications that support the CCDI vision, along with descriptions of resources, each of which targets specific aspects of childhood cancer research.',
    url: 'https://ccdi.cancer.gov/',
  },
  {
    id: 'GDC',
    urlInTitle: false,
    title: 'GDC',
    text: 'The GDC Data Portal is a robust data-driven platform that allows cancer researchers and bioinformaticians to search and download cancer data for analysis.',
    url: 'https://portal.gdc.cancer.gov/',
  },
  {
    id: 'caDSR',
    urlInTitle: false,
    title: 'caDSR',
    text: 'The Cancer Data Standards Repository is one of the largest CDE registries developed by the National Cancer Institute (NCI) and contains over <b>76,600 CDEs</b> covering many aspects of cancer research. Access it here: <a href= "https://cadsr.cancer.gov/onedata/Home.jsp" class="resourceLink">https://cadsr.cancer.gov/onedata/Home.jsp</a>. There are over 490 pediatric CDEs used by various entities like CCDI Data Ecosystem and Pediatric Clinical Data commons. The <b>Pediatric Cancer Core Common Data Elements</b> (CDEs) were created to standardize data collection and sharing for pediatric cancer research. To explore these standards, visit the caDSR homepage and select "Pediatric Cancer Core CDEs" under the Favorites column for a custom report of key CDEs. For feedback or suggestions, email the <a href= "mailto: ncichildhoodcancerdatainitiative@mail.nih.gov">CCDI mailbox.</a>',
  },
];