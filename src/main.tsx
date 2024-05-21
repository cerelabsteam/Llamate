import "./index.css";

import React from "react";
import ReactDOM from "react-dom/client";

import DataProvider from "@context/DataProvider.tsx";

import App from "./App.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <DataProvider>
      <App />
    </DataProvider>
  </React.StrictMode>
);
