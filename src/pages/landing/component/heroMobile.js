import React, { useEffect } from 'react';
import styled from 'styled-components';
import usePageVisibility from "./PageVisibility";
import { carouselList } from '../../../bento/landingPageData';
import exportIconText from '../../../assets/landing/Export_Icon_White.svg';

let timer = null;

const HeroMobileSection = styled.div`
  position: relative;
  z-index: 5;
  height: 650px;

  .backgroundContainer {
    padding: 46px calc(50vw - 405px);
    height: 476px;
    border-radius: 0 0 0 40px;
    background: linear-gradient(180deg, rgba(17, 196, 212, 0.4) 0%, rgba(55, 210, 176, 0.392465) 37.67%, rgba(120, 233, 117, 0.38) 100%), linear-gradient(0deg, #56B0B8, #56B0B8), #2ADEC7;
  }

  .carouselMobileListCover {
    position: absolute;
    left: 0;
    top: 0;
    width: calc(50vw - 405px);
    height: 600px;
    background: #FFFFFF;
    z-index: 5;
  }

  .carouselMobileListCoverColor {
    position: absolute;
    left: 0;
    top: 0;
    width: calc(50vw - 405px);
    height: 476px;
    background: linear-gradient(180deg, rgba(17, 196, 212, 0.4) 0%, rgba(55, 210, 176, 0.392465) 37.67%, rgba(120, 233, 117, 0.38) 100%), linear-gradient(0deg, #56B0B8, #56B0B8), #2ADEC7;;
    border-radius: 0 0 0 40px;
    z-index: 6;
  }

  .introTitle1 {
    text-align: left;
    color: #002A2E;
    font-family: poppins;
    font-weight: 600;
    font-size: 35px;
    line-height: 30px;
    letter-spacing: 0.02em;
    margin: 0;
  }

  .introTitle2 {
    margin-top: 20px;
    text-align: left;
    color: #FFFFFF;
    font-family: poppins;
    font-weight: 600;
    font-size: 14px;
    line-height: 17px;
    text-transform: uppercase;
  }

  .carouselMobileList {
    margin-top: 20px;
    width: 100%;
    position: relative;
    display: flex;
    justify-content: left;
    flex-direction: row;
  }

  .carouselMobileItem {
    position: absolute;
    width: 210px;
    height: 390px;
    background: #1C2537;
    border-radius: 22px;
    transition: 650ms;
  }

  .itemImgContainer {
    width: 210px;
    height: 235px;
    border-radius: 20px 20px 0 0;
    object-fit: cover;
  }

  .itemTitleContainer {
    padding: 10px 15px;
    font-family: poppins;
    font-weight: 300;
    font-size: 18px;
    line-height: 22px;
    letter-spacing: 0.02em;
    color: #FFFFFF;
    height: 118px;

    a {
        text-decoration: none;
        color: #FFFFFF;
    }
  }

  .exportIconContainer {
    margin: 0 20px;
  }

  .exportIconMobile {
    width: 18px;
    height: 18px;
  }

  .carouselMobileItem:nth-child(1) {
    transform: translateX(-115%);
    visibility: hidden;
  }
  .carouselMobileItem:nth-child(2) {
    transform: translateX(0);
    opacity: 1;
  }
  .carouselMobileItem:nth-child(3) {
    transform: translateX(115%);
  }
  .carouselMobileItem:nth-child(4) {
    transform: translateX(230%);
  }
  .carouselMobileItem:nth-child(5) {
    transform: translateX(345%);
  }
  .carouselMobileItem:nth-child(6) {
    transform: translateX(460%);
  }
  .carouselMobileItem:nth-child(7) {
    transform: translateX(575%);
    visibility: hidden;
  }


  @media (min-width: 1200px) {
    display: none;
  }

  @media (max-width: 872px) {
    .backgroundContainer {
        padding: 46px 30px;
    }
    .carouselMobileListCover {
      width: 30px;
    }
    .carouselMobileListCoverColor {
      width: 30px;
      height: 475px;
    }
  }
`;

const HeroMobile = () => {
    const isVisible = usePageVisibility();

    const mouseIn = (key) => {
        clearInterval(timer);
    }

    const mouseOut = () => {
        resetTimer();
    }

    const resetTimer = () => {
        clearInterval(timer);
        startTimer();
    };

    const nextItem = () => {
        const list = document.getElementById("mcarouselList");
        const firstitem = list.firstChild;
        list.removeChild(firstitem);
        list.appendChild(firstitem);
    };

    const startTimer = () => {
        timer = setInterval(() => {
            nextItem();
        }, 4000);
    };

    useEffect(() => {
        if (!isVisible) {
            clearInterval(timer);
        }
        else {
            resetTimer();
        }
        return () => clearInterval(timer);
    }, [isVisible]);


    return (
        <HeroMobileSection>
            <div className='backgroundContainer'>
                <div className='carouselMobileListCover' />
                <div className='carouselMobileListCoverColor' />
                <h1 className='introTitle1'>
                    Discover<br/>
                    CCDI<br/>
                    Resources
                </h1>
                <div className='introTitle2'>Explore the CCDI Hub </div>
                <div id="mcarouselList" className='carouselMobileList'>
                    {
                        carouselList.map((mcarouselItem, idx) => {
                            const mcarouselkey = `mcarousel_${idx}`;
                            return (
                                <div key={mcarouselkey} className='carouselMobileItem' onMouseEnter={mouseIn} onMouseLeave={mouseOut}>
                                    <img className='itemImgContainer' src={mcarouselItem.mobile} alt="carousel_img"/>
                                    <div className="itemTitleContainer"><a href={mcarouselItem.link} target="_blank" rel="noopener noreferrer">{mcarouselItem.content}</a></div>
                                    <a className="exportIconContainer" href={mcarouselItem.link} target="_blank" rel="noopener noreferrer">
                                      <img className='exportIconMobile' src={exportIconText} alt="export_icon"/>
                                    </a>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </HeroMobileSection>
    );
};

export default HeroMobile;