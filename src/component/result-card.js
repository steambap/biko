export default {
	computed: {
		link() {
			return this.$store.state.link;
		},
		errors() {
			return this.$store.state.urlErrors;
		},
		problems() {
			return this.$store.state.urlProblems;
		},
		pages() {
			return this.$store.state.urlChecked;
		},
		result() {
			return this.$store.state.resultMsg;
		}
	},
	render() {
		return (
			<div class="card">
				<div class="card-header">
					{this.link}
				</div>
				<div class="card-block text-center">
					<h2 class={{"d-inline-block": true, "text-danger": this.errors > 0}}>
						{this.errors}
					</h2>
					&nbsp;
					<small class="text-muted">Broken link(s) found</small>
				</div>
				<div class="card-block p-0 border-top">
					<div class="row no-gutters text-center">
						<div class="col p-2 border-right">
							<h4>{this.problems}</h4>
							<small class="text-muted">Problem(s) found</small>
						</div>
						<div class="col p-2">
							<h4>{this.pages}</h4>
							<small class="text-muted">Page(s) scanned</small>
						</div>
					</div>
				</div>
				<div class="card-footer">
					<small class="text-muted">{this.result}</small>
				</div>
			</div>
		);
	}
};
