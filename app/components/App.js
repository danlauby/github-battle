{/* Import required labraries and components */}
import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import  Battle  from './Battle';
import  Home  from './Home';
import  Nav  from './Nav';
import  Popular  from './Popular';
import  Results  from'./Results';

{/* Inject Nav component */}
{/* Define routes using react-router (router, route switch) library */}
{/* Set home and battle routes to 'exact' so battle won't render when battle/results renders */}
{/* 404 route displays if error thrown */}
class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
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
      </BrowserRouter>
    )
  }
}

{/* Export App component to  */}
module.exports = App;
