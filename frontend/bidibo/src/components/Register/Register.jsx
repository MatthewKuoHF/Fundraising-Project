import React from "react";
import Joi from "joi-browser";
import Form from "../common/form";
import crypto from "crypto";
import { withRouter } from "react-router-dom";

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
        console.log("Submitted");
        const data = { ...this.state.data };
        //let hash = crypto.getHashes();
        let hashPwd = crypto
            .createHash("sha1")
            .update(data["password"])
            .digest("hex");
        data["password"] = hashPwd;
        this.setState({ data });
        //this.props.history.push("/");
    };
    render() {
        return (
            <div>
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
