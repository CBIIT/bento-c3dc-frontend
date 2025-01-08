import React from 'react';
import styled from 'styled-components';
import {aboutData} from '../../bento/aboutPageData';
import aboutImage1 from '../../assets/about/About_Img_1.png';
import aboutImage2 from '../../assets/about/About_Img_2.png';
import aboutBackground from '../../assets/about/About_Background.png';
import exportIcon from '../../assets/about/Export_Icon.svg';
import ReactHtmlParser from 'html-react-parser';

const AboutContainer = styled.div`
  margin: 0 auto;

  .aboutHeader {
    font-family: Poppins;
    font-weight: 500;
    font-size: 35px;
    line-height: 45px;
    height: 187px;
    letter-spacing: 0.15px;
    color: #FFFFFF;
    text-align: center;
    background-color: #009485;
    display: flex;
    justify-content: center;
    align-items: center;
    }
  .aboutBody {
    display: flex;
    justify-content: center;
    background-image: url(${aboutBackground});
    background-size: cover;  /* Ensures the background image covers the entire container */
    background-repeat: no-repeat;  /* Disable repeating */
    background-position: center;  /* Center the image */
    background-width: 100%;
    padding-bottom: 100px;
  }
  .aboutText {
    font-family: Inter;
    font-weight: 400;
    font-size: 16px;
    line-height: 24px;
    width: 680px;
    margin-top: 67px;
    margin-left: 44px;

  }
  .aboutImages {
    width: 343px;
    height: 100%;
    margin-left: 44px;
    display: flex;
    flex-direction: column;
  }


  .upperImg {
    margin-top: 30px;
    margin-bottom: 23px;
  }

  .aboutLink {
    color: #3156a0;
    font-family: Inter;
    font-weight: 400;
    line-height: 24px;
    padding-right: 20px;
    background: url(${exportIcon}) right center no-repeat;
    text-underline-offset: 4px;
  }
  .indent {
    padding-left: 40px;
  }
  .doubleIndent {
    padding-left: 40px;
  }
  .itemList {
    margin: 0;
  }
  .listAlightment {
    padding-left: 27px;
  }
  .sectionTitle{
    font-weight: bold;
  }
  .sectionStart {
    margin-top: 16px;
  }
  .imageMargin {
    margin-right: -387px;
  }

`;

const AboutView = () => {
  return (
    <AboutContainer>
      <div className='aboutHeader'>
        <div className='aboutHeaderText'>About the Childhood Cancer <br/>Clinical Data Commons</div>
      </div>
      <div className='aboutBody'>
        <div className='aboutText'>
          <div className='introParagraph'>{ReactHtmlParser(aboutData.introParagraph)}</div>
          <div className='secondParagraph sectionStart'> {ReactHtmlParser(aboutData.secondParagraph)}</div>
          <div className='thirdParagraph sectionStart'>{ReactHtmlParser(aboutData.thirdParagraph)}</div>
          <div className='lastParagraph sectionStart imageMargin'>{ReactHtmlParser(aboutData.lastParagraph)}</div>
        </div>
        <div className='aboutImages'>
          <img className='upperImg' src={aboutImage1} alt="about_img" />
          <img className='lowerImg' src={aboutImage2} alt="about_img" />
        </div>
      </div>
    </AboutContainer>
  )
};
export default AboutView;