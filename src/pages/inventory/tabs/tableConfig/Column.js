import React, { useState } from 'react';
import { cellTypes, headerTypes } from '@bento-core/table';
import ReactHtmlParser from "html-react-parser";

export const CustomCellView = (props) => {
  const {
    dataField, dataFormatter, cellStyle,
  } = props;
  const [top5, setTop5] = useState(true);
  const newStyle = {
    color: "#60797B",
    fontSize: "12px",
    cursor: 'pointer',
    textDecoration: 'underline',
    height: '23px',
  };
  if (cellStyle === 'TRANSFORM') {
    const content = dataFormatter(props[dataField]);
    return (<>{ReactHtmlParser(content)}</>);
  } else if (cellStyle === 'EXPAND') {
    const completeData = props[dataField].join("<br>");
    if (props[dataField].length <= 5) {
      return (<>{ReactHtmlParser(completeData)}</>);
    } else {
      const top5Data = props[dataField].slice(0, 5).join("<br>");
      return (
        <>
          {ReactHtmlParser(top5 ? top5Data : completeData)}
          <div onClick={() => setTop5(!top5)} style={newStyle}>{top5 ? "Read More" : "Read Less"}</div>
        </>
      );
    }
  }
};

export const CustomHeaderCellView = () => (<></>);

/**
* set column configuration
* @param {*} columns
* @returns config columns
*/
export const configColumn = (columns) => {
  /**
  * display columns as configuration
  * set custom cell render for column
  */
  const displayColumns = columns.filter((col) => col.display);
  const displayCustomView = [...displayColumns].map((column) => {
    if (column.cellType === cellTypes.CUSTOM_ELEM) {
      return {
        ...column,
        customCellRender: (props) => <CustomCellView {...props} />,
      };
    }
    return column;
  });

  /**
  * custom header view configuration
  */
  const displayCustomHeader = [...displayCustomView].map((column) => {
    if (column.headerType === headerTypes.CUSTOM_ELEM) {
      return {
        ...column,
        customColHeaderRender: (props) => <CustomHeaderCellView {...props} />,
      };
    }
    return column;
  });
  return displayCustomHeader;
};
