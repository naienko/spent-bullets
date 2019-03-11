import React, { Component } from "react";
import Card from "react-bootstrap/Card";
import CardDeck from "react-bootstrap/CardDeck";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";

import "./StorageCloset.css"

export default class StorageCloset extends Component {
    render () {
        return (
        <div id="dashboard" className="d-flex flex-row">
        { /* data goes here  */ }
        <CardDeck>
        { this.props.stacks.map(stack =>     
                <Card key={stack.id}>
                    <Card.Body className="text-center">
                        <Card.Title>
                            {stack.amount} <span className="text-muted small">count</span>
                        </Card.Title>
                        <Card.Text>
                            { this.props.brands.find(
                                brand => brand.id === stack.brandCaliber.brandId
                            ).brand }
                            {" "}
                            { this.props.calibers.find(
                                caliber => caliber.id === stack.brandCaliber.caliberId
                            ).caliber }
                        </Card.Text>
                        <ButtonGroup>
                            <Button variant="success">Update</Button>
                            <Button variant="danger" onClick={() => this.props.deleteStack(stack.id)
                                .then(() => this.props.history.push("/"))}>Remove</Button>
                        </ButtonGroup>
                    </Card.Body>
                </Card>
            )}
            </CardDeck>
            </div>
        )
    }
}