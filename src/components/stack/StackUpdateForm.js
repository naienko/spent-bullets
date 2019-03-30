import React, { Component } from "react";
import { withRouter } from "react-router";
import { ToastContainer, toast } from "react-toastify";
import StackManager from "../../modules/StackManager";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
// a chnage is made
import "react-toastify/dist/ReactToastify.css";

class StackUpdate extends Component {
    //set empty local state
    state = {
        stackAmt: 0,
        brandName: "",
        caliberName: "",
        grainCt: 0,
        stackOldAmt: 0,
        stack_notes: ""
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
        //check to see if the user changed the amount or just the note
        if (this.state.stackAmt > 0) {
            //if they changed the amount check to see  which button they pushed and do math accordingly
            if (event.target.id === "plus") {
                stackAmt = parseInt(this.state.stackOldAmt) + parseInt(this.state.stackAmt)
            } else if (event.target.id === "minus") {
                stackAmt = parseInt(this.state.stackOldAmt) - parseInt(this.state.stackAmt)
            }
        } else if (this.state.stackAmt < 0) {
            alert("Hey, you can't have a negative amount! If you want to remove ammo from a stack, input a positive number and click remove.")
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
        if (stackAmt <= 0) {
            if (window.confirm("Are you sure you want to delete this stack? You've set the count to 0 or less.")) {
                toast.success("Stack amount decreased to 0; deleting stack", {
                    position: toast.POSITION.TOP_CENTER,
                    autoClose: 3000
                })
                this.props.deleteStack(updatedStack.id)
                    .then(
                        setTimeout(() => {
                            this.props.history.push("/")
                        }, 3500)
                    )        
            }
        } else {
            toast.success("Updating stack", {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 3000
            })
            this.props.updateStack(updatedStack)
                .then(
                    setTimeout(() => {
                        this.props.history.push("/")
                    }, 3500)
                )
        }
    }
    
    componentDidMount() {
        StackManager.getOneStack(this.props.match.params.stackId)
        .then(stack => {
            this.setState({
                stackOldAmt: stack.amount,
                brandName: stack.brand.brand,
                caliberName: stack.caliber.caliber,
                grainCt: stack.grain,
                stack_notes: stack.notes
            })
        })
    }
    
    render() {
        return (
            <div id="dashboard">
                <ToastContainer />
                <div className="text-center h3">{this.state.stackOldAmt} <span className="text-muted">count</span><br /> {this.state.brandName} {this.state.caliberName} {this.state.grainCt} grain</div>
                <Form>
                    <Form.Group controlId="stackAmt">
                    <Form.Label>How many bullets?</Form.Label>
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