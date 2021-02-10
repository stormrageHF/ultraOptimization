/*

*/
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios'
import VueAxios from 'vue-axios'
import './commen/css/global.css'
// import { Base64 } from 'js-base64'
import AlertError from './global/global'


Vue.config.productionTip = false

Vue.use(ElementUI);
Vue.use(VueAxios, axios);

Vue.use(AlertError)

let isRelease = true; 
if (isRelease) {
  axios.defaults.baseURL = 'https://api.idoctor.cc/BayerApi';
} else {
  axios.defaults.baseURL = 'http://101.200.177.46:8076';
}
axios.defaults.timeout = 1000*60*10; // 设置超时
if (localStorage.getItem('UltraToken')) {
  axios.defaults.headers.common['Authorization'] = localStorage.getItem('UltraToken');
}
axios.interceptors.response.use(
  (response) => response,
  (error) => {
    // console.log(error)
    if (error.response.data.StatusCode == 40111) {
      localStorage.removeItem("UltraToken");
      localStorage.removeItem("DBJLoginInfo");
      localStorage.removeItem("DBJLoginName");
      localStorage.removeItem("DBJLoginDate");
      // localStorage.setItem("DBJAccountGrade", -1)
      this.$store.dispatch("recordAccountGrade", -1);
      
      router.replace("/login");
    } else {
      return Promise.reject(error)
    }
  }
)


new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
