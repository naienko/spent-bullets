import React, { Component } from "react";
import { Route } from "react-router-dom";

import AuthRoute from "./auth/AuthRoute";
import Login from "./auth/Login";

export default class ApplicationView extends Component {
    //empty state to start with, while initial components render
    state = {
        users: [],
        calibers: [],
        brands: [],
        stacks: [],
        brandsCalibers: []
    };

    componentDidMount() {
        //fetch the data here
        //then fill state
        //re-rendering will happen
    };

    //add/edit/delete functions go here, to be sent as props to appropriate routes

    render() {
        return (
            //routes go here
            // maybe a route to look at an individual stack? why?
            //note use of HOC component to make sure all <Route>s are authenticated
            <React.Fragment>
                <Route path="/login" component={Login} />

                <AuthRoute path="/" Destination={StorageCloset} /*some props here */ />
    
                <AuthRoute path="/stack/new" Destination={StackForm} addStack={this.addStack} />
    
                <AuthRoute path="/stack/:stackId(\d+)/update" Destination={StackUpdate} updateStack={this.updateStack} />
            </React.Fragment>
        )
    };
};