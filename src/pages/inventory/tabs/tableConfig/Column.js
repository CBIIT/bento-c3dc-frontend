import React, { useState } from 'react';
import { Link, Typography } from '@material-ui/core';
import { cellTypes, headerTypes } from '@bento-core/table';
import ReactHtmlParser from "html-react-parser";
import ToolTip from "@bento-core/tool-tip";

export const CustomCellView = (props) => {
  const {
    dataField, dataFormatter, cellStyle, label,
  } = props;
  const [top5, setTop5] = useState(true);
  const newStyle = {
    color: "#60797B",
    fontSize: "12px",
    cursor: 'pointer',
    textDecoration: 'underline',
    height: '23px',
  };

  if (Array.isArray(label) && dataField === "cohort") {
    return (
      <div style={{ display: 'flex', gap: 10, justifyContent:'center', width: 67 }}>
        {
          label.map((cohort, index) => (
            <ToolTip title={<div>
            
              {label.map((coh,innerIndex) => (
                <div style={{display:'flex',gap:10,marginBottom:5}}>
                  <div style={{
                    backgroundColor: coh["color"],
                    width: 17,
                    height: 17,
                    border: '1px solid #686868',
                    borderRadius: 4
                  }}>
                  </div>
                  {coh["cohort"]}
                  </div>
              ))
              }

            </div>} arrow placement="top">
              <div style={{
                backgroundColor: cohort["color"],
                width: 17,
                height: 17,
                border: '1px solid #686868',
                borderRadius: 4
              }}>
              </div>
            </ToolTip>
          ))
        }
      </div>
    )
  }

  if (Array.isArray(label)) {
    if (props.linkAttr) {
      const { rootPath } = props.linkAttr;
      return (
        <Typography>
          {label.map((item, idx) => {
            return (
              <Link href={`#${rootPath}/`.concat(item)} className={cellTypes.LINK}>
                <Typography key={idx}>{item}{idx !== label.length - 1 && ", "}</Typography>
              </Link>
            );
          })}
        </Typography>
      );
    }
    
    if (label.length > 5){
      const [isExpanded, setIsExpanded] = useState(false);
      
      return (
        <Typography>
          {isExpanded ? (
            <>
              {label.join(", ")}
              {" "}
              <span 
                onClick={() => setIsExpanded(false)} 
                style={newStyle}
              >
                (show less)
              </span>
            </>
          ) : (
            <>
              {label.slice(0,5).join(", ")}
              <span 
                onClick={() => setIsExpanded(true)} 
                style={newStyle}
              >
                <span style={{ whiteSpace: 'nowrap' }}>, ...</span>
              </span>
            </>
          )}
        </Typography>
      );
    }
    return (<Typography>{label.join(", ")}</Typography>);
  }


  if( typeof label === 'object'){
    return (<Typography>{label["participant_id"] }</Typography>)
  }

  if (props.linkAttr) {
    const { rootPath, linkField } = props.linkAttr;
    //If the link requires another field, provide it in the linkField otherwise will use current field (label)
    if (rootPath.startsWith('http://') || rootPath.startsWith('https://')) {
      return (
        <Link
          className={cellTypes.LINK}
          href={`${rootPath}${linkField ? props[linkField] : label}`}
          target="_blank"
          rel="noopener noreferrer"
        >

          <Typography >{label}</Typography>
        </Link>
      );
    }
    else {
      return (
        <Link
          className={cellTypes.LINK}
          href={`${rootPath}${linkField ? props[linkField] : label}`}
        >
          <Typography >{label}</Typography>
        </Link>
      );
    }
  }

  if (Array.isArray(label)) {
    /* This is copied from CDS where it has a limit of 5 items to display. We can use this if we want to limit the number of items to display.
    if (label.length > 5){
      return (<Typography>{label.slice(0,5).join(", ") + ", ..."}</Typography>);
    }*/
    return (<Typography>{label.join(", ")}</Typography>);
  }

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
  // const displayColumns = columns.filter((col) => col.display);
  const displayCustomView = [...columns].map((column) => {
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
