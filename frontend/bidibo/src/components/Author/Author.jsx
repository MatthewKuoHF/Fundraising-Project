import React, { Component } from "react";
import "./Author.css";

class Author extends Component {
    state = {};
    render() {
        return <div>Author {this.props.match.params.id}</div>;
    }
}

export default Author;
