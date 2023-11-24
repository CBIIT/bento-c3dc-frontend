/* eslint-disable no-await-in-loop */
import React, { useState, useEffect, useRef } from 'react';
import {
  withStyles, Grid,
} from '@material-ui/core';
import Pagination from '@material-ui/lab/Pagination';
import Components from './component';
import client from '../../../utils/graphqlClient';
import {
  SEARCH_PAGE_RESULT_ABOUT_PUBLIC,
} from '../../../bento/sitesearch';

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

function SearchPagination({
  datafield, classes, searchText, count, isPublic,
}) {
  const sizelist = [10,20,50,100];
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(sizelist[0]);
  const [data, setdata] = useState([]);
  // const [loading, setLoading] = useState(false);
  const [pageListVisible, setPageListVisible] = useState(0);
  const perPageSelection = useRef(null);
  useOutsideAlerter(perPageSelection);

  function getPublicQuery(field) {
    switch (field) {
      case 'about_page':
        return { QUERY: SEARCH_PAGE_RESULT_ABOUT_PUBLIC, field: 'about_page' };
      default:
        return { QUERY: SEARCH_PAGE_RESULT_ABOUT_PUBLIC, field: 'about_page' };
    }
  }

  async function getPageResults(inputVlaue, newPage) {
    if (count > 0) { // no need network calls if count is zero
      const { QUERY, field } = getPublicQuery(datafield);
      const allids = await client
        .query({
          query: QUERY,
          variables: {
            input: inputVlaue,
            first: pageSize,
            offset: (newPage - 1) * pageSize,
          },
          context: {
            clientName: isPublic ? 'publicService' : '',
          },
        })
        .then((result) => result.data.globalSearch);
      return allids[field].slice(0, pageSize);
    }
    return [];
  }

  async function onChange(newValue = [], newPage = 1) {
    // setLoading(true);
    const searchResp = await getPageResults(newValue, newPage);
    // setLoading(false);
    setdata(searchResp);
  }

  useEffect(() => {
    setPage(1);
    setdata([]);
    onChange(searchText);
  }, [searchText, datafield, pageSize]);

  const onNext = () => {
    if (page < Math.ceil(count / pageSize)) {
      onChange(searchText, page + 1);
      setPage(page + 1);
      // scrollToTop();
    }
  };

  const onPrevious = () => {
    if (page > 1) {
      onChange(searchText, page - 1);
      setPage(page - 1);
      // scrollToTop();
    }
  };

  // const scrollToTop = () => {
  //   window.scrollTo({
  //     top: 54,
  //     behavior: 'smooth',
  //   });
  // };

  const handleChangePage = (event, newPage) => {
    onChange(searchText, newPage);
    setPage(newPage);
    // scrollToTop();
  };

  const onPageSizeClick = (e) => {
    setPageSize(Number(e.target.innerText));
    setPageListVisible(!pageListVisible)
  };

  const renderCards = () => {
    // if (loading) {
    //   return (
    //     <div className={classes.loadingMessageWrapper}>
    //       <CircularProgress />
    //       {/* <div className={classes.loadingMessage}>Loading...</div> */}
    //     </div>
    //   );
    // }

    if (data && data.length <= 0) return <div className={classes.noticeContainer}>{searchText ? "No results" : "Please input keywords"}</div>;

    return data.map(
      // eslint-disable-next-line max-len
      (block, index) => <Components key={`data_${index}`}searchText={searchText} data={block} index={(page - 1) * pageSize + index} />,
    );
  };

  return (
    <>
      {Math.ceil(count / pageSize) !== 0 && (
      <div className={classes.totalResults}>
        <span className={classes.totalCount}>{count}</span>
        {' '}
        results
      </div>
      ) }
      <Grid className={classes.subsection}>
        <Grid item container direction="column" className={classes.subsectionBody} xs={9}>
          {renderCards()}
        </Grid>
      </Grid>
      { data && data.length > 0 &&
      <div className={classes.paginationContainer}>
        <div className={classes.perPageContainer}>
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
                  sizeItem !== pageSize && <div key={key} className={classes.pageSizeItem} onClick={onPageSizeClick}>{sizeItem}</div>
                )
              })
            }
          </div>
          <div className={classes.showingContainer}>
            Showing&nbsp;
            <div className={classes.showingRangeContainer}>
              {pageSize*(page-1)+1}
              -
              {pageSize*page < count ? pageSize*page : count}&nbsp;
            </div>
            of&nbsp;
            {count}
          </div>
        </div>
        <div className={classes.pageContainer}>
          <div className={ page === 1 ? classes.prevButtonDisabledContainer : classes.prevButtonContainer} onClick={onPrevious}><div className={ page === 1 ? classes.prevButtonDisabled : classes.prevButton } /></div>
          <Pagination
            disabletouchripple="true"
            classes={{ ul: classes.paginationUl }}
            className={classes.paginationRoot}
            count={Math.ceil(count / pageSize)}
            page={page}
            siblingCount={2}
            boundaryCount={1}
            shape="rounded"
            hideNextButton
            hidePrevButton
            onChange={handleChangePage}
          />
          <div className={page === Math.ceil(count / pageSize) ? classes.nextButtonDisabledContainer : classes.nextButtonContainer} onClick={onNext}><div className={ page === Math.ceil(count / pageSize) ? classes.nextButtonDisabled : classes.nextButton} /></div>
        </div>
      </div>
      }
    </>
  );
}

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
  },
  perPageContainer: {
    display: 'flex',
    fontFamily: 'Poppins',
    fontWeight: '300',
    fontSize: '14px',
    color: '#045B80',
    marginTop: '15px',
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
    background: '#F5F5F5',
    border: '1px solid #99A1B7',
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
      minWidth: '25px',
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
  }
};

export default withStyles(styles)(SearchPagination);
