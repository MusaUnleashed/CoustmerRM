import React, { Component } from "react";
import TopEmployees from "./TopEmployees";
import SalesByCountry from "./SalesByCountry";
export default class Charts extends Component {
  render() {
    return (
      <div>
        <TopEmployees />
        <SalesByCountry />
      </div>
    );
  }
}
