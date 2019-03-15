import React, { Component } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import CardDeck from "react-bootstrap/CardDeck";

import "./stack.css"

class CaliberGroup extends Component {
    render() {
        return (
            <CardDeck>
                <Card><h3 className="text-center pt-sm-5">{this.props.type}</h3></Card>
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
                        <Button variant="danger" onClick={() => window.confirm("Are you sure you want to delete this stack?") && this.props.deleteStack(stack.id)
                        .then(() => this.props.history.push("/"))}>Remove</Button>
                    </ButtonGroup>
                    </Card.Body>
                </Card>
            )}
            </CardDeck>
        )
    }
};
                
export default CaliberGroup;