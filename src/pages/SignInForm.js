import React from 'react'

import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react'

import { signin } from '../services/api'

class SignInForm extends React.Component {   

    state = {
        username: '',
        password: ''
    }

    handleSubmit = () => {
        // console.log(this.state)
        signin(this.state.username, this.state.password)
        .then(data => {
          if (data.error) {
            alert(data.error)
          } else {
              console.log(this.props)
            this.props.signin(data)
          }
        })
      }
        // console.log(this.state)
        

    handleChange = event =>
        this.setState({ [event.target.name]: event.target.value })

    render() {
        const { username, password } = this.state
        const { handleChange, handleSubmit } = this


        return (
            <div>
  <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
    <Grid.Column style={{ maxWidth: 450 }}>
      <Header as='h2' color='teal' textAlign='center'>
        <Image src='Icon.game' /> Log-in to your account
      </Header>
      <Form size='large'>
        <Segment stacked>
          <Form.Input 
            fluid icon='user' 
            iconPosition='left' 
            placeholder='Username' 
            name='username'
            value={username}
            onChange={handleChange}
            />
          <Form.Input
            fluid icon='lock'
            iconPosition='left'
            placeholder='Password'
            type='password'
            name='password'
            value={password}
            onChange={handleChange}
          />

          <Button onClick={handleSubmit} color='teal' fluid size='large'>
            Login
          </Button>
        </Segment>
      </Form>
      <Message>
        New to FlatVault? <a href='#'>Sign Up</a>
      </Message>
    </Grid.Column>
  </Grid>
  </div>
        )
}
}

export default SignInForm 