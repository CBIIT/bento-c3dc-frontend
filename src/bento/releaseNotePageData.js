

export const releaseNotePageData = [
    {
        Year: '2024',
        is_open: true,
        versions: [
            { Version: 'Data Release 4.0', date: 'Oct 30, 2024', selected: true },
            { Version: 'Data Release 3.0', date: 'Jul 31, 2024', selected: false },
            { Version: 'Data Release 2.0', date: 'May 1, 2024', selected: false },
            { Version: 'Data Release 1.0', date: 'Mar 8, 2024', selected: false },
        ],
    },
];

export const defaultVersion = "Data Release 4.0";
export const versionList = {
    'Data Release 4.0': `
     <span class='title'>Data Release 4.0</span>
         <p class='descriptionDate'>October 30, 2024</p>
   
    <span class='second-title'>Studies Overview</span>
    <br>
    Pediatric Preclinical Testing Consortium (PPTC)
    <ul class="study-details">
        <li>dbGaP Accession: phs001437</li>
        <li>Participants:</li>
        <li>Diagnoses:</li>
    </ul>

    Molecular Characterization across Pediatric Brain Tumors and Other Solid and Hematologic Malignancies for Research, Diagnostic, and Precision Medicine
    <ul class="study-details">
        <li>dbGaP Accession: phs002517</li>
        <li>Participants:</li>
        <li>Diagnoses:</li>
    </ul>

    Molecular Characterization Initiative
    <ul class="study-details">
        <li>dbGaP Accession: phs002790</li>
        <li>Participants:</li>
        <li>Diagnoses:</li>
    </ul>

    Identification and Targeting of Treatment Resistant Progenitor Populations in T-cell Acute Lymphoblastic Leukemia
    <ul class="study-details">
        <li>dbGaP Accession: phs003432</li>
        <li>Participants: 43</li>
        <li>Diagnoses:</li>
    </ul>

    Single-Cell Atlas of NF1 Nerve Sheath Tumors
    <ul class="study-details">
        <li>dbGaP Accession: phs003519</li>
        <li>Participants: 29</li>
        <li>Diagnoses:</li>
    </ul>
    `,

    'Data Release 3.0': `
     <span class='title'>Data Release 3.0</span>
         <p class='descriptionDate'>July 31, 2024</p>
   
    <span class='second-title'>Studies Overview</span>
    <br>
    TARGET: Kidney, Rhabdoid Tumor (RT)
    <ul class="study-details">
        <li>dbGaP Accession: phs000470</li>
        <li>Participants: 69</li>
        <li>Diagnoses: 1</li>
    </ul>

    TARGET: Kidney, Wilms Tumor (WT)
    <ul class="study-details">
        <li>dbGaP Accession: phs000471</li>
        <li>Participants: 652</li>
        <li>Diagnoses: 1</li>
    </ul>

    Genomic sequencing of Pediatric Rhabdomyosarcoma
    <ul class="study-details">
        <li>dbGaP Accession: phs000720</li>
        <li>Participants: 403</li>
        <li>Diagnoses: 5</li>
    </ul>

    Human Tumor Atlas Network (HTAN)
    <ul class="study-details">
        <li>dbGaP Accession: phs002371</li>
        <li>Participants: 30</li>
        <li>Diagnoses: 4</li>
    </ul>

    Enhancement of Data Sharing in Pediatric, Adolescent and Young Adult Cancers
    <ul class="study-details">
        <li>dbGaP Accession: phs002431</li>
        <li>Participants: 611</li>
        <li>Diagnoses: 156</li>
    </ul>

    Integrating Longitudinal Clinical, Sociodemographic and Genomic Data into the NCCR
    <ul class="study-details">
        <li>dbGaP Accession: phs002677</li>
        <li>Participants: 835</li>
        <li>Diagnoses: 105</li>
    </ul>

    CCDI Pediatric In Vivo Testing Program – Leukemia
    <ul class="study-details">
        <li>dbGaP Accession: phs003164</li>
        <li>Participants: 40</li>
        <li>Diagnoses: 2</li>
    </ul>
    `,

    'Data Release 2.0': `
     <span class='title'>Data Release 2.0</span>
         <p class='descriptionDate'>May 1, 2024</p>
   
    <span class='second-title'>Studies Overview</span>
    <br>
    Pediatric Preclinical Testing Consortium (PPTC)
    <ul class="study-details">
        <li>dbGaP Accession: phs001437</li>
        <li>Participants: 267</li>
        <li>Diagnoses: 28</li>
    </ul>

    Genomic Analysis in Pediatric Malignancies
    <ul class="study-details">
        <li>dbGaP Accession: phs002430</li>
        <li>Participants: 231</li>
        <li>Diagnoses: 52</li>
    </ul>

    Molecular Characterization across Pediatric Brain Tumors and Other Solid and Hematologic Malignancies for Research, Diagnostic, and Precision Medicine
    <ul class="study-details">
        <li>dbGaP Accession: phs002517</li>
        <li>Participants: 3,937</li>
        <li>Diagnoses: 65</li>
    </ul>

    OncoKids - NGS Panel for Pediatric Malignancies
    <ul class="study-details">
        <li>dbGaP Accession: phs002518</li>
        <li>Participants: 1,039</li>
        <li>Diagnoses: 90</li>
    </ul>

    UCSF Database for the Advancement of JMML - Integration of Metadata with "Omic" Data
    <ul class="study-details">
        <li>dbGaP Accession: phs002504</li>
        <li>Participants: 188</li>
        <li>Diagnoses: 1</li>
    </ul>

    Comprehensive Genomic Sequencing of Pediatric Cancer Cases (CMRI/KUCC)
    <ul class="study-details">
        <li>dbGaP Accession: phs002529</li>
        <li>Participants: 200</li>
        <li>Diagnoses: 61</li>
    </ul>

    NCI CCSG CCDI Supplement Additional Genomic Submission
    <ul class="study-details">
        <li>dbGaP Accession: phs002599</li>
        <li>Participants: 104</li>
        <li>Diagnoses: 21</li>
    </ul>

    Feasibility and Clinical Utility of Whole Genome Profiling in Pediatric and Young Adult Cancers
    <ul class="study-details">
        <li>dbGaP Accession: phs002620</li>
        <li>Participants: 114</li>
        <li>Diagnoses: 43</li>
    </ul>

    Clonal Evolution During Metastatic Spread in High-Risk Neuroblastoma
    <ul class="study-details">
        <li>dbGaP Accession: phs003111</li>
        <li>Participants: 129</li>
        <li>Diagnoses: 1</li>
    </ul>
    `,

    'Data Release 1.0': `
     <span class='title'>Data Release 1.0</span>
         <p class='descriptionDate'>March 8, 2024</p>
   
    <span class='second-title'>Studies Overview</span>
    <br>
    TARGET: Neuroblastoma (NBL)
    <ul class="study-details">
        <li>dbGaP Accession: phs000467</li>
        <li>Participants: 1,119</li>
        <li>Diagnoses: 3</li>
    </ul>

    Molecular Characterization Initiative
    <ul class="study-details">
        <li>dbGaP Accession: phs002790</li>
        <li>Participants: 3,564</li>
        <li>Diagnoses: 217</li>
    </ul>
    `
};

