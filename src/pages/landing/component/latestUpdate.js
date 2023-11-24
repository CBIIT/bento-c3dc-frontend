import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import ReactHtmlParser from 'html-react-parser';
import usePageVisibility from "./PageVisibility";
import { newsList } from '../../../bento/newsData';
import { titleData } from '../../../bento/landingPageData';
import exportIconText from '../../../assets/landing/Export_Icon_White.svg';

let timer = null;

const LatestUpdatesSection = styled.div`
  position: relative;
  z-index: 5;
  margin-top: 23px;
`;

const LatestUpdatesContainer = styled.div`
    margin: 0 auto;
    position: relative;

    .latestUpdatesList {
      display: flex;
      justify-content: center;
    }

    .latestUpdatesListItem:nth-child(1) {
        display: none;
    }

    .latestUpdatesListItem:nth-child(5) {
        display: none;
    }

    .latestUpdatesListItem:nth-child(6) {
        display: none;
    }

    .latestUpdatesListItem {
      margin: 16px;
      width: 367px;
      height: 476px;
      background-color: #044249;
      box-shadow: 0px 0px 16px #1B1C1C80;
      border-radius: 0px 20px;
    }

    .latestUpdatesListItemPic {
      border-radius: 0px 20px 0 0;
      width: 367px;
      height: 310px;
    }

    .latestUpdatesListTitleContainer {
      text-decoration: none;
    }

    .latestUpdatesListTitle {
      color: #88DCDD;
      padding: 14px 23px 0 23px;
      margin-bottom: 7px;
      font-family: Poppins;
      font-weight: 500;
      font-size: 16px;
      line-height: 16px;
      height: 57px;
    }

    .latestUpdatesListTitle:hover{
      color: #72F9FB;
      cursor: pointer;
    }

    .latestUpdatesListContent {
      color: #FFFFFF;
      padding: 0 23px 0 23px;
      font-family: Inter;
      font-weight: 400;
      font-size: 16px;
      line-height: 22px;
      letter-spacing: -0.02em;
    }

    .latestUpdatesTextContent {
      a {
        color: #FFFFFF;
        padding-right: 20px;
        background: url(${exportIconText}) right center no-repeat;
        text-underline-offset: 5px;
      }
    }

    .readMoreContainer {
      font-size: 14px;
      color: #AFF1FF;
      border-bottom: 1px solid #AFF1FF;
      text-decoration: none;
      margin-left: 12px;
    }

    .readMoreContainer:hover{
      color: #5EF2FF;
      border-bottom: 1px solid #5EF2FF;
      cursor: pointer;
    }

    .readMoreContainer::after {
      content: '>';
      margin-left: 4px;
    }

    .hoverTextContentContainer {
      display: none;
    }

    @media (min-width: 1200px) {
        .hoverTextContent {
            display: none;
        }

        .hover {
            display: none;
        }
    }

    @media (max-width: 1199px) {
        .latestUpdatesList {
            position: relative;
            height: 100%;
            width: 100%;
            display: flex;
            justify-content: left;
            flex-direction: row;
            margin-left: calc(50vw - 405px);
        }

        .latestUpdatesListItem {
            position: absolute;
            width: 214px;
            height: 284px;
            margin: 0;
            box-shadow: none;
        }

        .latestUpdatesListItem:nth-child(1) {
            transform: translateX(-115%);
            display: block;
            visibility: hidden;
          }

        .latestUpdatesListItem:nth-child(2) {
            transform: translateX(0);
          }
    
          .latestUpdatesListItem:nth-child(3) {
            transform: translateX(115%);
          }
    
          .latestUpdatesListItem:nth-child(4) {
            transform: translateX(230%);
          }

          .latestUpdatesListItem:nth-child(5) {
            transform: translateX(345%);
            display: block;
            visibility: hidden;
          }

          .latestUpdatesListItem:nth-child(6) {
            transform: translateX(345%);
            display: block;
            visibility: hidden;
          }

        .latestUpdatesListItemPic {
            width: 214px;
            height: 181px;
            object-fit: contain;
          }
    
          .latestUpdatesListTitle {
            padding: 6px 14px;
            font-size: 14px;
          }
    
          .latestUpdatesListContent {
            display: none;
          }
    
          .hoverTextContentContainer {
            display: block;
            position: absolute;
            top: 0;
            width: 214px;
            height: 284px;
            background: rgb(25, 33, 39, .8);
            border-radius: 0px 20px;
            padding: 40px 16px;
            transition: all 0.25s ease-out;
          }
    
          .hoverTextContent {
            color: #FFFFFF;
            font-family: Inter;
            font-weight: 400;
            font-size: 16px;
            line-height: 22px;
            letter-spacing: -0.02em;
            margin-bottom: 20px;
          }
    
          .hover {
            margin-left: 0;
          }
    }

    @media (max-width: 700px) {
      .latestUpdatesListItem {
        transition: 650ms;
      }
    }

    @media (max-width: 872px) {
      .latestUpdatesList {
        margin-left: 30px;
      }

      .latestUpdatesListCover {
        position: absolute;
        background: #FFFFFF;
        width: 30px;
        height: 300px;
        z-index: 20;
      }
    }
`;

const TitleContainer = styled.div`
    display: flex;
    color: #05555C;
    margin: 0 calc(50vw - 580px) 38px 0;
    justify-content: flex-end;

    .titleLine {
      margin-right: 15px;
      display: flex;
      height: 32px;
    }

    .titleLineLong {
      content:'';
      display:inline-block;
      width: 100px; 
      border-bottom: 3px solid #05555C;
      margin-left: 2px;
    }

    .titleLineShort {
      content:'';
      display:inline-block;
      width: 7px; 
      border-bottom: 3px solid #05555C;
      margin-right: 3px;
    }

    .titleText {
      font-family: Poppins;
      font-weight: 600;
      font-size: 35px;
      text-transform: uppercase;
      margin: 0;
    }

    @media (max-width: 1199px) {
      justify-content: left;
      margin: 0 0 20px calc(50vw - 405px);

      .titleLine {
        display: none;
      }

      .titleText {
        font-size: 14px;
        font-line: 17px;
      }
    }

    @media (max-width: 872px) {
      margin: 0 0 20px 30px;
    }
`;

const LatestUpdate = () => {
    const [hoverItem, setHoverItem] = useState("");
    const [pause, setPause] = useState(true);
    const [rLatestlList, setRLatestlList] = useState([]);
    const isVisible = usePageVisibility();

    const getFirstList = () => {
        let newItemList = [newsList[2]]
        newItemList = newItemList.concat(newsList.slice(0,3));
        newItemList = newItemList.concat(newsList.slice(0,2));
        return newItemList;
    }

    const mouseIn = (key) => {
        setHoverItem(key);
        clearInterval(timer);
    }

    const mouseOut = () => {
        setHoverItem("");
        if (!pause) {
            resetTimer();
        }
    }

    const resetTimer = () => {
        clearInterval(timer);
        startTimer();
    };

    const nextItem = () => {
        const list = document.getElementById("latestList");
        const firstitem = list.firstChild;
        list.removeChild(firstitem);
        list.appendChild(firstitem);
    };

    const startTimer = () => {
        timer = setInterval(() => {
            nextItem();
        }, 4000);
    };

    const carouselStart = () => {
        const scrolled = document.documentElement.clientWidth;
        if (scrolled < 700) {
            setPause(false);
            resetTimer();
        } else {
            setPause(true);
            clearInterval(timer);
        }
    };

    useEffect(() => {
        window.addEventListener('resize', carouselStart);
        if (document.documentElement.clientWidth < 700) {
            resetTimer();
            setPause(false);
        }
        if (rLatestlList.length === 0) {
            setRLatestlList(getFirstList());
        }
        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        if (!isVisible || pause) {
            clearInterval(timer);
        }
        else if (isVisible && !pause){
            resetTimer();
        }
        return () => clearInterval(timer);
    }, [isVisible, pause]);

    return (
        <LatestUpdatesSection>
            <LatestUpdatesContainer>
            <TitleContainer>
                <div className='titleLine'>
                <div className='titleLineShort' />
                <div className='titleLineShort' />
                <div className='titleLineLong' />
                </div>
                <h2 className='titleText'>{titleData.latestUpdatesTitle}</h2>
            </TitleContainer>
            <div className='latestUpdatesListCover' />
            <div id="latestList" className='latestUpdatesList'>
                {
                    rLatestlList && rLatestlList.map((updateItem, updateidx) => {
                        const updatekey = `update_${updateidx}`;
                        return (
                        <div className='latestUpdatesListItem' key={updatekey} onMouseEnter={() => mouseIn(updatekey)} onMouseLeave={mouseOut}>
                            <a href={`/news#${updateItem.id}`}><img className='latestUpdatesListItemPic' src={updateItem.img} alt={updateItem.id} aria-hidden='true' /><span style={{display:'none'}}>latestUpdates text</span></a>
                            <a className='latestUpdatesListTitleContainer' href={`/news#${updateItem.id}`}><div className='latestUpdatesListTitle'>{updateItem.title}</div></a>
                            <div className='latestUpdatesListContent'>
                                <span className='latestUpdatesTextContent'>{ReactHtmlParser(updateItem.slug)}</span>
                                { updateItem.slug.length > 100 && updateItem.slug.length < 110
                                ? <div><a className='readMoreContainer' href={`/news#${updateItem.id}`} style={{marginLeft: 0}}>Read More</a></div>
                                : <a className='readMoreContainer' href={`/news#${updateItem.id}`}>Read More</a>}
                            </div>
                            {
                                <div className='hoverTextContentContainer' style={hoverItem === updatekey ? {opacity: 1, visibility: "visible"} : {opacity: 0, visibility: "hidden"}}>
                                    <div className='hoverTextContent'>{ReactHtmlParser(updateItem.slug)}</div>
                                    <a className='readMoreContainer hover' href={`/news#${updateItem.id}`}>Read More</a>
                                </div>
                            }
                        </div>
                        )
                    })
                }
            </div>
            </LatestUpdatesContainer>
        </LatestUpdatesSection>
    );
};

export default LatestUpdate;