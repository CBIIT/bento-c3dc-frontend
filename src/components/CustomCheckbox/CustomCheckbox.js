import React from "react";

import tickIcon from "../../assets/icons/tickIcon.svg";
import whiteBox from "../../assets/icons/whiteBox.svg";

export default function CustomCheckBox({ selectedItems, item, handleCheckbox }) {
    const isChecked = selectedItems.includes(item);

    return (
        <div style={{ display: 'inline-block', zIndex: 1 }}>
            <img
                alt={"checkbox " + item}
                src={isChecked ? tickIcon : whiteBox}
                style={{
                    width: '16px',
                    height: '16px',
                    marginTop: 20
                }}
                onClick={(e) => {
                     handleCheckbox(item, e);
                }}
            />
        </div>
    );
}