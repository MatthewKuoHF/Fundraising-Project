import React, { Component } from "react";
import "./Trend.css";
import http from "../../../services/httpService";
import config from "../../../config.json";

class Trend extends Component {
    state = {
        trend: []
    };
    componentDidMount() {
        http.get(config.apiUrl + "/trend/" + this.props.id)
            .then(response => {
                const { data: trend } = response;
                this.setState({ trend });
            })
            .catch(ex => {
                console.log(ex);
            });
    }
    render() {
        return (
            <div>
                {this.state.trend.map(row => (
                    <div>{row["date"] + ": " + row["sum"]}</div>
                ))}
            </div>
        );
    }
}

export default Trend;
