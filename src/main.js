// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import vueResource from 'vue-resource';
import highcharts from 'highcharts';
import vueHighcharts from 'vue-highcharts';
import echarts from 'echarts';


// 是否开启debug模式
Vue.config.productionTip = false;

Vue.use(vueResource);
Vue.use(highcharts);
Vue.use(vueHighcharts);
// Vue.use(echarts);
Vue.prototype.$echarts = echarts

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
});
