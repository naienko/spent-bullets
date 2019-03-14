import React, { Component } from "react";
import { withRouter } from "react-router";

import "./StorageCloset.css"
import CaliberGroup from "./stack/CaliberGroup";

class StorageCloset extends Component {

    StackLoop = (currentStack, type) => {
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
                this.props.calibers.map(c => {
                    let currentStack = this.props.stacks.filter(stack => stack.brandCaliber.caliberId === c.id)
                    let type = c.caliber
                    return this.StackLoop(currentStack, type)
                })
            }
            </div>
        )
    }
};

export default withRouter(StorageCloset);