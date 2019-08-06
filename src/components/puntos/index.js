import React, {Component} from 'react'
import {View, Image, StyleSheet, Dimensions} from 'react-native'
import puntos from '../../../assets/images/puntos.png'
const maxWidth = Dimensions.get('window').width
export default class Puntos  extends Component {
  constructor(props){
    super(props)
  }

  render(){
    let {customStyle} = this.props
    return(
      <View style = {styles.main}>
        <Image source = {puntos} style = {customStyle? customStyle: styles.image} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  image: {
    height: 20,
    maxWidth: maxWidth
  },
  main: {
    alignItems: 'center',
    justifyContent: 'center'
  }
})