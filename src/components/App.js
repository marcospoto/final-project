import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { HomePage } from "./HomePage";
import { MovieDetails } from "./MovieDetails";
import { Header } from "./Header";
import { LoginForm } from "./LoginForm";
import { Favorites } from "./Favorites";

import GlobalStyles from "./GlobalStyles";

import "tippy.js/dist/tippy.css";

function App() {
  return (
    <BrowserRouter>
      <GlobalStyles />
      <Header />
      <Switch>
        <Route exact path="/">
          <HomePage />
        </Route>
        <Route exact path="/login">
          <LoginForm />
        </Route>
        <Route exact path="/favorites">
          <Favorites />
        </Route>
        <Route exact path="/movie/:id">
          <MovieDetails />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
