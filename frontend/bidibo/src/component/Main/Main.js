import React from 'react';

class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        return (
            <h1>Main: {this.props.isLoggedIn ? "True" : "False"}</h1>
        )
    }
}

export default Main