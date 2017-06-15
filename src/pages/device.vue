<template>
	<div class="content">
		<!-- 导航 -->
		<div class="nav">
			<router-link class="backBtn" to="/">
				<img src="../assets/backIcon.png" alt="backIcon">
			</router-link>
			<ul>
				<li @click="toggle(index)" v-for="(tab, index) in navTab.tabs" :class="{active: navTab.activeIndex==index}">
					<img class="borderTl" src="../assets/borderTL.png" alt="borderTL">
					<img class="borderTR" src="../assets/borderTR.png" alt="borderTR">
					<img class="borderBL" src="../assets/borderBL.png" alt="borderBL">
					<img class="borderBR" src="../assets/borderBR.png" alt="borderBR">
					{{tab.name}}
				</li>
				<div class="clear"></div>
			</ul>
		</div>
		
		<!-- 数据统计 -->
		<ul class="dataCount">
			<li>
				<p class="title">今日激活数量</p>
				<span class="number">{{data.todayActive}}</span>
			</li>
			<li>
				<p class="title">当月激活数量</p>
				<span class="number">{{data.curMonActive}}</span>
			</li>
			<li>
				<p class="title">总激活数量</p>
				<span class="number">{{data.totalActive}}</span>
			</li>
			<div class="clear"></div>
		</ul>
		
		<!-- 柱状图 -->
		<div class="chartsPart">
			<h2 class="chartsTitle">
				{{options.title.text}}<span>近一年</span>
			</h2>
			<highcharts class="charts" :options="options" ref="highcharts"></highcharts>
		</div>

		<!-- 表格 -->
		<!-- <div class="tablePart">
			<h2 class="chartsTitle">
				{{options.subtitle.text}}
			</h2>
			<mytable :dataFromParent="options"></mytable>
		</div> -->

	</div>
</template>

<script>
	import mytable from '@/components/table'; // table组件
	import config from '../../static/js/config.js'; // 接口ip
	import chartsConfig from '../../static/js/chartsConfig.js'; // 图表配置
	
	export default {
		name: 'device',
		data () {
			return {
				data: '',
				options: chartsConfig.device.columnOption,
				// 选项卡
				navTab: {
					activeIndex: 0,
					tabs: [{
						name: 'DNA KIT 激活数量'
					},{
						name: '第三方设备激活数量'
					},{
						name: '互联网设备激活数量'
					},{
						name: '虚拟设备激活数量'
					}]
				}
			}
		},
		created() {
			let url = config.httpUrl + 'queryKit';
			let columnTitle = 'DNA KIT增长曲线';
			let tableTitle = 'DNA KIT激活数量列表';
			let ymin = 27000;
			// 初始化时加载kit数据
			this.queryData(url, columnTitle, tableTitle, ymin);
		},
		methods: {
			// tab切换
			toggle(index) {
				let url = '', columnTitle = '', tableTitle = '', ymin = 0;
				switch(index) {
					case 0: {
						url = config.httpUrl + 'queryKit';
						columnTitle = 'DNA KIT增长曲线';
						tableTitle = 'DNA KIT激活数量列表';
						ymin = 27000;
						break;
					}
					case 1: {
						url = config.httpUrl + 'queryThird';
						columnTitle = '第三方设备增长曲线';
						tableTitle = '第三方设备激活数量列表';
						ymin = 13000;
						break;
					}
					case 2: {
						url = config.httpUrl + 'queryNet';
						columnTitle = '互联网设备增长曲线';
						tableTitle = '互联网设备激活数量列表';
						ymin = 0;
						break;
					}
						
					case 3: {
						url = config.httpUrl + 'queryVirtual';
						columnTitle = '虚拟设备增长曲线';
						tableTitle = '虚拟设备激活数量列表';
						ymin = 0;
						break;
					}
						
				}
				// 防止同一个按钮点击多次下发多个查询
				if (this.navTab.activeIndex !== index) {
					// 查询
					this.queryData(url, columnTitle, tableTitle, ymin);
				}

				// 添加激活样式
				this.navTab.activeIndex = index;
			},
			// 格式化月份
			getMonthArray() {
				let curMonth = new Date().getMonth();
				let monArray = [];
				for (let i = curMonth + 1; i <= 12; i++) {
					monArray.push(i + '月')
				}
				for (let i = 1; i <= curMonth; i++) {
					monArray.push(i + '月')
				}
				return monArray;
			},
			// 查询统计数据
			queryData(url, columnTitle, tableTitle, ymin) {
				this.$http.get(url).then((data) => {
					// 处理数据统计值
					let dealArray = ['todayActive', 'curMonActive', 'totalActive'];
					this.data = data.data.data[0];
					for (let k in this.data) {
						if (dealArray.indexOf(k) > -1) {
							this.data[k] = this.data[k].toLocaleString();
						}
					}

					// 处理柱状图
					this.options.series[0].data = data.data.data[0].monActive;
					this.options.xAxis.categories = this.getMonthArray();
					this.options.yAxis.min = ymin;
					this.options.title.text = columnTitle;
					this.options.subtitle.text = tableTitle;
				});
			}
		},
		components: {
			mytable
		},
	}
</script>

<style scoped>
	.content {
		padding: 0 90px 0;
	}
	/************************公共************************/
	.nav, .dataCount {
		width: 100%;
	}
	.nav li, .dataCount li {
		float: left;
		list-style-type: none;
		color: rgba(255, 255, 255, 0.5);
	}
	/************************导航************************/
	.nav {
		padding: 0 20px 20px 20px;
		height: 120px;
		line-height: 90px;
	}
	.nav .backBtn {
		display: inline-block;
		width: 6%;
		height: 70px;
		line-height: 70px;
		background-color: rgba(255, 255, 255, 0.05);
		border-radius: 10px;
	}
	.nav ul {
		float: right;
		display: inline-block;
		padding: 0;
		width: 90%;
	}
	.nav li {
		position: relative;
		margin: 0 1%;
		width: 23%;
		height: 90px;
		line-height: 90px;
		font-size: 24px;
		background-color: rgba(255, 255, 255, 0.05);
		cursor: pointer;
	}
	.nav li img {
		display: none;
	}
	.nav li.active {
		color: rgba(255, 255, 255, 1);
	}
	.nav li.active img {
		display: block;
		position: absolute;
	}
	.nav li.active .borderTL {
		top: 0;
		left: 0;
	}
	.nav li.active .borderTR {
		top: 0;
		right: 0;
	}
	.nav li.active .borderBL {
		bottom: 0;
		left: 0;
	}
	.nav li.active .borderBR {
		bottom: 0;
		right: 0;
	}


	/************************数据统计************************/
	.dataCount {
		margin: 20px 0 20px 0;
		padding-bottom: 20px;
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

	/************************柱状图************************/
	.chartsPart {
		/*border-bottom: 1px solid rgba(255, 255, 255, 0.5);*/
		margin-top: 100px;
		margin-bottom: 40px;
	}
	.charts {
		height: 700px;
	}
	.chartsTitle {
		padding-left: 20px;
		font-size: 24px;
		color: #fff;
		text-align: left;
	}
	.chartsTitle span {
		margin-left: 20px;
		font-size: 20px;
	}

	/************************表格************************/
	.tablePart {
		margin-bottom: 100px;
	}

</style>