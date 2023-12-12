import React from 'react';
import styled from 'styled-components';
import { useLocation } from 'react-router-dom';
import Logo from '../ResponsiveHeader/components/LogoDesktop'
import SearchBar from './components/SearchBarDesktop'
import NavBar from './components/NavbarDesktop';
import Cart from './components/CartDesktop';
import { USGovBannerData } from '../../bento/globalHeaderData';

const HeaderBanner = styled.div`
  width: 100%;
`;

const HeaderContainer = styled.div`
    margin: 0 auto;
    padding-left: 32px;
    max-width: 1420px;
    display: flex;

    .searchBarArea {
        padding: 5px 32px 0 0;
    }

    .headerLowerContainer {
        display: flex;
        margin-left: auto;
    }

    .searchBarArea {
      margin-top: 23px;
    }
`;

const NavBarContainer = styled.div`
  position: relative;
`;
const USGovBanner = styled.div`
  background-color: #f0f0f0;
  height: 46px;
  width: 100%;
  align-items: center;
    .USGovBannerInner {
      padding: 8px 32px;
      display: flex;
      align-items: center;
      height: 100%;
      margin: 0 auto;
      max-width: 1420px;
    }

    img {
      height: 11px;
      width: 16px;
    }

    .bannerLeft {
        width: 50%;
        text-align: left;
        display: flex;
        align-items: center;
    }
    .bannerText {
        font-family: 'Open Sans';
        font-size: 12px;
        font-weight: 400;
        color: #000000;
        margin-left: 15px;
    }
    .bannerRight {
        width: 50%;
        text-align: right;
    .bannerButton {
        display: inline-block;
        background-color: #3b7f84;
        width: 72px;
        height: 30px;
        border-radius: 5px; 
        font-family: 'Open Sans', sans-serif;
        font-size: 15px;
        font-weight: 700;
        color: white;
        letter-spacing: 0em;
        text-align: center;
        line-height: 30px; 
        cursor: pointer;
    }
  }

`;

const Header = () => {
  const path = useLocation().pathname;

  return (
    <>
      <USGovBanner>
        <div className ='USGovBannerInner'>
          <div className='bannerLeft'>
            <img src={USGovBannerData.logo} alt={"US Flag logo"}></img>
            <span className='bannerText'>An official website of the United States government</span>
          </div>

          <div className='bannerRight'>
            <span className='bannerButton'>Español</span>
          </div>
        </div>
      </USGovBanner>
      <HeaderBanner role="banner">
        <HeaderContainer>
          <Logo />
          <div className='headerLowerContainer'>
            { path !== "/sitesearch" && <div className='searchBarArea'><SearchBar /></div> }
          </div>
        </HeaderContainer>
        <NavBarContainer>
          <NavBar />
          <Cart />
        </NavBarContainer>
      </HeaderBanner>
    </>
  );
};

export default Header;
