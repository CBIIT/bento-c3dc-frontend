import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { headerData } from '../../../bento/globalHeaderData';

const LogoArea = styled.div`
    display: flex;

    img {
      width: 455px;
      height: 56px;
    }

    .logoContainer {
      margin-top: 20px;
    }

    .imgContainer {
        width: 465px;
        height: 47px;
        background-image: url(${headerData.globalHeaderLogo});
        background-size: contain;
    }
`;


const Logo = () => {
  return (
    <LogoArea>
        <NavLink className='logoContainer' to={headerData.globalHeaderLogoLink} aria-label="logoPortal">
            <div className='imgContainer' />
            {/* <img src={headerData.globalHeaderLogo} alt={headerData.globalHeaderLogoAltText} /> */}
        </NavLink>
    </LogoArea>
  );
};

export default Logo;