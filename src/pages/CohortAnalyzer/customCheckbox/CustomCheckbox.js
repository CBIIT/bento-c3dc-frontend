import React from "react";

export default function CheckBoxCustom({ selectedCohorts, cohort, handleCheckbox }) {
    const isChecked = selectedCohorts.includes(cohort);
    const isDisabled = selectedCohorts.length === 3 && !isChecked;

    return (
        <label style={{ display: 'inline-block', cursor: isDisabled ? selectedCohorts.includes(cohort) ? 'pointer' : 'not-allowed' : 'pointer' }}>
            <input
                type="checkbox"
                style={{
                    appearance: 'none',
                    width: '16px',
                    height: '16px',
                    border: `1px solid #6D5F5B`,
                    borderRadius: '3px',
                    position: 'relative',
                    margin: '10px',
                    top: 3,
                    zIndex: 100,
                    marginRight: 7,
                    backgroundColor: isChecked ? '#6D5F5B' : 'white',
                    opacity: isDisabled ?  0.3 : 1,
                    cursor: isDisabled ? 'not-allowed' : 'pointer',
                }}
                checked={selectedCohorts.includes(cohort)}
                onChange={(e) => handleCheckbox(cohort, e)}
            />

            <style>
                {`
                    input[type="checkbox"]:checked::after {
                        content: '';
                        position: absolute;
                        top: 1px;
                        left: 4px;
                        width: 4px;
                        height: 9px;
                        border: solid white;
                        border-width: 0 2px 2px 0;
                        transform: rotate(45deg);
                    }
                `}
            </style>
        </label>
    );
}
