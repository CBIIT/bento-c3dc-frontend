export const aboutData = {
  introParagraph:
    "<a className='sectionTitle'>Childhood Cancer Data Initiative</a><br/>" +
    "The <a className='aboutLink' href='https://www.cancer.gov/research/areas/childhood/childhood-cancer-data-initiative' target='_blank' rel='noopener noreferrer'>NCI’s Childhood Cancer Data Initiative (CCDI)</a>, " +
    "which the Childhood Cancer Clinical Data Commons is part of, is an initiative seeking to build a community centered around childhood cancer care and research. " +
    "Through enhanced data sharing, the initiative works to improve understanding of cancer biology, preventive measures, treatment, quality of life, and survivorship, as well as ensure that the community can learn from every child with cancer. " +
    "<a className='aboutLink' href='https://public.govdelivery.com/accounts/USNIHNCI/subscriber/new?topic_id=USNIHNCI_223' target='_blank' rel='noopener noreferrer'>Sign-up for email updates</a> from NCI about CCDI.",
  secondParagraph:
    "<a className='sectionTitle'>Childhood Cancer Clinical Data Commons</a><br/>" +
    "The Childhood Cancer Clinical Data Commons (C3DC) is an open-access web application that serves as the primary source for deidentified, individual-level harmonized data that describes the demographic and phenotypic characteristics of participants. " +
    "This harmonization process uses a standard <a className='aboutLink' href='https://cadsr.cancer.gov/onedata/dmdirect/NIH/NCI/CO/CDEDD?filter=Administered%20Item%20%28Data%20Element%20CO%29.CDEDD%20Classification.P_ITEM_ID_VER=12119072v1' target='_blank' rel='noopener noreferrer'>data dictionary</a> consisting of Common Data Elements (CDEs), C3DC employs a common data model to facilitate cohort analyses and correlative analytics with data in other datatype-specific commons. " +
    "The data model has been deposited in " +
    "<a className='aboutLink' href='https://github.com/CBIIT/c3dc-model' target='_blank' rel='noopener noreferrer'>GitHub</a>.",
  thirdParagraph:
    "The C3DC offers several key features:" +
    "<ul className='itemList'>" +
    "  <li>Allows researchers to search for harmonized participant-level clinical data collected from multiple studies.</li>" +
    "  <li>Facilitates longitudinal data analyses.</li>" +
    "  <li>Enables custom/synthetic cohort creation and data downloading for subsequent local analyses.</li>" +
    "</ul>",
  fourthParagraph:
    "<a className='sectionTitle'>C3DC Studies</a><br/>" +
    "The pilot phase contains harmonized data from:" +
    "<ul className='itemList'>" +
    "  <li>CCDI’s Molecular Characterization Initiative (MCI)</li>" +
    "  <li>TARGET Neuroblastoma</li>" +
    "</ul>" +
    "<a className='listAlightment'> See <a className='aboutLink' href='https://github.com/chicagopcdc/c3dc_etl' target='_blank' rel='noopener noreferrer'>GitHub Repository</a>.</a><br/>" +
    "As the project matures, new pediatric cancer data and additional functionality will be added to the C3DC.",
  fifthParagraph:
    "<a className='sectionTitle'>C3DC Data Model page</a><br/>" +
    "The C3DC harmonized <a className='aboutLink' href='https://github.com/CBIIT/c3dc-model' target='_blank' rel='noopener noreferrer'>data model</a> " +
    "unites multiple childhood cancer studies and drives the search experience. " +
    "Initially, the C3DC database model will focus on a limited set of data elements, such as participant diagnosis, to establish processes for data intake harmonization, data modeling, and storage. " +
    "The C3DC model is developed collaboratively with contributions from Data for the Common Good at University of Chicago, Frederick National Laboratory, and NCI’s Semantics Infrastructure, Cancer Research Data Commons, and National Cancer Childhood Registry team members. " +
    "The resulting model will collectively establish the standard terms for pediatric cancer and will serve as guidance to researchers. ",
  sixthParagraph:
    "NCI encourages researchers to use common data elements (CDEs) to enhance data accuracy, consistency, and interoperability across diverse areas of health research. " +
    "CDEs are pieces of data captured in multiple data sets across different studies. " +
    "The <a className='aboutLink' href='https://cadsr.cancer.gov/onedata/Home.jsp' target='_blank' rel='noopener noreferrer'>Cancer Data Standards Registry and Repository</a> " +
    "(caDSR) is a structured repository for clinical and research data. " +
    "Its content semantically defines data through controlled terms and vocabularies, offering detailed information about data representation, including permissible values, data types (numeric, date, text), and the ability to associate various local or source names with the same data value. " +
    "Moreover, CDEs provide robust metadata, encompassing references to external standards, usage instructions, and examples of expected data formats. " +
    "The C3DC target schema will consist of well-defined classes with attributes and permissible values. ",
  seventhTitle:
    "<a className='sectionTitle'>C3DC Resources</a>",
  seventhParagraph:
    "<a className='sectionTitle'>C3DC Data Model</a><br/>" +
    "The C3DC model is a conceptual and structural representation of the harmonized data from CCDI and other studies. Developed in collaboration with the PCDC at the University of Chicago, the C3DC data model will initially focus on a limited set of data elements to establish processes for data ingestion, harmonization and storage. <br/> " +
    "<a className='aboutLink' href='https://github.com/CBIIT/c3dc-model' target='_blank' rel='noopener noreferrer'>https://github.com/CBIIT/c3dc-model</a>.",
  eigthParagraph:
    "<a className='sectionTitle'>GitHub Harmonization Repository</a><br/>" +
    "The GitHub hosted, open source, repository where the harmonization scripts, translation files and other resources are located. <br/> " +
    "<a className='aboutLink' href='https://github.com/chicagopcdc/c3dc_etl' target='_blank' rel='noopener noreferrer'>https://github.com/chicagopcdc/c3dc_etl</a>.",
  ninthParagraph:
    "<a className='sectionTitle'>CCDI Hub </a> <a className='aboutLink' href='https://ccdi.cancer.gov/' target='_blank' rel='noopener noreferrer'>https://ccdi.cancer.gov/</a><br/>" +
    "The Childhood Cancer Data Initiative (CCDI) Hub is an entry point for researchers, data scientists, and citizen scientists looking to use and connect with CCDI-related data. " +
    "It provides information about available tools and applications that support the CCDI vision, along with descriptions of resources, each of which targets specific aspects of childhood cancer research.",
  tenthParagraph:
    "<a className='sectionTitle'>GDC </a> <a className='aboutLink' href='https://portal.gdc.cancer.gov/' target='_blank' rel='noopener noreferrer'>https://portal.gdc.cancer.gov/</a><br/>" +
    "The GDC Data Portal is a robust data-driven platform that allows cancer researchers and bioinformaticians to search and download cancer data for analysis." ,
  eleventhParagraph:
    "<a className='sectionTitle'>caDSR </a> <a className='aboutLink' href='https://cadsr.cancer.gov/onedata/Home.jsp' target='_blank' rel='noopener noreferrer'>https://cadsr.cancer.gov/onedata/Home.jsp</a><br/>" +
    "The Cancer Data Standards Repository is one of the largest CDE registries developed by the National Cancer Institute (NCI) and contains over 60,000 CDEs covering many aspects of cancer research. " ,
  twelfthParagraph:
    "For more information about the C3DC site, please refer to the "+
    "<a className='aboutLink' href='https://github.com/CBIIT/c3dc-releases' target='_blank' rel='noopener noreferrer'>&lt;Release Notes&gt;</a> " +
    "and the " +
    "<a className='aboutLink' href='https://github.com/CBIIT/c3dc-releases/blob/main/User_Guide.md' target='_blank' rel='noopener noreferrer'>&lt;User Guide&gt;</a>." ,
  lastParagraph:
    "The CCDI welcomes input from the community to enhance usability. " +
    "Please send your feedback and comments to " +
    "<a className='aboutLink' href='mailto:ncichildhoodcancerdatainitiative@mail.nih.gov'>ncichildhoodcancerdatainitiative@mail.nih.gov</a>.",
};