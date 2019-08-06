import React, { Component } from 'react'
import Video from 'react-native-video'
import VideoHamburgesas from '../../../assets/videos/spas.mp4'
export default class VideoCover extends Component {

  render() {
    return (
        <Video
          source={VideoHamburgesas}
          ref={(ref) => {
            this.player = ref
          }}
          resizeMode="stretch"
          repeat={true}
          paused = {false}
          rate = {1}
          volume={1.0}
          style = {{position:'absolute', top: 0, bottom: 0, left: 0, right: 0}}
        />
    )
  }
}
