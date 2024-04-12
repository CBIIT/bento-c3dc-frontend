import React, { useState } from 'react';
import {
  Grid,
  withStyles,
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import openBook from "../../assets/resources/openBook.svg";

import clsx from 'clsx';
import globalData from '../../bento/siteWideConfig';
import {
  pageTitle, table, externalLinkIcon,
  programDetailIcon, breadCrumb, aggregateCount,
  pageSubTitle, leftPanel, rightPanel,
} from '../../bento/studyDetailData';
import StatsView from '../../components/Stats/StatsView';
import { Typography } from '../../components/Wrappers/Wrappers';
//import CustomBreadcrumb from '../../components/Breadcrumb/BreadcrumbView';
import colors from '../../utils/colors';
import { WidgetGenerator } from '@bento-core/widgets';

const StudyDetailView = ({ classes, data, theme }) => {
  //const programData = data.programDetail;

 
  const [studyD, setProgramData] = useState(
    {"data":{"studyDetails":{"phs_accession":"phs000467","study_description":"There are ~214 fully characterized patient cases with neuroblastoma (all tumor/normal pairs, 10 with relapse sample as well) that will make up the TARGET NBL dataset, along with some cell lines and xenografts. The dataset includes 24 4S cases as well. Each fully characterized case has gene expression, tumor and paired normal copy number analyses, methylation and comprehensive next-generation sequencing to include whole genome and/or whole exome sequencing. A majority of these cases will also have mRNA-seq and methylation data available as well. There are additionally a large number of cases, both low and high risk, with partial molecular characterization to include some next generation and targeted Sanger sequencing making this a large and informative genomic dataset.","num_participants":1119,"num_diseases":3,"num_anatomic_sites":48,"num_survivals":1119,"__typename":"StudyDetailsResult"}}}
  );
    const studyData = studyD.data;
     

  const updatedAttributesData = [
    {
      label: "Study Description",
      internalLink: false,
      actualLink: "/link/",
      actualLinkId: 0,
      dataField: "study_description"
    },
  ];
  
 
  
  const externalLinkIcon = {
    src: "external-link-icon.png",
    alt: "External Link Icon"
  };
  

  return (
    <>
    {//  <StatsView data={stat} />
    }
    <div className={classes.whiteSpaceTop}>

    </div>
    <span style={{marginLeft:"7%",fontSize:16}}>
      <span style={{color:'#005EA2',fontSize: 16, marginTop: 10}}>
    {"Home > study"}    </span>
  {`Study Code   ${studyData.studyDetails.phs_accession}  `} </span>
      <div className={classes.container}>
      <h1 style={{margin:0, marginLeft:'6%', color:'#0D3A3F',marginTop:10,fontWeight: 0}}>C3DC Studies</h1>
      
        <div className={classes.header}>
         
          <div className={classes.headerTitle}>
            <div className={classes.headerMainTitle} id="program_detail_title">
             
              <span style={{color:'white',alignSelf:'flex-start',fontWeight:'normal',marginTop:10}}>
                {'Study Code: '}
               <span style ={{fontWeight:'bold'}}>
               {studyData.studyDetails.phs_accession}
               </span>
            
             </span>
             <img src={openBook} style={{width:50,height:50,color:'white',margin:20,marginTop: 0}} />
            
            </div>
           
          </div>
       
          <div className={classes.headerTitle}>
            <div className={classes.headerMainTitle} id="program_detail_title">
              <span style={{color:'white',alignSelf:'flex-start',fontWeight:"normal"}}>
                {'Participants in this Study: '}
               <span style ={{fontWeight:'bold'}}>
               {studyData.studyDetails.num_participants}
               </span>
              
              </span>
            </div>
           
          </div>
         
        </div>

        <div className={classes.detailContainer}>

          <Grid container spacing={5} >
            <Grid item lg={7} sm={6} xs={12}  container>
              <Grid container spacing={4} direction="row" className={classes.detailContainerLeft}>
               
                {updatedAttributesData.slice(0, 6).map((attribute, index) => (
                  <Grid item xs={12}>
                    {
                      index == 0 &&
                      <h1 style={{color:'#0B536A'}}>Overview</h1>
                    }
                    <div>
                      {
                      attribute.internalLink
                        ? (
                          <div>
                            <span className={classes.detailContainerHeader}>{attribute.label}</span>
                            <div>
                              <span className={classes.content}>
                                {' '}
                                <Link
                                  className={classes.link}
                                  to={`${attribute.actualLink}${studyData[updatedAttributesData[attribute.actualLinkId].dataField]}`}
                                >
                                  {studyData[attribute.dataField]}
                                </Link>
                                {' '}
                              </span>
                            </div>
                          </div>
                        )
                        : attribute.externalLink
                          ? (
                            <div>
                              <span
                                className={classes.detailContainerHeader}
                              >
                                {attribute.label}
                              </span>
                              <div>
                                <span className={classes.content}>
                                  {' '}
                                  <a
                                    href={`${attribute.actualLink}${studyData[updatedAttributesData[attribute.actualLinkId].dataField]}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={classes.link}
                                  >
                                    {studyData[attribute.dataField]}
                                  </a>
                                  <img
                                    src={externalLinkIcon.src}
                                    alt={externalLinkIcon.alt}
                                    className={classes.externalLinkIcon}
                                  />
                                  {' '}
                                </span>
                              </div>
                            </div>
                          )
                          : attribute.internalLinkToLabel
                            ? (
                              <div>
                                <span
                                  className={classes.detailContainerHeaderLink}
                                >
                                  <a href={`${studyData[attribute.dataField]}`} rel="noopener noreferrer">{attribute.label}</a>
                                </span>
                              </div>
                            )
                            : attribute.externalLinkToLabel
                              ? (
                                <div>
                                  <span
                                    className={classes.detailContainerHeaderLink}
                                  >
                                    <a href={`${studyData[attribute.dataField]}`} target="_blank" rel="noopener noreferrer">{attribute.label}</a>
                                    <img
                                      src={externalLinkIcon.src}
                                      alt={externalLinkIcon.alt}
                                      className={classes.externalLinkIcon}
                                    />
                                  </span>
                                </div>
                              )
                              : (
                                <div>
                                  <span
                                    className={classes.detailContainerHeader}
                                    id={`program_detail_left_section_title_${index + 1}`}
                                  >
                                    {attribute.label}
                                  </span>
                                  <div>
                                    <span style={{color:'black'}} id={`program_detail_left_section_description_${index + 1}`}>
                                      {' '}
                                      {studyData.studyDetails[attribute.dataField]}
                                      {' '}
                                    </span>
                                  </div>
                                </div>
                              )
}
                    </div>
                  </Grid>
                ))}

              </Grid>
            </Grid>

            <Grid
              item
              lg={5}
              sm={6}
              xs={12}
            >
              <div   className={classes.detailContainerRight}>
              

                {  rightPanel.files.map((panel)=>   (
                  <Grid item xs={12} style={{height:100,height:60,margin:5}}>
                    <div className={classes.fileContainer}>
                      <span
                        className={classes.detailContainerHeader}
                      >
                        {panel.label}
                      </span>
                     
                        <div  style={{color:'gray',fontSize:20}} >
                         {studyData.studyDetails[panel.dataField]}
                       
                      </div>
                    </div>
                  </Grid>
                ))}
              </div>
            </Grid>

          </Grid>
        </div>
      </div>
   <div className={classes.whiteSpace}> 

   </div>
    </>
  );
};

const styles = (theme) => ({
  firstColumn: {
    maxWidth: '45%',
  },
  secondColumn: {
    maxWidth: '30%',
  },
  thirdColumn: {
    maxWidth: '25%',
  },
  widgetTitle: {
    color: '#0095A2',
    textTransform: 'uppercase',
    fontFamily: 'Lato !important',
    fontWeight: '500 !important',
    fontSize: '17px !important',
    letterSpacing: '0.025em',
  },
  borderLeft: {
    borderLeft: '#81A6BA 1px solid',
    paddingLeft: '25px !important',
  },
  link: {
    textDecoration: 'none',
    fontWeight: 'bold',
    color: theme.palette.text.link,
    '&:hover': {
      textDecoration: 'underline',
    },
  },
  paddingLeft8: {
    paddingLeft: '8px',
  },
  paddingBottm17: {
    paddingBottm: '17px',
  },
  container: {
    paddingTop: '10px',
    fontFamily: theme.custom.fontFamily,
    height:"400px",
    background: '#fff',
    width:'120%',
    margin: 0,
    paddingBottom: '16px',
  },
  content: {
    fontSize: '15px',
    fontFamily: theme.custom.fontFamily,
    lineHeight: '14px',
    color:'black'
  },
  warning: {
    color: theme.palette.warning.main,
  },
  paper: {
    textAlign: 'center',
  },
  fakeToolbar: {
    ...theme.mixins.toolbar,
  },
  root: {
    fontFamily: theme.custom.fontFamily,
    fontSize: '9px',
    letterSpacing: '0.025em',
    color: '#000',
    background: '#f3f3f3',
  },
  header: {
    paddingLeft: '21px',
    paddingRight: '35px',
    height: '64px',
    backgroundColor: '#0D3A3F',
    width: '100%',
    margin: '0',
    display: 'flex',
    flexDirection: 'row',
    justifycontent: 'space-between',
    alignItem: 'center'
  },
  headerTitle: {
    margin: 'auto',
    float: 'left',
    marginLeft: '85px',
  
  },
  headerMainTitle: {
    '& > span': {
      fontWeight: '300',
      letterSpacing: '0.017em',
    },

    '& > span > span': {
      fontWeight: 'bold',
      letterSpacing: '0.025em',
    },
    fontFamily: 'Lato',
    letterSpacing: '0.025em',
    color: '#274FA5 ',
    fontSize: '26px',
    lineHeight: '24px',
    paddingLeft: '0px',
textAlign: 'center',
alignItem: 'center',
justifyContent:'center',
maxHeight: 50,
display:'flex',
flexDirection: 'row',

overflow:'hidden'
  },
  headerSubTitleCate: {
    color: '#00B0BD',
    fontWeight: '300',
    fontFamily: 'Poppins',
    textTransform: 'uppercase',
    letterSpacing: '0.023em',
    fontSize: '15px',
    overflow: 'hidden',
    lineHeight: '24px',
    paddingLeft: '2px',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    paddingRight: '200px',
  },
  whiteSpace:{
    height: '180px',
    backgroundColor:'white'
  },
  whiteSpaceTop:{
    height: '5px',
  },
  headerSubTitleContent: {
    color: '#000000',
    fontWeight: 'bold',
    fontFamily: theme.custom.fontFamilyRaleway,
    textTransform: 'uppercase',
    letterSpacing: '0.023em',
    fontSize: '14px',

  },
  headerMSubTitle: {
    paddingTop: '3px',
  },
  breadCrumb: {
    color: '#00B0BD',
  },
  headerButton: {
    fontFamily: theme.custom.fontFamily,
    float: 'right',
    marginTop: '15px',
    width: '104px',
    height: '33px',
    background: '#F6F4F4',
    textAlign: 'center',
    marginRight: '-20px',

  },
  headerButtonLinkSpan: {
    fontFamily: theme.custom.fontFamily,
    height: '50px',
    background: '#F5F3EE',
    width: '200px',
    fontSize: '8pt',
  },
  headerButtonLinkText: {
    fontFamily: theme.custom.fontFamily,
    color: theme.palette.text.link,
    fontSize: '8pt',
    textTransform: 'uppercase',
  },
  headerButtonColumn: {
    color: '#000000',
  },
  headerButtonLinkNumber: {
    color: '#000000',
    fontFamily: theme.custom.fontFamily,
    borderBottom: 'solid #6690AC',
    lineHeight: '30px',
    paddingBottom: '3px',
    margin: '0 4px',
    fontSize: '8pt',
  },
  logo: {
    position: 'absolute',
    float: 'left',
    marginLeft: '-23px',
    marginTop: '-21px',
    width: '107px',
    filter: 'drop-shadow(-3px 2px 6px rgba(27,28,28,0.29))',
  },
  detailContainer: {
    //maxWidth: '1340px',
    margin: 'auto',
    marginBlockEnd: '24px',
    paddingTop: '24px',
    paddingLeft: '5px',
    fontFamily: theme.custom.fontFamily,
    letterSpacing: '0.014em',
    color: '#000000',
    size: '12px',
    lineHeight: '23px',
    height: '1825px'
  },
  detailContainerHeader: {
    textTransform: 'uppercase',
    fontFamily: 'Lato',
    fontSize: '17px',
    letterSpacing: '0.025em',
    color: '#0095A2',
  },
  detailContainerHeaderLink: {
    fontFamily: 'Raleway',
    fontSize: '14px',
    letterSpacing: '0.025em',
    color: '#0077E3',
  },
  detailContainerBottom: {
    borderTop: '#81a6b9 1px solid',
    marginTop: '13px',
    padding: ' 35px 0 63px 2px !important',
  },
  detailContainerLeft: {
    display: 'block',
    padding: '5px  20px 5px 0px !important',
    minHeight: '500px',
    maxHeight: '800px',
    overflowY: 'auto',
    overflowX: 'hidden',
    width: '103.9%',
      margin: '20px'
  },
  borderRight: {
    borderRight: '#81a6b9 1px solid',
  },
  detailContainerRight: {
    padding: '5px 0 5px 36px !important',
    minHeight: '350px',
    maxHeight: '350px',
    overflowY: 'auto',
    overflowX: 'hidden',
    height: '350px',
    width: '105%',
    borderLeft: '1px solid #81A6BA',
    borderRight: '1px solid #81A6BA',
    marginLeft: '-26px',
    marginTop: '70px',
  },

  tableContainer: {
    background: '#f3f3f3',
  },
  tableHeader: {
    paddingLeft: '30px',
  },
  paddingTop12: {
    paddingTop: '12px',
  },
  tableDiv: {
    maxWidth: '1340px',
    margin: 'auto',
    paddingTop: '50px',
    paddingLeft: '0px',
  },

  headerButtonLink: {
    textDecoration: 'none',
    lineHeight: '14px',
    fontSize: '12px',
    fontWeight: 'bold',
    color: '#c32c2e',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
  button: {
    borderRadius: '22px',
    padding: '0 22px',
    width: '150px',
    height: '35px',
    lineHeight: '14px',
    fontSize: '10px',
    color: '#ffffff',
    textTransform: 'uppercase',
    backgroundColor: '#ff8a00',
    fontFamily: theme.custom.fontFamily,
    '&:hover': {
      backgroundColor: '#ff8a00',
    },
  },
  detailContainerItems: {
    paddingTop: '7px',
    paddingLeft: '7px',
  },
  detailContainerItem: {
    paddingTop: '15px !important',
  },
  title: {
    color: '#0095A2',
    fontFamily: theme.custom.fontFamily,
    fontSize: '12px',
    letterSpacing: '0.017em',
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  tableTitle: {
    textTransform: 'uppercase',
    fontFamily: 'Lato',
    fontSize: '17px',
    letterSpacing: '0.025em',
    color: '#0095A2',
    paddingBottom: '20px',
  },
  fileContainer: {
    paddingTop: '0px',
  },
  fileContent: {
    backgroundColor: '#F3F3F3',
    borderRadius: '50%',
    height: '162px',
    width: '162px',
    paddingLeft: '48px',
    marginLeft: '36%',
    marginTop: '25px',
  },
  fileIcon: {
    '& img': {
      width: '163%',
      padding: '21px 120px 0px 0px',
    },
  },
  fileCount: {
    lineHeight: '31.7px',
    fontSize: '30px',
    color: '#7A297D',
    fontWeight: '600',
    borderBottom: '#7A297D solid 5px',
    fontFamily: 'Oswald',
    width: 'max-content',
    padding: '15px 0px 12px 0px',
  },
  paddingTop32: {
    paddingTop: '36px !important',
  },
  marginTopN37: {
    marginTop: '15px',
  },
  tableCell1: {
    paddingLeft: '25px',
    width: '200px',
  },
  tableCell2: {
    width: '370px',
  },
  tableCell3: {
    width: '370px',
  },
  tableCell4: {
    width: '160px',
  },
  tableCell5: {
    width: '160px',
  },
  externalLinkIcon: {
    width: '16px',
    verticalAlign: 'sub',
    marginLeft: '4px',
  },
});

export default withStyles(styles, { withTheme: true })(StudyDetailView);
