import Vue from 'vue';
import Router from 'vue-router';
import Home from './view/home.vue';
import SearchResult from './view/search-result.vue';
import Setting from './view/setting.vue';
import SettingHome from './component/setting-main';
import CodeView from './view/code.vue';

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
		component: Setting,
		children: [
			{
				path: '',
				component: SettingHome
			}
		]
	},
	{
		path: '/code',
		component: CodeView
	}
];

const router = new Router({
	mode: 'hash',
	routes
});

export default router;
