import React, { Component } from "react";
import "./ImageUpload.css";

class ImageUpload extends Component {
    state = {};
    render() {
        return (
            <div>
                <input
                    type="file"
                    onChange={this.props.fileSelectedHandler}
                    accept="image/*"
                    multiple
                />
            </div>
        );
    }
}

export default ImageUpload;
