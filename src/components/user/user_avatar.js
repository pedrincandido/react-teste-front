import React from 'react';

const UserAvatar = (props) => {
  console.log(props);
    return (
      <img className="avatar"
        src={props.avatarUrl}
        alt={props.userName}
      />
    );
  };

  export default UserAvatar;