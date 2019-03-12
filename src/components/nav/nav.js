import React, { Component } from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import "./nav.css"

export default class NavBar extends Component {
    render() {
        return (
            <Navbar fixed="top" className="shadow" id="nav" variant="dark" bg="dark">
                <Nav fill variant="pills">
                    <Col>
                    <Nav.Item>
                        <Nav.Link href="/">Home</Nav.Link>
                    </Nav.Item>
                    </Col>
                    <Col>
                    <Nav.Item>
                        <Nav.Link href="/stack/new">Add New Stack</Nav.Link>
                    </Nav.Item>
                    </Col>
                    <Col>
                    <Nav.Item>
                        <Nav.Link>Logout</Nav.Link>
                    </Nav.Item>
                    </Col>
                </Nav>
            </Navbar>
        )
    }
}