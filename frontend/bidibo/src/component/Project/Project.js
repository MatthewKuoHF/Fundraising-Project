import React from "react";

class Project extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: window.location.href.split("/")[4]
        };
    }
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
