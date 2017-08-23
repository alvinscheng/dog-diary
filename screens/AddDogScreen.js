import React, { Component } from 'react'
import PhotoSelector from '../components/ImagePicker';

export default class AddDogScreen extends Component {
  static navigationOptions = {
    title: 'Add Dog',
  }

  render() {
    return (
      <PhotoSelector />
    )
  }
}
