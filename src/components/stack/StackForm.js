import React, { Component } from "react";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { ToastContainer, toast } from "react-toastify";
import { withRouter } from "react-router";

import "react-toastify/dist/ReactToastify.css";

class StackForm extends Component {
    //set empty local state
    state = {
        stackAmt: "",
        stack_notes: "",
        caliberId: "",
        brandId: "",
        grainCt: ""
    }

    // Update state whenever an input field is edited (Steve's code)
    handleFieldChange = event => {
        const stateToChange = {}
        stateToChange[event.target.id] = event.target.value
        this.setState(stateToChange)
    }

    createNewStack = event => {
        //stop the form doing HTML stuff
        event.preventDefault()
        //construct the stack object
        const stack = {
            userId: parseInt(sessionStorage.getItem("credentials")),
        }

        if (this.state.caliberId && this.state.brandId && this.state.stackAmt) {
            if (this.state.stackAmt < 0) {
                alert("Hey, you can't have a negative amount! If you want to remove ammo from a stack, please use the update button on the home screen.")
            } else {
                if (this.state.brandId === 1000 && this.state.stack_notes === undefined) {
                    stack.notes = "(update notes for load details)"
                } else if (this.state.stack_notes === undefined) {
                    stack.notes = ""
                } else {
                    stack.notes = this.state.stack_notes
                }
                //check for pre-existing matching stack
                if (!this.props.stacks.find(stack => parseInt(this.state.brandId) === parseInt(stack.brandId) && parseInt(this.state.caliberId) === parseInt(stack.caliberId) && parseInt(this.state.grainCt) === parseInt(stack.grain))) {
                    toast.success("Adding new stack!", {
                        position: toast.POSITION.TOP_CENTER,
                        autoClose: 3000
                    })
                    //if no, add brandCaliberId to stack object
                    stack.caliberId = parseInt(this.state.caliberId);
                    stack.brandId = parseInt(this.state.brandId);
                    stack.amount = parseInt(this.state.stackAmt);
                    stack.grain = parseInt(this.state.grainCt);
                    //add stack object in the stacks table in the db using the passed-in function
                    this.props.addStack(stack)
                        .then(
                            setTimeout(() => {
                                this.props.history.push("/")
                            }, 3500)
                        )
                } else {
                    //if yes, alert
                    if (window.confirm("This stack already exists! Do you want to update this stack? Cancel will create a new stack of this type.")) {
                        toast.success("This stack already exists! Updating the count for you ...", {
                            position: toast.POSITION.TOP_CENTER,
                            autoClose: 3000
                        })
                        const oldStack = this.props.stacks.find(stack => parseInt(this.state.brandId) === parseInt(stack.brandId) && parseInt(this.state.caliberId) === parseInt(stack.caliberId) && parseInt(this.state.grainCt) === parseInt(stack.grain))
                        stack.id = oldStack.id;
                        stack.amount = parseInt(this.state.stackAmt) + parseInt(oldStack.amount);
                        //update stack object in the stacks table in the db using the passed-in function
                        this.props.updateStack(stack)
                        .then(
                            setTimeout(() => {
                                this.props.history.push("/")
                            }, 3500)
                        )
                    } else {
                        toast.success("Adding new stack!", {
                            position: toast.POSITION.TOP_CENTER,
                            autoClose: 3000
                        })
                        //if no, add brandCaliberId to stack object
                        stack.caliberId = parseInt(this.state.caliberId);
                        stack.brandId = parseInt(this.state.brandId);
                        stack.amount = parseInt(this.state.stackAmt);
                        stack.grain = parseInt(this.state.grainCt);
                        //add stack object in the stacks table in the db using the passed-in function
                        this.props.addStack(stack)
                            .then(
                                setTimeout(() => {
                                    this.props.history.push("/")
                                }, 3500)
                            )    
                    }
                }
            }
        } else {
            alert("Please complete the form!")
        }
    }

    render() {
        return (
            <div id="dashboard">
            <ToastContainer />
            <Form onSubmit={this.createNewStack}>
                <Form.Group controlId="caliberId">
                    <Form.Label>Caliber</Form.Label>
                    <Form.Control onChange={this.handleFieldChange} as="select">
                        <option>Choose a caliber</option>
                        { this.props.calibers.map(element => 
                            <option key={element.id} value={element.id}>{element.caliber}</option>
                            )}
                    </Form.Control>
                </Form.Group>
                <Form.Group controlId="brandId">
                    <Form.Label>Brand</Form.Label>
                    <Form.Control onChange={this.handleFieldChange} as="select">
                        <option>Choose a brand</option>
                        { this.props.brands.map(element => 
                            <option key={element.id} value={element.id}>{element.brand}</option>
                            )}
                    </Form.Control>
                </Form.Group>
                <Form.Group controlId="grainCt">
                    <Form.Label>Grain</Form.Label>
                    <input type="number" onChange={this.handleFieldChange} id="grainCt" className="form-control" />
                </Form.Group>
                <Form.Group controlId="stackAmt">
                    <Form.Label>How many bullets?</Form.Label>
                    <input type="number" onChange={this.handleFieldChange} id="stackAmt" className="form-control" />
                </Form.Group>
                <Form.Group controlId="stack_notes">
                    <Form.Label>
                        Notes
                    </Form.Label>
                    <Form.Control onChange={this.handleFieldChange} />
                </Form.Group>
                <Button variant="success" type="submit">Submit</Button>
            </Form>
             </div>
        )
    }
}

export default withRouter(StackForm)