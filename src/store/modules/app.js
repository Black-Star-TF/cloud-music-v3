/*
 * @Author: BlackStar
 * @Date: 2022-03-26 11:06:19
 * @LastEditTime: 2022-03-26 13:23:38
 * @FilePath: /cloud-music-v3/src/store/modules/app.js
 * @Description: 
 */

const state = {
  keywords: '',
  searchDrawerVisible: false
}

const getters = {

}

const mutations = {
  setKeywords: (state, keywords) => {
    state.keywords = keywords
  },
  openSearchDrawer: state => {
    state.searchDrawerVisible = true
  },
  closeSearchDrawer: state => {
    state.searchDrawerVisible = false
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations
}