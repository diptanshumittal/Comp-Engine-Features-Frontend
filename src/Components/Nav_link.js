import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

class NavLink extends React.Component {
    render() {
        var isActive = window.location.pathname === this.props.to;
        var clsname = isActive ? 'active' : '';
        return(
            <li className={"nav-item "+clsname}>
                <Link className="nav-link" to={this.props.to}>{this.props.name}</Link>
            </li>
        );
    }
}

NavLink.contextTypes = {
    router: PropTypes.object
};

export default NavLink;