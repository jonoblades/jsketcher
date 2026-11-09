import React from 'react';
import ls from './Row.css';
import cx from 'classnames';

export default function Row({className, children, ...props}) {
  return <div className={cx(ls.root, className)} {...props} >{children}</div>;
}