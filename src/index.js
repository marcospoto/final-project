import React from "react";
import ReactDOM from "react-dom";
import { MovieProvider } from "./components/MovieContext";

import App from "./components/App";

const rootElement = document.getElementById("root");

ReactDOM.render(
  <MovieProvider>
    <App />
  </MovieProvider>,
  rootElement
);
