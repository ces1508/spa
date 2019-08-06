import React, { Component } from 'react'
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableHighlight,
  Dimensions
} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import {Actions} from 'react-native-router-flux'
import Categories from '../categories'
const menuIcon = require('../../../assets/images/menu.png')
const arrowIcon = require('../../../assets/images/arrowLeft.png')
import logo from '../../../assets/images/logo.png'
import ModalView from '../modal'
const width = Dimensions.get('window').width

export default class Bar extends Component {
  constructor(props) {
    super(props)
    this.goToCart = this.goToCart.bind(this)
    this.state = { modal: false }
    this.toogleModal = this.toogleModal.bind(this)
    this.renderModal = this.renderModal.bind(this)
  }

  goToCart() {
    Actions.cart()
  }

  toogleModal() {
    this.setState({ modal: !this.state.modal })
  }
  renderModal() {
    return <ModalView show = {this.state.modal} handlePress = {this.toogleModal}/>
  }

  renderTitleCategory() {
    if (this.props.options) {
      return(
        <View style = {{flexDirection: 'row', height: 40, backgroundColor: 'rgba(0,0,0,0.2)', justifyContent: 'space-around'}}>
          <Image
            style={{width: 40, height: 40,}}
            resizeMode = 'contain'
            source = {logo}

          />
          <View style = {{alignItems: 'center', flex: 1}}>
            <Text style = {{fontFamily: 'Amontillados', fontSize: 50, color: 'white', letterSpacing: 20, textAlign: 'left', }}> {this.props.categoryName} </Text>
          </View>
          <TouchableHighlight onPress = {() => this.toogleModal()}>
            <View style = {{paddingHorizontal: 10}}>
                <Image
                  source = {require('../../../assets/images/pregunta.png')}
                  fadeDuration={0}
                  resizeMode = "contain"
                  style={{width: 35, height: 35, paddingLeft: 20}}
                />
            </View>
          </TouchableHighlight>
        </View>
      )
    }
  }

  render() {
    return (
      <View stsyle = {styles.main}>
        {this.renderTitleCategory()}
        <View style = {styles.options}>
          <View style = {styles.btnMenu}>
            <TouchableHighlight onPress = {this.props.handlePress}>
              <Image
                source = {this.props.icon === 'menu'? menuIcon: arrowIcon}
                fadeDuration={0}
                style={{width: 35, height: 30}}

              />
            </TouchableHighlight>
          </View>
          {this.props.options?
            <View style = {{paddingTop: 5}}>
              <Categories />
            </View>

          : <View style = {{flex: 1}}>
              <Text style = {styles.title}> {this.props.title.toUpperCase()} </Text>
            </View>}
          {this.props.cart?
            <View style = {{ paddingRight: 10}}>
              <TouchableHighlight onPress = {this.goToCart}>
                <Image
                  source = {require('../../../assets/images/carrito.png')}
                  fadeDuration={0}
                  resizeMode = "contain"
                  style={{width: 35, height: 35, paddingLeft: 20}}
                />
              </TouchableHighlight>
            </View>

          :null}
        </View>
        {this.state.modal? this.renderModal(): null}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    position: 'absolute',
    left: 0,
    top: 0,
    right: 0,
    zIndex: 200,
    },
  btnMenu: {
    paddingLeft: 15,
    width: width / 5
  },
  title: {
    color: 'white',
    fontSize: 12,
    textAlign: 'left',
  },
  options: {
    backgroundColor: 'rgba(0,0,0,0.2)',
    flexDirection: 'row',
    height: 50,
    paddingLeft: -5,
    width: width,
    alignItems: 'center',
    justifyContent: 'space-between',
  }
})