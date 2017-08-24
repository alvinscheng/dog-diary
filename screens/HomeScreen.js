import React from 'react'
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native'
import { Button } from 'native-base'
import { WebBrowser } from 'expo'

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null,
  }

  state = {
    dogs: []
  }

  async componentDidMount() {
    const res = await fetch('https://dog-diary.herokuapp.com/dogs')
    const dogs = await res.json()
    this.setState({ dogs })
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
            dogs.map((dog, i) => {
              return (
                <View key={ i }
                  style={styles.dogsContainer}>
                  <Image source={{ uri: dog.profile_picture }} style={{ width: 200, height: 200 }} />
                  <Text>{'Name: ' + dog.name}</Text>
                  <Text>{'Age: ' + dog.age}</Text>
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
