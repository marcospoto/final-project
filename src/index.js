import React from "react";
import ReactDOM from "react-dom";
import { MovieProvider } from "./components/MovieContext";

import App from "./components/App";

import FirebaseProvider from "../src/components/FirebaseContext";

ReactDOM.render(
  <FirebaseProvider>
    <MovieProvider>
      <App />
    </MovieProvider>
  </FirebaseProvider>,
  document.getElementById("root")
);
