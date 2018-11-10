import React, { Component } from 'react';

class Message extends Component {
    render() {
        var { message } = this.props;
        return (
            <h3>
                <span className="badge success-color-dark">
                    {message}
                </span>
            </h3>
        );
    }
}

export default Message;
