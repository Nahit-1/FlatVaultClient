import React from 'react'

import { Link } from 'react-router-dom'
import { Button } from 'semantic-ui-react'

import logo from '../logo.svg'

const Header = props =>
  <header className='App-header'>
    <Link to='/'><img src={logo} className='App-logo' alt='logo' /></Link>
    <h1 className='App-title'>
      {
        props.username
          ? `Welcome back, ${props.username}!`
          : 'Welcome to React.'
      }
      {
        props.username &&
        <Button onClick={props.signout} color='teal' fluid size='large'>
          Sign-Out
        </Button>
      }
    </h1>
  </header>

export default Header