import React from "react";
import { Route } from "react-router-dom";
import Login from "./Login";

//check to see if there are auths stored in session or local (ie did they login yet?)
const isAuthenticated = () =>
    localStorage.getItem("credentials") !== null ||
    sessionStorage.getItem("credentials") !== null

//higher order object wrapper around <Route>
// ...srcProps allows passing all the props for the <Destination> along that would normally be on <Route>'s <Component>
const AuthRoute = ({Destination,...srcProps}) => {
    return (
        // note all <Route>'s are exact using this HOC
        <Route exact path={srcProps.path} render={props => {
            if (isAuthenticated()) {
                return <Destination {...props} {...srcProps} />
            } else {
                return <Login {...props} />
            }
        }} />
    )
}

export default AuthRoute;