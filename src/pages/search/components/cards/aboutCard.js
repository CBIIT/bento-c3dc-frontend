import React from 'react';
import { Grid, withStyles } from '@material-ui/core';

const AboutCard = ({
  searchText, data, classes, index,
}) => {
  const results = data.text.map((result) => result.replaceAll('$', ''));

  function getHighlightedText(text, highlight) {
    // Split on highlight term and include term into parts, ignore case
    const textString = text.reduce((searchResults, currentString, currentIndex) => {
      let newResults = searchResults;
      if (currentString.endsWith('.') || currentIndex >= text.length - 1) {
        newResults = `${`${newResults} ${currentString}`}`;
      } else {
        newResults = `${`${newResults} ${currentString}`} ... `;
      }
      return newResults;
    }, '');
    const parts = textString.split(new RegExp(`(${highlight})`, 'gi'));
    return (
      <span>
        {' '}
        { parts.map((part, i) => (
          <span id={i} key={`part_${i}`} style={part.toLowerCase() === highlight.toLowerCase() ? { color: '#05555C', fontWeight: '700' } : {}}>
            { part }
          </span>
        ))}
        {' '}

      </span>
    );
  }

  return (
    <>
      <Grid item container className={classes.card}>
        {/* <Grid item xs={1} className={classes.indexContainer}>
          {index + 10 }
        </Grid> */}
        <Grid item xs={12} className={classes.propertyContainer}>
          <div>
            {/* <span className={classes.detailContainerHeader}>ABOUT</span> */}
            <a href={`${window.location.origin}${data.page}`} className={classes.cardTitle}>{data.title}</a>
          </div>
          <div className={classes.text}>{getHighlightedText(results, searchText)}</div>
          <div><a className={classes.linkText} href={`${window.location.origin}${data.page}`}>{`${window.location.origin}${data.page}`}</a></div>
        </Grid>
      </Grid>

    </>
  );
};

const styles = (theme) => ({
  cartIcon: {
    height: '22px',
    margin: '0px 0px 0px 6px',
  },
  text: {
    fontFamily: 'Inter',
    fontWeight: '300',
    fontSize: '16px',
    lineHeight: '24px',
    margin: '5px 0',
  },
  linkText: {
    fontFamily: 'Inter',
    fontWeight: '400',
    fontSize: '15px',
    lineHeight: '24px',
    color: '#067781',
    textDecoration: 'none',
  },
  indexContainer: {
    padding: '18px 0px 18px 18px',
    color: '#747474',
    fontFamily: 'Inter',
    fontSize: '13px',
  },
  propertyContainer: {
    padding: '0 0 52px 0px',
  },
  cardTitle: {
    color: '#00838F',
    textDecoration: 'none',
    fontSize: '18px',
    fontFamily: 'Poppins',
    fontWeight: '500',
    verticalAlign: 'middle',
  },
  content: {
    fontSize: '12px',
  },
  detailContainerHeader: {
    textTransform: 'uppercase',
    padding: '2px 8px',
    backgroundColor: '#ECC28B',
    color: '#000000',
    fontFamily: 'Nunito',
    fontSize: '12px',
    fontWeight: '400',
    letterSpacing: '0.9px',
    verticalAlign: 'middle',
    borderRadius: '4px',
  },
});

export default withStyles(styles, { withTheme: true })(AboutCard);
