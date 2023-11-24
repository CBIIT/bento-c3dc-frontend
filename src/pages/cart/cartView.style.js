import exportIcon from '../../assets/cart/Export_Icon.svg';

export default () => ({
  backgroundContainer: {
    background: '#E7EEF5',
    paddingTop: '70px',
    paddingBottom: '80px',
  },
  myFilesWrapper: {
    position: 'relative',
    border: '#4555AB 4px solid',
    borderRadius: '35px',
    marginLeft: '3%',
    marginRight: '3%',
    paddingBottom: '82px',
    background: 'white',
    paddingRight: '3%',
    paddingLeft: '3%',
  },
  textContainer: {
    position: 'absolute',
    top: '90px',
    left: '70px',
    width: '1000px',
    fontFamily: 'Inter',
    fontSize: '16px',
    fontWeight: '400',
    color: '#000000',
    zIndex: '2',
    '& a': {
      fontFamily: 'Poppins',
      fontWeight: '600',
      color: '#004C73',
    },
    '& p': {
      margin: '6px 0 6px 0',
    }
  },
  customTooltip: {
    border: '#03A383 1px solid',
  },
  cartIntroLink: {
    paddingRight: '20px',
    background: `url(${exportIcon}) right center no-repeat`,
  }
});
