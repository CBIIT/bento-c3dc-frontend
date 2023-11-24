import React from 'react';
import styled from 'styled-components';
import { useLocation } from 'react-router-dom';
import Logo from '../ResponsiveHeader/components/LogoDesktop'
import SearchBar from './components/SearchBarDesktop'
import NavBar from './components/NavbarDesktop';
import Cart from './components/CartDesktop';

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

const Header = () => {
  const path = useLocation().pathname;

  return (
    <>
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
