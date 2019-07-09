var jwt = require('jsonwebtoken')

// import jwt from 'jsonwebtoken'


export function decode () {

    const token = localStorage.token
    var decoded = jwt.decode(token)
    return decoded.payload // decoded.payload.id fails to compile 
}

export default { decode }


