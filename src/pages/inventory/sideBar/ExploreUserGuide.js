import React, { useState } from 'react';
import styled from 'styled-components';
import {
  Modal, Box, Button, IconButton, withStyles,
} from '@material-ui/core';
import styles from './ExploreUserGuideStyle';
import userguideIcon from '../../../assets/icons/Explore_User_Guide_Icon.svg';
import userguideIconWhite from '../../../assets/icons/Explore_User_Guide_Icon_White.svg';
import CloseIcon from '@material-ui/icons/Close';

// Section components
import OverviewSection from './ExploreUserGuide/OverviewSection';
import FindDataSection from './ExploreUserGuide/FindDataSection';
import CohortSection from './ExploreUserGuide/CohortSection';
import StudyMetadataSection from './ExploreUserGuide/StudyMetadataSection';
import AnalyzingCohortsSection from './ExploreUserGuide/AnalyzingCohortsSection';
import FullGuideSection from './ExploreUserGuide/FullGuideSection';
import ContactUsSection from './ExploreUserGuide/ContactUsSection';

const UseGuideButtonContainer = styled.div`
  .buttonContainer {
    display: flex;
    margin-left: 12.5px;
    margin-top: 15px;
  }

  .buttonText {
    color: #FFFFFF;
    font-weight: 400;
    font-family: 'Open Sans';
    font-size: 14px;
    line-height: 30px;
    margin-left: 8px;
  }
`;

const ExploreUserGuide = ({ classes }) => {
  const [open, setOpen] = useState(false);
  const [isHover, setIsHover] = useState(false);
  const [selectedNavTitle, setSelectedNavTitle] = useState('');

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const titleList = [
    'Overview',
    'Finding Participants, Studies, Samples, and Files',
    'Downloading Metadata from the Studies tab',
    'Creating and managing cohorts',
    'Analyzing Cohorts',
    'Contact Us',
    'Full User Guide',
  ];

  const handleClickEvent = (event) => {
    const id = event.target.getAttribute('name');
    setSelectedNavTitle(id);
    const contentElement = document.getElementById('UserGuideContentSection');
    const element = document.getElementById(id);
    if (contentElement && element) {
      contentElement.scrollTo({
        top: element.offsetTop - 40,
        behavior: 'smooth',
      });
    }
  };

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
          <img src={isHover ? userguideIcon : userguideIconWhite} alt="user guide icon" />
        </Button>
        <div className='buttonText'>Explore the C3DC User Guide</div>
      </div>

      <Modal open={open} onClose={handleClose}>
        <Box style={modalBody}>
          <IconButton aria-label="close" onClick={handleClose} className={classes.closeButton}>
            <CloseIcon fontSize="small" />
          </IconButton>
          <div className={classes.paperArea}>
            <div className={classes.navSection}>
              <div className={classes.navTitle}>USER GUIDE TOPICS</div>
              {titleList.map((titleItem, index) => {
                const key = `topic_${index}`;
                return (
                  <div
                    key={key}
                    name={titleItem}
                    className={selectedNavTitle === titleItem ? classes.navTopicItemSelected : classes.navTopicItem}
                    onClick={handleClickEvent}
                  >
                    {titleItem}
                  </div>
                );
              })}
            </div>

            <div id='UserGuideContentSection' className={classes.contentSection}>
              <div className={classes.contentList}>
                <div className={classes.contentTitle}>C3DC Explore Dashboard & Cohort(s) Analyzer</div>
                <OverviewSection classes={classes} />
                <FindDataSection classes={classes} />
                <StudyMetadataSection classes={classes} />
                <CohortSection classes={classes} />
                <AnalyzingCohortsSection classes={classes} />
                <ContactUsSection classes={classes} />
                <FullGuideSection classes={classes} />
              </div>
            </div>
          </div>
        </Box>
      </Modal>
    </UseGuideButtonContainer>
  );
};

export default withStyles(styles)(ExploreUserGuide);
