import React, { Component } from "react"
import { withRouter } from "react-router";
import UserAccessLayer from "../UserAccessLayer"
import Login from "./Login"
import Register from "./Register";

class IsAuth extends Component {
    render() {
        return (
            <React.Fragment>
                { /* if isAuthenticated is true (passed in from SpentBullets), jump through UserAccessLayer */ }
                { this.props.isAuthenticated()
                    ? 
                    ( <UserAccessLayer {...this.props} /> )
                    :
                    ( this.props.location.pathname === "/register"
                        ? 
                        ( <Register {...this.props} /> )
                        :
                        ( <Login {...this.props} /> )
                    )
                }
            </React.Fragment>
        )
    }
};

export default withRouter(IsAuth)