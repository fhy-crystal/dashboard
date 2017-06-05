<template>
	<div class="content">
		<!-- 数据统计 -->
		<ul class="dataCount">
			<li>
				<p class="title">训练样本量</p>
				<span class="number">{{data.todayActive}}</span>
			</li>
			<li>
				<p class="title">数据处理进程</p>
				<span class="number">{{data.curMonActive}}</span>
			</li>
			<li>
				<p class="title">预存成功率</p>
				<span class="number">{{data.totalActive}}</span>
			</li>
			<div class="clear"></div>
		</ul>
		
		<!-- 图片 -->
		<div class="chartsPart">
			<div class="top">
				<h2 class="chartsTitle">
					{{chartsTitle}}
				</h2>
			</div>
			<img src="../assets/airModel.png" alt="airModel">
		</div>
	</div>
</template>

<script>
import config from '../../static/js/config.js'
export default {
	name: 'activeNum',
	data () {
		return {
			data: '',
			chartsTitle: '空调模型原理'
		}
	},
	created() {
		let url = config.httpUrl + 'queryKit';
		// 初始化时加载kit数据
		this.queryData(url);
	},
	methods: {
		// 查询统计数据
		queryData(url) {
			this.$http.get(url).then((data) => {
				// 处理数据统计值
				let dealArray = ['todayActive', 'curMonActive', 'totalActive'];
				this.data = data.data.data[0];
				for (let k in this.data) {
					if (dealArray.indexOf(k) > 0) {
						this.data[k] = this.data[k].toLocaleString();
					}
				}
			});
		}
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	/************************数据统计************************/
	.content {
		padding: 0 90px 0;
		margin-bottom: 180px;
	}
	.dataCount {
		width: 100%;
	}
	.dataCount li {
		float: left;
		list-style-type: none;
		color: rgba(255, 255, 255, 0.5);
	}
	.dataCount {
		margin: 70px 0 30px 0;
		padding-bottom: 50px;
		border-bottom: 1px solid rgba(255, 255, 255, 0.5);
	}
	.dataCount li {
		width: 33.3333%;
		border-left: 2px solid rgba(255, 255, 255, 0.5);
	}
	.dataCount li:first-child {
		border-left: 0;
	}
	.dataCount .title {
		font-size: 24px;
	}
	.dataCount .number {
		font-size: 50px;
		color: rgba(255, 255, 255, 1);
	}
	
	/************************图片说明************************/
	.chartsPart {
		margin-bottom: 40px;
	}
	.charts {
		height: 700px;
	}
	.chartsPart .top h2 {
		margin-bottom: 30px;
		color: #fff;
		text-align: left;
		text-indent: 65px;
	}
</style>
