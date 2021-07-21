import React, { Component } from "react";
import "../../style/Badge.css";
const IMAGE_URL =
  "https://www.clipartmax.com/png/middle/192-1927276_business-clients-icon.png";
export default class OutstandingClients extends Component {
  constructor() {
    super();
    this.qutstandingClients = 0;
  }
  getUnSoldClientsNum() {
    this.qutstandingClients = this.props.clients.filter(
      (client) => client.sold == 0
    ).length;
  }
  render() {
    this.getUnSoldClientsNum();
    return (
      <div className="badgeBox">
        <img src={IMAGE_URL} className="imageIcon" />
        <h3 className="newClientCount">{this.qutstandingClients}</h3>
        <h6 className="currentMounth"> Qutstanding Clients</h6>
      </div>
    );
  }
}
