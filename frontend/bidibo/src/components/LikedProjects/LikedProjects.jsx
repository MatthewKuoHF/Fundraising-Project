import React, { Component } from "react";
import { Table } from "react-bootstrap";
import "./LikedProjects.css";
import Search from "../Search/Search";
import http from "../../services/httpService";
import config from "../../config.json";
import { Link } from "react-router-dom";

class LikedProjects extends Component {
    state = {
        likedProjects: [],
        filteredCategories: [],
        filteredText: "",
        filteredLikedProjects: []
    };
    componentDidMount() {
        http.get(config.apiUrl + "/liked/" + localStorage.getItem("uid"))
            .then(response => {
                const { data } = response;
                this.setState({ likedProjects: data });
                this.setState({
                    filteredLikedProjects: data
                });
            })
            .catch(ex => {
                console.log(ex);
            });
    }
    removeOnClick = e => {
        http.post(
            config.apiUrl +
                "/unlike/" +
                localStorage.getItem("uid") +
                "/" +
                e.currentTarget.id
        )
            .then(response => {
                const { data } = response;
                this.setState({ likedProjects: data });
                this.setState({
                    filteredLikedProjects: data
                });
                this.props.stateHandler("likedProjects", data);
            })
            .catch(ex => {
                console.log(ex);
            });
    };
    handleChange = e => {
        let filtered = [...this.state.likedProjects];
        let filteredCategories = [...this.state.filteredCategories];
        let filteredText = this.state.filteredText;
        if (e.target.type === "checkbox") {
            filteredCategories = [...this.state.filteredCategories];
            if (e.target.checked === true) {
                filteredCategories.push(e.target.value);
            }
            if (e.target.checked === false) {
                filteredCategories = filteredCategories.filter(
                    a => a !== e.target.value
                );
            }
            this.setState({ filteredCategories });
        }
        if (e.target.type === "text") {
            filteredText = e.target.value;
            this.setState({ filteredText });
        }
        if (filteredCategories.length) {
            filtered = this.state.likedProjects.filter(m =>
                filteredCategories.includes(m.category)
            );
        }
        if (filteredText.length) {
            filtered = this.state.likedProjects.filter(m =>
                m.title.toLowerCase().startsWith(filteredText.toLowerCase())
            );
        }
        if (filteredCategories.length === 0 && filteredText.length === 0) {
            filtered = this.state.likedProjects;
        }
        this.setState({ filteredLikedProjects: filtered });
    };

    render() {
        let row = 1;
        return (
            <div>
                <div
                    style={{
                        width: "13%",
                        float: "left"
                    }}
                >
                    <Search handleChange={this.handleChange} />
                </div>
                <div style={{ float: "right", width: "87%" }}>
                    <h4>Liked Projects</h4>
                    <Table striped bordered hover className="tableArea">
                        <thead>
                            <tr></tr>
                            <tr>
                                <th>Remove</th>
                                <th>Project Title</th>
                                <th>Category</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.filteredLikedProjects.map(project => {
                                return (
                                    <tr key={row++}>
                                        <td style={{ textAlign: "center" }}>
                                            <i
                                                id={project.id}
                                                className="fa fa-trash"
                                                aria-hidden="true"
                                                onClick={this.removeOnClick}
                                                style={{ cursor: "pointer" }}
                                            ></i>
                                        </td>
                                        <td>
                                            <Link to={`/project/${project.id}`}>
                                                <h4>{project.title}</h4>
                                            </Link>
                                        </td>
                                        <td>{project.category}</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </Table>
                </div>
            </div>
        );
    }
}

export default LikedProjects;
