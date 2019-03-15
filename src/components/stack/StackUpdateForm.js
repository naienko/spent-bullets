import React, { Component } from "react";
import { withRouter } from "react-router";
import APIManager from "../../modules/APIManager";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

class StackUpdate extends Component {
    //set empty local state
    state = {
        stackAmt: 0,
        brandCaliberId: "",
        brandName: "",
        caliberName: "",
        stackOldAmt: "",
        stack_notes: ""
    }
    
    // Update state whenever an input field is edited (Steve's code)
    handleFieldChange = event => {
        const stateToChange = {}
        stateToChange[event.target.id] = event.target.value
        this.setState(stateToChange)
    }

    constructor(props) {
        super(props);
    
        this.state = {
            boxIsChecked: false
        };
    
        this.checkboxToggle = this.checkboxToggle.bind(this);
    }

    checkboxToggle() {
        this.setState({ boxIsChecked: !this.state.boxIsChecked });
    }

    updateTheStack = event => {
        //stop the form doing HTML stuff
        event.preventDefault()

        let stackAmt = null;
        //check to see if the user changed the amount or just the note
        if (this.state.stackAmt !== 0) {
            //if they changed the amount check to see if they marked the checkbox
            //AND check to see which button they pushed and do math accordingly
            if (this.state.boxIsChecked && event.target.id === "plus") {
                let type = this.props.brandCalibers.find(bc => parseInt(this.state.brandCaliberId) === bc.id)
                let box_count = type.box_count;
                stackAmt = parseInt(this.state.stackOldAmt) + (parseInt(this.state.stackAmt) * parseInt(box_count));
            } else if (this.state.boxIsChecked && event.target.id === "minus") {
                let type = this.props.brandCalibers.find(bc => parseInt(this.state.brandCaliberId) === bc.id)
                let box_count = type.box_count;
                stackAmt = parseInt(this.state.stackOldAmt) - (parseInt(this.state.stackAmt) * parseInt(box_count));
            } else if (!this.state.boxIsChecked && event.target.id === "plus") {
                stackAmt = parseInt(this.state.stackOldAmt) + parseInt(this.state.stackAmt)
            } else if (!this.state.boxIsChecked && event.target.id === "minus") {
                stackAmt = parseInt(this.state.stackOldAmt) - parseInt(this.state.stackAmt)
            }
        } else {
            //otherwise just use the old amount
            stackAmt = parseInt(this.state.stackOldAmt)
        }
        //construct the stack object
        const updatedStack = {
            amount: stackAmt,
            id: parseInt(this.props.match.params.stackId),
        }
        if (this.state.stack_notes === undefined) {
            updatedStack.notes = ""
        } else {
            updatedStack.notes = this.state.stack_notes
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
                caliberName: bcId.caliber.caliber,
                stack_notes: stack.notes
            })
        })
    }
    
    render() {
        return (
            <div id="dashboard">
                <div className="text-center h3">{this.state.stackOldAmt} <span className="text-muted">count</span> {this.state.brandName} {this.state.caliberName}</div>
                <Form>
                    <Form.Group controlId="stackAmt">
                    <Form.Label>Did you buy/shoot in boxes?</Form.Label>{" "}
                    <input type="checkbox" id="is_box" name="completed" value={this.state.boxIsChecked} onClick={this.checkboxToggle} /><br />
                    <Form.Label>How many{ this.state.boxIsChecked === false ? " bullets" : " boxes"}?</Form.Label>
                        <input type="number" onChange={this.handleFieldChange} id="stackAmt" className="form-control" />
                    </Form.Group>
                    <Form.Group controlId="stack_notes">
                        <Form.Label>
                            Notes
                        </Form.Label>
                        <Form.Control onChange={this.handleFieldChange} value={this.state.stack_notes} />
                    </Form.Group>
                    <div className="text-center">
                        <Button variant="success" id="plus" onClick={this.updateTheStack}>Add</Button>
                        <Button variant="danger" id="minus" onClick={this.updateTheStack}>Remove</Button>
                    </div>
                </Form>
            </div>
        )
    }
};

export default withRouter(StackUpdate);