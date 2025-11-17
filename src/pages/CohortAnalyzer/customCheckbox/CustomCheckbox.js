import React from "react";

import tickIcon from "../../../assets/icons/tickIcon.svg";
import whiteBox from "../../../assets/icons/whiteBox.svg";

export default function CheckBoxCustom({ selectedCohorts, cohort, handleCheckbox }) {
    const isChecked = selectedCohorts.includes(cohort);
    const isDisabled = selectedCohorts.length === 3 && !isChecked;

    return (
        <div style={{ display: 'inline-block', cursor: isDisabled ? 'not-allowed' : 'pointer', zIndex: 1 }}>
            <img
                alt={"checkbox " + cohort}
                src={isChecked ? tickIcon : whiteBox}
                style={{
                    width: '16px',
                    height: '16px',
                    opacity: isDisabled ? 0.3 : 1,
                    cursor: isDisabled ? 'not-allowed' : 'pointer',
                    marginRight: 8,
                    marginLeft: 5,
                    marginTop: 5
                }}
                onClick={(e) => {
                    if (!isDisabled) handleCheckbox(cohort, e);
                }}
            />
        </div>
    );
}
