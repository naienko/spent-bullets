import React, { Component } from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";

import "./nav.css";

export default class NavBar extends Component {
    render() {
        return (
            <Navbar fixed="top" className="shadow" id="nav">
                <Nav fill variant="pills">
                    <Nav.Item>
                        <Nav.Link eventKey="1" to="/stack/new">Add New Stack</Nav.Link>
                    </Nav.Item>
                </Nav>
            </Navbar>
        )
    }
}