{/* Import required libraries and components */}
var React = require('react');
var PropTypes = require('prop-types');
var queryString = require('query-string');
var Link = require('react-router-dom').Link;
var api = require('../utils/api');
var PlayerPreview = require('./PlayerPreview');
var Loading = require('./Loading');

{/* Display UI results of each player if truthy. PlayerPreview also used by Battle component */}
function Profile (props) {
  var info = props.info;
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
function Player (props) {
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
class Results extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      winner: null,
      loser: null,
      error: null,
      loading: true
    }
  }
  componentDidMount () {
    var players = queryString.parse(this.props.location.search)
    api.battle([
      players.playerOneName,
      players.playerTwoName
    ]).then(function (results) {
      console.log(players);
      if (results === null) {
        return this.setState(function () {
          return {
            error: 'Looks like there was an error. Check that both users exsit on Gibhub',
            loading: false
          }
        });
      }

      this.setState(function () {
        return {
          error: null,
          winner: results[0],
          loser: results[1],
          loading: false
        }
      });
    }.bind(this));
  }
  render() {
    var error = this.state.error;
    var winner = this.state.winner;
    var loser = this.state.loser;
    var loading = this.state.loading;

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

{/* Export Results component to App.js */}
module.exports = Results;
