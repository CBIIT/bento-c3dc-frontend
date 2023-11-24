import React from 'react';

const getBrowserVisibilityProp = () => {
    if (typeof document.hidden !== "undefined") {
        // Opera 12.10 and Firefox 18 and later support
        return "visibilitychange";
    }
    if (typeof document.msHidden !== "undefined") {
        return "msvisibilitychange";
    }
    if (typeof document.webkitHidden !== "undefined") {
        return "webkitvisibilitychange";
    }
    return "visibilitychange";
};

const getBrowserDocumentHiddenProp = () => {
    if (typeof document.hidden !== "undefined") {
        return "hidden";
    }
    if (typeof document.msHidden !== "undefined") {
        return "msHidden";
    }
    if (typeof document.webkitHidden !== "undefined") {
        return "webkitHidden";
    }
    return "hidden";
};

const getIsDocumentHidden = () => {
return !document[getBrowserDocumentHiddenProp()];
};

const usePageVisibility = () => {
    const [isVisible, setIsVisible] = React.useState(getIsDocumentHidden());
    const onVisibilityChange = () => setIsVisible(getIsDocumentHidden());

    React.useEffect(() => {
        const visibilityChange = getBrowserVisibilityProp();
        document.addEventListener(visibilityChange, onVisibilityChange, false);
        return () => {
            document.removeEventListener(visibilityChange, onVisibilityChange);
        };
    });

    return isVisible;
};

export default usePageVisibility;