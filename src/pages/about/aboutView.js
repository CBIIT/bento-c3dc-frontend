import React from 'react';
import styled from 'styled-components';
import {aboutData} from '../../bento/aboutPageData';
import aboutImg from '../../assets/about/About_Img_Large.png';
import exportIcon from '../../assets/about/Export_Icon.svg';
import ReactHtmlParser from 'html-react-parser';

const AboutContainer = styled.div`
  margin: 0 auto;

  .aboutHeader {
    font-family: poppins;
    font-weight: 600;
    font-size: 35px;
    color: #206165;
    margin: 48px 0;
    text-align: center;
  }
  .aboutBody {
    font-family: Inter;
    font-weight: 400;
    font-size: 16px;
    color: #000000;
    margin: 0 50px;
    margin-bottom: 150px;
    letter-spacing: 0.02em;
    line-height: 24px;
  }

  .upperContainer {
    display: flex;
  }

  .aboutSubtitle {
    font-family: 'Poppins';
    font-weight: 400;
    font-size: 21px;
    color: #007A85;
  }

  .textParagraph {
    margin: 25px 0 50px 0;
  }

  .upperImg {
    width: 432px;
    height: 416px;
    margin-left: 41px;
    border: 2.5px solid #4BBFC6;
    border-radius: 0 20px;
    object-fit: cover;
  }

  .aboutLink {
    color: #455299;
    font-family: poppins;
    font-weight: 600;
    padding-right: 20px;
    background: url(${exportIcon}) right center no-repeat;
    text-underline-offset: 4px;
  }

  @media (max-width: 1364px) {
    .upperImg {
      width: 300px;
      height: 353px;
      margin-left: 37px;
    }
    .secondParagraph {
      display: none;
    }
  }

  @media (max-width: 767px) {
    .aboutHeader {
      position: relative;
      background-image: url(${aboutImg});
      height: 406px;
      margin: 0 0 32px 0;
    }
    .aboutHeaderText {
      position: absolute;
      top: 34%;
      left: 0;
      width: 100%;
      color: #FFFFFF;
      background: rgba(0, 95, 103, 0.85);
      height: 141px;
      line-height: 141px;
    }
    .upperImg {
      display: none;
    }
    .aboutBody {
      margin: 0 6.5% 150px 6.5%;
    }
  }

  @media (min-width: 1365px) {
    .aboutBody {
      width: 1265px;
      margin: 0 auto 150px auto;
    }
    .lowerContainer {
      display: none;
    }
  }
`;

const AboutView = () => {
  return (
    <AboutContainer>
      <div className='aboutHeader'>
        <div className='aboutHeaderText'>About</div>
      </div>
      <div className='aboutBody'>
        <div className='upperContainer'>
          <div className='upperContentContainer'>
            <div className='aboutSubtitle'>{aboutData.upperTitle}</div>
            <div className='textParagraph'>{ReactHtmlParser(aboutData.upperText)}</div>
            <div className='secondParagraph'>
              <div className='aboutSubtitle'>{aboutData.lowerTitle}</div>
              <div className='textParagraph'>{ReactHtmlParser(aboutData.lowerText)}</div>
            </div>
          </div>
          <img className='upperImg' src={aboutImg} alt="about_img" />
        </div>
        <div className='lowerContainer'>
          <div className='aboutSubtitle'>{aboutData.lowerTitle}</div>
          <div className='textParagraph'>{ReactHtmlParser(aboutData.lowerText)}</div>
        </div>
      </div>
    </AboutContainer>
  )
};
export default AboutView;
