import { AsyncStorage,  Alert } from 'react-native'

export const getUser = async () => {
  try {
    let user = await AsyncStorage.getItem('currentUser')
    if(user) {
      user = JSON.parse(user)
      return user
    } else {
      return  null
    }
  } catch (e) {
    return null
  }
}

export const updatedUser = async (data) => {
  try {
    let user = await getUser()
    newUser = new Object.assign(data)
    user.email = newUser.email,
    user.delivery_address = newUser.delivery_address
    user.phone = newUser.phone,
    user.username = newUser.username
    await AsyncStorage.setItem('currentUser', JSON.stringify(user))
  } catch(e) {
    Alert.alert('ocurrió un error al actualizar tus datos')
  }
}