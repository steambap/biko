import {remote} from 'electron';

const l10n = remote.app.getLocale();
/** @type {string} */
let i18n;

switch (l10n) {
	case 'zh-TW': case 'zh': case 'zh-CN':
	case 'zh-HK': case 'zh-SG':
		i18n = 'zh';
		break;

	default:
		i18n = 'en';
		break;
}

export default i18n;
