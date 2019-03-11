import React, { Component } from "react";
import APIManager from "../../modules/APIManager";
import Form from "react-bootstrap/Form";

export default class StackForm extends Component {
    //set empty local state
    state = {
        stackAmt: "",
        brandId: "",
        caliberId: "",
        userId: ""
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
        }
        //check for matching brandCaliber object
        if (this.state.brandId && this.state.caliberId) {
            APIManager.getQuery(`brandId=${this.state.brandId}&caliberId=${this.state.caliberId}`, "brandCalibers").then(
                res => {
                    if (!res.length) {
                        //if no, create new brandCaliber object as well
                        const brandCaliber = {
                            brandId: this.state.brandId,
                            caliberId: this.state.caliberId
                        }
                        //add it to the brandCalibers table in the db
                        this.props.addBCLink(brandCaliber)
                        //get the newly added object's id
                        //add that id as brandCaliberId to stack object
                            .then(id => stack.brandCaliberId = id)
                    } else {
                        //if yes, add brandCaliberId to stack object
                        stack.brandCaliberId = res.id;
                    }
                })
        } else {
            alert("Please complete the form!")
        }

        //add stack object to the stacks table in the db using the passed-in function
        this.props.addStack(stack)
            .then(this.props.history.push("/"))
    }

    render() {
        return (
            <div id="dashboard">
            <Form>
                <Form.Group controlId="brandId">
                    <Form.Label>Brand</Form.Label>
                    <Form.Control as="select">
                        <option>Choose a brand</option>
                        { this.props.brands.map(brand => 
                            <option key={brand.id} id={brand.id}>{brand.brand}</option>
                            )}
                    </Form.Control>
                </Form.Group>
                <Form.Group controlId="caliberId">
                    <Form.Label>Caliber</Form.Label>
                    <Form.Control as="select">
                        <option>Choose a caliber</option>
                        { this.props.calibers.map(caliber => 
                            <option key={caliber.id} id={caliber.id}>{caliber.caliber}</option>
                            )}
                    </Form.Control>
                </Form.Group>
            </Form>
             </div>
        )
    }
}