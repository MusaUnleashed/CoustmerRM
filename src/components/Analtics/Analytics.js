import React, { Component } from "react";
import Badges from "./Badges";
import Charts from "./Charts";
const CLIENTS_URL = "http://localhost:8080/allClients";
const axios = require("axios");
export default class Analytics extends Component {
  constructor() {
    super();
    this.state = {
      clients: [],
    };
  }
  componentDidMount() {
    axios.get(CLIENTS_URL).then((response) => {
      this.setState({ clients: response.data });
    });
  }
  render() {
    return (
      <div>
        <Badges clients={this.state.clients} />
        <Charts />
      </div>
    );
  }
}
