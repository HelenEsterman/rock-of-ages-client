import React from "react";
import ReactDOM from "react-dom/client";
import { ApplicationViews } from "./components/ApplicationViews";
import "./index.css";
import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <ApplicationViews />
    </BrowserRouter>
  </React.StrictMode>
);
