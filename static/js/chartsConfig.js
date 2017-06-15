import highcharts from 'highcharts';
import loadMap from 'highcharts/modules/map';
import worldMap from '../../static/js/worldMap.js';
loadMap(highcharts);

let chartsConfig = {
	// 首页
	'dataBoard': {
		// 折线图配置
		'lineOptions': {
			chart: {
				type: 'area',
				backgroundColor: 'rgba(255, 255, 255, 0)'
			},
			credits: { 
				enabled: false //不显示LOGO 
			},
			title: {
				text: 'APP日活跃数量',
				y: -100
			},
			colors: ['rgb(18, 136, 234)'],
			xAxis: {
				gridLineWidth: 0, // 不显示网格
				tickWidth: 0, // 不显示刻度
				lineWidth:0, // 不显示轴线
				labels: {
					style: {
						color: '#fff'
					}
				},
				categories: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
			},
			yAxis: {
				title: {
					text: '',
					align: 'high',
					offset: 0,
					rotation: 0,
					y: -20,
					style: {
						color: '#fff'
					}
				},
				labels: {
					style: {
						color: '#fff'
					}
				},
				min: 40000,
				gridLineWidth: 0
			},
			tooltip: {
				borderWidth: 1,
				shadow: false,
				shape: 'callout'
			},
			legend: {
				enabled: false
			},
			plotOptions: {
				series: {
					fillColor: {
						linearGradient: [0, 0, 0, 300],
						stops: [
							[0, '#08477b'],
							[1, highcharts.Color(highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
						]
					}
				}
			},
			series: [{
				name: 'APP日活',
				color: 'rgb(18, 136, 234)',
				marker: { 
					radius: 4,
					lineColor: '#fff',
					lineWidth: 2,
					states: {
						hover: {
							lineWidth: 2,
							radius: 4
						}
					}
				},
				states: {
					hover: {
						halo: false
					}
				},
				data: []
			}]
		},
		// 柱状图配置
		'columnOption': {
			chart: {
				type: 'column',
				margin: 75,
				options3d: {
						enabled: true,
						alpha: 10,
						beta: 25,
						depth: 70
				},
				backgroundColor: 'rgba(255, 255, 255, 0)'
			},
			credits: { 
				enabled: false //不显示LOGO 
			},
			title: {
				text: '用户活跃数量',
				y: -100
			},
			colors: ['rgb(18, 136, 234)'],
			xAxis: {
				gridLineWidth: 0, // 不显示网格
				tickWidth: 0, // 不显示刻度
				lineWidth:0, // 不显示轴线
				labels: {
					style: {
						color: '#fff'
					}
				},
				categories: []
			},
			yAxis: {
				title: {
					text: '',
					align: 'high',
					offset: 0,
					rotation: 0,
					y: -20,
					style: {
						color: '#fff'
					}
				},
				labels: {
					style: {
						color: '#fff'
					}
				},
				min: 2500,
				gridLineWidth: 0
			},
			legend: {
				enabled: false
			},
			plotOptions: {
				column: {
					pointPadding: 0.2,
					pointWidth: 30,
					borderWidth: 0,
					color: {
						linearGradient: {
							x1: 0, 
							y1: 0, 
							x2: 0, 
							y2: 1
						}, //横向渐变效果 如果将x2和y2值交换将会变成纵向渐变效果  
						stops: [  
							[0, '#00a3e9'],  
							[1, '#0077e6']  
						]
					}
				}
			},
			series: [{
				name: '活跃用户',
				data: []
			}]
		},
		// 饼状图配置
		'pieOption': {
			chart: {
				plotBackgroundColor: null,
				plotBorderWidth: null,
				plotShadow: false,
				backgroundColor: 'rgba(255, 255, 255, 0)'
			},
			credits: {
				enabled: false
			},
			colors: ['#18b1fa', '#0079e6', '#0068d5', '#3b85ff'],
			title: {
				text: '设备活跃数量',
				y: -100,
			},
			tooltip: {
				headerFormat: '{series.name}<br>',
				pointFormat: '{point.name}: <b>{point.percentage:.1f}%</b>'
			},
			plotOptions: {
				pie: {
					allowPointSelect: true,
					innerSize: 180,
					cursor: 'pointer',
					dataLabels: {
						enabled: true,
						format: '<span>{point.name}</span>: {point.y}',
						style: {
							color: '#fff'
						},
						connectorColor: '#fff', // 连接线
						softConnector: false
					},
					borderWidth: 0
				}
			},
			series: [{
				type: 'pie',
				name: '设备活跃数量',
				data: []
			}]
		}
	},

	// 设备活跃数量页面
	'device': {
		'columnOption': {
			chart: {
				type: 'column',
				margin: 75,
				backgroundColor: 'rgba(255, 255, 255, 0)'
			},
			credits: { 
				enabled: false //不显示LOGO 
			},
			title: {
				text: 'DNA KIT增长曲线',
				y: -100
			},
			subtitle: {
				text: 'DNA KIT激活数量列表',
				y: -100
			},
			colors: ['rgb(18, 136, 234)'],
			xAxis: {
				gridLineWidth: 0, // 不显示网格
				tickWidth: 0, // 不显示刻度
				lineWidth:0, // 不显示轴线
				labels: {
					style: {
						color: '#fff',
						fontSize: 16
					}
				},
				categories: []
			},
			yAxis: {
				title: {
					text: '',
					align: 'high',
					offset: 0,
					rotation: 0,
					y: -40,
					x: 15,
					style: {
						color: '#fff',
						fontSize: 16
					}
				},
				labels: {
					style: {
						color: '#fff',
						fontSize: 16
					}
				},
				gridLineWidth: 0
			},
			legend: {
				enabled: false
			},
			plotOptions: {
				column: {
					pointPadding: 0.2,
					borderWidth: 0,
					color: {
						linearGradient: {
							x1: 0, 
							y1: 0, 
							x2: 0, 
							y2: 1
						}, //横向渐变效果 如果将x2和y2值交换将会变成纵向渐变效果  
						stops: [  
							[0, '#023b8e'],  
							[1, '#198ab6']  
						]
					}
				}
			},
			series: [{
				name: '活跃用户',
				data: []
			}]
		}
	}, 

	// app活跃数量
	'appData': {
		'lineOption': {
			chart: {
				type: 'line',
				margin: 75,
				backgroundColor: 'rgba(255, 255, 255, 0)'
			},
			credits: { 
				enabled: false //不显示LOGO 
			},
			title: {
				text: 'APP实时活跃曲线',
				y: -100
			},
			colors: ['rgb(18, 136, 234)'],
			xAxis: {
				gridLineWidth: 0, // 不显示网格
				tickWidth: 0, // 不显示刻度
				lineWidth:0, // 不显示轴线
				labels: {
					style: {
						color: '#fff',
						fontSize: 16
					}
				},
				categories: []
			},
			yAxis: {
				title: {
					text: '',
					align: 'high',
					offset: 0,
					rotation: 0,
					y: -40,
					x: 15,
					style: {
						color: '#fff',
						fontSize: 16
					}
				},
				labels: {
					style: {
						color: '#fff',
						fontSize: 16
					}
				},
				gridLineWidth: 0
			},
			legend: {
				enabled: false
			},
			series: [{
				name: '活跃数量',
				color: 'rgb(18, 136, 234)',
				marker: { 
					radius: 4,
					lineColor: '#fff',
					lineWidth: 2,
					states: {
						hover: {
							lineWidth: 2,
							radius: 4
						}
					}
				},
				states: {
					hover: {
						halo: false
					}
				},
				data: []
			}]
		}
	},

	// 用户活跃数量
	'user': {
		'activeLine': {
			chart: {
				type: 'line',
				margin: 75,
				backgroundColor: 'rgba(255, 255, 255, 0)'
			},
			credits: { 
				enabled: false //不显示LOGO 
			},
			title: {
				text: '用户实时活跃曲线',
				y: -100
			},
			colors: ['rgb(18, 136, 234)'],
			xAxis: {
				gridLineWidth: 0, // 不显示网格
				tickWidth: 0, // 不显示刻度
				lineWidth:0, // 不显示轴线
				labels: {
					style: {
						color: '#fff',
						fontSize: 16
					}
				},
				categories: []
			},
			yAxis: {
				title: {
					text: '',
					align: 'high',
					offset: 0,
					rotation: 0,
					y: -40,
					x: 15,
					style: {
						color: '#fff',
						fontSize: 16
					}
				},
				labels: {
					style: {
						color: '#fff',
						fontSize: 16
					}
				},
				gridLineWidth: 0
			},
			legend: {
				enabled: false
			},
			series: [{
				name: '活跃数量',
				color: 'rgb(18, 136, 234)',
				marker: { 
					radius: 4,
					lineColor: '#fff',
					lineWidth: 2,
					states: {
						hover: {
							lineWidth: 2,
							radius: 4
						}
					}
				},
				states: {
					hover: {
						halo: false
					}
				},
				data: []
			}]
		},
		'activeMap': {
			chart: {
				backgroundColor: 'rgba(255, 255, 255, 0)'
			},
			title: {
				text: '用户实时活跃区域',
				y: -100
			},
			credits: { 
				enabled: false //不显示LOGO 
			},
			mapNavigation: {
				enabled: true,
				buttonOptions: {
					verticalAlign: 'top'
				}
			},
			colorAxis: {
				min: 1,
				max: 100000,
				stops: [
					[0, 'rgba(221, 221, 221, 0.5)'],
					[1, 'rgba(50, 200, 255, 0.5)']
				],
				tickPixelInterval: 100
			},
			colors: ['#000'],
			series: [{
				data: '',
				mapData: worldMap,
				joinBy: ['iso-a2', 'code'],
				name: '活跃设备数',
				states: {
					hover: {
						color: '#e03030'
					}
				},
				// tooltip: {
				// 	valueSuffix: '/台'
				// }
			}]
		},
		'activeNum': {
			chart: {
				type: 'line',
				margin: 75,
				backgroundColor: 'rgba(255, 255, 255, 0)'
			},
			credits: { 
				enabled: false //不显示LOGO 
			},
			title: {
				text: '用户活跃曲线',
				y: -100
			},
			colors: ['rgb(18, 136, 234)'],
			xAxis: {
				gridLineWidth: 0, // 不显示网格
				tickWidth: 0, // 不显示刻度
				lineWidth:0, // 不显示轴线
				labels: {
					style: {
						color: '#fff',
						fontSize: 16
					}
				},
				categories: []
			},
			yAxis: {
				title: {
					text: '',
					align: 'high',
					offset: 0,
					rotation: 0,
					y: -40,
					x: 15,
					style: {
						color: '#fff',
						fontSize: 16
					}
				},
				labels: {
					style: {
						color: '#fff',
						fontSize: 16
					}
				},
				gridLineWidth: 0
			},
			legend: {
				enabled: false
			},
			series: [{
				name: '活跃数量',
				color: 'rgb(18, 136, 234)',
				marker: { 
					radius: 4,
					lineColor: '#fff',
					lineWidth: 2,
					states: {
						hover: {
							lineWidth: 2,
							radius: 4
						}
					}
				},
				states: {
					hover: {
						halo: false
					}
				},
				data: []
			}]
		},
		'topTen': {
			chart: {
				type: 'bar',
				margin: 75,
				backgroundColor: 'rgba(255, 255, 255, 0)'
			},
			credits: { 
				enabled: false //不显示LOGO 
			},
			title: {
				text: 'TOP 10',
				y: -100
			},
			colors: ['rgb(18, 136, 234)'],
			xAxis: {
				gridLineWidth: 0, // 不显示网格
				tickWidth: 0, // 不显示刻度
				lineWidth:0, // 不显示轴线
				labels: {
					style: {
						color: '#fff',
						fontSize: 16
					}
				},
				categories: []
			},
			yAxis: {
				title: {
					text: '',
					align: 'high',
					x: 15,
					style: {
						color: '#fff',
						fontSize: 16
					}
				},
				labels: {
					style: {
						color: '#fff',
						fontSize: 16,
						overflow: 'justify'
					}
				},
				gridLineWidth: 0
			},
			legend: {
				enabled: false
			},
			plotOptions: {
				bar: {
					dataLabels: {
						enabled: true,  //显示数量提示
						color: '#fff',
						// formatter : function() {
						// 	a = this.y/data.total*100;	//a为当前柱状图y轴值除以总数然后乘以100
						// 	return a.toFixed(2) + "%"+"<br/>"+this.y+"个";  //返回百分比和个数
						// }
					}
				}
			},
			series: [{
				name: '活跃数量',
				borderWidth: 0,
				data: []
			}]
		}
	}
};
export default chartsConfig