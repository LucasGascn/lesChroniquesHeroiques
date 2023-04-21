import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./global.css";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
axios.defaults.baseURL = "http://localhost:5000";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
