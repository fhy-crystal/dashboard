<template>
	<div id="app">
		<!-- <img src="./assets/logo.png"> -->
		<router-view></router-view>
	</div>
</template>

<script>
export default {
	name: 'app'
}
</script>

<style>
@import '/static/css/normalize.css';
@import '/static/css/bootstrap.css';
@import '/static/css/common.css';
#app {
	font-family: 'microsoft Yahei', 'Avenir', Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;
	padding-top: 20px;
	height: 100%;
}
</style>
