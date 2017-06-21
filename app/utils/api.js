{/* Import requires libraries */}
import axios from 'axios';

{/* Add key and secret if api requires it */}
const id = "YOUR_CLIENT_ID";
const sec = "YOUR_SECRET_ID";
const params = "?client_id=" + id + "&client_secret=" + sec;

{/* Request username profiles object from Github */}
{/*  Return users with Axios library */}
{/* Promise gets user data after request is complete */}
const getProfile = (username) => {
  return axios.get('https://api.github.com/users/' + username + params)
    .then((user) => {
      return user.data;
    });
}

{/* Request repos object from Github */}
{/* Return repos with Axios library, limit  to 100 repos per page */}
const getRepos = (username) => {
  return axios.get('https://api.github.com/users/' + username + '/repos' + params + '&per_page=100')
}

{/* Collect stargazer stars from repos and reduce array to a single number  */}
const getStarCount = (repos) => {
  return repos.data.reduce((count, repo) => {
    return count + repo.stargazers_count;
  }, 0);
}

{/* Store followers property from profile object */}
{/* Call getStarCount method on repos object and store in followers constiable */}
{/* Multiply users followers by 3, then add stars to detemine winner/loser */}
const calculateScore = (profile, repos) => {
  const followers = profile.followers;
  const totalStars = getStarCount(repos);
  return (followers * 3) + totalStars;
}


{/* Log error to console if !null */}
const handleError = (error) => {
  console.warn(error);
  return null;
}


{/* Call api requests and get all requests in promise and return in order */}
{/* Store profile and calculated score as properties */}
const getUserData = (player) => {
  return axios.all([
    getProfile(player),
    getRepos(player)
  ]).then((data) => {
    const profile = data[0];
    const repos = data[1];
    return {
      profile: profile,
      score: calculateScore(profile, repos)
    }
  })
}

{/* Sort players by subtracting loser score from winners score */}
const sortPlayers = (players) => {
    return players.sort((a,b) => {
      return b.score - a.score;
    })
}

{/* Export promise with profile, score of each player */}
{/* (battle property) Create a new object of both players, then call sorting method if no errors are caught */}
{/* (fetchPopularRepos property)  Encode english URL to UTF-8 URL */}
{/* Return popular repos (limit: 100) after encoding */}
{/* Export api to Results.js, Popular.js */}
module.exports = {
  battle: (players) => {
    return axios.all(players.map(getUserData))
      .then(sortPlayers)
      .catch(handleError)
  },
  fetchPopularRepos: (language) => {
    const encodedURI = window.encodeURI('https://api.github.com/search/repositories?q=stars:>1+language:'+ language + '&sort=stars&order=desc&type=Repositories');
    return axios.get(encodedURI)
      .then((response) => {
        return response.data.items;
      });
  }
};
