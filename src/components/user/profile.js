import React, { Component } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import APIManager from "../../modules/APIManager";

export default class Profile extends Component {
    constructor(props, context) {
        super(props, context);
    
        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
    
        this.state = {
            show: false,
            display_name: ""
        };
    }

    handleClose() {
        this.setState({ show: false });
    }
    
    handleShow() {
        this.setState({ show: true });
    }

    // Update state whenever an input field is edited (Steve's code)
    handleFieldChange = event => {
        const stateToChange = {}
        stateToChange[event.target.id] = event.target.value
        this.setState(stateToChange)
    }

    updateDisplayName = event => {
        //stop the form doing HTML stuff
        event.preventDefault()

        //construct the user object
        const updatedUser = {
            id: this.props.activeUser.id,
            display_name: this.state.display_name
        }
        this.props.updateUser(updatedUser)
            .then(() => {
                //close the modal
                this.setState({ show: false });
            })
    }
    
    componentDidMount() {
        APIManager.getOne(parseInt(sessionStorage.getItem("credentials")), "users")
        .then(user => {
            this.setState({
                display_name: user.display_name
            })
        })
    }

    render() {
        return (
            <React.Fragment>
                <div id="dashboard">
                    <p>username: {this.props.activeUser.username}</p>
                    <p>display name: {this.props.activeUser.display_name}<br />
                    <a href="#" className="small" onClick={this.handleShow}>change display name</a></p>
                    { this.props.activeUser.role === "admin" ? <p>role: {this.props.activeUser.role}</p> : ""}
                    
                    
                </div>

                <Modal show={this.state.show} onHide={this.handleClose}>
                    <Modal.Body>
                        <Form>
                            <Form.Group controlId="display_name">
                                <Form.Label>
                                    Display Name
                                </Form.Label>
                                <Form.Control onChange={this.handleFieldChange} value={this.state.display_name} />
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.handleClose}>Close</Button>
                        <Button variant="primary" onClick={this.updateDisplayName}>Save Changes</Button>
                    </Modal.Footer>
                </Modal>
            </React.Fragment>
        )
    }
}