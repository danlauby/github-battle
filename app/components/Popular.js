{/* Import required libraies */}
import React from 'react';
import PropTypes from 'prop-types';
{/* Import required components */}
import api from '../utils/api';
import Loading from './Loading';


{/* Select language in nav to display repos */}
{/* Popular nav bar of languages */}
{/* For each lang in nav */}
{/* If current lang === selected lang change color to red ('All' is default) */}
{/* Event listener for nav languages (give props lang property) */}
{/* Give each nav list-item a unique key with val of lang name */}
{/* Insert each lang into a list-item */}
function SelectLanguage(props) {
  const languages = ['All', 'JavaScript', 'Ruby', 'Java', 'CSS', 'Python'];
  return (
    <ul className='languages'>
      {languages.map((lang) => {
        return (
          <li
            style={lang === props.selectedLanguage ? {color: '#d0021b'} : null}
            onClick={props.onSelect.bind(null, lang)}
            key={lang}>
              {lang}
          </li>
        )
      })}
    </ul>
  )
}

{/* Create UI grid to display popular repos (pass props as parameter) */}
{/* For each repo return each response object's repo and index */}
{/* Give each repo unique key of repo's name */}
{/* Increment index to display github rankings */}
{/* Display avatar of Github owner of each repo */}
{/* Display username name of each Github repo (link to repo) */}
{/* Display user log-in name of each Github repo */}
{/* Display how many stars each Github repo has earned */}
const RepoGrid = (props) => {
  return (
    <ul className='popular-list'>
      {props.repos.map((repo, index) => {
        return (
          <li key={repo.name} className='popular-item'>
            <div className='popular-rank'>#{index + 1}</div>
            <ul className='space-list-items'>
              <li>
                <img
                className='avatar'
                src={repo.owner.avatar_url}
                alt={'Avatar for ' + repo.owner.login}
                 />
              </li>
              <li><a href={repo.html_url}>{repo.name}</a></li>
              <li>@{repo.owner.login}</li>
              <li>{repo.stargazers_count} stars</li>
            </ul>
          </li>
        )
      })}
    </ul>
  )
}

{/* Set restricted prop data-types for RepoGrid function */}
RepoGrid.propTypes = {
  repos: PropTypes.array.isRequired
}

{/* Set restricted prop data-types for SelectLanguage function */}
SelectLanguage.propTypes = {
  selectedLanguage: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired,
};

{/* After DOM renders update state of selected language */}
{/* Update state of selected language */}
{/* Call Github API and run fetch method to return selected language repos */}
{/* Pass SelectLanguage current language and update and display in grid */}
{/* If repos falsy, run Loading method */}
export default class Popular extends React.Component {
  state = {
      selectedLanguage: 'All',
      repos: null
    };

  componentDidMount() {
    this.updateLanguage(this.state.selectedLanguage);
  }

  updateLanguage = (lang) => {
    this.setState(() => {
      return {
        selectedLanguage: lang,
        repos: null
      }
    });

    api.fetchPopularRepos(lang)
    .then((repos) => {
      this.setState(() => {
        return {
          repos: repos,
        }
      })
    });
  }

  render() {
    return (
      <div>
        <SelectLanguage
        selectedLanguage={this.state.selectedLanguage}
        onSelect={this.updateLanguage}
        />
        {!this.state.repos
          ? <Loading />
          : <RepoGrid repos={this.state.repos} />}
      </div>
    )
  }
}
