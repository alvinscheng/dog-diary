import React from 'react'
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native'
import { Button } from 'native-base'
import { WebBrowser } from 'expo'
import { connect } from 'react-redux'

class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null,
  }

  state = {
    dogs: []
  }

  async componentDidMount() {
    // const res = await fetch('https://dog-diary.herokuapp.com/dogs')
    const res = await fetch('http://localhost:3000/dogs')
    const dogs = await res.json()
    this.setState({ dogs })
  }

  _pressDog = dog => {
    const { navigate } = this.props.navigation
    const { name, age, id } = dog
    this.props.dispatch({
      type: 'PICKED_DOG',
      payload: {
        dog: {name, age, id}
      }
    })
    navigate('Dog')
  }

  render() {
    const { navigate } = this.props.navigation
    const { dogs } = this.state

    return (
      <View style={styles.container}>
        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.contentContainer}>

          <View style={styles.getStartedContainer}>
            <Text style={styles.getStartedText}>
              Dog Diary
            </Text>
          </View>

          {
            dogs.map(dog => {
              return (
                <View key={ dog.id }
                  style={styles.dogsContainer}>
                  <TouchableHighlight onPress={() => this._pressDog(dog)}>
                    <Image
                      source={{ uri: 'http://localhost:3000/uploads/' + dog.profile_picture }}
                      style={{ width: 200, height: 200 }}/>
                  </TouchableHighlight>
                </View>
              )
            })
          }

          <View>
            <Button bordered info
              style={styles.getStartedButton}
              onPress={() =>
                navigate('AddDog')
              }>
              <Text>Add Dog</Text>
            </Button>
          </View>

        </ScrollView>
      </View>
    )
  }
}


const mapStateToProps = state => {
  return {
    dog: state
  }
}

export default connect(mapStateToProps)(HomeScreen)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    paddingTop: 30,
  },
  dogsContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  getStartedContainer: {
    alignItems: 'center',
  },
  getStartedText: {
    marginTop: 50,
    fontSize: 48,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center',
  },
  getStartedButton: {
    marginTop: 20,
    marginLeft: 140,
  },
});
