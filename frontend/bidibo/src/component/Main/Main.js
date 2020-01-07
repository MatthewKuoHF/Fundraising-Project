import React from 'react';
import { Link } from 'react-router-dom';

class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            items: []
        }
    }

    componentDidMount() {
        fetch('https://jsonplaceholder.typicode.com/todos')
            .then(data => data.json())
            .then(json => this.setState({ items: json }))
    }

    render() {
        return (
            <div>
                <h1>Main: {this.props.isLoggedIn ? "True" : "False"}</h1>
                {
                    this.state.items.map(item => {
                        return (
                            <p key={item.id}>
                                <Link to={`/project/${item.id}`}>
                                    {item.id}: {item.title}
                                </Link>
                            </p>
                        )
                    })
                }
            </div>
        )
    }
}

export default Main