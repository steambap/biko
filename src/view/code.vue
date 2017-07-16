<template>
	<div class="container">
		<div class="row">
			<div class="col">
				<prism :code="code"></prism>
			</div>
		</div>
	</div>
</template>

<script>
import prism from '../component/prism';

export default {
	name: 'code-view',
	components: {prism},
	computed: {
		code() {
			return '<html>2</html>';
		}
	}
}
</script>
