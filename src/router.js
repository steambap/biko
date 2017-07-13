import Vue from 'vue';
import Router from 'vue-router';
import Home from './view/home.vue';
import SearchResult from './view/search-result.vue';
import Setting from './view/setting.vue';

Vue.use(Router);

const routes = [
	{
		path: '/',
		component: Home
	},
	{
		path: '/search',
		component: SearchResult
	},
	{
		path: '/setting',
		component: Setting
	}
];

const router = new Router({
	mode: 'hash',
	routes
});

export default router;
