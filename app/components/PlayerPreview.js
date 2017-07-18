import React from 'react';
import PropTypes from 'prop-types';


const PlayerPreview = (props) => {
  return (
    <div>
      <div className='column'>
        <img
          className='avatar'
          src={props.avatar}
          alt={'Avatar for ' + props.username}
        />
        <h2 className='username'>@{props.username}</h2>
        {props.children}
      </div>
    </div>
  )
}

PlayerPreview.protoTypes = {
  avatar: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired
}

module.exports = PlayerPreview;
