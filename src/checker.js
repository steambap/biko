import {URL} from 'url';
import axios from 'axios';
import axiosAdapter from 'axios/lib/adapters/http';
import cheerio from 'cheerio';

axios.defaults.adapter = axiosAdapter;

class Checker {
	/**
	 * @param {string} url
	 */
	constructor(url, options) {
		this.queuedURL = [url];
		this.checked = new Set();
		this.options = options;
		this.urlErrors = {};
		this.urlParents = {};
	}

	async findBrokenLinks() {
		do {
			await nextURL();
		} while (this.hasTodos());

		return this;
	}

	nextURL() {
		const curURL = this.queuedURL.shift();

		return this.handleURL(curURL);
	}

	/**
	 * check if there are still links in queue
	 */
	hasTodos() {
		return this.queuedURL.length > 0;
	}

	get URLChecked() {
		return this.checked.size;
	}

	get problems() {
		let sum = 0;
		for (let urlstr in this.urlParents) {
			sum += this.urlParents[urlstr].size;
		}

		return sum;
	}

	get errors() {
		return Object.keys(this.urlErrors).length;
	}

	/**
	 * @param {string} urlstr
	 */
	async handleURL(urlstr) {
		const [urlInput, urlParent] = urlstr.split('|');
		const urlObj = new URL(urlInput, urlParent);
		if (urlObj.hash) {
			urlObj.hash = '';
		}

		const url = urlObj.toString();
		// Add this URL to the ones we've seen already, return if it is a
  	// duplicate.
		if (this.addChecked(url)) {
			return;
		}

		const res = await axios.get(url)
			.catch(err => err.response ? err.response : {status: 900});
		// Ok, we got something back from request, let's see what it is
		if (200 <= res.status && res.status < 400) {
			this.maybeFindMore(urlObj, res);
		} else {
			this.maybeAddError(url, urlParent, res.status);
		}
	}
	/**
	 * @param {string} urlstr
	 */
	addChecked(urlstr) {
		if (this.checked.has(urlstr)) {
			return true;
		}

		this.checked.add(urlstr);

		return false;
	}
	/**
	 * @param {URL} urlObj
	 */
	maybeFindMore(urlObj, res) {
		if (/html/i.test(res.headers['content-type'])
			&& urlObj.hostname === this.options.hostname) {
			this.handleDoc(urlObj.toString(), res.data);
		}
	}
	/**
	 * @param {string} url
	 * @param {string} urlParent
	 * @param {number} status
	 */
	maybeAddError(url, urlParent, status) {
		if ([403, 900, 521, 429].indexOf(status) === -1) {
			this.addError(url, urlParent, status);
		}
	}
	/**
	 * @param {string} base
	 * @param {string} htmlstr
	 */
	handleDoc(base, htmlstr) {
		const $ = cheerio.load(htmlstr);
		const robotsNode = $('meta[name=robots]');
		// It is not important if bot does not want to see it
		if (/nofollow/i.test(robotsNode.html())) {
			return;
		}

		const links = $('a[href]')
			.filter(function (i, el) {
				const href = $(el).attr('href').trim();
				if (href === '') {
					return false;
				}
				if (/javascript/i.test(href)) {
					return false;
				}

				return true;
			});

		links.each((i, el) => {
			const link = $(el).attr('href');
			const urlObj = new URL(link, base);
			if (urlObj.hash) {
				urlObj.hash = '';
			}
			const newURL = urlObj.toString();
			if (this.checked.has(newURL)) {
				if (this.urlErrors[newURL]) {
					this.urlParents[newURL].add(base);
				}
				// It is checked
				return;
			}

			this.queuedURL.push(newURL + '|' + base);
		});
	}
	/**
	 * @param {string} url
	 * @param {string} urlParent
	 * @param {number} status
	 */
	addError(url, urlParent, status) {
		const errList = this.urlErrors;
		const errParents = this.urlParents;

		if (!errList[url]) {
			errList[url] = {};
		}
		errList[url].status = status;

		if (!errParents[url]) {
			errParents[url] = new Set();
		}
		errParents[url].add(urlParent);
	}
}

/**
 * @param {string} url
 */
function check(url, options = {}) {
	const urlObject = new URL(url);
	options.hostname = urlObject.hostname;

	return new Checker(urlObject.toString(), options);
}

export {Checker, check};
