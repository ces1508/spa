import React, { Component } from  'react'
import {
  View,
  Text,
  Button,
  TextInput,
  StyleSheet,
  TouchableHighlight,
  Dimensions,
  AsyncStorage,
  Image,
  Modal,
  Alert,
  ActivityIndicator,
} from 'react-native'

const width = Dimensions.get('window').width
const height = Dimensions.get('window').height
import {Actions} from 'react-native-router-flux'
import ArrowLeft from '../../components/arrowLeft'
import Api from  '../../api'
const api = new Api()
export default class ConfirmBuy extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user: {},
      phone: '',
      address: '',
      request: false
    }
    this.handlePayment = this.handlePayment.bind(this)
    this.updateProfile = this.updateProfile.bind(this)
    this.payment_method = ""
  }

  async getUser() {
    let user = await AsyncStorage.getItem('currentUser')
    user = JSON.parse(user)
    this.setState({ user: user })
  }

  async getProducts(payment_method) {
    let {user} = this.state
    let products =  await AsyncStorage.getItem('fastFoodCart')
    products = JSON.parse(products)
    let pedido = []
    for (let i = 0; i < products.length; i++) {
      pedido.push({
        item_id: String(products[i].id),
        shop_id: "1",
        unit_price: String(products[i].unit_price),
        discount_percent: "0",
        name: products[i].name,
        qty: String(products[i].cant),
        user_id: user.id || '2454',
        payment_trans_id: "",
        delivery_address: user.delivery_address,
        billing_address: user.delivery_address,
        total_amount: products[i].unit_price,
        basket_item_attribute: "",
        payment_method: payment_method,
        email: user.email,
        phone: String(user.phone)
      })
    }
    try {
      this.setState({ request: true })
      let payment = await api.Shop(pedido)
      this.setState({ request: false })
      if(payment.status  === "success") {
        await AsyncStorage.removeItem('fastFoodCart')
        Alert.alert('Muy pronto tendras tu pedido :)')
        Actions.main()
      }
    } catch (e) {
      Alert.alert(' Lo sentimos tenemos problemas para procesar tu pedido')
    }
  }

  componentDidMount() {
    this.getUser()
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

  async onChangeText(type, text) {
    let {phone, address} = this.state
    switch (type) {
      case 'phone':
        this.setState({ phone:  text})
        break
      case 'address':
        this.setState({ address: text })
      break
      default:
    }
  }


  handlePayment(type) {
    this.payment_method = type
    let {user} = this.state
    if (user.phone) {
      this.getProducts(type)
    }
  }

  render() {
    return(
      <View style = {styles.main}>
        <ArrowLeft />
        {this.state.request?
        (<View>
          <ActivityIndicator color = 'red' size = "large"/>
          <Text style = {styles.buttonText}> Procesando tu pedido :) </Text>
        </View>)
        :(
          <View>
            <View style = {styles.imgContainer}>
              <Text style = {{
                color: 'white',
                fontSize: 25,
                textAlign: 'center',
                textAlignVertical: 'center'
              }}> Selecciona el tipo de pago </Text>
              <View style = {styles.containerButtons}>
                <TouchableHighlight onPress = {() => this.handlePayment('cod')}>
                  <View style = {[styles.button, styles.btnEfectivo]}>
                    <Text style = {styles.buttonText}> Efectivo </Text>
                  </View>
                </TouchableHighlight>
                <TouchableHighlight onPress = {() => this.handlePayment('bank')}>
                  <View style = {[styles.button, styles.btncreditCart]}>
                    <Text style = {styles.buttonText}> Tarjeta </Text>
                  </View>
                </TouchableHighlight>
              </View>
            </View>
          </View>
        )}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imgContainer: {
    flexDirection: 'column',
    paddingTop: 30,
    paddingBottom: 30,
    backgroundColor: 'rgba(51, 43, 75, 0.5)',
    width: width - 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerButtons: {
    alignItems: 'center',
    justifyContent: 'space-around',
    flexDirection: 'row',
    width: width,
    marginTop: 20,
  },
  button:{
    height: 55,
    width: 130,
    borderRadius: 5,
  },
  buttonText: {
    paddingTop: 5,
    color: 'white',
    fontSize: 30,
    textAlign: 'center',
    textAlignVertical: 'center'
  },
  btnEfectivo: {
    backgroundColor: 'green',
  },
  btncreditCart: {
    backgroundColor: 'red'
  }
})