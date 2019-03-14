import React, { Component } from "react";
import Card from "react-bootstrap/Card";
import CardDeck from "react-bootstrap/CardDeck";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import { withRouter } from "react-router";

import "./StorageCloset.css"

class StorageCloset extends Component {
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
                            <br />
                            { !stack.notes.length ? <br /> : `notes: ${stack.notes}` }
                        </Card.Text>
                        <ButtonGroup>
                            <Button variant="success" onClick={() => { this.props.history.push(`/stack/${stack.id}/update`); }}>Update</Button>
                            <Button variant="danger" onClick={() => window.confirm("Are you sure you want to delete this stack?") && 
                                this.props.deleteStack(stack.id)
                                    .then(() => this.props.history.push("/"))}>Remove</Button>
                        </ButtonGroup>
                    </Card.Body>
                </Card>
            )}
            </CardDeck>
            </div>
        )
    }
};

export default withRouter(StorageCloset);