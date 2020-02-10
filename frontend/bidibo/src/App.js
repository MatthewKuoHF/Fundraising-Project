import { Route, Switch, Redirect } from "react-router-dom";
import React from "react";

import NavbarComponent from "./components/Navbar/Navbar";
import Login from "./components/Login/Login";
import Main from "./components/Main/Main";
import Register from "./components/Register/Register";

import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
//import logo from './logo.svg';
import Project from "./components/Project/Project";
import Search from "./components/Search/Search";
import http from "./services/httpService";
import config from "./config.json";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            firstName: "",
            lastName: "",
            school: "",
            isLoggedIn:
                localStorage.getItem("isLoggedIn") === "true" ? true : false,
            projects: [],
            filter: []
        };
        this.updateState = this.updateState.bind(this);
    }
    componentDidMount() {}
    updateState(name, value) {
        this.setState({
            [name]: value
        });
        if (name === "isLoggedIn") localStorage.setItem("isLoggedIn", value);
    }

    render() {
        return (
            <div>
                <div
                    style={{
                        position: "fixed",
                        top: "0",
                        width: "100%",
                        zIndex: "999"
                    }}
                >
                    <NavbarComponent
                        isLoggedIn={this.state.isLoggedIn}
                        stateHandler={this.updateState}
                        email={this.state.email}
                        categories={this.state.categories}
                    />
                </div>
                <div style={{ height: "4rem" }}></div>
                {this.state.firstName ? "Hi! " + this.state.firstName : ""}
                <div className="content">
                    <Switch>
                        <Redirect from="/home" to="/" />
                        <Route
                            path="/project/:id"
                            render={props => (
                                <Project
                                    isLoggedIn={this.state.isLoggedIn}
                                    stateHandler={this.updateState}
                                    projects={this.state.projects}
                                    {...props}
                                />
                            )}
                        />
                        <Route
                            path="/category"
                            render={() => {
                                return <h1>Welcome Category</h1>;
                            }}
                        />
                        <Route path="/login">
                            <Login
                                isLoggedIn={this.state.isLoggedIn}
                                stateHandler={this.updateState}
                            />
                        </Route>
                        <Route path="/register">
                            <Register
                                isLoggedIn={this.state.isLoggedIn}
                                stateHandler={this.updateState}
                                props={this.props}
                            />
                        </Route>
                        <Route
                            path="/"
                            render={() => (
                                <div>
                                    <div
                                        style={{
                                            width: "13%",
                                            float: "left"
                                        }}
                                    >
                                        <Search
                                            categories={this.state.categories}
                                        />
                                    </div>
                                    <div
                                        style={{ float: "right", width: "87%" }}
                                    >
                                        <Main
                                            isLoggedIn={this.state.isLoggedIn}
                                            stateHandler={this.updateState}
                                        />
                                    </div>
                                </div>
                            )}
                        />
                    </Switch>
                </div>
                <div style={{ height: "3rem" }}></div>
                <footer
                    style={{
                        position: "fixed",
                        width: "100%",
                        bottom: "0",
                        marginBottom: "0px",
                        background: "blue"
                    }}
                >
                    <h3 style={{ color: "white" }}>Footer</h3>
                </footer>
            </div>
        );
    }
}

export default App;
