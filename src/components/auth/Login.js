import React, { Component } from "react";
import Form from "react-bootstrap/Form";

export default class Login extends Component {
    //empty state to start with, to store input fields in
    state = {
        email: "",
        password: ""
    }

    // Update state whenever an input field is edited (Steve's code)
    handleFieldChange = event => {
        const stateToChange = {}
        stateToChange[event.target.id] = event.target.value
        this.setState(stateToChange)
    }

    //event handler for login
    handleLogin = event => {
        //stop the form doing HTML stuff
        event.preventDefault()
        //store the input data in sessionStorage (like a cookie)
        //consider a checkbox for localStorage?
        sessionStorage.setItem(
            "credentials",
            JSON.stringify({
                email: this.state.email,
                password: this.state.password
            })
        )
        //return to the component they were trying to view in the first place
        this.props.history.go(0);
    }

    render() {
        return (
            //hope I used Reactstrap right here ...
            <Form onSubmit={this.handleLogin}>
                <h1>Please sign in</h1>
                <Form.Group controlId="formLoginEmail">
                    <Form.Label>
                        Email address
                    </Form.Label>
                    <Form.Control type="email" onChange={this.handleFieldChange} id="email" placeholder="Email address" required autoFocus />
                </Form.Group>
                <Form.Group controlId="formLoginPwd">
                    <Form.Label>
                        Password
                    </Form.Label>
                    <Form.Control onChange={this.handleFieldChange} type="password" id="password" placeholder="Password" required />
                </Form.Group>
                <Button variant="primary" type="submit">Sign in</Button>
            </Form>
        )
    }
}