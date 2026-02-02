import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { headerData } from '../../../bento/globalHeaderData';

const LogoArea = styled.div`
    display: flex;

    .logoContainer {
      margin-top: 32px;
    }

    .imgContainer {
        width: 312px;
        height: 37px;
        background-image: url(${headerData.globalHeaderLogoSmall});
        background-size: contain;
        background-repeat: no-repeat;
    }
`;


const Logo = () => {
  return (
    <LogoArea>
        <NavLink className='logoContainer' to={headerData.globalHeaderLogoLink} aria-label="logoPortal">
            <div className='imgContainer' />
        </NavLink>
    </LogoArea>
  );
};

export default Logo;