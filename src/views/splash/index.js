import React, {Component} from 'react'
import { View } from 'react-native'
// import resolveAssetSource from 'react-native/Libraries/Image/resolveAssetSource'; 
import Video from 'react-native-video'
import { Actions } from 'react-native-router-flux'

export default class Splash extends Component {
  constructor() {
    super()
    this.goHome = this.goHome.bind(this)
  }

  goHome() {
    Actions.main()
  }


  render() {
    return (
      <View style = {{flex: 1}}>
        <Video
          source={require('../../../assets/videos/splash.mp4')}
          ref={(ref) => {
           this.player = ref
          }}
          onEnd = {this.goHome}
          paused = {false}
          rate = {1}
          resizeMode="cover"
          onError ={(e) => console.warn('error', e)}
          style = {{position:'absolute', top: 0, bottom: 0, left: 0, right: 0}}
        />
      </View>
    )
  }
}