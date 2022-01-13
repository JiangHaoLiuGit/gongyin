import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

// 引入进度条样式
import 'nprogress/nprogress.css'

//引入自定义滚动条
import HappyScroll from 'vue-happy-scroll'
import 'vue-happy-scroll/docs/happy-scroll.css'

//自动滚动插件
import scroll from 'vue-seamless-scroll'

// 炫酷的粒子动效
import  VueParticles  from   'vue-particles'

// 引入图表
import VCharts from 'v-charts'

import publicData from './utils/publicFile';
import commonJs from './utils/common'
import './assets/iconfont/iconfont.css';

Vue.use(VCharts)

// 制作地图
import echarts from 'echarts'
Vue.prototype.$echarts = echarts
import china from 'echarts/map/json/china.json'
echarts.registerMap('china', china)

// 炫酷图标
import dataV from '@jiaminghi/data-view'

//svga
import SVGA from 'svgaplayerweb'

//vue-quill-editor富文本编辑
import VueQuillEditor from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/swiper-bundle.css'
// import 'swiper/css/swiper.css'


Vue.use(VueAwesomeSwiper, /* { default options with global component } */)

Vue.use(dataV)
Vue.use(SVGA)
Vue.use(VueQuillEditor)


Vue.config.productionTip = false

Vue.use(HappyScroll)

Vue.use(scroll)

Vue.use(VueParticles)

Vue.use(ElementUI);


Vue.prototype.publicData = publicData // 配置项
Vue.prototype.commonJs = commonJs // 公共方法

// 全局路由守卫
import './router/permission'

// 全局注册指令
import vPermission from './directive/permission'
Vue.directive('permission',vPermission)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

import TIM from 'tim-js-sdk'
import COS from 'cos-js-sdk-v5'
// let options = {
//   SDKAppID: 1400339593// 接入时需要将0替换为您的即时通信 IM 应用的 SDKAppID
// }
// // 创建 SDK 实例，`TIM.create()`方法对于同一个 `SDKAppID` 只会返回同一份实例
// let tim = TIM.create(options); // SDK 实例通常用 tim 表示
// // 设置 SDK 日志输出级别，详细分级请参见 setLogLevel 接口的说明
// tim.setLogLevel(0); // 普通级别，日志量较多，接入时建议使用
// // tim.setLogLevel(1)
// // tim.setLogLevel(1); // release 级别，SDK 输出关键信息，生产环境时建议使用
// // 注册 COS SDK 插件
// tim.registerPlugin({'cos-js-sdk': COS});
// export default tim