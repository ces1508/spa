import React, { Component } from 'react'
import {
  View,
  Image,
  TouchableHighlight
} from 'react-native'
import { Actions } from 'react-native-router-flux'
const imagePath = require('../../../assets/images/arrowLeft.png')

export default class ArrowLeft extends Component {
  render() {
    return(
      <View style = {{ position: 'absolute', top: 0, left:0 }}>
          <TouchableHighlight onPress = {() => Actions.pop()} style = {{padding: 10}}>
            <Image
              source = {imagePath}
              fadeDuration={0}
              style={{width: 35, height: 30, }}
            />
          </TouchableHighlight>
      </View>
    )
  }
}