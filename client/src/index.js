import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

import { Provider } from "react-redux";
import store from "./redux/store";

import "./i18n/i18n";
import "bootstrap/dist/css/bootstrap.min.css";
import "./static/css/master.scss";

store().then((store) => {
  setTimeout(() => {
    ReactDOM.render(
      <Provider store={store}>
        <React.Fragment>
          <App />
        </React.Fragment>
      </Provider>,
      document.getElementById("root")
    );
  }, 500);
});
