import React, {Component} from 'react'
import {
  View,
  Text,
  ScrollView,
  FlatList,
  AsyncStorage,
  StyleSheet,
  TouchableHighlight,
  Image,
  Alert
} from 'react-native'
import {Actions} from 'react-native-router-flux'
import Product from '../../components/product'
import Bar from '../../components/bar'
import Icon from 'react-native-vector-icons/Ionicons'
import numeral from 'numeral'
import ArrowLeft from '../../components/arrowLeft'
import { getUser } from '../../utils'
export default class Cart extends Component {
  constructor(props) {
    super(props)
    this.state = {
      products: [],
      error: false,
      price: 0
    }
    this.getProducts = this.getProducts.bind(this)
    this.renderError = this.renderError.bind(this)
    this.getCart = this.getCart.bind(this)
    this.renderProducts = this.renderProducts.bind(this)
    this.calculeTotal = this.calculeTotal.bind(this)
    this.Buy = this.Buy.bind(this)
  }

  _keyExtractor = (item, index) => item.id

  async Buy() {
    let { price } = this.state
    if (parseInt(price) > 9000) {
      let user = await getUser()
      if (user) {
        Actions.whitoutRegister()
      } else {
          Actions.whitoutRegister()
      }
    } else {
      Alert.alert(
        'Lo sentimos, Tu orden debe ser mayor a',
        ' $9.000'
      )
    }
  }

  async getCart() {
    let products = []
    try {
      let productsInCart = await AsyncStorage.getItem('fastFoodCart')
      if (productsInCart) {
        products = JSON.parse(productsInCart)
      }
      return products
    } catch (e) {
      return products
    }
  }

  async getProducts() {
    let products = await this.getCart()
    let price = this.calculeTotal(products)
    this.setState({products: products, price: price})
  }
  componentWillMount() {
    this.getProducts()
  }

  renderError() {
    let error = this.state.error
    if (error) {
      return Alert.alert('ocurrió un error al carga tu carrito, lo sentimos')
    }
    return null
  }
  calculeTotal(products) {
    let price = 0
    if (products.length > 1) {
      price = products.reduce((prevProduct, currentProduct, index) => {
        let sum = 0
          if (prevProduct.unit_price) {
            sum = (prevProduct.cant * prevProduct.unit_price) + (currentProduct.cant * currentProduct.unit_price)
          } else {
            sum =  prevProduct + (currentProduct.cant * currentProduct.unit_price)
          }
        return sum
      })
    } else if (products.length === 1) {
      price = products[0].cant * products[0].unit_price
    }
    return price
  }

  async removeProduct(id) {
    let products = await this.getCart()
    let index = products.findIndex((p) => {
      return p.id === id
    })
    let product = products[index]
    if (product.cant <= 1) {
      products.splice(index, 1)
    } else {
      products[index].cant -= 1
    }
    try {
      await AsyncStorage.setItem('fastFoodCart', JSON.stringify(products))
      this.getProducts()
    } catch (e) {
      Alert.alert('ocurrio un error')
    }
  }

  renderProducts () {
    let {products} = this.state
    if (products.length > 0) {
     return (
      <FlatList
        numColumns = {2}
        keyExtractor = {this._keyExtractor}
        data = {products}
        renderItem = {(product) => (
          <View key = {product.item.id}>
            <Product {...product.item}/>
            <Text style = {[styles.colorWhite, styles.btnFloat, styles.cant]}> {product.item.cant} </Text>
            <TouchableHighlight style = {[styles.btnFloat, styles.deleteProduct]} onPress = {() => {this.removeProduct(product.item.id)}}>
              <View >
                <Icon  name = "ios-remove" color = "white" size = {30}/>
              </View>
            </TouchableHighlight>
          </View>
        )}
      />)
    } else {
      return (
        <View style = {styles.noProducts}>
          <Text style = {{color: 'white', fontSize: 18}}> No tienes servicios en el carrito </Text>
          <TouchableHighlight onPress = {() => this.backToShop}>
            <Text style = {{color: 'green'}}> Compra algo </Text>
          </TouchableHighlight>
        </View>
      )
    }
  }

  render() {
    let price = numeral(this.state.price).format('($0,0)')
    return (
      <View style = {styles.main}>
        <ArrowLeft />
        <View style = {{flexDirection: 'row'}}>
          <TouchableHighlight onPress = {() => this.Buy()} style = {styles.price}>
          <View style = {{flexDirection: 'row'}}>
            <View style = {{flex: 1}} >
              <Text style = {[styles.colorWhite,]}> Total Pedido </Text>
              <Text style = {[styles.colorWhite, styles.total]}> {price} </Text>
              <Text style = {[styles.colorWhite,]}> Toca para finalizar tu orden </Text>
            </View>
            <View style = {{ marginRight: 4, position: 'absolute', top: 0, right: 0}}>
              <Image source = {require('../../../assets/images/manito.png')}
                style = {{width: 85, height: 75}}
              />
            </View>
          </View>
          </TouchableHighlight>
        </View>
        {this.renderProducts()}
      </View>
    )
  }
}
const styles = StyleSheet.create({
  main: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    flexWrap: 'nowrap',
    backgroundColor: 'black',
  },
  price: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
    marginTop: 60,
    marginLeft: 20,
    marginRight: 20,
    height: 100,
    borderColor: 'white',
    borderWidth: 1

  },
  colorWhite: {
    color: 'white',
    textAlign: 'center',
    fontFamily: 'Typo_Round_Regular_Demo'
  },
  list: {
    alignItems: 'center'
  },
  cant: {
    bottom: 40,
    right: 35,
    backgroundColor:'rgba(0, 0, 0, 0.7)',
    textAlign: 'center',
    textAlignVertical: 'center'

  },
  btnFloat: {
    width: 35,
    height: 34,
    borderRadius: 20,
    top: 100,
    position: 'absolute',
    borderColor: 'white',
    borderWidth: 1,

  },
  deleteProduct: {
    bottom: 40,
    left: 35,
    backgroundColor:'rgba(222, 0, 0, 0.7)',
    paddingLeft: 10,
  },
  total: {
    fontSize: 35,
  },
  noProducts: {
    marginLeft: 10,
    marginRight: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'white',
    height: 80,
    marginTop: 60
  },
  text: {
    fontSize: 20,
  }
})
