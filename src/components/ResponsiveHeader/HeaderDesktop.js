import React from 'react';
import styled from 'styled-components';
import { useLocation, useParams, useSearchParams } from 'react-router-dom';
import Logo from '../ResponsiveHeader/components/LogoDesktop'
import SearchBar from './components/SearchBarDesktop'
import NavBar from './components/NavbarDesktop';
import Cart from './components/CartDesktop';
import { USGovBannerData } from '../../bento/globalHeaderData';
import info from '../../assets/landing/info.jpeg';
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
  min-height: 46px;
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

    .bannerLeftWarning {
      width: 100%;
      text-align: left;
      display: flex;
      align-items: flex-start;
      flex-direction: column;
    }

    .bannerLeftWarning span {
      font-size: 16px;
      margin-left:28px;
    } 

    .bannerLeftWarning h3{
      margin-left: 1px;
      margin-bottom: 0px;
      margin-top: 2px;
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
  const url = window.location;
  const params = new URLSearchParams(window.location.search);

  const showLaunchBanner = params.get('show_launch_banner');
  return (
    <>
      <USGovBanner>
        {showLaunchBanner == "true" || showLaunchBanner?
         <>
          
           <div className ='USGovBannerInner'>
           <div className='bannerLeftWarning'>
             <div style={{display: 'flex', flexDirection:'row'}}>
             <img src={info} style={{width:20,height:20, borderRadius:150,marginRight:10}} />
              <h3>Government Funding Lapse</h3>
             </div>
         
             <span className='bannerText'>Because of a lapse in government funding, the information on this website may not be up to date, transactions submitted via the website may not be processed, and the agency may not be able to respond to inquiries until appropriations are enacted. The NIH Clinical Center (the research hospital of NIH) is open. For more details about its operating status, please visit  <a href="https://cc.nih.gov/">cc.nih.gov</a>. Updates regarding government operating status and resumption of normal operations can be found at <a href="https://opm.gov/">OPM.gov</a>.</span>
           </div>
   
           
         </div>
         <div className ='USGovBannerInner'>
          <div className='bannerLeft'>
            <img src={USGovBannerData.logo} alt={"US Flag logo"}></img>
            <span className='bannerText'>An official website of the United States government</span>
          </div>

          <div className='bannerRight'>
            {/*
            <span className='bannerButton'>Español</span>
            */}
          </div>
        </div>
         </>
        :
     <div> </div>
      }
      
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