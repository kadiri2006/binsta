import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./index.css";
import { FireBaseContext } from "./context/firebase";

import { userSignOut } from "./services/firebase";

ReactDOM.render(
  <React.StrictMode>
    <FireBaseContext.Provider value={{ userSignOut }}>
      <App />
    </FireBaseContext.Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
