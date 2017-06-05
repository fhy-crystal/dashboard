<template>
	<div class="content">
		<!-- 数据统计 -->
		<ul class="dataCount">
			<li>
				<p class="title">今日活跃数量</p>
				<span class="number">{{data.todayActive}}</span>
			</li>
			<li>
				<p class="title">当月活跃数量</p>
				<span class="number">{{data.curMonActive}}</span>
			</li>
			<li>
				<p class="title">总活跃数量</p>
				<span class="number">{{data.totalActive}}</span>
			</li>
			<div class="clear"></div>
		</ul>
		
		<!-- 柱状图 -->
		<div class="chartsPart">
			<div class="top">
				<h2 class="chartsTitle">
					{{options.title.text}}
				</h2>
				<ul class="firstNav">
					<li class="firstNavItem" @click="changeTab(index, tab.queryUrl)" v-for="(tab, index) in areaTab.tabs" :class="{timeActive: areaTab.activeIndex==index&&!areaTab.isMore}">
						{{tab.name}}
					</li>
					<li class="firstNavItem more" @click="selectMore()" :class="[{timeActiveNoRadius: areaTab.isMore&&areaTab.subTabShow}, {timeActive: areaTab.isMore}]">
						{{areaTab.subName}}
					</li>
					<!-- 二级菜单 -->
					<ul class="subNav" v-show="areaTab.isMore&&areaTab.subTabShow">
						<li class="subNavItem" v-for="(subtab, index) in areaTab.subTabs" @click="selectSubTab(subtab.name)">
							{{subtab.name}}
						</li>
					</ul>
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
	name: 'activeNum',
	data () {
		return {
			data: '',
			options: chartsConfig.user.activeNum,
			areaTab: {
				activeIndex: 0,
				isMore: false,
				subTabShow: false,
				subName: '更多',
				tabs: [{
					name: '中国',
					queryUrl: ''
				},{
					name: '美国',
					queryUrl: ''
				},{
					name: '欧洲',
					queryUrl: ''
				}],
				subTabs: [{
					name: '日本',
					queryUrl: ''
				},{
					name: '韩国',
					queryUrl: ''
				},{
					name: '德国',
					queryUrl: ''
				}]
			}
		}
	},
	created() {
		let url = config.httpUrl + 'queryKit';
		let lineUrl = config.httpUrl + 'queryAppByDay'
		// 初始化时加载kit数据
		this.queryData(url);
		this.drawLine(lineUrl);
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
		},
		// 画折线
		drawLine(url) {
			this.$http.get(url).then((data) => {
				// 处理折线图
				this.options.series[0].data = data.data.data[0].data;
				let hourArr = [];
				for (let i = 0; i <= 24; i++) {
					if (i < 10) {
						i = '0' + i
					}
					hourArr.push(i + ':00')
				}
				this.options.xAxis.categories = hourArr;
			});
		},
		// areaTab切换
		changeTab(index, url) {
			if (this.areaTab.activeIndex !== index) {
				// this.drawLine(url, index);
			}
			// 添加激活样式
			this.areaTab.activeIndex = index;
			this.areaTab.isMore = false;
		},
		// 选中更多
		selectMore() {
			this.areaTab.isMore = true;
			this.areaTab.subTabShow = true;
		},
		// 选择下拉菜单
		selectSubTab(name) {
			this.areaTab.subTabShow = false;
			this.areaTab.activeIndex = 4;
			this.areaTab.subName = name;
			console.log(this.areaTab.isMore);
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

	/************************柱状图************************/
	.chartsPart {
		margin-bottom: 40px;
	}
	.charts {
		height: 700px;
	}
	.chartsPart .top h2 {
		float: left;
	}
	.chartsPart .top .firstNav {
		position: relative;
		float: right;
		margin-top: 20px;
		margin-bottom: 10px;
	}
	.chartsPart .top .firstNavItem {
		position: relative;
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
	.chartsPart .top .more:after {
		content: '';
		position: absolute;
		top: 7px;
		bottom: 0;
		right: 15px;
		margin: auto;
		width: 0; 
		height: 0; 
		border-width: 7px; 
		border-style: solid; 
		border-color: #fff transparent transparent transparent; 
		font-size: 0; 
		line-height: 0;
	}
	.chartsPart .top .timeActive {
		background-color: #2b9dff;
		border-radius: 20px;
	}
	.chartsPart .top .more.timeActiveNoRadius {
		border-bottom-right-radius: 0;
		border-bottom-left-radius: 0;
	}
	.chartsPart .top .subNav {
		position: absolute;
		right: 15px;
		top: 45px;
		z-index: 2;
		padding: 0;
	}
	.chartsPart .top .subNavItem {
		width: 115px;
		height: 45px;
		line-height: 45px;
		font-size: 24px;
		color: #fff;
		list-style-type: none;
		cursor: pointer;
		background-color: #2b9dff;
	}
	.chartsPart .top .subNavItem:last-child {
		border-bottom-right-radius: 20px;
		border-bottom-left-radius: 20px;
	}
	.chartsPart .top .subNavItem:hover {
		background-color: rgb(36, 129, 211);
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

</style>
