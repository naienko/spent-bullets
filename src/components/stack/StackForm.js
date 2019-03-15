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
        brandCaliberId: ""
    }

    constructor(props) {
        super(props);
    
        this.state = {
            boxIsChecked: false
        };
    
        this.checkboxToggle = this.checkboxToggle.bind(this);
    }

    // Update state whenever an input field is edited (Steve's code)
    handleFieldChange = event => {
        const stateToChange = {}
        stateToChange[event.target.id] = event.target.value
        this.setState(stateToChange)
    }

    checkboxToggle() {
        this.setState({ boxIsChecked: !this.state.boxIsChecked });
        console.log("boxIsChecked: " + this.state.boxIsChecked);
    }

    createNewStack = event => {
        //stop the form doing HTML stuff
        event.preventDefault()
        //construct the stack object
        const stack = {
            userId: parseInt(sessionStorage.getItem("credentials")),
            amount: parseInt(this.state.stackAmt),
            notes: this.state.stack_notes
        }

        if (this.state.brandCaliberId && this.state.stackAmt) {
            
            //check for pre-existing matching stack
            if (!this.props.stacks.find(stack => this.state.brandCaliberId === stack.brandCaliberId)) {
                toast.success("Adding new stack!", {
                    position: toast.POSITION.TOP_CENTER,
                    autoClose: 3000
                })
                //if no, add brandCaliberId to stack object
                stack.brandCaliberId = parseInt(this.state.brandCaliberId);
            } else {
                //if yes, alert
                toast.success("This stack already exists! Updating the count for you ...", {
                    position: toast.POSITION.TOP_CENTER,
                    autoClose: 3000
                })
                const oldStack = this.props.stacks.find(stack => this.state.brandCaliberId === stack.brandCaliberId)
                //and add amount to old stack
                stack.amount = parseInt(this.state.stackAmt) + parseInt(oldStack.amount);
                stack.id = oldStack.id;
            }
            //update stack object in the stacks table in the db using the passed-in function
            this.props.updateStack(stack)
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
            <Form onSubmit={this.createNewStack}>
                <Form.Group controlId="brandCaliberId">
                    <Form.Label>Type</Form.Label>
                    <Form.Control onChange={this.handleFieldChange} as="select">
                        <option>Choose a type</option>
                        { this.props.brandCalibers.map(element => 
                            <option key={element.id} value={element.id}>{element.caliber.caliber}, {element.brand.brand}</option>
                            )}
                    </Form.Control>
                </Form.Group>
                <Form.Group controlId="stackAmt">
                    <Form.Label>
                        How many?
                    </Form.Label>
                    <input type="number" onChange={this.handleFieldChange} id="stackAmt" className="form-control" />
                    <Form.Label>Did you buy in boxes?</Form.Label>{" "}
                    <input type="checkbox" id="is_box" name="completed" value={this.state.boxIsChecked} onClick={this.checkboxToggle} />
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