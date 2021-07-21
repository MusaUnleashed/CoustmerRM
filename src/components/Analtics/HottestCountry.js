import React, { Component } from "react";
import "../../style/Badge.css";
const IMAGE_URL = "https://icon-library.com/images/world-icon/world-icon-3.jpg";
const axios = require("axios");
const MOST_COUNTRY_SALES = "http://localhost:8080/mostcountrysales";
export default class HottestCountry extends Component {
  constructor() {
    super();
    this.state = {
      country: "",
    };
  }
  componentDidMount = () => {
    axios
      .get(MOST_COUNTRY_SALES)
      .then((response) => this.setState({ country: response.data[0].country }));
  };
  render() {
    return (
      <div className="badgeBox">
        <img src={IMAGE_URL} className="imageIcon" />
        <h3 className="newClientCount">{this.state.country}</h3>
        <h6 className="currentMounth"> Hottest Country</h6>
      </div>
    );
  }
}
