import React, { Component } from "react";
import Form from "react-bootstrap/Form";

import APIManager from "../../modules/APIManager";

export default class Register extends Component {

    //empty state to start with, to store input fields in
    state = {
        email: "",
        password: "",
        username: "",
        display_name: ""
    }

    // Update state whenever an input field is edited (Steve's code)
    handleFieldChange = event => {
        const stateToChange = {}
        stateToChange[event.target.id] = event.target.value
        this.setState(stateToChange)
    }

    //event handler for registration (cribbed from Jenna's code)
    handleRegister = event => {
        //stop the form doing HTML stuff
        event.preventDefault()
        //create an object using the data pulled from the form fields
        const newUser = {
            username: this.state.username,
            password: this.state.password,
            email: this.state.email,
            display_name: this.state.display_name
        }
        //compare this object to data from the users table in db
        if (this.state.username && this.state.password) {
            APIManager.getQuery(`username=${this.state.username}`, "users").then(users => {
            //if it exists, warn and refuse
                if (users.length) {
                    alert(`Username ${this.state.username} already exists!`)
                } else {
            //if it doesn't exist, create new user and set sessionStorage
                    APIManager.add("users", newUser).then(user => {
                        sessionStorage.setItem("credentials", parseInt(user.id))
                        this.props.setAuth()
                        })
                }
            })
        } else {
            //if the user didn't fill all fields, warn
            alert("Please Fill Out Form!")
        }
      }


    render() {
        return (
            <div>the form goes here</div>
        )
    }
}