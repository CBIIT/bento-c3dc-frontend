import React from 'react';
import {
  Grid,
  withStyles,
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import { cn } from 'bento-components';
import { landingPageData } from '../../bento/landingPageData';
import { Button } from '../../components/Wrappers/Wrappers';
import imgAbout from '../../assets/landing/About.png';
import imgTrial from '../../assets/landing/Trials.png';
import imgAccess from '../../assets/landing/RequestAccess.png';
import icon from '../../assets/landing/LP_ReadMore.svg';
import iconAbout from '../../assets/landing/LP_About_Fullarticle.Arrow.svg';
import texturebg from '../../assets/landing/BackgroundTexture-LP.jpg';
import casesImage from '../../assets/landing/Cases.png';
import hero from '../../assets/landing/hero.png';

const LandingController = ({ classes }) => (
  <div className={classes.page}>
    <div className={classes.container}>
      <div className={classes.hero}>
        <Grid container spacing={16} direction="row">
          <div className={classes.heroImage} />
          <div className={classes.heroTextContainer}>
            <div className={classes.heroTextWrapper}>
              <div className={classes.headerTitle}>
                { landingPageData.callToActionTitle }
              </div>
              <div className={classes.headerContent}>
                { landingPageData.callToActionDescription}
              </div>
              <div className={classes.headerButtonSection}>
                <Link to={landingPageData.callToActionLink} className={classes.headerLink}>
                  <Button className={classes.transparentButton} bgColor="neonBlue" color="white">
                    Search cases
                    <span className={classes.rightArrow}>
                      ▶
                    </span>
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </Grid>
      </div>
    </div>
    <div className={classes.container}>
      <Grid container spacing={16} direction="row" className={cn(classes.paddingTop30, classes.paddingLeft50)}>
        <div className={classes.bannerTexture}>
          Find and explore protocol 48 data
        </div>
      </Grid>
      <Grid container spacing={16} direction="row" className={cn(classes.paddingTop30, classes.paddingLeft50)}>
        <div className={classes.ButtonSection}>
          <Link to="/cases" className={classes.grayButton}>View data</Link>
        </div>
      </Grid>
    </div>
    <div className={classes.container}>
      <div className={classes.texture}>
        <Grid container spacing={16} direction="row" className={classes.landingContainer}>
          <div className={classes.contentLeft}>
            <div className={classes.about}>
              <div className={classes.aboutImageSection}>
                {/* <img src={imgAbout} className={classes.aboutImage} alt="GMB about" /> */}
                <img src={imgAbout} className={classes.aboutImage} alt="PCDC about" />
              </div>
              <div className={classes.PCDCWords}>
                About
                {' '}
                <br />
                {' '}
                Prostate Cancer Natural History (PCNH)
              </div>
              <div className={classes.aboutContent}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
                ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi
                ut aliquip ex ea commodo consequat.
              </div>
              <div className={classes.aboutButtonSection}>
                <div className={classes.aboutButtonLeft}>
                  <img src={iconAbout} className={classes.iconAbout} alt="PCDC about icon" />
                </div>
                <div className={classes.aboutButtonRight}>
                  <Link to="/purpose" className={classes.aboutButton}>EXPLORE</Link>
                </div>
              </div>
            </div>
          </div>
          <div className={classes.contentRight}>
            <div className={classes.contentRightTop}>
              <div className={classes.program}>
                <div className={classes.programImg}>
                  <img className={classes.image} src={imgTrial} alt="PCDC Programs" />
                </div>
                <div className={classes.content}>
                  <div className={classes.contentHeader}> Programs</div>
                  <div className={classes.contentContainer}>
                    View summaries of clinical programs within PCDC.
                  </div>

                </div>
                <div className={classes.yellowButton}>
                  <div className={classes.blueButtonLeft}>
                    <img className={classes.icon} src={icon} alt="PCDC about " />
                    {' '}
                  </div>
                  <div className={classes.blueButtonRight}>
                    <Link to="/programs" className={classes.blueButton}>READ MORE</Link>
                  </div>
                </div>
              </div>
              <div className={classes.studies}>
                <div className={classes.programImg}>
                  <img className={classes.image} src={imgAccess} alt="PCDC Request ACCESS" />
                </div>
                <div className={classes.content}>
                  <div className={classes.contentHeader}>Studies</div>
                  <div className={classes.contentContainer}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Nullam dictum at purus.
                  </div>
                </div>
                <div className={classes.brownButton}>
                  <div className={classes.blueButtonLeft}>
                    <img className={classes.icon} src={icon} alt="access PCDC studies" />
                    {' '}
                  </div>
                  <div className={classes.blueButtonRight}>
                    <Link to="/studies" className={classes.brownButton}>READ MORE</Link>
                  </div>
                </div>
              </div>

            </div>
            <div className={classes.contentRightBottom}>
              <div className={classes.cases}>
                <div className={classes.greyContentHeader}> Cases</div>
                <div className={classes.greyContent}>
                  Search all the studies and build cohorts from all the
                  Program within the PCDC. The data files from
                  these cohorts can then be analyzed in the Cloud Resources.
                </div>
                <div className={classes.greybuttonSection}>
                  <div className={classes.blueButtonLeft}>
                    <img className={classes.greyIcon} src={icon} alt="PCDC about " />
                    {' '}
                  </div>
                  <div className={classes.blueButtonRight}>
                    <Link to="/cases" className={classes.greybutton}>Explore</Link>
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
  page: {
    marginTop: '-47px',
  },
  heroImage: {
    width: '100%',
    height: '600px',
    backgroundRepeat: 'no-repeat',
    // backgroundSize: '100% 100%',
    background: `url(${hero})`,
    '@media (min-width: 1000px)': {
      backgroundRepeat: 'no-repeat',
      backgroundSize: '100% 100%',
      background: `url(${hero})`,
    },
    '@media (min-width: 1200px)': {
      backgroundRepeat: 'no-repeat',
      backgroundSize: '100% 100%',
      background: `url(${hero})`,
    },
    '@media (min-width: 1400px)': {
      backgroundRepeat: 'no-repeat',
      backgroundSize: '100% 100%',
      background: `url(${hero})`,
    },
    '@media (min-width: 1600px)': {
      backgroundRepeat: 'no-repeat',
      backgroundSize: '100% 100%',
      background: `url(${hero})`,
    },
    '@media (min-width: 1800px)': {
      backgroundRepeat: 'no-repeat',
      backgroundSize: '100% 100%',
      background: `url(${hero})`,
    },
    '@media (min-width: 2000px)': {
      backgroundRepeat: 'no-repeat',
      backgroundSize: '100% 100%',
      background: `url(${hero})`,
    },
  },
  texture: {
    backgroundSize: 'cover',
    backgroundImage: `url(${texturebg})`,
    backgroundRepeat: 'no-repeat',
    backgroundAttachment: 'fixed',
    padding: '120px 0 80px 0',
  },
  container: {
    fontFamily: 'Raleway, sans-serif',
    margin: '0 auto',

  },

  bannerTexture: {
    color: '#4898B4',
    fontFamily: 'Raleway',
    fontSize: '19px',
    fontWeight: '600',
    lineHeight: '60px',
    textAlign: 'center',
    margin: '0 auto',
    letterSpacing: '0.050pt',
    textTransform: 'uppercase',
    width: '869px',
  },
  ButtonSection: {
    margin: '0 auto -15px auto',
    background: '#505050',
    width: '179px',
    height: '47px',
    borderRadius: '50px',
    textAlign: 'center',
  },
  grayButton: {
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
    paddingTop: '94px',
    fontFamily: 'Inter Light, Raleway, sans-serif',
    fontSize: '36px',
    fontWeight: '500',
    lineHeight: '35px',
    color: '#0F253A',
    letterSpacing: '-0px',
    textTransform: 'uppercase',
  },
  paddingLeft50: {
    paddingLeft: '50px',
  },
  headerContent: {
    color: '#3390B6',
    fontFamily: 'Lato, Raleway',
    fontSize: '16px',
    fontWeight: '500',
    lineHeight: '27px',
    marginTop: '16px',
    marginBottom: '26px',
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
    width: '300px',
    padding: '14px',
  },
  aboutImageSection: {
  },
  PCDCWords: {
    height: '168px',
    background: '#0B2731',
    color: '#FFFFFF',
    fontSize: '26px',
    textTransform: 'uppercase',
    lineHeight: '29px',
    padding: '24px 75px 26px 26px',
    fontFamily: 'Oswald',
  },
  landingContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: '15px',
  },
  contentLeft: {
    float: 'left',
    paddingRight: '10px',
  },
  about: {
    width: '300px',
    backgroundColor: '#76C4E4',
  },
  image: {
    width: '293px',
    height: '251px',
  },
  aboutContent: {
    background: '#76C4E4',
    minHeight: '372px',
    width: '300px',
    padding: '30px 30px 32px 30px',
    color: '#fff',
    fontFamily: '"Open Sans"',
    fontSize: '14px',
    lineHeight: '22px',
  },
  aboutButtonSection: {
    background: '#76C4E4',
    height: '71px',
  },
  imgIconAbout: {
    width: '49px',
  },
  aboutButtonLeft: {
    float: 'left',
    background: '#0F253A',
    height: '45px',
    width: '48px',
  },
  aboutButtonRight: {
    background: '#16688A',
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
  },

  content: {
    width: '100%',
    background: '#fff',
    paddingLeft: '30px',
    paddingTop: '6px',
    minHeight: '130px',
  },
  contentHeader: {
    color: '#20506A',
    fontFamily: 'Oswald',
    fontSize: '26px',
    fontWeight: '500',
    lineHeight: '27px',
    padding: '10px 0',
    textTransform: 'uppercase',
  },
  contentContainer: {
    width: '215px',
    color: '#010101',
    fontFamily: 'Lato',
    fontSize: '15px',
    lineHeight: '22px',
    paddingLeft: '2px',
    paddingBottom: '10px',
  },

  program: {
    float: 'left',
    padding: '0 10px 8px 0px',
  },
  programImg: {
    background: '#fff',
  },
  studies: {
    float: 'left',
  },

  contentRightBottom: {
    float: 'left',
    width: '597px',
    background: '#fff',
    backgroundImage: `url(${casesImage})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
  },
  cases: {
    height: '438px',
    paddingLeft: '370px',
    paddingTop: '70px',
  },
  greybuttonSection: {
    height: '46px',
    width: '176px',
    backgroundColor: '#20506A',
    marginTop: '20px',

  },
  blueButton: {
    height: '45px',
    background: '#E5A553',
    color: '#FFFFFF',
    fontFamily: 'Raleway',
    fontSize: '12px',
    fontWeight: '600',
    lineHeight: '25px',
    paddingLeft: '8px',
    textDecoration: 'none',
  },
  yellowButton: {
    height: '45px',
    background: '#E5A553',
    color: '#FFFFFF',
    fontFamily: 'Raleway',
    fontSize: '12px',
    fontWeight: '600',
    lineHeight: '25px',
    paddingLeft: '8px',
    textDecoration: 'none',
  },
  brownButton: {
    height: '45px',
    background: '#8C7D6B',
    color: '#FFFFFF',
    fontFamily: 'Raleway',
    fontSize: '12px',
    fontWeight: '600',
    lineHeight: '25px',
    paddingLeft: '8px',
    textDecoration: 'none',
  },
  blueButtonLeft: {
    float: 'left',
  },
  blueButtonRight: {
    float: 'left',
    lineHeight: '47px',
    color: '#fff',
    textTransform: 'uppercase',
  },
  greyContentHeader: {
    color: '#20506A',
    fontFamily: 'Oswald',
    fontSize: '31px',
    fontWeight: '500',
    lineHeight: '32px',
    padding: '15px 0',
    textTransform: 'uppercase',
  },
  greyContent: {
    height: '173px',
    width: '166px',
    color: '#010101',
    fontFamily: 'Lato',
    fontSize: '15px',
    lineHeight: '22px',
  },
  greyIcon: {
    width: '20px',
    marginTop: '15px',
    marginLeft: '28px',
  },
  greybutton: {
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
    height: '800px',
    maxHeight: '800px',
    overflow: 'hidden',
  },

  paddingLeft2: {
    paddingLeft: '2px',
  },

  heroTextContainer: {
    position: 'absolute',
    width: '400px',
    margin: 'auto',
    left: '0px',
    right: 0,
    '@media (min-width: 900px)': {
      width: '906px',
    },
  },
  heroTextWrapper: {
    width: '360px',
  },
  headerLink: {
    textDecoration: 'none',
  },
  transparentButton: {
    padding: '12px 15px',
    height: '40px',
    color: '#505050 !important',
    backgroundColor: '#ffffff00 !important',
    fontSize: '16px',
    borderBottom: ' 2px #79C5E4 solid',
    borderRadius: '0px',
  },
  rightArrow: {
    marginLeft: '5px',
    fontSize: '16px',
    color: '#76C4E4',
  },

});
export default withStyles(styles, { withTheme: true })(LandingController);
