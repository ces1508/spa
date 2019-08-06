import React, {Component} from 'react'

import {
  View,
  TextInput,
  TouchableHighlight,
  Image,
  StyleSheet,
  Text,
  Alert,
  AsyncStorage,
} from 'react-native'

import Logo from '../../../assets/images/logo.png'
import Icon from 'react-native-vector-icons/Ionicons'
import Api from '../../api'
import { Actions } from 'react-native-router-flux'
import { getUser, updatedUser } from '../../utils'
import ArrowLeft from '../../components/arrowLeft'
const api = new Api()
export default class WhitOutRegister extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: null,
      username: null,
      delivery_address: "",
      phone: "",
      login: false,
      change: false,
    }
    this.onChangeInput = this.onChangeInput.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)

    this.getCurrentUser = this.getCurrentUser.bind(this)
  }

  componentDidMount() {
    this.getCurrentUser()
  }

  async updateProfile() {
    let {phone, address} = this.state
    let newUser = {
      phone: phone,
      delivery_address: address
    }
    try {
     await AsyncStorage.mergeItem('currentUser', JSON.stringify(newUser))
     this.getUser()
    } catch(e) {
    }
    this.setModal()
    this.getProducts(this.payment_method)
  }


  async getCurrentUser() {
    let user = await getUser()
    if (user) {
      this.setState({
        email: user.email,
        username: user.username,
        delivery_address: user.delivery_address,
        phone: user.phone,
        login: true,
      })
    }
  }

  onChangeInput(type, text){
    switch (type) {
      case 'username':
         this.setState({ username: text, change: true})
        break
      case 'delivery_address':
         this.setState({ delivery_address: text, change: true })
      break
      case 'email':
         this.setState({ email: text, change: true })
      break
      case 'phone':
         this.setState({ phone: text, change: true })
      break
      default:
    }
  }
  async handleSubmit() {
    let {username, delivery_address, email, phone, login, change} = this.state
    let user = {
      username: username,
      delivery_address: delivery_address,
      email: email,
      phone: phone,
      about_me: 'user',
      password: '1234',
    }
    if (login) {
      if (username && delivery_address && email && phone) {
        if (change === true ) {
          await updatedUser(user)
        }
        Actions.confirmBuy()

      } else {
        return Alert.alert('Todos los campos son requeridos')
      }
    } else {
      if (username && delivery_address && email && phone ) {
        let createdUser = await api.createUser(user)
        if (createdUser.status === "error") {
          return Alert.alert(
            'lo sentimos  ocurrió  el siguinte error' ,
            `${createdUser.data}`
          )
        }
        user.id = createdUser.data
        await AsyncStorage.setItem('currentUser', JSON.stringify(user))
        Actions.confirmBuy()
      } else {
        Alert.alert('Todos los campos son requeridos')
      }
    }
  }
  render() {
    return (
      <View style = {styles.main}>
        <ArrowLeft />
        <View style = {styles.containerLogo}>
          <Image source = {Logo} style = {styles.logo} resizeMode = "contain"/>
        </View>
        <View style = {styles.form}>

          <TextInput
            placeholder = "Nombre"
            style = {styles.input}
            underlineColorAndroid = 'transparent'
            onChangeText = { (text) => this.onChangeInput('username',text) }
            value = {this.state.username}
          />
          <TextInput
            placeholder = "Dirección"
            style = {styles.input}
            underlineColorAndroid = 'transparent'
            onChangeText = { (text) => this.onChangeInput('delivery_address', text) }
            value = {this.state.delivery_address}
          />
          <TextInput
            placeholder = "Email"
            style = {styles.input}
            underlineColorAndroid = 'transparent'
            onChangeText = { (text) => this.onChangeInput('email', text) }
            value = {this.state.email}
          />
          <TextInput
            placeholder = "Teléfono"
            style = {styles.input}
            underlineColorAndroid = 'transparent'
            onChangeText = { (text) => this.onChangeInput('phone', text) }
            value = {this.state.phone}
            keyboardType = "numeric"
          />
          <View>
            <TouchableHighlight onPress = {() => this.handleSubmit()}>
              <View style = {styles.btn}>
                <Text style = {styles.textWhite}> Enviar solicitud </Text>
                <Icon name = "md-arrow-round-forward" color = "white" size = {30}/>
              </View>
            </TouchableHighlight>
          </View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: 'black',
    paddingLeft: 20,
    paddingRight: 20,
    justifyContent: 'center',
  },
  logo: {
    width: 150,
    height: 150
  },
  containerLogo: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  input: {
    marginTop: 15,
    borderColor: 'gray',
    borderWidth: 1,
    height: 45,
    paddingLeft: 10,
    color: 'white',
    backgroundColor: 'gray',
    borderRadius: 7,
  },
  textWhite: {
    color: 'white',
    fontSize: 20,
  },
  btn: {
    marginTop: 15,
    borderRadius: 7,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    borderWidth: 1,
    borderColor: 'white'
  }
})
