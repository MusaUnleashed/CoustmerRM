import { Container, Row, Col } from "react-bootstrap";
import Navbar from "react-bootstrap/Navbar";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";

import React from "react";
import Actions from "./action/Actions";
import Clients from "./client/Clients";
import Analytics from "./Analtics/Analytics";

function NavBar() {
  return (
    <Router>
      <nav className="navbar navbar-dark bg-dark">
        <Container fluid="md">
          <Row className="justify-content-md-center">
            <Col>
              <Link to="/clients">Clients</Link>
            </Col>
            <Col>
              <Link to="/actions"> Actions </Link>
            </Col>
            <Col>
              <Link to="/analytics"> Analytics </Link>
            </Col>
          </Row>
        </Container>
      </nav>
      <Switch>
        <Route path="/" exact component={Clients} />
        <Route path="/analytics" exact component={Analytics} />
        <Route path="/clients" exact component={Clients} />
        <Route path="/actions" exact component={Actions} />
        
      </Switch>
    </Router>
  );
}

export default NavBar;
