import React from 'react';
import ls from './BottomStack.css';

export default function BottomStack({children}) {
  return <div className={ls.root}>
    {children}
  </div>;
}