import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import header from '../../assets/announcement/header.svg';
import { defaultVersion, releaseNotePageData, versionList } from '../../bento/releaseNotePageData';
import { ArrowBackOutlined, ArrowDropUp, ArrowRight, ArrowUpward, ArrowUpwardSharp } from '@material-ui/icons';
import exportIcon from '../../assets/about/Export_Icon.svg';
//import header from '../../assets/announcement/header.svg';


const ReleaseNoteContainer = styled.div`
 margin: 0 auto;
 display: flex;
 flex-direction: column;
 aling-items: center;
 justify-content: center;
 .releaseNoteHeader {
   font-family: Poppins;
   font-weight: 500;
   font-size: 35px;
   background-image: url(${header});
   line-height: 45px;
   height: 167px;
   letter-spacing: 0.15px;
   color: #FFFFFF;
   text-align: center;
   margin-top: 0px;
  
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
 .releaseNoteBody {
   display: flex;
   justify-content: center;
   gap: 30px;
   margin-top: 40px;
   background-size: cover;  /* Ensures the background image covers the entire container */
   background-repeat: no-repeat;  /* Disable repeating */
   background-position: center;  /* Center the image */
   flex-direction: row;
   align-items: flex-start;
   background-width: 100%;
   padding-bottom: 100px;
   height: 800px;
 }
.versionSelector {
   width: 303px;
   height: 314px;
   border: 2px #4D7874 solid;
   border-radius: 20px;
   background-color: white;  
   overflow:hidden;
   overflow-y: scroll;
   }
.releaseNoteSection {
   width: 706px;
   height: 719px;
   border: 2px #9FBEB5 solid;
   border-radius: 20px;
   background-color: white;
   display: flex;
   flex-direction: column;
   padding: 25px;
   padding-top: 15px;
   overflow-y: scroll;
font-family: Nunito;
font-size: 16px;
font-weight: 400;
line-height: 23.2px;
text-align: left;

}
.second-title {
font-family: Nunito;
font-size: 16px;
font-weight: 700;
line-height: 23.2px;
text-align: left;
}







.releaseNoteSection .title{
   color: #00838F;
   font-size: 30px;
   font-weight: 900;
   font-family: Poppins;
   font-size: 28px;
   line-height: 32px;
   letter-spacing: -0.02em;
   text-align: left;
   margin-bottom: 10px;
}


 .date{

font-family: Nunito;
font-size: 11px;
font-weight: 600;
line-height: 15px;
letter-spacing: 0.03em;
text-align: right;
color: #000;
}

 .releaseLink {
    color: #3156a0;
    font-family: Inter;
    font-weight: 400;
    line-height: 24px;
    padding-right: 20px;
    background: url(${exportIcon}) right center no-repeat;
    text-underline-offset: 4px;
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
.releaseNoteContent{
     font-family: Inter;
     font-size: 16px;
     font-weight: 400;
     line-height: 24px;
     text-align: left;
     margin-top: 10px;
   }
 .releaseNoteButton{
   font-family: Poppins;
   font-size: 12px;
   font-weight: 400;
   line-height: 19.31px;
   text-align: left;
   color: #3C7D76;
   border: 1px #3C7D76 solid;
   padding: 5px;
   border-radius: 10px;
   margin: 10px;
   margin-top: 40px;
}
.releaseNotePagination {
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
 .versionSelector .yearsectionTitle{
   width: 100%;
   
   position: relative;
   height: 51px;
   background: #F4F4F4;
   border: none;
   display: flex;
   align-items: center;
   padding-left: 24px;
   font-family: Poppins;
    font-size: 15px;
    font-weight: 600;
    text-align: left;

 }
.versionSelector .year{
 width: 100%;
 height: 40px;
 background-color: white;
 border: none;
 padding-left: 20px;
 color: #006A8F;
 font-size: 20px;
 font-weight: 500;
 display: flex;
 padding-top:10px;
 aling-items: center;
 font-family: Poppins;
font-size: 16px;
font-weight: 600;
line-height: 24px;
letter-spacing: -0.02em;
text-align: left;

}
 .version{
   width: 100%;
   height: 28px;
   border: 0px;
   background-color: #B5DDE580;
   display: flex;
   flex-direction: row;
   justify-content: space-between;
   align-items: center;
   padding-left: 16.5px;
   font-family: Nunito;
    font-size: 14px;
    font-weight: 300;
    line-height: 19.1px;
    text-align: left;
margin-bottom: 2px;
  color: #000000;
 }
 .version:nth-child(even){
   background-color: #DBE7E980;
 }
.descriptionDate {
      font-family: Inter;
      font-size: 13px;
      font-weight: 300;
      line-height: 24px;
      text-align: left;

}
      .linkOutText {
      font-family: Poppins;
        font-size: 16px;
        font-weight: 600;
        line-height: 24px;
        letter-spacing: -0.02em;
        text-align: center;
        background: url(${exportIcon}) right center no-repeat;
        width: 100%;
        color: #3156A0;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-top:20px;
;
      

}

  .checkbox{
   margin: 10px;
 }


`;



 function ReleaseNotePage() {
  const [list_versions, setListVersions] = useState(releaseNotePageData);
  const [selectedVersion, setSelectedVersion] = useState(defaultVersion);
 
 
  const handelYearSelection = index => {
    let versions = list_versions.map((res, i) => {
      if (i === index) {
        res.is_open = !res.is_open;
      } else if (i !== index) {
        // res.is_open = false;
      }
      return res;
    });
 
 
    setListVersions(versions);
  };
 
 
 
 
  const handelCheckbox = (yearIndex,versionIndex,version) => {
    let versions = list_versions.map((res, i) => {
      if (i === yearIndex) {
        
        res.versions.map((version, index) => {
          if (index === versionIndex) {
            version.selected = !version.selected;
          } else {
            version.selected = false;
          }
          return version;
        });
      }else{
        res.versions.map((version, index) => {
          version.selected = false;
          return version;
        });
      }
      return res;
    });
    setListVersions(versions);
    setSelectedVersion(version);
  }
 
 
 
 
  return (
    <ReleaseNoteContainer>
      <div className='releaseNoteHeader'>
        <div className='releaseNoteHeaderText'>Release Notes</div>
      </div>
 
 
      <div className='releaseNoteBody'>
        <div>
        <div className='versionSelector'>
          <div className='yearsectionTitle'>{'RELEASE NOTES'}</div>
          {list_versions.map((release, yearIndex) => {
            return (
              <>
                <button
                  onClick={() => {
                    handelYearSelection(yearIndex);
                  }}
                  className='year'
                >
                  { release.is_open? <ArrowDropUp /> : <ArrowRight />}
                   {release.Year}{' '}
                </button>
                <div className='version_list'>
                  {release.is_open &&
                    release.versions.map((versions, versionIndex) => {
                      return (
                        <button className='version'>
                          <div>
                            <input
                              onChange={() => {
                                handelCheckbox(yearIndex, versionIndex, versions.Version);
                              }}
                              checked={versions.selected}
                              className='checkbox'
                              type='checkbox'
                              name=''
                            />
                            {versions.Version}
                          </div>
                          <span className='date'>{versions.date}</span>
                        </button>
                      );
                    })}
                </div>
              </>
            );
          })}
        </div>
        <span className="linkOutText">Software Release Notes</span>
        </div>
 
        <div className='releaseNoteSection' dangerouslySetInnerHTML={{ __html: versionList[selectedVersion] }} >
    
        </div>
     </div>
    </ReleaseNoteContainer>
  );
 }
 
export default ReleaseNotePage;