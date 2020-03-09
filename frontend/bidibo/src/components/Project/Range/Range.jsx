import React, { Component } from "react";
import http from "../../../services/httpService";
import config from "../../../config.json";
import "./Range.css";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

class Range extends Component {
    state = {
        x: [],
        y: []
    };
    componentDidMount() {
        http.get(config.apiUrl + "/range/" + this.props.id)
            .then(response => {
                const { data: trend } = response;
                this.setState({ trend });
                let x = [];
                let y = [];
                trend.map(element => {
                    x.push(element["range"]);
                    y.push(element["amount"]);
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
            chart: {
                type: "column"
            },
            title: {
                text: "Investment Distribution"
            },
            xAxis: {
                type: "category",
                labels: {
                    rotation: -45,
                    style: {
                        fontSize: "13px",
                        fontFamily: "Verdana, sans-serif"
                    }
                },
                categories: this.state.x
            },
            yAxis: {
                min: 0,
                title: {
                    text: "Total Amount ($)"
                }
            },
            tooltip: {
                pointFormat: "Total Amount: ${point.y}"
            },
            series: [
                {
                    name: "",
                    data: this.state.y
                }
            ]
        };
        return (
            <div>
                <HighchartsReact highcharts={Highcharts} options={options} />
            </div>
        );
    }
}

export default Range;
