import React from 'react';

const CustomChartTooltip = ({ active, payload, label, viewType, cellHoverRef }) => {
  if (!cellHoverRef || cellHoverRef.current == null) return null;

  if (active && payload && payload.length) {
    const isPercentage = viewType === 'percentage';
    const hoveredEntry = payload.find((entry) => {
      return entry.dataKey === cellHoverRef.current;
    });
    const value = hoveredEntry ? hoveredEntry.payload[cellHoverRef.current] : 0;

    // Format special labels
    const formatLabel = (rawLabel) => {
      if (rawLabel === 'OtherFew') return 'Other Few';
      if (rawLabel === 'OtherMany') return 'Other Many';
      return rawLabel;
    };

    return (
      <div style={{
        backgroundColor: 'white',
        padding: '10px',
        border: '1px solid #ccc',
        borderRadius: '4px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}>
        <p style={{ margin: 0, fontWeight: 'bold' }}>{formatLabel(label)}</p>
        {hoveredEntry && (
          <p style={{ margin: 0, color: '#666' }}>
            value: {Number(value).toFixed(1)} {isPercentage ? '%' : ''}
          </p>
        )}
      </div>
    );
  }
  return null;
};

export default CustomChartTooltip;