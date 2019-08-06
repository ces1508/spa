import React, { Component } from 'react'
import {
  Modal,
  StyleSheet,
  View,
  Image,
} from 'react-native'
import Icons from 'react-native-vector-icons/Ionicons'
export default function ModalView(props) {
  return (
    <View style= {{ marginTop: 100, backgroundColor: 'yellow'}}>
      <Modal
        animationType={"fade"}
        transparent={true}
        visible={props.show}
        onRequestClose={() => null}
      >
        <View style = {styles.modal}>
          <Image
          source = {require('../../../assets/images/help.jpg')}
          style = {{flex:1, marginVertical: 20, marginHorizontal: 20,width: null, height: null,}} resizeMode = "stretch"/>
        </View>
        <Icons name = "ios-close-circle-outline" size = {50} style = {styles.closeModal} color = "white" onPress = { props.handlePress}/>
      </Modal>
    </View>
  )
}

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)'
  },
  image: {
    flex: 1,
    width: 200,
    height: 200
  },
  closeModal: {
    position: 'absolute',
    top:20,
    right: 10,
    width: 50,
    height: 50,
  }
})