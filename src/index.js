import React, { createContext } from "react";
import ReactDOM from "react-dom/client";
import "./App.css";
import App from "./App";
import "./firebase";
import { auth, firestore } from "./firebase";

export const Context = createContext(null);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Context.Provider
    value={{
      auth,
      firestore,
    }}
  >
    <App />
  </Context.Provider>
);
