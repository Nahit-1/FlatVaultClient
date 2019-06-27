import React, {Component} from 'react';
import { Route, Switch, withRouter } from 'react-router-dom'

import HomePage from './pages/HomePage'
import Header from './pages/Header'
import SignInForm from './pages/SignInForm'


import './App.css';

import 'semantic-ui-css/semantic.min.css'

import { validate } from './services/api'

class App extends Component {

  state = {
    username: ''
  }

  signin = (user) => {
    this.setState({ username: user.username })
    localStorage.setItem('token', user.token)
    this.props.history.push('/library')
  }

  signout = () => {
    this.setState({ username: ''}) // reverts username back to an empty string as per initial state. 
    localStorage.removeItem('token') // here we are removing the token on signout to prevent refresh = logged in
  }

  componentDidMount () {
    if (localStorage.token) {
      validate()
        .then(data => {
          if (data.error) {
            alert(data.error)
          } else {
            this.signin(data)
          }
        })
    }
  }

  render() {
    const { signin, signout } = this
    const { username } = this.state
    return (
      <div className='App'>
        <Header username={username} signout={signout} />
          <Switch>
          <Route path='/' component={props => <SignInForm signin={signin} {...props} />} /> 
          {/* <Route path='/signin' component={props => <SignInForm {...props} signin={signin} />} /> */}
          <Route component={() => <h1>Page not fucking found.</h1>} />
          </Switch>
      </div>
    )
  }
}


export default withRouter(App)
