import React from 'react'
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native'
import { Button, Item } from 'native-base'
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
            <Text style={styles.dogName}>
              {this.props.dog.name}
            </Text>
            <Text style={styles.dogAge}>
              {'age: ' + this.props.dog.age}
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

          <View style={{ flex: 1, flexDirection: 'row', flexWrap: 'wrap' }}>
            {
              photos.map((photo, i) => {
                return (
                  <Item key={i}>
                    <Image
                      source={{ uri: 'http://localhost:3000/uploads/' + photo.picture }}
                      style={{ width: 100, height: 100 }} />
                  </Item>
                )
              })
            }
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
  dogName: {
    fontSize: 36,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center',
  },
  dogAge: {
    fontSize: 18,
    color: 'black',
    textAlign: 'center',
  },
  getStartedButton: {
    marginTop: 20,
    marginLeft: 140,
  },
});
