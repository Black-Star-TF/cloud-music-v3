/*
 * @Author: BlackStar
 * @Date: 2022-03-26 11:06:19
 * @LastEditTime: 2022-04-27 17:59:55
 * @FilePath: /cloud-music-v3/src/store/modules/app.js
 * @Description: 
 */
import loadTheme from '@/util/loadTheme';

const state = {
  keywords: '',
  searchDrawerVisible: false,
  // theme: loadTheme(),
};

const getters = {
  
};

const mutations = {
  setKeywords: (state, keywords) => {
    state.keywords = keywords;
  },
  openSearchDrawer: state => {
    state.searchDrawerVisible = true;
  },
  closeSearchDrawer: state => {
    state.searchDrawerVisible = false;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  mutations
};