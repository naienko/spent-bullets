import React, { Component } from "react"
import Login from "./Login"
import UserAccessLayer from "../UserAccessLayer"

export default class IsAuth extends Component {
    render() {
        return (
            <React.Fragment>
                { /* if isAuthenticated is true (passed in from SpentBullets), jump through UserAccessLayer */ }
                { this.props.isAuthenticated() ? (
                    <UserAccessLayer {...this.props} />
                ) : (
                   // else jump to Login
                    <Login {...this.props} />
                )}
            </React.Fragment>
        )
    }
}