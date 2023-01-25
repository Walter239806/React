 import React from "react";
import ReactDOM from "react-dom/client";
// import { Counter } from "./class.jsx";
 import Counter from "./functional.jsx";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <Counter  title="Titulo" name="mas" />
  </React.StrictMode>
);
