import React, {Component} from 'react';
import { Route, Switch, withRouter } from 'react-router-dom'


import Header from './pages/Header'
import NavBar from './components/NavBar'
import SignInForm from './pages/SignInForm'
import SignUpForm from './pages/SignUpForm'
import Library from './pages/Library'


import './App.css';
import 'semantic-ui-css/semantic.min.css'

import { validate } from './services/api'
import GameIndex from './pages/GameIndex'
import GameCard from './components/GameCard'
import GameDetails from './components/GameDetails'



class App extends Component {

  state = {
    username: '',
    games: [],
    selectedGame: null,
    searchTerm: '',
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

  handleSearch = e => {
    this.setState({ searchTerm: e.target.value.toLowerCase() })
  }

  selectGame = game => {
    // console.log(game)
    this.setState({
    
      selectedGame: game

    })
  }

  deselectGame = () => {
    this.setState({
      selectedGame: null
    })
    // document.querySelector("div.ui.modal.transition.visible.active").style.display = "none"
  }

  filterBySearch = collection => {
    return collection.filter(game => {
      if (this.state.searchTerm) {
        return game.name.toLowerCase().includes(this.state.searchTerm)
      } else {
        return true
      }
    })
  }

  applySearchToIndex =  (collection) => {
    return this.filterBySearch(collection)
  }

  render() {
    const { signin, signout } = this
    const { username } = this.state
    return (
      <div className='App'>
        <NavBar handleSearch={this.handleSearch} searchTerm={this.state.searchTerm} />
        {/* <SignUpForm signin={this.signin}/> */}
        <Header username={username} signout={signout} />
        {/* <GameIndex games={ this.state.games }  /> */}
        {this.state.selectedGame && (
          <GameDetails
            game={this.state.selectedGame}
            deselectGame={this.deselectGame}
          />
        )}
        <Switch>
        <Route 
            path='/signupform'
            component={props => <SignUpForm signup={this.signup} signin={this.signin} {...props} />}
          />
          <Route 
            path='/allgames' 
            component={props => <GameIndex games={this.applySearchToIndex(this.state.games)} selectGame={this.selectGame} username={ username} {...props } />} 
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
            path='/library'
            component={props => <Library signup={this.signup} signin={this.signin} {...props} />}
          />
          {/* <Route 
            path='/signupform'
            component={props => <SignUpForm signup={this.signup} signin={this.signin} {...props} />}
          /> */}
          <Route
            path='/mygames'
            compnent={props => <SignInForm signin={signin} {...props} />}
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
