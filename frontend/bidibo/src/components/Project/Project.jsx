import React from "react";
import {
    Button,
    Card,
    Carousel,
    Container,
    Row,
    Col,
    Tabs,
    Tab
} from "react-bootstrap";
import "./Project.css";
import Like from "../common/like";
import http from "../../services/httpService";
import config from "../../config.json";
import { Link } from "react-router-dom";
import parse from "html-react-parser";
//Use carousal as imageslider
//Use tab for lower part

class Project extends React.Component {
    state = {
        id: this.props.match.params.id,
        index: Number(this.props.match.params.id) - 1,
        userId: "",
        investAmount: "",
        project: {},
        likedProjects: this.props.likedProjects,
        liked: false
    };
    handleOnChange = target => {
        this.setState({ investment: target.value });
        this.props.stateHandler("investAmount", target.value);
    };
    handleClick = () => {
        this.props.history.goBack();
    };
    likedOnClick = () => {
        if (this.state.liked === false) {
            http.post(
                config.apiUrl +
                    "/like/" +
                    localStorage.getItem("uid") +
                    "/" +
                    this.state.id
            )
                .then(response => {
                    const { data } = response;
                    this.setState({ likedProjects: data });
                    this.props.stateHandler("likedProjects", data);
                })
                .catch(ex => {
                    console.log(ex);
                });
        }
        if (this.state.liked === true) {
            http.post(
                config.apiUrl +
                    "/unlike/" +
                    localStorage.getItem("uid") +
                    "/" +
                    this.state.id
            )
                .then(response => {
                    const { data } = response;
                    this.setState({ likedProjects: data });
                    this.props.stateHandler("likedProjects", data);
                })
                .catch(ex => {
                    console.log(ex);
                });
        }
        this.setState({ liked: !this.state.liked });
    };
    componentDidMount() {
        if (this.state.likedProjects.length === 0) {
            http.get(config.apiUrl + "/liked/" + localStorage.getItem("uid"))
                .then(response => {
                    const { data } = response;
                    this.setState({ likedProjects: data });
                    data.forEach(project => {
                        if (project.id === this.state.id) {
                            this.setState({ liked: true });
                        }
                    });
                })
                .catch(ex => {
                    console.log(ex);
                });
        }
        this.state.likedProjects.forEach(project => {
            if (project.id === this.state.id) {
                this.setState({ liked: true });
            }
        });
        const { index } = this.state;
        if (!this.props.projects.length) {
            http.get(config.apiUrl + "/project")
                .then(response => {
                    const { data: projects } = response;
                    const project = projects[index];
                    this.setState({ project });
                })
                .catch(ex => {
                    console.log(ex);
                });
        } else {
            this.setState({ project: this.props.projects[index] });
        }
    }
    render() {
        return (
            <div className="project">
                <div className="upper">
                    <Button
                        variant="secondary"
                        id="prev"
                        onClick={this.handleClick}
                    >
                        <i className="fa fa-arrow-left" aria-hidden="true"></i>
                    </Button>
                    <Card style={{ width: "100%" }}>
                        {/* <Card.Img variant="top" src="holder.js/100px180" /> */}
                        <Card.Body>
                            <div>
                                <Card.Title id="title">
                                    {this.state.project.title}
                                </Card.Title>
                                <Container
                                    style={{
                                        marginLeft: "0px"
                                    }}
                                >
                                    <Row>
                                        <Col sm={8} md={8}>
                                            <Carousel interval={0}>
                                                {this.state.project.images ===
                                                undefined
                                                    ? null
                                                    : this.state.project.images.map(
                                                          image => {
                                                              return (
                                                                  <Carousel.Item
                                                                      key={this.state.project.images.indexOf(
                                                                          image
                                                                      )}
                                                                  >
                                                                      <img
                                                                          className="d-block w-100 centered-and-cropped"
                                                                          id="slides"
                                                                          src={
                                                                              image
                                                                          }
                                                                      />
                                                                  </Carousel.Item>
                                                              );
                                                          }
                                                      )}
                                            </Carousel>
                                        </Col>
                                        <Col sm={4} md={4}>
                                            <table id="details">
                                                <tbody>
                                                    <tr>
                                                        <td>
                                                            Author:{" "}
                                                            <Link
                                                                to={
                                                                    "/author/" +
                                                                    this.state
                                                                        .project
                                                                        .authorId
                                                                }
                                                            >
                                                                {
                                                                    this.state
                                                                        .project
                                                                        .author
                                                                }
                                                            </Link>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            Category:{" "}
                                                            {
                                                                this.state
                                                                    .project
                                                                    .category
                                                            }
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            Invest:{" $ "}
                                                            <input
                                                                type="number"
                                                                name="investAmount"
                                                                value={
                                                                    this.state
                                                                        .investment ||
                                                                    ""
                                                                }
                                                                onChange={e =>
                                                                    this.handleOnChange(
                                                                        e.target
                                                                    )
                                                                }
                                                                style={{
                                                                    width:
                                                                        "7rem",
                                                                    marginRight:
                                                                        "0.5rem"
                                                                }}
                                                            ></input>
                                                            <Link
                                                                to={
                                                                    "/invest/" +
                                                                    this.state
                                                                        .project
                                                                        .id
                                                                }
                                                                style={{
                                                                    width: "20%"
                                                                }}
                                                            >
                                                                Go!
                                                            </Link>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            <div
                                                                onClick={
                                                                    this
                                                                        .likedOnClick
                                                                }
                                                                style={{
                                                                    border:
                                                                        "solid",
                                                                    borderRadius:
                                                                        "10px 10px 10px 10px",
                                                                    borderWidth:
                                                                        "2px",
                                                                    width:
                                                                        "8rem",
                                                                    backgroundColor:
                                                                        "blue",
                                                                    borderColor:
                                                                        "blue",
                                                                    color:
                                                                        "white",
                                                                    cursor:
                                                                        "pointer",
                                                                    textAlign:
                                                                        "center"
                                                                }}
                                                            >
                                                                <Like
                                                                    liked={
                                                                        this
                                                                            .state
                                                                            .liked
                                                                    }
                                                                />{" "}
                                                                {this.state
                                                                    .liked
                                                                    ? "Unlike"
                                                                    : "Like"}
                                                            </div>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </Col>
                                    </Row>
                                </Container>
                            </div>
                        </Card.Body>
                    </Card>
                </div>
                <div className="lower">
                    <Tabs
                        defaultActiveKey="description"
                        id="uncontrolled-tab-example"
                    >
                        <Tab eventKey="description" title="Description">
                            <Card style={{ width: "100%" }}>
                                <Card.Body>
                                    <div>
                                        <Card.Title id="title">
                                            <h3>{this.state.project.title}</h3>
                                        </Card.Title>
                                        {this.state.project.description ===
                                        undefined
                                            ? ""
                                            : parse(
                                                  this.state.project.description
                                              )}
                                    </div>
                                </Card.Body>
                            </Card>
                        </Tab>
                        <Tab eventKey="trend" title="Trend">
                            <Card style={{ width: "100%" }}>
                                <Card.Body>
                                    <div>
                                        <Card.Title id="title">
                                            Trend
                                        </Card.Title>
                                        <p>placeholder</p>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Tab>
                        <Tab eventKey="about" title="About">
                            <Card style={{ width: "100%" }}>
                                <Card.Body>
                                    <div>
                                        <Card.Title id="title">
                                            About Us
                                        </Card.Title>
                                        <p>placeholder</p>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Tab>
                    </Tabs>
                </div>
            </div>
        );
    }
}

export default Project;
