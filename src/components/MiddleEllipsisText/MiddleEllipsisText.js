import React, { useRef, useState, useLayoutEffect } from 'react';

/**
 * MiddleEllipsisText Component
 * Displays text with ellipsis in the middle when it overflows, showing both
 * the beginning and end of the text. Uses pixel-based measurement to handle
 * variable-width fonts correctly.
 *
 * @param {string} text - The text to display
 * @param {string} className - Optional CSS class name
 * @param {object} style - Optional inline styles
 *
 * Example:
 * "My Very Long Cohort Name That Exceeds...For Display Copy (3)"
 */
export const MiddleEllipsisText = ({ text, className, style }) => {
    const containerRef = useRef(null);
    const measureRef = useRef(null);
    const [displayText, setDisplayText] = useState(text);

    useLayoutEffect(() => {
        if (!containerRef.current || !measureRef.current || !text) {
            setDisplayText(text);
            return;
        }

        const container = containerRef.current;
        const measureSpan = measureRef.current;
        const availableWidth = container.offsetWidth;

        if (availableWidth === 0) {
            setDisplayText(text);
            return;
        }

        // Measure full text width
        measureSpan.textContent = text;
        const fullWidth = measureSpan.offsetWidth;

        // If text fits, no truncation needed
        if (fullWidth <= availableWidth) {
            setDisplayText(text);
            return;
        }

        // Text needs truncation with middle ellipsis
        const ellipsis = '...';
        measureSpan.textContent = ellipsis;
        const ellipsisWidth = measureSpan.offsetWidth;
        const targetWidth = availableWidth - ellipsisWidth;

        let bestFit = '';

        // Use binary search to find the maximum number of characters that fit (O(log n) complexity)
        let left = 10;
        let right = text.length - 5;

        while (left <= right) {
            const totalChars = Math.floor((left + right) / 2);

            // Split as evenly as possible (50/50)
            const startLen = Math.floor(totalChars / 2);
            const endLen = totalChars - startLen;

            if (startLen < 5 || endLen < 5) {
                right = totalChars - 1;
                continue;
            }

            const start = text.substring(0, startLen);
            const end = text.substring(text.length - endLen);

            measureSpan.textContent = start + end;
            const combinedWidth = measureSpan.offsetWidth;

            if (combinedWidth <= targetWidth) {
                // This fits, try to fit more characters
                bestFit = start + ellipsis + end;
                left = totalChars + 1;
            } else {
                // Too wide, try fewer characters
                right = totalChars - 1;
            }
        }

        if (bestFit) {
            setDisplayText(bestFit);
        } else {
            // Fallback: just show first part with ellipsis
            let truncateLen = Math.floor(text.length * 0.5);
            while (truncateLen > 1) {
                const truncated = text.substring(0, truncateLen) + ellipsis;
                measureSpan.textContent = truncated;
                if (measureSpan.offsetWidth <= availableWidth) {
                    setDisplayText(truncated);
                    return;
                }
                truncateLen--;
            }
            setDisplayText(text.substring(0, 1) + ellipsis);
        }
    }, [text]);

    return (
        <span ref={containerRef} className={className} style={{ ...style, position: 'relative', display: 'inline-block', maxWidth: '100%' }}>
            <span style={{ visibility: 'hidden', position: 'absolute', whiteSpace: 'nowrap' }} ref={measureRef} />
            <span style={{ display: 'inline-block', maxWidth: '100%' }}>{displayText}</span>
        </span>
    );
};
