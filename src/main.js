// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import '../static/fonts/iconfont.css'
import '../static/css/global.css'
import store from './store'

//Lazyload
import VueLazyload from 'vue-lazyload'
Vue.use(VueLazyload)

//mint
import Mint from 'mint-ui';
import 'mint-ui/lib/style.css';
Vue.use(Mint);

//jquery
import $jq from 'jquery'
Vue.prototype.$jq = $jq
// import './assets/css/my-mint.scss';//全局修改mint-UI样式

//axios
import axios from 'axios'
Vue.prototype.$axios = axios
axios.defaults.baseURL = 'http://tanzhouweb.com/vueProject/'
Vue.prototype.dataURL = function (file,title,id) {
  id = (id === undefined)?'':id;
  return file+'?title='+title+id;
}

//map
import AMap from 'vue-amap'
// AMap.initAMapApiLoader({
//   key: "e1dedc6bdd765d46693986ff7ff969f4",
//   plugin: [
//     "AMap.Autocomplete", //输入提示插件
//     "AMap.PlaceSearch", //POI搜索插件
//     "AMap.Scale", //右下角缩略图插件 比例尺
//     "AMap.OverView", //地图鹰眼插件
//     "AMap.ToolBar", //地图工具条
//     "AMap.MapType", //类别切换控件，实现默认图层与卫星图、实施交通图层之间切换的控制
//     "AMap.PolyEditor", //编辑 折线多，边形
//     "AMap.CircleEditor", //圆形编辑器插件
//     "AMap.Geolocation" //定位控件，用来获取和展示用户主机所在的经纬度位置
//   ],
//   uiVersion: "1.0"
// });
Vue.use(AMap);



Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
