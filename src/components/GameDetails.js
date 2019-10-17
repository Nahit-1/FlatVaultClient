import React, { Component } from "react";
import { Button, Header, Image, Modal, } from "semantic-ui-react";

import Adapter from "../services/Adapter"
import { getGame } from "../services/api"
import ReviewContainer from "../components/ReviewContainer"; // component to display all reviews.
import ReviewForm from "../components/ReviewForm" // component to create review
import { newUsergame } from '../services/api'
import { deleteUsergame } from '../services/api'

class GameDetails extends Component {
  state = {
    reviews: [],
    game: null,
    loading: true,
    userGame: null

  }

  addReview = (review) => {
      this.setState({reviews: [...this.state.reviews, review]})
  }

  handleSubmit = () => {
    // debugger
      newUsergame(this.props.user_id, this.state.game.id)
      .then(userGame => this.setState({ userGame }))
  }

  componentDidMount() {
    getGame(this.props.match.params.id)
    .then(game => {
      this.setState({ game }, () => {
        Adapter.getGameReviews(this.state.game.id)
        .then(reviews => this.setState({ reviews }, () => {
          this.setState({loading: false})
        }))
      })
    })
  }

  render() {
    //   console.log(this.props.game)
    return (
      !this.state.loading ?
      
      <Modal open={true} onClose={() => this.props.history.push('/allgames')}>
        <Modal.Header>{this.state.game.name}</Modal.Header>
        <Modal.Content image style={{backgroundColor:"#CAE4DB"}}>
          <Image
            wrapped size="large"
            src={this.state.game.imageurl}
            alt={this.state.game.slug}
          />
          <Modal.Description>
            <Header>User Reviews:</Header>
            <hr />


            <ReviewContainer reviews = { this.state.reviews } />
            {
            this.state.userGame 
            ? <ReviewForm addReview={this.addReview} game={this.state.game} game_id={this.state.game.id} user_id={this.props.user_id} reviews={this.state.reviews}/>
            : null
            }
          </Modal.Description>
        </Modal.Content>
        <Button 
                onClick={this.handleSubmit} 
                user_id={this.props.user_id} 
                game_id={this.state.game.id} 
                color='teal' 
                fluid size='large'>
            Add to Library!
          </Button>
          <Button 
                onClick={this.handleSubmit}
                usergame_id={this.state.usergame} >
                REMOVE FROM LIBRARY
           </Button>
      </Modal>
      :
      <div>LOADING</div>
    );
  }
}

export default GameDetails;
