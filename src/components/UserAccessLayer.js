import React, { Component } from "react"
import APIManager from "../modules/APIManager";

import NavBar from "./nav/nav"
import ApplicationView from "./ApplicationViews";

export default class UserAccessLayer extends Component {
    //set default local state
    state = {
        activeUser: {}
    }

    //store the logged in user's id in a variable
    activeUserId = () => parseInt(sessionStorage.getItem("credentials"))

    componentDidMount() {
        //get that user's whole object and put it in local state
        APIManager.getOne(this.activeUserId(), "users")
            .then(activeUser =>
                this.setState({ activeUser: activeUser })
            )
    }

    render() {
        return (
            <React.Fragment>
                <NavBar setAuth={this.props.setAuth} activeUser={this.state.activeUser} />
                
                <ApplicationView activeUserId={this.activeUserId} activeUser={this.state.activeUser} />
            </React.Fragment>
        )
    }
}