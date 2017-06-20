{/* Import required libraries  */}
import React from 'react';
import { Link } from 'react-router-dom';

{/* Home component renders UI */}
{/* Battle button placed in Link to /battle */}
export default class Home extends React.Component {
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
