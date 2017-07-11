import Vue from 'vue';
import {sync} from 'vuex-router-sync';
import App from './view/app';
import router from './router';
import store from './store';
import 'bootstrap/dist/css/bootstrap.css';
import './style.css';

sync(store, router);

Vue.config.errorHandler = console.error;

const app = new Vue({
  router,
  store,
  ...App
});

export {
	router,
	store,
	app
};
