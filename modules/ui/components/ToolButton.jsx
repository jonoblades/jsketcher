import React from 'react';
import ls from './ToolButton.css';
import cx from 'classnames';

export default function ToolButton({pressed, type, className, ...props}) {
  return <button tabIndex="-1" className={cx(ls.root, ls[type], pressed && ls.pressed, className, 'small-typography')} {...props}/>;
}
