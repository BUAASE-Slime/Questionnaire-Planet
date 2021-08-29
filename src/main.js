import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import store from './store'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import GlobalInfo from './GlobalInfo'

import * as echarts from 'echarts';
// import echarts from 'echarts'
Vue.prototype.$echarts = echarts


// global mounted
Vue.prototype.GLOBAL = GlobalInfo

// axios
Vue.prototype.$axios = axios
axios.defaults.baseURL = GlobalInfo.backUrl;

// element UI
Vue.use(ElementUI);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')

