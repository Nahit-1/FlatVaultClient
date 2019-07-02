import React from "react";

const ReviewContainer = props => {
    console.log(props.feedbacks)
  return (
      
    <div>
      <ul>
        {props.reviews.map(review => (
          <li> {review.content} </li> // Review.first.usergame.user.username example route to get review author name. 
        ))}
      </ul>
    </div>
  );
};

export default ReviewContainer;