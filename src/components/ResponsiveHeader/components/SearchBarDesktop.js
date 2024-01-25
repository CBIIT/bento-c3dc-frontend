import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import clearIcon from '../../../assets/header/Clear_Icon.svg'

const SearchBarContainer = styled.div`
    display: flex;

    .searchBar {
      margin-left: auto;
      width: 224px;
      height: 32px;
      border: 1px solid #71767A;
    }

    .searchButton {
      height: 32px;
      font-family: Open Sans;
      font-weight: 700;
      font-size: 1rem;
      line-height: 33px;
      text-align: center;
      color: #FFFFFF;
      background: #007BBD;
      padding: 0 13px;
      border-radius: 0px 5px 5px 0px;
    }

    .searchButton:hover {
      cursor: pointer;
      background: #004971;
    }
`;

const SearchInput = styled.input`
  margin: -1px 0 0 -1px;
  padding: 0 7px;
  border: none;
  font-family: Open Sans;
  font-weight: 400;
  font-size: 1rem;
  line-height: 42px;
  color: #1b1b1b;
  width: 224px;
  height: 32px;
  background: transparent;

  ::placeholder {
    color: #a9b2b9;
  }

  :focus {
    outline: 0.25rem solid #2491ff;
  }

  input[type="search"]::-webkit-search-cancel-button {
    position: relative;
    -webkit-appearance: none;
    height: 20px;
    width: 20px;
    background: url(${clearIcon}) right center no-repeat;
    background-image: url(${clearIcon}) red;
    background-size: 20px;
    cursor: pointer;
  }

  input[type="search"]:focus::-webkit-search-cancel-button {
    position: relative;
    -webkit-appearance: none;
    height: 20px;
    width: 20px;
    background: url(${clearIcon}) right center no-repeat;
    background-image: url(${clearIcon}) red;
    background-size: 20px;
    cursor: pointer;
  }
`;

const SearchBar = () => {
  const navigate = useNavigate();
  const [localText, setLocalText] = useState("");

  const handleTextInputChange = (event) => {
    const text = event.target.value;
    setLocalText(text);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      navigate(`/sitesearch?keyword=${localText.trim()}`);
      setLocalText("");
    }
  };

  const handleSearch = () => {
    navigate(`/sitesearch?keyword=${localText.trim()}`);
    setLocalText("");
  };

  return (
        <SearchBarContainer>
            <div className='searchBar'>
                <label htmlFor="search_desktop">
                    <div style={{display:"none"}}>search</div>
                    <SearchInput id="search_desktop" type="search" value={localText} placeholder="search C3DC" onChange={handleTextInputChange} onKeyPress={handleKeyPress} />
                  </label>
                </div>
            <div className='searchButton' onClick={handleSearch}>Search</div>
        </SearchBarContainer>
  );
};

export default SearchBar;