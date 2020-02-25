import React, { Component } from "react";
import { Button, Form, Col, Row, InputGroup } from "react-bootstrap";
import "./Invest.css";

class Invest extends Component {
    state = {
        id: this.props.match.params.id,
        project: {}
    };
    componentDidMount() {
        this.setState({
            project: this.props.projects.find(e => e.id === this.state.id)
        });
    }
    handleClick = () => {
        this.props.history.push("/project/" + this.state.id);
    };
    render() {
        return (
            <div className="invest">
                <Button
                    variant="secondary"
                    id="prev"
                    onClick={this.handleClick}
                >
                    <i className="fa fa-arrow-left" aria-hidden="true"></i>
                </Button>
                <Form>
                    <Form.Group as={Row}>
                        <Form.Label column sm={2} className="pdt0">
                            Project to Invest:
                        </Form.Label>
                        <Form.Label column sm={10} className="pdt0">
                            {this.state.project === undefined
                                ? ""
                                : this.state.project.title}
                        </Form.Label>
                    </Form.Group>
                    <Form.Group as={Row}>
                        <Form.Label column sm={2} className="pdt0">
                            Amount to Invest:
                        </Form.Label>
                        <Col sm={4}>
                            <InputGroup>
                                <InputGroup.Prepend>
                                    <InputGroup.Text>$</InputGroup.Text>
                                </InputGroup.Prepend>
                                <Form.Control type="number"></Form.Control>
                            </InputGroup>
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row}>
                        <Form.Label column sm={2} className="pdt0">
                            First Name:
                        </Form.Label>
                        <Col sm={4}>
                            <Form.Control
                                type="text"
                                placeholder="First Name"
                            ></Form.Control>
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row}>
                        <Form.Label column sm={2} className="pdt0">
                            Last Name:
                        </Form.Label>
                        <Col sm={4}>
                            <Form.Control
                                type="text"
                                placeholder="Last Name"
                            ></Form.Control>
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row}>
                        <Form.Label column sm={2} className="pdt0">
                            Phone Number:
                        </Form.Label>
                        <Col sm={4}>
                            <Form.Control
                                type="tel"
                                placeholder="Phone Number"
                            ></Form.Control>
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row}>
                        <Form.Label column sm={2} className="pdt0">
                            Email:
                        </Form.Label>
                        <Col sm={4}>
                            <Form.Control
                                type="email"
                                placeholder="Email"
                            ></Form.Control>
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row}>
                        <Form.Label column sm={2}>
                            Address
                        </Form.Label>
                        <Col sm={4}>
                            <Form.Control placeholder="1234 Main St" />
                        </Col>
                    </Form.Group>
                    <Form.Row>
                        <Form.Group as={Col} controlId="formGridCity">
                            <Form.Label>City</Form.Label>
                            <Form.Control />
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridState">
                            <Form.Label>State</Form.Label>
                            <Form.Control />
                        </Form.Group>
                        <Form.Group as={Col} controlId="formGridZip">
                            <Form.Label>Zip</Form.Label>
                            <Form.Control />
                        </Form.Group>
                    </Form.Row>
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
            </div>
        );
    }
}

export default Invest;
