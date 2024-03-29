import React from "react";
import ReactDOM from "react-dom/client";
import "assets/css/index.css";
import App from "app-layout/app";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
