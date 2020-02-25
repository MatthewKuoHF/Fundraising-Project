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
import http from "../../services/httpService";
import config from "../../config.json";
import "./Navbar.css";

class NavbarComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.singOut = this.singOut.bind(this);
    }
    componentDidMount() {}
    singOut() {
        this.props.stateHandler("isLoggedIn", false);
        this.props.stateHandler("email", "");
        this.props.stateHandler("firstName", "");
        this.props.stateHandler("lastName", "");
        this.props.stateHandler("school", "");
        localStorage.setItem("isLoggedIn", false);
        localStorage.setItem("email", "");
        localStorage.setItem("firstName", "");
        localStorage.setItem("lastName", "");
        localStorage.setItem("school", "");
        this.props.history.push("/");
    }

    render() {
        let InOrOut =
            (this.props.isLoggedIn && this.props.email !== "") ||
            localStorage.getItem("email") !== "" ? (
                <div>
                    <NavDropdown
                        style={{ float: "left" }}
                        title={<span id="navlink">Dashboard</span>}
                        id="basic-nav-dropdown"
                    >
                        <NavDropdown.Item>
                            <Link to="/my_account">My Account</Link>
                        </NavDropdown.Item>
                        <NavDropdown.Item>
                            <Link to="/liked_projects">Liked Projects</Link>
                        </NavDropdown.Item>
                        <NavDropdown.Item>
                            <Link to="/invested_projects">
                                Invested Projects
                            </Link>
                        </NavDropdown.Item>
                    </NavDropdown>
                    <a href="/" onClick={this.singOut} id="navlink">
                        Sign out
                    </a>
                </div>
            ) : (
                <NavLink to="/login" id="navlink">
                    Sign in
                </NavLink>
            );
        return (
            <header>
                <Navbar bg="blue" expand="lg">
                    <Navbar.Brand>
                        <Link to="/" id="navlink">
                            FUNDRAISING
                        </Link>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav" className="links">
                        <Nav className="mr-auto">
                            <Nav>
                                <Link to="/" id="navlink">
                                    Home
                                </Link>
                            </Nav>
                            <Nav>
                                <Link to="/upload" id="navlink">
                                    Upload
                                </Link>
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
