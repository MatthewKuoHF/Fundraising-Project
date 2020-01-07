import { BrowserRouter as Router, Route } from 'react-router-dom';
import React from 'react';

import Navbar from './component/Navbar/Navbar';
import Login from './component/Login/Login';
import Main from './component/Main/Main';
import Register from './component/Register/Register';

import './App.css';
//import logo from './logo.svg';
import Project from './component/Project/Project';

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            email: "",
            firstName: "",
            lastName: "",
            isLoggedIn: localStorage.getItem('isLoggedIn') === 'true' ? true : false
        }
        this.updateState = this.updateState.bind(this)
    }
    updateState(name, value) {
        this.setState({
            [name]: value
        })
        localStorage.setItem('isLoggedIn', value)
    }
    
    render() {
        return (
            <div>
                <Router>
                    <Navbar
                        isLoggedIn={this.state.isLoggedIn}
                        stateHandler={this.updateState}
                    />

                    <Route path="/" exact strict>
                        <Main
                            isLoggedIn={this.state.isLoggedIn}
                            stateHandler={this.updateState}
                        />
                    </Route>

                    <Route path="/project/:id" exact strict>
                        <Project
                            isLoggedIn={this.state.isLoggedIn}
                            stateHandler={this.updateState}
                        />
                    </Route>

                    <Route path="/category" exact strict render={
                        () => {
                            return (<h1>Welcome Category</h1>)
                        }
                    } />

                    <Route path="/login" exact strict>
                        <Login
                            isLoggedIn={this.state.isLoggedIn}
                            stateHandler={this.updateState}
                        />
                    </Route>
                    <Route path="/register" exact strict>
                        <Register
                            isLoggedIn={this.state.isLoggedIn}
                            stateHandler={this.props.stateHandler}
                        />
                    </Route>

                    <footer>
                        <h1>Footer</h1>
                    </footer>
                </Router>
            </div>
        );
    }
}

export default App;
