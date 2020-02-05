import React from "react";
import { NavLink, Link } from "react-router-dom";

import "./Navbar.css";

class Navbar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.singOut = this.singOut.bind(this);
    }
    singOut() {
        localStorage.setItem("isLoggedIn", false);
        this.props.history.push("/");
    }

    render() {
        let InOrOut = this.props.isLoggedIn ? (
            <li>
                <a href="/" onClick={this.singOut}>
                    Sign out
                </a>
            </li>
        ) : (
            <NavLink to="/login">
                <li>Sign in</li>
            </NavLink>
        );

        return (
            <header>
                <div className="container">
                    <NavLink to="/">
                        <h1 className="logo">Fundraising</h1>
                    </NavLink>
                    <nav>
                        <ul>
                            <NavLink to="/">
                                <li>Home</li>
                            </NavLink>
                            <NavLink to="/category">
                                <li>Category</li>
                            </NavLink>
                            <NavLink to="/">
                                <li>Upload</li>
                            </NavLink>
                            {InOrOut}
                        </ul>
                    </nav>
                </div>
            </header>
        );
    }
}

export default Navbar;
© 2020 GitHub, Inc.