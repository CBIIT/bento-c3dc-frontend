import React from "react";
import { makeStyles } from '@material-ui/core';

export const CreateNewCOhortButton = ({ selectedCohortSection, questionIcon, rowData, handleClick, ToolTip }) => {

    const classes = useStyles();

    return (
        <div style={{ display: 'flex', justifyContent: 'space-between', marginRight: '-10px' }}>
            <button
              
                onClick={() => handleClick()}
                className={(selectedCohortSection && selectedCohortSection.length === 0) || (rowData && rowData.length === 0)
                    ? classes.createCohortOpacity
                    : classes.createCohort}
                style={{ color: 'white' }}
            >
                CREATE NEW COHORT
            </button>


            <ToolTip title={"Click to create a new cohort based on these analysis results."} arrow placement="top">
                <div
                    style={{ textAlign: 'right', marginLeft: 5}}
                >
                    <img alt={"Question Icon"} src={questionIcon} width={10} style={{ fontSize: 10, position: 'relative', top: -5, left: -3 }} />
                </div>
            </ToolTip>
        </div>

    )
}


const useStyles = makeStyles((theme) => ({
    createCohort: {
        width: "199px",
        height: "41px",
        padding: "12px 30px 12px 30px",
        gap: "10px",
        borderRadius: "5px",
        opacity: "0px",
        border: "1.25px solid #73C7BE",
        background: "#556469",
        color: 'white',
        fontFamily: "Poppins",
        fontSize: "12px",
        fontWeight: 600,
        cursor: 'pointer',
    },
    createCohortOpacity: {
        width: "199px",
        height: "41px",
        padding: "12px 30px 12px 30px",
        gap: "10px",
        borderRadius: "5px",
        backgroundColor: "#55646766",
        fontFamily: "Poppins",
        fontSize: "12px",
        fontWeight: 900,
        border: '1.25px solid #0000001A',
    },
}));