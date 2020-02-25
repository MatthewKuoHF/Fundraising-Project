import React, { Component } from "react";
import { Button, Form, Col, Row, InputGroup } from "react-bootstrap";
import Cards from "react-credit-cards";
import "./Invest.css";
import "react-credit-cards/es/styles-compiled.css";
import http from "../../services/httpService";
import config from "../../config.json";

class Invest extends Component {
    state = {
        id: this.props.match.params.id,
        project: {},
        cvc: "",
        expiry: "",
        address: "",
        city: "",
        state: "",
        zip: "",
        name:
            localStorage.getItem("firstName") +
            " " +
            localStorage.getItem("lastName"),
        firstName: localStorage.getItem("firstName"),
        lastName: localStorage.getItem("lastName"),
        number: "",
        phoneNumber: "",
        investAmount: this.props.investAmount,
        email: localStorage.getItem("email")
    };
    handleInputFocus = e => {
        this.setState({ focus: e.target.name });
    };
    handleInputChange = e => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    };
    handleSubmit = e => {
        e.preventDefault();
        const userEmail = localStorage.getItem("email");
        const uid = localStorage.getItem("uid");
        var MyDate = new Date();
        var timestamp;
        timestamp =
            MyDate.getFullYear() +
            ("0" + (MyDate.getMonth() + 1)).slice(-2) +
            ("0" + MyDate.getDate()).slice(-2) +
            ("0" + MyDate.getHours()).slice(-2) +
            ("0" + MyDate.getMinutes()).slice(-2) +
            ("0" + MyDate.getSeconds()).slice(-2);
        const investment = {
            timestamp: timestamp,
            uid: uid,
            userEmail: userEmail,
            investAmount: this.state.investAmount,
            investProject: this.state.id
        };
        http.post(config.apiUrl + "/invest", investment).then(res => {
            console.log(res);
        });
        this.props.history.push("/");
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
                                <Form.Control
                                    type="number"
                                    name="investAmount"
                                    value={this.state.investAmount}
                                    onChange={this.handleInputChange}
                                ></Form.Control>
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
                                name="firstName"
                                value={this.state.firstName}
                                onChange={this.handleInputChange}
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
                                name="lastName"
                                value={this.state.lastName}
                                onChange={this.handleInputChange}
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
                                name="phoneNumber"
                                value={this.state.phoneNumber}
                                onChange={this.handleInputChange}
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
                                name="email"
                                value={this.state.email}
                                onChange={this.handleInputChange}
                            ></Form.Control>
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row}>
                        <Form.Label column sm={2}>
                            Address
                        </Form.Label>
                        <Col sm={4}>
                            <Form.Control
                                type="email"
                                name="address"
                                value={this.state.address}
                                onChange={this.handleInputChange}
                            />
                        </Col>
                    </Form.Group>
                    <Form.Row>
                        <Form.Group as={Col}>
                            <Form.Label>City</Form.Label>
                            <Form.Control
                                type="text"
                                name="city"
                                value={this.state.city}
                                onChange={this.handleInputChange}
                            />
                        </Form.Group>

                        <Form.Group as={Col}>
                            <Form.Label>State</Form.Label>
                            <Form.Control
                                type="text"
                                name="state"
                                value={this.state.state}
                                onChange={this.handleInputChange}
                            />
                        </Form.Group>
                        <Form.Group as={Col}>
                            <Form.Label>Zip</Form.Label>
                            <Form.Control
                                type="number"
                                name="zip"
                                value={this.state.zip}
                                onChange={this.handleInputChange}
                            />
                        </Form.Group>
                    </Form.Row>
                    <Form.Row>
                        <div id="PaymentForm">
                            <div className="cardAnimation">
                                <Cards
                                    cvc={this.state.cvc}
                                    expiry={this.state.expiry}
                                    name={this.state.name}
                                    number={this.state.number}
                                />
                            </div>
                            <div className="inputArea">
                                <Form.Row>
                                    <Form.Label column sm={3}>
                                        Card Number:
                                    </Form.Label>
                                    <Col sm={7}>
                                        <Form.Control
                                            id="cardNumber"
                                            className="inputLine"
                                            type="number"
                                            name="number"
                                            placeholder="Card Number"
                                            onChange={this.handleInputChange}
                                            onFocus={this.handleInputFocus}
                                        />
                                    </Col>
                                </Form.Row>
                                <Form.Row>
                                    <Form.Label column sm={3}>
                                        Name on Card:
                                    </Form.Label>
                                    <Col sm={7}>
                                        <Form.Control
                                            id="name"
                                            className="inputLine"
                                            name="name"
                                            value={this.state.name}
                                            placeholder="Name on Card"
                                            onChange={this.handleInputChange}
                                            onFocus={this.handleInputFocus}
                                        />
                                    </Col>
                                </Form.Row>
                                <Form.Row>
                                    <Form.Label column sm={2}>
                                        Valid Thru:
                                    </Form.Label>
                                    <Col sm={4}>
                                        <Form.Control
                                            id="validThru"
                                            className="inputLine"
                                            type="number"
                                            name="expiry"
                                            placeholder="Valid Thru"
                                            onChange={this.handleInputChange}
                                            onFocus={this.handleInputFocus}
                                        />
                                    </Col>
                                    <Col sm={1}></Col>
                                    <Form.Label column sm={1}>
                                        CVC:
                                    </Form.Label>
                                    <Col sm={2}>
                                        <Form.Control
                                            id="validThru"
                                            className="inputLine"
                                            name="cvc"
                                            type="number"
                                            placeholder="CVC"
                                            onChange={this.handleInputChange}
                                            onFocus={this.handleInputFocus}
                                        />
                                    </Col>
                                </Form.Row>
                            </div>
                        </div>
                    </Form.Row>
                    <div style={{ width: "100%", textAlign: "center" }}>
                        <Button
                            variant="primary"
                            type="submit"
                            onClick={this.handleSubmit}
                            // disabled={
                            //     this.state.cvc === "" ||
                            //     this.state.expiry === "" ||
                            //     this.state.address === "" ||
                            //     this.state.city === "" ||
                            //     this.state.state === "" ||
                            //     this.state.zip === "" ||
                            //     this.state.name === "" ||
                            //     this.state.firstName === "" ||
                            //     this.state.lastName === "" ||
                            //     this.state.number === "" ||
                            //     this.state.phoneNumber === "" ||
                            //     this.state.investAmount === "" ||
                            //     this.state.email === ""
                            // }
                        >
                            Invest
                        </Button>
                    </div>
                </Form>
            </div>
        );
    }
}

export default Invest;
