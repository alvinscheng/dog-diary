import React, { Component } from 'react'
import { Container, Header, Content, Form, Item, Input, Label, Button, Text } from 'native-base'
import { Image, View } from 'react-native'
import { ImagePicker } from 'expo'

export default class AddDogScreen extends Component {
  static navigationOptions = {
    title: 'Add Dog',
  }

  state = {
    image: null,
    name: '',
    age: ''
  }

  _pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
    });

    console.log(result);

    if (!result.cancelled) {
      this.setState({ image: result.uri });
    }
  }

  _addDog = async () => {
    const {name, age, image} = this.state
    const data = {
      name: name,
      age: age,
      profile_picture: image
    }
    const res = await fetch('http://localhost:3000/dogs', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: { 'Content-Type': 'application/json' }
    })
    
    const { navigate } = this.props.navigation
    navigate('Home')
  }

  render() {
    let { image } = this.state

    return (
      <Container>
        <Header />
        <Content>
          <Form>
            <Item>
              <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Button onPress={this._pickImage}>
                  <Text>Select Photo</Text>
                </Button>
                {image &&
                  <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
              </View>
            </Item>
            <Item floatingLabel>
              <Label>Name</Label>
              <Input onChangeText={name => this.setState({name})}/>
            </Item>
            <Item floatingLabel>
              <Label>Age</Label>
              <Input onChangeText={age => this.setState({age})}/>
            </Item>
            <Item>
              <Button bordered info
                onPress={this._addDog}>
                <Text>Submit</Text>
              </Button>
            </Item>
          </Form>
        </Content>
      </Container>
    )
  }
}
