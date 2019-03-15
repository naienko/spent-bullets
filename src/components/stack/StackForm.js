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
        }

        if (this.state.brandCaliberId && this.state.stackAmt) {
            if (this.state.stack_notes === undefined) {
                stack.notes = ""
            } else {
                stack.notes = this.state.stack_notes
            }
            //check for pre-existing matching stack
            if (!this.props.stacks.find(stack => this.state.brandCaliberId === stack.brandCaliberId)) {
                toast.success("Adding new stack!", {
                    position: toast.POSITION.TOP_CENTER,
                    autoClose: 3000
                })
                //if no, add brandCaliberId to stack object
                stack.brandCaliberId = parseInt(this.state.brandCaliberId);
                //check for in boxes
                if (!this.state.boxIsChecked) {
                    //if not, stackAmt is total count
                    stack.amount = this.state.stackAmt;
                } else {
                    //if yes, multiply stackAmt (as # of boxes) by # in boxes for that type
                    let type = this.props.brandCalibers.find(bc => parseInt(this.state.brandCaliberId) === bc.id)
                    let box_count = type.box_count;
                    let multipler_total = parseInt(this.state.stackAmt) * parseInt(box_count);
                    stack.amount = multipler_total;
                }
                //add stack object in the stacks table in the db using the passed-in function
                this.props.addStack(stack)
                    .then(
                        setTimeout(() => {
                            this.props.history.push("/")
                        }, 3500)
                    )
            } else {
                //if yes, alert
                toast.success("This stack already exists! Updating the count for you ...", {
                    position: toast.POSITION.TOP_CENTER,
                    autoClose: 3000
                })
                const oldStack = this.props.stacks.find(stack => this.state.brandCaliberId === stack.brandCaliberId)
                stack.id = oldStack.id;
                //check for in boxes
                if (!this.state.boxIsChecked) {
                    //if not, add stackAmt to old stack
                    stack.amount = parseInt(this.state.stackAmt) + parseInt(oldStack.amount);
                } else {
                    //if yes, multiply stackAmt (as # of boxes) by # in boxes for that type
                    //and add amount to old stack
                    let type = this.props.brandCalibers.find(bc => parseInt(this.state.brandCaliberId) === bc.id)
                    let box_count = type.box_count;
                    let multipler_total = parseInt(this.state.stackAmt) * parseInt(box_count);
                    stack.amount = multipler_total + parseInt(oldStack.amount);
                }
                //update stack object in the stacks table in the db using the passed-in function
                this.props.updateStack(stack)
                    .then(
                        setTimeout(() => {
                            this.props.history.push("/")
                        }, 3500)
                    )
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
                    <Form.Label>Did you buy in boxes?</Form.Label>{" "}
                    <input type="checkbox" id="is_box" name="completed" value={this.state.boxIsChecked} onClick={this.checkboxToggle} /><br />
                    <Form.Label>How many{ this.state.boxIsChecked === false ? " bullets" : " boxes"}?</Form.Label>
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