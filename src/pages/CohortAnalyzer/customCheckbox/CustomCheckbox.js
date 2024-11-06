import React from "react";

export default function CheckBoxCustom({ selectedCohorts, cohort, handleCheckbox }) {

    const isDisabled = selectedCohorts.length === 3;

    return (
        <label style={{ display: 'inline-block', cursor: isDisabled ? 'not-allowed' : 'pointer' }}>
            <input
                type="checkbox"
                style={{
                    appearance: 'none',
                    width: '16px',
                    height: '16px',
                    border: `2px solid #6D5F5B`,
                    borderRadius: '3px',
                    position: 'relative',
                    margin: '10px',
                    top: 3,
                    marginRight: 7,
                    backgroundColor: (selectedCohorts.includes(cohort) ? '#6D5F5B' : isDisabled ? '#6D5F5B' : 'white'),
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
