import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import Feed from './components/Feed'
//import Header from './components/Header'
import 'typeface-roboto'
import NavBar from './components/NavBar';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';


class App extends Component {
  render() {
    //const pathname = window.location.pathname
    const { classes } = this.props
    return (
      <div >
        <NavBar />
        <Switch >
            <Route exact path="/" component={Feed} />
            <Route exact path="/login" component={SignIn}/>
            <Route exact path="/signup" component={SignUp}/>
        </Switch>
      </div>
    );
  }
}

export default App;
