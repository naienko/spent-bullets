import React, { Component } from "react";
import { withRouter } from "react-router";

import "./StorageCloset.css"
import CaliberGroup from "./stack/CaliberGroup";

class StorageCloset extends Component {
    //map method wants a function call so here's the function
    StackLoop = (currentStack, type) => {
        //this eliminates display of calibers you don't have any of
        if (currentStack.length > 0) {
            return <CaliberGroup stacks={currentStack}
                brands={this.props.brands} 
                calibers={this.props.calibers} type={type} />
        }
    }

    render () {
        return (
            <div id="dashboard" className="">
            {
                //map all the calibers in the db and create an array of stacks using that caliber
                this.props.calibers.map(c => {
                    let currentStack = this.props.stacks.filter(stack => stack.brandCaliber.caliberId === c.id)
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