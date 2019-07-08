const baseUrl = 'http://localhost:3001'
const signinUrl = baseUrl + '/signin'
const validateUrl = baseUrl + '/validate'

const gamesUrl = baseUrl + "/games"

export function signin (username, password) {

    return fetch(signinUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ username: username, password: password })						
        }).then(resp => resp.json()) 
    }

export function validate () {
        return fetch(validateUrl, {
            headers: { 'Authorisation': localStorage.token }
        }).then(resp => resp.json())
    }

export function getAllGames () {
        return fetch(gamesUrl)
        .then(resp => resp.json())
}

export async function getGame (id) {
    let resp = await fetch(gamesUrl)
    let games = await resp.json()
    return games.find(game => parseInt(game.id) === parseInt(id))
}

export function getOwnedGames () {
        return fetch('http://localhost:3001/usergames', {
                headers: { 'Authorisation': localStorage.token }
        }).then(resp => resp.json())
}

export function signup (username, email, password) {
    return fetch('http://localhost:3001/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: username, email: email, password: password })
      }).then(resp => resp.json())
}

export function newUsergame ( user_id, game_id) {
    return fetch('http://localhost:3001/usergames', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user_id: user_id, game_id: game_id })
    }).then(resp => resp.json())
  }

export default { signin, validate, getAllGames, getGame, signup }