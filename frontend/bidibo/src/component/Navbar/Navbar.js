import React from 'react';
import { withRouter } from 'react-router-dom';
import './Navbar.css'

class Navbar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
        this.singOut = this.singOut.bind(this);
    }
    singOut() {
        localStorage.setItem('isLoggedIn', false);
        this.props.history.push('/');
    }

    render() {
        let InOrOut = this.props.isLoggedIn ?
            <li><a href="/" onClick={this.singOut}>Sign out</a></li>
            :
            <li><a href="/login">Sign in</a></li>
        return (
            <header>
                <div class="container">
                    <a href="/"><h1 class="logo">Fundraising</h1></a>
                    <nav>
                        <ul>
                            <li><a href="/">Home</a></li>
                            <li><a href="/category">Category</a></li>
                            <li><a href="/">Upload</a></li>
                            {InOrOut}
                        </ul>
                    </nav>
                </div>
                <h1>Navbar: {this.props.isLoggedIn ? "True" : "False"}</h1>
            </header>
        )
    }
}

export default Navbar