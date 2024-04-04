import React from 'react';
import styled from 'styled-components';
import { dataModelData } from '../../bento/dataModelData';
import sideTopImage from '../../assets/dataModel/sideTopImage.jpeg';
import RectangleImage from '../../assets/dataModel/RectangleImage.jpeg';
import dataModel from '../../assets/dataModel/dataModel.svg';
import ReactHtmlParser from 'html-react-parser';

const DataModelContainer = styled.div`
  margin: 0 auto;

  .dataModeHeaderText {
    font-family: Poppins;
    font-weight: 500;
    font-size: 35px;
    line-height: 45px;
    height: 187px;
    letter-spacing: 0.15px;
    color: #FFFFFF;
    background-color: #007166BF;
    background-blend-mode: normal;
    text-align: center;
    background-image: url(${RectangleImage});
    background-size: cover;
    display: flex;
    justify-content: center;
    align-items: center;
    }
  .dataModelBody {
    display: flex;
    justify-content: center;
    background: white;
    background-size: cover;  /* Ensures the background image covers the entire container */
    background-repeat: no-repeat;  /* Disable repeating */
    background-position: center;  /* Center the image */
    background-width: 100%;
    padding-bottom: 100px;
  }
  .dataModelText {
    font-family: Inter;
    font-weight: 400;
    font-size: 16px;
    line-height: 24px;
    width: 680px;
    margin-top: 67px;
    margin-left: 44px;

  }
  .dataModelImages {
    width: 343px;
    margin-left: 44px;
    display: flex;
    height:600px;
    margin-top: 70px;
    flex-direction: column;
  }

  .dataModelImages img{
    height: 500px;
    object-fit: cover;
  }


  .upperImg {
    margin-top: 30px;
    margin-bottom: 23px;
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

const DataModel = () => {
  return (
    <DataModelContainer>
      <div className='dataModelHeader'>
        <div className='dataModeHeaderText'>C3DC Data Model </div>
      </div>
      <div className='dataModelBody'>
        <div className='dataModelText'>
          <div className='introParagraph'>{ReactHtmlParser(dataModelData.introParagraph)}</div>
          <div className='secondParagraph sectionStart'> {ReactHtmlParser(dataModelData.secondParagraph)}</div>

          <img style={{ marginTop: 60 }} src={dataModel} alt="data model image" />

        </div>
        <div className='dataModelImages'>
          <img src={sideTopImage} alt="dataModel_img" />
        </div>
      </div>
    </DataModelContainer>
  )
};
export default DataModel;