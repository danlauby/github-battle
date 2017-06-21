{/* Import required libraries and components */}
import React from 'react';
import PropTypes from 'prop-types';
import queryString from 'query-string';
import { Link } from 'react-router-dom';
import api from '../utils/api';
import PlayerPreview from './PlayerPreview';
import Loading from './Loading';

{/* Display UI results of each player if truthy. PlayerPreview also used by Battle component */}
const Profile = (props) => {
  const info = props.info;
  return (
      <PlayerPreview username={info.login} avatar={info.avatar_url}>
        <ul className='space-list-items'>
          {info.name && <li>{info.name}</li>}
          {info.location && <li>{info.location}</li>}
          {info.company && <li>{info.company}</li>}
          <li>Followers: {info.followers}</li>
          <li>Following: {info.following}</li>
          <li>Public Repos: {info.public_repos}</li>
          {info.blog && <li><a href={info.blog}>{info.blog}</a></li>}
        </ul>
      </PlayerPreview>
    )
}

{/* Set required data types for Profile's properties */}
Profile.propTypes = {
  info: PropTypes.object.isRequired
}

{/* Display UI of winner/loser title (PlayerPreview.js, Battle.js), score (api.js) */}
{/* Display Profile component, passing profile prop */}
const Player = (props) => {
  return (
    <div>
    <h1 className='header'>{props.label}</h1>
    <h3 style={{textAlign: 'center'}}>Score: {props.score}</h3>
    <Profile info={props.profile}/>
    </div>
  )
}

{/* Set required data types for Player's properties */}
Player.propTypes = {
  label: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  profile: PropTypes.object.isRequired
}

{/* Set initial state of Results properties */}
{/* Use query-string to parse player names from URL via location->search */}
{/* Pass players names from /battle URL to api for get request */}
{/* If results null, display error message (display reset button) / else, set state to show battle results */}
{/* Return UI of each player's label (winner/loser), score and profile */}
export default class Results extends React.Component {
  state = {
      winner: null,
      loser: null,
      error: null,
      loading: true
    }

  componentDidMount() {
    const players = queryString.parse(this.props.location.search)
    api.battle([
      players.playerOneName,
      players.playerTwoName
    ]).then((results) => {
      if (results === null) {
        return this.setState(() => {
          return {
            error: 'Looks like there was an error. Check that both users exist on Gibhub',
            loading: false
          }
        });
      }

      this.setState(() => {
        return {
          error: null,
          winner: results[0],
          loser: results[1],
          loading: false
        }
      });
    });
  }

  render() {
    const error = this.state.error;
    const winner = this.state.winner;
    const loser = this.state.loser;
    const loading = this.state.loading;

    if (loading === true) {
      return <Loading />;
    }

    if (error) {
      return (
        <div>
        <p>{error}</p>
        <Link to='/battle'>Reset</Link>
        </div>
      )
    }
    return (
      <div className='row'>
        <Player
          label='Winner'
          score={winner.score}
          profile={winner.profile}
          />
        <Player
          label='Loser'
          score={loser.score}
          profile={loser.profile}
        />
      </div>
    )
  }
}
