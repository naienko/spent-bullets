import React, { Component } from "react";
import APIManager from "../../modules/APIManager";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

export default class StackUpdate extends Component {
    //set empty local state
    state = {
        stackAmt: "",
        brandCaliberId: "",
        brandName: "",
        caliberName: "",
        stackOldAmt: ""
    }
    
    // Update state whenever an input field is edited (Steve's code)
    handleFieldChange = event => {
        const stateToChange = {}
        stateToChange[event.target.id] = event.target.value
        this.setState(stateToChange)
    }

    updateTheStack = event => {
        //stop the form doing HTML stuff
        event.preventDefault()

        let stackAmt = null;
        if (event.target.id === "plus") {
            stackAmt = parseInt(this.state.stackOldAmt) + parseInt(this.state.stackAmt)
        } else if (event.target.id === "minus") {
            stackAmt = parseInt(this.state.stackOldAmt) - parseInt(this.state.stackAmt)
        }
        //construct the stack object
        const updatedStack = {
            amount: stackAmt,
            id: this.props.match.params.stackId
        }
        this.props.updateStack(updatedStack)
            .then(() => this.props.history.push("/"))
    }
    
    componentDidMount() {
        APIManager.getOne(this.props.match.params.stackId, "stacks")
        .then(stack => {
            let bcId = this.props.brandCalibers.find(bcLink => stack.brandCaliberId === bcLink.id)
            this.setState({
                stackOldAmt: stack.amount,
                brandCaliberId: stack.brandCaliberId,
                brandName: bcId.brand.brand,
                caliberName: bcId.caliber.caliber
            })
        })
    }
    
    render() {
        return (
            <div id="dashboard">
                <div className="text-center h3">{this.state.stackOldAmt} <span className="text-muted">count</span> {this.state.brandName} {this.state.caliberName}</div>
                <Form>
                    <Form.Group controlId="stackAmt">
                        <Form.Label className="m-sm-2">
                            How many?
                        </Form.Label>
                        <input type="number" onChange={this.handleFieldChange} id="stackAmt" className="form-control" />
                    </Form.Group>
                    <div className="text-center">
                        <Button variant="success" id="plus" onClick={this.updateTheStack}>Add</Button>
                        
                         <Button variant="danger" id="minus" onClick={this.updateTheStack}>Remove</Button>
                    </div>
                </Form>
            </div>
        )
    }
}