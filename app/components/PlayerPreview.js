{/* Import required libraies */}
var React = require('react')
var PropTypes = require('prop-types');

{/* Return player UI for each player */}
{/* Share this component with Battle component  */}
{/* Display children props within PlayerPreview -> Battle.js */}
function PlayerPreview (props) {
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

{/* Export PlayerPreviewcomponent to App.js, Battle.js, Results.js */}
module.exports = PlayerPreview;
