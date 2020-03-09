import React, { Component } from "react";
import "./Author.css";
import http from "../../services/httpService";
import config from "../../config.json";
import Search from "../Search/Search";
import parse from "html-react-parser";
import { Link } from "react-router-dom";
import { Table } from "react-bootstrap";
import SimpleImageSlider from "react-simple-image-slider";

class Author extends Component {
    state = {
        id: this.props.match.params.id,
        projects: [],
        filteredCategories: [],
        filteredText: "",
        filteredProjects: [],
        author: {}
    };
    componentDidMount() {
        http.get(config.apiUrl + "/author/" + this.state.id)
            .then(response => {
                const { data } = response;
                this.setState({ projects: data["projects"] });
                this.setState({ filteredProjects: data["projects"] });
                this.setState({ author: data["author"] });
            })
            .catch(ex => {
                console.log(ex);
            });
    }
    handleChange = e => {
        let filtered = [...this.state.projects];
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
            filtered = filtered.filter(m =>
                filteredCategories.includes(m.category)
            );
        }

        if (filteredText.length) {
            filtered = filtered.filter(m =>
                m.title.toLowerCase().startsWith(filteredText.toLowerCase())
            );
        }
        if (filteredCategories.length === 0 && filteredText.length === 0) {
            filtered = this.state.projects;
        }
        this.setState({ filteredProjects: filtered });
    };
    render() {
        const wordStyle = {
            textAlign: "left",
            verticalAlign: "middle"
        };
        return (
            <div className="main">
                <div style={{ width: "100%" }}>
                    <Table>
                        <tbody>
                            <tr>
                                <td className="authorTable">
                                    <div>
                                        <b>Author Name:</b>
                                    </div>
                                    <div>
                                        {this.state.author.firstName}{" "}
                                        {this.state.author.lastName}
                                    </div>
                                </td>
                                <td className="authorTable">
                                    <div>
                                        <b>Email:</b>
                                    </div>
                                    <div>{this.state.author.email}</div>
                                </td>
                                <td className="authorTable">
                                    <div>
                                        <b>School:</b>
                                    </div>
                                    <div>{this.state.author.school}</div>
                                </td>
                            </tr>
                        </tbody>
                    </Table>
                </div>
                <div
                    style={{
                        width: "13%",
                        float: "left"
                    }}
                >
                    <Search handleChange={this.handleChange} />
                </div>
                <div style={{ float: "right", width: "87%" }}>
                    <Table striped bordered hover className="tableArea">
                        <thead>
                            <tr>
                                <th>Preview</th>
                                <th>Title</th>
                                <th>Brief Description</th>
                                <th>Category</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.filteredProjects.map(project => {
                                const images = project.images;
                                let imageList = [];
                                images.map(image => {
                                    return imageList.push({ url: image });
                                });
                                return (
                                    <tr key={project.pid}>
                                        <td className="imgSlider">
                                            <SimpleImageSlider
                                                width={200}
                                                height={200}
                                                images={imageList}
                                                showNavs={false}
                                            />
                                        </td>
                                        <td style={wordStyle}>
                                            <Link
                                                to={`/project/${project.pid}`}
                                            >
                                                <h4>{project.title}</h4>
                                            </Link>
                                        </td>
                                        <td style={wordStyle}>
                                            {parse(project.briefDescription)}
                                        </td>
                                        <td style={wordStyle}>
                                            {project.category}
                                        </td>
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

export default Author;
