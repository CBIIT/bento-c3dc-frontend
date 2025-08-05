import { makeStyles } from "@material-ui/core";

export const useStyle = makeStyles((theme) => ({
    container: {
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'row'
    },
    chartContainer: {
        backgroundColor: 'white',
        border: '0.75px solid #679AAA',
        borderRadius: '10px',
        width: '100%',
        maxWidth: 707,
        minHeight: 615,
        display: 'flex',
        flexDirection: 'column',
        maxHeight: 585,
        overflow: 'hidden',
         marginLeft: 6,
        [theme.breakpoints.down('lg')]: {
            maxWidth: '99%',
            height: '100%',
            overflow: 'visible',
            paddingBottom: '24px',
            alignItems: 'center',
            marginLeft: 8,
            '& .App': {
                maxWidth: '60%',
            }
        }
    },
    chartVennPlaceholder: {
        width: 725,
        [theme.breakpoints.down('lg')]: {
            width: '100%',
        }
    },
    chartContainerHeader: {
        width: '100%',
        height: 69,
        backgroundColor: '#3A7587',
        position: 'relative',
        top: 0,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    chartRadioContainer: {
        display: 'flex',
        flexDirection: 'row',
        marginTop: 0,
        marginLeft: 11,
        color: 'white',
        padding: 0,
        fontSize: 15,
        gap: 15
    },
    exploreButton: {
        boxSizing: 'border-box',
        minWidth: '189px',
        height: '41px',
        background: '#086C78',
        border: '1.25px solid #4EA1A1',
        borderRadius: '5px',
        color: 'white',
        fontWeight: '400',
        display: 'flex',
        flexDirection: 'row',
        gap: '6px',
        justifyContent: 'center',
        alignItems: 'center',
        cursor: "pointer"
    },
    exploreButtonFaded: {
        boxSizing: 'border-box',
        minWidth: '189px',
        height: '41px',
        background: '#BBC1C3',
        border: '1.25px solid #4EA1A1',
        borderRadius: '5px',
        color: 'white',
        fontWeight: '400',
        display: 'flex',
        flexDirection: 'row',
        gap: '6px',
        justifyContent: 'center',
        alignItems: 'center'
    },
    fieldsetReset: {
        all: 'unset',
        display: 'contents',
    },
    sortCount: {
        display: 'flex',
        margin: 0,
        alignItems: 'center',
        marginRight: 25,
        cursor: 'pointer'
    },
    inputStyleContainer: {
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        marginLeft: 15,
        '& img': {
            position: 'relative',
            right: 26,
            width: 12,
            height: 13
        }
    },
    cardContent: {
        fontFamily: 'Nunito',
        fontSize: '12px',
        fontWeight: 300,
        lineHeight: '16.37px',
        textAlign: 'left',
    },
    inputStyle: {
        fontFamily: 'Poppins',
        fontWeight: 300,
        width: '349px',
        height: '26px',
        gap: '0px',
        borderRadius: '8px',
        margin: 'auto',
        marginLeft: '0px',
        paddingLeft: 13,
        border: '1px solid #8B98AF',
        textDecoration: 'none',
        "&::placeolder": {
            fontFamily: 'Poppins',
            color: 'red'
        }
    },
    leftSideAnalyzer: {
        minWidth: 268,
        maxWidth: 268,
        height: 588,
        marginTop: 70,
        overflow: 'hidden',
        borderRadius: ' 0px 35px 35px 0px',
        border: '4px solid #4E8191',
        borderLeft: 'none',

    },
    leftSideAnalyzerChild: {
        height: '90%',
        overflowY: 'scroll',
        '&::-webkit-scrollbar': {
            width: "2px"
        },
        '&::-webkit-scrollbar-thumb': {
            width: "2px",
            backgroundColor: '#003F74'
        },
        '&::-webkit-scrollbar-track': {
            background: '#4E8191',
        },
    },
    cohortSelectionChild: {
        display: 'flex',
        alignItems: 'start',
        width: '100%',
        '& span': {
            fontSize: 12,
            fontFamily: 'Poppins',
            fontWeight: 500
        }
    },
    cohortChildSelected: {
        width: '100%',
        height: 28,
        display: 'flex',
        marginBottom: 2,
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    CohortChild: {
        background: 'rgba(181, 221, 229, 0.4)',
        width: '100%',
        height: 28,
        display: 'flex',
        marginBottom: 2,
        alignItems: 'center',
        justifyContent: 'space-between',
        '&:nth-child(even)': {
            background: 'rgba(165, 194, 200, 0.4)'
        },
        '& span': {
            color: 'black'
        },
        '& div img': {
            opacity: 1
        }
    },
    CohortChildOpacity: {
        background: 'rgba(181, 221, 229, 0.2)',
        width: '100%',
        height: 28,
        display: 'flex',
        marginBottom: 2,
        alignItems: 'center',
        justifyContent: 'space-between',
        '&:nth-child(even)': {
            background: 'rgba(165, 194, 200, 0.2)'
        },
        '& span': {
            color: 'black'
        },
        '& div img': {
            opacity: 1
        }
    },
    CohortChildDisabled: {
        background: '#E2F1F5',
        width: '100%',
        height: 28,
        display: 'flex',
        marginBottom: 2,
        alignItems: 'center',
        opacity: 0.3,
        pointerEvents: 'auto',
        justifyContent: 'space-between',
        '&:nth-child(even)': {
            background: 'rgba(165, 194, 200, 0.4)'
        },
        '& span': {
            color: 'black'
        },
        '& div img': {
            opacity: 1
        }
    },
    sideHeader: {
        height: 125,
        fontFamily: 'Poppins',
        fontSize: 18.5,
        fontWeight: 500,
        color: '#000',
        letterSpacing: '-0.02em',
        textAlign: 'left',
        width: '100%',
        display: 'flex',
        paddingTop: 20,
        flexDirection: 'column',
        alignSelf: 'center',
        margin: 'auto',
        borderBottom: '1px solid #B0B0B0',
        paddingLeft: 20,
        justifyContent: 'flex-start',
        justifyItems: 'flex-start',
        '& img': {
            marginRight: 6.5,
        },
        '& p': {
            fontFamily: 'Open Sans',
            fontSize: 15,
            fontWeight: 400,
            color: 'black',
            padding: 0,
        }
    },
    sortSection: {
        height: 31,
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
        marginLeft: 20,
        '& p': {
            fontSize: 9
        }
    },
    cohortCountSection: {
        fontFamily: 'Poppins',
        fontSize: 15,
        fontWeight: 500,
        letterSpacing: -0.02,
        textAlign: 'left',
        minHeight: 58.94,
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
        width: '100%',
        paddingBottom: 10,
        paddingRight: 0,
        paddingRight: 15,
        [theme.breakpoints.down('lg')]: {
            width: '100%'
        }
    },
    tableSectionOuterContainer: {
        width: '97.5%',
        marginLeft: 10,
        border: '0.75px solid #679AAA',
        borderRadius: 10,
        overflow: 'hidden'
    },
    rightSideAnalyzer: {
        minWidth: "81%",
        maxWidth: "100%",
        borderRadius: '35px',
        border: '4px solid #4E8191',
        margin: 100,
        marginLeft: 10,
        marginTop: 70,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        overflowY: 'visible',
        overflowX: 'hidden',
        [theme.breakpoints.down('lg')]: {
            alignItems: 'flex-start',
            padding: '0 24px 24px 24px',
            overflowY: 'scroll',
            height: '100%',
        }
        
    },
    rightSideAnalyzerOuterContainer: {
        display: 'flex',
        marginBottom: 40,
        justifyContent: 'flex-start',
        width: "98%",
        [theme.breakpoints.down('lg')]: {
            flexDirection: 'column',
        }
    },
    rightSideAnalyzerInnerContainer: {
        display: 'flex',
        marginBottom: 0,
        flexDirection: "column"
    },
    rightSideAnalyzerHeader: {
        display: 'flex',
        justifyContent: 'space-between',
        position: 'relative',
        width: '105%',
        alignSelf: 'center',
        alignItems: 'center',
        borderBottom: '1px solid gray',
        "& h1": {
            fontFamily: 'Poppins',
            fontSize: '35px',
            fontWeight: 400,
            textAlign: 'left',
            color: '#0D3A3F',
            marginLeft: '65px',
             [theme.breakpoints.down('lg')]: {
                marginLeft: '35px'
            }
            
        }

    },
    rightSideAnalyzerHeader2: {
        display: 'flex',
        justifyContent: 'space-between',
        position: 'relative',
        minWidth: '30%',
        alignItems: 'flex-start',
        marginBottom: '30px',
        zIndex: 900,
        '& p': {
            fontFamily: 'Open Sans',
            fontSize: '15px',
            
            width: "100%",
            lineHeight: '20.8px',
            textAlign: 'left',
            color: 'black',
            marginLeft: '10px',
            [theme.breakpoints.down('lg')]: {
                width: '100%',
            }
        }
    },
    alert: {
        position: 'absolute',
        top: 20,
        margin: 'auto'
    },
    cohortChildContent: {
        width: '95%', display: 'flex',
        height: '100%',
        justifyContent: 'space-between',
        alignItems: 'center',
        color: 'black',
        '& div span': {
            color: 'black',
            fontFamily: 'Nunito',
            fontSize: 14,
            fontWeight: 300,
            textAlign: 'left',
        },
        '& img': {
            position: 'relative',
            zIndex: 10000,
        }
    },
    catagoryCard: {
        borderRadius: '8px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        minWidth: 297,
        height: 194,
        marginLeft: 0,
        paddingBottom: 30,
        border: '1px solid #8B98AF',
        alignItems: 'center',
        alignContent: 'center',
        '& h3': {
            fontFamily: 'Poppins',
            fontSize: '18px',
            fontWeight: 400,
            textAlign: 'center',
            color: '#000',
        },
    },
    catagoryCardChildren: {
        width: '50%',
        minHeight: 75,
        alignSelf: 'center',
        display: 'flex',
        overflow: 'hidden',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start',
        color: '#5D7B87',

        '& p': {
            top: 325,
            gap: 9,
            fontSize: 14,
            fontFamily: 'Poppins',
            fontWeight: 300,
            lineHeight: 2,
            margin: 0,
            cursor: 'pointer',
            '& input': {
                cursor: 'pointer'
            }

        }
    },
    rightSideTableContainer: {
        width: '100%',
        maxHeight: 540,
        overflowY: 'scroll',
        borderTop: "3.07px #8A7F7C solid",
        '&::-webkit-scrollbar': {
            width: "6px"
        },
        '&::-webkit-scrollbar-thumb': {
            width: "6px",
            backgroundColor: '#003F74'
        },
        '&::-webkit-scrollbar-track': {
            background: '#CECECE',
        },
        
        [theme.breakpoints.down('lg')]: {
            width: '100%',
        }
    }
}))