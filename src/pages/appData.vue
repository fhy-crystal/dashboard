<template>
	<div class="content">
		<!-- 导航 -->
		<div class="nav">
			<router-link class="backBtn" to="/">
				<img src="../assets/backIcon.png" alt="backIcon">
			</router-link>
			<ul>
				<li @click="toggle(index)" v-for="(tab, index) in navTab.tabs" :class="{navActive: navTab.activeIndex==index}">
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
				<p class="title">今日活跃</p>
				<span class="number">{{data.todayActive}}</span>
			</li>
			<li>
				<p class="title">当月新增</p>
				<span class="number">{{data.curMonActive}}</span>
			</li>
			<li>
				<p class="title">总活跃</p>
				<span class="number">{{data.totalActive}}</span>
			</li>
			<div class="clear"></div>
		</ul>
		
		<!-- 折线图 -->
		<div class="chartsPart">
			<div class="top">
				<h2 class="chartsTitle">
					{{options.title.text}}
				</h2>
				<ul>
					<li @click="changeTime(index, tab.queryUrl)" v-for="(tab, index) in timeTab.tabs" :class="{timeActive: timeTab.activeIndex==index}">
						{{tab.name}}
					</li>
					<div class="clear"></div>
				</ul>
				<div class="clear"></div>
			</div>
			<highcharts class="charts" :options="options" ref="highcharts"></highcharts>
		</div>

	</div>
</template>

<script>
	import config from '../../static/js/config.js'; // 接口ip
	import chartsConfig from '../../static/js/chartsConfig.js'; // 图表配置

	export default {
		name: 'appData',
		data () {
			return {
				data: '',
				options: chartsConfig.appData.lineOption,
				// 选项卡
				navTab: {
					activeIndex: 0,
					tabs: [{
						name: 'APP活跃数量'
					}
					// ,{
					// 	name: 'iOS APP日活'
					// },{
					// 	name: 'Android APP日活'
					// }
					],
				},
				timeTab: {
					activeIndex: 0,
					tabs: [{
						name: '当年',
						queryUrl: ''
					},{
						name: '当月',
						queryUrl: ''
					},{
						name: '当天',
						queryUrl: ''
					}],
				}
			}
		},
		created() {
			let url = config.httpUrl + 'queryKit';
			let lineTitle = 'APP实时活跃曲线';
			this.timeTab.tabs[0].queryUrl = config.httpUrl + 'queryAppByYear';
			this.timeTab.tabs[1].queryUrl = config.httpUrl + 'queryAppByMonth';
			this.timeTab.tabs[2].queryUrl = config.httpUrl + 'queryAppByDay';
			// 初始化时加载kit数据
			this.queryData(url);
			// 绘制折线图，默认查询当年
			this.drawLine(this.timeTab.tabs[0].queryUrl, 0);
		},
		methods: {
			// navTab切换
			toggle(index) {
				let url = '', lineTitle = '';
				switch(index) {
					case 0: {
						url = config.httpUrl + 'queryKit';
						lineTitle = 'APP实时活跃曲线';
						this.timeTab.tabs[0].queryUrl = config.httpUrl + 'queryAppByYear';
						this.timeTab.tabs[1].queryUrl = config.httpUrl + 'queryAppByMonth';
						this.timeTab.tabs[2].queryUrl = config.httpUrl + 'queryAppByDay';
						break;
					}
					case 1: {
						url = config.httpUrl + 'queryNet';
						lineTitle = 'iOS APP实时活跃曲线';
						this.timeTab.tabs[0].queryUrl = config.httpUrl + 'queryiosByYear';
						this.timeTab.tabs[1].queryUrl = config.httpUrl + 'queryiosByMonth';
						this.timeTab.tabs[2].queryUrl = config.httpUrl + 'queryiosByDay';
						break;
					}
					case 2: {
						url = config.httpUrl + 'queryKit';
						lineTitle = 'Android APP实时活跃曲线';
						this.timeTab.tabs[0].queryUrl = config.httpUrl + 'queryAppByYear';
						this.timeTab.tabs[1].queryUrl = config.httpUrl + 'queryAppByMonth';
						this.timeTab.tabs[2].queryUrl = config.httpUrl + 'queryAppByDay';
						break;
					}
						
				}
				// 防止同一个按钮点击多次下发多个查询
				if (this.navTab.activeIndex !== index) {
					// 查询数据
					this.queryData(url);
					// 绘制折线图，默认查询当年
					this.drawLine(this.timeTab.tabs[0].queryUrl, 0);
				}

				// 添加激活样式
				this.navTab.activeIndex = index;
			},
			// timeTab切换
			changeTime(index, url) {
				if (this.timeTab.activeIndex !== index) {
					this.drawLine(url, index);
				}
				// 添加激活样式
				this.timeTab.activeIndex = index;
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
			queryData(url) {
				this.$http.get(url).then((data) => {
					// 处理数据统计值
					let dealArray = ['todayActive', 'curMonActive', 'totalActive'];
					this.data = data.data.data[3];
					for (let k in this.data) {
						if (dealArray.indexOf(k) > -1) {
							this.data[k] = this.data[k].toLocaleString();
						}
					}
				});
			},
			// 折线数据
			drawLine(url, index) {
				this.$http.get(url).then((data) => {
					this.options.series[0].data = data.data.data[0].data;
					switch(index) {
						case 0: { // 年
							this.options.xAxis.categories = this.getMonthArray();
							break;
						}
						case 1: { // 月
							let dayArr = [];
							for (let i = 1; i <= 30; i++) {
								dayArr.push(i + '日')
							}
							this.options.xAxis.categories = dayArr;
							break;
						}
						case 2: { // 日
							let hourArr1 = [], hourArr2 = [];
							for (let i = 0; i < 24; i++) {
								if (i >= 18) {
									hourArr2.push(i + ':00');
								} else {
									if (i < 10) {
										i = '0' + i;
									}
									hourArr1.push(i + ':00');
								}
							}
							let hourArr = hourArr2.concat(hourArr1);
							this.options.xAxis.categories = hourArr;
							break;
						}
					}
				})
			}
		}
	}
</script>

<style scoped>
	.content {
		padding: 0 90px 0;
		margin-bottom: 180px;
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
	.nav li.navActive {
		color: rgba(255, 255, 255, 1);
	}
	.nav li.navActive img {
		display: block;
		position: absolute;
	}
	.nav li.navActive .borderTL {
		top: 0;
		left: 0;
	}
	.nav li.navActive .borderTR {
		top: 0;
		right: 0;
	}
	.nav li.navActive .borderBL {
		bottom: 0;
		left: 0;
	}
	.nav li.navActive .borderBR {
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

	/************************折线图************************/
	.chartsPart {
		margin-bottom: 40px;
	}
	.chartsPart .top h2 {
		float: left;
	}
	.chartsPart .top ul {
		float: right;
		margin-top: 20px;
    	margin-bottom: 10px;
	}
	.chartsPart .top li {
		margin: 0 15px;
		float: left;
		width: 115px;
		height: 45px;
		line-height: 45px;
		font-size: 24px;
		color: #fff;
		list-style-type: none;
		cursor: pointer;
	}
	.chartsPart .top li.timeActive {
		background-color: #2b9dff;
		border-radius: 20px;
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

</style>