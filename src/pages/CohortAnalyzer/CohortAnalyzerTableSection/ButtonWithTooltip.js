import React from 'react';
import ToolTip from '@bento-core/tool-tip/dist/ToolTip';


export function ButtonWithTooltip({ className, disabled, onClick, tooltip, icon, children }) {
  return (
    <div style={{ position: 'relative', marginRight: 10 }}>
      <button type="button" className={className} disabled={disabled} onClick={disabled ? undefined : onClick}>
        {children}
      </button>
      <div style={{ position: 'absolute', top: -5, right: -13 }}>
        <ToolTip
          maxWidth="335px" border="1px solid #598ac5" arrowBorder="1px solid #598AC5"
          title={<div>{tooltip}</div>} placement="top-end" arrow interactive arrowSize="30px"
        >
          <img alt="Help" src={icon} width={10} style={{ border: 0 }} />
        </ToolTip>
      </div>
    </div>
  );
}
