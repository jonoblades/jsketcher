import '@fontsource-variable/material-symbols-rounded';
import '../css/material-symbols.css';

import startApplication from "./cad/init/startApplication";

startApplication(context => {
  window.__CAD_APP = context;
});
