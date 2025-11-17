import React from 'react';
import ToolTip from '@bento-core/tool-tip';

const ToolTipIconView = (props) => {
  const {
    tooltipConfig,
    classes,
  } = props;

  const {
    icon,
    alt,
    arrow = false,
    maxWidth,
    title,
    placement,
    clsName,
  } = tooltipConfig;
  return (
    <ToolTip
      title={title|| 'add'}
      arrow={arrow}
      maxWidth={maxWidth || '230px'}
      placement={placement || 'top-end'}
      classes={{
        tooltip: classes.customTooltip,
        arrow: classes.customArrow,
      }}
    >
      {icon && (<img src={icon} alt={alt} className={clsName} />)}
    </ToolTip>
  );
};

export default ToolTipIconView;
