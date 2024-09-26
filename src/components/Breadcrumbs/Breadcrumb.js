import React from 'react';
import { withStyles } from '@material-ui/core';
import { Link } from 'react-router-dom';
import next from '../../assets/resources/next.svg';

const CustomBreadcrumb = ({ classes, data }) => (
  <div className={classes.headerNav}>
    {
      data.reduce((acc, current, index) => {
        if (current.isALink) {
          acc.push(
            <Link className={classes.headerNavLink} to={current.to} onClick={current.onClick}>
              {current.name}
            </Link>,
          );
        } else {
          acc.push(<span className={classes.headerNavDataUpdate}>{current.name}</span>);
        }
        if (index < data.length - 1) {
          acc.push(
            <img src={next} alt='next arrow'/>

          );
        }
        return acc;
      }, []).map((item) => (item))
    }
  </div>
);

const styles = () => ({
  headerNav: {
    paddingLeft: '40px',
    height: '40px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start'
  },

  headerNavLink: {
    padding: '8px',
    paddingRight: '6px',
    textDecoration: 'undeline',
    color: '#005EA2',
    fontFamily: 'Public Sans',
    fontSize: '16px',
    letterSpacing: '0.025em',
    fontWeight: 400,
    lineHeight: '25.92px'
  },
  headerNavDataUpdate: {
    fontFamily: 'Public Sans',
    color: '#1B1B1B',
    padding: '8px',
    fontSize: '16px',
    fontWeight: '400',
    lineHeight: '26px',
    textAign: 'left'

  },
});

export default withStyles(styles)(CustomBreadcrumb);
