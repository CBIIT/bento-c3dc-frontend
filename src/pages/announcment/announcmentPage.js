import React, { useState } from 'react';
import styled from 'styled-components';
import header from '../../assets/announcment/header.svg';
import ReactHtmlParser from 'html-react-parser';
import { AnnouncementPage } from '../../bento/announcmentPageData';
import cardImg from '../../assets/announcment/card1Image.svg';

const AnnouncmentContainer = styled.div`
  margin: 0 auto;

  .announcmentHeader {
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
  .announcmentBody {
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
  .announcmentText {
    font-family: Inter;
    font-weight: 400;
    font-size: 16px;
    line-height: 24px;
    width: 680px;
    margin-top: 67px;
    margin-left: 44px;

  }
  .announcmentImages {
    width: 343px;
    height: 100%;
    margin-left: 44px;
    display: flex;
    flex-direction: column;
  }


  .upperImg {
    margin-top: 30px;
    margin-bottom: 23px;
  }

  .announcmentLink {
    color: #3156a0;
    font-family: Inter;
    font-weight: 400;
    line-height: 24px;
    padding-right: 20px;
    text-underline-offset: 4px;
  }
  .indent {
    padding-left: 40px;
  }
  .doubleIndent {
    padding-left: 40px;
  }
  .itemList {
    margin: 0;
  }
  .listAlightment {
    padding-left: 27px;
  }
  .sectionTitle{
    font-weight: bold;
  }
  .sectionStart {
    margin-top: 16px;
  }
  .imageMargin {
    margin-right: -387px;
  }
.options {
    display: flex;
    flex-direction: row;
    width: 100%;
    justify-content: center;
    align-items: center;
}

.option {
margin: 10px;
font-size: 16px;
font-style: Open Sans;  
font-weight: 600;
cursor: pointer;
}
.option-selected {
    border-bottom: 3px #07645C solid;
    color: #07645C;
    font-size: 16px;
    margin: 10px;
    font-style: Open Sans;  
    font-weight: 600;
}

.announcmentCard { 
    border: 2px #9FBEB5 solid;
    width: 70%;
    height: 357px;
    border-radius: 20px;
    padding: 25px 30px 25px 30px;
    margin-top: 30px;
}

.announcmentCard .title{
    color: #00838F;
    font-size: 30px;
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
    .announcmentContent{
      font-family: Inter;
      font-size: 16px;
      font-weight: 400;
      line-height: 24px;
      text-align: left;
      margin-top: 10px;
    }

  .announcmentButton{
    font-family: Poppins;
    font-size: 12px;
    font-weight: 400;
    line-height: 19.31px;
    text-align: left;
    color: #3C7D76;
    border: 1px #3C7D76 solid;
    padding: 5px;
    border-radius: 10px;
    margin-top: 40px;
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

const AnnouncmentPage = () => {
  const [selectedOption, setSelectedOption] = useState(0);
  const [options] = useState(["All", "Application Update", "Data Update"]);
  const [currentPage, setCurrentPage] = useState(1);
  const [resultsPerPage, setResultsPerPage] = useState(10);

  const totalResults = AnnouncementPage.length;
  const totalPages = Math.ceil(totalResults / resultsPerPage);

  const startIdx = (currentPage - 1) * resultsPerPage;
  const endIdx = Math.min(startIdx + resultsPerPage, totalResults);

  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <AnnouncmentContainer>
      <div className='announcmentHeader'>
        <div className='announcmentHeaderText'>C3DC Announcements</div>
      </div>
      <div className='options'>
        {
          options.map((res, index) => (
            selectedOption === index ?
              <span key={index} onClick={() => setSelectedOption(index)} className='option-selected'>{res}</span> :
              <span key={index} onClick={() => setSelectedOption(index)} className='option'>{res}</span>
          ))
        }
      </div>
      <div className='announcmentBody'>
        {
          AnnouncementPage.slice(startIdx, endIdx).map((content, idx) => (
            (selectedOption == 0 || content.type == selectedOption) &&
            <div key={idx} className='announcmentCard'>
              <div className="sectionOne">
                <div className='sectionOne-first'>
                  <span className="title">{content.title}</span>
                  <span>{content.timestamp}</span>
                  <span className="announcmentContent">{content.verbiage}</span>
                </div>
                <img src={cardImg} width={159} height={139} alt="announcment" />
              </div>
              <span className='announcmentButton'>
                update
              </span>
            </div>
          ))
        }

        <div className="announcementPagination">
          <div className="resultsPerPage">
            <span>Result Per Page:</span>
            <select value={resultsPerPage} onChange={(e) => { setResultsPerPage(Number(e.target.value)); setCurrentPage(1); }}>
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={50}>50</option>
            </select>
          </div>
          <div>
            Showing {startIdx + 1}-{endIdx} of {totalResults}
          </div>
          <div className="pageNavigation">
            <span className="arrow" onClick={() => handlePageChange(currentPage - 1)}>&lt;</span>
            {Array.from({ length: totalPages }, (_, idx) => (
              <span key={idx} className={currentPage === idx + 1 ? 'selected' : 'pageNumbers'} onClick={() => handlePageChange(idx + 1)}>
                {idx + 1}
              </span>
            ))}
            <span className="arrow" onClick={() => handlePageChange(currentPage + 1)}>&gt;</span>
          </div>
        </div>
      </div>
    </AnnouncmentContainer>
  )
};

export default AnnouncmentPage;