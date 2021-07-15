import Vue from 'vue'
import App from './App.vue'
import vSelect from "vue-select";
import axios from 'axios';

Vue.prototype.$axios = axios

Vue.component("v-select", vSelect);
import 'vue-select/dist/vue-select.css';
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
