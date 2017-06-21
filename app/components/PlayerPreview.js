{/* Import required libraies */}
import React from 'react';
import PropTypes from 'prop-types';

{/* Return player UI for each player */}
{/* Share this component with Battle component  */}
{/* Display children props within PlayerPreview -> Battle.js */}
export default function PlayerPreview (props) {
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
{/* Set data types for PlayerPreview properties */}
PlayerPreview.protoTypes = {
  avatar: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired
}
