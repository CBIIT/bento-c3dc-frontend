import React, { useState } from 'react';
import { withStyles } from '@material-ui/core';
import SearchIcon from '../../../../assets/icons/Search_Icon.svg';

const SearchBar = (props) => {
    const { classes, initialSearchText, onSearchChange, onSearchBlur } = props;
    
    const [searchText, setSearchText] = useState(initialSearchText || '');

    const handleSearchChange = (e) => {
        const value = e.target.value;
        setSearchText(value);
        if (onSearchChange) {
            onSearchChange(value);
        }
    };

    const handleSearchBlur = (e) => {
        if (onSearchBlur) {
            onSearchBlur(e.target.value);
        }
    };

    return (
        <div className={classes.participantSearchBarSection}>
            <input
                type="text"
                placeholder="Search Participant ID here"
                className={classes.participantSearchBar}
                value={searchText}
                onChange={handleSearchChange}
                onBlur={handleSearchBlur}
                aria-label="Search participants by ID"
            />
            <span className={classes.searchIcon}>
                <img
                    src={SearchIcon}
                    alt="search icon"
                />
            </span>
        </div>
    );
};

const styles = () => ({
    participantSearchBarSection: {
        display: 'flex',
        justifyContent: 'center',
        borderRadius: '8px',
        border: '1px solid #8B98AF',
        width: '92%',
        height: '31px',
        marginTop: '10px',
        marginBottom: '12px',
        backgroundColor: '#FFFFFF',
        '&:focus-within': {
            border: '1px solid #007BFF',
        },
    },
    participantSearchBar: {
        width: '100%',
        height: '100%',
        border: 'none',
        borderRadius: '8px',
        margin: '0px',
        padding: '0px',
        outline: 'none',
        paddingLeft: '17px',
        fontFamily: 'Poppins',
        fontSize: '15px',
        fontWeight: '400',
        lineHeight: '26px',
        color: '#5D7B87',
        '&::placeholder': {
            color: '#5D7B87',
            fontWeight: '300',
        },
    },
    searchIcon: {
        height: '100%',
        width: '14px',
        marginRight: '8px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: '1px',
        '&:hover': {
            cursor: 'pointer',
        },
    },
});

export default withStyles(styles, { withTheme: true })(SearchBar);