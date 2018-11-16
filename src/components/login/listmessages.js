import React from 'react';

class ListMessages extends React.Component {
    render() {
        const {errors, messages} = this.props;
        if (typeof errors === 'string') {
            return (
                <div className="alert alert-danger" key={errors}>
                    {errors}
                </div>
            );
        }
        if (typeof messages === 'string') {
            return (
                <div className="alert alert-success" key={messages}>
                    {messages}
                </div>
            );
        } else {
            return null;
        }
    }
}

export default ListMessages;