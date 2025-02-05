import React, { useEffect, useState } from "react";
import { pdfList } from "../../bento/aboutPageData";

export default function PdfReader() {
    const containerStyle = {
        width: '100%',
        height: '160dvh',
        display: 'flex',
        overflowY: 'scroll',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    };

    const iframeStyle = {
        width: '50%',
        minHeight: '80%',
        margin: 40
    };

    const [pdfUrl,setPdfUrl] = useState("");
    
    useEffect(()=>{
        const pathname = new URL(window.location.href).pathname.substring(1).replace("/","");
    
        const pdfUrl1 = pathname ? pdfList[pathname] : '';
        setPdfUrl(pdfUrl1);
    },[])
   

    return (
        <div style={containerStyle}>
            <iframe style={iframeStyle} src={pdfUrl} frameBorder="0" title="C3DC Release Notes PDF"></iframe>
        </div>
    );
}
