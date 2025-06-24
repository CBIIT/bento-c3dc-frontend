import React, { useState } from 'react';
import styled from 'styled-components';
import {
    Modal, Box, Button, IconButton, withStyles
} from '@material-ui/core';
import styles from './UserGuideButtonStyle';
import userguideIcon from '../../../assets/icons/Explore_User_Guide_Icon.svg';
import userguideIconWhite from '../../../assets/icons/Explore_User_Guide_Icon_White.svg';
import CloseIcon from '@material-ui/icons/Close';
import figure1 from '../../../assets/explore/C3DCFacetLocalFindSearchIcon.svg';
import figure2 from '../../../assets/explore/C3DCFacetLocalFindSearchIcon.svg';
import figure3 from '../../../assets/explore/C3DCFacetLocalFindSearchIcon.svg';
import figure4 from '../../../assets/explore/C3DCFacetLocalFindSearchIcon.svg';
import figure5 from '../../../assets/explore/C3DCFacetLocalFindSearchIcon.svg';
import figure6 from '../../../assets/explore/C3DCFacetLocalFindSearchIcon.svg';
import figure7 from '../../../assets/explore/C3DCFacetLocalFindSearchIcon.svg';
import figure8 from '../../../assets/explore/C3DCFacetLocalFindSearchIcon.svg';
import figure9 from '../../../assets/explore/C3DCFacetLocalFindSearchIcon.svg';
import figure10 from '../../../assets/explore/C3DCFacetLocalFindSearchIcon.svg';
import figure11 from '../../../assets/explore/C3DCFacetLocalFindSearchIcon.svg';
import figure12 from '../../../assets/explore/C3DCFacetLocalFindSearchIcon.svg';
import figure13 from '../../../assets/explore/C3DCFacetLocalFindSearchIcon.svg';
import figure14 from '../../../assets/explore/C3DCFacetLocalFindSearchIcon.svg';
import figureB1 from '../../../assets/explore/C3DCFacetLocalFindSearchIcon.svg';
import figureB2 from '../../../assets/explore/C3DCFacetLocalFindSearchIcon.svg';
import figureB3 from '../../../assets/explore/C3DCFacetLocalFindSearchIcon.svg';

const UseGuideButtonContainer = styled.div`
    .buttonContainer {
        display: flex;
        margin-left: 19px;
        margin-top: 17px;
    }

    .buttonText {
        color: #627B7A;
        font-weight: 400;
        font-size: 14px;
        line-height: 30px;
        margin-left: 8px;
    }
`;

const UseGuideButton = ({classes}) => {
    const [open, setOpen] = useState(false);
    const [isHover, setIsHover] = useState(false);
    const [selectedNavTitle, setSelectedNavTitle] = useState('');
    
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const titleList = [
        'Overview',
        'Finding Participants, Studies, Samples, and Files',
        'Creating and managing cohorts',
        'Downloading Metadata from the Studies tab',
        'Creating an Exportable File Manifest from the Cart',
        'NCI Data Commons Framework Services (DCFS): Controlled Data Access Instructions',
        'Full User Guide',
        'Contact Us',
    ];

    const handleClickEvent = (event) => {
        const id = event.target.getAttribute('name');
        setSelectedNavTitle(id);
        const contentElement = document.getElementById('UserGuideContentSection');
        const element = document.getElementById(id);
        contentElement.scrollTo({ 
            top: element.offsetTop - 40,
            behavior: "smooth" 
        });
    }

    const handleOnClickManifest = () => {
        const contentElement = document.getElementById('UserGuideContentSection');
        const element = document.getElementById('Downloading Metadata from the Studies tab');
        contentElement.scrollTo({ 
            top: element.offsetTop - 40,
            behavior: "smooth" 
        });
    }

    const modalBody = {
        position: 'relative',
        margin: '0 auto',
        marginTop: '6%',
        width: '90%',
        maxWidth: '1279px',
        height: '723px',
        background: '#FFFFFF',
        border: '1px solid #505050',
        borderRadius: '40px',
        overflow: 'hidden',
        outline: 0,
    };

    return (
        <UseGuideButtonContainer>
            <div className='buttonContainer'>
            <Button
                variant="outlined"
                onClick={handleClickOpen}
                className={classes.customButton}
                classes={{ root: classes.clearAllButtonRoot }}
                onMouseEnter={() => setIsHover(true)}
                onMouseLeave={() => setIsHover(false)}
            >
                <img src={isHover?userguideIconWhite: userguideIcon} alt="user guide icon" />
                </Button>
                <div className='buttonText'>Explore the C3DC User Guide</div>
            </div>
            <Modal
                open={open}
                onClose={handleClose}
            >
                <Box style={modalBody}>
                    <IconButton
                        aria-label="close"
                        onClick={handleClose}
                        className={classes.closeButton}
                    >
                        <CloseIcon fontSize="small" />
                    </IconButton>
                    <div className={classes.paperArea}>
                        <div className={classes.navSection}>
                            <div className={classes.navTitle}>USER GUIDE TOPICS</div>
                                {
                                    titleList.map((titleItem, topicid) => {
                                        const topickey = `topic_${topicid}`;
                                        return (
                                            <div name={titleItem} className={selectedNavTitle === titleItem ? classes.navTopicItemSelected : classes.navTopicItem} key={topickey} onClick={handleClickEvent}>{titleItem}</div>
                                        )
                                    })
                                }
                            </div>
                        <div id='UserGuideContentSection' className={classes.contentSection}>
                            <div className={classes.contentList}>
                                <div className={classes.contentTitle}>CCDI Hub Explore Dashboard and Cart</div>
                                <div id='Overview' className={classes.sectionTitle}>
                                    <p>Overview</p>
                                </div>
                                <div className={classes.contentContainer}>
                                    <p>The <a href="/explore">CCDI Hub Explore Dashboard</a> is a tool that allows for the exploration of participant-level, diagnoses, studies, samples, and files information for CCDI-managed data sets. The Explore Dashboard enables researchers to find CCDI data within a single study or across multiple studies and create synthetic cohorts based on filtered search (i.e., demographics, diagnosis, samples, etc.). Upon interaction with these filters (Figure 1A), users can review the open-access information through visual summaries (Figure 1B) and browse the row level data in tabs organized by participants, diagnosis, studies, samples, and files (Figure 1C) to determine which data sets are applicable to their research questions. Users can then add desired files to the cart (Figure 1D), from which they can download a manifest for the selected data or take the manifest directly into the CGC. To access the controlled data, users must request them at the <a className={classes.link} href="https://dbgap.ncbi.nlm.nih.gov/aa/wga.cgi?page=login" target="_blank" rel="noopener noreferrer">controlled-access login page on dbGaP</a>.</p>
                                    <div className={classes.figureContainer}><img src={figure1} style={{width: '40%'}} alt='Figure1'/></div>
                                    <div className={classes.figureText}>Figure 1: CCDI Hub Explore Dashboard and Cart features</div>
                                    <p>Step-by-step instructions for finding and exporting data are included below.</p>
                                </div>
                                <div>
                                    <div id='Finding Participants, Studies, Samples, and Files' className={classes.sectionTitle}>
                                        <p>Finding Participants, Studies, Samples, and Files</p>
                                    </div>
                                    <div className={classes.contentContainer}>
                                        <p>The CCDI Hub Explore Dashboard provides row-level metadata for CCDI study participants and their data objects for review with a filtered search, select visualizations, and an exportable table of results. Here’s how to find and filter information on the Explore Dashboard:</p>
                                        <ol>
                                            <li>
                                                The CCDI Hub is located at <a href="/">ccdi.cancer.gov</a>. From the CCDI Hub Home page, navigate to the Explore Dashboard by clicking “Explore” (Figure 2).
                                                <div className={classes.figureContainer}><img src={figure2} style={{width: '60%'}} alt='Figure2'/></div>
                                                <div className={classes.figureText}>Figure 2: CCDI homepage with red box highlighting the “Explore” menu bar link</div> 
                                            </li>
                                            <li>
                                                On the Explore Dashboard, you can filter row-level data and view them as visualizations (Figure 3). The Explore Dashboard is participant-centric, meaning that filtering criteria and results return de-identified information about a participant and their related studies, collected samples, or created files.
                                                <div className={classes.figureContainer}><img src={figure3} style={{width: '40%'}} alt='Figure3'/></div>
                                                <div className={classes.figureText}>Figure 3: Explore Dashboard page with red boxes highlighting the search filters and results</div> 
                                            </li>
                                            <li>
                                                Search criteria are displayed in the right panel (Figure 4A). Faceted filtering may be done by uploading a list of participant IDs (in “DEMOGRAPHICS” Figure 4B), text searches (“DIAGNOSIS,” “DIAGNOSIS ATOMIC SITE,” and “SAMPLE ANATOMIC SITE” Figure 4C), numerical sliders (“AGE AT DIAGNOSIS” and “AGE AT COLLECTION” Figure 4D), or checkbox selections for the remaining properties. You can apply multiple filtering criteria at the same time in a search. You can view and clear your current selection(s) in the query summary at the top of the widgets (Figure 4E).
                                                <div className={classes.figureContainer}><img src={figure4} style={{width: '90%'}} alt='Figure4'/></div>
                                                <div className={classes.figureText}>Figure 4: Full facet list in Explore Dashboard with highlights of various facet types and query display/clear function</div> 
                                            </li>
                                            <li>Filtering your search will update the Explore Dashboard’s visualizations and the results tables (Figure 5). Each results table will be updated with information on the participants, samples, studies, or files that meet the filtered criteria. Information displayed by default on each table is described below:
                                                <ol className={classes.alphaList}>
                                                    <li>“Participants”: Characteristics of a participant in the Explore Dashboard. Participants belong to a study, and they may have one or more samples, diagnoses, or files associated with them. Participants with mappings through the <a href='/ccdi-participant-index'>CCDI Participant Index (CPI)</a> have a summary of these mappings available from this view.</li>
                                                    <li>“Studies”: Studies that are a part of the Explore Dashboard. Participants, diagnosis, samples, and files all belong to a CCDI study.</li>
                                                    <li>“Samples”: Samples available from participants within the Explore Dashboard. Samples belong to a participant and can be associated with one or more files.</li>
                                                    <li>
                                                        “Files”: Files available from studies, participants, and samples within the Explore Dashboard. Files may belong to a study and may be associated with one or more participants or samples. Files may also be of many types, including sequencing, proteomics, imaging files, etc. DICOM imaging files are currently available for the Genomic Sequencing of Pediatric Rhabdomyosarcoma (phs000720) and Molecular Characterization Initiative (phs002790) studies and can be accessed directly from the <a className={classes.link} href="https://portal.imaging.datacommons.cancer.gov" target="_blank" rel="noopener noreferrer">Imaging Data Commons (IDC) Data Portal</a> and file paths to images are provided in the downloadable study manifest within Hub, described in the following section.
                                                        <div className={classes.figureContainer}><img src={figure5} style={{width: '70%'}} alt='Figure5'/></div>
                                                        <div className={classes.figureText}>Figure 5: Explore Dashboard visualizations and results tables with arrows pointing to the available informational tables</div> 
                                                    </li>
                                                </ol>
                                            </li>
                                            <li>
                                                Visible columns in each table can be customized by clicking the “View columns” button in the upper righthand corner of the table and selecting or deselecting available columns (Figure 6). Note that Participant ID, Sample ID, and Study ID cannot be removed from any table, and File Name cannot be removed from the Files table.
                                                <div className={classes.figureContainer}><img src={figure6} style={{width: '70%'}} alt='Figure6'/></div>
                                                <div className={classes.figureText}>Figure 6: Interface for selecting and deselecting columns in table and downloads</div> 
                                            </li>
                                        </ol>
                                    </div>
                                </div>
                                <div>
                                    <div id='Creating and managing cohorts' className={classes.sectionTitle}>
                                        <p>Creating and managing cohorts</p>
                                    </div>
                                    <div className={classes.contentContainer}>
                                        <p>From the CCDI Hub Explore Dashboard Participant table, or you can group participants into cohorts to find files of interest, or you can add files directly to the cart (read more in next section). To create a cohort:</p>
                                        <ol>
                                            <li>Using the process described above, apply any filters of interest from the lefthand facet menu.</li>
                                            <li>Navigate to the Participants table. On the results tables of the Explore Dashboard, you can select a row of metadata using the checkbox at the start of the row. Multiple rows can be selected within a table, even across pages of the table. Use the checkbox at the top of the checkbox column to select or deselect all rows.</li>
                                            <li>
                                                After selecting desired rows, select the “CREATE COHORT” button to add the selected participants to a cohort (Figure 7). A "View of All Cohorts” pop-up window will open in at least one participant row is selected.
                                                <div className={classes.figureContainer}><img src={figure7} style={{width: '70%'}} alt='Figure7'/></div>
                                                <div className={classes.figureText}>Figure 7: Cohort creation and management</div> 
                                            </li>
                                            <li>From the "View of All Cohorts" window, you can view and delete all cohorts and see details about a selected cohort, which will be your newly created cohort, by default (Figure 8).</li>
                                            <li>In the selected cohort view, you can view current cohort attributes as well as change the name, add a description, search by participant ID, delete participants from the list (Figure 8).</li>
                                            <li>
                                                Click the “DOWNLOAD SELECTED COHORT” button to download a manifest json or csv file for the selected cohort (Figure 8).
                                                <div className={classes.figureContainer}><img src={figure8} style={{width: '40%'}} alt='Figure8'/></div>
                                                <div className={classes.figureText}>Figure 8: View of All Cohorts</div> 
                                            </li>
                                            <li>Click the X button in the top right to return to the Participant table.</li>
                                        </ol>
                                        <p>Once a cohort exists, you can easily add more Participants to a cohort by selecting at least one new participant, clicking the “ADD PARTICIPANTS TO EXISTING COHORT” button, and selecting the preferred cohort from the dropdown menu (Figure 9). Clicking the “VIEW ALL COHORTS” button from the Participant table will re-open the “View of All Cohorts” pop-up window described above.</p>
                                        <div className={classes.figureContainer}><img src={figure9} style={{width: '80%'}} alt='Figure9'/></div>
                                        <div className={classes.figureText}>Figure 9: Add Participants to Existing Cohort button</div> 
                                        <p>A user can create up to 20 cohorts to exist at any time – cohorts will be stored until a user deletes their browser history. An individual cohort can contain a maximum of 5,000 participants.</p>
                                    </div>
                                </div>
                                <div>
                                    <div id='Downloading Metadata from the Studies tab' className={classes.sectionTitle}>
                                        <p>Downloading Metadata from the Studies tab</p>
                                    </div>
                                    <div className={classes.contentContainer}>
                                        <p>From the CCDI Hub Explore Dashboard, you can download all open metadata for each study from the “Studies” tab to further filter data and build cohorts. For instance, additional filtering by diagnosis of interest can generate a set of participants and the resulting manifest can be uploaded into the CGC. As an example, the following steps guide you on how to download the metadata for the CCDI Molecular Characterization Initiative:</p>
                                        <ol>
                                            <li>Using the process described above, open the “STUDY” set of filters from the lefthand menu, expand the “STUDY NAME” category, and scroll down to find “Molecular Characterization Initiative.”</li>
                                            <li>Select the checkbox corresponding to “Molecular Characterization Initiative” and see the Dashboard reload, filtered for this study’s details.</li>
                                            <li>Navigate to “Studies” in the results tables and locate the “Manifest” column.</li>
                                            <li>
                                                Click the “Download study manifest” icon in the “Manifest” column to download the metadata for this study (Figure 10).
                                                <div className={classes.figureContainer}><img src={figure10} style={{width: '90%'}} alt='Figure10'/></div>
                                                <div className={classes.figureText}>Figure 10: Download metadata manifest for a given study</div> 
                                            </li>
                                            <li>
                                                Open the resulting file on your local machine to browse the resulting metadata tables (Figure 11).
                                                <div className={classes.figureContainer}><img src={figure11} style={{width: '80%'}} alt='Figure11'/></div>
                                                <div className={classes.figureText}>Figure 11: Study metadata export file browsable on local machine</div> 
                                            </li>
                                        </ol>
                                        <p>Appendix A details the process for generating a DRS manifest from the downloaded study metadata tables to be compatible with the CGC.</p>
                                    </div>
                                </div>
                                <div>
                                    <div id='Creating an Exportable File Manifest from the Cart' className={classes.sectionTitle}>
                                        <p>Creating an Exportable File Manifest from the Cart</p>
                                    </div>
                                    <div className={classes.contentContainer}>
                                        <p>In addition to the study-specific downloads, you can also export each row-level metadata element for CCDI participants, diagnoses, samples, or files based on your selections within the Explore Dashboard. Here’s how to create a manifest file of filtered information on the Explore Dashboard:</p>
                                        <ol>
                                            <li>On the results tables of the Explore Dashboard, you can select a row of metadata using the checkbox at the start of the row. Multiple rows can be selected within a table, even across pages of the table. Use the checkbox at the top of the checkbox column to select or deselect all rows.</li>
                                            <li>
                                                After selecting desired rows, add files for that element to the My Files shopping cart (Figure 12 by clicking either the “ADD ALL FILTERED FILES” or “ADD SELECTED FILES” button. Note that selection of items in each tab depends on the specific content of that tab. For example, selecting an item in the “Participants” tab means every file associated with a participant will be added to the My Files shopping cart, whereas selecting an item in the “Files” tab will add that single selected file to the cart.
                                                <div className={classes.figureContainer}><img src={figure12} style={{width: '80%'}} alt='Figure12'/></div>
                                                <div className={classes.figureText}>Figure 12: Selection checkboxes and buttons to add files to the cart for the “Participants” table</div> 
                                            </li>
                                            <li>
                                                To navigate to the shopping cart, select “MY FILES” or the shopping cart icon on the menu bar (Figure 13).
                                                <div className={classes.figureContainer}><img src={figure13} style={{width: '80%'}} alt='Figure13'/></div>
                                                <div className={classes.figureText}>Figure 13: CCDI Hub menu bar with red box highlighting the My Files shopping cart</div> 
                                            </li>
                                            <li>
                                                The shopping cart feature enables you to select and manage files. It’s a simple way to keep track of data and files during your session. Selecting the “DOWNLOAD MANIFEST” button from the “AVAILABLE EXPORT OPTIONS” dropdown menu (Figure 14) will produce a comma-separated values (CSV) file manifest of the items within the cart.
                                                <div className={classes.figureContainer}><img src={figure14} style={{width: '90%'}} alt='Figure14'/></div>
                                                <div className={classes.figureText}>Figure 14: The Explore Dashboard Cart page with red box highlighting the “Available Export Options” button</div> 
                                            </li>
                                            <li>You can then download this manifest file locally or upload it in the CGC (Appendix C). Similarly, you can instead select the “EXPORT TO CANCER GENOMICS CLOUD” button from the “AVAILABLE EXPORT OPTIONS” dropdown menu to load the resulting manifest directly into your CGC account.</li>
                                        </ol>
                                        <p>Note that the Cart has a maximum capacity of 200,000 files, which may limit the ability to create very large manifests for use in the CGC. Should you need to create a manifest containing more than 100,000 files, you can either create manifests from the cart in batches (containing up to 100,000 files in each batch) or use the comprehensive metadata downloads from the Explore page “Studies” tab to create a manifest that can take all data for a given study into the CGC. Longer term solutions are being researched.</p>
                                    </div>
                                </div>
                                <div>
                                    <div id='NCI Data Commons Framework Services (DCFS): Controlled Data Access Instructions' className={classes.sectionTitle}>
                                        <p>NCI Data Commons Framework Services (DCFS): Controlled Data Access Instructions</p>
                                    </div>
                                    <div className={classes.contentContainer}>
                                        <p>NCI Data Commons Framework Services (DCFS), powered by <a className={classes.link} href="https://gen3.org" target="_blank" rel="noopener noreferrer">Gen3</a>, facilitates data authorization in a secure and scalable manner. DCFS’s Indexd service provides permanent digital IDs for data objects. These IDs can be used to retrieve the data or query the metadata associated with the object.</p>
                                        <p>CCDI data is available for download using the DCFS. To gain access to controlled data, researchers must first have an <a className={classes.link} href="https://public.era.nih.gov/commonsplus/public/login.era?TARGET=https%3A%2F%2Fpublic.era.nih.gov%3A443%2Fcommons" target="_blank" rel="noopener noreferrer">NIH eRA Commons account</a> for authentication, after which they will need to obtain authorization (via an active DCFS <a className={classes.link} href="https://nci-crdc.datacommons.io/login" target="_blank" rel="noopener noreferrer">login account</a>) to access the data in <a className={classes.link} href="https://dbgap.ncbi.nlm.nih.gov/aa/wga.cgi?page=login" target="_blank" rel="noopener noreferrer">dbGaP</a>.</p>
                                        <p>Below are instructions for using the Data Commons Framework (DCF) user interface or the DCF Gen3-client to access CCDI data.</p>
                                    </div>
                                </div>
                                <div>
                                    <div className={classes.sectionSubTitle}>
                                        <p>File Download Procedure via User Interface</p>
                                    </div>
                                    <div className={classes.contentContainer}>
                                        <p>To download a study-specific research data distribution file with the DCF Services Portal interface, a researcher must execute the following steps:</p>
                                        <ol>
                                            <li>
                                                Please navigate to <a className={classes.link} href="https://nci-crdc.datacommons.io" target="_blank" rel="noopener noreferrer">nci-crdc.datacommons.io</a> and click the “RAS Login” button. Login to the <a className={classes.link} href="https://nci-crdc.datacommons.io/login" target="_blank" rel="noopener noreferrer">NCI DCF Services</a> portal at <a className={classes.link} href="https://nci-crdc.datacommons.io/login" target="_blank" rel="noopener noreferrer">nci-crdc.datacommons.io/login</a> (Figure B1).
                                                <div className={classes.figureContainer}><img src={figureB1} style={{width: '80%'}} alt='FigureB1'/></div>
                                                <div className={classes.figureText}>Figure B1: NIH DCF homepage with the NIH Researcher Auth Service (RAS) login highlighted</div> 
                                            </li>
                                            <li>
                                                Once logged in, click the “Profile” section in the top right corner and review your project access to confirm study access (Figure B2).
                                                <div className={classes.figureContainer}><img src={figureB2} style={{width: '80%'}} alt='FigureB2'/></div>
                                                <div className={classes.figureText}>Figure B2: DCF Profile page highlighting "Profile" and the accessible projects.</div> 
                                            </li>
                                            <li>Add the file GUID after the final backslash in this URL: <span className={classes.linkButtonStyle}>https://nci-crdc.datacommons.io/user/data/download/</span>. Paste the URL you created in a browser address field and press Enter or Return.</li>
                                            <li>The NCI DCF Services Portal will respond by providing a JSON document with a new (signed) URL for the requested data file. Copy the signed URL.</li>
                                            <li>Paste this new signed URL into the browser address field and press Enter or Return (Figure B3).
                                                <ol className={classes.alphaList}><li>Note: Once issued, the signed URL provided is valid for a relatively short period of time.</li></ol>
                                            </li>
                                            <li>
                                                The NCI DCF Services Portal will respond by displaying a URL. Click the URL to download the file (Figure B3).
                                                <div className={classes.figureContainer}><img src={figureB3} style={{width: '100%'}} alt='FigureB3'/></div>
                                                <div className={classes.figureText}>Figure B3: DCF Service Portal displaying the signed access URL and the file download URL</div> 
                                            </li>
                                        </ol>
                                        <p>Note: If errors or problems are experienced during the file downloading process above, please contact the <a href="mailto:NCIChildhoodCancerDataInitiative@mail.nih.gov" target="_blank" rel="noopener noreferrer">CCDI mailbox</a> for assistance.</p>
                                    </div>
                                </div>
                                <div>
                                    <div className={classes.sectionSubTitle}>
                                        <p>File Download Procedure via Command Line Interface (CLI) client</p>
                                    </div>
                                    <div className={classes.contentContainer}>
                                        <p>To download a study-specific research data distribution file with a CLI client, a researcher must execute the following steps:</p>
                                        <ol>
                                            <li>Obtain the <a className={classes.link} href="https://github.com/uc-cdis/cdis-data-client" target="_blank" rel="noopener noreferrer">Gen3-client command-line tool</a> from GitHub.</li>
                                            <li>Install and configure the client based on the <a className={classes.link} href="https://gen3.org/resources/user/gen3-client/#1-installation-instructions" target="_blank" rel="noopener noreferrer">Gen3 instructions</a>.
                                                <ol className={classes.alphaList}>
                                                    <li>These instructions include signing into the DCF web client and obtaining a downloaded JSON API key from the Profile page, and then configuring the client.</li>
                                                    <li>The API endpoint that will be used for DCF configuration is ‘https://nci-crdc.datacommons.io’.</li>
                                                </ol>
                                            </li>
                                            <li>Obtain either a GUID or manifest of GUIDs for the data files of interest from the <a href="/explore">CCDI Explore page</a> or the <span className={classes.linkButtonStyle} onClick={handleOnClickManifest}>Explore Dashboard exportable manifest</span>.</li>
                                            <li>Create a Gen3 structured manifest:<br />
                                                [<br />
                                                &nbsp;&nbsp;&#123;<br />
                                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;“object_id”: “dg.4DFC/&#123;guid_1&#125;”<br />
                                                &nbsp;&nbsp;&#125;,<br />
                                                &nbsp;&nbsp;&#123;<br />
                                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;“object_id”: “dg.4DFC/&#123;guid_2&#125;”<br />
                                                &nbsp;&nbsp;&#125;,<br />
                                                &nbsp;&nbsp;...<br />
                                                &nbsp;&nbsp;&#123;<br />
                                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;“object_id”: “dg.4DFC/&#123;guid_n&#125;”<br />
                                                &nbsp;&nbsp;&#125;<br />
                                                ]<br /></li>
                                            <li>Download the file(s) using the Gen3 client (either the <a href="https://gen3.org/resources/user/gen3-client/#4-download-a-single-data-file-using-a-guid" className={classes.link} target="_blank" rel="noopener noreferrer">single</a> or <a href="https://gen3.org/resources/user/gen3-client/#5-multiple-file-download-with-manifest" className={classes.link} target="_blank" rel="noopener noreferrer">multiple</a> download option).</li>
                                        </ol>
                                        <p>For more information on this process, please visit the <a href="https://gen3.org/resources/user/gen3-client" className={classes.link} target="_blank" rel="noopener noreferrer">Gen3 documentation page</a>.</p>
                                    </div>
                                </div>
                                <div>
                                    <div id='Full User Guide' className={classes.sectionTitle}>
                                        <p>Full User Guide</p>
                                    </div>
                                    <div className={classes.contentContainer}>
                                        <p>To learn more about CCDI Hub, Explore Dashboard, and accessing data, see the complete <a href="/user-guide.pdf" className={classes.link} target="_blank" rel="noopener noreferrer">User Guide</a>.</p>
                                    </div>
                                </div>
                                <div>
                                    <div id='Contact Us' className={classes.sectionTitle}>
                                        <p>Contact Us</p>
                                    </div>
                                    <div className={classes.contentContainer}>
                                        <p style={{paddingBottom: '100px'}}>Please direct any questions or requests for further information to the <a href="mailto:NCIChildhoodCancerDataInitiative@mail.nih.gov" target="_blank" rel="noopener noreferrer">CCDI mailbox</a>.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Box>
            </Modal>
        </UseGuideButtonContainer>
    )
}

export default withStyles(styles)(UseGuideButton);