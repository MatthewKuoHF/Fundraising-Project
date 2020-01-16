import { Route, Switch, Redirect } from "react-router-dom";
import React from "react";

import Navbar from "./components/Navbar/Navbar";
import Login from "./components/Login/Login";
import Main from "./components/Main/Main";
import Register from "./components/Register/Register";

import "./App.css";
//import logo from './logo.svg';
import Project from "./components/Project/Project";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            firstName: "",
            lastName: "",
            isLoggedIn:
                localStorage.getItem("isLoggedIn") === "true" ? true : false
        };
        this.updateState = this.updateState.bind(this);
    }
    updateState(name, value) {
        this.setState({
            [name]: value
        });
        localStorage.setItem("isLoggedIn", value);
    }

    render() {
        return (
            <div>
                <Navbar
                    isLoggedIn={this.state.isLoggedIn}
                    stateHandler={this.updateState}
                />
                <div className="content">
                    <Switch>
                        <Redirect from="/home" to="/" />
                        <Route
                            path="/project/:id"
                            render={props => (
                                <Project
                                    isLoggedIn={this.state.isLoggedIn}
                                    stateHandler={this.updateState}
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
                            />
                        </Route>
                        <Route
                            path="/"
                            render={() => (
                                <Main
                                    isLoggedIn={this.state.isLoggedIn}
                                    stateHandler={this.updateState}
                                />
                            )}
                        />
                    </Switch>
                </div>
                <footer>
                    <h1>Footer</h1>
                </footer>
            </div>
        );
    }
}

export default App;
