/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
import React, { Component } from 'react';
import {Scene, Router, ActionConst, RouterActions} from 'react-native-router-flux'
import SideMenu from './src/components/sideMenu'
import MainView from './src/views/main'
import Product from './src/views/product'
import CartView from './src/views/cart'
import FavoritesView from './src/views/favorites'
import Login from './src/views/login'
import ConfirmBuy from './src/views/confirmBuy'
import WhitOutRegister from './src/views/sinRegistro'
import Splash from './src/views/splash'
// import {AppRegistry} from 'react-native'

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};
export default class App extends Component<Props> {
  render() {
    return (
      <Router>
        <Scene key = "drawer" component = {SideMenu} open = {false}>
          <Scene key = "FastFood" >
            <Scene key = "splash" component = {Splash} title = 'splash' hideNavBar = {true} type = "reset"  initial = {true} />
            <Scene key = "main" component = {MainView} title = "Belleza" hideNavBar = {true} type="reset"  />
            <Scene key = "product" component = {Product} hideNavBar = {true} />
            <Scene key = "cart" component = {CartView} hideNavBar = {true}/>
            <Scene key = "favorites" component = {FavoritesView} hideNavBar = {true}/>
            <Scene key = "login" component = {Login} hideNavBar = {true} />
            <Scene key = "confirmBuy" component = {ConfirmBuy} hideNavBar = {true} />
            <Scene key = "whitoutRegister" component = {WhitOutRegister} hideNavBar = {true} modal = {true} type={ActionConst.PUSH}/>
          </Scene>
        </Scene>
      </Router>
    )
  }
}
// AppRegistry.registerComponent('Bellanova', () => App);
