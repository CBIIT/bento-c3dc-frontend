import React from 'react';
import styled from 'styled-components';
import errImg from '../../assets/error/PageNotFound.png';
import { errorData } from '../../bento/pageNotFoundData';

const ErrorContainer = styled.div`
    width: 1440px;
    margin: 0 auto;
    display: flex;

    .picContainer {
      margin: 88px 99px 103px 0;
      width: 676px;
      height: 545px;
      background-image: url(${errImg});
    }

    .textContainer {
      margin-top: 203px;
      text-align: center;
    }

    .titleFirst {
      font-family: poppins;
      font-weight: 700;
      font-size: 40px;
      color: #05555C;
      margin-bottom: 28px;
    }

    .titleSecond {
      font-family: poppins;
      font-weight: 500;
      font-size: 20px;
      color: #05555C;
    }

    .returnButton {
      display: block;
      margin: 50px auto 0 auto;
      width: 176px;
      height: 57px;
      font-family: poppins;
      font-weight: 600;
      font-size: 16px;
      line-height: 57px;
      text-transform: uppercase;
      color: #FFFFFF;
      background: #05555C;
      border-radius: 5px;
      text-align: center;
      text-decoration: none;
    }
`;

const Error = () => {
  return (
    <ErrorContainer>
      <div className='picContainer'></div>
      <div className='textContainer'>
        <div className='titleFirst'>{errorData.titleFirst}</div>
        <div className='titleSecond'>
          <div>{errorData.titleSecond}</div>
        </div>
        <div>
           <a className='returnButton' href='/'>{errorData.buttonTitle}</a>
        </div>
      </div>
    </ErrorContainer>
  )
};

export default Error;
