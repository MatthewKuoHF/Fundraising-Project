import React from "react";
import http from "../../services/httpService";
import config from "../../config.json";
import { Link } from "react-router-dom";
import { Table } from "react-bootstrap";
import SimpleImageSlider from "react-simple-image-slider";
import "./Main.css";

class Main extends React.Component {
    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         items: []
    //     };
    // }
    state = {
        projects: []
    };
    componentDidMount() {
        // fetch("https://jsonplaceholder.typicode.com/todos")
        //     .then(data => data.json())
        //     .then(json => this.setState({ items: json }));
        http.get(config.apiUrl + "/project")
            .then(response => {
                const { data: projects } = response;
                this.setState({ projects });
            })
            .catch(ex => {
                console.log(ex);
            });
    }

    render() {
        return (
            <div className="main">
                <Table striped bordered hover>
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
                        {this.state.projects.map(project => {
                            const images = project.images;
                            let imageList = [];
                            images.map(image => {
                                imageList.push({ url: image });
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
                                    <td>
                                        <Link to={`/project/${project.id}`}>
                                            {project.title}{" "}
                                        </Link>
                                    </td>
                                    <td>
                                        {project.briefDescription.map(line => {
                                            return <p>{line}</p>;
                                        })}
                                    </td>
                                    <td>
                                        <p>{project.author}</p>
                                    </td>
                                    <td>
                                        <p>{project.category}</p>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </Table>
            </div>
        );
    }
}

export default Main;
