import React, { Component } from "react";

import { withRouter } from "react-router";

import "./StorageCloset.css"
import CaliberGroup from "./stack/CaliberGroup";

class StorageCloset extends Component {
    render () {
        let teststack = this.props.stacks.filter(stack => stack.brandCaliber.caliberId === 4)
        console.log(teststack);
        return (
            <div id="dashboard" className="d-flex flex-row">
            
                <CaliberGroup stacks={this.props.stacks.filter(stack => stack.brandCaliber.caliberId === 4)}
                    brands={this.props.brands} 
                    calibers={this.props.calibers} />

            </div>
        )
    }
};

export default withRouter(StorageCloset);