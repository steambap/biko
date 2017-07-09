import Vue from 'vue';
import Vuex from 'vuex';
import {check} from './checker';

const isDev = process.env.NODE_ENV === 'development';

Vue.use(Vuex);

const state = {
	link: isDev ? 'www.lemonce.com' : '',
	resultMsg: '',
	stopFlag: false,
	urlErrors: 0,
	urlProblems: 0,
	urlChecked: 0,
	brokenLinkTable: [
		
	]
};

const getters = {
	url(state) {
		return 'http://' + state.link;
	}
}

const mutations = {
	updateLink(state, newLink) {
		state.link = newLink;
	},
	updateResultMsg(state, msg) {
		state.resultMsg = msg;
	},
	updateCheckerState(state, checker) {
		state.urlErrors = checker.errors;
		state.urlProblems = checker.problems;
		state.urlChecked = checker.URLChecked;
	},
	updateBrokenLink(state, table) {
		state.brokenLinkTable = table;
	}
};

const actions = {
	async checkLink({dispatch, commit}) {
		try {
			await dispatch('runCheck');
			commit('updateResultMsg', 'Done');
		} catch (err) {
			commit('updateResultMsg', err.toString());
			console.error(err.stack);
		}
	},
	async runCheck({state, commit, getters}) {
		const checker = check(getters.url);
		do {
			await checker.nextURL();
			commit('updateCheckerState', checker);
		} while (checker.hasTodos() && !state.stopFlag);
		console.log(checker);
		const brokenLinkTable = [];
		Object.keys(checker.urlErrors).forEach(url => {
			const parents = checker.urlParents[url];
			brokenLinkTable.push({
				target: url,
				src: parents.values().next().value,
				count: parents.size,
				status: checker.urlErrors[url].status
			});
		});

		commit('updateBrokenLink', brokenLinkTable);
	}
};

const store = new Vuex.Store({
	strict: process.env.NODE_ENV === 'development',
	state,
	getters,
	mutations,
	actions
});

export default store;
