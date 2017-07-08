import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const state = {
	link: ''
};

const mutations = {
  updateLink(state, newLink) {
    state.link = newLink;
  }
};

const actions = {

};

const store = new Vuex.Store({
  strict: process.env.NODE_ENV === 'development',
  state,
  mutations,
  actions
});

export default store;
