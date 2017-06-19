{/* Import requires libraries */}
import axios from 'axios';

{/* Add key and secret if api requires it */}
var id = "YOUR_CLIENT_ID";
var sec = "YOUR_SECRET_ID";
var params = "?client_id=" + id + "&client_secret=" + sec;

{/* Request username profiles object from Github */}
{/*  Return users with Axios library */}
{/* Promise gets user data after request is complete */}
function getProfile (username) {
  return axios.get('https://api.github.com/users/' + username + params)
    .then(function (user) {
      return user.data;
    });
}

{/* Request repos object from Github */}
{/* Return repos with Axios library, limit  to 100 repos per page */}
function getRepos (username) {
  return axios.get('https://api.github.com/users/' + username + '/repos' + params + '&per_page=100')
}

{/* Collect stargazer stars from repos and reduce array to a single number  */}
function getStarCount (repos) {
  return repos.data.reduce(function (count, repo) {
    return count + repo.stargazers_count;
  }, 0);
}

{/* Store followers property from profile object */}
{/* Call getStarCount method on repos object and store in followers variable */}
{/* Multiply users followers by 3, then add stars to detemine winner/loser */}
function calculateScore (profile, repos) {
  var followers = profile.followers;
  var totalStars = getStarCount(repos);
  return (followers * 3) + totalStars;
}


{/* Log error to console if !null */}
function handleError (error) {
  console.warn(error);
  return null;
}


{/* Call api requests and get all requests in promise and return in order */}
{/* Store profile and calculated score as properties */}
function getUserData (player) {
  return axios.all([
    getProfile(player),
    getRepos(player)
  ]).then(function (data) {
    var profile = data[0];
    var repos = data[1];
    return {
      profile: profile,
      score: calculateScore(profile, repos)
    }
  })
}

{/* Sort players by subtracting loser score from winners score */}
function sortPlayers (players) {
    return players.sort(function (a,b) {
      return b.score - a.score;
    })
}

{/* Export promise with profile, score of each player */}
{/* (battle property) Create a new object of both players, then call sorting method if no errors are caught */}
{/* (fetchPopularRepos property)  Encode english URL to UTF-8 URL */}
{/* Return popular repos (limit: 100) after encoding */}
{/* Export api to Results.js, Popular.js */}
module.exports = {
  battle: function (players) {
    return axios.all(players.map(getUserData))
      .then(sortPlayers)
      .catch(handleError)
  },
  fetchPopularRepos: function (language) {
    var encodedURI = window.encodeURI('https://api.github.com/search/repositories?q=stars:>1+language:'+ language + '&sort=stars&order=desc&type=Repositories');
    return axios.get(encodedURI)
      .then(function (response) {
        return response.data.items;
      });
  }
};
