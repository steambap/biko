import Vue from 'vue';
import VueI18n from 'vue-i18n';
import english from './english.json';
import chinese from './chinese.json';

Vue.use(VueI18n);

const i18n = new VueI18n({
	locale: 'en',
	fallbackLocale: 'en',
	messages: {
		en: english,
		zh: chinese
	}
});

export default i18n;

// Hot updates
if (module.hot) {
	module.hot.accept(['./english.json', './chinese.json'], function () {
		i18n.setLocaleMessage('en', require('./english.json'));
		i18n.setLocaleMessage('zh', require('./chinese.json'));
	})
}
