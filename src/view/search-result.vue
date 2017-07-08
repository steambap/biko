<template>
	<div class="container">
		<button class="btn btn-secondary my-2" @click="home">Home</button>
		<div class="row">
			<div class="col">
				<result-card></result-card>
			</div>
		</div>
	</div>
</template>

<script>
import ResultCard from '../component/result-card';

export default {
	name: 'search-result',
	components: {ResultCard},
	beforeRouteEnter(to, from, next) {
		next(vm => {
			if (vm.$store.state.link === '') {
				vm.$router.push('/');
			} else {
				this.$store.dispatch('checkLink');
			}
		});
	},
	methods: {
		home() {
			this.$router.push('/');
		}
	}
};
</script>
