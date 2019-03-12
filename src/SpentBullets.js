import React, { Component } from "react";
import ApplicationView from "./components/ApplicationViews";
import NavBar from "./components/nav/nav";

export default class SpentBullets extends Component {
    render() {
        return(
            <React.Fragment>
                { sessionStorage.getItem("credentials") ? <NavBar /> : "" }
                <ApplicationView />
            </React.Fragment>
        )
    }
}