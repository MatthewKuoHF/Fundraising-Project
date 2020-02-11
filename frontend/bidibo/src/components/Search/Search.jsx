import React, { Component } from "react";
import { Form } from "react-bootstrap";
import http from "../../services/httpService";
import config from "../../config.json";
import "./Search.css";

class Search extends Component {
    state = { categories: [], search: "" };
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
    handleChange = e => {
        let search = e.target.value;
        this.setState({ search });
        this.props.handleChange(e);
    };
    render() {
        return (
            <div id="searchFilter">
                <Form>
                    <Form.Group>
                        <h5>Category</h5>
                        {this.state.categories.length === 0
                            ? null
                            : this.state.categories.map(category => {
                                  return (
                                      <Form.Check
                                          key={this.state.categories.indexOf(
                                              category
                                          )}
                                          type="checkbox"
                                          label={category}
                                          value={category}
                                          onChange={e =>
                                              this.props.handleChange(e)
                                          }
                                      ></Form.Check>
                                  );
                              })}
                        <br />
                        <h5>Search by Name</h5>
                        <input
                            type="text"
                            style={{ width: "100%" }}
                            value={"" || this.state.search}
                            onChange={e => this.handleChange(e)}
                        ></input>
                    </Form.Group>
                </Form>
            </div>
        );
    }
}

export default Search;
