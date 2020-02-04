import React from "react";

class Project extends React.Component {
    state = {
        id: this.props.match.params.id,
        title: "",
        category: "",
        tag: []
    };
    componentDidMount() {}
    render() {
        return (
            <div>
                <h1>
                    Project {this.state.id}:{" "}
                    {this.props.isLoggedIn ? "True" : "False"}
                </h1>
            </div>
        );
    }
}

export default Project;
