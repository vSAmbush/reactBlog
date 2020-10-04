import React from "react";
import './ViewTypeSwitch.scss';
import PropTypes from 'prop-types';

class ViewTypeSwitch extends React.Component {
    constructor(props) {
        super(props);
        this.switch = this.switch.bind(this);
    }

    switch(e) {
        Array.from(document.getElementsByClassName('view-type-button')).forEach(element => {
            element.classList.remove('active');
            e.target.classList.add('active');
        });

        this.props.onClick(e);
    }

    render() {
        return (
            <div className="view-type-button-container">
                <button className="view-type-button linear active" value="linear" onClick={this.switch} />
                <button className="view-type-button grid" value="grid" onClick={this.switch} />
            </div>
        )
    }
}

ViewTypeSwitch.propTypes = {
    onClick: PropTypes.func.isRequired
};

export default ViewTypeSwitch;