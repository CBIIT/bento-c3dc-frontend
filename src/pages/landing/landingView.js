import React from 'react';
import {
  Grid,
  withStyles,
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import { landingPageData } from '../../bento/landingPageData';
import icon from '../../assets/landing/LP_ReadMore.svg';
import iconAbout from '../../assets/landing/LP_About_Fullarticle.Arrow.svg';

const LandingView = ({ classes, statsData }) => (
  <div className={classes.page}>
    <div className={classes.container}>
      <div className={classes.hero}>
        <Grid container spacing={16} direction="row">
          <div className={classes.heroImage}>
            <div className={classes.heroFrame}>
              <div className={classes.heroTextContainer}>
                <div className={classes.heroTextWrapper}>
                  <div className={classes.headerTitle}>
                    { landingPageData.callToActionTitle }
                  </div>
                  <div className={classes.headerContent}>
                    { landingPageData.callToActionDescription}
                  </div>
                  <div className={classes.statsBubbleContainer}>
                    <div className={classes.statsBubbleDiagnoses}>
                      <div className={classes.statsBubbleDiagnosesCount}>
                        <div className={classes.statsBubbleDiagnosesNumber}>
                          {statsData.numberOfDiagnoses.num}
                        </div>
                        <div className={classes.statsBubbleDiagnosesMagnitude}>
                          {statsData.numberOfDiagnoses.char}
                        </div>
                      </div>
                      <div className={classes.statsBubbleText}>
                        Diagnosis Records
                      </div>
                      <div className={classes.statsBubbleDiagnosesIcon}>
                        <img 
                          src={landingPageData.landingPageStatsIcons.diagnosesIcon} 
                          alt={landingPageData.landingPageStatsIcons.diagnosesIconAlt} 
                        />
                      </div>
                    </div>
                    <div className={classes.statsBubbleParticipants}>
                      <div className={classes.statsBubbleParticipantsCount}> 
                        <div className={classes.statsBubbleParticipantsNumber}>
                          {statsData.numberOfParticipants.num}
                        </div>
                        <div className={classes.statsBubbleParticipantsMagnitude}>
                          {statsData.numberOfParticipants.char}
                        </div>
                      </div>
                      <div className={classes.statsBubbleText}>
                        Participants
                      </div>
                      <div className={classes.statsBubbleParticipantsIcon}>
                        <img
                          src={landingPageData.landingPageStatsIcons.participantsIcon}
                          alt={landingPageData.landingPageStatsIcons.participantsIconAlt}
                        />
                      </div>
                    </div>
                    <div className={classes.statsBubbleStudies}>
                      <div className={classes.statsBubbleStudiesCount}>
                        <div className={classes.statsBubbleStudiesNumber}>
                          {statsData.numberOfStudies.num}
                        </div>
                        <div className={classes.statsBubbleStudiesMagnitude}>
                          {statsData.numberOfStudies.char}
                        </div>
                      </div>
                      <div className={classes.statsBubbleText}>
                        Studies
                      </div>
                      <div className={classes.statsBubbleStudiesIcon}>
                        <img
                          src={landingPageData.landingPageStatsIcons.studiesIcon}
                          alt={landingPageData.landingPageStatsIcons.studiesIconAlt}
                        />
                      </div>
                    </div>
                  </div>
                  {/* <div className={classes.headerButtonSection}>
                    <Link to={landingPageData.callToActionLink} className={classes.headerLink}>
                      <Button className={classes.buttonText} bgColor="neonBlue" color="white">
                        {landingPageData.callToActionButtonText}
                      </Button>
                    </Link>
                  </div> */}
                </div>
              </div>
            </div>
            <div className={classes.heartbeartAnimation}>
              <div className={classes.heartbeatPulse}>
                  <img
                    src={landingPageData.heartbeatAnimation.heartlineFull}
                    className={classes.heartbeatPulseImage}
                    alt={landingPageData.heartbeatAnimation.alt}
                    />
              </div>
              <div className={classes.heartlineTracker}>
                  <img
                    src={landingPageData.heartbeatAnimation.tracker}
                    className={classes.heartlineTrackerImage}
                    alt={landingPageData.heartbeatAnimation.alt}
                    />
              </div>
            </div>
          </div>
        </Grid>
      </div>
    </div>
    <div className={classes.whiteSection} />
    {/* <StatsView stats={landingPageData.landingPageStatsBar} statsData={statsData} /> */}
    <div className={classes.container}>
      <div className={classes.texture}>
        <Grid container spacing={16} direction="row" className={classes.landingContainer}>
          <div className={classes.landingContainerInner}>
            <div className={classes.contentLeft}>
              <div className={classes.about}>
                <div className={classes.aboutImageSection}>
                  <img
                    src={landingPageData.tile1.img}
                    className={classes.aboutImage}
                    alt={landingPageData.tile1.alt}
                    id="tile1_image"
                  />
                </div>
                <div className={classes.DCWords} id="tile1_title">
                {landingPageData.tile1.titleText}
                  {/* {landingPageData.tile1.titleText.match(/\b(\w+)\b/g).map((word) => (
                    <>
                      {word} 
                    </>
                  ))} */}
                </div>
                <div className={classes.aboutContent} id="tile1_description">
                  {landingPageData.tile1.descriptionText}
                </div>
                <div className={classes.aboutButtonSection}>
                  <div className={classes.aboutButtonLeft}>
                    <img src={iconAbout} className={classes.iconAbout} alt="CTDC about icon" />
                  </div>
                  <div className={classes.aboutButtonRight} id="tile1_button">
                    <Link
                      to={landingPageData.tile1.callToActionLink}
                      className={classes.aboutButton}
                      reloadDocument={true}
                    >
                      {landingPageData.tile1.callToActionText}
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div className={classes.contentRight}>
              <div className={classes.contentRightTop}>
                <div className={classes.program}>
                  <div className={classes.programImg}>
                    <img
                      className={classes.image}
                      src={landingPageData.tile2.img}
                      alt={landingPageData.tile2.alt}
                      id="tile2_image"
                    />
                  </div>
                  <div className={classes.content}>
                    <div className={classes.contentHeader} id="tile2_title">
                      {landingPageData.tile2.titleText}
                    </div>
                    <div className={classes.contentContainer} id="tile2_description">
                      {landingPageData.tile2.descriptionText}
                    </div>

                  </div>
                  <div className={classes.blueButton}>
                    <div className={classes.blueButtonLeft}>
                      <img className={classes.icon} src={icon} alt="CTDC about " />
                      {' '}
                    </div>
                    <div className={classes.blueButtonRight} id="tile2_button">
                      <Link
                        to={landingPageData.tile2.callToActionLink}
                        className={classes.blueButton}
                      >
                        {landingPageData.tile2.callToActionText}
                      </Link>
                    </div>
                  </div>
                </div>
                <div className={classes.studies}>
                  <div className={classes.programImg}>
                    <img
                      className={classes.image}
                      src={landingPageData.tile3.img}
                      alt={landingPageData.tile3.alt}
                      id="tile3_image"
                    />
                  </div>
                  <div className={classes.tile3Content}>
                    <div className={classes.contentHeader} id="tile3_title">
                      {landingPageData.tile3.titleText}
                    </div>
                    <div className={classes.contentContainer} id="tile3_description">
                      {landingPageData.tile3.descriptionText}
                    </div>

                  </div>{/*
                  <div className={classes.blueButton}>
                    <div className={classes.blueButtonLeft}>
                      <img className={classes.icon} src={icon} alt="CTDC about " />
                      {' '}
                    </div>
                    <div className={classes.blueButtonRight} id="tile3_button">
                      <Link
                        to={landingPageData.tile3.callToActionLink}
                        className={classes.blueButton}
                      >
                        {landingPageData.tile3.callToActionText}
                      </Link>
                    </div>
                  </div>*/}
                </div>

              </div>
              <div className={classes.contentRightBottom}>
                <div className={classes.cases} id="tile4_image">
                  <div className={classes.mountainMeadowContentHeader} id="tile4_title">
                    {landingPageData.tile4.titleText}
                  </div>
                  <div className={classes.mountainMeadowContent} id="tile4_description">
                    {landingPageData.tile4.descriptionText}
                  </div>
                  <div className={classes.mountainMeadowButtonSection}>
                    <div className={classes.blueButtonLeft}>
                      <img className={classes.mountainMeadowIcon} src={icon} alt="CTDC about " />
                      {' '}
                    </div>
                    <div className={classes.blueButtonRight} id="tile4_button">
                      <Link
                        to={landingPageData.tile4.callToActionLink}
                        className={classes.mountainMeadowButton}
                        reloadDocument={true}
                      >
                        {landingPageData.tile4.callToActionText}
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Grid>
      </div>

    </div>
  </div>
);
const styles = () => ({
  "@keyframes heartbeatPulse": {
    "0%": {
      clipPath: "inset(0px 100% 0px 0px)" 
    },
    "32.33%": { //left
      clipPath: "inset(0px 46.9% 0px 0px)" 
    },
    "39.67%": { //peak
      clipPath: "inset(0px 45% 0px 0px)" 
    },
    "47%": { //drop -3
      clipPath: "inset(0px 42.7% 0px 0px)" 
    },
    "51.56%": { //left -4
      clipPath: "inset(0px 30.3% 0px 0px)" 
    },
    "58.89%": { //peak -5
      clipPath: "inset(0px 28.4% 0px 0px)" 
    },
    "66.22%": { //drop -6
      clipPath: "inset(0px 26.1% 0px 0px)" 
    },
    "70.78%": { //left -7
      clipPath: "inset(0px 14.5% 0px 0px)" 
    },
    "78.11%": { //peak -8
      clipPath: "inset(0px 12.6% 0px 0px)" 
    },
    "85.44%": { //drop -9 
      clipPath: "inset(0px 10.3% 0px 0px)" 
    },
    "88%": {
      clipPath: "inset(0px 1.7% 0px 0px)",
      opacity: '1'
    },
    "100%": {
      clipPath: "inset(0px 1.7% 0px 0px)",
      opacity: '0'
    },
  },
  heartbeatPulse:{
    '--svg-width': '618px',
    '--svg-height': '67px',
    position: 'absolute',
    left: '50%',
    marginLeft: '-720px',
    top: '690px',
    animation: '6s $heartbeatPulse infinite linear',
  },
  "@keyframes heartlineTracking": {
    "0%": {
      top: '745px',
      left: '50%',
      marginLeft: "-726px", 
    },
    "32.33%": { //left
      top: '745px',
      left: '50%',
      marginLeft: "48px",  
    },
    "39.67%": { //peak
      top: '685px',
      left: '50%',
      marginLeft: "80px", 
    },
    "47%": { //drop
      top: '745px',
      left: '50%',
      marginLeft: "110px",  
    },
    "51.56%": { //left
      top: '745px',
      left: '50%',
      marginLeft: "292px",
    },
    "58.89%": { //peak
      top: '685px',
      left: '50%',
      marginLeft: "322px", 
    },
    "66.22%": { //drop
      top: '745px',
      left: '50%',
      marginLeft: "352px", 
    },
    "70.78%": { //left
      top: '745px',
      left: '50%',
      marginLeft: "524px", 
    },
    "78.11%": { //peak
      top: '685px',
      left: '50%',
      marginLeft: "555px", 
    },
    "85.44%": { //drop
      top: '745px',
      left: '50%',
      marginLeft: "586px", 
    },
    "88%": {
      top: '745px',
      left: '50%',
      marginLeft: "711px", 
      opacity: '1'
    },
    "100%": {
      top: '745px',
      left: '50%',
      marginLeft: "711px", 
      opacity: '0'
    },
  },
  heartlineTracker:{
    position: 'absolute',
    top: '745px',
    left: '50%',
    marginLeft: "-726px",
    animation: '6s $heartlineTracking infinite linear'
  },
  page: {
    marginTop: '0px',
  },
  heroImage: {
    width: '100%',
    maxWidth: '100%',
    height: '670px',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundImage: `url(${landingPageData.landingPageHero.img})`,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  heroFrame: {
    height: '614px',
    width: '1440px',
    border: 'solid 3.25px #f7fbfd',
    borderRadius: '12px'
  },
  texture: {
    backgroundSize: 'cover',
    padding: '120px 0 80px 0',
    backgroundImage: `url(${landingPageData.landingTileBackground.img})`,
  },
  container: {
    fontFamily: 'Raleway, sans-serif',
    margin: '0 auto',

  },
  whiteSection: {
    background: 'white',
  },
  redButton: {
    height: '13px',
    color: '#FFFFFF',
    fontFamily: 'Raleway',
    fontSize: '16px',
    fontWeight: 'bold',
    lineHeight: '47px',
    textAlign: 'center',
    textDecoration: 'none',
    textTransform: 'uppercase',
    letterSpacing: '0.8px',
  },
  headerTitle: {
    fontFamily: 'Poppins, Inter, Raleway, sans-serif',
    fontSize: '45px',
    fontWeight: '600',
    lineHeight: '45px',
    color: '#009485',
    textAlign: 'center',
    whiteSpace: 'pre-line',
  },
  paddingLeft50: {
    paddingLeft: '50px',
  },
  headerContent: {
    color: '#0C534C',
    fontFamily: 'Inter',
    fontSize: '22px',
    fontWeight: '500',
    lineHeight: '28px',
    textAlign: 'center',
    whiteSpace: 'pre-line',
    paddingTop: '14px',
  },
  headerLink: {
    textDecoration: 'none',
  },
  statsBubbleContainer: {
    display: 'flex',
    justifyContent: 'center',
    width: '669px',
    paddingTop: '33px',
  },
  statsBubbleText: {
    fontFamily: 'Poppins',
    fontWeight: '600',
    fontSize: '15px',
    lineHeight: '20px',
    letterSpacing: '2%',
    color: '#004358',
    textTransform: 'uppercase',
  },
  "@keyframes diagnosesHighlight": {
    "39.67%": {
      border: 'solid 3px #8E8E8E',
      backgroundColor: 'rgba(255, 255, 255, 0.0)',
    },
    "47%": {
      border: 'solid 3px #24b0ff',
      backgroundColor: 'rgba(255, 255, 255, 0.4)',
    },
    "58.39%%": {
      border: 'solid 3px #24b0ff',
      backgroundColor: 'rgba(255, 255, 255, 0.4)',
    },
    "58.89%": {
      border: 'solid 3px #8E8E8E',
      backgroundColor: 'rgba(255, 255, 255, 0.0)',
    },
  },
  statsBubbleDiagnoses: {
    width: '195px',
    height: '195px',
    borderRadius: '50%',
    border: 'solid 3px #8E8E8E',
    boxShadow: '0px 4px 15px 10px rgba(142, 142, 142, 0.30)',
    marginRight: '42px',
    '&:hover': {
      border: 'solid 3px #24b0ff',
      backgroundColor: 'rgba(255, 255, 255, 0.4)',
    },
    '&:hover $statsBubbleDiagnosesCount': {
      visibility: 'visible',
    },
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center', 
    animation: '6s $diagnosesHighlight infinite cubic-bezier(0,1.12,0,.97)',
  },
  "@keyframes participantsHighlight": {
    "58.89%": {
      border: 'solid 3px #8E8E8E',
      backgroundColor: 'rgba(255, 255, 255, 0.0)',
    },
    "66.22%": {
      border: 'solid 3px #21aa79',
      backgroundColor: 'rgba(255, 255, 255, 0.4)',
    },
    "77.61%": {
      border: 'solid 3px #21aa79',
      backgroundColor: 'rgba(255, 255, 255, 0.4)',
    },
    "78.11%": {
      border: 'solid 3px #8E8E8E',
      backgroundColor: 'rgba(255, 255, 255, 0.0)',
    },
  },
  statsBubbleParticipants: {
    width: '195px',
    height: '195px',
    borderRadius: '50%',
    border: 'solid 3px #8E8E8E',
    boxShadow: '0px 4px 15px 10px rgba(142, 142, 142, 0.30)',
    marginRight: '42px',
    '&:hover': {
      border: 'solid 3px #21aa79',
      backgroundColor: 'rgba(255, 255, 255, 0.4)',
    },
    '&:hover $statsBubbleParticipantsCount': {
      visibility: 'visible',
    },
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    animation: '6s $participantsHighlight infinite cubic-bezier(0,1.12,0,.97)', 
  },
  "@keyframes studiesHighlight": {
    "78.11%": {
      border: 'solid 3px #8E8E8E',
      backgroundColor: 'rgba(255, 255, 255, 0.0)',
    },
    "95.44%": {
      border: 'solid 3px #ffbe18',
      backgroundColor: 'rgba(255, 255, 255, 0.4)',
    },
    "96.83%": {
      border: 'solid 3px #ffbe18',
      backgroundColor: 'rgba(255, 255, 255, 0.4)',
    },
    "97.33%": {
      border: 'solid 3px #8E8E8E',
      backgroundColor: 'rgba(255, 255, 255, 0.0)',
    },
  },
  statsBubbleStudies: {
    width: '195px',
    height: '195px',
    borderRadius: '50%',
    border: 'solid 3px #8E8E8E',
    boxShadow: '0px 4px 15px 10px rgba(142, 142, 142, 0.30)',
    '&:hover': {
      border: 'solid 3px #ffbe18',
      backgroundColor: 'rgba(255, 255, 255, 0.4)',
    },
    '&:hover $statsBubbleStudiesCount': {
      visibility: 'visible',
    },
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    animation: '6s $studiesHighlight infinite cubic-bezier(0,1.12,0,.97)',  
  },
  "@keyframes diagnosesNumberHighlight": {
    "39.67%": {
      visibility: 'hidden',
    },
    "47%": {
      visibility: 'visible',
    },
    "58.89%": {
      visibility: 'hidden',
    },
  },
  statsBubbleDiagnosesCount: {
    fontFamily: 'Poppins',
    fontWeight: '700',
    lineHeight: '40px',
    letterSpacing: '2%',
    align: 'center',
    color: '#007dd9',
    visibility: 'hidden',
    animation: '6s $diagnosesNumberHighlight infinite linear', 
    display: 'flex',
    alignItems: 'flex-end',
  },
  statsBubbleDiagnosesNumber: {
    fontSize: '42px',
  },
  statsBubbleDiagnosesMagnitude: {
    fontSize: '28px',
    marginLeft: '5px',
    marginBottom:'-5px',
  },
  "@keyframes participantsNumberHighlight": {
    "58.89%": {
      visibility: 'hidden',
    },
    "66.22%": {
      visibility: 'visible',
    },
    "78.11%": {
      visibility: 'hidden',
    },
  },
  statsBubbleParticipantsCount: {
    fontFamily: 'Poppins',
    fontWeight: '700',
    fontSize: '28px',
    lineHeight: '40px',
    letterSpacing: '2%',
    align: 'center',
    color: '#21aa79',
    visibility: 'hidden',
    animation: '6s $participantsNumberHighlight infinite linear', 
    display: 'flex',
    alignItems: 'flex-end',

  },
  statsBubbleParticipantsNumber: {
    fontSize: '42px',
  },
  statsBubbleParticipantsMagnitude: {
    fontSize: '28px',
    marginLeft: '5px',
    marginBottom:'-5px',
  },
  "@keyframes studiesNumberHighlight": {
    "78.11%": {
      visibility: 'hidden',
    },
    "95.44%": {
      visibility: 'visible',
    },
    "97.33%": {
      visibility: 'hidden',
    },
  },
  statsBubbleStudiesCount: {
    fontFamily: 'Poppins',
    fontWeight: '700',
    fontSize: '28px',
    lineHeight: '40px',
    letterSpacing: '2%',
    align: 'center',
    color: '#ffbe18',
    visibility: 'hidden',
    animation: '6s $studiesNumberHighlight infinite linear', 
    display: 'flex',
    alignItems: 'flex-end',
  },
  statsBubbleStudiesNumber: {
    fontSize: '42px',
  },
  statsBubbleStudiesMagnitude: {
    fontSize: '28px',
    marginLeft: '5px',
    marginBottom:'-5px',
  },
  statsBubbleDiagnosesIcon: {
    width: '41px',
    height: '41px',
    marginTop: '13px',
  },
  statsBubbleParticipantsIcon: {
    width: '34px',
    height: '43px',
    marginTop: '11px',
  },
  statsBubbleStudiesIcon: {
    width: '36px',
    height: '38px',
    marginTop: '16px',
  },
  iconAbout: {
    height: '17px',
    width: '9px',
    marginTop: '15px',
    marginLeft: '20px',
  },
  icon: {
    width: '20px',
    marginTop: '13px',
    marginLeft: '23px',
  },

  aboutImage: {
    width: '100%',
    height: '100%'
  },
  aboutImageSection: {
    height: '249px',
    width: '296px',
  },
  DCWords: {
    height: '200px',
    background: '#334a9b',
    color: '#FFFFFF',
    fontFamily: 'Poppins',
    fontSize: '28px',
    lineHeight: '33px',
    fontWeight: '500',    
    padding: '20px 28px 28px 24px',
  },
  landingContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  contentLeft: {
    float: 'left',
    paddingRight: '10px',
  },
  about: {
    width: '300px',
    backgroundColor: 'white',
    border: 'solid 2px #096761',
  },
  image: {
    width: '293px',
    height: '249px',
  },
  aboutContent: {
    background: 'white',
    minHeight: '372px',
    width: '296px',
    padding: '25px 35px 0px 24px',
    color: '#000000',
    fontFamily: 'Inter',
    fontSize: '16px',
    fontWeight: '400',
    lineHeight: '24px',
  },
  aboutButtonSection: {
    background: 'white',
    height: '71px',
  },
  imgIconAbout: {
    width: '49px',
  },
  aboutButtonLeft: {
    float: 'left',
    background: '#AE5E1B',
    height: '45px',
    width: '48px',
  },
  aboutButtonRight: {
    background: '#844715',
    float: 'left',
    height: '45px',
    width: '132px',
  },
  aboutButton: {
    color: '#ffffff',
    textDecoration: 'none',
    textTransform: 'uppercase',
    fontSize: '12px',
    fontWeight: '600',
    lineHeight: '45px',
    paddingLeft: '20px',
    boxShadow: 'none',
    letterSpacing: '1px',
  },

  content: {
    width: '100%',
    height: '155px',
    overflowY: 'auto',
    background: '#fff',
    paddingLeft: '30px',
    paddingTop: '5px',
    minHeight: '138px',
  },
  tile3Content: {
    width: '100%',
    height: '200px',
    overflowY: 'auto',
    background: '#fff',
    paddingLeft: '30px',
    paddingTop: '5px',
    minHeight: '138px',
  },
  contentHeader: {
    color: '#343434',
    fontFamily: 'Poppins',
    fontSize: '28px',
    fontWeight: '500',
    lineHeight: '32px',
    padding: '12px 0 6px 0',
  },
  contentContainer: {
    width: '245px',
    color: '#000',
    fontFamily: 'Inter',
    fontSize: '12px',
    fontWeight: '400',
    lineHeight: '24px',
  },

  program: {
    float: 'left',
    margin: '0 10px 6.8px 0px',
    border: 'solid 2px #096761',

  },
  programImg: {
    background: '#fff',
    height: '249px',
  },
  studies: {
    float: 'left',
    border: 'solid 2px #096761',
  },

  contentRightBottom: {
    float: 'left',
    width: '604px',
    background: '#fff',
    backgroundImage: `url(${landingPageData.tile4.img})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
  },
  cases: {
    height: '436px',
    paddingLeft: '390px',
    paddingTop: '70px',
  },
  mountainMeadowButtonSection: {
    height: '44px',
    width: '184px',
    backgroundColor: '#335aab',
    marginTop: '32px',

  },
  blueButton: {
    height: '45px',
    background: '#096761',
    color: '#FFFFFF',
    fontFamily: 'Raleway',
    fontSize: '12px',
    fontWeight: '600',
    lineHeight: '25px',
    paddingLeft: '8px',
    textDecoration: 'none',
    letterSpacing: '1px',
  },
  blueButtonLeft: {
    float: 'left',
  },
  blueButtonRight: {
    float: 'left',
    lineHeight: '44px',
    marginLeft: '8px',
    fontFamily: 'Lato',
    fontSize: '14px',
    color: '#fff',
    textTransform: 'uppercase',
  },
  mountainMeadowContentHeader: {
    color: '#ffffff',
    fontFamily: 'Poppins',
    fontSize: '28px',
    fontWeight: '500',
    lineHeight: '32px',
    padding: '15px 0',
  },
  mountainMeadowContent: {
    width: '197px',
    color: '#ffffff',
    fontFamily: 'Inter',
    fontSize: '16px',
    lineHeight: '24px',
  },
  mountainMeadowIcon: {
    width: '20px',
    marginTop: '12px',
    marginLeft: '28px',
  },
  mountainMeadowButton: {
    padding: '15px 5px 0 0',
    height: '9px',
    width: '71px',
    color: '#FFFFFF',
    fontFamily: 'Raleway',
    fontSize: '12px',
    fontWeight: '600',
    lineHeight: '19.31px',
    textDecoration: 'none',
    marginLeft: '8px',
    letterSpacing: '1px',
    '&:hover': {
      color: '#ffffff',
    },
  },
  paddingBottom50: {
    paddingBottom: '50px',
  },
  paddingTop30: {
    paddingTop: '30px',
  },
  animationContainer: {
    position: 'relative',
    left: '33%',
  },

  paddingLeft2: {
    paddingLeft: '2px',
  },
  heroTextContainer: {
    position: 'relative',
    width: '669px',
    margin: 'auto',
    left: '321px',
  },
  heroTextWrapper: {
    paddingTop: '68px',
  },
  buttonText: {
    padding: '12px 30px',
    height: '40px',
  },
  landingContainerInner: {
    width: '955px',
    display: 'flex',
    justifyContent: 'center',
    background: '#e2fff6',
    paddingTop: '15px',
    paddingBottom: '17px',
  },
});
export default withStyles(styles, { withTheme: true })(LandingView);
