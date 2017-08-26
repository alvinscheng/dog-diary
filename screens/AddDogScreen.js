import React, { Component } from 'react'
import { Container, Content, Form, Item, Input, Label, Button, Text } from 'native-base'
import { Image, View, StyleSheet } from 'react-native'
import { ImagePicker } from 'expo'
import { connect } from 'react-redux'

class AddDogScreen extends Component {
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
    const filename = image.split('/').pop()
    let match = /\.(\w+)$/.exec(filename)
    let type = match ? `image/${match[1]}` : `image`

    const formData = new FormData()
    formData.append('name', name)
    formData.append('age', age)
    formData.append('profile_picture', {
      uri: image,
      name: filename,
      type
    })

    // const res = await fetch('https://dog-diary.herokuapp.com/dogs', {
    const res = await fetch('http://localhost:3000/dogs', {
      method: 'POST',
      body: formData,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'multipart/form-data'
      }
    })

    const { navigate } = this.props.navigation
    navigate('Home')
  }

  render() {
    let { image } = this.state

    return (
      <Container style={styles.container}>
        <Content style={styles.contentContainer}>
          <Form>
            <Item floatingLabel>
              <Label>Name</Label>
              <Input onChangeText={name => this.setState({name})}/>
            </Item>
            <Item floatingLabel>
              <Label>Age</Label>
              <Input onChangeText={age => this.setState({age})}/>
            </Item>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
              {image &&
                <Image source={{ uri: image }} style={{ width: 200, height: 200, marginTop: 20 }} />}
              <Button bordered info
                style={styles.photoButton}
                onPress={this._pickImage}>
                <Text>Select Photo</Text>
              </Button>
            </View>
            <View>
              <Button bordered info
                style={styles.submitButton}
                onPress={this._addDog}>
                <Text>Submit</Text>
              </Button>
            </View>
          </Form>
        </Content>
      </Container>
    )
  }
}

const mapStateToProps = state => {
  return {
    dogs: state
  }
}

export default connect(mapStateToProps)(AddDogScreen)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    paddingTop: 20,
  },
  photoButton: {
    marginTop: 10,
    marginLeft: 120,
  },
  submitButton: {
    marginTop: 10,
    marginLeft: 140,
  },
});
