//https://react-bootstrap.netlify.com/components/navbar/#navbars
import React from "react";
import { NavLink, Link } from "react-router-dom";
import {
    NavDropdown,
    Navbar,
    Nav,
    Form,
    FormControl,
    Button
} from "react-bootstrap";
import "./Navbar.css";

class NavbarComponent extends React.Component {
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
            <a href="/" onClick={this.singOut}>
                Sign out
            </a>
        ) : (
            <NavLink to="/login">Sign in</NavLink>
        );
        return (
            <header>
                <Navbar bg="blue" expand="lg">
                    <Navbar.Brand>
                        <Link to="/">FUNDRAISING</Link>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav" className="links">
                        <Nav className="mr-auto">
                            <Nav>
                                <Link to="/">Home</Link>
                            </Nav>
                            <NavDropdown
                                title="Category"
                                id="basic-nav-dropdown"
                            >
                                <NavDropdown.Item href="#action/3.1">
                                    Software
                                </NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.2">
                                    Film
                                </NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.3">
                                    Photography
                                </NavDropdown.Item>
                            </NavDropdown>
                            <Nav>
                                <Link to="/upload">Upload</Link>
                            </Nav>
                            {InOrOut}
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </header>
        );
    }
}

export default NavbarComponent;
