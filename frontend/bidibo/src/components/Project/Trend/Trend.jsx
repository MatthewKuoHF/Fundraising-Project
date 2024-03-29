import React, { Component } from "react";
import "./Trend.css";
import http from "../../../services/httpService";
import config from "../../../config.json";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

class Trend extends Component {
    state = {
        trend: [],
        x: [],
        y: []
    };
    componentDidMount() {
        http.get(config.apiUrl + "/trend/" + this.props.id)
            .then(response => {
                const { data: trend } = response;
                this.setState({ trend });
                let x = [];
                let y = [];
                trend.map(element => {
                    x.push(element["date"]);
                    y.push(element["sum"]);
                });
                this.setState({ x });
                this.setState({ y });
            })
            .catch(ex => {
                console.log(ex);
            });
    }
    render() {
        const options = {
            title: {
                text: "Weekly Trend"
            },
            type: "line",
            xAxis: {
                categories: this.state.x
            },
            yAxis: {
                title: { text: "Total Fund ($)" }
            },
            plotOptions: {
                line: {
                    dataLabels: {
                        enabled: true
                    },
                    enableMouseTracking: false
                }
            },
            series: [
                {
                    name: "Amount",
                    data: this.state.y
                }
            ]
        };
        return (
            <div>
                {/* {this.state.trend.map(row => (
                    <div>{row["date"] + ": " + row["sum"]}</div>
                ))} */}
                <HighchartsReact highcharts={Highcharts} options={options} />
            </div>
        );
    }
}

export default Trend;
