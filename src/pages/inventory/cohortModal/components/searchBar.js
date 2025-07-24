import React, { useState, useEffect, useCallback, memo, useRef } from 'react';
import { withStyles } from '@material-ui/core';
import SearchIcon from '../../../../assets/icons/Search_Icon.svg';

const SearchBar = (props) => {
    const { classes, initialSearchText, onSearchChange, onSearchBlur } = props;
    
    const [searchText, setSearchText] = useState(initialSearchText || '');
    const inputRef = useRef(null);

    // Sync with prop changes (including clearing when cohorts change)
    useEffect(() => {
        setSearchText(initialSearchText || '');
    }, [initialSearchText]);

    // Memoized event handlers for better performance
    const handleSearchChange = useCallback((e) => {
        const value = e.target.value;
        setSearchText(value);
        if (onSearchChange) {
            onSearchChange(value);
        }
    }, [onSearchChange]);

    const handleSearchBlur = useCallback((e) => {
        if (onSearchBlur) {
            onSearchBlur(e.target.value);
        }
    }, [onSearchBlur]);

    // Clear search functionality
    const handleClear = useCallback(() => {
        setSearchText('');
        if (onSearchChange) {
            onSearchChange('');
        }
    }, [onSearchChange]);

    // Focus on search icon click
    const handleIconClick = useCallback(() => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    }, []);

    return (
        <div className={classes.participantSearchBarSection}>
            <input
                ref={inputRef}
                type="text"
                placeholder="Search Participant ID here"
                className={classes.participantSearchBar}
                value={searchText}
                onChange={handleSearchChange}
                onBlur={handleSearchBlur}
                aria-label="Search participants by ID"
            />
            {searchText && (
                <button
                    type="button"
                    className={classes.clearButton}
                    onClick={handleClear}
                    aria-label="Clear search"
                >
                    ×
                </button>
            )}
            <span className={classes.searchIcon} onClick={handleIconClick}>
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
    clearButton: {
        background: 'none',
        border: 'none',
        fontSize: '18px',
        color: '#8B98AF',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '20px',
        height: '100%',
        marginRight: '4px',
        '&:hover': {
            color: '#5D7B87',
        },
        '&:focus': {
            outline: 'none',
            color: '#007BFF',
        },
    },
});

export default memo(withStyles(styles, { withTheme: true })(SearchBar));