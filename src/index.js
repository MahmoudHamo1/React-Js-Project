import React from "react";
import ReactDOM from "react-dom/client";
import "@fortawesome/fontawesome-free/css/all.min.css";

import "./style.css";
import App from "./App";
import Userprovider from "./pages/Website/Context/UserContext";
import { BrowserRouter as Router } from "react-router-dom";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Router>
    <Userprovider>
      <App />
    </Userprovider>
  </Router>
);
