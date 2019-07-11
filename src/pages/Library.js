import React from 'react'
import GameCard from '../components/GameCard'
import GameDetails from '../components/GameDetails'
import { Card } from "semantic-ui-react"

import { Route } from 'react-router-dom'

import { getOwnedGames } from "../services/api" 


class Library extends React.Component {

    state = {
        games: []
      }

    // componentDidMount = () => {
    //     if (!this.props.username) {
    //       this.props.history.push('/login')
    //     } else {
    //       getOwnedGames().then(games => this.setState({ games }))
    //     }
    //   }

    componentDidMount = () => {
        getOwnedGames().then(games => this.setState({ games }))
      }

      selectGame = game => {
        this.props.history.push(`/allgames/${game.id}`)
        // this.setState({
        //   selectedGame: null
        // })
        // document.querySelector("div.ui.modal.transition.visible.active").style.display = "none"
      }
    
    

      render() {
        return (
          <div >
            <Card.Group style={{display: 'flex', justifyContent:'center', direction:"column"}}>
              {this.state.games.map(game => (
                <GameCard
                  key={ game.id }
                  game={ game }
                  selectGame={ this.selectGame }
                />
                
              ))}
            </Card.Group>
          </div>
        );
      }

}

export default Library