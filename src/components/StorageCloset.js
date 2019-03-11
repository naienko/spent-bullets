import React, { Component } from "react";
import Card from "react-bootstrap/Card";
import CardDeck from "react-bootstrap/CardDeck";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";

// import "./StorageCloset.css"

export default class StorageCloset extends Component {
    render () {
        return (
        <div id="dashboard" className="d-flex flex-row m-sm-3">
        { /* data goes here  */ }
            <CardDeck>
                <Card>
                    <Card.Body className="text-center">
                        <Card.Subtitle>
                            caliber
                        </Card.Subtitle>
                        <Card.Title>
                            amount
                        </Card.Title>
                        <Card.Text>
                            brand
                        </Card.Text>
                        <ButtonGroup>
                            <Button variant="success">Update</Button>
                            <Button variant="danger">Delete</Button>
                        </ButtonGroup>
                    </Card.Body>
                </Card>
            </CardDeck>
            </div>
        )
    }
}