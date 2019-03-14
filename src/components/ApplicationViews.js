import React, { Component } from "react";
import { Route } from "react-router-dom";

import Login from "./auth/Login";
import Register from "./auth/Register";

import StorageCloset from "./StorageCloset";
import APIManager from "../modules/APIManager";
import StackManager from "../modules/StackManager";

import StackForm from "./stack/StackForm";
import StackUpdate from "./stack/StackUpdateForm";
import NewType from "./admin/NewType";
import Profile from "./user/profile";
import UserRoles from "./admin/UserRoles";

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

            .then(() => StackManager.getUserStacks())
            .then(stacks => newState.stacks = stacks)
            
            .then(() => APIManager.getAll("calibers"))
            .then(calibers => newState.calibers = calibers)
            
            .then(() => APIManager.getAll("brands"))
            .then(brands => newState.brands = brands)

            .then(() => APIManager.getQuery("_expand=brand&_expand=caliber&_sort=caliberId&_order=asc","brandCalibers"))
            .then(brandCalibers => newState.brandCalibers = brandCalibers)
        //then fill state
            .then(() => this.setState(newState))
            .then(() => console.log("State is:", this.state))
        //re-rendering will happen
    };

    //add/edit/delete functions go here, to be sent as props to appropriate routes
    addStack = newStack => {
        return APIManager.add("stacks", newStack)
            .then(() => StackManager.getUserStacks())
            .then(stacks => this.setState({ stacks: stacks }))
    }
    addBCLink = newLink => {
        let newId = null;
        return APIManager.add("brandCalibers", newLink)
            .then((newLink) => {
                newId = newLink.id;
                return APIManager.getQuery("_expand=brand&_expand=caliber&_sort=caliberId&_order=asc","brandCalibers")
            })
            .then(res => {
                this.setState({ brandCalibers: res }) 
                return newId;
        })
    }

    deleteStack = id => {
        return APIManager.delete(id, "stacks")
            .then(() => StackManager.getUserStacks())
            .then(stacks => this.setState({ stacks: stacks }))
    }

    updateStack = updatedStack => {
        return APIManager.update("stacks", updatedStack, updatedStack.id)
            .then(() => StackManager.getUserStacks())
            .then(stacks => this.setState({ stacks: stacks }))
    }

    updateUser = updatedUser => {
        return APIManager.update("users", updatedUser, updatedUser.id)
            .then(() => StackManager.getAll("users"))
            .then(users => this.setState({ users: users }))
    }

    render() {
        return (
            //routes go here
            <React.Fragment>
                <Route exact path="/login" component={Login} />
                
                <Route exact path="/register" component={Register} />

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

                <Route exact path="/admin/new" render={(props) => {
                    return <NewType 
                        brands={this.state.brands} 
                        calibers={this.state.calibers}
                        brandCalibers={this.state.brandCalibers}
                        addBCLink={this.addBCLink} 
                    />
                }} />

                <Route exact path="/profile" render={(props) => {
                    return <Profile activeUser={this.props.activeUser} 
                        updateUser={this.updateUser}
                    />
                }} />

                <Route exact path="/admin/roles" render={(props) => {
                    return <UserRoles users={this.state.users} />
                }} />

            </React.Fragment>
        )
    };
};