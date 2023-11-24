import React from 'react';
import styled from 'styled-components';
import HeaderDesktop from './HeaderDesktop';
import HeaderTablet from './HeaderTablet';
import HeaderMobile from './HeaderMobile';

const HeaderContainer = styled.div`
 @media (min-width: 1024px) {
    .desktop {
      display: block;
    }
    .tablet {
      display: none;
    }
    .mobile {
      display: none;
    }
  }

  @media (min-width:768px) and (max-width: 1023px) {
    .desktop {
      display: none;
    }
    .tablet {
      display: block;
    }
    .mobile {
      display: none;
    }
  }

  @media (min-width: 375px) and (max-width: 767px) {
    .desktop {
      display: none;
    }
    .tablet {
      display: none;
    }
    .mobile {
      display: block;
    }
  }

  @media (max-width: 375px) {
    .desktop {
      display: none;
    }
    .tablet {
      display: none;
    }
    .mobile {
      display: block;
    }
  }
`;

const Header = () => {
  return (
    <HeaderContainer>
      <div className="desktop">
        <HeaderDesktop />
      </div>
      <div className="tablet">
        <HeaderTablet />
      </div>
      <div className="mobile">
        <HeaderMobile />
      </div>
    </HeaderContainer>
  )
};

export default Header;
