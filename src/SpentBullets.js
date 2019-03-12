import React, { Component } from "react";
import IsAuth from "./components/auth/IsAuth";

export default class SpentBullets extends Component {
    // a function that return true if the session Storage object contains the key credentials and false if it does not.
    isAuthenticated = () => sessionStorage.getItem("credentials") !== null || localStorage.getItem("credentials") !== null

    //set default local state
    state = {
        authTrigger: this.isAuthenticated()
    }

    // a function that can be passed down to a component to trigger a render.
    setAuth = () => {
        //when state is changed re-rendering happens
        this.setState({ authTrigger: this.isAuthenticated() })
    }

    render() {
        console.log("props are:", this.props)
        return (
            <React.Fragment>
                <IsAuth isAuthenticated={this.isAuthenticated} setAuth={this.setAuth} />
            </React.Fragment>
        )
    }
}