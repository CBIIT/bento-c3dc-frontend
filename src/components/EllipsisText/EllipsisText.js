import React, { useRef, useState, useLayoutEffect } from 'react';
import { withStyles } from '@material-ui/core';

/**
 * EllipsisText Component
 * Displays text with ellipsis when it overflows. Supports two modes:
 * - 'middle': Shows beginning and end with ellipsis in the middle
 * - 'end': Standard end truncation (uses CSS text-overflow: ellipsis)
 *
 * @param {string} text - The text to display
 * @param {string} className - Optional CSS class name
 * @param {object} classes - Material-UI classes object
 * @param {function} onTruncate - Optional callback called with true when text is truncated, false when not
 * @param {string} mode - Ellipsis mode: 'middle' or 'end' (default: 'middle')
 *
 * Example (middle mode):
 * "My Very Long Cohort Name That Exceeds...For Display Copy (3)"
 *
 * Example (end mode):
 * "My Very Long Cohort Name That Exceeds For Display..."
 */
const EllipsisText = ({ text, className, classes, onTruncate, mode = 'middle' }) => {
    const containerRef = useRef(null);
    const measureRef = useRef(null);
    const [displayText, setDisplayText] = useState(text);

    // Constants for middle ellipsis truncation
    const MIN_CHARS_PER_SIDE = 5; // Minimum characters to show on each side of ellipsis
    const MIN_TOTAL_CHARS = MIN_CHARS_PER_SIDE * 2; // Minimum total characters (start + end)

    useLayoutEffect(() => {
        if (!containerRef.current || !text) {
            setDisplayText(text);
            return;
        }

        const container = containerRef.current;

        const measureAndTruncate = () => {
            if (!container) return;

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
            let left = MIN_TOTAL_CHARS;
            let right = text.length - MIN_CHARS_PER_SIDE;

            while (left <= right) {
                const totalChars = Math.floor((left + right) / 2);

                // Split as evenly as possible (50/50)
                const startLen = Math.floor(totalChars / 2);
                const endLen = totalChars - startLen;

                if (startLen < MIN_CHARS_PER_SIDE || endLen < MIN_CHARS_PER_SIDE) {
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
        };

        // Use ResizeObserver to react to actual layout changes
        const resizeObserver = new ResizeObserver((entries) => {
            // Only measure when container has stable, non-zero dimensions
            const entry = entries[0];
            if (entry && entry.contentRect.width > 0) {
                measureAndTruncate();
            }
        });

        resizeObserver.observe(container);

        // Also run immediately in case container is already sized
        if (container.offsetWidth > 0) {
            measureAndTruncate();
        }

        return () => {
            resizeObserver.disconnect();
        };
    }, [text, mode, onTruncate, MIN_CHARS_PER_SIDE, MIN_TOTAL_CHARS]);

    // End mode: Simple span with CSS truncation
    if (mode === 'end') {
        return (
            <span
                ref={containerRef}
                className={`${classes.endContainer} ${className || ''}`}
            >
                {displayText}
            </span>
        );
    }

    // Middle mode: Custom truncation with measurement span
    return (
        <span ref={containerRef} className={`${classes.middleContainer} ${className || ''}`}>
            <span className={classes.measureSpan} ref={measureRef} />
            <span className={classes.displaySpan}>{displayText}</span>
        </span>
    );
};

const styles = () => ({
    endContainer: {
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        display: 'inline-block',
        maxWidth: '100%',
    },
    middleContainer: {
        position: 'relative',
        display: 'inline-block',
        maxWidth: '100%',
    },
    measureSpan: {
        visibility: 'hidden',
        position: 'absolute',
        whiteSpace: 'nowrap',
    },
    displaySpan: {
        display: 'inline-block',
        maxWidth: '100%',
    },
});

const StyledEllipsisText = withStyles(styles)(EllipsisText);

// Export convenient named variants
export const MiddleEllipsisText = (props) => <StyledEllipsisText {...props} mode="middle" />;
export const EndEllipsisText = (props) => <StyledEllipsisText {...props} mode="end" />;
