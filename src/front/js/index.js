//import react into the bundle
import React from "react";
import ReactDOM from "react-dom";

//include bootstrap npm library into the bundle
import "bootstrap/dist/css/bootstrap.min.css";

import Popper from "popper.js";
import $ from "jquery";
import "bootstrap/dist/js/bootstrap.bundle.min";
//include your index.scss file into the bundle
import "../styles/index.scss";
import "toastr2/dist/toastr.min.css";
//import your own components
import Layout from "./layout";

//render your react application
ReactDOM.render(<Layout />, document.querySelector("#app"));
