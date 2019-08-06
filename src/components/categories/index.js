import React, {Component} from 'react'
import {View, Image, Dimensions, StyleSheet, TouchableHighlight} from 'react-native'
import { Actions } from 'react-native-router-flux'

const width = Dimensions.get('window').width


export default class CateogiesMenu extends Component {
  constructor(){
    super()
  }

  goProductsByCategories(id, name) {
    Actions.main({ categoryId: id, categoryName: name, type: 'refresh' })
  }
  render(){
    return (
      <View style = {styles.main}>
        <TouchableHighlight onPress = {() => this.goProductsByCategories(105, 'Masajes')}>
          <View>
            <Image
              source = {require('../../../assets/images/platos.png')}
              style = {styles.category}
              resizeMode = 'contain'
            />
          </View>
        </TouchableHighlight>
        <TouchableHighlight onPress = {() => this.goProductsByCategories(108, 'Belleza')}>
          <View>
            <Image
              source = {require('../../../assets/images/manicure.png')}
              style = {styles.category}
              resizeMode = 'contain'
            />
          </View>
        </TouchableHighlight>
        <TouchableHighlight onPress = {() => this.goProductsByCategories(113, 'Baber Shop')}>
          <View>
            <Image
              source = {require('../../../assets/images/pedicure-icon.png')}
              style = {styles.category}
              resizeMode = 'contain'
            />
          </View>
        </TouchableHighlight>
        <TouchableHighlight onPress = {() => this.goProductsByCategories(110, "Manicure y Pedicure")}>
          <View>
            <Image
              source = {require('../../../assets/images/snack.png')}
              resizeMode = 'contain'
              style = {styles.category}
            />
          </View>
        </TouchableHighlight>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  main: {
    width: width,
    height:50,
    flexDirection: 'row'
  },
  category: {
    width: width / 5,
    height: 45,
    marginLeft: 2
  },
  categoryName: {
    fontFamily: 'beyond_the_mountains',
    color: 'white',
    position: 'absolute',
    bottom: 0,
    paddingLeft: 10,
  }
})
