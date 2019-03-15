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
        caliberId: "",
        brandId: ""
    }

    // Update state whenever an input field is edited (Steve's code)
    handleFieldChange = event => {
        const stateToChange = {}
        stateToChange[event.target.id] = event.target.value
        this.setState(stateToChange)
    }

    createNewLink = event => {
        //stop the form doing HTML stuff
        event.preventDefault()
        //construct the stack object
        const brandCaliber = {
            brandId: parseInt(this.state.brandId),
            caliberId: parseInt(this.state.caliberId)
        }
        //check for matching brandCaliber object
        if (this.state.brandId && this.state.caliberId) {
            APIManager.getQuery(`brandId=${this.state.brandId}&caliberId=${this.state.caliberId}`, "brandCalibers").then(
                res => {
                    if (!res.length) {
                        //if no, add it to the brandCalibers table in the db
                        toast.success("Adding new type of ammunition", {
                            position: toast.POSITION.TOP_CENTER,
                            autoClose: 3000
                        })
                        this.props.addBCLink(brandCaliber)
                            .then(setTimeout(() => {
                                this.props.history.push("/")
                            }, 3500))
                    } else {
                        //if yes, warn and refuse
                        alert("This combination already exists in the database!")
                    }
                }
            )
        }
    }


    render() {
        return (
            <div id="dashboard">
            <ToastContainer />
            <Form onSubmit={this.createNewLink}>
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
                <Button variant="success" type="submit">Submit</Button>
            </Form>
            </div>
        )
    }
};

export default withRouter(NewType);