import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { withRouter } from "react-router";

import APIManager from "../../modules/APIManager";
import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

class NewType extends Component {

    //create empty local state
    state = {
        request_name: "",
        request_type: "",
        request_desc: ""
    }

    // Update state whenever an input field is edited (Steve's code)
    handleFieldChange = event => {
        const stateToChange = {}
        stateToChange[event.target.id] = event.target.value
        this.setState(stateToChange)
    }

    handleRadioChange = event => {
        this.setState({
            request_type: event.currentTarget.value
        })
    }

    createNewLink = event => {
        //stop the form doing HTML stuff
        event.preventDefault()
        //do stuff with form data
        const request = {
            userId: parseInt(sessionStorage.getItem("credentials"))
        }

        if (this.state.request_desc && this.state.request_name && this.state.request_type) {
            request.request_desc = this.state.request_desc
            request.request_name = this.state.request_name
            if (this.state.request_type == "brand") {
                request.request_type = 1
            } else if (this.state.request_type == "caliber") {
                request.request_type = 2
            }
            
            toast.success("Adding your request!", {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 3000
            })
            //add object in the table in the db using the passed-in function
            this.props.AddRequest(request)
            .then(
                setTimeout(() => {
                    this.props.history.push("/")
                }, 3500)
                )
        } else {
            alert("Please complete the form!")
        }
    }

    render() {
        return (
            <div id="dashboard">
            <ToastContainer />
            <div>If there's a caliber or brand missing from the lists, please enter it below, along with a link to where it can be acquired (for accuracy), and our admins will review your request.</div>
            <Form onSubmit={this.createNewLink}>
                <Form.Group controlId="request_name">
                    <Form.Label>
                        Name
                    </Form.Label>
                    <Form.Control onChange={this.handleFieldChange} placeholder="name of the requested brand or caliber" />
                </Form.Group>

                <Form.Group controlId="request_type">
                    <Form.Label>Type</Form.Label>
                    <Form.Check inline label="brand" value="brand" type="radio" id="1" onChange={this.handleRadioChange} />
                    <Form.Check inline label="caliber" value="caliber" type="radio" id="2" onChange={this.handleRadioChange} />
                </Form.Group>

                <Form.Group controlId="request_desc">
                    <Form.Label>Description</Form.Label>
                    <Form.Control type="textarea" placeholder="put a link or other information proving the existence of this brand or caliber here" onChange={this.handleFieldChange} />
                </Form.Group>

                <Button variant="success" type="submit">Submit</Button>
            </Form>
            </div>
        )
    }
};

export default withRouter(NewType);