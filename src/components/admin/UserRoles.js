import React, { Component } from "react";
import Card from "react-bootstrap/Card";
import CardDeck from "react-bootstrap/CardDeck";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

export default class UserRoles extends Component {
    constructor(props, context) {
        super(props, context);
    
        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
    
        this.state = {
            show: false,
            user_role: "",
            userId: "",
            currentUser: ""
        };
    }

    handleClose() {
        this.setState({ show: false });
    }
    
    handleShow = event => {
        //in order to pass data to the modal, update local state based on the event target
        this.setState({ show: true,
            userId: event.target.id,
            currentUser: this.props.users.find(user => parseInt(event.target.id) === user.id)
        });
    }

    // Update state whenever an input field is edited (Steve's code)
    handleFieldChange = event => {
        const stateToChange = {}
        stateToChange[event.target.id] = event.target.value
        this.setState(stateToChange)
    }

    render() {
        console.log("local state:", this.state)
        return (
            <div id="dashboard">
                <CardDeck>
                    { this.props.users.map(user => 
                        <Card key={user.id}>
                            <Card.Body className="text-center">
                                <Card.Title>
                                    {user.username}
                                </Card.Title>
                                <Card.Text>
                                    name: {user.display_name}<br />
                                    role: {user.role}
                                </Card.Text>
                                <Button variant="success" id={user.id} onClick={this.handleShow}>Change Role</Button>
                            </Card.Body>
                        </Card>
                    )}
                </CardDeck>
                <Modal show={this.state.show} onHide={this.handleClose}>
                <Modal.Header>
                    Change {this.state.currentUser.username}'s role
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="user_role">
                            <Form.Label>
                                User Role
                            </Form.Label>
                            <Form.Control onChange={this.handleFieldChange} as="select" value={this.state.currentUser.role}>
                                <option>Choose a type</option>
                                <option value="user">user</option>
                                <option value="admin">admin</option>
                            </Form.Control>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={this.handleClose}>Close</Button>
                    <Button variant="primary" onClick={this.handleClose}>Save Changes</Button>
                </Modal.Footer>
                </Modal>
            </div>
        )
    }
}