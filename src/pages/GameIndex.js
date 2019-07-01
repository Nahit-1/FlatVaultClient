import React from "react";
import GameCard from "../components/GameCard";
import { Card } from "semantic-ui-react";
import { getAllGames } from "../services/api"

class GameIndex extends React.Component {

  state = {
    games: []
  }

  componentDidMount = () => {
    if (!this.props.username) {
      this.props.history.push('/login')
    } else {
      getAllGames().then(games => this.setState({ games }))
    }
  }
  render() {
    return (
      <div >
        <Card.Group style={{display: 'flex', justifyContent:'center', direction:"column"}}>
          {this.state.games.map(game => (
            <GameCard
              key={ game.id }
              game={ game }
            //   selectGame={ this.props.selectGame }
            />
          ))}
        </Card.Group>
      </div>
    );
  }
}

export default GameIndex