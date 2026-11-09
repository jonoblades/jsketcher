import React from 'react';
import {createPortal} from 'react-dom';
import {ConstraintEditor} from './ConstraintEditor';
import {ContextualControls} from './ContextualControls';
import {ConstraintList} from './ConstraintExplorer';
import {StreamsContext} from 'ui/streamsContext';
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import SketcherOperationWizard from "./SketcherOperationWizard";
import {Scope} from "./Scope";
import {SketcherToolbar} from "./SketcherToolbar";
import {sketcherRightToolbarConfig, sketcherTopToolbarConfig} from "../uiConfig";
import {SketchManager} from "./SketchManager";
import {ExportDialog} from "./ExportDialog";
import {SketcherPropertiesView} from "./SketcherPropertiesView";
import {SketcherDimensionView} from "./SketcherDimensionsView";
import {SketcherTerminal} from "./TerminalView";

import {SketcherAppContext} from './SketcherAppContext';

export {SketcherAppContext};

export function SketcherApp({applicationContext}) {
  return <SketcherAppContext.Provider value={applicationContext}>
    <StreamsContext.Provider value={applicationContext}>
      <Scope><ToastContainer /></Scope>
      <Scope><RightSideControls /></Scope>
      {createPortal(
        <Scope><ConstraintList /></Scope>,
        document.getElementById('constraint-list')
      )}
      {createPortal(
        <Scope><SketcherPropertiesView /></Scope>,
        document.getElementById('properties-view')
      )}
      {createPortal(
        <Scope><SketcherDimensionView /></Scope>,
        document.getElementById('dimension-view')
      )}
      {createPortal(
        <Scope><SketcherToolbar actions={sketcherRightToolbarConfig}/></Scope>,
        document.getElementById('right-toolbar')
      )}
      {createPortal(
        <Scope><SketcherToolbar actions={sketcherTopToolbarConfig} horizontal compact/></Scope>,
        document.getElementById('top-toolbar')
      )}
      {createPortal(
        <React.Fragment>
          <Scope><SketchManager /></Scope>
          <Scope><ExportDialog /></Scope>
          <Scope><SketcherTerminal /></Scope>
        </React.Fragment>,
        document.getElementById('global-windows')
      )}


    </StreamsContext.Provider>
  </SketcherAppContext.Provider>;

}

function RightSideControls() {
  return <React.Fragment>
    <Scope><ContextualControls /></Scope>
    <Scope><ConstraintEditor /></Scope>
    <Scope><SketcherOperationWizard /></Scope>
  </React.Fragment>
}