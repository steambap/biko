import Vue from 'vue';
import Vuex from 'vuex';
import {check} from './checker';

const isDev = process.env.NODE_ENV === 'development';

Vue.use(Vuex);

const state = {
	link: isDev ? 'www.' : '',
  resultMsg: '',
  stopFlag: false,
  urlErrors: 6,
  urlProblems: 32,
  urlChecked: 79
};

const mutations = {
  updateLink(state, newLink) {
    state.link = newLink;
  },
  updateResultMsg(state, msg) {
    state.resultMsg = msg;
  }
};

const actions = {
  checkLink({dispatch, commit}) {
    return dispatch('runCheck').then(() => {
      commit('updateResultMsg', 'Done');
    }).catch(err => {
      commit('updateResultMsg', err.toString());
    });
  },
  async runCheck({state, commit}) {
    const checker = check(state.link);
    do {
      await checker.nextURL();
    } while (!state.stopFlag && checker.hasTodos());
  }
};

const store = new Vuex.Store({
  strict: process.env.NODE_ENV === 'development',
  state,
  mutations,
  actions
});

export default store;
