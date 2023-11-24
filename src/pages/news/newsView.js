import React, { useState, useEffect, useRef }from 'react';
import {
  withStyles,
} from '@material-ui/core';
// import { useNavigate } from 'react-router-dom';
import ReactHtmlParser from 'html-react-parser';
import Pagination from '@material-ui/lab/Pagination';
import styled from 'styled-components';
import exportIcon from '../../assets/about/Export_Icon.svg';
import newsImg from '../../assets/news/News_Header.jpg';
import { newsList } from '../../bento/newsData'

const NewsContainer = styled.div`
  width: 100%;
  margin: 0 auto;

  .newsHeader {
    width: 1142px;
    height: 214px;
    margin: 0 auto;
    background-image: url(${newsImg});
    background-repeat: no-repeat;
    background-color: #87D7DCCC; 
    border-radius: 0px 0px 20px 20px;
    font-family: 'Poppins';
    font-weight: 600;
    font-size: 35px;
    line-height: 214px;
    text-align: center;
    letter-spacing: 0.02em;
    color: #FFFFFF;
  }

  .tabList {
    display: flex;
    margin: 20px 0 35px calc(45% - 490px);;
  }

  .tabListItem {
    font-family: 'Poppins';
    font-weight: 500;
    font-size: 16px;
    line-height: 16px;
    color: #298085;
    margin-left: 60px;
  }

  .tabListItemActive {
    font-family: 'Poppins';
    font-weight: 500;
    font-size: 16px;
    line-height: 16px;
    color: #0A5E63;
    margin-left: 60px;
    padding-bottom: 5px;
    border-bottom: 3px solid #0A5E63;
  }

  .tabListItemActive:hover {
    cursor: default;
  }

  .tabListItem:hover {
    color: #0A5E63;
  }

  .tabListItem:hover {
    cursor: pointer;
  }

  .UpperContainer {
    display: flex;
  }

  .newsList {
    width: 100%;
    margin: 0 auto;
  }

  .newsItem {
    width: 1047px;
    min-height: 248px;
    border: 1.5px solid transparent;
    border-radius: 0px 20px;
    margin: 0 auto;
    margin-bottom: 29px;
    padding: 23px 32px 0 38px;
    box-shadow: 0px 4px 24px rgba(0, 0, 0, 0.25);
    text-decoration: none;
  }

  // .newsItem:hover {
  //   border: 1.5px solid #00BDCD;
  // }

  .newsItemTextContainer {
    width: 76%;
  }

  .newsItemTitle {
    font-family: 'Poppins';
    font-weight: 500;
    font-size: 20px;
    line-height: 22px;
    color: #00838F;
    margin-bottom: 8px;
  }

  .newsItemDate {
    font-family: 'Inter';
    font-weight: 300;
    font-size: 13px;
    line-height: 24px;
    text-transform: uppercase;
    color: #000000;
    margin-bottom: 8px;
  }

  .newsItemContent {
    font-family: 'Inter';
    font-weight: 300;
    font-size: 16px;
    line-height: 24px;
    color: #000000;
    margin-bottom: 48px;
    a {
      color: #455299;
      font-family: 'Inter';
      font-weight: 600;
      padding-right: 20px;
      background: url(${exportIcon}) right center no-repeat;
    }
  }

  .newsItemImgContainer {
    margin: 12px 0 0 33px;
    border-radius: 12px;
    border: 2px solid #848484;
    width: 197px;
    height: 172px;
  }

  .Lower {
    display: none;
  }

  @media (min-width: 1420px) {
    width: 1420px;
  }

  @media (max-width: 1186px) {
    .newsHeader {
      width: auto;
      margin: 0 16px;
    }
  }

  @media (max-width: 1090px) {
    .newsList {
      width: auto;
      margin: 0 16px;
    }

    .newsItem {
      width: auto;
    }
  }

  @media (max-width: 1023px) {
    p {
      margin-top: 5px;
    }

    .newsHeaderText {
      line-height: 30px;
      width: 250px;
      padding-top: 70px;
      margin: 0 auto;
    }

    .UpperContainer {
      width: 100%;
    }
    .imgContainer {
      margin-left: auto;
    }
    .newsItemImgContainer {
      width: 99px;
      height: 86px;
      margin-top: 0;
    }
    .Upper {
      display: none;
    }
    .Lower {
      display: block;
      margin-bottom: 25px;
    }
    .newsItem {
      padding: 18px 18px 0 18px;
    }
    .newsItemTitle {
      min-height: 50px;
    }
    .tabListItem {
      font-size: 12px;
      margin-left: 0;
    }
    .tabListItemActive {
      font-size: 12px;
      margin-left: 0;
    }
    .tabList {
      display: grid;
      grid-column-gap: 4%;
      grid-template-columns: auto auto auto auto auto;
      justify-content: center;
      margin: 20px auto 25px auto;
    }
  }

  @media (max-width: 767px) {
    .newsItemTitle {
      font-size: 18px;
    }
  }

  @media (max-width: 530px) {
    .tabList {
      display: grid;
      grid-column-gap: 2%;
      grid-template-columns: auto auto 50px 72px auto;
      justify-content: center;
      margin-left: 16px;
      margin-right: 12px;
    }
  }
`;

const useOutsideAlerter = (ref) => {
  useEffect(() => {
      function handleClickOutside(event) {
          if (!event.target || (event.target.getAttribute("id") !== "pageSizeBlock" && event.target.getAttribute("id") !== "pageSizeArrow" && ref.current && !ref.current.contains(event.target))) {
            const toggle = document.getElementById("pageSizeBlock");
            if (document.getElementById("pagelist").style.visibility !== "hidden") {
              toggle.click();
            }
          }
      }

      document.addEventListener("mousedown", handleClickOutside);
      return () => {
          document.removeEventListener("mousedown", handleClickOutside);
      };
  }, [ref]);
};

const getResultList = (tabName) => {
  if (tabName === "All") {
    return newsList;
  } else {
    return newsList.filter(item => item.type === tabName);
  }
};

const getPageResults = (selectedTab, pageInfo) => {
  const resultList = getResultList(selectedTab);
  const allids = [];
  const indexStart = pageInfo.pageSize*(pageInfo.page-1);
  const indexEnd = pageInfo.pageSize*pageInfo.page < pageInfo.pageTotal ? pageInfo.pageSize*pageInfo.page - 1 : pageInfo.pageTotal - 1;
  for (let i = indexStart; i<= indexEnd; i++) {
    allids.push(resultList[i]);
  }
  return allids;
}

const NewsView = ({classes}) => {
  // const navigate = useNavigate();
  const [selectedTab, setSelectedTab] = useState("All");
  const newsTabList = ['All', 'Announcements', 'News & Other', 'Application Updates', 'Site Updates'];
  const sizelist = [10,20,50,100];
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(sizelist[0]);
  const [pageTotal, setPageTotal] = useState(getResultList(selectedTab).length);
  const [data, setdata] = useState(getPageResults(selectedTab, {page: page, pageTotal: pageTotal, pageSize: pageSize}));
  const [pageListVisible, setPageListVisible] = useState(0);
  const perPageSelection = useRef(null);
  // const announcementsArray = newsList.filter(item => item.type === 'Announcements');
  useOutsideAlerter(perPageSelection);

  const onNext = () => {
    if (page < Math.ceil(pageTotal / pageSize)) {
      let tmp = page + 1;
      setPage(tmp);
      setdata(getPageResults(selectedTab, {page: tmp, pageTotal: pageTotal, pageSize: pageSize}));
    }
  };

  const onPrevious = () => {
    if (page > 1) {
      let tmp = page - 1;
      setPage(tmp);
      setdata(getPageResults(selectedTab, {page: tmp, pageTotal: pageTotal, pageSize: pageSize}));
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 54,
      behavior: 'smooth',
    });
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    setdata(getPageResults(selectedTab, {page: newPage, pageTotal: pageTotal, pageSize: pageSize}));
    scrollToTop();
  };

  const onPageSizeClick = (e) => {
    let newPageSize = Number(e.target.innerText);
    setPageSize(newPageSize);
    setPage(1);
    setdata(getPageResults(selectedTab, {page: 1, pageTotal: pageTotal, pageSize: newPageSize}));
    setPageListVisible(!pageListVisible)
  };

  const onClickTab = (newsTabItem) => {
    setSelectedTab(newsTabItem);
    const resultList = getResultList(newsTabItem);
    const total = resultList.length;
    const allids = [];
    const indexStart = 0;
    const indexEnd = pageSize < total ? pageSize - 1 : total - 1;
    for (let i = indexStart; i<= indexEnd; i++) {
      allids.push(resultList[i]);
    }
    setdata(allids);
    setPage(1);
    setPageTotal(total);
  };

  // const gotoNewsDetail = (e, newsID) => {
  //   if (e.target.tagName !== 'A') {
  //     navigate(`/newsdetail/${newsID.trim()}`);
  //   }
  // };

  return (
    <NewsContainer>
      <div className='newsHeader'><div className='newsHeaderText'>Hub News and Updates</div></div>
      <div className='tabList'>
        {
          newsTabList.map((newsTabItem, idx) => {
            const tabkey = `tabkey_${idx}`;
            return (
            <div key={tabkey} className={selectedTab === newsTabItem ? 'tabListItemActive' : 'tabListItem'} onClick={() => onClickTab(newsTabItem)}>{newsTabItem}</div>
            )
          })
        }
      </div>
      <div className='newsList'>
        {
          data.length > 0 ? data.map((newsItem, idx) => {
            const newskey = `news_${idx}`;
            return (
              <div id={newsItem.id} key={newskey} className='newsItem'>
                <div className="UpperContainer">
                  <div className='newsItemTextContainer'>
                    <div className='newsItemTitle'>{newsItem.title}</div>
                    <div className='newsItemDate'>{newsItem.date}</div>
                    <div className='newsItemContent Upper'>{ReactHtmlParser(newsItem.highlight)}</div>
                  </div>
                  {newsItem.img && <div className='imgContainer'><img className='newsItemImgContainer' src={newsItem.img} alt={newsItem.title}/></div>}
                </div>
                <div className='newsItemContent Lower'>{ReactHtmlParser(newsItem.highlight)}</div>
              </div>
            )
          }) :
          <div className={classes.noticeText}>Currently no {selectedTab}</div>
        }
      </div>
      { data.length > 0 &&
        <div className={classes.paginationContainer}>
          <div className={classes.perPageContainer}>
            <div className={classes.flexPageContainer}>
              Results per Page:
              <div id="pageSizeBlock" className={classes.pageSizeContainer} onClick={() => setPageListVisible(!pageListVisible)}>
                {pageSize}
                <span id="pageSizeArrow" className={pageListVisible? classes.pageSizeArrowUp : classes.pageSizeArrowDown}></span>
              </div>
              <div ref={perPageSelection} id="pagelist" className={classes.pageSizeList} style={pageListVisible ? null : {visibility: "hidden"}}>
                {
                  sizelist.map((sizeItem, idx) => {
                    const key = `size_${idx}`;
                    return (
                      sizeItem === pageSize ? null : <div key={key} className={classes.pageSizeItem} onClick={onPageSizeClick}>{sizeItem}</div>
                    )
                  })
                }
              </div>
            </div>
            <div className={classes.showingContainer}>
              Showing&nbsp;
              <div className={classes.showingRangeContainer}>
                {pageSize*(page-1)+1}
                -
                {pageSize*page < pageTotal ? pageSize*page : pageTotal}&nbsp;
              </div>
              of&nbsp;
              {pageTotal}
            </div>
          </div>
          <div className={classes.pageContainer}>
            <div className={ page === 1 ? classes.prevButtonDisabledContainer : classes.prevButtonContainer} onClick={onPrevious}><div className={ page === 1 ? classes.prevButtonDisabled : classes.prevButton } /></div>
            <Pagination
              disabletouchripple="true"
              classes={{ ul: classes.paginationUl }}
              className={classes.paginationRoot}
              count={Math.ceil(pageTotal / pageSize)}
              page={page}
              siblingCount={2}
              boundaryCount={1}
              shape="rounded"
              hideNextButton
              hidePrevButton
              onChange={handleChangePage}
            />
            <div className={page === Math.ceil(pageTotal / pageSize) ? classes.nextButtonDisabledContainer : classes.nextButtonContainer} onClick={onNext}><div className={ page === Math.ceil(pageTotal / pageSize) ? classes.nextButtonDisabled : classes.nextButton} /></div>
          </div>
        </div>
      }
    </NewsContainer>
    
  )
};

const styles = {
  prevButtonContainer: {
    marginLeft: '10px',
    border: '1px solid #99A1B7',
    height: '32px',
    '&:hover': {
      cursor: 'pointer',
    },
  },
  prevButtonDisabledContainer: {
    marginLeft: '10px',
    border: '1px solid #99A1B7',
    height: '32px',
    '&:hover': {
      cursor: 'default',
    },
  },
  prevButton: {
    content: "",
    display: 'inline-block',
    width: '6px',
    height: '6px',
    borderBottom: '1px solid #045B80',
    borderLeft: '1px solid #045B80',
    margin: '13px 9px 0 11px',
    transform: 'rotate(45deg)',
    '&:hover': {
      cursor: 'pointer',
    },
  },
  prevButtonDisabled: {
    content: "",
    display: 'inline-block',
    width: '6px',
    height: '6px',
    borderBottom: '1px solid #99A1B7',
    borderLeft: '1px solid #99A1B7',
    margin: '13px 9px 0 11px',
    transform: 'rotate(45deg)',
  },
  nextButtonContainer: {
    borderTop: '1px solid #99A1B7',
    borderRight: '1px solid #99A1B7',
    borderBottom: '1px solid #99A1B7',
    height: '32px',
    '&:hover': {
      cursor: 'pointer',
    },
  },
  nextButtonDisabledContainer: {
    borderTop: '1px solid #99A1B7',
    borderRight: '1px solid #99A1B7',
    borderBottom: '1px solid #99A1B7',
    height: '32px',
    '&:hover': {
      cursor: 'default',
    },
  },
  nextButton: {
    content: "",
    display: 'inline-block',
    width: '6px',
    height: '6px',
    borderBottom: '1px solid #045B80',
      borderLeft: '1px solid #045B80',
    margin: '13px 11px 0 9px',
    transform: 'rotate(225deg)',
    '&:hover': {
      cursor: 'pointer',
    },
  },
  nextButtonDisabled: {
    content: "",
    display: 'inline-block',
    width: '6px',
    height: '6px',
    borderBottom: '1px solid #99A1B7',
    borderLeft: '1px solid #99A1B7',
    margin: '13px 11px 0 9px',
    transform: 'rotate(225deg)',
  },
  paginationContainer: {
    display: 'flex',
    justifyContent: 'center',
    margin: '0 auto',
    paddingBottom: '30px',
    '& > *': {
      marginTop: '10px',
    },
    '@media (max-width: 500px)': {
      justifyContent: 'left',
      paddingLeft: '30px',
    }
  },
  perPageContainer: {
    fontFamily: 'Poppins',
    fontWeight: '300',
    fontSize: '14px',
    color: '#045B80',
    marginTop: '15px',
    '@media (min-width: 500px)': {
      display: 'flex',
    },
  },
  flexPageContainer: {
    display: 'flex',
  },
  pageSizeContainer: {
    marginLeft: '10px',
    userSelect: 'none',
    height: '20px',
    '&:hover': {
      cursor: 'pointer',
    },
  },
  pageSizeArrowUp: {
    content: "",
    display: 'inline-block',
    width: '6px',
    height: '6px',
    borderBottom: '1.5px solid #045B80',
    borderLeft: '1.5px solid #045B80',
    margin: '1px 3px 1px 10px',
    transform: 'rotate(135deg)',
  },
  pageSizeArrowDown: {
    content: "",
    display: 'inline-block',
    width: '6px',
    height: '6px',
    borderBottom: '1.5px solid #045B80',
    borderLeft: '1.5px solid #045B80',
    margin: '1px 3px 3px 10px',
    transform: 'rotate(-45deg)',
  },
  pageSizeList: {
    position: 'relative',
    top: '25px',
    left: '-40px',
    width: '45px',
    height: '76px',
    background: '#F5F5F5',
    border: '1px solid #99A1B7',
    zIndex: '2',
    '&:hover': {
      cursor: 'pointer',
    },
  },
  pageSizeListHidden: {
    position: 'relative',
    top: '25px',
    left: '-30px',
    width: '45px',
    border: '1px solid #99A1B7',
    visibility: 'hidden',
    '&:hover': {
      cursor: 'pointer',
    },
  },
  pageSizeItem: {
    padding: '2px 8px',
    '&:hover': {
      cursor: 'pointer',
      color: '#000000',
    },
  },
  ul: {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    padding: 0,
    margin: 0,
    listStyle: 'none',
  },
  paginationUl: {
    padding: '2px',
    '& .MuiPaginationItem-root': {
      color: '#045B80',
      fontFamily: 'Poppins',
      fontSize: '14px',
      fontWeight: '300',
      minWidth: '18px',
      margin: '0',
      padding: '0 7px',
    },
    '& .MuiPaginationItem-page': {
      transition: 'none',
    },
  },
  paginationRoot: {
    '& .Mui-selected': {
      backgroundColor: 'transparent',
      fontWeight: '600',
    },
    '& .Mui-selected:hover': {
      backgroundColor: 'transparent',
    },
    '& .MuiPagination-ul': {
      padding: '0',
    },
    '& .MuiPagination-ul:hover': {
      cursor: 'pointer',
    },
    '& .MuiPagination-ul > li': {
      height: '32px;',
      borderTop: '1px solid #99A1B7',
      borderRight: '1px solid #99A1B7',
      borderBottom: '1px solid #99A1B7',
      '&:hover': {
        backgroundColor: 'transparent',
      },
    },
    '& .MuiPaginationItem-page': {
      '&:hover': {
        backgroundColor: 'transparent',
      },
    }
  },
  content: {
    fontSize: '12px',
  },
  subsectionBody: {
    margin: '0 180px 0 219px',
  },
  subsection: {
    '&:last-child $subsectionBody': {
      borderBottom: 'none',
    },
  },
  link: {
    color: '#DD401C',
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline',
    },
    '&:visited': {
      color: '#9F3D26',
    },
  },
  totalResults: {
    maxWidth: '900px',
    fontFamily: 'Poppins',
    color: '#13666A',
    fontSize: '20px',
    fontWeight: '500',
    margin: '0 0 71px 220px',
    paddingLeft: '-50px',
  },
  totalCount: {
    fontFamily: 'Poppins',
  },
  loadingMessageWrapper: {
    textAlign: 'center',
  },
  loadingMessage: {
    paddingLeft: '10px',
    fontSize: '18px',
  },
  noticeContainer: {
    fontFamily: 'Poppins',
    color: '#13666A',
    fontSize: '20px',
    marginBottom: '100px',
  },
  pageNumber: {
    margin: '0 5px',
  },
  showingContainer: {
    display: 'flex',
    position: 'relative',
    left: '-14px',
    '@media (max-width: 499px)': {
      left: '0',
      top: '-31px',
    }
  },
  showingRangeContainer: {
    minWidth: '40px',
    textAlign: 'center',
  },
  pageContainer: {
    display: 'flex',
    height: '32px',
    '&:hover': {
      cursor: 'pointer',
    },
    '@media (max-width: 499px)': {
      marginTop: '56px',
      marginLeft: '-68px',
    }
  },
  noticeText: {
    fontFamily: 'Poppins',
    color: '#13666A',
    fontSize: '20px',
    marginBottom: '100px',
    marginLeft: '205px',
  },
};

export default withStyles(styles)(NewsView);
