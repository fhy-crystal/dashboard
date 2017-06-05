import Vue from 'vue'
import Router from 'vue-router'
import dataBoard from '@/pages/dataBoard'
import device from '@/pages/device'
import user from '@/pages/user'
import appData from '@/pages/appData'
import model from '@/pages/model'

Vue.use(Router)

export default new Router({
	routes: [
		{
			path: '/',
			name: 'dataBoard',
			component: dataBoard
		},
		{
			path: '/device',
			name: 'device',
			component: device
		},
		{
			path: '/user',
			name: 'user',
			component: user
		},
		{
			path: '/app',
			name: 'app',
			component: appData
		},
		{
			path: '/model',
			name: 'model',
			component: model
		}
	]
})
