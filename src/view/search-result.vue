<template>
	<div class="container">
		<div class="row">
			<div class="col">
				<small class="text-muted">
					{{link}}
				</small>
			</div>
		</div>
		<div class="row text-center">
			<div class="col">
				<h2>0</h2>
				<p>Broken link(s) found</p>
				<p></p>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'search-result',
	computed: {
		link() {
			return this.$store.state.link;
		}
	}
};
</script>
