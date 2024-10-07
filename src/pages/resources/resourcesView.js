import React from 'react';
import styled from 'styled-components';
import { resourceIntroduction, availableResources } from '../../bento/resourcesPageData.js';
import resourcesBanner from '../../assets/resources/Resources_Banner.png';
import resourcesImg from '../../assets/resources/Resources_Img.png';
import exportIcon from '../../assets/about/Export_Icon.svg';
import ReactHtmlParser from 'html-react-parser';

const ResourcesContainer = styled.div`
  margin: 0 auto;

  .resourcesHeader {
    font-family: poppins;
    font-weight: 600;
    font-size: 35px;
    color: #FFFFFF;
    height: 160px;
    text-align: center;
    align-items: center;
    justify-content: center;
    display: flex;
    margin-bottom: 32px;
    background-image: url(${resourcesBanner});
    background-size: cover;
  }
  
  .resourceBody {
    font-family: Inter;
    font-weight: 400;
    font-size: 16px;
    color: #000000;
    margin: 0 226px;
    margin-bottom: 150px;
    letter-spacing: 0.02em;
    line-height: 24px;
  }

  .upperContainer {
    display: flex;
  }

  .introTitle {
    font-family: 'Poppins';
    font-weight: 300;
    font-size: 26px;
    color: #008478;
    text-transform: uppercase;
    margin-bottom: 20px;
  }

  .resourceSubtitle {
    font-family: 'Inter';
    font-weight: 700;
    font-size: 16px;
    color: #343434;
    margin-top: 40px;
  }

  .textParagraph {
    margin-top: 5px;
    font-family: 'Inter';
    font-weight: 400;
    font-size: 16px;
  }

  .upperImg {
    display: block;
    max-width: 331px;
    max-height: 466px;
    margin-left: 41px;
    object-fit: cover;
  }

  .resourceLink {
    color: #3156A0;
    font-family: Inter;
    font-weight: 500;
    padding-right: 20px;
    background: url(${exportIcon}) right center no-repeat;
    text-underline-offset: 4px;
  }
  .linkBlock{
    margin-top: 0px;
  }

`;

const ResourcesView = () => {
  return (
    <ResourcesContainer>
      <div className='resourcesHeader'>
        <div className='resourcesHeaderText'>Resources</div>
      </div>
      <div className='resourceBody'>
        <div className='upperContainer'>
          <div className='upperContentContainer'>
          <div className='introTitle'>{resourceIntroduction.title}</div>
          <div className='textParagraph'>{resourceIntroduction.text}</div>
            {
              availableResources.map((data, index) => {
                const key = `resource_${index}`;
                return (
                  <div id={data.id} className='resourceListItem' key={key} >
                  <div className='resourceSubtitle'>
                  <span>{data.title}</span>
                    {data.urlInTitle &&
                      <>
                        <span> {' '} </span>
                        <a href={data.url}  target="_blank" rel="noopener noreferrer"><span className='resourceLink'>{data.url}</span></a>
                      </>
                    }
                  </div>
                    <div className='textParagraph'>{ReactHtmlParser(data.text)}</div>
                    {!data.urlInTitle &&
                      <a className='linkBlock' href={data.url}  target="_blank" rel="noopener noreferrer"><span className='resourceLink'>{data.url}</span></a>
                    }
                    {data.postParagraph && <div className='textParagraph'>{ReactHtmlParser(data.postParagraph)}</div>}
                  </div>
                )
              })
            }
          </div>
          <img className='upperImg' src={resourcesImg} alt="resource_img" />
        </div>
      </div>
    </ResourcesContainer>
  )
};
export default ResourcesView;
