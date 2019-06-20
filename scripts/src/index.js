const baseURL = "http://localhost/erasmus";

import React from "react";
import ReactDOM from "react-dom";

import PricingHelp from "./PricingHelp";
import Antiquarian from "./Antiquarian";
import SplitVat from "./SplitVat";
import IsbnConverter from "./IsbnConverter";
import Robot from "./Robot";
import Search from "./Search";

if (document.getElementById("pricing-help")) {
  ReactDOM.render(<PricingHelp />, document.getElementById("pricing-help"));
}

if (document.getElementById("antiquarian")) {
  ReactDOM.render(<Antiquarian />, document.getElementById("antiquarian"));
}

if (document.getElementById("split-vat")) {
  ReactDOM.render(<SplitVat />, document.getElementById("split-vat"));
}

if (document.getElementById("isbn-converter")) {
  ReactDOM.render(<IsbnConverter />, document.getElementById("isbn-converter"));
}

if (document.getElementById("robot")) {
  ReactDOM.render(<Robot />, document.getElementById("robot"));
}

if (document.getElementById("header-search")) {
  ReactDOM.render(<Search />, document.getElementById("header-search"));
}
