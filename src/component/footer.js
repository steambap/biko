export default {
	render() {
		return (
			<footer class="py-2">
				<router-link to="/setting">
					{this.$t("footer.setting")}
				</router-link>
			</footer>
		);
	}
};
