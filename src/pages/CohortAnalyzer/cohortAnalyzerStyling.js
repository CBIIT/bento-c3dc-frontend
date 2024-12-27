import { makeStyles } from "@material-ui/core";

export const useStyle = makeStyles((theme) => ({
    container: {
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'row'
    },
    createCohort: {
        width: "199px",
        height: "41px",
        padding: "12px 30px 12px 30px",
        gap: "10px",
        borderRadius: "5px",
        opacity: "0px",
        border: "1.25px solid #73C7BE",
        background: "#375C67",
        color: 'white',
        fontFamily: "Poppins",
        fontSize: "12px",
        fontWeight: 600,

    },
    createCohortOpacity: {
        width: "199px",
        height: "41px",
        padding: "12px 30px 12px 30px",
        gap: "10px",
        borderRadius: "5px",
        border: "1.25px solid #73C7BE",
        background: "#375C67",
        color: 'white',
        opacity: 0.4,
        fontFamily: "Poppins",
        fontSize: "12px",
        fontWeight: 600,
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
        width: '349px',
        height: '29px',
        gap: '0px',
        borderRadius: '8px',
        margin: 'auto',
        marginLeft: '0px',
        paddingLeft: 13,
        border: '1px solid #8B98AF',
        textDecoration: 'none'
    },
    leftSideAnalyzer: {
        width: 268,
        height: 588,
        marginTop: 70,
        overflowY: 'hidden',
        borderRadius: ' 0px 35px 35px 0px',
        border: '1px solid #B0B0B0',

    },
    leftSideAnalyzerChild: {
        height: '90%',
        overflowY: 'scroll',
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
    },
    cohortSelectionChild: {
        display: 'flex',
        alignItems: 'start'
    },
    CohortChild: {
        background: '#E2F1F5',
        width: '100%',
        height: 28,
        display: 'flex',
        marginBottom: 2,
        alignItems: 'center',
        justifyContent: 'space-between',
        '&:nth-child(even)': {
            backgroundColor: '#DAE7E9'
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
            backgroundColor: '#DAE7E9'
        },
        '& span': {
            color: 'black'
        },
        '& div img': {
            opacity: 1
        }
    },
    sideHeader: {
        height: 62,
        fontFamily: 'Poppins',
        fontSize: 18.5,
        fontWeight: 500,
        color: '#000',
        letterSpacing: '-0.02em',
        textAlign: 'left',
        width: '100%',
        verticalAlign: 'center',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        alignSelf: 'center',
        margin: 'auto',
        borderBottom: '1px solid #B0B0B0',
        paddingLeft: 15,
        paddingRight: 15,
        '& img': {
            marginRight: 6.5
        }
    },
    sortSection: {
        height: 31,
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
        marginLeft: 10,
        marginRight: 25,
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
        justifyContent: 'space-between',
        width: '90%',
        paddingBottom: 10,
        borderTop: '1.02px #8A7F7C solid'
    },
    rightSideAnalyzer: {
        width: 1327,
        height: 1149,
        borderRadius: '35px',
        border: '4px solid #4E8191',
        margin: 100,
        marginLeft: 50,
        marginTop: 70,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        overflowY: 'hidden'
    },
    rightSideAnalyzerHeader: {
        display: 'flex',
        justifyContent: 'space-between',
        position: 'relative',
        width: '90%',
        alignSelf: 'center',
        alignItems: 'center',
        borderBottom: '1px solid gray',
        "& h1": {
            fontFamily: 'Poppins',
            fontSize: '35px',
            fontWeight: 400,
            textAlign: 'left',
            color: '#0D3A3F'
        }
   
    },
    rightSideAnalyzerHeader2: {
        display: 'flex',
        justifyContent: 'space-between',
        position: 'relative',
        width: '90%',
        alignSelf: 'center',
        alignItems: 'center',
        marginBottom: '30px',  
        '& p': {
            fontFamily: 'Open Sans',
            fontSize: '16px',
            fontWeight: 400,
            lineHeight: '20.8px',
            textAlign: 'left',
            color: 'black',
        }
    },
    cohortChildContent: {
        width: '95%', display: 'flex',
        height: '100%',
        justifyContent: 'space-between',
        alignItems: 'center',
        opacity: '1 !important',
        color: 'black',
        '& div span': {
            color: 'black',
            opacity: 1,
            fontFamily: 'Nunito',
            fontSize: 14,
            fontWeight: 300,
            textAlign: 'left',
        },
        '& img': {
            opacity: 1,
            position: 'relative',
            zIndex: 10000,
        }
    },
    catagoryCard: {
        width: '208px',
        height: '230px',
        top: '245px',
        left: '1011px',
        gap: '0px',
        border: '1px 0px 0px 0px',
        opacity: '0px',
        border: '1px solid #8B98AF',
        borderRadius: '8px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        '& h3': {
            fontFamily: 'Poppins',
            fontSize: '16px',
            fontWeight: 400,
            lineHeight: '19.2px',
            letterSpacing: '-0.01em',
            textAlign: 'center'

        },
    },
    catagoryCardChildren: {
        width: '80%',
        height: '80%',
        alignSelf: 'center'
    },

    rightSideTableContainer: {
        width: '90%',
        height: 540,
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
    }
}))