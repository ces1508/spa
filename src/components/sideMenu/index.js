import React, { Component } from 'react'
import Drawer from 'react-native-drawer'
import ConentMenu from './sideMenu'
import {Actions, DefaultRenderer} from 'react-native-router-flux'
export default class SideMenu extends Component {
  constructor(props) {
    super(props)
  }
  componentWillMount() {
  }
  render () {
    const state = this.props.navigationState
    const children = state.children
    return (
      <Drawer
        ref="navigation"
        open={state.open}
        onOpen={()=>Actions.refresh({key:state.key, open: true})}
        onClose={()=>Actions.refresh({key:state.key, open: false})}
        type="overlay"
        content={<ConentMenu />}
        tapToClose={true}
        openDrawerOffset={0.2}
        panCloseMask={0.2}
        negotiatePan={true}
        tweenHandler={(ratio) => ({
          main: { opacity:Math.max(0.54,1-ratio) }
        })
      }>
        <DefaultRenderer navigationState={children[0]} onNavigate={this.props.onNavigate} />
      </Drawer>
    )
  }
}

const drawerStyles = {
  drawer: { shadowColor: '#000000', shadowOpacity: 0.8, shadowRadius: 3},
  main: {paddingLeft: 3},
}