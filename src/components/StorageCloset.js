import React, { Component } from "react";
import { withRouter } from "react-router";

import Card from "react-bootstrap/Card";

import "./StorageCloset.css"
import CaliberGroup from "./stack/CaliberGroup";

class StorageCloset extends Component {
    //map method wants a function call so here's the function
    StackLoop = (currentStack, type) => {
        //this eliminates display of calibers you don't have any of
        if (currentStack.length > 0) {
            return <CaliberGroup stacks={currentStack}
                brands={this.props.brands} 
                calibers={this.props.calibers} 
                type={type} 
                deleteStack={this.props.deleteStack} />
        }
    }

    render () {
        return (
            <div id="dashboard">
                {
                    (this.props.stacks.length != 0) ? "" :
                    <Card bg="info" text="light" style={{ 'max-width': '50%' }}>
                        <Card.Body>
                        <p>To inventory a new stack of ammunition, click the 'Add New Stack' button in the navigation bar. Choose what caliber and what brand from the dropdown lists (they're searchable!), then enter in the number of grains and the total count of bullets you have. You can add individual notes to any stack of ammunition.</p>
                        <p>Once you have stacks of ammunition, you can update their counts or delete a whole stack from this main page. If you use the 'Add New Stack' page, and all the details there match a stack you already have, you will be asked if you want to create a new stack with those details, or update the existing stack. This will allow you to have different notes on stacks of ammunition that are otherwise the same.</p>
                        <p>If the caliber or brand you are looking for doesn't appear in the dropdown lists, please hop over to the suggestions page (forthcoming) and let us know! An admin will try to review your suggestion quickly and get it added to the database.</p>
                        </Card.Body>
                    </Card>
                }
            {
                //map all the calibers in the db and create an array of stacks using that caliber
                this.props.calibers.map(c => {
                    let currentStack = this.props.stacks.filter(stack => stack.caliberId === c.id)
                    let type = c.caliber
                    //call the function because map method is picky
                    //can I put an if-else based on a state element that calls a different sort?
                    return this.StackLoop(currentStack, type)
                })
            }
            </div>
        )
    }
};

export default withRouter(StorageCloset);