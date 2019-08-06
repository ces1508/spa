import React, {Component} from 'react'
import Icon from 'react-native-vector-icons/Ionicons'
import {
  Text
} from 'react-native'
export default class BtnFavoite extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return(
    <Icon.Button name = "ios-heart"
      color = {this.props.favorite? 'red': 'white'}
      style = {{backgroundColor: '#C9C9C9'}}
      onPress = {() => this.props.handlePress()}
      >
      <Text style={{fontSize: 12}}>
        {this.props.favorite?'Quitar de Favoritos': 'Agregar a Favoritos'}
      </Text>
    </Icon.Button>
    )
  }
}
