import React, {useState, useEffect} from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import Logo from '../ResponsiveHeader/components/LogoTablet';
import SearchBar from '../ResponsiveHeader/components/SearchBarTablet';
import menuClearIcon from '../../assets/header/Menu_Cancel_Icon.svg';
import rightArrowIcon from '../../assets/header/Right_Arrow.svg';
import leftArrowIcon from '../../assets/header/Left_Arrow.svg';
import { navMobileList, navbarSublists, navBarCartData } from '../../bento/globalHeaderData'
import { USGovBannerData } from '../../bento/globalHeaderData';

const HeaderBanner = styled.div`
  width: 100%;
`;

const HeaderContainer = styled.div`
    margin: 0 auto;
    padding-left: 16px;
    box-shadow: -0.1px 6px 9px -6px rgba(0, 0, 0, 0.5);

    .searchBarArea {
        padding: 0 16px 0 0;
        margin-left: auto;
    }

    .headerLowerContainer {
        display: flex;
        margin: 16px 0 0 0;
        height: 58px;
    }

    .menuButton {
        width: 89px;
        height: 45px;
        background: #1F4671;
        border-radius: 5px;
        font-family: 'Open Sans';
        font-weight: 700;
        font-size: 20px;
        line-height: 45px;
        color: #FFFFFF;
        text-align: center;
    }

    .menuButton:hover {
        cursor: pointer;
    }

    // .menuButton:active {
    //     outline: 0.25rem solid #2491ff;
    //     outline-offset: 0.25rem
    // }
`;

const NavMobileContainer = styled.div`
    // display: none;
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    width: 100%;
    z-index: 1200;
`;

const MenuArea = styled.div`
    height: 100%;
    width: 100%;
    display: flex;

    .menuContainer {
        background: #ffffff;
        width: 385px;
        height: 100%;
        padding: 21px 16px;
    }

    .greyContainer {
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,.2);
    }

    .closeIcon {
        height: 14px;
        margin-bottom: 29px;
    }

    .closeIconImg {
        float: right;
    }

    .closeIconImg:hover {
        cursor: pointer;
    }

    // .closeIconImg:active {
    //     outline: 0.25rem solid #2491ff;
    //     outline-offset: 0.5rem
    // }

    .backButton {
        font-family: Open Sans;
        font-weight: 600;
        font-size: 16px;
        line-height: 16px;
        color: #007BBD;
        padding-left: 16px;
        background: url(${leftArrowIcon}) left no-repeat;
    }

    .backButton:hover {
        cursor: pointer;
    }

    // .backButton:active {
    //     outline: 0.25rem solid #2491ff;
    //     outline-offset: 0.5rem;
    // }

    .navMobileContainer {
        padding: 24px 0 0 0;

        a {
            text-decoration: none;
            color: #3D4551;
        }
    }

    .navMobileItem {
        width: 353px;
        padding: 8px 24px 8px 16px;
        font-family: Open Sans;
        font-weight: 400;
        font-size: 16px;
        line-height: 16px;
        border-top: 1px solid #F0F0F0;
        border-bottom: 1px solid #F0F0F0;
        color: #3D4551;
    }

    .navMobileItem:hover {
        background-color: #f9f9f7;
    }

    // .navMobileItem:active {
    //     outline: 0.25rem solid #2491ff;
    // }

    .SubItem {
        padding-left: 24px;
    }

    .clickable {
        background: url(${rightArrowIcon}) 90% no-repeat;
    }

    .clickable {
        cursor: pointer;
    }
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
  const [clickTitle, setClickTitle] = useState('');
  const [navMobileDisplay, setNavMobileDisplay] = useState('none');
  const [navbarMobileList, setNavbarMobileList] = useState(navMobileList);

  const clickNavItem = (e) => {
    const ctitle = e.target.innerText;
    setClickTitle(ctitle);
  }

  useEffect(() => {
    if (clickTitle && navbarSublists[clickTitle]) {
      setNavbarMobileList([...navbarSublists[clickTitle]].sort((a, b) => a.name.localeCompare(b.name)));
    } else {
      setNavbarMobileList(navMobileList);
    }
  }, [clickTitle]);

  return (
    <>
      <USGovBanner>
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
      </USGovBanner>
      <HeaderBanner role="banner">
        <HeaderContainer>
          <Logo />
          <div className='headerLowerContainer'>
            <div className='menuButton' onClick={() => setNavMobileDisplay('block')}>Menu</div>
            { path !== "/sitesearch" && <div className='searchBarArea'><SearchBar /></div> }
          </div>
        </HeaderContainer>
      </HeaderBanner>
      <NavMobileContainer style={{display: navMobileDisplay}}>
        <MenuArea>
            <div className='menuContainer'>
                <div className='closeIcon' onClick={() => setNavMobileDisplay('none')}><img className='closeIconImg' src={menuClearIcon} alt="menuClearButton" /></div>
                { navbarMobileList !== navMobileList && <div className='backButton' onClick={() => setClickTitle('')}>Main Menu</div>}
                <div className='navMobileContainer'>
                { navbarMobileList !== navMobileList && <div className='navMobileItem'>{clickTitle}</div>}
                    {
                        navbarMobileList.map((navMobileItem, idx) => {
                            const mobilekey = `mobile_${idx}`;
                            return (
                                <>
                                    {navMobileItem.className === 'navMobileItem' && <NavLink to={navMobileItem.link} state={{ navigationType: 'main_menu' }} key={mobilekey} onClick={() => setNavMobileDisplay('none')}><div className='navMobileItem'>{navMobileItem.name}</div></NavLink>}
                                    {navMobileItem.className === 'navMobileItem clickable' && <div key={mobilekey} className='navMobileItem clickable' onClick={clickNavItem}>{navMobileItem.name}</div>}
                                    {navMobileItem.className === 'navMobileSubItem' && <a href={navMobileItem.link} target={navMobileItem.externalLink ? "_blank" : ""} rel="noopener noreferrer" key={mobilekey}><div className='navMobileItem SubItem' onClick={() => setNavMobileDisplay('none')}>{navMobileItem.name}</div></a>}
                                    {navMobileItem.className === 'cart' && <NavLink to={navBarCartData.cartLink} key='cart_key' onClick={() => setNavMobileDisplay('none')}><div className='navMobileItem' style={{fontWeight: '600'}}>MY FILES</div></NavLink>}
                                </>
                            )
                        })
                    }
                </div>
            </div>
            <div className='greyContainer' onClick={() => setNavMobileDisplay('none')}/>
        </MenuArea>
      </NavMobileContainer>
    </>
  );
};

export default Header;
