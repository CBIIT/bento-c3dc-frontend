import React, { useRef, useState, useLayoutEffect } from 'react';

/**
 * EllipsisText Component
 * Displays text with ellipsis when it overflows. Supports two modes:
 * - 'middle': Shows beginning and end with ellipsis in the middle
 * - 'end': Standard end truncation (uses CSS text-overflow: ellipsis)
 *
 * @param {string} text - The text to display
 * @param {string} className - Optional CSS class name
 * @param {object} style - Optional inline styles
 * @param {function} onTruncate - Optional callback called with true when text is truncated, false when not
 * @param {string} mode - Ellipsis mode: 'middle' or 'end' (default: 'middle')
 *
 * Example (middle mode):
 * "My Very Long Cohort Name That Exceeds...For Display Copy (3)"
 *
 * Example (end mode):
 * "My Very Long Cohort Name That Exceeds For Display..."
 */
const EllipsisText = ({ text, className, style, onTruncate, mode = 'middle' }) => {
    const containerRef = useRef(null);
    const measureRef = useRef(null);
    const [displayText, setDisplayText] = useState(text);

    useLayoutEffect(() => {
        if (!containerRef.current || !text) {
            setDisplayText(text);
            return;
        }

        const container = containerRef.current;

        // End mode: Simple overflow detection, CSS handles truncation
        if (mode === 'end') {
            const isOverflowing = container.scrollWidth > container.clientWidth;
            if (onTruncate) onTruncate(isOverflowing);
            setDisplayText(text);
            return;
        }

        // Middle mode: Custom truncation logic
        if (!measureRef.current) {
            setDisplayText(text);
            return;
        }

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
            if (onTruncate) onTruncate(false);
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
            if (onTruncate) onTruncate(true);
        } else {
            // Fallback: just show first part with ellipsis
            let truncateLen = Math.floor(text.length * 0.5);
            while (truncateLen > 1) {
                const truncated = text.substring(0, truncateLen) + ellipsis;
                measureSpan.textContent = truncated;
                if (measureSpan.offsetWidth <= availableWidth) {
                    setDisplayText(truncated);
                    if (onTruncate) onTruncate(true);
                    return;
                }
                truncateLen--;
            }
            setDisplayText(text.substring(0, 1) + ellipsis);
            if (onTruncate) onTruncate(true);
        }
    }, [text, mode]);

    // End mode: Simple span with CSS truncation
    if (mode === 'end') {
        return (
            <span
                ref={containerRef}
                className={className}
                style={{
                    ...style,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                    display: 'inline-block',
                    maxWidth: '100%'
                }}
            >
                {displayText}
            </span>
        );
    }

    // Middle mode: Custom truncation with measurement span
    return (
        <span ref={containerRef} className={className} style={{ ...style, position: 'relative', display: 'inline-block', maxWidth: '100%' }}>
            <span style={{ visibility: 'hidden', position: 'absolute', whiteSpace: 'nowrap' }} ref={measureRef} />
            <span style={{ display: 'inline-block', maxWidth: '100%' }}>{displayText}</span>
        </span>
    );
};

// Export convenient named variants
export const MiddleEllipsisText = (props) => <EllipsisText {...props} mode="middle" />;
export const EndEllipsisText = (props) => <EllipsisText {...props} mode="end" />;
