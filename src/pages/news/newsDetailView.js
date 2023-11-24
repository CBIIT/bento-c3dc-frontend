import React, { useEffect } from 'react';
import styled from 'styled-components';
import ReactHtmlParser from 'html-react-parser';
import { newsList } from '../../bento/newsData'
import newsImg from '../../assets/news/News_Header.jpg';
import arrowIcon from '../../assets/news/News_Long_Arrow.svg';
import exportIcon from '../../assets/about/Export_Icon.svg';

const NewsDetailContainer = styled.div`
    width: 1440px;
    margin: 0 auto;

    .newsHeader {
        width: 1142px;
        height: 214px;
        margin: 0 auto;
        background-image: url(${newsImg});
        // background: linear-gradient(90deg, rgba(5, 85, 92, 0.8) 12.17%, rgba(135, 215, 220, 0.8) 94.57%), url(AdobeStock_461357028);
        border-radius: 0px 0px 20px 20px;
        font-family: 'Poppins';
        font-weight: 600;
        font-size: 35px;
        line-height: 214px;
        text-align: center;
        letter-spacing: 0.02em;
        color: #FFFFFF;
    }

    .backButtonContainer {
        margin: 13px auto 58px 208px;
    }

    .backButton {
        font-family: 'Poppins';
        font-weight: 300;
        font-size: 14px;
        line-height: 16px;
        color: #0A5E63;
        padding-left: 32px;
        text-decoration: none;
        background: url(${arrowIcon}) left center no-repeat;
    }
`;

const NewsContentContainer = styled.div`
    width: 775px;
    margin: 0 auto;

    .tabContainer {
        display: flex;
    }

    .tabItem {
        padding: 0 12px;
        height: 24px;
        background: #E6F2F5;
        border: 1.5px solid #7CCFD6;
        border-radius: 8px;
        font-family: 'Inter';
        font-weight: 300;
        font-size: 11px;
        line-height: 21px;
        color: #314E51;
    }

    .tabItem:hover {
        border: 1.5px solid #0095A2;
        cursor: pointer;
    }

    .splitLine {
        content:'';
        width: 100%;
        display:inline-block;
        border-bottom: 1px solid #7CCFD6;
        margin: 15px 0 26px 0;
    }
    
    .newsItemTitle {
        font-family: 'Poppins';
        font-weight: 600;
        font-size: 26px;
        line-height: 24px;
        color: #00727B;
    }

    .newsItemDate {
        font-family: 'Inter';
        font-weight: 300;
        font-size: 13px;
        line-height: 24px;
        text-transform: uppercase;
        color: #000000;
        margin: 15px 0;
    }

    .newsItemImgContainer{
        margin-bottom: 42px;
    }

    .newsItemImg {
        width: 100%;
        border: 2px solid #848484;
        border-radius: 12px 12px 0px 0px;
    }

    .newsImgDescription {
        margin-top: -5px;
        background: #4C4C4C;
        font-family: 'Inter';
        font-weight: 600;
        font-size: 13px;
        line-height: 15px;
        color: #FFFFFF;
        padding: 8px 10px;
    }

    .newsFullText {
        font-family: 'Inter';
        font-weight: 300;
        font-size: 16px;
        line-height: 24px;
        color: #000000;
        margin-bottom: 80px;
        a {
            color: #455299;
            font-family: 'Inter';
            font-weight: 600;
            padding-right: 20px;
            background: url(${exportIcon}) right center no-repeat;
          }
        }
        h1 {
            font-family: 'Inter';
            font-weight: 700;
            font-size: 22px;
            line-height: 24px;
            color: #00838F;
        }
        h2 {
            font-family: 'Inter';
            font-weight: 500;
            font-size: 18px;
            line-height: 24px;
            color: #000000;
        }
        p {
            margin: 0;
        }
        ol {
            margin: 0;
        }
        ul {
            margin: 0;
        }
    }
`;

const getNewsItem = (newsId) => {
    if (newsId === "") {
      return {};
    } else {
      return newsList.filter((item) => item.id === newsId);
    }
  };

const NewsDetailView = () => {
    const newsId = window.location.pathname.split('/')[2];
    const newsItem = getNewsItem(newsId)[0];

    const scrollToTop = () => {
        window.scrollTo({
          top: 0,
          behavior: 'smooth',
        });
    };

    useEffect(() => {
        scrollToTop();
    }, []);

    return (
        <NewsDetailContainer>
            <div className='newsHeader'>Hub News and Updates</div>
            <div className='backButtonContainer'>
                <a className='backButton' href="/news">Back to News and Updates Page</a>
            </div>
            <NewsContentContainer>
                <div className='tabContainer'>
                    <div className='tabItem'>{newsItem.type}</div>
                </div>
                <div className='splitLine' />
                <div className='newsItemTitle'>{newsItem.title} </div>
                <div className='newsItemDate'>{newsItem.date}</div>
                { 
                    newsItem.detailImg && 
                    <div className='newsItemImgContainer'>
                        <img className='newsItemImg' src={newsItem.detailImg} alt={newsItem.title} />
                        <div className='newsImgDescription'>{newsItem.slug}</div>
                    </div>
                }
                <div className='newsFullText'>{ReactHtmlParser(newsItem.fullText)}</div>
            </NewsContentContainer>
        </NewsDetailContainer>
    )
};

export default NewsDetailView;