import React, {Component} from 'react'
import {
  Text
} from 'react-native'

import Icon from 'react-native-vector-icons/Ionicons'
export default class BtnAddCart extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return(
      <Icon.Button name = "md-cart" style = {{backgroundColor: '#C9C9C9'}} color = 'yellow' onPress = {() => this.props.handlePress()}>
        <Text style = {{fontSize: 13}}> Agregar al Carro </Text>
      </Icon.Button>
    )
  }
}
