import React from 'react';
import Button from 'react-bootstrap/Button';

import './removeAlert.scss';

function RemoveAlert(props) {

    function hideHandler() {
        props.hideHandler('remove')
    }
    function removeHandler() {
        props.deleteHandler(props.id);
    }

    return (
        <div className="remove-alert">
            <span className="close" onClick={hideHandler}>&times;</span>
            <h1>Are you sure?</h1>
            <div className="no-section">
                <Button onClick={hideHandler} variant="secondary">No</Button>
                <span>Take back to the ship!</span>
            </div>
            <Button className="yes-btn" onClick={removeHandler} variant="secondary">Yes</Button>
        </div>
    );
}

export default RemoveAlert;