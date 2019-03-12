import React, { Component } from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";

export default class NavBar extends Component {
    render() {
        return (
            <Navbar fixed="top" className="shadow" id="nav" variant="dark" bg="dark">
                <Nav fill variant="pills">
                    <Nav.Item>
                        <Nav.Link href="/">Home</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link href="/stack/new">Add New Stack</Nav.Link>
                    </Nav.Item>
                </Nav>
            </Navbar>
        )
    }
}