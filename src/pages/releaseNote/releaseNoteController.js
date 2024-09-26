import React, { useEffect, useState } from "react";
import ReleaseNotePage from "./releaseNote";
import { fetchReleaseNoteContent } from "../../bento/releaseNotePageData";

export default function ReleaseNoteController() {
    const [content, setContent] = useState();

    useEffect(() => {
        async function resolve() {
            try {
                const finalContent = await fetchReleaseNoteContent();
                console.log("Fetched content:", finalContent); 
                setContent(finalContent);
            } catch (error) {
                console.error("Error fetching content:", error);
                setContent(null); 
            }
        }
        resolve();
    }, [])
        
    console.log("Content before passing to ReleaseNotePage:", content);


            return (
                content ? <ReleaseNotePage contents={content} /> : <div>Loading...</div>
            );
        
   
    


}