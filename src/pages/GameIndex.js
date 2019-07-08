import React from "react";
import GameCard from "../components/GameCard";
import GameDetails from '../components/GameDetails';
import { Card } from "semantic-ui-react";
// import { getAllGames } from "../services/api";
import { Route } from 'react-router-dom';

class GameIndex extends React.Component {

  selectGame = game => {
    this.props.history.push(`${this.props.match.url}/${game.id}`)
    // this.setState({
    //   selectedGame: null
    // })
    // document.querySelector("div.ui.modal.transition.visible.active").style.display = "none"
  }

  componentDidMount = () => {
    if (!this.props.username) {
      this.props.history.push('/login')
    }
  }

  render() {
    return (
      <>
      <Route path={this.props.match.url} render={ () => 
        <div >
        <Card.Group style={{display: 'flex', justifyContent:'center', direction:"column"}}>
          {this.props.games.map(game => (
            <GameCard
              key={ game.id }
              game={ game }
              selectGame={ this.selectGame }
            />
          ))
          }
        </Card.Group>
      </div>
      } />
      <Route path={`${this.props.match.url}/:id`} component={props => <GameDetails {...props }/>} />
      </>
    );
  }
}

export default GameIndex