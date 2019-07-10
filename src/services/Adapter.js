class Adapter {
    static getGameReviews(game_id) {
      return fetch(`http://localhost:3001/games/${game_id}/reviews`).then(res =>
        res.json()
      );
    }
  
    static newReview (content, user_id, game_id) {
      return fetch('http://localhost:3001/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: content, user_id: user_id, game_id: game_id })
      }).then(resp => resp.json())
    }
  
  }
  
  export default Adapter;
  