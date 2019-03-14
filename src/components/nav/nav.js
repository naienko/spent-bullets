import React, { Component } from "react";
import { withRouter } from "react-router"
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";

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
                        <Nav.Item>
                            <Nav.Link href="/admin/new">Add New Type</Nav.Link>
                        </Nav.Item>
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