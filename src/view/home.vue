<template>
	<div class="container h-100">
		<div class="row align-items-center justify-content-center h-100">
			<div class="col col-lg-6 text-center">
				<h2 class="mb-3">{{ $t("home.title") }}</h2>
				<div class="input-group mb-3">
					<span class="input-group-addon">http://</span>
					<input type="text"
						class="form-control"
						v-model.trim="link"
						@keyup.enter="find">
				</div>
				<div class="btn-toolbar justify-content-center">
					<button class="btn btn-secondary home-btn mr-3" @click="find" :disabled="hasNoLink">
						{{ $t("home.search") }}</button>
					<button class="btn btn-secondary home-btn" @click="setting">
						{{ $t("home.options") }}</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'home',
	data() {
		const link = this.$store.state.link ?
			this.$store.state.link : 'www.';
		return { link };
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
			this.$store.commit('updateLink', this.link);
			this.$router.push('/search');
		},
		setting() {
			this.$router.push('/code');
		}
	}
};
</script>

<style>
.home-btn {
	width: 200px;
}
</style>
