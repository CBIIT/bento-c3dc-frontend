/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import header from '../../assets/announcement/header.svg';
import { announcementPageData } from '../../bento/announcementPageData';
import { useNavigate } from 'react-router-dom';

const AnnouncementContainer = styled.div`
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  aling-items: center;
  justify-content: center;
  .announcementHeader {
    font-family: Poppins;
    font-weight: 500;
    font-size: 35px;
    line-height: 45px;
    height: 167px;
    letter-spacing: 0.15px;
    color: #FFFFFF;
    text-align: center;
    margin-top: 0px;
    background-image: url(${header});
    background-repeat: no-repeat;
    background-position: center;
    background-size: 100%;
    background-fit: fit;
    border-radius: 0px;
    border: none;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0px;
    }
  .announcementBody {
    display: flex;
    justify-content: center;
    background-size: cover;  /* Ensures the background image covers the entire container */
    background-repeat: no-repeat;  /* Disable repeating */
    background-position: center;  /* Center the image */
    flex-direction: column;
    align-items: center;
    background-width: 100%;
    padding-bottom: 100px;
  } 
.options {
    display: flex;
    flex-direction: row;
    align-self: center;
    width: 1046px;
    justify-content: flex-start;
    align-items: center;
}
    .option-parent{
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    
    }
.option {
    margin-top: 10px;
    margin-bottom: 10px;
    margin-right: 40px;
    font-size: 16px;
    font-style: Open Sans;  
    font-weight: 600;
    cursor: pointer;
}
.option-selected {
    border-bottom: 3px #07645C solid;
    color: #07645C;
    font-size: 16px;
    margin-top: 10px;
    margin-bottom: 10px;
    margin-right: 40px;
    font-style: Open Sans;  
    font-weight: 600;
}
.announcementCard { 
    border: 2px #9FBEB5 solid;
    width: 1046px;
    min-height: 300px;
    border-radius: 20px;
    padding: 25px 30px 25px 30px;
    margin-top: 30px;
      box-sizing: border-box;

}
.announcementCard:hover{
  border: 2px solid #65C6BA;
  box-shadow: 0 0 0 2px #65C6BA;

}

.announcementCard .title{
    color: #00838F;
    font-weight: 500;
    font-family: Poppins;
    font-size: 28px;
    line-height: 32px;
    letter-spacing: -0.02em;
    text-align: left;
    margin-bottom: 10px;
}
.sectionOne {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: space-between;
        margin-bottom: 30px;
    }
.sectionOne-first {
      display: flex;
      flex-direction: column;
      width: 65%;
  }
.announcementContent{
      font-family: Inter;
      font-size: 18px;
      font-weight: 400;
      line-height: 24px;
      text-align: left;
      margin-top: 15px;
      width: 120%;
    }
  .announcementButton{
    font-family: Poppins;
    font-size: 12px;
    font-weight: 400;
    line-height: 19.31px;
    text-align: left;
    color: #3C7D76;
    border: 1px #3C7D76 solid;
    padding: 5px;
    border-radius: 20px;
    margin: 10px;
    margin-left: 0px;
    margin-top: 15px;
    cursor: pointer;
}
.announcementPagination {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    width: 100%;
    font-style: Poppins;
    color: #045B80;
    padding: 20px 0;
    font-size: 14px;
  }
  .resultsPerPage {
    display: flex;
    align-items: center;
}
  .resultsPerPage select {
    margin-left: 10px;
    padding: 5px;
    font-size: 14px;
  }
  .pageNavigation {
    display: flex;
    align-items: center;
    margin-left: 10px;
  }
  .pageNavigation span, .pageNavigation .arrow {
    margin: 0px;
    cursor: pointer;
    user-select: none;
  }

  .pageNavigation .arrow {
    font-size: 16px;
    font-weight: bold;
    border: 1px #045B80 solid;
    border-top: 1px #045B80 solid;
    border-bottom: 1px #045B80 solid;
    padding: 3px;
    width: 28px;
    display: flex;
    justify-content: center;
    height: 32px;

  }

  .timestamp{
      font-family: Inter;
      font-size: 13px;
      font-weight: 300;
      line-height: 24px;
      text-align: left;
  }
  .pageNavigation .selected {
    font-weight: bold;
    text-decoration: underline;
    border: 0.3px #045B80 solid;
    border-top: 1px #045B80 solid;
    border-bottom: 1px #045B80 solid;
    padding: 3px;
    margin: 0px;
    font-size: 16px;
    width: 28px;
    height: 32px;
    display: flex;
    justify-content: center;
  }
  .pageNumbers{
      border: 0.3px #045B80 solid;
      border-top: 1px #045B80 solid;
      border-bottom: 1px #045B80 solid;
      padding: 3px;
      width: 28px;
      display: flex;
      justify-content: center;
      height: 32px;
      margin: 0px;
      font-size: 16px;
    }
  .resultsPerPage{
      margin: 15px;
  }
     
`;

const AnnouncementPage = () => {
  const [selectedOption, setSelectedOption] = useState(0);
  const [options] = useState(["All", "Data Update","Application Update"]);
  const [currentPage, setCurrentPage] = useState(1);
  const [resultsPerPage, setResultsPerPage] = useState(10);
  const [expandedIndices, setExpandedIndices] = useState([]);
  const [totalResultCount, setTotalResultCount] = useState(0);
  const [totalPage, setTotalPage] = useState(0);
  const [startIndex, setStartIndex] = useState(0);
  const [endIndex, setEndIndex] = useState(0);
  const [finalAnnouncementPageData, setFinalAnnouncementPageData] = useState(announcementPageData);
  const navigator = useNavigate();
  const toggleExpand = (index) => {
    setExpandedIndices(prev =>
      prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]
    );
  };

  useEffect(() => {
    setCurrentPage(1)
    let filteredAnnouncementPageData = [];
    if (selectedOption === 0) {
      filteredAnnouncementPageData = announcementPageData;
    } else {
      filteredAnnouncementPageData = announcementPageData.filter((a) => a.type === selectedOption);
    }
    setFinalAnnouncementPageData(filteredAnnouncementPageData);
    calculatePageInfo(filteredAnnouncementPageData);

  }, [selectedOption])

  useEffect(() => {
    calculatePageInfo(announcementPageData);
  }, [])


  const calculatePageInfo = (announcementPageData) => {
    const totalResults = announcementPageData.length;
    const totalPages = Math.ceil(totalResults / resultsPerPage);

    const startIdx = (currentPage - 1) * resultsPerPage;
    const endIdx = Math.min(startIdx + resultsPerPage, totalResults);

    setTotalResultCount(totalResults);
    setTotalPage(totalPages);
    setStartIndex(startIdx);
    setEndIndex(endIdx);
  }

  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPage) {
      setCurrentPage(page);
    }
  };


  useEffect(()=>{
  calculatePageInfo(announcementPageData)
  },[currentPage,resultsPerPage])

  return (
    <AnnouncementContainer>
      <div className='announcementHeader'>
        <div className='announcementHeaderText'>C3DC Announcements</div>
      </div>
      <div className="option-parent">
        <div className='options'>
          {
            options.map((res, index) => (
              selectedOption === index ?
                <span key={index} onClick={() => setSelectedOption(index)} className='option-selected'>
                  {res}
                </span> :
                <span key={index} onClick={() => setSelectedOption(index)} className='option'>
                  {res}
                </span>
            ))
          }
        </div>
      </div>
      <div className='announcementBody'>
        {
          finalAnnouncementPageData.slice(startIndex, endIndex).map((content, idx) => {
            const isExpanded = expandedIndices.includes(idx);

            return (
              (selectedOption === 0 || content.type === selectedOption) &&
              <div key={idx} className={'announcementCard'}>
                <div className="sectionOne">
                  <div className='sectionOne-first'>
                    <span className="title">{isExpanded ? content.title : content.title.substring(0, 100)}</span>
                    <span className="timestamp">{content.timestamp}</span>
                    <span className="announcementContent" dangerouslySetInnerHTML={{__html: content.verbiage}} />
                    
                  </div>
                  <img src={content.image} width={197} height={172} alt={content.alt} />
                </div>
            

                {
                  content.is_release_notes &&
                  <span
                    onClick={() => {
                      navigator("/release_notes")
                    }}
                    className='announcementButton'>
                    Read More
                  </span>

                }
              </div>
            )
          })
        }

        <div className="announcementPagination">
          <div className="resultsPerPage">
            <span>Result Per Page:</span>
            <select value={resultsPerPage} onChange={(e) => { setResultsPerPage(Number(e.target.value)); setCurrentPage(1); }}>
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
              <option value={100}>100</option>
            </select>
          </div>
          <div>
            Showing {startIndex + 1}-{endIndex} of {totalResultCount}
          </div>
          <div className="pageNavigation">
            <span className="arrow" onClick={() => handlePageChange(currentPage - 1)}>&lt;</span>
            {Array.from({ length: totalPage }, (_, idx) => (
              <span key={idx} className={currentPage === idx + 1 ? 'selected' : 'pageNumbers'} onClick={() => handlePageChange(idx + 1)}>
                {idx + 1}
              </span>
            ))}
            <span className="arrow" onClick={() => handlePageChange(currentPage + 1)}>&gt;</span>
          </div>
        </div>
      </div>
    </AnnouncementContainer>
  )
};

export default AnnouncementPage;