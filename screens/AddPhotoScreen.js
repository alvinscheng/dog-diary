import React, { Component } from 'react'
import { Container, Content, Form, Item, Input, Label, Button, Text } from 'native-base'
import { Image, View, StyleSheet } from 'react-native'
import { ImagePicker } from 'expo'
import { connect } from 'react-redux'

export default class AddPhotoScreen extends Component {
  static navigationOptions = {
    title: 'Add Photo',
  }

  state = {
    image: null,
    note: ''
  }

  _pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
    });

    if (!result.cancelled) {
      this.setState({ image: result.uri });
    }
  }

  _addPhoto = async () => {
    const {note, image} = this.state
    const filename = image.split('/').pop()
    let match = /\.(\w+)$/.exec(filename)
    let type = match ? `image/${match[1]}` : `image`

    const formData = new FormData()
    formData.append('note', note)
    formData.append('picture', {
      uri: image,
      name: filename,
      type
    })

    // const res = await fetch('https://dog-diary.herokuapp.com/dogs', {
    const res = await fetch('http://localhost:3000/pictures/1', {
      method: 'POST',
      body: formData,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'multipart/form-data'
      }
    })

    const { navigate } = this.props.navigation
    navigate('Dog')
  }

  render() {
    let { image } = this.state

    return (
      <Container style={styles.container}>
        <Content style={styles.contentContainer}>
          <Form>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
              {image &&
                <Image source={{ uri: image }} style={{ width: 200, height: 200, marginTop: 20 }} />}
              <Button bordered info
                style={styles.photoButton}
                onPress={this._pickImage}>
                <Text>Select Photo</Text>
              </Button>
            </View>
            <Item regular>
              <Input placeholder='Add comments here'
                multiline={true}
                style={{height: 100, width: 200}}
                onChangeText={note => this.setState({note})}/>
            </Item>
            <View>
              <Button bordered info
                style={styles.submitButton}
                onPress={this._addPhoto}>
                <Text>Submit</Text>
              </Button>
            </View>
          </Form>
        </Content>
      </Container>
    )
  }
}

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
