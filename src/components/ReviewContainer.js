import React from "react";

const ReviewContainer = props => {
    console.log(props.feedbacks)
  return (
      
    <div>
      <ul>
        {props.reviews.map(review => (
          <li> {review.content} </li>
        ))}
      </ul>
    </div>
  );
};

export default ReviewContainer;