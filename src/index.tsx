import "regenerator-runtime";

import React from "react";

import "styles/styles.scss";

import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App/App";

import "config/configureMobX";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
    <React.StrictMode>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </React.StrictMode>,
);

if (module.hot) {
    module.hot.accept();
}
