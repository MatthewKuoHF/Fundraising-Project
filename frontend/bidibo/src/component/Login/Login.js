import React, { Component } from "react";
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import "./Login.css";
import { withRouter } from 'react-router-dom';

class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: "",
            password: "",
        }
        console.log("Login.js")
        console.log(this.props)
        this.validateForm = this.validateForm.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }

    validateForm(email, password) {
        return email.length > 0 && password.length > 0;
    }

    handleSubmit() {
        //if pass
        this.props.stateHandler("isLoggedIn", true)
        this.props.history.push('/');
    }

    handleChange(target) {
        this.setState({
            [target.type]: [target.value]
        })
    }

    render() {
        return (
            <div className="Login">
                <form>
                    <FormGroup controlId="email">
                        <label>Email: </label>
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
                        <label>Password: </label>
                        <FormControl
                            type="password"
                            value={this.state.password}
                            onChange={e => this.handleChange(e.target)}
                            className="inputClass"
                        />
                    </FormGroup>
                    <br />
                    <Button
                        block
                        disabled={!this.validateForm(this.state.email, this.state.password)}
                        type="submit"
                        onClick={this.handleSubmit}>
                        Login
                    </Button>
                </form>
                <h1>Login: {this.props.isLoggedIn ? "True" : "False"}</h1>
            </div>
        );
    }
}

export default withRouter(Login)