import React, { Component } from "react";
import http from "../../services/httpService";
import config from "../../config.json";
import { Button, FormGroup, FormControl } from "react-bootstrap";
import { withRouter, Link } from "react-router-dom";
import crypto from "crypto";
import "./Login.css";

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: ""
        };
        this.validateForm = this.validateForm.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    validateForm(email, password) {
        return email.length > 0 && password.length > 0;
    }

    handleSubmit(e) {
        e.preventDefault();
        //let hash = crypto.getHashes();
        let hashPwd = crypto
            .createHash("sha1")
            .update(this.state.password[0])
            .digest("hex");

        http.post(config.apiUrl + "/login", {
            email: this.state.email,
            password: hashPwd
        })
            .then(response => {
                const { email, firstName, lastName, school } = response.data;
                this.props.stateHandler("isLoggedIn", true);
                this.props.stateHandler("email", email);
                this.props.stateHandler("firstName", firstName);
                this.props.stateHandler("lastName", lastName);
                this.props.stateHandler("school", school);
                localStorage.setItem("isLoggedIn", true);
                localStorage.setItem("email", email);
                localStorage.setItem("firstName", firstName);
                localStorage.setItem("lastName", lastName);
                localStorage.setItem("school", school);
                this.props.history.push("/");
            })
            .catch(ex => {
                alert("Wrong Email or Password!");
            });
    }

    handleChange(target) {
        this.setState({
            [target.type]: [target.value]
        });
    }

    render() {
        return (
            <div className="Login">
                <form>
                    <FormGroup controlId="email">
                        <label htmlFor="email">Email: </label>
                        <FormControl
                            autoFocus
                            type="email"
                            value={this.state.email}
                            onChange={e => this.handleChange(e.target)}
                            className="inputClass"
                        />
                    </FormGroup>
                    <br />
                    <FormGroup controlId="password">
                        <label htmlFor="password">Password: </label>
                        <FormControl
                            type="password"
                            value={this.state.password}
                            onChange={e => this.handleChange(e.target)}
                            className="inputClass"
                        />
                    </FormGroup>
                    <br />
                    <div className="register">
                        <Button
                            className="submit"
                            block
                            disabled={
                                !this.validateForm(
                                    this.state.email,
                                    this.state.password
                                )
                            }
                            type="submit"
                            onClick={e => this.handleSubmit(e)}
                        >
                            Login
                        </Button>
                        <Link className="register" to="/register">
                            Register
                        </Link>
                    </div>
                </form>
                <h1>Login: {this.props.isLoggedIn ? "True" : "False"}</h1>
            </div>
        );
    }
}

export default withRouter(Login);
