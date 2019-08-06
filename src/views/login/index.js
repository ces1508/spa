import React, {Component} from 'react'
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Button,
  Alert,
  AsyncStorage,
  TouchableHighlight,
  Image,
  Dimensions,
  ScrollView,
  Modal,
} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import FBDSK, { LoginManager, AccessToken }from 'react-native-fbsdk'
import {
  Actions
} from 'react-native-router-flux'
import Lines from '../../../assets/images/puntos.png'
import Logo from '../../../assets/images/logo.png'
import Puntos from '../../components/puntos'
const width = Dimensions.get('window').width
const height = Dimensions.get('window').height
import Api from '../../api'
const api = new Api()

export default class Login extends Component {
  constructor(props) {
    super(props)
    this.handleFacebookLogin = this.handleFacebookLogin.bind(this)
    this.createUser = this.createUser.bind(this)
    this.saveUserData = this.saveUserData.bind(this)
    this.state = {
      login: false,
      user: {},
      modal: false
    }
  }

  setModalVisible(visible) {
    this.setState({modal: visible});
  }
  handleWhitOutRegister() {
    Actions.whitoutRegister()
  }

  async saveUserData(user) {
    let newUser = JSON.stringify(user)
    console.warn('usuarioa' , newUser)
    try {
      await AsyncStorage.setItem('currentUser', newUser)
      console.warn('usuario guardado')
    } catch (e) {
      console.warn(e)
    }
  }
  async createUser() {
    let user = this.state.user
    let createdUser = await api.loginFacebook(user)
    if (createdUser.status === "success") {
      this.saveUserData(createdUser.data)
      Actions.whitoutRegister()
    }
  }

  async handleFacebookLogin() {
    try {
      let result = await LoginManager.logInWithReadPermissions(['public_profile', 'email'])
      if (result.isCancelled) {
        Alert.alert('has cancelado en inicio de sesión')
      } else {
        let {accessToken } = await AccessToken.getCurrentAccessToken()
        let request = await fetch(`https://graph.facebook.com/v2.9/me?access_token=${accessToken}&fields=id,email,location, about,name,picture&format=json&method=get&pretty=0&suppress_http_code=1`)

        let profile = await request.json()
        this.setState({
          user: {
            "email": profile.email,
            id: profile.id,
            profile_photo: profile.picture.data.url,
            username: profile.name,
            kind: 'facebook',
            phone: '',
            delivery_address: ''
          },
        })
        this.createUser()
      }
    } catch(e) {
      Alert.alert(' uups!!! ocurrio un error')
    }

  }


  render() {
    return (
      <ScrollView centerContent style = {{backgroundColor: 'black'}}>
         <View style = {styles.main}>
          <View style = {styles.containerLogo}>
            <Image  resizeMode = "contain" source = {Logo} style = {styles.image}/>
          </View>
          <View style = {styles.form}>
            <View>
              <TextInput
                placeholder = 'Email'
                placeholderTextColor = 'white'
                underlineColorAndroid = 'transparent'
                style = {styles.input}
              />
              <View style = {styles.icon}>
                <Icon name = 'ios-person' size = {50} color = 'white'  />
              </View>
            </View>
            <View style = {{marginTop: 10}}>
              <TextInput
              placeholder = 'Contraseña'
              placeholderTextColor = "white"
              underlineColorAndroid = 'transparent'
              style = {styles.input}
            />
            <View style = {styles.icon}>
                <Icon name = 'md-key' size = {50} color = 'white'  />
              </View>
            </View>
            <View>
              <TouchableHighlight onPress = {() => null} style = {styles.signIn}>
                <View style = {styles.login}>
                  <Text style = {[styles.textWhite, styles.signIngText]}> Iniciar Sesión </Text>
                  <Icon name = "md-arrow-round-forward" size = {40} color = 'white' />
                </View>
              </TouchableHighlight>
            </View>
          </View>
          <View style = {styles.socialLogogin}>
            <View>
              <TouchableHighlight onPress = {this.handleFacebookLogin}>
                <View  style = {styles.row} >
                  <Text style = {[styles.textWhite]}>
                    Iniciar Sesión con Facebook
                  </Text>
                  <Icon name = "logo-facebook" color = "white" size = {30} />
                </View>
              </TouchableHighlight>
              <Puntos customStyle = {styles.lineSmall} />
              {
              //   <TouchableHighlight onPress = {this.handleGoogleLogin}>
              //    <View  style = {styles.row} >
              //       <Text style = {[styles.textWhite]}>
              //         Iniciar Sesión con Google
              //      </Text>
              //      <Icon name = "ios-add" color = "white" size = {30} />
              //    </View>
              //  </TouchableHighlight>
              // <Puntos customStyle = {styles.lineSmall}/>
              }
            </View>
          </View>
          <View style = {styles.whitoutRegister}>
            <TouchableHighlight onPress = {this.handleWhitOutRegister}>
              <View style = {styles.btnWhitoutRegister}>
                <Text style = {[styles.textWhite]}> Continuar Sin Registro </Text>
              </View>
            </TouchableHighlight>
            <Puntos customStyle = {styles.lineSmall} />
          </View>
        </View>
      </ScrollView>
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
  form: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    flex: 1,
    width: width - 40,
    padding: 5,
    marginBottom: 20,
  },
  icon: {
    height: 40,
    zIndex: 100,
    position: 'absolute',
    top: 0,
    left:5,
  },
  input: {
    borderColor: 'gray',
    borderWidth: 1,
    height: 45,
    textAlign: 'center',
    color: 'white',
    backgroundColor: 'gray',
    borderRadius: 7,
  },
  textWhite: {
    color: 'white',
    fontFamily: 'Typo_Round_Regular_Demo'
  },
  signIngText: {
    textAlign: 'center',
    textAlignVertical: 'center',
    fontSize: 20,
  },
  login: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  signIn: {
    marginTop: 5,
    padding: 8,
  },
  containerLogo: {
    marginTop: 60,
  },
  image:{
    height: 100,
    width: 100,
    alignSelf: 'flex-start',
    marginBottom: 10,
  },
  row: {
    flexDirection:'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
  },
  lineSmall: {
    height: 20,
    width: (width / 1.5)
  },
  whitoutRegister: {
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },
  socialLogogin: {
    alignItems: 'center',
  }
})