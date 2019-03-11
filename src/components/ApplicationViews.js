import React, { Component } from "react";
import { Route } from "react-router-dom";

export default class ApplicationView extends Component {
    //empty state to start with, while initial components render
    state = {
        users: [],
        calibers: [],
        brands: [],
        stacks: [],
        brandsCalibers: []
    }

    componentDidMount() {
        // fetch the data here
        // then fill state
        //re-rendering will happen
    }

    //add/edit/delete functions go here, to be sent as props to appropriate routes

    render() {
        return (
            //routes go here
            // maybe a route to look at an individual stack? why?
            <React.Fragment>
                <Route exact path="/" render={(props) => {
                    return <StorageCloset />
                }} />
    
                <Route exact path="/stack/new" render={(props) => {
                    return <StackForm addStack={this.addStack} />
                }} />
    
                <Route exact path="/stack/:stackId(\d+)/update" render={(props) => {
                    return <StackUpdate updateStack={this.updateStack} />
                }} />
            </React.Fragment>
        )
    }
}