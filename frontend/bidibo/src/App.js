import { Route, Switch, Redirect } from "react-router-dom";
import React from "react";

import NavbarComponent from "./components/Navbar/Navbar";
import Login from "./components/Login/Login";
import Main from "./components/Main/Main";
import Register from "./components/Register/Register";
import http from "./services/httpService";
import config from "./config.json";

import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
//import logo from './logo.svg';
import Project from "./components/Project/Project";
import Upload from "./components/Upload/Upload";
import Author from "./components/Author/Author";
import MyAccount from "./components/MyAccount/MyAccount";
import LikedProjects from "./components/LikedProjects/LikedProjects";
import InvestmentHistory from "./components/InvestmentHistory/InvestmentHistory";
import Invest from "./components/Invest/Invest";

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
            filter: [],
            investAmount: "",
            uid: "",
            likedProjects: []
        };
        this.updateState = this.updateState.bind(this);
    }
    componentDidMount() {
        this.getLikedProjects();
    }
    getLikedProjects() {
        if (localStorage.getItem("uid") !== "") {
            http.get(config.apiUrl + "/liked/" + localStorage.getItem("uid"))
                .then(response => {
                    const { data } = response;
                    this.setState({ likedProjects: data });
                })
                .catch(ex => {
                    console.log(ex);
                });
        }
    }
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
                    />
                </div>
                <div style={{ height: "4rem" }}></div>
                {this.state.firstName || localStorage.getItem("firstName") ? (
                    <h5>
                        {"Hi! " +
                            (this.state.firstName ||
                                localStorage.getItem("firstName"))}
                    </h5>
                ) : (
                    ""
                )}
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
                                    likedProjects={this.state.likedProjects}
                                    {...props}
                                />
                            )}
                        />
                        <Route
                            path="/author/:id"
                            render={props => <Author {...props} />}
                        />
                        <Route
                            path="/upload"
                            render={props => (
                                <Upload
                                    isLoggedIn={this.state.isLoggedIn}
                                    {...props}
                                />
                            )}
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
                            path="/invest/:id"
                            render={props => (
                                <Invest
                                    stateHandler={this.stateHandler}
                                    investAmount={this.state.investAmount}
                                    email={this.state.email}
                                    projects={this.state.projects}
                                    {...props}
                                />
                            )}
                        />
                        <Route path="/my_account">
                            <MyAccount />
                        </Route>
                        <Route path="/liked_projects">
                            <LikedProjects
                                likedProjects={this.state.likedProjects}
                                stateHandler={this.updateState}
                            />
                        </Route>
                        <Route path="/investment_history">
                            <InvestmentHistory />
                        </Route>
                        <Route
                            path="/"
                            render={() => (
                                <div>
                                    <Main
                                        isLoggedIn={this.state.isLoggedIn}
                                        stateHandler={this.updateState}
                                    />
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
