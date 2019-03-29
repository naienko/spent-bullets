import React, { Component } from "react";
import { withRouter } from "react-router"
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Dropdown from "react-bootstrap/Dropdown"

import "./nav.css"

class NavBar extends Component {
    logout = () => {
        sessionStorage.clear("credentials")
        this.props.setAuth()
    }
    
    render() {
        return (
            <Navbar collapseOnSelect expand="md" variant="light" bg="light" fixed="top" className="shadow" id="nav">
                <Nav.Item>
                    <Nav.Link href="/">Home</Nav.Link>
                </Nav.Item>
                <Nav.Item className="m-sm-2">
                    Welcome <a href="/profile">{this.props.activeUser.username}</a>
                </Nav.Item>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto" variant="pills" fill>
                        <Nav.Item>
                            <Nav.Link href="/stack/new">Add New Stack</Nav.Link>
                        </Nav.Item>
                        { this.props.activeUser.role === "admin" 
                        ? 
                        <Dropdown as={Nav.Item}>
                            <Dropdown.Toggle as={Nav.Link}>Admin Menu</Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item href="/admin/roles">Change User Roles</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                        :
                        ""
                        }
                        <Nav.Item>
                            <Nav.Link onClick={this.logout}>Logout</Nav.Link>
                        </Nav.Item>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        )
    }
}

export default withRouter(NavBar)