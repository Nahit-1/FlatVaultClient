import React, { Component } from 'react'
import { Form, Button, Segment, Grid } from 'semantic-ui-react'

import { signup } from '../services/api'


class SignUpForm extends Component {
  state = {
      username: '',
      email: '',
      password: ''
  }

  handleSubmit = () => {
    // console.log(this.state)
    signup(this.state.username, this.state.email, this.state.password)
    .then(data => {
      if (data.error) {
        alert(data.error)
      } else {
          // console.log(this.props)
        this.props.signin(data)
      }
    })
  }

  handleChange = event =>
        this.setState({ [event.target.name]: event.target.value })

  render() {
    const { username, email, password } = this.state
    const { handleChange, handleSubmit } = this
    return (
        
        
     
        
        <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
        <Grid.Column style={{ maxWidth: 450 }}>
     <Segment stacked> 
      <Form>
        {/* <Form.Group widths='equal'> */}
          <Form.Input
            fluid icon='user' 
            iconPosition='left' 
            fluid label='Username' 
            placeholder='username' 
            name='username'
            value={username}
            onChange={handleChange}

        />
          <Form.Input 
            fluid icon='mail'
            iconPosition='left' 
            fluid label='Email' 
            placeholder='email' 
            name='email'
            value={email}
            onChange={handleChange}

        />
          <Form.Input 
            fluid icon='lock'
            iconPosition='left' 
            fluid label='Password' 
            placeholder='password'
            name='password'
            type='password'
            value={password}
            onChange={handleChange}

        />
          
        {/* </Form.Group> */}
        
        {/* <Form.Button>Submit</Form.Button> */}
        <Button onClick={handleSubmit} color='teal' fluid size='large'>
            Create New Account !
          </Button>
      </Form>
      </Segment>
      </Grid.Column>
      </Grid>
    )
  }
}

export default SignUpForm
