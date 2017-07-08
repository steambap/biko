const assert = require('assert');
const {URL} = require('url');
const co = require('co');
const axios = require('axios');
const cheerio = require('cheerio');

const urlErrors = {};
const urlParents = {};

const stats = {
	todo: 1,
	link: 0,
	problem: 0
};

const startURL = process.argv[2];
assert(startURL);
const startURLObj = new URL(startURL);
const queuedURL = [startURLObj.toString()];
const checked = new Set();

async function checkLinks() {
	do {
		const curURL = queuedURL.shift();
		await handleURL(curURL);
		// checkPoint();
	} while (queuedURL.length > 0);

	printResult();
}

async function handleURL(urlstr) {
	const [urlraw, urlParent] = urlstr.split('|');
	const myURL = new URL(urlraw);
	if (myURL.hash) {
		myURL.hash = '';
	}

	stats.todo--;
	const url = myURL.toString();
	// Add this URL to the ones we've seen already, return if it is a
  // duplicate.
	if (addChecked(url)) {
		return;
	}

	stats.link++;
	
	// todo filter myURL with scheme ?
	const res = await axios.get(myURL.toString())
		.catch(err => err.response ? err.response : {status: 900});
	// Ok, we got something back from request, let's see what it is
	if (200 <= res.status && res.status < 400) {
		// Internal HTML documents need to be given to handleDoc for processing
		if (/html/.test(res.headers['content-type']) &&
			myURL.hostname === startURLObj.hostname) {
			handleDoc(url, res.data);
		}
	} else {
		if ([403, 900].indexOf(res.status) === -1) {
			addError(url, urlParent, res.status);
		}
	}
}

function addChecked(urlstr) {
	if (checked.has(urlstr)) {
		return true;
	}

	checked.add(urlstr);

	return false;
}

/**
 * @param {URL} myURL
 */
function handleDoc(base, htmlstr) {
	let numOfLinks = 0;
	let newLinks = 0;

	const $ = cheerio.load(htmlstr);
	const robotsNode = $('meta[name=robots]');
	if (/nofollow/.test(robotsNode.html())) {
		return;
	}

	const links = $('a[href]').filter((i, el) => $(el).attr('href').trim() !== '');

	links.each((i, el) => {
		const link = $(el).attr('href');
		const urlObj = new URL(link, base);
		if (urlObj.hash) {
			urlObj.hash = '';
		}
		const newURL = urlObj.toString();
		if (checked.has(newURL)) {
			// If an error has already been logged for this URL we add the
			// current parent to the list of parents on which this URL
			// appears.
			// if (urlErrors[newURL]) {
			// 	urlParents[newURL].push(base);
			// 	stats.problem++;
			// }

			return;
		}
		// We have something new to check
		queuedURL.push(newURL + '|' + base);
		stats.todo++;
		newLinks++;
	});

	console.log(`New Links: ${newLinks}`);
}

function addError(myURL, urlParent, status) {
	if (!urlErrors[myURL]) {
		urlErrors[myURL] = {};
	}
	
	urlErrors[myURL].status = status;
	if (!urlParents[myURL]) {
		urlParents[myURL] = new Set();
	}
	urlParents[myURL].add(urlParent);
	status.problem++;
}

checkLinks().catch(console.log);

function printResult() {
	console.log('Finished');
	console.log(checked.size, 'links have been checked');
	console.log(Object.keys(urlErrors).length, 'problems found');
}
