<template>
	<div class="content">
		<!-- 图表 -->
		<ul class="chart">
			<li class="link">
				<!-- 边框 -->
				<div class="border">
					<img class="borderTl" src="../assets/borderTL.png" alt="borderTL">
					<img class="borderTR" src="../assets/borderTR.png" alt="borderTR">
					<img class="borderBL" src="../assets/borderBL.png" alt="borderBL">
					<img class="borderBR" src="../assets/borderBR.png" alt="borderBR">
				</div>

				<router-link class="routerLink" to="/device">
					<h4 class="title">设备活跃数量</h4>
					<h2 class="title" v-text="pie.totalNumber"></h2>
					<highcharts :options="pie.options" ref="highcharts"></highcharts>
				</router-link>
			</li>
			<li class="link">
				<!-- 边框 -->
				<div class="border">
					<img class="borderTl" src="../assets/borderTL.png" alt="borderTL">
					<img class="borderTR" src="../assets/borderTR.png" alt="borderTR">
					<img class="borderBL" src="../assets/borderBL.png" alt="borderBL">
					<img class="borderBR" src="../assets/borderBR.png" alt="borderBR">
				</div>

				<router-link class="routerLink" to="/user">
					<h4 class="title">用户活跃数量</h4>
					<h2 class="title" v-text="column.totalNumber"></h2>
					<highcharts :options="column.options" ref="highcharts"></highcharts>
				</router-link>
			</li>
			<li class="link">
				<!-- 边框 -->
				<div class="border">
					<img class="borderTl" src="../assets/borderTL.png" alt="borderTL">
					<img class="borderTR" src="../assets/borderTR.png" alt="borderTR">
					<img class="borderBL" src="../assets/borderBL.png" alt="borderBL">
					<img class="borderBR" src="../assets/borderBR.png" alt="borderBR">
				</div>

				<router-link class="routerLink" to="/app">
					<h4 class="title">APP日活跃数量</h4>
					<h2 class="title" v-text="line.totalNumber"></h2>
					<highcharts :options="line.options" ref="highcharts"></highcharts>
				</router-link>
			</li>
			<div class="clear"></div>
		</ul>

		<!-- 数字流 -->
		<div class="dataflow">
			<div class="dataContainer" :style="{'background': 'url(' + backgroundImg.data + ') no-repeat'}"></div>
			<div class="text">
				<h1>{{line.totalNumber}} <span>条</span></h1>
				<h2>训练样本量</h2>
			</div>
		</div>

		<!-- 水槽 -->
		<div class="waterBox">
			<!-- 波浪 -->
			<div class="waveContainer">
				<div class="wave" :style="{background: 'url(' + backgroundImg.wave + ') no-repeat'}"></div>
			</div>
			
			<!-- 刻度 -->
			<!-- <ul class="ticker">
				<li v-for="(item, index) in tickerData">
					{{item}}
				</li>
			</ul> -->
			
			<!-- 气泡 -->
			<ul class="bubble">
				<li v-for="(item, index) in bubbleData" :style="{background: 'url(' + backgroundImg.bubble + ') no-repeat center'}" >
					<router-link :to="item.routeUrl" :class="{moduleDisabled: item.num==0}">
						<div class="text">
							<p class="num" :class="{isHidden: item.num==0}">{{item.num}}%</p>
							<p class="title">{{item.title}}</p>
							<p class="subTitle">{{item.subTitle}}</p>
						</div>
						<percent :dataFromParent="item.num" :itemIndex="index"></percent>
					</router-link>
				</li>
				<div class="clear"></div>
			</ul>
		</div>
	</div>
</template>

<script>
	import percent from '@/components/percent'; // 百分比组件
	import config from '../../static/js/config.js'; // 接口ip
	import chartsConfig from '../../static/js/chartsConfig.js'; // 图表配置

	// 引入背景图片
	import dataImg from '../assets/data.png';
	import waveImg from '../assets/wave.png';
	import bubbleImg from '../assets/bubble.png';

	export default {
		name: 'dataBoard',
		data () {
			return {
				data: '',
				line: {
					options: chartsConfig.dataBoard.lineOptions,
					totalNumber: 0
				},
				column: {
					options: chartsConfig.dataBoard.columnOption,
					totalNumber: 0
				},
				pie: {
					options: chartsConfig.dataBoard.pieOption,
					totalNumber: 0
				},
				// 背景图
				backgroundImg: {
					data: dataImg,
					wave: waveImg,
					bubble: bubbleImg
				},
				// 气泡数据
				bubbleData: [{
					num: 90.88,
					title: '空调模型',
					subTitle: '预测率',
					routeUrl: 'model'
				},{
					num: 0,
					title: '恒温恒湿模型',
					subTitle: '',
					routeUrl: ''
				},{
					num: 0,
					title: '电视模型',
					subTitle: '',
					routeUrl: ''
				},{
					num: 0,
					title: '插座模型',
					subTitle: '',
					routeUrl: ''
				},{
					num: 0,
					title: '其他模型',
					subTitle: '',
					routeUrl: ''
				}],
				// 刻度条
				tickerData: ['单位：万', 180, 160, 140, 120, 100, 80, 60, 40, 20, 0]
			}
		},
		created() {
			this.$http.get(config.httpUrl + 'queryKit').then((data) => {
				this.line.options.series[0].data = data.data.data[0].monActive;
				this.line.totalNumber = data.data.data[0].totalActive.toLocaleString();
				this.line.options.xAxis.categories = this.getMonthArray();
				// 计算刻度值
				this.calTickerData(data.data.data[0].totalActive);

				this.column.options.series[0].data = data.data.data[1].monActive;
				this.column.totalNumber = data.data.data[1].totalActive.toLocaleString();
				this.column.options.xAxis.categories = this.getMonthArray();
			});

			this.$http.get(config.httpUrl + 'queryDev').then((data) => {
				for (let i = 0; i < data.data.data[0].data.length; i++) {
					for (let j = 0; j < data.data.data[0].data[i].length; j++) {
						switch(data.data.data[0].data[i][j]) {
							case 'netDev':
								data.data.data[0].data[i][j] = '互联网设备';
								break;
							case 'thirdDev':
								data.data.data[0].data[i][j] = '三方设备';
								break;
							case 'virtualDev':
								data.data.data[0].data[i][j] = '虚拟设备';
								break;
							case 'dnaDev':
								data.data.data[0].data[i][j] = 'DNA KIT';
								break;
						}
					}
				}
				this.pie.options.series[0].data = data.data.data[0].data;
				this.pie.totalNumber = data.data.data[0].total.toLocaleString();
			});
		},
		mounted() {

		},
		methods: {
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
			// 计算刻度值
			calTickerData(number) {
				let piece = 10;
				let tenThousand = Math.ceil(number / 100000) * 10;
				let param = tenThousand / piece;
				for (let i = 1; i <= piece; i++) {
					this.tickerData[i] = param * (piece - i + 1);
				}
			}
		},
		components: {
			percent
		},
	}
</script>

<style scoped>
	.content {
		overflow: hidden;
	}
	/************************图表************************/
	.chart {
		padding: 0;
		margin-bottom: 0;
	}
	.chart .link {
		display: inline-block;
		position: relative;
		float: left;
		width: 31.3333%;
		margin: 0 1%;
		list-style-type: none;
		background: rgba(255, 255, 255, 0.05);
	}
	.chart .routerLink {
		display: inline-block;
		width: 100%;
		height: 100%;
	}
	.chart .routerLink:hover {
		text-decoration: none;
	}
	.chart .border img {
		display: block;
		position: absolute;
	}
	.chart .border .borderTL {
		top: 0;
		left: 0;
	}
	.chart .border .borderTR {
		top: 0;
		right: 0;
	}
	.chart .border .borderBL {
		bottom: 0;
		left: 0;
	}
	.chart .border .borderBR {
		bottom: 0;
		right: 0;
	}
	.chart .title {
		color: #fff;
		text-decoration: none;
	}
	.chart h4 {
		margin: 30px 0 0 0;
		font-size: 20px;
	}
	.chart h2 {
		margin: 20px 0 0 0;
		font-size: 50px;
	}
	
	/************************数据流************************/
	.dataflow {
		position: relative;
		z-index: 1;
		height: 350px;
	}
	.dataflow .dataContainer {
		width: 100%;
		height: 100%;
		opacity: 0.5;
		-webkit-animation: dataAnime 40s ease-in-out infinite;
		-moz-animation: dataAnime 40s ease-in-out infinite;
		-o-animation: dataAnime 40s ease-in-out infinite;
		animation: dataAnime 40s linear infinite;
	}
	.dataflow .text {
		position: absolute;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		margin: auto;
		color: #fff;
		height: 150px;
	}
	.dataflow h1 {
		margin: 0;
		font-size: 80px;
		text-shadow: -1px 3px 0px rgba(255, 255, 255, 0.3)
	}
	.dataflow h1 span {
		font-size: 40px;
		text-shadow: 0 0;
	}

	/************************水槽************************/
	.waterBox {
		position: relative;
		top: 0;
		z-index: 2;
		margin: auto;
		width: 100%;
		height: 500px;
		background: linear-gradient(#009eda, #0068d5) no-repeat;
	}
	/*.waterBox .ticker {
		width: 120px;
		position: absolute;
		top: -80px;
		left: -150px;
	}
	.waterBox .ticker li {
		margin-bottom: 25px;
		list-style-type: none;
		color: #78909c;
		font-size: 20px;
	}*/
	.waterBox .waveContainer {
		position: absolute;
		top: -80px;
		width: 100%;
		height: 80px;
		overflow: hidden;
	}
	.waterBox .waveContainer .wave {
		width: 3000px;
		height: 80px;
		-webkit-animation: waveAnime 20s ease-in-out infinite alternate;
		-moz-animation: waveAnime 20s ease-in-out infinite alternate;
		-o-animation: waveAnime 20s ease-in-out infinite alternate;
		animation: waveAnime 20s ease-in-out infinite alternate;
	}

	.waterBox .bubble {
		position: absolute;
		top: 0;
		bottom: 0;
		margin: auto;
		width: 100%;
		height: 300px;
	}

	.waterBox .bubble li {
		position: relative;
		float: left;
		list-style-type: none;
		margin: 0 2%;
		width: 16%;
		height: 300px;
	}
	.waterBox .bubble li:first-child:before {
		content: '';
		position: absolute;
		bottom: -5%;
		left: 10%;
		display: inline-block;
		width: 40px;
		height: 40px;
		background-color: rgba(255, 255, 255, 0.4);
		border-radius: 100%;
	}
	.waterBox .bubble li:first-child:after {
		content: '';
		position: absolute;
		bottom: -20%;
		left: 2%;
		display: inline-block;
		width: 20px;
		height: 20px;
		background-color: rgba(255, 255, 255, 0.4);
		border-radius: 100%;
	}
	.waterBox .bubble li a {
		color: #fff;
	}
	.waterBox .bubble li a.moduleDisabled {
		color: rgba(255, 255, 255, 0.5);
		cursor: default;
	}
	.waterBox .bubble li .text {
		position: absolute;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		margin: auto;
		height: 125px;
	}
	.waterBox .bubble li .num {
		font-size: 48px;
	}
	.waterBox .bubble li .num.isHidden {
		color: rgba(255, 255, 255, 0);
	}
	.waterBox .bubble li .title {
		font-size: 24px;
	}
	.waterBox .bubble li .subTitle {
		font-size: 12px;
	}
	.waterBox .bubble li canvas {
		-webkit-animation: percentCircleAnime 2s ease-in-out infinite alternate;
		-moz-animation: percentCircleAnime 2s ease-in-out infinite alternate;
		-o-animation: percentCircleAnime 2s ease-in-out infinite alternate;
		animation: percentCircleAnime 2s ease-in-out infinite alternate;
	}

	/*数字动画*/
	@-webkit-keyframes dataAnime {
		0% {
			background-position: center bottom;
		}
		100% {
			background-position: center top;
		}
	}
	@-moz-keyframes dataAnime {
		0% {
			background-position: center bottom;
		}
		100% {
			background-position: center top;
		}
	}
	@-o-keyframes dataAnime {
		0% {
			background-position: center bottom;
		}
		100% {
			background-position: center top;
		}
	}
	@keyframes dataAnime {
		0% {
			background-position: center bottom;
		}
		100% {
			background-position: center top;
		}
	}
	
	/*水波动画*/
	@-webkit-keyframes waveAnime {
		0% {
			background-position: 0 0;
		}
		100% {
			background-position: -2200px 0;
		}
	}
	@-moz-keyframes waveAnime {
		0% {
			background-position: 0 0;
		}
		100% {
			background-position: -2200px 0;
		}
	}
	@-o-keyframes waveAnime {
		0% {
			background-position: 0 0;
		}
		100% {
			background-position: -2200px 0;
		}
	}
	@keyframes waveAnime {
		0% {
			background-position: 0 0;
		}
		100% {
			background-position: -2200px 0;
		}
	}

	/*百分比动画*/
	@-webkit-keyframes percentCircleAnime {
		0% {
			-webkit-transform: rotate(0deg);
		}
		100% {
			-webkit-transform: rotate(-10deg);
		}
	}
	@-moz-keyframes percentCircleAnime {
		0% {
			-moz-transform: rotate(0deg);
		}
		100% {
			-moz-transform: rotate(-10deg);
		}
	}
	@-o-keyframes percentCircleAnime {
		0% {
			-o-transform: rotate(0deg);
		}
		100% {
			-o-transform: rotate(-10deg);
		}
	}
	@keyframes percentCircleAnime {
		0% {
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(-10deg);
		}
	}
</style>