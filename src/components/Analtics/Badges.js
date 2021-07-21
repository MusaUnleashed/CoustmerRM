import React, { Component } from "react";
import EmailsSent from "./EmailsSent";
import HottestCountry from "./HottestCountry";
import NewClients from "./NewClients";
import OutstandingClients from "./OutstandingClients";
export default class Badges extends Component {
  constructor() {
    super();
    this.state = {
      clients: [],
    };
  }

  render() {
    return (
      <div>
        <NewClients clients={this.props.clients} />
        <EmailsSent clients={this.props.clients} />
        <OutstandingClients clients={this.props.clients} />
        <HottestCountry clients={this.props.clients} />
      </div>
    );
  }
}
