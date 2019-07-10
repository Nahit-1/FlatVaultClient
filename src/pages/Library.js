import React from 'react'
import GameCard from '../components/GameCard'
import GameDetails from '../components/GameDetails'
import { Card } from "semantic-ui-react"

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
    
    

      render() {
        return (
          <div >
            <Card.Group style={{display: 'flex', justifyContent:'center', direction:"column"}}>
              {this.state.games.map(game => (
                <GameCard
                  key={ game.id }
                  game={ game }
                  // selectGame={ this.props.selectGame }
                />
              ))}
            </Card.Group>
          </div>
        );
      }

}

export default Library