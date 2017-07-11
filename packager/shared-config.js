'use strict';
const config = require('../package.json');

module.exports = {
	asar: true,
	dir: './app',
	overwrite: true,
	prune: true,
	packageManager: 'yarn',
	name: 'biko',
	appVersion: config.version,
	out: 'output'
};
