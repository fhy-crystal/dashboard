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
		let url = config.httpUrl + 'querykit';
		// 初始化时加载kit数据
		this.queryData(url);
	},
	methods: {
		// 查询统计数据
		queryData(url) {
			this.$http.get(url).then((data) => {
				// 处理折线图
				this.options.series[0].data = data.data.data[2].monActive.slice(0, 10);
				this.options.xAxis.categories = ['SP mini', '一代插座', 'OEM 插座', 'RM', '黑豆', '格力 空调 家用', '格力 空调 商用', 'SP2', 'S1', 'A1'];
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
