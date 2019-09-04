import React, { Component } from "react";
import Card from "react-bootstrap/Card";
import CardDeck from "react-bootstrap/CardDeck";
import Button from "react-bootstrap/Button";
import { withRouter } from "react-router";

class ViewRequests extends Component {
    state = {
    };
    
    approveRequest = event => {
        //stop the form doing HTML stuff
        event.preventDefault()
        //construct the object
        let currentRequest = this.props.requests.find(request => parseInt(event.target.id) === request.id)
        
        if (currentRequest.typeId == 1) {
            const newRequest = {
                brand: currentRequest.name
            }
            this.props.addBrand(newRequest)
                .then(() => {this.props.deleteRequest(currentRequest.id)})
                .then(() => {
                    this.props.history.push("/admin/requestlist")
                })
        } else {
            const newRequest = {
                caliber: currentRequest.name
            }
            this.props.addCaliber(newRequest)
            .then(() => {this.props.deleteRequest(currentRequest.id)})
                .then(() => {
                    this.props.history.push("/admin/requestlist")
                })
        }
    }

    render() {
        return (
            <div id="dashboard">
                <CardDeck>
                    { this.props.requests.map(request => 
                        <Card key={request.id}>
                            <Card.Body className="text-center">
                                <Card.Title>
                                    {request.name}
                                </Card.Title>
                                <Card.Text>
                                    submitted by: <a href="${request.user.email}">{request.user.username}</a><br />
                                    type: {request.typeId === 1 ? "brand" : "caliber"}<br />
                                    {request.about}
                                </Card.Text>
                                <Button variant="success" id={request.id} onClick={this.approveRequest}>Approve</Button>
                                <Button variant="danger" id={request.id} onClick={() => window.confirm("Are you sure you want to deny this request?") && this.props.deleteRequest(request.id)
                                    .then(() => this.props.history.push("/admin/requestlist"))}>Deny</Button>
                            </Card.Body>
                        </Card>
                    )}
                </CardDeck>
            </div>
        )
    }
}

export default withRouter(ViewRequests)