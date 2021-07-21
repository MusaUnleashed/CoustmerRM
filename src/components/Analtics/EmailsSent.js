import React, { Component } from "react";
// import "../../css/Badge.css";
import "../../style/Badge.css"
const IMAGE_URL =
  "https://w7.pngwing.com/pngs/410/105/png-transparent-gmail-logo-g-suite-gmail-computer-icons-google-email-e-mail-angle-text-rectangle.png";
export default class EmailsSent extends Component {
  constructor() {
    super();
    this.clientsEmailNotSend = 0;
  }

  getUnsentedClientsEmail() {
    let CountClientsUnsentedEmail = 0;
    this.props.clients.forEach((client) => {
      if (client.email_type_id != null) {
        CountClientsUnsentedEmail++;
      }
    });
    this.clientsEmailNotSend = CountClientsUnsentedEmail;
  }
  render() {
    this.getUnsentedClientsEmail();
    return (
      <div className="badgeBox">
        <img src={IMAGE_URL} className="imageIcon" />
        <h3 className="newClientCount"> {this.clientsEmailNotSend}</h3>
        <h6 className="currentMounth"> Emails Sent</h6>
      </div>
    );
  }
}
