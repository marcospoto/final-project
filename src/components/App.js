import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { HomePage } from "./HomePage";
import { MovieDetails } from "./MovieDetails";

import GlobalStyles from "./GlobalStyles";

import "tippy.js/dist/tippy.css";

function App() {
  return (
    <BrowserRouter>
      <GlobalStyles />
      <Switch>
        <Route exact path="/">
          <HomePage />
        </Route>
        <Route exact path="/movie/:id">
          <MovieDetails />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
