import React from 'react';
import { Link } from 'react-router-dom';

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
            <Link to="/login"><li>Sign in</li></Link>

        return (
            <header>
                <div className="container">
                    <Link to="/"><h1 className="logo">Fundraising</h1></Link>
                    <nav>
                        <ul>
                            <Link to="/"><li>Home</li></Link>
                            <Link to="/category"><li>Category</li></Link>
                            <Link to="/"><li>Upload</li></Link>
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