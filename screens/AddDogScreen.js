import React, { Component } from 'react'
import { Container, Header, Content, Form, Item, Input, Label, Button, Text } from 'native-base'
import PhotoSelector from '../components/ImagePicker'

export default class AddDogScreen extends Component {
  static navigationOptions = {
    title: 'Add Dog',
  }

  render() {
    return (
      <Container>
        <Header />
        <Content>
          <Form>
            <Item>
              <PhotoSelector />
            </Item>
            <Item floatingLabel>
              <Label>Name</Label>
              <Input />
            </Item>
            <Item floatingLabel>
              <Label>Age</Label>
              <Input />
            </Item>
            <Item>
              <Button bordered info>
                <Text>Submit</Text>
              </Button>
            </Item>
          </Form>
        </Content>
      </Container>
    )
  }
}
