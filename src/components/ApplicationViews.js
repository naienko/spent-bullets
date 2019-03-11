import React, { Component } from "react";
import { Route } from "react-router-dom";

import AuthRoute from "./auth/AuthRoute";
import Login from "./auth/Login";

import StorageCloset from "./StorageCloset";
import APIManager from "../modules/APIManager";

export default class ApplicationView extends Component {
    //empty state to start with, while initial components render
    state = {
        users: [],
        calibers: [],
        brands: [],
        stacks: [],
        brandCalibers: []
    };

    componentDidMount() {
        const newState = {};
        //fetch the data here
        APIManager.getAll("users")
            .then(users => newState.users = users)
            .then(() => APIManager.getAll("stacks"))
            .then(stacks => newState.stacks = stacks)
            
            .then(() => APIManager.getAll("calibers"))
            .then(calibers => newState.calibers = calibers)
            
            .then(() => APIManager.getAll("brands"))
            .then(brands => newState.brands = brands)

            .then(() => APIManager.getAll("brandCalibers"))
            .then(brandCalibers => newState.brandCalibers = brandCalibers)
        //then fill state
            .then(() => this.setState(newState))
            .then(() => console.log("State is:", this.state))
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
                <Route exact path="/" render={(props) => {
                    return <StorageCloset {...props} 
                        users={this.state.users} 
                        stacks={this.state.stacks} 
                        brands={this.state.brands} 
                        calibers={this.state.calibers}
                        brandCalibers={this.state.brandCalibers} />
                }} />

                {/*     
                <AuthRoute path="/" Destination={StorageCloset} /*some props here />
                <AuthRoute path="/stack/new" Destination={StackForm} addStack={this.addStack} />
    
                <AuthRoute path="/stack/:stackId(\d+)/update" Destination={StackUpdate} updateStack={this.updateStack} /> */}
            </React.Fragment>
        )
    };
};