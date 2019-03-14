import React, { Component } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";


class CaliberGroup extends Component {
    render() {
        console.log(this.props)
        return (
            <Card key={this.props.stack.id}>
                <Card.Body className="text-center">
                    <Card.Title>
                        {this.props.stack.amount} <span className="text-muted small">count</span>
                    </Card.Title>
                    {/* <Card.Text>
                        { this.props.brands.find(
                            brand => brand.id === this.props.stack.brandCaliber.brandId
                        ).brand }
                        {" "}
                        { this.props.calibers.find(
                            caliber => caliber.id === this.props.stack.brandCaliber.caliberId
                        ).caliber }
                        <br />
                        { !this.props.stack.notes.length ? <br /> : `notes: ${this.props.stack.notes}` }
                    </Card.Text> */}
                    <ButtonGroup>
                        <Button variant="success" onClick={() => { this.props.history.push(`/stack/${this.props.stack.id}/update`); }}>Update</Button>
                        <Button variant="danger" onClick={() => window.confirm("Are you sure you want to delete this stack?") && this.props.deleteStack(this.props.stack.id)
                            .then(() => this.props.history.push("/"))}>Remove</Button>
                    </ButtonGroup>
                </Card.Body>
            </Card>
        )
    }
};

export default CaliberGroup;