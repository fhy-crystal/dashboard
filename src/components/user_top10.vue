<template>
	<div class="content">
		<!-- 柱状图 -->
		<div class="chartsPart">
			<highcharts class="charts" :options="options" ref="highcharts"></highcharts>
		</div>
	</div>
</template>

<script>
import config from '../../static/js/config.js'; // 接口ip
import chartsConfig from '../../static/js/chartsConfig.js'; // 图表配置

export default {
	name: 'top10',
	data () {
			return {
				data: '',
				options: chartsConfig.user.topTen
			}
		},
	created() {
		let url = config.httpUrl + 'queryAppByYear';
		// 初始化时加载kit数据
		this.queryData(url);
	},
	methods: {
		// 查询统计数据
		queryData(url) {
			this.$http.get(url).then((data) => {
				// 处理折线图
				this.options.series[0].data = data.data.data[0].data.slice(0, 10);
				this.options.xAxis.categories = ['RM Mini 3', 'RM Pro', 'SP Mini 3', 'SP2', 'SP mini', 'MP2', 'MP1', 'RM Home', 'A1', 'S1'];
			});
		},
		// timeTab切换
		changeTime(index, url) {
			if (this.timeTab.activeIndex !== index) {
				// this.drawLine(url, index);
			}
			// 添加激活样式
			this.timeTab.activeIndex = index;
		},
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	.content {
		height: 1220px;
	}
	.charts {
		height: 800px;
	}
</style>
