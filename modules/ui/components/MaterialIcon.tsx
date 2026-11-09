import React from 'react';
import cx from 'classnames';
import {materialIconName} from './materialIconNames';

interface MaterialIconProps extends React.HTMLAttributes<HTMLSpanElement> {
  icon?: string | null;
  icons?: string[];
  fw?: boolean;
}

export default function MaterialIcon({icon, icons, fw, className, style, ...props}: MaterialIconProps) {
  const iconClasses = icons || [];
  const iconName = icon || iconClasses.find(name => name !== 'flip-vertical' && name !== 'flip-horizontal');
  if (!iconName) {
    return null;
  }
  const symbol = materialIconName(iconName);
  const transforms = [
    iconClasses.includes('flip-vertical') && 'scaleY(-1)',
    iconClasses.includes('flip-horizontal') && 'scaleX(-1)'
  ].filter(Boolean);

  return <span
    {...props}
    aria-hidden={props['aria-hidden'] ?? (props['aria-label'] ? undefined : true)}
    className={cx('material-symbols-rounded', fw && 'material-symbols-rounded-fixed-width', className)}
    style={{
      ...style,
      fontSize: style?.fontSize || '1.2em',
      ...(transforms.length ? {transform: transforms.join(' ')} : {})
    }}
  >{symbol}</span>;
}
