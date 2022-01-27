import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./index.css";
import { FireBaseContext } from "./context/firebase";
import { db, firebase } from "./lib/firebase";

ReactDOM.render(
  <React.StrictMode>
    <FireBaseContext.Provider value={{ firebase, db }}>
      <App />
    </FireBaseContext.Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
