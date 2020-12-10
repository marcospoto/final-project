import React from "react";
import ReactDOM from "react-dom";
import { MovieProvider } from "./components/MovieContext";
import { createStore } from "redux";
import { Provider } from "react-redux";
import App from "./components/App";
import reducer from "./reducers";

import FirebaseProvider from "../src/components/FirebaseContext";

const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

ReactDOM.render(
  <Provider store={store}>
    <FirebaseProvider>
      <MovieProvider>
        <App />
      </MovieProvider>
    </FirebaseProvider>
  </Provider>,
  document.getElementById("root")
);
