import React from 'react'

import { Link } from 'react-router-dom'

const HomePage = props =>
  <div>
    <h1>Home page!</h1>
    <Link to='/signin'>Signin</Link> | <Link to='/gameindex'>All Games</Link>
  </div>

export default HomePage