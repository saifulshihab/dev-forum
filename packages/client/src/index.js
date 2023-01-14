import React from "react";
import App from "./App";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { createRoot } from "react-dom/client";

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

reportWebVitals();
