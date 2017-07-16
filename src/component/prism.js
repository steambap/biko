import prism from 'prismjs';

export default {
	name: 'prism',
	props: {
		code: {
			type: String
		}
	},
	render() {
		return (
			<pre class="language-html">
				<code class="html"
					domPropsInnerHTML={prism.highlight(this.code, prism.languages.html)}>
				</code>
			</pre>
		);
	}
};
