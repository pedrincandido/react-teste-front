import React, { Component } from 'react';
import PropTypes from 'prop-types'
import UserAvatar from './user_avatar';

import UserDetail from './user_details';

export default class UserItem extends Component {
    static propTypes = {
        firstName: PropTypes.string.isRequired,
        lastName: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        thumbnail: PropTypes.string,
        user: PropTypes.any
    };


    render() {
        const firstName = this.props.firstName;
        const lastName = this.props.lastName;
        const title = this.props.title;
        const thumbnailPicture = this.props.thumbnail;
        console.log(this.props.user);
        return (
            <div className="user-item-container">
                <UserAvatar userName={firstName + lastName } avatarUrl={thumbnailPicture}/>
                {/* <UserDetail user={} /> */}
                <h2>{firstName}</h2>
            </div>
        );
    }
}

