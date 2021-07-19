
import {Container, Row, Col } from 'react-bootstrap';
import Navbar from 'react-bootstrap/Navbar'
import {
    BrowserRouter as Router,
    Route,
    Link
  } from "react-router-dom";
  import React from 'react'
import Actions from './action/Actions';
import Clients from './client/Clients';
import Analytics from './Analytics';


function NavBar() {
    return (
            <Router>
                <nav className="navbar navbar-dark bg-dark">
                   
                       <Container fluid="md">
                        <Row className="justify-content-md-center">
                            <Col>
                                <Link to="/clients">
                                    Clients 
                                </Link>
                            </Col>
                            <Col>
                                <Link to="/actions">  Actions </Link>
                            </Col>
                            <Col>
                                <Link to="/analytics"> Analytics </Link>
                            </Col>
                        </Row>
                    
                    </Container>
                </nav>

                <Route path="/analytics" exact
                component={Analytics}
                />
                <Route path="/clients" exact
                component={Clients}

                />
               
                <Route path="/actions" exact
                component={Actions}

                />
            </Router>
    )
}

export default NavBar

