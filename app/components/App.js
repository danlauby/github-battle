{/* Import required labraries and components */}
var React = require('react');
var Popular = require('./Popular');
var ReactRouter = require('react-router-dom');
var Router = ReactRouter.BrowserRouter;
var Route = ReactRouter.Route;
var Switch = ReactRouter.Switch;
var Nav = require('./Nav');
var Home = require('./Home');
var Battle = require('./Battle');
var Results = require('./Results');

{/* Inject Nav component */}
{/* Define routes using react-router (router, route switch) library */}
{/* Set home and battle routes to 'exact' so battle won't render when battle/results renders */}
{/* 404 route displays if error thrown */}
class App extends React.Component {
  render() {
    return (
      <Router>
        <div className='container'>
          <Nav />
          <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/battle' component={Battle} />
            <Route path='/battle/results' component={Results} />
            <Route path='/popular' component={Popular} />
            <Route render={function () {
              return<p>Not Found</p>
            }} />
          </Switch>
        </div>
      </Router>
    )
  }
}

{/* Export App component to  */}
module.exports = App;
