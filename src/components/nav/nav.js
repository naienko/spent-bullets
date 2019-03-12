import React, { Component } from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Col from "react-bootstrap/Col";

import "./nav.css"

export default class NavBar extends Component {
    logout = () => {
        sessionStorage.clear("credentials")
        this.props.setAuth()
    }
    
    render() {
        return (
            <Navbar fixed="top" className="shadow" id="nav" variant="dark" bg="dark">
                <Nav fill variant="pills">
                    <Col md="auto">
                    <Nav.Item>
                        <Nav.Link href="/">Home</Nav.Link>
                    </Nav.Item>
                    </Col>
                    <Col md="auto">
                    <Nav.Item>
                        <Nav.Link href="/stack/new">Add New Stack</Nav.Link>
                    </Nav.Item>
                    </Col>
                    <Col>
                        <Nav.Item className="text-light m-sm-2">
                            Welcome {this.props.activeUser.username}
                        </Nav.Item>
                    </Col>
                    <Col md="auto">
                    <Nav.Item>
                        <Nav.Link onClick={this.logout}>Logout</Nav.Link>
                    </Nav.Item>
                    </Col>
                </Nav>
            </Navbar>
        )
    }
}