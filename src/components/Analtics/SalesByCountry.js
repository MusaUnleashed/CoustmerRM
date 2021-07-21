import React, { Component } from "react";
import "../../style/Charts.css";
import {
  BarChart,
  CartesianGrid,
  XAxis,
  Tooltip,
  Legend,
  Bar,
  YAxis,
} from "recharts";
const axios = require("axios");
const SALES_BY_COUNTRY = "http://localhost:8080/salesByCountry";
export default class SalesByCountry extends Component {
  constructor() {
    super();
    this.state = {
      salesByCountry: [],
    };
  }

  componentDidMount = () => {
    this.getSalesByCountries();
  };

  getSalesByCountries = () => {
    axios.get(SALES_BY_COUNTRY).then((response) => {
      this.setState({ salesByCountry: response.data });
      console.log(response.data);
    });
  };

  render() {
    return (
      <div className="chartComponent">
        <BarChart width={600} height={250} data={this.state.salesByCountry}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="country" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="Sales" fill="#8884d8" />
        </BarChart>
      </div>
    );
  }
}
