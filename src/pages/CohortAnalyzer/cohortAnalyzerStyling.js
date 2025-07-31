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
        maxWidth: 607,
        height: 523,
        display: 'flex',

        flexDirection: 'column',
        overflow: 'hidden'
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
    rightSideAnalyzer: {
        minWidth: "77%",
        maxWidth: "77%",
        height: 1149,
        borderRadius: '35px',
        border: '4px solid #4E8191',
        margin: 100,
        marginLeft: 30,
        marginTop: 70,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        overflowY: 'hidden'
    },
    rightSideAnalyzerOuterContainer: {
        display: 'flex',
        marginBottom: 40,
        justifyContent: 'flex-start',
        width: "90%"
    },
    rightSideAnalyzerInnerContainer: {
        display: 'flex',
        marginBottom: 40,
        flexDirection: "column"
    },
    rightSideAnalyzerHeader: {
        display: 'flex',
        justifyContent: 'space-between',
        position: 'relative',
        width: '91%',
        alignSelf: 'center',
        alignItems: 'center',
        borderBottom: '1px solid gray',
        "& h1": {
            fontFamily: 'Poppins',
            fontSize: '35px',
            fontWeight: 400,
            textAlign: 'left',
            color: '#0D3A3F',
            marginLeft: '10px'
        }

    },
    rightSideAnalyzerHeader2: {
        display: 'flex',
        justifyContent: 'space-between',
        position: 'relative',
        minWidth: '50%',
        alignItems: 'flex-start',
        marginBottom: '30px',
        zIndex: 900,
        '& p': {
            fontFamily: 'Open Sans',
            fontSize: '15px',
            fontWeight: 400,
            width: 655,
            lineHeight: '20.8px',
            textAlign: 'left',
            color: 'black',
            marginLeft: '10px',
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