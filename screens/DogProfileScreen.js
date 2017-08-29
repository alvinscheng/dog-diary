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

class DogProfileScreen extends React.Component {
  static navigationOptions = {
    title: null
  }

  state = {
    photos: []
  }

  async componentWillReceiveProps(nextProps) {
    if (this.props.dog.id !== nextProps.dog.id) {
      const res = await fetch('http://localhost:3000/pictures/' + nextProps.dog.id)
      const photos = await res.json()
      this.setState({photos})
    }
  }

  render() {
    const { navigate } = this.props.navigation
    const { photos } = this.state

    return (
      <View style={styles.container}>
        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.contentContainer}>

          <View style={styles.getStartedContainer}>
            <Text style={styles.getStartedText}>
              {this.props.dog.name}
            </Text>
          </View>

          <View>
            <Button bordered info
              style={styles.getStartedButton}
              onPress={() =>
                navigate('AddPhoto')
              }
            >
              <Text>Add Photo</Text>
            </Button>
          </View>

          {
            photos.map((photo, i) => {
              return (
                <View key={i}>
                  <Image
                    source={{ uri: 'http://localhost:3000/uploads/' + photo.picture }}
                    style={{ width: 200, height: 200 }} />
                  <Text>{'Note: ' + photo.note}</Text>
                </View>
              )
            })
          }

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

export default connect(mapStateToProps)(DogProfileScreen)

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
    fontSize: 36,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center',
  },
  getStartedButton: {
    marginTop: 20,
    marginLeft: 140,
  },
});
