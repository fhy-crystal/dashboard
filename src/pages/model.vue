<template>
	<div class="content">
		<!-- 导航 -->
		<div class="nav">
			<router-link class="backBtn" to="/">
				<img src="../assets/backIcon.png" alt="backIcon">
			</router-link>
			<ul>
				<li @click="toggle(index, tab.view)" v-for="(tab, index) in navTab.tabs" :class="{active: navTab.activeIndex==index}">
					<img class="borderTl" src="../assets/borderTL.png" alt="borderTL">
					<img class="borderTR" src="../assets/borderTR.png" alt="borderTR">
					<img class="borderBL" src="../assets/borderBL.png" alt="borderBL">
					<img class="borderBR" src="../assets/borderBR.png" alt="borderBR">
					{{tab.name}}
				</li>
				<div class="clear"></div>
			</ul>
		</div>

		<component :is="navTab.currentView"></component>

	</div>
</template>

<script>
	import airModel from '@/components/model_air'
	import config from '../../static/js/config.js'; // 接口ip
	
	export default {
		name: 'model',
		data () {
			return {
				data: '',
				options: '',
				// 选项卡
				navTab: {
					activeIndex: 0,
					currentView: 'airModel',
					tabs: [{
						name: '空调模型',
						view: 'airModel'
					}]
				}
			}
		},
		methods: {
			// tab切换
			toggle(index, view) {
				this.navTab.activeIndex = index;
				this.navTab.currentView = view;
				let url = '', columnTitle = '', tableTitle = '';
				switch(index) {
					case 0: {
						url = config.httpUrl + 'queryKit';
						columnTitle = 'DNA KIT增长曲线';
						tableTitle = 'DNA KIT激活数量列表';
						break;
					}
					case 1: {
						url = config.httpUrl + 'queryNet';
						columnTitle = '第三方设备增长曲线';
						tableTitle = '第三方设备激活数量列表';
						break;
					}
					case 2: {
						url = config.httpUrl + 'queryKit';
						columnTitle = '互联网设备增长曲线';
						tableTitle = '互联网设备激活数量列表';
						break;
					}
						
					case 3: {
						url = config.httpUrl + 'queryNet';
						columnTitle = '虚拟设备增长曲线';
						tableTitle = '虚拟设备激活数量列表';
						break;
					}
						
				}
			},
		},
		components: {
			airModel
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
</style>