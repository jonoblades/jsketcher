import 'babel-polyfill';
import 'font-awesome/css/font-awesome.min.css';

import startApplication from "./cad/init/startApplication";

startApplication(context => {
  window.__CAD_APP = context;
});
