<template>
	<div class="container h-100">
		<div class="row align-items-center h-100">
			<div class="col text-center">
				<h2 class="mb-2">Enter your URL:</h2>
				<div class="input-group mb-2">
					<span class="input-group-addon">http://</span>
					<input type="text"
						class="form-control"
						v-model.trim="link"
						@keyup.enter="find">
				</div>
				<div class="btn-toolbar justify-content-center">
					<button class="btn btn-secondary home-btn mr-3" @click="find" :disabled="hasNoLink">Find Broken Link</button>
					<button class="btn btn-secondary home-btn">Advanced</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'home',
	data() {
		return {link: 'www.'};
	},
	computed: {
		hasNoLink() {
			return this.link === '';
		}
	},
	methods: {
		find() {
			if (this.hasNoLink) {
				return;
			}
			console.log('todo!');
		}
	}
};
</script>

<style>
.home-btn {
	width: 200px;
}
</style>
