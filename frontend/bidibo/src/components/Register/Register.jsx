import React from "react";
import Joi from "joi-browser";
import Form from "../common/form";
import crypto from "crypto";
import http from "../../services/httpService";
import { withRouter } from "react-router-dom";
import config from "../../config.json";
import "./Register.css";

class Register extends Form {
    state = {
        data: {
            email: "",
            password: "",
            firstName: "",
            lastName: "",
            school: ""
        },
        schoolList: [
            { _id: "GSU", name: "GSU" },
            { _id: "GT", name: "GT" },
            { _id: "UGA", name: "UGA" },
            { _id: "KSU", name: "KSU" }
        ],
        errors: {}
    };
    schema = {
        email: Joi.string()
            .required()
            .email()
            .label("Email"),
        password: Joi.string()
            .required()
            .min(5)
            .label("Password"),
        firstName: Joi.string()
            .required()
            .label("First Name"),
        lastName: Joi.string()
            .required()
            .label("Last Name"),
        school: Joi.string().required()
    };
    doSubmit = () => {
        const data = { ...this.state.data };
        let hashPwd = crypto
            .createHash("sha1")
            .update(data["password"])
            .digest("hex");
        data["password"] = hashPwd;
        this.setState({ data });
        http.post(config.apiUrl + "/register", data)
            .then(response => {
                const { email, firstName, lastName, school } = response.data;
                this.props.stateHandler("isLoggedIn", true);
                this.props.stateHandler("email", email);
                this.props.stateHandler("firstName", firstName);
                this.props.stateHandler("lastName", lastName);
                this.props.stateHandler("school", school);
                this.props.history.push("/");
            })
            .catch(ex => {
                alert("Wrong Email or Password!");
            });
    };
    render() {
        return (
            <div className="registerBlock">
                <h1>Register</h1>
                <form onSubmit={this.handleSubmit}>
                    {this.renderInput("email", "Email: ")}
                    {this.renderInput("password", "Password: ", "password")}
                    {this.renderInput("firstName", "First Name: ")}
                    {this.renderInput("lastName", "Last Name: ")}
                    {this.renderSelect(
                        "school",
                        "School: ",
                        this.state.schoolList
                    )}
                    {this.renderButton("Register")}
                </form>
            </div>
        );
    }
}

export default withRouter(Register);
