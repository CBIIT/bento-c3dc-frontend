import React, { useEffect, useState } from "react";
import ReleaseNotePage from "./releaseNote";
import { fetchReleaseNoteContent } from "../../bento/releaseNotePageData";

export default function ReleaseNoteController() {
    const [content, setContent] = useState();

    useEffect(() => {
        async function resolve() {
            try {
                const finalContent = await fetchReleaseNoteContent();
                setContent(finalContent);
            } catch (error) {
                setContent(null);
            }
        }
        resolve();
    }, [])
    
    return (
        content ? <ReleaseNotePage contents={content} /> : <div>Loading...</div>
    );
}