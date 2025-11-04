import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import CustomChartTooltip from './CustomChartTooltip';

const CustomXAxisTick = ({ x, y, payload, width, fontSize = 8 }) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Format special labels
  const formatLabel = (rawLabel) => {
    if (rawLabel === 'OtherFew') return 'Other Few';
    if (rawLabel === 'OtherMany') return 'Other Many';
    return rawLabel;
  };

  const fullText = formatLabel(payload.value);

  // Calculate max characters based on available width
  // Approximate that each character takes about 6-7 pixels at fontSize 8, 7-8 at fontSize 10
  const charWidth = fontSize === 8 ? 4 : 5;
  const maxLength = width ? Math.floor(width / charWidth) : 10;

  // Function to truncate text
  const truncateText = (text, max) => {
    if (text.length <= max) return text;

    // Try to break at word boundary if possible
    const truncated = text.substring(0, max - 3);
    const lastSpace = truncated.lastIndexOf(' ');

    // If we have a space and it's not too early in the string, break there
    if (lastSpace > max / 2) {
      return text.substring(0, lastSpace) + '...';
    }

    // Otherwise just truncate at character limit
    return truncated + '...';
  };

  const displayText = truncateText(fullText, maxLength);
  const isTruncated = displayText !== fullText;

  // Split text into lines for multi-line display
  // If text is short enough and has spaces, split on spaces for better readability
  const lines = displayText.includes(' ') && displayText.length <= maxLength * 1.5
    ? displayText.split(' ')
    : [displayText];

  const handleMouseEnter = (e) => {
    if (isTruncated) {
      const rect = e.currentTarget.getBoundingClientRect();
      setMousePos({
        x: rect.left + (rect.width / 2),
        y: rect.top - 50  // Increased offset to push tooltip further above
      });
      setShowTooltip(true);
    }
  };

  const handleMouseLeave = () => {
    setShowTooltip(false);
  };

  return (
    <>
      <g transform={`translate(${x},${y})`}>
        {/* Add title element for native browser tooltip as fallback */}
        <title>{fullText}</title>

        {/* Invisible rectangle for consistent hover area */}
        {isTruncated && (
          <rect
            x={-width / 2}  // Center the rectangle
            y={0}
            width={width}
            height={lines.length * 12 + 20}  // Cover all lines plus some padding
            fill="transparent"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          />
        )}

        {lines.map((line, index) => (
          <text
            key={index}
            x={0}
            y={index * 12}
            dy={16}
            textAnchor="middle"
            fill="#333"
            fontSize={fontSize}
            style={{
              pointerEvents: isTruncated ? 'none' : 'auto'  // Disable pointer events on text when using rect
            }}
          >
            {/* Add title to each text element as well for better browser support */}
            <title>{fullText}</title>
            {line}
          </text>
        ))}
      </g>

      {/* Render tooltip using portal to document body */}
      {showTooltip && isTruncated && ReactDOM.createPortal(
        <div style={{
          position: 'fixed',
          left: mousePos.x,
          top: mousePos.y,
          transform: 'translateX(-50%)',
          pointerEvents: 'none',
          zIndex: 9999
        }}>
          <CustomChartTooltip
            active={true}
            label={fullText}
            showValue={false}
          />
        </div>,
        document.body
      )}
    </>
  );
};

export default CustomXAxisTick;