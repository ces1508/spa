import React, { Component } from 'react'
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  TouchableHighlight,
} from 'react-native'
import {Actions} from 'react-native-router-flux'
import Icon from 'react-native-vector-icons/Ionicons'
const logo = require('../../../assets/images/logo.png')
const height = Dimensions.get('window').height
export default class ContentMenu extends Component {

  goFavorites() {
    // Actions.refresh({key: 'drawer', open: value => false });
    Actions.favorites()
  }

  handlePress(id , name) {
    Actions.refresh({key: 'drawer', open: value => false })
    Actions.main({ categoryId: id, categoryName: name, type: 'refresh' })
  }
  render() {
    return (
      <View style = { styles.main }>
        <View style = {styles.logo}>
          <Image source = {logo} style = {styles.logoImg}  resizeMode = "contain"/>
        </View>
        <View style = {styles.categories}>
          <TouchableHighlight onPress = {() => this.handlePress(105, 'Masajes')}>
            <View style = {styles.category}>
              <Text style = {styles.categoryName}>Masajes</Text>
              <Icon name = "ios-arrow-forward" size = {30} color = "white" />
            </View>
          </TouchableHighlight>
          <TouchableHighlight onPress = {() => this.handlePress(108, 'Belleza')}>
            <View style = {styles.category}>
              <Text style = {styles.categoryName}>Manicure</Text>
              <Icon name = "ios-arrow-forward" size = {30} color = "white" />
            </View>
          </TouchableHighlight>
          <TouchableHighlight onPress = {() => this.handlePress(121, 'Baber Shop')}>
            <View style = {styles.category}>
              <Text style = {styles.categoryName}>Pedicure</Text>
              <Icon name = "ios-arrow-forward" size = {30} color = "white" />
            </View>
          </TouchableHighlight>
          <TouchableHighlight onPress = {() => this.handlePress(110, "Manicure y Pedicure")}>
            <View style = {styles.category}>
              <Text style = {styles.categoryName}>Manicure y Pedicure</Text>
              <Icon name = "ios-arrow-forward" size = {30} color = "white" />
            </View>
          </TouchableHighlight>
          <TouchableHighlight onPress = {() => this.goFavorites()}>
            <View style = {styles.category}>
              <Text style = {styles.categoryName}> Mis Favoritos</Text>
              <Icon name = "ios-arrow-forward" size = {30} color = "white" />
            </View>
          </TouchableHighlight>
        </View>
      </View>
    )
  }
}

const styles = new StyleSheet.create({
  main: {
    backgroundColor: 'rgba(0,0,0,0.6)',
    flex: 1
  },
  logo: {
    height: height / 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoImg: {
    width: 130,
    height: 130
  },
  categories: {

  },
  category: {
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingRight: 10,
    paddingLeft: 10,

  },
  categoryName: {
    color: 'white',
    fontSize: 50,
    letterSpacing: 20,
    fontFamily: 'Amontillados',
    fontWeight: "400",
  }
})
