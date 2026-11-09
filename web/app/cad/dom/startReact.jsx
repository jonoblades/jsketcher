import React from 'react';
import {createRoot} from 'react-dom/client';
import WebApplication from './components/WebApplication';

export default function startReact(context, callback) {
  const appElement = document.getElementById('app');
  if (!appElement) {
    throw new Error('Application root element #app was not found');
  }
  const root = createRoot(appElement);
  root.render(<WebApplication appContext={context} onMount={callback} />);
  return root;
}