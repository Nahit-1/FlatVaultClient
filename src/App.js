import React, {Component} from 'react';
import { Route, Switch, withRouter } from 'react-router-dom'


import Header from './pages/Header'
import NavBar from './components/NavBar'
import SignInForm from './pages/SignInForm'
import SignUpForm from './pages/SignUpForm'
import Library from './pages/Library'


import './App.css';
import 'semantic-ui-css/semantic.min.css'

import { validate, getAllGames } from './services/api'
import GameIndex from './pages/GameIndex'
import GameCard from './components/GameCard'
import GameDetails from './components/GameDetails'



class App extends Component {

  state = {
    games: [],
    selectedGame: null,
    searchTerm: '',
    filterByGenre: '',
    user: '',
    // id: null
  }

  signin = (user) => {
    // console.log(user)
    this.setState({ user: user })
    localStorage.setItem('token', user.token)
    this.props.history.push('/allgames')
  }

  signout = () => {
    this.setState({ user: '' }) // reverts username back to an empty string as per initial state. 
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
            getAllGames().then(games => {
              this.setState({ games })
            })
            // console.log(this.state)
          }
        })
    }
  }

  handleGenreFilter = e => {
    e.target.value === 'No Filter'
      ? this.setState({ filterByGenre: "" })
      : this.setState({ filterByGenre: e.target.value })
  }

  filterGamesByGenre = collection => {
    if (this.state.filterByGenre) {
      return collection.filter(game => {
        return game.genre.toLowerCase() === this.state.filterByGenre
      })
    } else {
      return collection
    }
  }
  handleSearch = e => {
    this.setState({ searchTerm: e.target.value.toLowerCase() })
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
    // return this.filterBySearch(collection)
    return this.filterBySearch(
      this.filterGamesByGenre(collection)
    )
  }

  render() {
    const { signin, signout } = this
    const { user } = this.state
    return (
      <div className='App'>
        <NavBar handleSearch={this.handleSearch} searchTerm={this.state.searchTerm} handleGenreFilter={this.handleGenreFilter} />
        {/* <SignUpForm signin={this.signin}/> */}
        <Header username={this.state.user.username} signout={signout} />
        {/* <GameIndex games={ this.state.games }  /> */}
        {/* {this.state.selectedGame && (
          <GameDetails
            game={this.state.selectedGame}
            deselectGame={this.deselectGame}
          />
        )} */}
        <Switch>
        <Route 
            path='/library'
            component={props => <Library signup={this.signup} signin={this.signin} {...props} />}
          />
        <Route 
            path='/signupform'
            component={props => <SignUpForm signup={this.signup} signin={this.signin} {...props} />}
          />
          <Route 
            path='/allgames' 
            component={props => <GameIndex games={this.applySearchToIndex(this.state.games)} id={this.state.id} user={this.state.user} selectGame={this.selectGame} username={ this.state.user.username} {...props } />} 
          />
          <Route 
            path='/' 
            component={props => <SignInForm signin={signin} {...props} />}   
          /> 
          
          <Route 
            path='/login' 
            component={props => <SignInForm {...props} signin={signin} />} 
          />
          {/* <Route 
            path='/signupform'
            component={props => <SignUpForm signup={this.signup} signin={this.signin} {...props} />}
          /> */}
          <Route 
            component={() => <h1>Page not found.</h1>}               
          />
        </Switch>
      </div>
    )
  }
}


export default withRouter(App)
