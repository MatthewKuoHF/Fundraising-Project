import React from "react";
import { Button, Card, Carousel } from "react-bootstrap";
import "./Project.css";
import Like from "../common/like";
import http from "../../services/httpService";
import config from "../../config.json";
import { Link } from "react-router-dom";
//Use carousal as imageslider
//Use tab for lower part

class Project extends React.Component {
    state = {
        id: this.props.match.params.id,
        index: Number(this.props.match.params.id) - 1,
        userId: "",
        project: {}
    };
    componentDidMount() {
        const { index } = this.state;
        if (!this.props.projects.length) {
            http.get(config.apiUrl + "/project")
                .then(response => {
                    const { data: projects } = response;
                    const project = projects[index];
                    this.setState({ project });
                    console.log(this.state.project.images.length);
                })
                .catch(ex => {
                    console.log(ex);
                });
        } else {
            this.setState({ project: this.props.projects[index] });
            console.log(this.state.project);
        }
    }
    render() {
        return (
            <div className="project">
                {this.props.isLoggedIn ? "True" : "False"}
                <div className="upper">
                    <Button variant="secondary" id="prev">
                        <i className="fa fa-arrow-left" aria-hidden="true"></i>
                    </Button>
                    <Card style={{ width: "100%" }}>
                        {/* <Card.Img variant="top" src="holder.js/100px180" /> */}
                        <Card.Body>
                            <Card.Title id="title">
                                {this.state.project.title}
                            </Card.Title>
                            <Carousel interval={0}>
                                {this.state.project.images === undefined
                                    ? null
                                    : this.state.project.images.map(image => {
                                          return (
                                              <Carousel.Item>
                                                  <img
                                                      className="d-block w-100"
                                                      id="slides"
                                                      src={image}
                                                  />
                                              </Carousel.Item>
                                          );
                                      })}
                            </Carousel>
                            <table>
                                <tbody>
                                    <tr>author: {this.state.project.author}</tr>
                                    <tr>
                                        category:{" "}
                                        <Link
                                            to={
                                                "/category/" +
                                                this.state.project.category
                                            }
                                        >
                                            {this.state.project.category}
                                        </Link>
                                    </tr>
                                    <tr>
                                        Invest: <input type="number"></input>
                                        <button type="submit">Go!</button>
                                    </tr>
                                </tbody>
                            </table>
                            {/* <Card.Text>1</Card.Text>
                            <Card.Text>2</Card.Text> */}
                        </Card.Body>
                    </Card>
                </div>
                <div className="lower">lower</div>
            </div>
        );
    }
}

export default Project;
