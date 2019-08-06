const baseUrl = 'http://spabellanova.com/mokets-admin/index.php'
import URLSearchParams from 'url-search-params'
import qs from 'qs'
import {
  AsyncStorage
} from 'react-native'
export default class Api {
  async getProducts(categoryId) {
    try {
      let req = await fetch(`${baseUrl}/rest/items/get/shop_id/1/sub_cat_id/${categoryId}/`, {
        method: 'GET'
      })
      let data = await req.json()
      return data.data
    } catch (e) {
      console.warn('error', e.messsage)
    }
  }
  async makeFavorite (data) {
    let favorite = data
    // delete favorite.price
    try {
      let listFavorites = await AsyncStorage.getItem('fastFoodFavorites')
      if (listFavorites !== null) {
        listFavorites = JSON.parse(listFavorites)
        let existsInFavorite = listFavorites.filter((favorite) => {
          return favorite.id === data.id
        })
        if (existsInFavorite.length > 0) {
          listFavorites = listFavorites.filter((fav) => fav.id !== data.id)
          await AsyncStorage.setItem('fastFoodFavorites', JSON.stringify(listFavorites))
        } else {
          listFavorites.push(data)
          await AsyncStorage.setItem('fastFoodFavorites', JSON.stringify(listFavorites))
        }
      } else {
        listFavorites = []
        listFavorites.push(favorite)
        await AsyncStorage.setItem('fastFoodFavorites', JSON.stringify(listFavorites))
      }
      return {error: false, saved: true}
    } catch (e) {
      return {error: true, messsage: e.messsage, saved: false}
    }
  }
  async createUser(data) {
    try {
      let request = await fetch(`${baseUrl}/rest/appusers/add/`,{
        method: 'POST',
         headers: {
          "content-type": "application/json"
        },
        body: JSON.stringify(data)
      })
      let response = await request.json()
      return response
    } catch (e) {
      return {error: true, messsage: e}
    }
  }

  async loginFacebook(data) {
    try {
      let request = await fetch(`${baseUrl}/rest/appusers/login_using_social`, {
        method: 'POST',
        headers: {
          "content-type": "application/json"
        },
        body: JSON.stringify(data)
      })
      let response = await request.json()
      return response
    } catch (e) {
      return {error: true, messsage: e.messsage}
    }
  }
  async getProduct(id) {
    try {
      let request = await fetch(`${baseUrl}/product/${id}`, {
        method: 'GET',
      })
      let response = await request.json()
      return response
    } catch (e) {
      return {error: true}
    }
  }

  async Shop(data) {
    try {
      let request = await fetch(`${baseUrl}/rest/news/payment`, {
        method: 'POST',
        headers: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        body:  qs.stringify({orders: JSON.stringify(data)})
      })
      let response = await request.json()
      return response
    } catch(e) {
      return {error: true}
    }
  }

}
