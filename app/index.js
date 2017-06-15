// Import React needed modules and CSS file
var React = require('react');
var ReactDOM = require('react-dom');
require('./index.css');

// App Component
class Badge extends React.Component {
  render() {
    return (
      <div>
        <img
          src={this.props.img}
          alt='Avatar'
          style={{width: 100, height: 100}}
          />
          <h1>Name: {this.props.name}</h1>
          <h3>Username: {this.props.username}</h3>
      </div>
    )
  }
}

// Render App component
ReactDOM.render(
  <Badge
    name='Daniel Lauby'
    username='danlauby'
    img='https://avatars2.githubusercontent.com/u/19555802?v=3&s=460'
    />,
   document.getElementById('app')
);
