{/* Import required libraies */}
import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
{/* Import required components */}
import PlayerPreview from './PlayerPreview';

{/* Set initial state of username to an empty string */}
{/* Bind 'this' to handleChange and handleSubmit methods so 'this' refers to the parent component */}
{/* Event handler takes in input 'value' and sets username state when submitted */}
{/* Event handler stores id and usernname as props when user clickes submit */}
{/* Render form and set input properties */}
{/* onSubmit calls handleSubmit method / sets state of username */}
{/* Display label prop from Results -> Player component */}
{/* Set input value prop as username */}
{/* onChange  calls handleChangemethod method / stores id and username state to props */}
class PlayerInput extends React.Component {
    state = {
      username: ''
    }
  handleChange = (e) => {
    const value = e.target.value;
    this.setState(function () {
      return {
        username: value
      }
    })
  }
  handleSubmit = (e) => {
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
export default class Battle extends React.Component {
  state = {
      playerOneName: '',
      playerTwoName: '',
      playerOneImage: null,
      playerTwoImage: null
    }

  handleSubmit = (id, username) => {
    this.setState(function () {
      const newState = {};
      newState[id + 'Name'] = username;
      newState[id + 'Image'] = 'http://github.com/' + username + '.png?size=200';
      return newState;
    });
  }
  handleReset = (id) => {
    this.setState(function () {
      const newState = {};
      newState[id + 'Name'] = '';
      newState[id + 'Image'] = null;
      return newState;
    })
  }
  render () {
    const match = this.props.match;
    const playerOneName = this.state.playerOneName;
    const playerTwoName = this.state.playerTwoName;
    const playerOneImage = this.state.playerOneImage;
    const playerTwoImage = this.state.playerTwoImage;

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
