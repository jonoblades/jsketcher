import React from 'react';
import ObjectExplorer from '../../craft/ui/ObjectExplorer';
import ls from './Explorer.css';

export function Explorer() {
  return <div className={ls.root}>
    <ObjectExplorer />
  </div>;
}