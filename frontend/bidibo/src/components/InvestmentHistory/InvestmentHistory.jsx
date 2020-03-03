import React, { Component } from "react";
import { Table } from "react-bootstrap";
import "./InvestmentHistory.css";
import Search from "../Search/Search";
import http from "../../services/httpService";
import config from "../../config.json";
import { Link } from "react-router-dom";

class InvestmentHistory extends Component {
    state = {
        investmentHistory: [],
        filteredCategories: [],
        filteredText: "",
        filteredInvestmentHistory: []
    };
    componentDidMount() {
        http.get(config.apiUrl + "/investment/" + localStorage.getItem("uid"))
            .then(response => {
                const { data } = response;
                this.setState({ investmentHistory: data["investment"] });
                this.setState({
                    filteredInvestmentHistory: data["investment"]
                });
            })
            .catch(ex => {
                console.log(ex);
            });
    }
    handleChange = e => {
        let filtered = [...this.state.investmentHistory];
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
            filtered = this.state.investmentHistory.filter(m =>
                filteredCategories.includes(m.category)
            );
        }
        if (filteredText.length) {
            filtered = this.state.investmentHistory.filter(m =>
                m.projectTitle
                    .toLowerCase()
                    .startsWith(filteredText.toLowerCase())
            );
        }
        if (filteredCategories.length === 0 && filteredText.length === 0) {
            filtered = this.state.investmentHistory;
        }
        this.setState({ filteredInvestmentHistory: filtered });
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
                    <h4>Investment History</h4>
                    <Table striped bordered hover className="tableArea">
                        <thead>
                            <tr></tr>
                            <tr>
                                <th>Date</th>
                                <th>Investment</th>
                                <th>Project Title</th>
                                <th>Category</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.filteredInvestmentHistory.map(
                                investment => {
                                    return (
                                        <tr key={row++}>
                                            <td>
                                                {investment.timestamp.slice(
                                                    4,
                                                    6
                                                ) +
                                                    "/" +
                                                    investment.timestamp.slice(
                                                        6,
                                                        8
                                                    ) +
                                                    "/" +
                                                    investment.timestamp.slice(
                                                        0,
                                                        4
                                                    ) +
                                                    " " +
                                                    investment.timestamp.slice(
                                                        8,
                                                        10
                                                    ) +
                                                    ":" +
                                                    investment.timestamp.slice(
                                                        10,
                                                        12
                                                    )}
                                            </td>
                                            <td>
                                                {"$" + investment.investAmount}
                                            </td>
                                            <td>
                                                <Link
                                                    to={`/project/${investment.investProject}`}
                                                >
                                                    <h4>
                                                        {
                                                            investment.projectTitle
                                                        }
                                                    </h4>
                                                </Link>
                                            </td>
                                            <td>{investment.category}</td>
                                        </tr>
                                    );
                                }
                            )}
                        </tbody>
                    </Table>
                </div>
            </div>
        );
    }
}

export default InvestmentHistory;
