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
            //TODO: filtering: create a variable here for the list of users
        };
    }

    handleClose() {
        this.setState({ show: false });
    }
    
    handleShow = event => {
        //in order to pass data to the modal, update local state based on the event target
        let currentUser = this.props.users.find(user => parseInt(event.target.id) === user.id)
        this.setState({ show: true,
            userId: event.target.id,
            currentUser: currentUser,
            user_role: currentUser.role
        });
    }

    // Update state whenever an input field is edited (Steve's code)
    handleFieldChange = event => {
        const stateToChange = {}
        stateToChange[event.target.id] = event.target.value
        this.setState(stateToChange)
    }
    //TODO: filtering: do I need a new handlechange function for the search input?
    //TODO: filtering: learn about componentwillmount -- is this lifecycle stage still valid?
    //TODO: filtering: create a function to apply .filter method and search string to list of users
    //TODO: filtering: once the .filter method is applied, we set state to it, which triggers rerender and makes the search a live search?
    //https://medium.com/@AndrewBonner2/filter-results-with-react-f746dc7984c

    updateUserRole = event => {
        //stop the form doing HTML stuff
        event.preventDefault()
        if (this.state.currentUser.id === this.props.activeUser.id) {
            alert("You can't change your own role");
        } else {
            //construct the user object
            const updatedUser = {
                id: this.state.currentUser.id,
                username: this.state.currentUser.username,
                password: this.state.currentUser.password,
                email: this.state.currentUser.email,
                display_name: this.state.currentUser.display_name,
                role: this.state.user_role
            }

            this.props.updateUser(updatedUser)
                .then(() => {
                    //close the modal
                    this.setState({ show: false });
                })
        }
    }

    render() {
        return (
            <div id="dashboard">
                <CardDeck>
                    { this.props.users.reverse().map(user => 
                        <Card key={user.id}>
                            <Card.Body className="text-center">
                                <Card.Title>
                                    {user.username}
                                </Card.Title>
                                <Card.Text>
                                    name: {user.display_name}<br />
                                    role: {user.role}
                                </Card.Text>
                                { user.id === this.props.activeUser.id ? <b>This is you!</b> : <Button variant="success" id={user.id} onClick={this.handleShow}>Change Role</Button> }
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
                            <Form.Control onChange={this.handleFieldChange} as="select" value={this.state.user_role}>
                                <option>Choose a type</option>
                                <option value="user">user</option>
                                <option value="admin">admin</option>
                            </Form.Control>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={this.handleClose}>Close</Button>
                    <Button variant="primary" onClick={this.updateUserRole}>Save Changes</Button>
                </Modal.Footer>
                </Modal>
            </div>
        )
    }
}