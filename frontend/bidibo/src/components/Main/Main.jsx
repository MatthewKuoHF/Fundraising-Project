import React from "react";
import http from "../../services/httpService";
import config from "../../config.json";
import { Link } from "react-router-dom";
import { Table } from "react-bootstrap";
import Search from "../Search/Search";
import SimpleImageSlider from "react-simple-image-slider";
import "./Main.css";
import parse from "html-react-parser";

class Main extends React.Component {
    state = {
        projects: [],
        filteredCategories: [],
        filteredText: "",
        filteredProjects: []
    };
    componentDidMount() {
        http.get(config.apiUrl + "/project")
            .then(response => {
                const { data: projects } = response;
                this.setState({ projects });
                this.setState({ filteredProjects: projects });
                this.props.stateHandler("projects", projects);
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
            // filtered = this.state.projects.filter(m =>
            //     filteredCategories.includes(m.category)
            // );
            filtered = filtered.filter(m =>
                filteredCategories.includes(m.category)
            );
        }

        if (filteredText.length) {
            // filtered = this.state.projects.filter(m =>
            //     m.title.toLowerCase().startsWith(filteredText.toLowerCase())
            // );
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
                                <th>Author</th>
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
                                    <tr key={project.id}>
                                        <td className="imgSlider">
                                            <SimpleImageSlider
                                                width={200}
                                                height={200}
                                                images={imageList}
                                                showNavs={false}
                                            />
                                        </td>
                                        <td style={wordStyle}>
                                            <Link to={`/project/${project.id}`}>
                                                <h4>{project.title}</h4>
                                            </Link>
                                        </td>
                                        <td style={wordStyle}>
                                            {parse(project.briefDescription)}
                                        </td>
                                        <td style={wordStyle}>
                                            <Link
                                                to={
                                                    "/author/" +
                                                    project.authorId
                                                }
                                            >
                                                {project.author}
                                            </Link>
                                        </td>
                                        <td style={wordStyle}>
                                            {project.category}
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                        {/* <div
                            style={{ marginBottom: "3rem", border: "none" }}
                        ></div> */}
                    </Table>
                </div>
            </div>
        );
    }
}

export default Main;
