import Vue from 'vue'
import App from './App.vue'
import router from './router'
import 'u-reset.css';
import Vant from 'vant';
import 'vant/lib/index.css';

import { Lazyload ,Sticky} from 'vant';
import {store} from "./store";

Vue.use(Lazyload);
Vue.use(Sticky);

Vue.config.productionTip = false
Vue.use(Vant);

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
