import React, { Component } from "react";
import CardDeck from "react-bootstrap/CardDeck";
import { withRouter } from "react-router";

import "./StorageCloset.css"
import CaliberGroup from "./stack/CaliberGroup";

class StorageCloset extends Component {
    
    render () {
        let teststack = this.props.stacks.filter(stack => stack.brandCaliber.caliberId === 4)
        //this.props.stacks.map(stack => console.log(stack.brandCaliber))
        console.log(teststack);
        return (
            <div id="dashboard" className="d-flex flex-row">
            { /* data goes here  */ }
            <CardDeck>
                <CaliberGroup {...this.props} stack={teststack} brands={this.props.brands} calibers={this.props.calibers} />
                
            </CardDeck>
            </div>
        )
    }
};

export default withRouter(StorageCloset);