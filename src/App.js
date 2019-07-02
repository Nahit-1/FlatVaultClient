import React, {Component} from 'react';
import { Route, Switch, withRouter } from 'react-router-dom'


import Header from './pages/Header'
import NavBar from './components/NavBar'
import SignInForm from './pages/SignInForm'

import './App.css';
import 'semantic-ui-css/semantic.min.css'

import { validate } from './services/api'
import GameIndex from './pages/GameIndex'
import GameCard from './components/GameCard'




class App extends Component {

  state = {
    username: '',
    games: [],
    selectedGame: null,
  }

  signin = (user) => {
    this.setState({ username: user.username })
    localStorage.setItem('token', user.token)
    this.props.history.push('/allgames')
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
            console.log(this.state)
          }
        })
    }
  }

  selectGame = game => {
    this.setState({
      selectedGame: game
    })
  }

  deselectGame = () => {
    this.setState({
      selectedGame: null
    })
  }

  render() {
    const { signin, signout } = this
    const { username } = this.state
    return (
      <div className='App'>
        <NavBar />
        <Header username={username} signout={signout} />
        {/* <GameIndex games={ this.state.games }  /> */}
        <Switch>
          <Route 
            path='/allgames' 
            component={props => <GameIndex username={ username} {...props } />} 
          />
          <Route 
            path='/' 
            component={props => <SignInForm signin={signin} {...props} />}   
          /> 
          
          <Route 
            path='/login' 
            component={props => <SignInForm {...props} signin={signin} />} 
          />
          <Route 
            component={() => <h1>Page not found.</h1>}               
          />
        </Switch>
      </div>
    )
  }
}
export default withRouter(App)
