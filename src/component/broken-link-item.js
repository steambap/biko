export default {
	props: ['brokenLink'],
	computed: {
		source() {
			if (this.count > 1) {
				return this.brokenLink.src + ' and ' + (this.brokenLink.count - 1) + ' other page(s)';
			}

			return this.brokenLink.src;
		}
	},
	render() {
		return (
			<div class="broken-link-item d-flex pb-2">
				<div class="link-item" style="flex: 1 0 auto">
					<div>{this.brokenLink.target}</div>
					<div class="text-muted">Source: {this.source}</div>
				</div>
				<div class="link-status" style="flex: 0 0 130px">
					{this.brokenLink.status}
				</div>
			</div>
		);
	}
};
