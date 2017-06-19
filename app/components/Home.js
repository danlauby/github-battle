{/* Import required libraries  */}
var React = require('react');
var Link = require('react-router-dom').Link;

{/* Home component renders UI */}
{/* Battle button placed in Link to /battle */}
class Home extends React.Component {
  render () {
    return (
      <div className='home-container'>
      <h1>Github Battle: Battle your friends...and stuff.</h1>

      <Link className='button' to='/battle'>
        Battle
      </Link>
      </div>
    )
  }
}

{/* Export Home component to App.js */}
module.exports = Home;
