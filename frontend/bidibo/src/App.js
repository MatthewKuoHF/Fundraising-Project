import React from 'react';
import logo from './logo.svg';
import Navbar from './component/Navbar/Navbar';
import './App.css';
import Login from './component/Login/Login';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Main from './component/Main/Main';

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            user: "",
            isLoggedIn: localStorage.getItem('isLoggedIn') == 'true' ? true : false
        }
        this.updateState = this.updateState.bind(this)
        this.isLoggedInFunction = this.isLoggedInFunction.bind(this)
    }
    updateState(name, value, func) {
        this.setState({
            [name]: value
        })
        localStorage.setItem('isLoggedIn', value)
    }
    isLoggedInFunction() {
        return this.state.isLoggedIn
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
                            stateHandler={this.props.stateHandler}
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
                    
                    <footer>
                        <h1>Footer</h1>
                    </footer>
                </Router>
            </div>
        );
    }
}

export default App;
