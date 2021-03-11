// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import VeeValidate from 'vee-validate';
import './assets/main.css'
import VueSweetalert2 from 'vue-sweetalert2';
import Toasted from 'vue-toasted';
import 'sweetalert2/dist/sweetalert2.min.css';

 
Vue.use(Toasted,{position:"bottom-center",duration:3000,fullWidth:false,containerClass:'w-60'})
Vue.use(VueSweetalert2);
Vue.config.productionTip = false


Vue.use(VeeValidate);


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
