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
import ViewRequests from "./admin/ViewRequests";

export default class ApplicationView extends Component {
    //empty state to start with, while initial components render
    state = {
        users: [],
        calibers: [],
        brands: [],
        stacks: [],
        requests: []
    };

    componentDidMount() {
        const newState = {};
        //fetch the data here
        APIManager.getAll("users")
            .then(users => newState.users = users)

            .then(() => StackManager.getUserStacks())
            .then(stacks => newState.stacks = stacks)
            
            .then(() => APIManager.getQuery("orderBy=caliber", "calibers"))
            .then(calibers => newState.calibers = calibers)
            
            .then(() => APIManager.getQuery("orderBy=brand", "brands"))
            .then(brands => newState.brands = brands)

            .then(() => APIManager.getAll("requests"))
            .then(requests => newState.requests = requests)

        //then fill state
            .then(() => this.setState(newState))
        //re-rendering will happen
    };

    //add/edit/delete functions go here, to be sent as props to appropriate routes
    addStack = newStack => {
        return APIManager.add("stacks", newStack)
            .then(() => StackManager.getUserStacks())
            .then(stacks => this.setState({ stacks: stacks }))
    }

    deleteStack = id => {
        return APIManager.delete(id, "stacks")
            .then(() => StackManager.getUserStacks())
            .then(stacks => this.setState({ stacks: stacks }))
    }

    updateStack = updatedStack => {
        return APIManager.edit("stacks", updatedStack, updatedStack.id)
            .then(() => StackManager.getUserStacks())
            .then(stacks => this.setState({ stacks: stacks }))
    }

    updateUser = updatedUser => {
        return APIManager.edit("users", updatedUser, updatedUser.id)
            .then(() => StackManager.getAll("users"))
            .then(users => this.setState({ users: users }))
    }

    addRequest = newRequest => {
        return APIManager.add("requests", newRequest)
            .then(() => APIManager.getAll("requests"))
            .then(requests => this.setState({ requests: requests }))
    }

    addBrand = newBrand => {
        return APIManager.add("brands", newBrand)
            .then(() => APIManager.getQuery("orderBy=brand", "brands"))
            .then(brands => this.setState({ brands: brands }))
    }
    addCaliber = newCaliber => {
        return APIManager.add("calibers", newCaliber)
            .then(() => APIManager.getQuery("orderBy=caliber", "calibers"))
            .then(calibers => this.setState({ calibers: calibers }))
    }
    deleteRequest = id => {
        return APIManager.delete(id, "requests")
            .then(() => APIManager.getAll("requests"))
            .then(requests => this.setState({ requests: requests }))
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
                        deleteStack={this.deleteStack}
                     />
                }} />
     
                <Route path="/stack/new" render={(props) => {
                    return <StackForm 
                        stacks={this.state.stacks} 
                        brands={this.state.brands} 
                        calibers={this.state.calibers}
                        addStack={this.addStack} 
                        updateStack={this.updateStack} 
                        />
                    }} />

                <Route path="/stack/:stackId(\d+)/update" render={(props) => {
                    return <StackUpdate
                        brands={this.state.brands} 
                        calibers={this.state.calibers}
                        deleteStack={this.deleteStack}
                        updateStack={this.updateStack}
                    />
                }} />

                <Route exact path="/admin/request" render={(props) => {
                    return <NewType 
                        addRequest={this.addRequest}
                    />
                }} />

                <Route exact path="/admin/requestlist" render={(props) => {
                    return <ViewRequests 
                        requests={this.state.requests}
                        addBrand={this.addBrand}
                        addCaliber={this.addCaliber}
                        deleteRequest={this.deleteRequest}
                    />
                }} />

                <Route exact path="/profile" render={(props) => {
                    return <Profile activeUser={this.props.activeUser} 
                        updateUser={this.updateUser}
                    />
                }} />

                <Route exact path="/admin/roles" render={(props) => {
                    return <UserRoles users={this.state.users} 
                        activeUser={this.props.activeUser} 
                        updateUser={this.updateUser}
                    />
                }} />

            </React.Fragment>
        )
    };
};