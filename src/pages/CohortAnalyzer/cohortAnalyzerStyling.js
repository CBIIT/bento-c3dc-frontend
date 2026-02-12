import { makeStyles } from "@material-ui/core";
import { max } from "lodash";

export const useStyle = makeStyles((theme) => ({
    container: {
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'row'
    },
    chartContainer: {
        backgroundColor: 'white',
        border: '1px solid #679AAA',
        borderRadius: '10px',
        flex: 1,
        display: 'flex',
        minHeight: 310,
        maxHeight: 620,
        minWidth: 450,
        flexDirection: 'column',
        overflow: 'hidden',
        marginLeft: 6,
        '& .App': {
            width: "95%",
            maxWidth: '95%',
            minWidth: '95%',
            height: "80%",
            padding: "24px 0px 36px 0px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            
            [theme.breakpoints.down('lg')]: { 
                minWidth: '80%'
            }
           
        },
        '& .chart-container': {
            width: '100%',
            height: "100%",
            
            alignItems: "center",
            justifyContent: "center",
            display: "flex",
            marginLeft: 0,      
        },
        [theme.breakpoints.down('lg')]: {
            alignItems: 'center',
            marginLeft: 0,
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
        paddingLeft: 30.5,
        paddingRight: 15,
        minHeight: 69,
        backgroundColor: '#3A7587',
        position: 'relative',
        top: 0,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    chartRadioContainer: {
        display: 'flex',
        flexDirection: 'row',
        marginTop: 0,
        color: 'white',
        padding: 0,
        fontSize: 15,
        gap: 15
    },
    leftAlignedText: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        padding: 10,
        fontSize: 12,
        textAlign: 'start'
    },
    exploreButton: {
        boxSizing: 'border-box',
        minWidth: '189px',
        maxWidth: '189px',
        height: '41px',
        background: '#086C78',
        border: '1.25px solid #4EA1A1',
        borderRadius: '5px',
        color: 'white',
        fontWeight: '600',
        display: 'flex',
        flexDirection: 'row',
        gap: '6px',
        justifyContent: 'center',
        alignItems: 'center',
        cursor: "pointer",
        fontFamily: 'Poppins',
    },
    exploreButtonFaded: {
        boxSizing: 'border-box',
        fontFamily: 'Poppins',
        minWidth: '189px',
        maxWidth: '189px',
        hight: '41px',
        background: '#BBC1C3',
        border: '1.25px solid #4EA1A1',
        borderRadius: '5px',
        color: 'white',
        fontWeight: '600',
        display: 'flex',
        flexDirection: 'row',
        gap: '6px',
        justifyContent: 'center',
        alignItems: 'center'
    },
    demoButton: {
        boxSizing: 'border-box',
        width: '197px',
        height: '29px',
        background: '#ECFAFC',
        border: '1.25px solid #375C67',
        borderRadius: '5px',
        color: '#375C67',
        fontFamily: 'Poppins',
        fontWeight: 600,
        fontSize: '12px',
        lineHeight: '12px',
        letterSpacing: '0.02em',
        textTransform: 'uppercase',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        cursor: 'pointer'
    },
    demoButtonFaded: {
        boxSizing: 'border-box',
        width: '197px',
        height: '29px',
        background: '#F5F5F5',
        border: '1.25px solid #CCCCCC',
        borderRadius: '5px',
        color: '#999999',
        fontFamily: 'Poppins',
        fontWeight: 600,
        fontSize: '12px',
        lineHeight: '12px',
        letterSpacing: '0.02em',
        textTransform: 'uppercase',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        cursor: 'not-allowed'
    },
    demoButtonContainer: {
        position: 'relative',
        marginLeft: '20px'
    },
    demoTooltipContent: {
        fontFamily: 'Poppins',
        fontWeight: 400,
        fontSize: 13,
        margin: 0,
        textAlign: 'center',
        '& p': {
            margin: 0
        }
    },
    // Chart tooltip styles
    chartTooltipContainer: {
        backgroundColor: 'white',
        padding: '10px',
        border: '1px solid #ccc',
        borderRadius: '4px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    },
    chartTooltipText: {
        margin: 0,
        fontFamily: 'Poppins',
        fontSize: '13px',
        fontWeight: 400,
        color: '#000000'
    },
    fieldsetReset: {
        all: 'unset',
        display: 'contents',
    },
    inputStyleContainer: {
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        marginLeft: 15,
        '& img': {
            position: 'relative',
            right: 26,
            width: 14,
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
        fontSize: '15px',
        width: '349px',
        height: '26px',
        gap: '0px',
        borderRadius: '8px',
        margin: 'auto',
        marginLeft: '0px',
        paddingLeft: 13,
        border: '1px solid #8B98AF',
        textDecoration: 'none',
        "&::placeholder": {
            fontFamily: 'Poppins',
            color: '#5D7B87 !important'
        }
    },
    leftSideAnalyzer: {
        minWidth: 268,
        maxWidth: 268,
        height: 588,
        marginTop: 40,
        overflow: 'hidden',
        borderRadius: ' 0px 35px 35px 0px',
        border: '4px solid #4E8191',
        borderLeft: 'none',
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(10px)',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
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
        paddingBottom: 16,
        paddingTop: 16,
        paddingRight: 15,
        [theme.breakpoints.down('lg')]: {
            width: '100%'
        }
    },
    tableSectionOuterContainer: {
        width: '100%',
        border: '1px solid #679AAA',
        borderRadius: 10,
        overflow: 'hidden',
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(10px)',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)'
    },
    rightSideAnalyzer: {
        maxWidth: "100%",
        borderRadius: '35px',
        border: '4px solid #4E8191',
        paddingBottom: 55,
        margin: 100,
        marginLeft: 33,
        marginRight: 33,
        marginTop: 40,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        overflowY: 'visible',
        overflowX: 'visible',
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(10px)',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
        [theme.breakpoints.down('lg')]: {
            alignItems: 'flex-start',
            overflowY: 'scroll',
            padding: '0 0 24px 0',
            height: '100%',
            minWidth: "0"
        }

    },
   rightSideContentContainer: {
    padding: '0 44.5px',
    width: '100%',
   } ,
    rightSideAnalyzerOuterContainer: {
        display: 'flex',
        marginBottom: 45,
        justifyContent: 'flex-start',
        width: "100%",
        marginTop: '20px',
        gap: 26,
        [theme.breakpoints.down('lg')]: {
            flexDirection: 'column',
            gap: 0,
            marginTop: '20px',         
        }
    },
    rightSideAnalyzerInnerContainer: {
        display: 'flex',
        marginBottom: 0,
        flexDirection: "column",

    },
    rightSideAnalyzerHeader: {
        display: 'flex',
        justifyContent: 'space-between',
        position: 'relative',
        width: '100%',
        alignSelf: 'center',
        alignItems: 'center',
        borderBottom: '2.5px solid #679AAA',
        maxHeight: '70px',
        "& h1": {
            fontFamily: 'Poppins',
            fontSize: '35px',
            fontWeight: 400,
            textAlign: 'left',
            color: '#0D3A3F',
            marginLeft: '44.5px',

        }

    },
    rightSideAnalyzerHeader2: {
        display: 'flex',
        justifyContent: 'space-between',
        position: 'relative',
        minWidth: '30%',
        alignItems: 'flex-start',
        marginBottom: '27px',
        paddingBottom: 0,
        zIndex: 900,
        '& p': {
            fontFamily: 'Open Sans',
            fontSize: '15px',
            paddingBottom: 0,
            width: "100%",
            lineHeight: '20.8px',
            textAlign: 'left',
            color: 'black',
            margin: 1,
            marginTop: 0,
            marginLeft: '20px',
            [theme.breakpoints.down('lg')]: {
                width: '100%',
                marginLeft: 0,
            }
        }
    },
    alert: {
        position: 'absolute',
        top: 20,
        margin: 'auto'
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
        borderTop: "3px #679AAA solid",
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