'use strict';
const {resolve} = require('path');
const packager = require('electron-packager');
const config = require('../package.json');
const sharedConf = require('./shared-config.js');

const packageOpts = Object.assign({
	// icon: resolve(__dirname, '../icons/Biko.ico'),
	platform: 'win32',
	arch: 'ia32',
	win32metadata: {
		CompanyName: 'weilinshi.org',
		FileDescription: 'Biko - Dead Link Checking Tool',
		ProductName: config.productName,
		LegalCopyright: `©1991 - ${new Date().getFullYear()} Weilin Shi`
	}
}, sharedConf);

packager(packageOpts, err => {
	if (err) throw err;
	console.log('Built win32 version'); // eslint-disable-line no-console
});
