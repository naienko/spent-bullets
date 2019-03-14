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
            <Navbar fixed="top" className="shadow" id="nav" variant="dark" bg="dark">
                <Nav fill variant="pills">
                    <Nav.Item>
                        <Nav.Link href="/">Home</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link href="/stack/new">Add New Stack</Nav.Link>
                    </Nav.Item>
                    <Nav.Item className="text-light m-sm-2">
                        Welcome <a href="/profile">{this.props.activeUser.username}</a>
                    </Nav.Item>
                    { this.props.activeUser.role === "admin" 
                    ? 
                        <Dropdown as={Nav.Item}>
                            <Dropdown.Toggle as={Nav.Link}>Admin Menu</Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item href="/admin/new">Add New Type</Dropdown.Item>
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
            </Navbar>
        )
    }
}

export default withRouter(NavBar)