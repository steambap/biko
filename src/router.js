import Vue from 'vue';
import Router from 'vue-router';
import Home from './view/home.vue';
import SearchResult from './view/search-result.vue';

Vue.use(Router);

const routes = [
	{
		path: '/',
		component: Home
	},
	{
		path: '/search',
		component: SearchResult
	}
];

const router = new Router({
	mode: 'history',
	routes
});

export default router;
