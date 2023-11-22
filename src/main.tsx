import React from "react";

import { App } from "@/App";
import ReactDOM from "react-dom/client";

import "./styles/index.scss";
import "@fontsource/montserrat/400.css";
import "@fontsource/montserrat/700.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
