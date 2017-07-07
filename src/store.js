import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const state = {
	a: 0
};

const mutations = {

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
