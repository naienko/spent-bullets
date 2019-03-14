import React, { Component } from "react";
import APIManager from "../../modules/APIManager";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { ToastContainer, toast } from "react-toastify";
import { withRouter } from "react-router";

import "react-toastify/dist/ReactToastify.css";

class StackForm extends Component {
    //set empty local state
    state = {
        stackAmt: "",
        brandId: "",
        caliberId: "",
        userId: "",
        stack_notes: ""
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
            amount: this.state.stackAmt,
            notes: this.state.stack_notes
        }
        //check for matching brandCaliber object
        //allow new combos? -- no unless admin, see stretch goal notes
        if (this.state.brandId && this.state.caliberId && this.state.stackAmt) {
            APIManager.getQuery(`brandId=${this.state.brandId}&caliberId=${this.state.caliberId}`, "brandCalibers").then(
                res => {
                    if (!res.length) {
                        alert("This combination doesn't exist in the database!")
                        //if no, create new brandCaliber object as well
                        //create toast for new brand/caliber combo
                        // const brandCaliber = {
                        //     brandId: this.state.brandId,
                        //     caliberId: this.state.caliberId
                        // }
                        // //add it to the brandCalibers table in the db
                        // this.props.addBCLink(brandCaliber)
                        // //get the newly added object's id
                        // //add that id as brandCaliberId to stack object
                        //     .then(id => stack.brandCaliberId = id)
                    } else {
                        //if yes, check for pre-existing matching stack
                        if (!this.props.stacks.find(stack => res[0].id === stack.brandCaliberId)) {
                            //if no, add brandCaliberId to stack object
                            stack.brandCaliberId = res[0].id;
                            //add stack object to the stacks table in the db using the passed-in function
                            this.props.addStack(stack)
                                .then(() => this.props.history.push("/"))
                        } else {
                            toast.success("This stack already exists! Updating the count for you ...", {
                                position: toast.POSITION.TOP_CENTER,
                                autoClose: 3000
                            })
                            const oldStack = this.props.stacks.find(stack => res[0].id === stack.brandCaliberId)
                            //if yes, add amount to old stack
                            stack.amount = parseInt(this.state.stackAmt) + parseInt(oldStack.amount);
                            stack.id = oldStack.id;
                            //update stack object in the stacks table in the db using the passed-in function
                            this.props.updateStack(stack)
                                .then(
                                    setTimeout(() => {
                                        this.props.history.push("/")
                                    }, 3500)
                                )
                        }
                    }
                })
        } else {
            alert("Please complete the form!")
        }

    }

    render() {
        return (
            <div id="dashboard">
            <ToastContainer />
            <Form onSubmit={this.createNewStack}>
                <Form.Group controlId="brandId">
                    <Form.Label>Brand</Form.Label>
                    <Form.Control as="select" onChange={this.handleFieldChange}>
                        <option>Choose a brand</option>
                        { this.props.brands.map(brand => 
                            <option key={brand.id} value={brand.id}>{brand.brand}</option>
                            )}
                    </Form.Control>
                </Form.Group>
                <Form.Group controlId="caliberId">
                    <Form.Label>Caliber</Form.Label>
                    <Form.Control onChange={this.handleFieldChange} as="select">
                        <option>Choose a caliber</option>
                        { this.props.calibers.map(caliber => 
                            <option key={caliber.id} value={caliber.id}>{caliber.caliber}</option>
                            )}
                    </Form.Control>
                </Form.Group>
                <Form.Group controlId="stackAmt">
                    <Form.Label>
                        How many?
                    </Form.Label>
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