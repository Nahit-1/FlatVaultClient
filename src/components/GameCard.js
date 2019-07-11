import React from "react";
import { Card, Rating, Image } from "semantic-ui-react";


class GameCard extends React.Component {
  render() {
    const { game } = this.props

    return (
      <Card className="link" style={{backgroundColor:"#1c77ac"}}>
        <Card.Content onClick={() => this.props.selectGame(game)}>
          <Card.Header> {game.name} </Card.Header>
        </Card.Content>
        <Image
          onClick={() => this.props.selectGame(game)}
          src={game.imageurl}
          alt={game.slug}
          title={game.slug}
          style={{ height: "250px" }}
          fluid
        />
        <Card.Content>
          <Card.Description>
            Rating: {game.metacritic ? game.metacritic : "No Rating"}
          </Card.Description>
          <Card.Description>
            {/* Comments: {game.metacritic ? game.metacritic : "No Rating"} */}
          </Card.Description>
          <Card.Description>Genre: {game.genre}</Card.Description>
          <Rating className="star" maxRating="5" size="huge" />
        </Card.Content>
      </Card>
    );
  }
}

export default GameCard
