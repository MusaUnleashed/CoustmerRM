import React, { Component } from "react";
import "../../style/Badge.css";
const IMAGE_URL = "https://image.flaticon.com/icons/png/512/432/432548.png";
export default class NewClients extends Component {
  constructor() {
    super();
    this.clientOfCurrentMounth = 0;
    this.currentMounth = "";
  }
  getClientsWithcurrentMounth() {
    let d = new Date();
    let mounth = d.getMonth() + 1;
    let year = d.getFullYear();
    this.clientOfCurrentMounth = this.props.clients.filter(
      (client) =>
        client.date.split("/")[0] == mounth && client.date.split("/")[2] == year
    ).length;
    this.currentMounth = this.getCurrentMonth(mounth - 1);
  }
  getCurrentMonth(n) {
    var month = new Array();
    month[0] = "January";
    month[1] = "February";
    month[2] = "March";
    month[3] = "April";
    month[4] = "May";
    month[5] = "June";
    month[6] = "July";
    month[7] = "August";
    month[8] = "September";
    month[9] = "October";
    month[10] = "November";
    month[11] = "December";
    return month[n];
  }
  render() {
    this.getClientsWithcurrentMounth();
    return (
      <div className="badgeBox">
        <img src={IMAGE_URL} className="imageIcon" />
        <h3 className="newClientCount">{this.clientOfCurrentMounth}</h3>
        <h6 className="currentMounth"> New {this.currentMounth} Clients</h6>
      </div>
    );
  }
}
