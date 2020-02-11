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
    handleClick = () => {
        this.props.history.goBack();
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
                {/* {this.props.isLoggedIn ? "True" : "False"} */}
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
                                        // marginRight: "0px",
                                        // paddingLeft: "0px",
                                        // paddingRight: "0px"
                                    }}
                                >
                                    <Row>
                                        <Col sm={8} md={8}>
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
                                                                        "7rem",
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
                                                    <tr>
                                                        <td>
                                                            <div
                                                                style={{
                                                                    border:
                                                                        "solid",
                                                                    borderRadius:
                                                                        "10px 10px 10px 10px",
                                                                    borderWidth:
                                                                        "2px",
                                                                    width:
                                                                        "11rem",
                                                                    backgroundColor:
                                                                        "blue",
                                                                    borderColor:
                                                                        "blue",
                                                                    color:
                                                                        "white",
                                                                    cursor:
                                                                        "pointer"
                                                                }}
                                                            >
                                                                <Like /> Like
                                                                this proejct
                                                            </div>
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
                                            : this.state.project.description.map(
                                                  line => {
                                                      return (
                                                          <p
                                                              key={this.state.project.description.indexOf(
                                                                  line
                                                              )}
                                                          >
                                                              {line}
                                                          </p>
                                                      );
                                                  }
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
