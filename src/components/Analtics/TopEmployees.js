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
const TOP_OWNERS = "http://localhost:8080/topOwners";

export default class TopEmployees extends Component {
  constructor() {
    super();
    this.state = {
      topThreeOwners: [],
    };
  }
  componentDidMount = () => {
    axios.get(TOP_OWNERS).then((response) => {
      this.setState({ topThreeOwners: response.data });
    });
  };

  render() {
    return (
      <div className="chartComponent">
        <BarChart
          width={600}
          height={300}
          data={this.state.topThreeOwners}
          layout="vertical"
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <XAxis type="number" dataKey="total" />
          <YAxis type="category" dataKey="owner" />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip />
          <Legend />
          <Bar
            dataKey="total"
            fill="#d63031"
            stroke="#000000"
            strokeWidth={1}
            barSize={30}
          />
        </BarChart>
      </div>
    );
  }
}
