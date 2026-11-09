import React from 'react';

import ls from './ButtonGroup.css'
import cx from 'classnames';

export default function ButtonGroup({className, ...props}: React.HTMLAttributes<HTMLSpanElement>) {

  return <div className={cx(ls.root, className)} {...props}/>;

}
