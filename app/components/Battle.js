{/* Import required libraies and components */}
var React = require('react');
var PropTypes = require('prop-types');
var Link = require('react-router-dom').Link;
var PlayerPreview = require('./PlayerPreview');

{/* Set initial state of username to an empty string */}
{/* Bind 'this' to handleChange and handleSubmit methods so they can read 'this' from other components */}
{/* Event handler takes in input 'value' and sets username state when submitted */}
{/* Event handler stores id and usernname as props when user clickes submit */}
{/* Render form and set input properties */}
{/* onSubmit calls handleSubmit method / sets state of username */}
{/* Display label prop from Results -> Player component */}
{/* Set input value prop as username */}
{/* onChange  calls handleChangemethod method / stores id and username state to props */}
class PlayerInput extends React.Component {
  constructor (props) {
    super (props);

    this.state = {
      username: ''
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(e) {
    var value = e.target.value;
    this.setState(function () {
      return {
        username: value
      }
    })
  }
  handleSubmit(e) {
    e.preventDefault();
    this.props.onSubmit(
      this.props.id,
      this.state.username
    )
  }
  render() {
    return (
      <form className='column' onSubmit={this.handleSubmit}>
        <label className='header' htmlFor='username'>
          {this.props.label}
        </label>
        <input
          id='username'
          placeholder='github username'
          type='text'
          autoComplete='off'
          value={this.state.username}
          onChange={this.handleChange}
        />
        <button
          className='button'
          type='submit'
          disabled={!this.state.username}>
          Submit
        </button>
      </form>
    )
  }
}

{/* Set data types for PlayerInput properties */}
PlayerInput.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired

}

{/* Set initial state for Battle component properties */}
{/* handleSubmit stores username and Github avatar props as newState property */}
{/* Reset Battle inputs if Reset button clicked */}
{/* Render UI of each player if player username and img !null */}
class Battle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      playerOneName: '',
      playerTwoName: '',
      playerOneImage: null,
      playerTwoImage: null
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleReset = this.handleReset.bind(this);
  }
  handleSubmit(id, username) {
    this.setState(function () {
      var newState = {};
      newState[id + 'Name'] = username;
      newState[id + 'Image'] = 'http://github.com/' + username + '.png?size=200';
      return newState;
    });
  }
  handleReset(id) {
    this.setState(function () {
      var newState = {};
      newState[id + 'Name'] = '';
      newState[id + 'Image'] = null;
      return newState;
    })
  }
  render () {
    var match = this.props.match;
    var playerOneName = this.state.playerOneName;
    var playerTwoName = this.state.playerTwoName;
    var playerOneImage = this.state.playerOneImage;
    var playerTwoImage = this.state.playerTwoImage;

    return (
      <div>
        <div className='row'>
          {!playerOneName &&
          <PlayerInput
            id='playerOne'
            label='Player One'
            onSubmit={this.handleSubmit}
          />}

          {playerOneImage !== null &&
          <PlayerPreview
            avatar={playerOneImage}
            username={playerOneName}>
            <button
              className='reset'
              onClick={this.handleReset.bind(null, 'playerOne')}>
              Reset
            </button>
          </PlayerPreview>}

          {!playerTwoName &&
          <PlayerInput
            id='playerTwo'
            label='Player Two'
            onSubmit={this.handleSubmit}
          />}

          {playerTwoImage !== null &&
            <PlayerPreview
              avatar={playerTwoImage}
              username={playerTwoName}>
              <button
                className='reset'
                onClick={this.handleReset.bind(null, 'playerTwo')}>
                Reset
              </button>
            </PlayerPreview>}
        </div>

        {playerOneImage && playerTwoImage &&
        <Link
          className='button'
          to={{
            pathname: match.url + '/results',
            search: '?playerOneName=' + playerOneName +
            '&playerTwoName=' + playerTwoName
          }}>
            Battle
        </Link>}
      </div>
    )
  }
}

{/* Export Battle component to App.js, Results.js */}
module.exports = Battle;
