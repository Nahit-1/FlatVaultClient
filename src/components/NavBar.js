import React, { Component } from 'react'
import { Menu } from 'semantic-ui-react'
// import { Link } from 'react-router-dom'
import Search from './Search'
import GenreFilter from './GenreFilter'

export default class NavBar extends Component {
  state = {}

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    const { activeItem } = this.state

    return (
      <Menu style={{backgroundColor:"#393f4d"}}>
        <Menu.Item name='browse' active={activeItem === 'browse'} onClick={this.handleItemClick}>
        <a href='/allgames'> All Games </a>
        </Menu.Item>

        <Menu.Item name='submit' active={activeItem === 'submit'} onClick={this.handleItemClick}>
        <a href='/library'> My Games </a>
        </Menu.Item>

        

        <Menu.Menu position='right'>
        <Menu.Item >
          <GenreFilter handleGenreFilter={this.props.handleGenreFilter} />
        </Menu.Item>
          <Menu.Item>
            <Search handleSearch={this.props.handleSearch} search={this.props.search} />
          </Menu.Item>
          {/* <Menu.Item name='signup' active={activeItem === 'signup'} onClick={this.handleItemClick}>
            Sign Up
          </Menu.Item> */}

          <Menu.Item name='help' active={activeItem === 'help'} onClick={this.props.signout}>
            Sign out 
          </Menu.Item>
         
        </Menu.Menu>
      </Menu>
    )
  }
}
