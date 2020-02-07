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
//Use carousal as imageslider
//Use tab for lower part

class Project extends React.Component {
    state = {
        id: this.props.match.params.id,
        index: Number(this.props.match.params.id) - 1,
        userId: "",
        investment: undefined,
        project: {}
    };
    handleOnChange = target => {
        this.setState({ investment: target.value });
    };
    componentDidMount() {
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
                {this.props.isLoggedIn ? "True" : "False"}
                <div className="upper">
                    <Button variant="secondary" id="prev">
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
                                        // marginRight: "0px",
                                        // paddingLeft: "0px",
                                        // paddingRight: "0px"
                                    }}
                                >
                                    <Row>
                                        <Col sm={8}>
                                            <Carousel
                                                interval={0}
                                                // style={{ float: "left" }}
                                            >
                                                {this.state.project.images ===
                                                undefined
                                                    ? null
                                                    : this.state.project.images.map(
                                                          image => {
                                                              return (
                                                                  <Carousel.Item>
                                                                      <img
                                                                          className="d-block w-100"
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
                                        <Col sm={4}>
                                            <table id="details">
                                                <tbody>
                                                    <tr>
                                                        <td>
                                                            author:{" "}
                                                            {
                                                                this.state
                                                                    .project
                                                                    .author
                                                            }
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            category:{" "}
                                                            <Link
                                                                to={
                                                                    "/category/" +
                                                                    this.state
                                                                        .project
                                                                        .category
                                                                }
                                                            >
                                                                {
                                                                    this.state
                                                                        .project
                                                                        .category
                                                                }
                                                            </Link>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            Invest:{" $ "}
                                                            <input
                                                                type="number"
                                                                name="invest"
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
                                                                        "50%",
                                                                    marginRight:
                                                                        "0.5rem"
                                                                }}
                                                            ></input>
                                                            <button
                                                                type="submit"
                                                                style={{
                                                                    width: "20%"
                                                                }}
                                                            >
                                                                Go!
                                                            </button>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </Col>
                                    </Row>
                                </Container>
                                {/* <Card.Text>1</Card.Text>
                            <Card.Text>2</Card.Text> */}
                            </div>
                        </Card.Body>
                    </Card>
                </div>
                <div className="lower">
                    <Tabs
                        defaultActiveKey="profile"
                        id="uncontrolled-tab-example"
                    >
                        <Tab eventKey="home" title="Home">
                            <Like />
                        </Tab>
                        <Tab eventKey="profile" title="Profile">
                            <Like />
                        </Tab>
                        <Tab eventKey="contact" title="Contact">
                            <Like />
                        </Tab>
                    </Tabs>
                </div>
            </div>
        );
    }
}

export default Project;
