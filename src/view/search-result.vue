<template>
	<div class="container">
		<button class="btn btn-secondary my-2" @click="home">Home</button>
		<button class="btn btn-secondary" @click="stop">Stop</button>
		<div class="row pb-3">
			<div class="col">
				<result-card></result-card>
			</div>
		</div>
		<div class="row">
			<div class="col">
				<broken-link-item
					v-for="(brokenLink, index) in brokenLinkTable"
					:key="index"
					:brokenLink="brokenLink">
				</broken-link-item>
			</div>
		</div>
	</div>
</template>

<script>
import ResultCard from '../component/result-card';
import BrokenLinkItem from '../component/broken-link-item';

export default {
	name: 'search-result',
	components: {ResultCard, BrokenLinkItem},
	beforeRouteEnter(to, from, next) {
		next(vm => {
			vm.$store.dispatch('checkLink');
		});
	},
	mounted() {
		// this.$store.dispatch('checkLink');
	},
	computed: {
		brokenLinkTable() {
			return this.$store.state.brokenLinkTable;
		}
	},
	methods: {
		home() {
			this.$router.push('/');
		},
		stop() {
			this.$store.commit('stop');
		}
	}
};
</script>
