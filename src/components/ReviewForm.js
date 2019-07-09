import React from "react";
import Adapter from "../services/Adapter";

class ReviewForm extends React.Component {
  render() {
    return (
      <form class="ui form" onSubmit={this.processForm}>
        <div class="field">
          <label for="review">Leave a Review!</label>
          <input type="text" name="review" />
        </div>
      </form>
    );
  }

  processForm = e => {
    e.preventDefault();
    console.log(this.props)
    Adapter.newReview(e.target.review.value, this.props.game.id) 
    // Adapter.newReview(e.target.review.value, this.props.game.id, this.props.user.id)
      .then(review => this.props.addReview(review))
      .then((e.target.review.value = ""));
  };
}


export default ReviewForm;