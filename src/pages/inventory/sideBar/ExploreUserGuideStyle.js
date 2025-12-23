import exportIconBlue from '../../../assets/icons/Export_Icon.svg';

export default () => ({
    closeButton: {
        position: 'absolute',
        top: '15px',
        right: '24px',
        backgroundColor: 'transparent',
    },
    paperArea: {
        display: 'flex',
        paddingLeft: '64px',
        paddingTop: '54px',
    },
    navSection: {
        minWidth: '267px',
        color: '#477C90',
        position: 'relative',
    },
    navTitle: {
        fontFamily: 'Poppins',
        fontWeight: 600,
        fontSize: '17px',
        lineHeight: '20px',
        letterSpacing: '0.02em',
        marginBottom: '20px',
    },
    navTopicItem: {
        marginBottom: '20px',
        color: '#477C90',
        textDecoration: 'none',
        fontFamily: 'Inter',
        fontWeight: 400,
        fontSize: '16px',
        letterSpacing: '0.01em',
        lineHeight: '19px',
        '&:hover': {
            cursor: 'pointer',
        },
    },
    navTopicItemSelected: {
        marginBottom: '20px',
        color: '#477C90',
        textDecoration: 'none',
        fontFamily: 'Inter',
        fontWeight: 600,
        fontSize: '16px',
        letterSpacing: '0.01em',
        lineHeight: '19px',
        '&:hover': {
            cursor: 'pointer',
        },
    },
    contentSection: {
        display: 'flex',
        padding: '0px 64px 0px 50px',
        height: '683px',
        overflow: 'auto',
        '&::-webkit-scrollbar': {
            width: '7px',
            borderWidth: '0px 1px 1px 1px',
            borderStyle: 'solid',
            borderColor: '#B0B0B0',
        },
        '&::-webkit-scrollbar-track': {
            backgroundColor: '#CECECE',
        },
        '&::-webkit-scrollbar-thumb': {
            backgroundColor: '#2D83B1',
        },
    },
    contentTitle: {
        fontFamily: 'Poppins',
        fontWeight: '600',
        fontSize: '35px',
        lineHeight: '38px',
        marginBottom: '0px',
        color: '#05555C',
    },
    sectionTitle: {
        fontFamily: 'Poppins',
        fontWeight: '600',
        fontSize: '25px',
        lineHeight: '27px',
        letterSpacing: '-0.02em',
        marginTop: '20px',
        marginBottom: '20px',
        color: '#007A85',
    },
    sectionSubTitle: {
        fontFamily: 'Poppins',
        fontWeight: '400',
        fontSize: '22px',
        lineHeight: '26px',
        letterSpacing: '-0.02em',
        marginBottom: '20px',
        color: '#05555C',
        textTransform: 'uppercase',
    },
    contentContainer: {
        fontFamily: 'Inter',
        fontWeight: 400,
        fontSize: '16px',
        lineHeight: '22px',

        '& a': {
            color: '#455299',
            fontWeight: 700,
            textDecoration: 'underline',
            textUnderlinePosition: 'under',
        },

        '& li': {
            marginBottom: '10px',
        }
    },
    alphaList: {
        listStyleType: 'lower-alpha',
    },
    figureContainer: {
        textAlign: 'center',
        marginTop: '10px',
    },
    figureText: {
        fontFamily: 'Inter',
        fontSize: '14px',
        fontStyle: 'italic',
        fontWeight: 500,
        lineHeight: '18px',
        letterSpacing: '-0.02em',
        textAlign: 'center',
    },
    customButton: {
        borderRadius: '9px',
        maxWidth: '30px',
        maxHeight: '30px',
        minWidth: '30px',
        minHeight: '30px',
        marginTop: '0px',
        fontSize: 9,
        textTransform: 'none',
        color: '#3d4241',
        marginLeft: '0px',
        backgroundColor: '#ffffff',
        border: '1px solid #063134',
        '&:hover': {
          backgroundColor: '#063134',
          border: '1px solid #063134',
          color: 'white',
        },
    },
    linkButtonStyle: {
        color: '#455299',
        fontWeight: 700,
        textDecoration: 'underline',
        textUnderlinePosition: 'under',
        '&:hover': {
            cursor: 'pointer',
        },
    },
    link: {
        paddingRight: '20px', 
        background: `url(${exportIconBlue}) right center no-repeat`,
    }
});