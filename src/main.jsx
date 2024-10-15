import React from "react";
import ReactDom from "react-dom/client";
import App from "./App.jsx";
// import './global';
import 'react-quill/dist/quill.snow.css';

import "./index.css";


const originalConsoleWarn = console.warn;
console.warn = function filterWarnings(msg, ...args) {
  if (msg.indexOf('findDOMNode is deprecated') > -1) {
    return;
  }
  originalConsoleWarn.apply(console, [msg, ...args]);
};
// import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
ReactDom.createRoot(document.getElementById("root")).render(
  
  <React.StrictMode>
    <App />
  </React.StrictMode>
);


