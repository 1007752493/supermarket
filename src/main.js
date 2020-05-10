import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index'

import fastClick from 'fastclick'
import vueLazyLoad from 'vue-lazyload'

import toast from './components/common/toast/index'

Vue.config.productionTip = false
//$bus事件总线
Vue.prototype.$bus = new Vue()

// 安装toast插件
Vue.use(toast)

//解决移动端300毫秒延迟
fastClick.attach(document.body)

//使用图片懒加载插件
Vue.use(vueLazyLoad, {
  loading: require('./assets/img/common/placeholder.png')
})

new Vue({
  render: (h) => h(App),
  router,
  store,
}).$mount('#app')