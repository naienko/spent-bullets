import React, { Component } from "react";
import { withRouter } from "react-router";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import APIManager from "../../modules/APIManager";

class Login extends Component {
    //empty state to start with, to store input fields in
    state = {
        username: "",
        password: ""
    }

    // Update state whenever an input field is edited (Steve's code)
    handleFieldChange = event => {
        const stateToChange = {}
        stateToChange[event.target.id] = event.target.value
        this.setState(stateToChange)
    }

    //event handler for login (cribbed from Jenna's code)
    handleLogin = event => {
        //stop the form doing HTML stuff
        event.preventDefault()
        //compare the data in the form fields to data pulled from users table in db
        if (this.state.username && this.state.password) {
            APIManager.getQuery(`username=${this.state.username}&password=${this.state.password}`, "users").then(
                user => {
                    //if nothing matches, warn and refuse
                    if (!user.length) {
                        alert("Wrong username or password!")
                    } else {
                    //store the input data in sessionStorage (like a cookie)
                    //consider a checkbox for localStorage?
                        sessionStorage.setItem("credentials", parseInt(user[0].id))
                        this.props.setAuth()
                    }
                }
            )
        } else {
            //if the user didn't fill all fields, warn
            alert("Please Fill Out Form!")
        }
    }

    render() {
        return (
            <React.Fragment>
                <Form onSubmit={this.handleLogin} className="m-sm-3">
                    <h1>Please sign in</h1>
                    <Form.Group controlId="username">
                        <Form.Label>
                            Username
                        </Form.Label>
                        <Form.Control onChange={this.handleFieldChange} placeholder="Username" required autoFocus />
                    </Form.Group>
                    <Form.Group controlId="password">
                        <Form.Label>
                            Password
                        </Form.Label>
                        <Form.Control onChange={this.handleFieldChange} type="password" placeholder="Password" required />
                    </Form.Group>
                    <Form.Group className="text-right">
                        <Button variant="primary" type="submit">Sign in</Button>
                    </Form.Group>
                </Form>
                <div className="text-center">
                    Not a member yet? <Button variant="secondary" onClick={() => this.props.history.push("/register")}>Register</Button>
                </div>
            </React.Fragment>
        )
    }
};

export default withRouter(Login);