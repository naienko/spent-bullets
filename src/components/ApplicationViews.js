import React, { Component } from "react";
import { Route } from "react-router-dom";

import Login from "./auth/Login";
import Register from "./auth/Register";

import StorageCloset from "./StorageCloset";
import APIManager from "../modules/APIManager";

import StackForm from "./stack/StackForm";
import StackUpdate from "./stack/StackUpdateForm";

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

            .then(() => APIManager.getQuery(`userId=${this.props.activeUserId()}&_expand=brandCaliber`,"stacks"))
            .then(stacks => newState.stacks = stacks)
            
            .then(() => APIManager.getAll("calibers"))
            .then(calibers => newState.calibers = calibers)
            
            .then(() => APIManager.getAll("brands"))
            .then(brands => newState.brands = brands)

            .then(() => APIManager.getQuery("_expand=brand&_expand=caliber","brandCalibers"))
            .then(brandCalibers => newState.brandCalibers = brandCalibers)
        //then fill state
            .then(() => this.setState(newState))
            .then(() => console.log("State is:", this.state))
        //re-rendering will happen
    };

    //add/edit/delete functions go here, to be sent as props to appropriate routes
    addStack = newStack => {
        return APIManager.add("stacks", newStack)
            .then(() => APIManager.getQuery(`userId=${this.props.activeUserId()}&_expand=brandCaliber`,"stacks"))
            .then(stacks => this.setState({ stacks: stacks }))
    }
    addBCLink = newLink => {
        let newId = null;
        return APIManager.add("brandCalibers", newLink)
            .then((newLink) => {
                newId = newLink.id;
                return APIManager.getQuery("_expand=brand&_expand=caliber","brandCalibers")
            })
            .then(res => {
                this.setState({ brandCalibers: res }) 
                return newId;
        })
    }

    deleteStack = id => {
        return APIManager.delete(id, "stacks")
            .then(() => APIManager.getQuery(`userId=${this.props.activeUserId()}&_expand=brandCaliber`,"stacks"))
            .then(stacks => this.setState({ stacks: stacks }))
    }

    updateStack = updatedStack => {
        return APIManager.update("stacks", updatedStack, updatedStack.id)
            .then(() => APIManager.getQuery(`userId=${this.props.activeUserId()}&_expand=brandCaliber`,"stacks"))
            .then(stacks => this.setState({ stacks: stacks }))
    }

    render() {
        return (
            //routes go here
            // maybe a route to look at an individual stack? why?
            <React.Fragment>
                <Route path="/login" component={Login} />
                
                <Route path="/register" component={Register} />

                <Route exact path="/" render={(props) => {
                    return <StorageCloset
                        users={this.state.users} 
                        stacks={this.state.stacks} 
                        brands={this.state.brands} 
                        calibers={this.state.calibers}
                        brandCalibers={this.state.brandCalibers}
                        deleteStack={this.deleteStack}
                     />
                }} />
     
                <Route path="/stack/new" render={(props) => {
                    return <StackForm 
                        stacks={this.state.stacks} 
                        brands={this.state.brands} 
                        calibers={this.state.calibers}
                        brandCalibers={this.state.brandCalibers}
                        addStack={this.addStack} 
                        updateStack={this.updateStack} 
                        addBCLink={this.addBCLink} 
                    />
                }} />

                <Route path="/stack/:stackId(\d+)/update" render={(props) => {
                    return <StackUpdate
                        brands={this.state.brands} 
                        calibers={this.state.calibers}
                        brandCalibers={this.state.brandCalibers}
                        updateStack={this.updateStack}
                    />
                }} />

            </React.Fragment>
        )
    };
};