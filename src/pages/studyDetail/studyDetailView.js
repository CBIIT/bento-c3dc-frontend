import React from 'react';
import {
 
  Grid,
  withStyles,
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import openBook from "../../assets/resources/openBook.svg";
import next from "../../assets/resources/next.svg";
import Stats from '../../components/Stats/StatsView';
import {
  rightPanel
} from '../../bento/studyDetailData';

import "./scrollBarConfig.css";
const StudyDetailView = ({ classes, data, theme }) => {

  const studyData = data;
  const statsData = {
    numberOfDiseases: data.studyDetails.num_diseases,
    numberOfParticipants: data.studyDetails.num_participants,
    numberOfStudies: 1,
  };


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
      <Stats data={statsData} />
      
      <div className={classes.whiteSpaceTop}>

      </div>
      <div className={classes.headerNavText}>
        <Link className={classes.navLink} to="/home">Home</Link>
        <img src={next} width={25} height={43} alt='greater than symbol'/>
        <Link className={classes.navLink} to="/studies">Studies</Link>
        <img src={next} width={25} height={43} alt='greater than symbol'/>
        <p className={classes.navInfo}>{`Study Code ${studyData.studyDetails.phs_accession} `}</p>
      </div>

      <div className={classes.container}>
        <h1 className={classes.headerTitleStyle}>C3DC Studies</h1>

        <div className={classes.header}>

          <div className={classes.headerTitle}>
            <div className={classes.headerMainTitle}>

              <span className={classes.headerSubStyle}>
                {'Study Accession: '}
                <span>
                  <a className={classes.studyIdUrl} href={`https://www.ncbi.nlm.nih.gov/projects/gap/cgi-bin/study.cgi?study_id=${studyData.studyDetails.phs_accession}`} target='_blank' rel="noreferrer">
                  {studyData.studyDetails.phs_accession}
                  </a>
                  
                </span>

              </span>
              <img src={openBook} style={{ width: 41, height: 29, color: 'white', margin: 20, marginTop: 15,  }} alt='open book icon'/>

            </div>

          </div>

          <div className={classes.headerTitle}>
            <div className={classes.headerMainTitle} >
              <span style={{ color: '#71DBEA', alignSelf: 'center', position: 'absolute', right: 60, fontWeight: "normal",fontSize: 19, marginTop: 10 }}>
                {'Participants in this Study: '}
                <span style={{ fontWeight: 'bold' , color: "white", fontFamily: 'Poppins'}}>
                  {studyData.studyDetails.num_participants}
                </span>

              </span>
            </div>

          </div>

        </div>

        <div className={classes.detailContainer}>

          <Grid container spacing={5} >
            <Grid item lg={7} sm={6} xs={12} container>
              <Grid container spacing={4} direction="row" className={"detailContainerLeft"}>

                {updatedAttributesData.slice(0, 6).map((attribute, index) => (
                  <Grid item xs={12}>
                    {
                      index === 0 && 
                      <> 
                      <span className={classes.contentTitle}>Overview</span>
                      <div className={classes.descriptionGap}>
                        </div>
                      </>
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

                                    >
                                      {attribute.label}
                                    </span>
                                    <div className={classes.studyGap}>
                                      </div>
                                    <div>
                                      <span className={classes.studyDescriptionClass} >
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
              <div className={classes.detailContainerRight}>


                {rightPanel.files.map((panel) => (
                  <Grid item xs={12} style={{ height: 65, margin: 5, gap: 35 }}>
                    <div className={classes.fileContainer}>
                      <span
                        className={classes.detailContainerHeader}
                      >
                        {panel.label}
                      </span>

                      <div className={classes.studyDescriptionClass} >
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
  headerSubStyle: {
    color: 'white',
    alignSelf: 'center',
    fontWeight: 'normal',
    marginTop: 10,
    marginLeft: 0
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
    height: "400px",
    background: '#fff',
    width: '120%',
    margin: 0,
    paddingBottom: '16px',
  },
  contentTitle:{
     color: '#0B536A' ,
     fontSize: 28,
     fontWeight: 500,
     fontFamily: 'Poppins',
  },
    content: {
    fontSize: '15px',
    fontFamily: theme.custom.fontFamily,
    lineHeight: '14px',
    color: 'black'
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
  headerNavText: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    height: 50,
    width: 500,
    marginLeft: 40
  },
  studyIdUrl:{
    fontWeight: 'bold',
    color: 'white',
    
  },
  navLink: {
    fontSize: 16,
    fontFamily: 'Public Sans',
    fontWeight: 400,
    color: '#005EA2',
    textDecoration: 'underline',
    margin: 5
  },
  studyDescriptionClass: {
    color: "#343434",
    fontWeight: 400,
    fontSize: 16,
    overFlowY: 'scroll',
    fontFamily: "inter",
  },
  studyGap:{
    height: 7
  },
  descriptionGap:{
    height: 20
  },
  navInfo: {
    fontSize: 16,
    fontFamily: 'Public Sans',
    fontWeight: 400,
    color: '#000',
    margin: 6
  },
  headerTitleStyle: {
    margin: 0,
    color: '#0D3A3F',
    marginLeft: '2.5rem',
    marginTop: 10,
    fontWeight: 400,
    fontFamily: 'Poppins',
    fontSize: 35
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
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItem: 'space-between',
    background:'transparent',
    width: '100%',
    margin: 0

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
    fontSize: '35px',
    lineHeight: '24px',
    paddingLeft: '0px',
    textAlign: 'center',
    alignItem: 'space-between',
    justifyContent: 'space-between',
    maxHeight: 50,
    display: 'flex',
    flexDirection: 'row',
    
    marginLeft: '1.4rem',
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
  whiteSpace: {
    height: '180px',
    backgroundColor: 'white'
  },
  whiteSpaceTop: {
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
    fontFamily: 'poppins',
    fontSize: '17px',
    fontWeight: '500',
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
    padding: '5px  20px 105px 0px !important',
    minHeight: '500px',
    maxHeight: '400px',
    overflowX: 'hidden',
    width: '103.9%',
    margin: '20px',
    overflowY: 'scroll',
    borderRight: '#81A6BA 1px solid',

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
    width: '10px',
    verticalAlign: 'center',
    marginLeft: '4px',
    marginTop: '20px',
    alignSelf: 'center',
    backgroundColor: '#71DBEA'
  },
});

export default withStyles(styles, { withTheme: true })(StudyDetailView);