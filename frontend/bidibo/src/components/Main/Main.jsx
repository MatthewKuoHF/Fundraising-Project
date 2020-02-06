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
                this.props.stateHandler("projects", projects);
            })
            .catch(ex => {
                console.log(ex);
            });
    }

    render() {
        const wordStyle = {
            textAlign: "left",
            verticalAlign: "middle"
        };
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
                                    <td style={wordStyle}>
                                        <Link to={`/project/${project.id}`}>
                                            <h4>{project.title}</h4>
                                        </Link>
                                    </td>
                                    <td style={wordStyle}>
                                        {project.briefDescription.map(line => {
                                            return <p>{line}</p>;
                                        })}
                                    </td>
                                    <td style={wordStyle}>
                                        <p>{project.author}</p>
                                    </td>
                                    <td style={wordStyle}>
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
