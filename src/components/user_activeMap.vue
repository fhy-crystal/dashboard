<template>
	<div class="map">
		<highmaps :options="options" style="height: 1000px;"></highmaps>
	</div>
</template>

<script>

import data from '../../static/js/data.js'; // 模拟活跃地区数据
import chartsConfig from '../../static/js/chartsConfig.js'; // 图表配置

export default {
	name: 'activeMap',
	data () {
		return {
			options: chartsConfig.user.activeMap
		}
	},
	created() {
		this.options.series[0].data = data;
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	.map {
		height: 1300px;
	}
</style>
