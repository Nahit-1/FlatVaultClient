import React, { Component } from "react";
import { Button, Header, Image, Modal, } from "semantic-ui-react";

import Adapter from "../services/Adapter"
import ReviewContainer from "../components/ReviewContainer"; // component to display all reviews.
import ReviewForm from "../components/ReviewForm" // component to create review
import { newUsergame } from '../services/api'

class GameDetails extends Component {
  state = {
    reviews: [],
  }

  addReview = (review) => {
      this.setState({reviews: [...this.state.reviews, review]})
  }

  handleSubmit = () => {
      newUsergame(this.user.id, this.game.id)
  }

  componentDidMount() {
    Adapter.getGameReviews(this.props.game.id)
    .then(reviews => this.setState({ reviews }))
  }



  render() {
    //   console.log(this.props.game)
    return (
      <Modal open={this.props.game} onClose={ this.props.deselectGame }>
        <Modal.Header>{this.props.game.name}</Modal.Header>
        <Modal.Content image style={{backgroundColor:"#CAE4DB"}}>
          <Image
            wrapped size="large"
            src={this.props.game.imageurl}
            alt={this.props.game.slug}
          />
          <Modal.Description>
            <Header>User Reviews:</Header>
            <hr />


            <ReviewContainer reviews = { this.state.reviews } />
            <ReviewForm addReview={this.addReview} game={this.props.game} game_id={this.props.game_id} reviews={this.state.reviews}/>
          </Modal.Description>
        </Modal.Content>
        <Button onClick={this.handleSubmit} color='teal' fluid size='large'>
            Add to Library!
          </Button>
      </Modal>
    );
  }
}

export default GameDetails;
