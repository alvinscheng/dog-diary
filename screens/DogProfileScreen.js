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
import { connect } from 'react-redux'

export default class DogProfileScreen extends React.Component {
  static navigationOptions = {
    // Make dog name part of redux state
    title: 'Copper'
  }

  // async componentDidMount() {
  //   const res = await fetch('https://dog-diary.herokuapp.com/dogs')
  //   const dogs = await res.json()
  //   this.props.dispatch({
  //     type: 'ADDED_DOGS',
  //     payload: { dogs }
  //   })
  // }

  render() {
    // const { navigate } = this.props.navigation
    // const { dogs } = this.props

    return (
      <View style={styles.container}>
        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.contentContainer}>

          <View>
            <Button bordered info
              style={styles.getStartedButton}
              // onPress={() =>
              //   navigate('AddDog')
              // }
            >
              <Text>Add Photo</Text>
            </Button>
          </View>

        </ScrollView>
      </View>
    )
  }
}


// const mapStateToProps = state => {
//   return {
//     dogs: state
//   }
// }

// export default connect(mapStateToProps)(HomeScreen)

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
