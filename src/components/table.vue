<template>
	<table>
		<thead>
			<td>产品</td>
			<td v-for="(month, index) in dataFromParent.xAxis.categories">
				{{month}}
			</td>
		</thead>
		<tbody>
			<td>RM mini 3</td>
			<td v-for="(data, index) in dataFromParent.series[0].data">
				{{data}}
			</td>
		</tbody>
	</table>
</template>

<script>
export default {
	name: 'table',
	data () {
		return {
			
		}
	},
	props: ['dataFromParent']
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	table {
		margin-top: 40px;
		width: 100%;
		color: #fff;
	}
	thead {
		background-color: rgba(255, 255, 255, 0.12);
		font-size: 24px;
		height: 60px;
		line-height: 60px;
	}
	tbody {
		font-size: 20px;
		height: 65px;
		line-height: 65px;
		border-bottom: 1px solid rgba(255, 255, 255, 0.2);
	}
	td {
		width: 7.96%;
	}
</style>
