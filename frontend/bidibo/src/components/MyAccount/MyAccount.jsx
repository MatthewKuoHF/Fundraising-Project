import React, { Component } from "react";
import "./MyAccount.css";
import Form from "../common/form";
import Joi from "joi-browser";
import http from "../../services/httpService";
import config from "../../config.json";
import crypto from "crypto";
import { withRouter } from "react-router-dom";

class MyAccount extends Form {
    state = {
        data: {
            email: localStorage.getItem("email"),
            password: localStorage.getItem("password"),
            firstName: localStorage.getItem("firstName"),
            lastName: localStorage.getItem("lastName"),
            school: localStorage.getItem("school")
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
        http.put(config.apiUrl + "/update/" + localStorage.getItem("uid"), data)
            .then(response => {
                const { email, firstName, lastName, school } = data;
                this.props.stateHandler("email", email);
                this.props.stateHandler("firstName", firstName);
                this.props.stateHandler("lastName", lastName);
                this.props.stateHandler("school", school);
                localStorage.setItem("email", email);
                localStorage.setItem("firstName", firstName);
                localStorage.setItem("lastName", lastName);
                localStorage.setItem("school", school);
                this.props.history.push("/");
            })
            .catch(ex => {
                console.log(ex);
                alert("Wrong Email or Password!");
            });
    };
    render() {
        return (
            <div className="registerBlock">
                <h1>My Account</h1>
                <form onSubmit={this.handleSubmit}>
                    <p style={{ marginBottom: "0px" }}>Email:</p>
                    <h5 style={{ marginTop: "0px" }}>
                        {this.state.data.email}
                    </h5>
                    {this.renderInput("password", "Password: ", "password")}
                    {this.renderInput("firstName", "First Name: ")}
                    {this.renderInput("lastName", "Last Name: ")}
                    {this.renderSelect(
                        "school",
                        "School: ",
                        this.state.schoolList
                    )}
                    {this.renderButton("Update")}
                </form>
            </div>
        );
    }
}

export default withRouter(MyAccount);
