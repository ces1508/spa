import React, {Component} from 'react'
import {
  View,
  Text,
  StyleSheet,
  AsyncStorage,
  FlatList,
  TouchableOpacity,
} from 'react-native'

import VideoCover from '../../components/video'
import {Actions} from 'react-native-router-flux'
import Bar from '../../components/bar'
import Product from '../../components/product'
export default class Favorites extends Component {
  constructor(props) {
    super(props)
    this.state = {
      listFavorites: []
    }
    this.getFavorites = this.getFavorites.bind(this)
  }
  async back() {
    Actions.main()
  }
  _keyExtractor = (item, index) => item.id

  async getFavorites() {
    let listFavorites = await AsyncStorage.getItem('fastFoodFavorites')
    listFavorites = JSON.parse(listFavorites)
    this.setState({listFavorites: listFavorites})
  }

  componentWillMount() {
    Actions.refresh({key: 'drawer', open: value => false });
    this.getFavorites()
  }
  goToProduct(product) {
    Actions.product({product: product})
  }
  renderItem(product) {
    return (
      <TouchableOpacity onPress = {() => this.goToProduct(product)}>
        <Product {...product} />
      </TouchableOpacity>
    )
  }
  render() {
    return (
      <View style = {styles.main}>
        <VideoCover />
        <Bar icon = "ios-arrow-round-back" title = "Favoritos" handlePress = {this.back}/>
        <FlatList
          style = {styles.list}
          numColumns = {2}
          keyExtractor = {this._keyExtractor}
          data = {this.state.listFavorites}
          renderItem = {(item) => this.renderItem(item.item)}
      />
      </View>
    )
  }
}
const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: 'black'
  },
  list: {
  }
})