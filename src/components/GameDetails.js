import React, { Component } from "react";
import { Button, Header, Image, Modal, } from "semantic-ui-react";

import Adapter from "../Adapter";
import ReviewContainer from "./ReviewContainer"; // need to create component to display all reviews.
import ReviewForm from "./ReviewForm" // need to make component to create review

class GameDetails extends Component {
  state = {
    reviews: [],
  }

  addReview = (review) => {
      this.setState({reviews: [...this.state.reviews, review]})
  }

  componentDidMount() {
    Adapter.getGameReviews(this.props.game.id)
    .then(reviews => this.setState({ reviews }))
  }



  render() {
    return (
      <Modal open={this.props.game} onClose={ this.props.deselectGame }>
        <Modal.Header>{this.props.game.name}</Modal.Header>
        <Modal.Content image style={{backgroundColor:"#CAE4DB"}}>
          <Image
            wrapped
            size="large"
            src={this.props.game.imageurl}
            alt={this.props.game.slug}
          />
          <Modal.Description>
            <Header>Feedback:</Header>
            <hr />
            <FeedbackContainer feedbacks = { this.state.reviews } />
            <FeedbackForm addReview={this.addReview} game={this.props.game} game_id={this.props.game_id} reviews={this.state.reviews}/>
          </Modal.Description>
        </Modal.Content>
      </Modal>
    );
  }
}

export default GameDetails;
