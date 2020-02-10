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
        this.state = {
            categories: []
        };
        this.singOut = this.singOut.bind(this);
    }
    componentDidMount() {
        http.get(config.apiUrl + "/categories")
            .then(response => {
                const { data: categories } = response;
                this.setState({ categories });
            })
            .catch(ex => {
                console.log(ex);
            });
    }
    singOut() {
        localStorage.setItem("isLoggedIn", false);
        this.props.history.push("/");
    }

    render() {
        let InOrOut =
            this.props.isLoggedIn && this.props.email !== "" ? (
                <a href="/" onClick={this.singOut} id="navlink">
                    Sign out
                </a>
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
                            <NavDropdown
                                title={<span id="navlink">Category</span>}
                                id="basic-nav-dropdown"
                            >
                                {this.state.categories.length === 0
                                    ? null
                                    : this.state.categories.map(category => {
                                          return (
                                              <NavDropdown.Item
                                                  key={this.state.categories.indexOf(
                                                      category
                                                  )}
                                              >
                                                  <Link
                                                      to={
                                                          "/category/" +
                                                          category
                                                      }
                                                  >
                                                      {category}
                                                  </Link>
                                              </NavDropdown.Item>
                                          );
                                      })}
                                {/* <NavDropdown.Item href="/category/Software">
                                    Software
                                </NavDropdown.Item>
                                <NavDropdown.Item href="/category/Film">
                                    Film
                                </NavDropdown.Item>
                                <NavDropdown.Item href="/category/Photography">
                                    Photography
                                </NavDropdown.Item> */}
                            </NavDropdown>
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
